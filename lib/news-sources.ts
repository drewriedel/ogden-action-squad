import type { NewsItem } from "@/app/types/news";

// Enhanced version of fetchNews that supports filtering
export async function fetchNews(): Promise<NewsItem[]> {
  // In a real implementation, this would call the API
  // For now, we'll use mock data
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return getMockNewsData();
}

interface FilterOptions {
  query?: string;
  categories?: string[];
  level?: string;
  actions?: string[];
}

export async function fetchFilteredNews(
  options: FilterOptions
): Promise<NewsItem[]> {
  // In a real implementation, this would call the API with query parameters
  // For now, we'll filter the mock data
  await new Promise((resolve) => setTimeout(resolve, 1000));

  let news = getMockNewsData();

  // Filter by search query
  if (options.query) {
    const query = options.query.toLowerCase();
    news = news.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query)
    );
  }

  // Filter by categories
  if (options.categories && options.categories.length > 0) {
    news = news.filter((item) =>
      options.categories!.some(
        (cat) => item.category.toLowerCase() === cat.toLowerCase()
      )
    );
  }

  // Filter by government level
  if (options.level && options.level !== "all") {
    news = news.filter((item) => item.level === options.level);
  }

  // Filter by action types
  if (options.actions && options.actions.length > 0) {
    news = news.filter((item) =>
      item.actions.some((action) =>
        options.actions!.some((actionType) =>
          action.toLowerCase().includes(actionType.toLowerCase())
        )
      )
    );
  }

  return news;
}

// Helper function to get mock news data
function getMockNewsData(): NewsItem[] {
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
    {
      id: "5",
      title: "Supreme Court Rules on Voting Rights Case",
      summary:
        "The Supreme Court has issued a ruling on a major voting rights case that could impact future elections.",
      content:
        "The U.S. Supreme Court has issued a 6-3 ruling in a major voting rights case that could have significant implications for future elections. The decision addresses questions about state authority to regulate voting procedures and federal oversight under the Voting Rights Act.",
      category: "Civil Rights",
      level: "federal",
      source: "Reuters",
      publishedAt: "2025-04-03T10:00:00Z",
      url: "https://example.com/voting-rights",
      imageUrl: "/placeholder.svg?height=200&width=400",
      actions: [
        "Check your voter registration status and update if needed",
        "Volunteer as a poll worker for upcoming elections",
        "Join a voter education campaign in your community",
        "Contact your representatives about supporting voting rights legislation",
      ],
    },
    {
      id: "6",
      title: "New Immigration Policy Announced by Federal Government",
      summary:
        "The federal government has announced changes to immigration policies affecting work visas and family reunification.",
      content:
        "The Department of Homeland Security has announced significant changes to immigration policies, including reforms to work visa programs and family reunification processes. The changes aim to address backlogs in visa processing and provide clearer pathways to legal immigration.",
      category: "Immigration",
      level: "federal",
      source: "Associated Press",
      publishedAt: "2025-04-02T13:45:00Z",
      url: "https://example.com/immigration-policy",
      imageUrl: "/placeholder.svg?height=200&width=400",
      actions: [
        "Share information about the policy changes with affected communities",
        "Support organizations providing legal assistance to immigrants",
        "Contact your representatives about immigration reform",
        "Attend community forums on immigration policy",
      ],
    },
    {
      id: "7",
      title: "State Announces New Economic Development Initiative",
      summary:
        "Utah has launched a new economic development initiative to attract tech companies to rural areas.",
      content:
        "The Utah Governor's Office of Economic Development has announced a new initiative aimed at attracting technology companies to rural areas of the state. The program includes tax incentives, infrastructure investments, and workforce development programs designed to create high-paying jobs outside of the Wasatch Front.",
      category: "Economy",
      level: "state",
      source: "Deseret News",
      publishedAt: "2025-04-01T09:30:00Z",
      url: "https://example.com/economic-development",
      imageUrl: "/placeholder.svg?height=200&width=400",
      actions: [
        "Attend information sessions about the initiative in your community",
        "Contact your state representatives to express support for rural development",
        "Share information about the program with business owners",
        "Participate in workforce development training programs",
      ],
    },
    {
      id: "8",
      title: "Local School Board Approves New Curriculum Standards",
      summary:
        "The Ogden School Board has unanimously approved new curriculum standards for K-12 education.",
      content:
        "The Ogden School Board has unanimously approved new curriculum standards for K-12 education, focusing on STEM education, critical thinking skills, and cultural competency. The new standards will be implemented beginning in the 2025-2026 school year.",
      category: "Education",
      level: "local",
      source: "Ogden Standard-Examiner",
      publishedAt: "2025-03-31T15:20:00Z",
      url: "https://example.com/curriculum-standards",
      imageUrl: "/placeholder.svg?height=200&width=400",
      actions: [
        "Attend school board meetings to provide feedback on implementation",
        "Volunteer in local schools to support teachers with the transition",
        "Join the Parent-Teacher Association to stay informed about changes",
        "Donate educational materials aligned with the new standards",
      ],
    },
  ];
}
