"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookmarkIcon,
  ExternalLinkIcon,
  ShareIcon,
  CheckIcon,
} from "lucide-react";
import type { NewsItem } from "@/types/news";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { saveAction, isActionSaved } from "@/lib/saved-actions";
import { toast } from "sonner";

interface NewsCardProps {
  news: NewsItem;
}

export function NewsCard({ news }: NewsCardProps) {
  // Client component needs useState
  const [savedActions, setSavedActions] = useState<Record<number, boolean>>({});

  // Check initially which actions are already saved
  useEffect(() => {
    const initialSavedState: Record<number, boolean> = {};
    news.actions.forEach((action, index) => {
      initialSavedState[index] = isActionSaved(news.id, action);
    });
    setSavedActions(initialSavedState);
  }, [news]);

  // Function to handle saving an action
  const handleSaveAction = (action: string, index: number) => {
    if (savedActions[index]) {
      toast.info("This action is already saved");
      return;
    }

    saveAction({
      newsId: news.id,
      title: news.title,
      action: action,
      level: news.level,
      category: news.category,
      source: news.source,
      url: news.url,
    });

    // Update local state
    setSavedActions((prev) => ({ ...prev, [index]: true }));
    toast.success("Action saved! View it in your Saved Actions.");
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        {news.imageUrl ? (
          <Image
            src={news.imageUrl || "/placeholder.svg?height=200&width=400"}
            alt={news.title}
            fill
            className="object-cover"
            onError={(e) => {
              // If image fails to load, replace with placeholder
              const target = e.target as HTMLImageElement;
              target.onerror = null; // Prevent infinite error loop
              target.src = "/placeholder.svg?height=200&width=400";
            }}
          />
        ) : (
          <div className="h-full w-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">No image available</span>
          </div>
        )}
        <div className="absolute top-2 left-2 flex gap-2">
          <Badge
            variant={
              news.level === "local"
                ? "default"
                : news.level === "state"
                ? "secondary"
                : "outline"
            }
          >
            {news.level}
          </Badge>
          <Badge
            variant="outline"
            className="bg-background/80 backdrop-blur-sm"
          >
            {news.source}
          </Badge>
        </div>
      </div>

      <CardHeader>
        <CardTitle className="line-clamp-2">{news.title}</CardTitle>
        <CardDescription className="flex items-center justify-between">
          <span>
            {formatDistanceToNow(new Date(news.publishedAt), {
              addSuffix: true,
            })}
          </span>
          <Badge variant="outline">{news.category}</Badge>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground line-clamp-3">{news.summary}</p>
      </CardContent>

      <Tabs defaultValue="actions">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="actions">Actions</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>
        <TabsContent value="actions" className="p-4 space-y-4">
          <h4 className="font-medium">Take Action:</h4>
          <ul className="space-y-2 text-sm">
            {news.actions.map((action, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <div className="flex-1 flex justify-between items-start">
                  <span>{action}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 ml-2"
                    onClick={() => handleSaveAction(action, index)}
                    disabled={savedActions[index]}
                  >
                    {savedActions[index] ? (
                      <CheckIcon className="h-3 w-3 text-green-500" />
                    ) : (
                      <BookmarkIcon className="h-3 w-3" />
                    )}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="details" className="p-4">
          <p className="text-sm">{news.content}</p>
          <div className="mt-4">
            <Link href={news.url} target="_blank" rel="noopener noreferrer">
              <Button variant="link" className="h-auto p-0 text-sm">
                Read full article
                <ExternalLinkIcon className="h-3 w-3 ml-1" />
              </Button>
            </Link>
          </div>
        </TabsContent>
      </Tabs>

      <CardFooter className="flex justify-between p-4 pt-0">
        <Button variant="outline" size="sm">
          <BookmarkIcon className="h-4 w-4 mr-2" />
          Save
        </Button>
        <Button variant="outline" size="sm">
          <ShareIcon className="h-4 w-4 mr-2" />
          Share
        </Button>
      </CardFooter>
    </Card>
  );
}
