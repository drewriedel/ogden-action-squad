import { Suspense } from "react";
import { NewsHeader } from "@/components/news-header";
import { CategorySearch } from "@/components/category-search";
import { LoadingResults } from "@/components/loading-results";
import { SearchResults } from "@/components/search-results";
import { Component, type ReactNode } from "react";

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
          <ErrorBoundary
            fallback={
              <div className="p-4 border border-red-300 bg-red-50 rounded-md">
                <h3 className="text-red-800 font-medium">
                  Error loading results
                </h3>
                <p className="text-red-600">
                  There was a problem loading the search results. Please try
                  again later.
                </p>
              </div>
            }
          >
            <SearchResults searchParams={searchParams} />
          </ErrorBoundary>
        </Suspense>
      </main>
    </div>
  );
}
// Add this ErrorBoundary component at the bottom of the file
("use client");

interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
