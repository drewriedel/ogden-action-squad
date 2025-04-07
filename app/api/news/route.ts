import { NextResponse } from "next/server";
import type { NewsItem } from "@/types/news";
import { newsSources } from "@/lib/news-sources";
import { generateActions } from "@/lib/action-generator";
import Parser from "rss-parser";

// Create a new RSS parser instance
const parser = new Parser();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const level = searchParams.get("level");
  const source = searchParams.get("source");

  try {
    // Determine which sources to fetch from
    let sourcesToFetch = [...newsSources];

    if (source) {
      sourcesToFetch = sourcesToFetch.filter((s) => s.id === source);
    }

    if (level) {
      sourcesToFetch = sourcesToFetch.filter((s) => s.level === level);
    }

    // Fetch news from all selected sources
    const newsPromises = sourcesToFetch.map(fetchFromSource);

    // Use Promise.allSettled to handle potential failures from individual sources
    const results = await Promise.allSettled(newsPromises);

    // Combine all successful results
    let allNews: NewsItem[] = [];

    results.forEach((result) => {
      if (result.status === "fulfilled") {
        allNews = [...allNews, ...result.value];
      }
    });

    // Filter by category if provided
    if (category) {
      allNews = allNews.filter(
        (item) => item.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Sort by published date (newest first)
    allNews.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    return NextResponse.json(allNews);
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}

async function fetchFromSource(
  source: (typeof newsSources)[0]
): Promise<NewsItem[]> {
  try {
    switch (source.type) {
      case "rss":
        return await fetchFromRSS(source);
      case "api":
        return await fetchFromAPI(source);
      case "scrape":
        return await fetchFromScrape(source);
      default:
        return [];
    }
  } catch (error) {
    console.error(`Error fetching from ${source.name}:`, error);
    return []; // Return empty array on error to avoid breaking the entire request
  }
}

async function fetchFromRSS(
  source: (typeof newsSources)[0]
): Promise<NewsItem[]> {
  try {
    // Fetch and parse the RSS feed
    const feed = await parser.parseURL(source.baseUrl);

    // Map RSS items to our NewsItem format
    return feed.items.slice(0, 10).map((item, index) => {
      // Extract category from item or use default from source
      const category = item.categories?.[0] || source.category || "General";

      // Create a NewsItem from the RSS item
      const newsItem: NewsItem = {
        id: `${source.id}-${index}`,
        title: item.title || "No title",
        summary: item.contentSnippet?.slice(0, 200) || "No summary available",
        content: item.content || item.contentSnippet || "No content available",
        category: category,
        level: source.level || "federal",
        source: source.name,
        publishedAt: item.isoDate || new Date().toISOString(),
        url: item.link || "",
        imageUrl:
          extractImageFromContent(item.content) ||
          "/placeholder.svg?height=200&width=400",
        actions: [], // Will be filled below
      };

      // Generate actions based on the news item
      newsItem.actions = generateActions(newsItem);

      return newsItem;
    });
  } catch (error) {
    console.error(`Error parsing RSS from ${source.name}:`, error);
    return [];
  }
}

async function fetchFromAPI(
  source: (typeof newsSources)[0]
): Promise<NewsItem[]> {
  // Implementation depends on the specific API
  // This is a placeholder for API-specific implementation
  try {
    const response = await fetch(source.baseUrl, {
      headers: {
        // Add any required API keys or authentication headers
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Map API response to our NewsItem format
    // This mapping will be specific to each API's response structure
    return data.articles.map((article: any, index: number) => {
      const newsItem: NewsItem = {
        id: `${source.id}-${index}`,
        title: article.title,
        summary: article.description || article.summary,
        content: article.content,
        category: article.category || source.category || "General",
        level: source.level || "federal",
        source: source.name,
        publishedAt: article.publishedAt,
        url: article.url,
        imageUrl: article.urlToImage || "/placeholder.svg?height=200&width=400",
        actions: [],
      };

      // Generate actions based on the news item
      newsItem.actions = generateActions(newsItem);

      return newsItem;
    });
  } catch (error) {
    console.error(`Error fetching from API ${source.name}:`, error);
    return [];
  }
}

async function fetchFromScrape(
  source: (typeof newsSources)[0]
): Promise<NewsItem[]> {
  // Web scraping implementation
  // Note: Web scraping should be used as a last resort and may require
  // additional libraries like cheerio or puppeteer

  // This is a placeholder - actual implementation would depend on the site structure
  console.log(`Web scraping not implemented for ${source.name}`);
  return [];
}

// Helper function to extract image URL from HTML content
function extractImageFromContent(content?: string): string | undefined {
  if (!content) return undefined;

  // Simple regex to extract image URL from HTML
  const imgMatch = content.match(/<img[^>]+src="([^">]+)"/i);
  return imgMatch ? imgMatch[1] : undefined;
}
