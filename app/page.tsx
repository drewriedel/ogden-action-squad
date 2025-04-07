import { Suspense } from "react";
import { NewsFeed } from "@/components/news-feed";
import { NewsFilters } from "@/components/news-filters";
import { NewsHeader } from "@/components/news-header";
import { LoadingNewsFeed } from "@/components/loading-news-feed";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <NewsHeader />
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Ogden Action Squad News Hub</h1>
        <p className="text-muted-foreground mb-8">
          Stay informed and take action on issues that matter to your community
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <NewsFilters />
          </div>
          <div className="lg:col-span-3">
            <Suspense fallback={<LoadingNewsFeed />}>
              <NewsFeed />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
