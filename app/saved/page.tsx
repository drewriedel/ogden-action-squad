"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { NewsHeader } from "@/components/news-header";
import { SavedActionCard } from "@/components/saved-action-card";
import { getSavedActions, type SavedAction } from "@/lib/saved-actions";
import { sendActionsByEmail } from "@/app/actions/email-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MailIcon,
  FilterIcon,
  CheckIcon,
  ClockIcon,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

export default function SavedActionsPage() {
  const [savedActions, setSavedActions] = useState<SavedAction[]>([]);
  const [email, setEmail] = useState("");
  const [includeCalendar, setIncludeCalendar] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFilter, setActiveFilter] = useState<
    "all" | "pending" | "completed"
  >("all");

  // Load saved actions from cookies on client side
  useEffect(() => {
    setSavedActions(getSavedActions());
  }, []);

  // Handle removing an action
  const handleRemoveAction = (id: string) => {
    setSavedActions((prev) => prev.filter((action) => action.id !== id));
  };

  // Handle sending actions by email
  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await sendActionsByEmail({
        email,
        actions: savedActions,
        includeCalendarInvites: includeCalendar,
      });

      if (result.success) {
        toast.success(result.message);
        setEmail("");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to send email. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter actions based on active filter
  const filteredActions = savedActions.filter((action) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "pending") return !action.completed;
    if (activeFilter === "completed") return action.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <NewsHeader />
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-2">Saved Actions</h1>
        <p className="text-muted-foreground mb-8">
          Track and manage your saved civic actions
        </p>

        {savedActions.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">No saved actions yet</h3>
              <p className="text-muted-foreground text-center max-w-md mb-6">
                Browse news articles and save actions you want to take. They'll
                appear here for easy tracking.
              </p>
              <Button asChild>
                <a href="/">Browse News</a>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Filter Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs
                      defaultValue="all"
                      value={activeFilter}
                      onValueChange={(value) => setActiveFilter(value as any)}
                      className="w-full"
                    >
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="pending">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          Pending
                        </TabsTrigger>
                        <TabsTrigger value="completed">
                          <CheckIcon className="h-4 w-4 mr-1" />
                          Done
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Email Actions</CardTitle>
                    <CardDescription>
                      Send your action list to your email
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSendEmail} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Your Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="calendar-invites"
                          checked={includeCalendar}
                          onCheckedChange={(checked) =>
                            setIncludeCalendar(!!checked)
                          }
                        />
                        <Label htmlFor="calendar-invites">
                          Include calendar invites for scheduled actions
                        </Label>
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        <MailIcon className="h-4 w-4 mr-2" />
                        {isSubmitting ? "Sending..." : "Send to Email"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                  {filteredActions.length}{" "}
                  {filteredActions.length === 1 ? "Action" : "Actions"}
                </h2>
                <div className="flex items-center text-sm text-muted-foreground">
                  <FilterIcon className="h-4 w-4 mr-1" />
                  Showing:{" "}
                  {activeFilter === "all"
                    ? "All actions"
                    : activeFilter === "pending"
                    ? "Pending actions"
                    : "Completed actions"}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredActions.map((action) => (
                  <SavedActionCard
                    key={action.id}
                    action={action}
                    onRemove={handleRemoveAction}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
