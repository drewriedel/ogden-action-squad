import { NextResponse } from "next/server";
import type { NewsItem } from "@/app/types/news";
import { newsSources } from "@/lib/news-sources";
import { parseRSSFeed, scrapeWebPage } from "@/lib/news-parsers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const level = searchParams.get("level");
  const source = searchParams.get("source");
  const query = searchParams.get("q");

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
    const newsPromises = sourcesToFetch.map(async (source) => {
      if (source.type === "rss") {
        return await parseRSSFeed(source);
      } else if (source.type === "scrape") {
        return await scrapeWebPage(source);
      } else {
        // API type would be handled here
        return [];
      }
    });

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

    // Filter by search query if provided
    if (query) {
      const searchQuery = query.toLowerCase();
      allNews = allNews.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery) ||
          item.summary.toLowerCase().includes(searchQuery) ||
          item.content.toLowerCase().includes(searchQuery)
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
