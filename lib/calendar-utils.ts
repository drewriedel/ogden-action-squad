import type { SavedAction } from "@/lib/saved-actions";

// Function to create an ICS file content for a calendar event
export function createICS(action: SavedAction): string {
  if (!action.scheduledDate) return "";

  const startDate = new Date(action.scheduledDate);
  const endDate = new Date(startDate);
  endDate.setHours(endDate.getHours() + 1); // Default to 1-hour events

  // Format dates for ICS
  const formatDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  };

  const startFormatted = formatDate(startDate);
  const endFormatted = formatDate(endDate);
  const now = formatDate(new Date());

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Ogden Action Squad//NONSGML v1.0//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${action.id}@ogdenactionsquad.org
DTSTAMP:${now}
DTSTART:${startFormatted}
DTEND:${endFormatted}
SUMMARY:${action.action}
DESCRIPTION:${action.title}\n\nSource: ${action.source}\n\nMore info: ${action.url}
LOCATION:
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
END:VCALENDAR`;
}

// Function to download an ICS file
export function downloadICS(action: SavedAction): void {
  if (!action.scheduledDate) return;

  const icsContent = createICS(action);
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `action-${action.id}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
