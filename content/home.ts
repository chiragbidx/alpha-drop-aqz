export type HeroContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  featureCards: { title: string; subtitle: string; body: string }[];
};

export type LogosContent = {
  title: string;
  subtitle: string;
  logos: string[];
};

export type FeaturesContent = {
  title: string;
  intro: string;
  items: { title: string; body: string }[];
};

export type MetricsContent = {
  title: string;
  blurb: string;
  stats: { label: string; value: string }[];
  snapshot: string[];
};

export type PricingContent = {
  title: string;
  blurb: string;
  ctas: { sales: { label: string; href: string }; terms: { label: string; href: string } };
  plans: { name: string; price: string; desc: string; features: string[]; cta: { label: string; href: string } }[];
};

export type SecurityContent = {
  title: string;
  blurb: string;
  checklist: string[];
  badges: string[];
  cta: { label: string; href: string };
};

export type DocsSupportContent = {
  title: string;
  blurb: string;
  links: { label: string; link: string }[];
  supportBullets: string[];
  supportBadge: string;
  supportCta: { label: string; href: string };
};

export type LegalContent = {
  title: string;
  blurb: string;
  docs: { label: string; link: string; tag?: string }[];
  corporate: string[];
  note: string;
};

export type CtaContent = {
  title: string;
  blurb: string;
  productLinks: { label: string; href: string }[];
  resourceLinks: { label: string; href: string }[];
  footer: string;
};

export type HomeContent = {
  hero: HeroContent;
  logos: LogosContent;
  features: FeaturesContent;
  metrics: MetricsContent;
  pricing: PricingContent;
  security: SecurityContent;
  docs: DocsSupportContent;
  legal: LegalContent;
  cta: CtaContent;
};

export const defaultHomeContent: HomeContent = {
  hero: {
    eyebrow: "InboxPilot – Powerful Email Marketing",
    title: "Reach your audience. Grow your brand.",
    subtitle:
      "InboxPilot empowers you to create, automate, and analyze email marketing campaigns. Effortless campaign creation, advanced segmentation, and robust analytics for teams of any size.",
    primaryCta: { label: "Start sending with InboxPilot", href: "/auth#signup" },
    secondaryCta: { label: "Explore features", href: "#features" },
    featureCards: [
      { title: "Campaigns", subtitle: "Multi-send made simple", body: "Compose and deliver high-converting campaigns with just a few clicks." },
      { title: "Subscribers", subtitle: "Build your audience", body: "Import, tag, and manage unlimited subscribers. Easy one-click opt-out." },
      { title: "Analytics", subtitle: "See what works", body: "Track open, click, bounce, and unsubscribe rates in real time." },
      { title: "Deliverability", subtitle: "Hit the inbox", body: "Built-in best practices and SendGrid integration for maximum deliverability." },
    ],
  },
  logos: {
    title: "Trusted by high-growth teams",
    subtitle: "Delivering millions of emails with confidence.",
    logos: ["SendGrid", "Stripe", "Notion", "Intercom", "Loom", "Linear", "Monday.com", "OpenAI"],
  },
  features: {
    title: "Why InboxPilot?",
    intro: "All-in-one dashboard with powerful email marketing automation for teams and solo founders.",
    items: [
      { title: "Segmented Campaigns", body: "Send the right message to the right audience every time." },
      { title: "Subscriber Management", body: "Organize, tag, and engage with a growing subscriber base." },
      { title: "Team Collaboration", body: "Empower your whole team to launch, analyze, and optimize campaigns." },
      { title: "Smart Analytics", body: "Visual dashboards and engagement stats per campaign and audience." },
      { title: "Email Deliverability", body: "SendGrid wiring for reliable, high-volume delivery." },
      { title: "Modern Tech Stack", body: "Powered by Next.js, Drizzle, Tailwind, and OpenAI for content help." },
    ],
  },
  metrics: {
    title: "Deliverability and Results You Can Trust",
    blurb: "Thousands of businesses rely on InboxPilot to reach their audience and maximize engagement.",
    stats: [
      { label: "Users Reached", value: "2M+" },
      { label: "Deliverability", value: "99.8%" },
      { label: "Teams Onboarded", value: "500+" },
      { label: "Open Rate Improvement", value: "32%" },
    ],
    snapshot: [
      "Instant campaign launch with team-based access",
      "Real-time analytics and engagement data per campaign",
      "Secure, permission-based data isolation",
      "Custom fields and segmentation tools for power users",
    ],
  },
  pricing: {
    title: "Flexible Pricing for Every Stage",
    blurb: "Start free and easily upgrade as your list grows. No hidden fees—pay only for what you send.",
    ctas: {
      sales: { label: "Contact sales", href: "mailto:hi@chirag.co" },
      terms: { label: "Review terms", href: "#legal" },
    },
    plans: [
      {
        name: "Starter",
        price: "$0",
        desc: "Free forever for up to 500 subscribers.",
        features: ["500 subscribers", "Basic analytics", "SendGrid integration"],
        cta: { label: "Sign up free", href: "/auth#signup" },
      },
      {
        name: "Growth",
        price: "$29",
        desc: "For scaling businesses—advanced analytics and segmentation.",
        features: ["Unlimited subscribers", "Segmentation", "Campaign metrics", "Priority support"],
        cta: { label: "Upgrade", href: "/auth#signup" },
      },
      {
        name: "Enterprise",
        price: "Custom",
        desc: "Security, support, and onboarding for larger brands.",
        features: ["Dedicated support", "Deliverability consulting", "Custom onboarding"],
        cta: { label: "Book a demo", href: "mailto:hi@chirag.co" },
      },
    ],
  },
  security: {
    title: "Secure. Compliant. Reliable.",
    blurb: "InboxPilot maintains industry best practices for data security and email delivery compliance.",
    checklist: [
      "Compliance-ready infrastructure",
      "Audit-logging on all actions",
      "Consented opt-in/out tracking",
      "Data encrypted at rest and in transit",
    ],
    badges: ["SOC2", "GDPR", "CCPA", "HIPAA-ready"],
    cta: { label: "Learn about compliance", href: "#security" },
  },
  docs: {
    title: "Full Documentation & Support",
    blurb: "Get started fast with guides, API docs, and expert-led onboarding.",
    links: [
      { label: "API reference", link: "https://nextjs.org/docs" },
      { label: "How-to guides", link: "https://vercel.com/templates" },
    ],
    supportBullets: [
      "Real humans—1hr responses to support@inboxpilot.com",
      "Live onboarding calls available for teams",
      "Quarterly deliverability reviews for Growth/Enterprise clients",
    ],
    supportBadge: "Support 24/7",
    supportCta: { label: "Contact support", href: "mailto:hi@chirag.co" },
  },
  legal: {
    title: "Clear & Transparent",
    blurb: "Your trust matters. Policies and documents are immediately available.",
    docs: [
      { label: "Terms of Service", link: "https://inboxpilot.com/terms", tag: "PDF" },
      { label: "Privacy Policy", link: "https://inboxpilot.com/privacy", tag: "PDF" },
      { label: "Data Processing Addendum", link: "https://inboxpilot.com/dpa", tag: "PDF" },
    ],
    corporate: [
      "HQ: Remote-first",
      "Run by Chirag Dodiya",
      "Contact: hi@chirag.co",
      "US/EU compliant infrastructure",
    ],
    note: "For custom agreements, contact hi@chirag.co",
  },
  cta: {
    title: "Get Started with InboxPilot",
    blurb: "The fastest way to reach your customers’ inboxes and measure your marketing results.",
    productLinks: [
      { label: "Docs", href: "https://nextjs.org/docs" },
      { label: "Features", href: "#features" },
      { label: "Upgrade plans", href: "#pricing" },
    ],
    resourceLinks: [
      { label: "Release Notes", href: "https://vercel.com/changelog" },
      { label: "GitHub", href: "https://github.com/" },
      { label: "Contact", href: "mailto:hi@chirag.co" },
    ],
    footer: "© InboxPilot by Chirag Dodiya – All rights reserved.",
  },
};

// Helper for future overrides (e.g., reading JSON from env or file)
export function getHomeContent(): HomeContent {
  return defaultHomeContent;
}