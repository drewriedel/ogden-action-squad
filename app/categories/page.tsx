import { Suspense } from "react";
import { NewsHeader } from "@/components/news-header";
import { CategorySearch } from "@/components/category-search";
import { LoadingResults } from "@/components/loading-results";
import { SearchResults } from "@/components/search-results";

export default function CategoriesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="min-h-screen bg-background">
      <NewsHeader />
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-2">News Categories</h1>
        <p className="text-muted-foreground mb-8">
          Search and filter news by category, government level, and action type
        </p>

        <CategorySearch />

        <Suspense fallback={<LoadingResults />}>
          <SearchResults searchParams={searchParams} />
        </Suspense>
      </main>
    </div>
  );
}
