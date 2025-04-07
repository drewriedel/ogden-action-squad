import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MegaphoneIcon, InfoIcon, BookmarkIcon } from "lucide-react";

export function NewsHeader() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <MegaphoneIcon className="h-6 w-6 text-primary" />
          <Link href="/" className="font-bold text-xl">
            Ogden Action Squad
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link
            href="/categories"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Categories
          </Link>
          <Link
            href="/saved"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Saved Actions
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            About
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <BookmarkIcon className="h-5 w-5" />
            <span className="sr-only">Saved Items</span>
          </Button>
          <Button variant="ghost" size="icon">
            <InfoIcon className="h-5 w-5" />
            <span className="sr-only">Information</span>
          </Button>
          <Button>Take Action</Button>
        </div>
      </div>
    </header>
  );
}
