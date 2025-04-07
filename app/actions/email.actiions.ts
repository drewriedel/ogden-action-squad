"use server";

import type { SavedAction } from "@/lib/saved-actions";

interface EmailActionsProps {
  email: string;
  actions: SavedAction[];
  includeCalendarInvites: boolean;
}

export async function sendActionsByEmail({
  email,
  actions,
  includeCalendarInvites,
}: EmailActionsProps) {
  try {
    // In a real implementation, you would use a service like SendGrid, Mailgun, etc.
    // For now, we'll just simulate sending an email

    console.log(`Sending email to ${email} with ${actions.length} actions`);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In a real implementation, you would:
    // 1. Format the email content with the actions
    // 2. Generate calendar invites if requested
    // 3. Send the email with attachments

    return {
      success: true,
      message: `Action list sent to ${email}. Check your inbox!`,
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message: "Failed to send email. Please try again later.",
    };
  }
}
