import { NewsCard } from "@/components/news-card";
import { fetchFilteredNews } from "@/lib/news-service";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export async function SearchResults({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Extract search parameters
  const query = typeof searchParams.q === "string" ? searchParams.q : undefined;
  const categories =
    typeof searchParams.categories === "string"
      ? searchParams.categories.split(",")
      : undefined;
  const level =
    typeof searchParams.level === "string" ? searchParams.level : undefined;
  const actions =
    typeof searchParams.actions === "string"
      ? searchParams.actions.split(",")
      : undefined;

  // Fetch filtered news
  const news = await fetchFilteredNews({
    query,
    categories,
    level,
    actions,
  });

  if (news.length === 0) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No results found</AlertTitle>
        <AlertDescription>
          Try adjusting your search filters to find more news articles.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">
        Found {news.length} {news.length === 1 ? "result" : "results"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => (
          <NewsCard key={item.id} news={item} />
        ))}
      </div>
    </div>
  );
}
