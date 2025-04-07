import type { NewsItem } from "@/app/types/news";
import type { NewsSource } from "@/lib/news-sources";
import { generateActions } from "@/lib/action-generator";
import Parser from "rss-parser";
import * as cheerio from "cheerio";

// Create a new RSS parser instance
const parser = new Parser();

// Parse RSS feed from a news source
export async function parseRSSFeed(source: NewsSource): Promise<NewsItem[]> {
  try {
    // Fetch and parse the RSS feed
    const feed = await parser.parseURL(source.baseUrl);

    // Map RSS items to our NewsItem format
    return feed.items.slice(0, 10).map((item, index) => {
      // Extract category from item or use default from source
      const category = extractCategoryFromItem(item, source);

      // Create a NewsItem from the RSS item
      const newsItem: NewsItem = {
        id: `${source.id}-${index}`,
        title: item.title || "No title",
        summary: item.contentSnippet?.slice(0, 200) || "No summary available",
        content: item.content || item.contentSnippet || "No content available",
        category: category,
        level: source.level,
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

// Scrape web page for news items
export async function scrapeWebPage(source: NewsSource): Promise<NewsItem[]> {
  try {
    const response = await fetch(source.baseUrl);
    const html = await response.text();
    const $ = cheerio.load(html);
    const newsItems: NewsItem[] = [];

    // Different scraping logic based on the source
    switch (source.id) {
      case "weber-county-commission":
        // Scrape Weber County Commission agendas
        $(".agenda-item").each((i, el) => {
          if (i >= 10) return; // Limit to 10 items

          const title = $(el).find(".agenda-title").text().trim();
          const date = $(el).find(".agenda-date").text().trim();
          const link = $(el).find("a").attr("href");
          const summary = $(el).find(".agenda-description").text().trim();

          if (title) {
            const newsItem: NewsItem = {
              id: `${source.id}-${i}`,
              title: title,
              summary: summary || "County Commission agenda item",
              content: summary || "County Commission agenda item",
              category: "Government",
              level: source.level,
              source: source.name,
              publishedAt: parseDate(date) || new Date().toISOString(),
              url: link
                ? new URL(link, source.baseUrl).toString()
                : source.baseUrl,
              imageUrl: "/placeholder.svg?height=200&width=400",
              actions: [],
            };

            newsItem.actions = generateActions(newsItem);
            newsItems.push(newsItem);
          }
        });
        break;

      case "utah-legislature":
        // Scrape Utah Legislature bills
        $("tr").each((i, el) => {
          if (i === 0 || i > 10) return; // Skip header and limit to 10 items

          const billNumber = $(el).find("td:nth-child(1)").text().trim();
          const title = $(el).find("td:nth-child(2)").text().trim();
          const sponsor = $(el).find("td:nth-child(3)").text().trim();
          const link = $(el).find("a").attr("href");

          if (billNumber && title) {
            const newsItem: NewsItem = {
              id: `${source.id}-${i}`,
              title: `${billNumber}: ${title}`,
              summary: `Sponsored by ${sponsor}`,
              content: `Bill ${billNumber}: ${title}\nSponsored by ${sponsor}`,
              category: "Legislation",
              level: source.level,
              source: source.name,
              publishedAt: new Date().toISOString(),
              url: link
                ? new URL(link, source.baseUrl).toString()
                : source.baseUrl,
              imageUrl: "/placeholder.svg?height=200&width=400",
              actions: [],
            };

            newsItem.actions = generateActions(newsItem);
            newsItems.push(newsItem);
          }
        });
        break;

      case "utah-courts":
        // Scrape Utah Courts opinions
        $(".opinion-item").each((i, el) => {
          if (i >= 10) return; // Limit to 10 items

          const title = $(el).find(".case-name").text().trim();
          const date = $(el).find(".opinion-date").text().trim();
          const link = $(el).find("a").attr("href");
          const summary = $(el).find(".opinion-summary").text().trim();

          if (title) {
            const newsItem: NewsItem = {
              id: `${source.id}-${i}`,
              title: title,
              summary: summary || "Utah Court opinion",
              content: summary || "Utah Court opinion",
              category: "Legal",
              level: source.level,
              source: source.name,
              publishedAt: parseDate(date) || new Date().toISOString(),
              url: link
                ? new URL(link, source.baseUrl).toString()
                : source.baseUrl,
              imageUrl: "/placeholder.svg?height=200&width=400",
              actions: [],
            };

            newsItem.actions = generateActions(newsItem);
            newsItems.push(newsItem);
          }
        });
        break;

      case "weber-county-courts":
        // Scrape Weber County court calendar
        $(".calendar-item").each((i, el) => {
          if (i >= 10) return; // Limit to 10 items

          const title = $(el).find(".case-title").text().trim();
          const date = $(el).find(".hearing-date").text().trim();
          const judge = $(el).find(".judge-name").text().trim();

          if (title) {
            const newsItem: NewsItem = {
              id: `${source.id}-${i}`,
              title: title,
              summary: `Hearing scheduled with Judge ${judge}`,
              content: `Case: ${title}\nHearing Date: ${date}\nJudge: ${judge}`,
              category: "Legal",
              level: source.level,
              source: source.name,
              publishedAt: parseDate(date) || new Date().toISOString(),
              url: source.baseUrl,
              imageUrl: "/placeholder.svg?height=200&width=400",
              actions: [],
            };

            newsItem.actions = generateActions(newsItem);
            newsItems.push(newsItem);
          }
        });
        break;

      default:
        console.log(`No specific scraping logic for ${source.id}`);
    }

    return newsItems;
  } catch (error) {
    console.error(`Error scraping ${source.name}:`, error);
    return [];
  }
}

// Helper function to extract category from RSS item
function extractCategoryFromItem(item: any, source: NewsSource): string {
  // Try to get category from item
  if (item.categories && item.categories.length > 0) {
    return item.categories[0];
  }

  // Try to infer category from title or content
  const titleAndContent = `${item.title} ${item.contentSnippet}`.toLowerCase();

  if (
    titleAndContent.includes("bill") ||
    titleAndContent.includes("legislation") ||
    titleAndContent.includes("vote")
  ) {
    return "Legislation";
  }

  if (
    titleAndContent.includes("court") ||
    titleAndContent.includes("ruling") ||
    titleAndContent.includes("decision") ||
    titleAndContent.includes("judge")
  ) {
    return "Legal";
  }

  if (
    titleAndContent.includes("budget") ||
    titleAndContent.includes("tax") ||
    titleAndContent.includes("funding")
  ) {
    return "Economy";
  }

  if (
    titleAndContent.includes("health") ||
    titleAndContent.includes("medical") ||
    titleAndContent.includes("hospital")
  ) {
    return "Healthcare";
  }

  if (
    titleAndContent.includes("school") ||
    titleAndContent.includes("education") ||
    titleAndContent.includes("student")
  ) {
    return "Education";
  }

  if (
    titleAndContent.includes("housing") ||
    titleAndContent.includes("development") ||
    titleAndContent.includes("zoning")
  ) {
    return "Housing";
  }

  if (
    titleAndContent.includes("environment") ||
    titleAndContent.includes("climate") ||
    titleAndContent.includes("pollution")
  ) {
    return "Environment";
  }

  // Default to first focus area of the source
  return source.focusAreas[0] || "General";
}

// Helper function to extract image URL from HTML content
function extractImageFromContent(content?: string): string | undefined {
  if (!content) return undefined;

  // Simple regex to extract image URL from HTML
  const imgMatch = content.match(/<img[^>]+src="([^">]+)"/i);
  return imgMatch ? imgMatch[1] : undefined;
}

// Helper function to parse date strings
function parseDate(dateStr?: string): string | undefined {
  if (!dateStr) return undefined;

  try {
    return new Date(dateStr).toISOString();
  } catch (e) {
    return undefined;
  }
}
