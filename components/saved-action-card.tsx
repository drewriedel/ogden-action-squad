"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CalendarIcon,
  TrashIcon,
  ExternalLinkIcon,
  CalendarDaysIcon,
} from "lucide-react";
import {
  type SavedAction,
  removeAction,
  toggleActionCompletion,
  updateScheduledDate,
} from "@/lib/saved-actions";
import { downloadICS } from "@/lib/calendar-utils";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

interface SavedActionCardProps {
  action: SavedAction;
  onRemove: (id: string) => void;
}

export function SavedActionCard({ action, onRemove }: SavedActionCardProps) {
  const [date, setDate] = useState<Date | undefined>(
    action.scheduledDate ? parseISO(action.scheduledDate) : undefined
  );

  // Handle scheduling an action
  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    updateScheduledDate(action.id, selectedDate?.toISOString());

    if (selectedDate) {
      toast.success("Action scheduled! You can add it to your calendar.");
    } else {
      toast.info("Schedule cleared");
    }
  };

  // Handle removing an action
  const handleRemove = () => {
    removeAction(action.id);
    onRemove(action.id);
    toast.success("Action removed from saved list");
  };

  // Handle toggling completion status
  const handleToggleCompletion = () => {
    toggleActionCompletion(action.id);
    toast.success(
      action.completed
        ? "Action marked as incomplete"
        : "Action marked as complete!"
    );
  };

  // Handle downloading calendar invite
  const handleDownloadCalendar = () => {
    if (!action.scheduledDate) {
      toast.error("Please schedule this action first");
      return;
    }

    downloadICS(action);
    toast.success("Calendar invite downloaded");
  };

  return (
    <Card className={action.completed ? "opacity-70" : ""}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={action.completed}
              onCheckedChange={handleToggleCompletion}
              id={`complete-${action.id}`}
            />
            <CardTitle
              className={`text-lg ${
                action.completed ? "line-through text-muted-foreground" : ""
              }`}
            >
              {action.action}
            </CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={handleRemove}>
            <TrashIcon className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge
            variant={
              action.level === "local"
                ? "default"
                : action.level === "state"
                ? "secondary"
                : "outline"
            }
          >
            {action.level}
          </Badge>
          <Badge variant="outline">{action.category}</Badge>
          <Badge variant="outline" className="bg-background/80">
            {action.source}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground mb-3">
          Related to: {action.title}
        </p>

        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium">Schedule:</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <CalendarIcon className="h-3.5 w-3.5" />
                {date ? format(date, "PPP") : "Set date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          {date && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8"
              onClick={handleDownloadCalendar}
            >
              <CalendarDaysIcon className="h-3.5 w-3.5 mr-1" />
              Add to calendar
            </Button>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-2">
        <Link
          href={action.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <Button variant="secondary" size="sm" className="w-full">
            View source
            <ExternalLinkIcon className="h-3.5 w-3.5 ml-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
