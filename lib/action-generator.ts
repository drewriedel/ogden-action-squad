import type { NewsItem } from "@/types/news";

// This is a simplified version of what would be a more complex system
// In a real implementation, this might use AI or a database of actions
export function generateActions(news: NewsItem): string[] {
  const actions: string[] = [];

  // Generate actions based on the level of government
  if (news.level === "local") {
    actions.push("Attend the next city council meeting to voice your opinion");
    actions.push("Contact your local representative about this issue");
  } else if (news.level === "state") {
    actions.push("Contact your state representative and senator");
    actions.push("Join a state-level advocacy group focused on this issue");
  } else if (news.level === "federal") {
    actions.push("Call your representatives in Congress");
    actions.push("Sign a petition supporting federal action on this issue");
  }

  // Generate actions based on the category
  switch (news.category.toLowerCase()) {
    case "environment":
      actions.push(
        "Calculate your carbon footprint and make a plan to reduce it"
      );
      actions.push("Join a local environmental cleanup event");
      break;
    case "education":
      actions.push("Attend a school board meeting");
      actions.push("Volunteer at a local school");
      break;
    case "healthcare":
      actions.push(
        "Share information about health resources with your community"
      );
      actions.push("Participate in a health awareness campaign");
      break;
    case "housing":
      actions.push(
        "Volunteer with Habitat for Humanity or similar organizations"
      );
      actions.push("Support affordable housing initiatives in your community");
      break;
    default:
      actions.push("Stay informed by subscribing to updates on this topic");
      actions.push("Share this information with others in your community");
  }

  return actions;
}
