import { NextResponse } from "next/server";
import type { NewsItem } from "@/types/news";

// This would be replaced with actual API calls to news sources
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const level = searchParams.get("level");

  // Simulate fetching news from various sources
  // In a real implementation, this would call external APIs
  const news: NewsItem[] = [
    {
      id: "1",
      title: "City Council Approves New Affordable Housing Development",
      summary:
        "The Ogden City Council has approved a new affordable housing development that will create 200 units for low-income residents.",
      content:
        "The Ogden City Council voted 6-1 to approve the development of a new affordable housing complex on the east side of the city. The project will include 200 units, with 80% reserved for residents making less than 60% of the area median income. Construction is expected to begin in early 2025.",
      category: "Housing",
      level: "local",
      source: "Ogden Standard-Examiner",
      publishedAt: "2025-04-05T14:30:00Z",
      url: "https://example.com/housing-development",
      imageUrl: "/placeholder.svg?height=200&width=400",
      actions: [
        "Attend the next city council meeting on April 15 to voice support",
        "Contact your district representative to thank them for supporting affordable housing",
        "Volunteer with Habitat for Humanity to help build affordable housing",
        "Sign up for updates on the project through the city website",
      ],
    },
    {
      id: "2",
      title: "State Legislature Debates Education Funding Bill",
      summary:
        "Utah lawmakers are considering a bill that would increase education funding by $200 million annually.",
      content:
        "The Utah State Legislature is debating House Bill 123, which would increase education funding by $200 million annually. The bill would allocate funds specifically for teacher salary increases and classroom resources. The debate is expected to continue through the end of the month.",
      category: "Education",
      level: "state",
      source: "Salt Lake Tribune",
      publishedAt: "2025-04-06T09:15:00Z",
      url: "https://example.com/education-funding",
      imageUrl: "/placeholder.svg?height=200&width=400",
      actions: [
        "Contact your state representative and senator to express support for HB123",
        "Join the Utah Education Association's advocacy campaign",
        "Attend the public hearing on April 20 at the State Capitol",
        "Share information about the bill on social media with #UtahEdFunding",
      ],
    },
    // More news items...
  ];

  // Filter by category if provided
  let filteredNews = news;
  if (category) {
    filteredNews = filteredNews.filter(
      (item) => item.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Filter by level if provided
  if (level) {
    filteredNews = filteredNews.filter((item) => item.level === level);
  }

  return NextResponse.json(filteredNews);
}
