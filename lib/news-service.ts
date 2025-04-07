import type { NewsItem } from "@/types/news";

// This would be replaced with actual API calls to news sources
export async function fetchNews(): Promise<NewsItem[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    {
      id: "1",
      title: "City Council Approves New Affordable Housing Development",
      summary:
        "The Ogden City Council has approved a new affordable housing development that will create 200 units for low-income residents.",
      content:
        "The Ogden City Council voted 6-1 to approve the development of a new affordable housing complex on the east side of the city. The project will include 200 units, with 80% reserved for residents making less than 60% of the area median income. Construction is expected to begin in early 2025.",
      category: "Housing",
      level: "local",
      source: "Ogden Standard-Examiner",
      publishedAt: "2025-04-05T14:30:00Z",
      url: "https://example.com/housing-development",
      imageUrl: "/placeholder.svg?height=200&width=400",
      actions: [
        "Attend the next city council meeting on April 15 to voice support",
        "Contact your district representative to thank them for supporting affordable housing",
        "Volunteer with Habitat for Humanity to help build affordable housing",
        "Sign up for updates on the project through the city website",
      ],
    },
    {
      id: "2",
      title: "State Legislature Debates Education Funding Bill",
      summary:
        "Utah lawmakers are considering a bill that would increase education funding by $200 million annually.",
      content:
        "The Utah State Legislature is debating House Bill 123, which would increase education funding by $200 million annually. The bill would allocate funds specifically for teacher salary increases and classroom resources. The debate is expected to continue through the end of the month.",
      category: "Education",
      level: "state",
      source: "Salt Lake Tribune",
      publishedAt: "2025-04-06T09:15:00Z",
      url: "https://example.com/education-funding",
      imageUrl: "/placeholder.svg?height=200&width=400",
      actions: [
        "Contact your state representative and senator to express support for HB123",
        "Join the Utah Education Association's advocacy campaign",
        "Attend the public hearing on April 20 at the State Capitol",
        "Share information about the bill on social media with #UtahEdFunding",
      ],
    },
    {
      id: "3",
      title:
        "Federal Climate Bill Includes Funding for Renewable Energy Projects",
      summary:
        "A new federal climate bill includes $50 billion for renewable energy projects across the country.",
      content:
        "The U.S. Congress has introduced a comprehensive climate bill that includes $50 billion for renewable energy projects nationwide. The bill would provide tax incentives for solar and wind energy development, as well as funding for research into new clean energy technologies.",
      category: "Environment",
      level: "federal",
      source: "Associated Press",
      publishedAt: "2025-04-04T16:45:00Z",
      url: "https://example.com/climate-bill",
      imageUrl: "/placeholder.svg?height=200&width=400",
      actions: [
        "Call your representatives in Congress to express support for the climate bill",
        "Sign the Sierra Club's petition supporting strong climate legislation",
        "Attend a virtual town hall on climate policy on April 25",
        "Calculate your carbon footprint and make a plan to reduce it",
      ],
    },
    {
      id: "4",
      title: "Local Health Department Launches Mental Health Initiative",
      summary:
        "The Weber-Morgan Health Department is launching a new initiative to improve access to mental health services.",
      content:
        "The Weber-Morgan Health Department has announced a new initiative aimed at improving access to mental health services in the community. The program will include free mental health screenings, a 24/7 crisis hotline, and expanded counseling services at community health centers.",
      category: "Healthcare",
      level: "local",
      source: "KSL News",
      publishedAt: "2025-04-07T11:20:00Z",
      url: "https://example.com/mental-health",
      imageUrl: "/placeholder.svg?height=200&width=400",
      actions: [
        "Share information about the new mental health services with your community",
        "Volunteer as a crisis hotline operator (training provided)",
        "Attend a Mental Health First Aid training session on April 30",
        "Donate to the Weber-Morgan Mental Health Foundation",
      ],
    },
  ];
}
