"use client";

import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";

// Define the saved action type
export interface SavedAction {
  id: string;
  newsId: string;
  title: string;
  action: string;
  level: "local" | "state" | "federal";
  category: string;
  source: string;
  url: string;
  dateAdded: string;
  scheduledDate?: string;
  completed: boolean;
}

// Cookie name for saved actions
const SAVED_ACTIONS_COOKIE = "ogden_action_squad_saved_actions";

// Get saved actions from cookies
export function getSavedActions(): SavedAction[] {
  if (typeof window === "undefined") return [];

  try {
    const savedActionsCookie = Cookies.get(SAVED_ACTIONS_COOKIE);
    if (!savedActionsCookie) return [];

    return JSON.parse(savedActionsCookie);
  } catch (error) {
    console.error("Error parsing saved actions:", error);
    return [];
  }
}

// Save an action to cookies
export function saveAction(
  action: Omit<SavedAction, "id" | "dateAdded" | "completed">
): SavedAction {
  const savedActions = getSavedActions();

  // Create new action with ID and date
  const newAction: SavedAction = {
    id: uuidv4(),
    ...action,
    dateAdded: new Date().toISOString(),
    completed: false,
  };

  // Add to saved actions and update cookie
  const updatedActions = [...savedActions, newAction];
  Cookies.set(SAVED_ACTIONS_COOKIE, JSON.stringify(updatedActions), {
    expires: 365,
  });

  return newAction;
}

// Remove an action from cookies
export function removeAction(actionId: string): void {
  const savedActions = getSavedActions();
  const updatedActions = savedActions.filter(
    (action) => action.id !== actionId
  );
  Cookies.set(SAVED_ACTIONS_COOKIE, JSON.stringify(updatedActions), {
    expires: 365,
  });
}

// Toggle completion status of an action
export function toggleActionCompletion(actionId: string): void {
  const savedActions = getSavedActions();
  const updatedActions = savedActions.map((action) =>
    action.id === actionId
      ? { ...action, completed: !action.completed }
      : action
  );
  Cookies.set(SAVED_ACTIONS_COOKIE, JSON.stringify(updatedActions), {
    expires: 365,
  });
}

// Update scheduled date for an action
export function updateScheduledDate(actionId: string, date?: string): void {
  const savedActions = getSavedActions();
  const updatedActions = savedActions.map((action) =>
    action.id === actionId ? { ...action, scheduledDate: date } : action
  );
  Cookies.set(SAVED_ACTIONS_COOKIE, JSON.stringify(updatedActions), {
    expires: 365,
  });
}

// Check if an action is already saved
export function isActionSaved(newsId: string, action: string): boolean {
  const savedActions = getSavedActions();
  return savedActions.some(
    (savedAction) =>
      savedAction.newsId === newsId && savedAction.action === action
  );
}
