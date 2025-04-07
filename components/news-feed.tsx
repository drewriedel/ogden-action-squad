import { fetchNews } from "@/lib/news-service";
import { NewsCard } from "@/components/news-card";
import { Button } from "@/components/ui/button";
import { RefreshCwIcon } from "lucide-react";

export async function NewsFeed() {
  const news = await fetchNews();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Latest News</h2>
        <Button variant="outline" size="sm">
          <RefreshCwIcon className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {news.map((item) => (
          <NewsCard key={item.id} news={item} />
        ))}
      </div>
    </div>
  );
}
