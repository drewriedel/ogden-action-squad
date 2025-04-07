export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  level: "local" | "state" | "federal";
  source: string;
  publishedAt: string;
  url: string;
  imageUrl?: string;
  actions: string[];
}
