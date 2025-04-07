import type { NewsItem } from "@/app/types/news";

// This is a more sophisticated version of the action generator
// that creates relevant actions based on news content and metadata
export function generateActions(news: NewsItem): string[] {
  const actions: string[] = [];
  const title = news.title.toLowerCase();
  const content = news.content.toLowerCase();
  const combined = `${title} ${content}`;

  // Generate actions based on the level of government
  if (news.level === "local") {
    // Local government actions
    actions.push("Attend the next city council meeting to voice your opinion");

    if (combined.includes("ogden") && combined.includes("council")) {
      actions.push(
        "Contact your Ogden City Council representative at 801-629-8153"
      );
    }

    if (combined.includes("weber") && combined.includes("commission")) {
      actions.push("Contact the Weber County Commission at 801-399-8406");
    }

    if (
      combined.includes("planning") ||
      combined.includes("zoning") ||
      combined.includes("development")
    ) {
      actions.push("Attend the next planning commission meeting");
      actions.push("Review the proposed changes on the city/county website");
    }

    if (
      combined.includes("public hearing") ||
      combined.includes("comment period")
    ) {
      actions.push("Submit a public comment before the deadline");
    }
  } else if (news.level === "state") {
    // State government actions
    actions.push(
      "Contact your state representative and senator about this issue"
    );

    if (
      combined.includes("bill") ||
      combined.includes("legislation") ||
      combined.includes("vote")
    ) {
      actions.push("Track this bill on le.utah.gov");
      actions.push(
        "Contact the bill sponsor to express your support or concerns"
      );
    }

    if (combined.includes("committee") || combined.includes("hearing")) {
      actions.push("Attend the committee hearing in person or watch online");
      actions.push("Submit testimony to the committee");
    }

    if (combined.includes("governor") || combined.includes("executive order")) {
      actions.push("Contact the Governor's office at 801-538-1000");
    }

    if (
      combined.includes("court") ||
      combined.includes("ruling") ||
      combined.includes("decision")
    ) {
      actions.push("Read the full court opinion on utcourts.gov");
    }
  } else if (news.level === "federal") {
    // Federal government actions
    actions.push("Contact your representatives in Congress");

    if (
      combined.includes("bill") ||
      combined.includes("legislation") ||
      combined.includes("congress")
    ) {
      actions.push("Track this bill on congress.gov");
      actions.push("Call the U.S. Capitol Switchboard at (202) 224-3121");
    }

    if (
      combined.includes("supreme court") ||
      combined.includes("ruling") ||
      combined.includes("decision")
    ) {
      actions.push("Read the full Supreme Court opinion");
    }

    if (
      combined.includes("comment period") ||
      combined.includes("federal register")
    ) {
      actions.push("Submit a public comment through regulations.gov");
    }
  }

  // Generate actions based on the category
  switch (news.category.toLowerCase()) {
    case "environment":
      actions.push(
        "Calculate your carbon footprint and make a plan to reduce it"
      );
      actions.push("Join a local environmental cleanup event");
      if (news.level === "local") {
        actions.push("Participate in local sustainability initiatives");
      }
      break;

    case "education":
      actions.push("Attend a school board meeting");
      actions.push("Volunteer at a local school");
      if (news.level === "state") {
        actions.push("Join the Utah Education Association's advocacy efforts");
      }
      break;

    case "healthcare":
      actions.push(
        "Share information about health resources with your community"
      );
      if (combined.includes("insurance") || combined.includes("coverage")) {
        actions.push("Check your eligibility for health insurance programs");
      }
      if (news.level === "federal") {
        actions.push(
          "Learn about federal healthcare programs at healthcare.gov"
        );
      }
      break;

    case "housing":
      actions.push(
        "Volunteer with Habitat for Humanity or similar organizations"
      );
      actions.push("Support affordable housing initiatives in your community");
      if (combined.includes("development") || combined.includes("zoning")) {
        actions.push(
          "Review proposed housing developments on your city's website"
        );
      }
      if (news.level === "local") {
        actions.push("Attend housing authority meetings");
      }
      break;

    case "economy":
      actions.push("Support local businesses affected by this policy");
      if (combined.includes("tax") || combined.includes("budget")) {
        actions.push("Review the full budget proposal online");
      }
      if (news.level === "federal") {
        actions.push(
          "Learn about federal economic programs at usa.gov/benefits"
        );
      }
      break;

    case "legal":
      actions.push("Understand your rights related to this legal decision");
      if (combined.includes("supreme court")) {
        actions.push("Read analysis of the court decision from legal experts");
      }
      break;

    case "legislation":
      actions.push("Read the full text of the proposed legislation");
      actions.push("Contact the bill sponsor to express your views");
      break;

    default:
      actions.push("Stay informed by subscribing to updates on this topic");
      actions.push("Share this information with others in your community");
  }

  // Add general civic engagement actions
  if (actions.length < 4) {
    actions.push("Register to vote or check your voter registration status");
    actions.push(
      "Sign up for alerts about this issue from relevant organizations"
    );
  }

  // Return up to 4 actions
  return actions.slice(0, 4);
}
