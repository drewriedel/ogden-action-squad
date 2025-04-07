export interface NewsSource {
  id: string;
  name: string;
  baseUrl: string;
  type: "rss" | "api" | "scrape";
  category?: string;
  level?: "local" | "state" | "federal";
}

export const newsSources: NewsSource[] = [
  {
    id: "reuters",
    name: "Reuters",
    baseUrl: "https://www.reuters.com/rss/topNews",
    type: "rss",
    level: "federal",
  },
  {
    id: "ap",
    name: "Associated Press",
    baseUrl: "https://feeds.apnews.com/apnews/latest",
    type: "rss",
    level: "federal",
  },
  {
    id: "ogden-standard",
    name: "Ogden Standard-Examiner",
    baseUrl: "https://www.standard.net/search/?f=rss",
    type: "rss",
    level: "local",
  },
  {
    id: "salt-lake-tribune",
    name: "Salt Lake Tribune",
    baseUrl: "https://www.sltrib.com/rss/feed/",
    type: "rss",
    level: "state",
  },
  {
    id: "ksl",
    name: "KSL News",
    baseUrl: "https://www.ksl.com/rss/",
    type: "rss",
    level: "state",
  },
];
