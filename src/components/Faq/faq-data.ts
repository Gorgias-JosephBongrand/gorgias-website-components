/*
 * Pricing FAQ content — from gorgias-pricing-faqs.md.
 * Categories drive the left nav; items render in the accordion,
 * filtered by the active category.
 */

export interface FaqItem {
  cat: string;
  q: string;
  a: string;
}

export const FAQ_CATEGORIES = [
  "General",
  "Billing and Pricing",
  "Support and Services",
  "Getting started",
  "Data & Security",
];

export const FAQ_ITEMS: FaqItem[] = [
  // General
  {
    cat: "General",
    q: "Who's Gorgias for?",
    a: "Whether you're scaling fast or leading the pack, if you're focused on driving sales, automating support, and building loyal customers at scale, Gorgias is for you.",
  },
  {
    cat: "General",
    q: "What are the different products available?",
    a: "Gorgias offers a customer experience platform for support and marketing through two complementary products: Helpdesk and AI Agent.",
  },
  {
    cat: "General",
    q: "What is Helpdesk?",
    a: "Helpdesk is your all-in-one support hub designed specifically for ecommerce and Shopify. It unifies every customer channel and provides your team with the tools to deliver fast, reliable, and personalized support.",
  },
  {
    cat: "General",
    q: "What is AI Agent?",
    a: "AI Agent is your always-on ecommerce expert — resolving support questions instantly, converting shoppers with personalized chat, and automating actions like returns, order tracking, and more. All without a human in the loop.",
  },
  {
    cat: "General",
    q: "Can someone give me a demo of Gorgias?",
    a: "Absolutely. Our team can walk you through how Gorgias works, what AI Agent can do for your brand, and how to start seeing impact fast. Book a personalized demo whenever you're ready.",
  },

  // Billing and Pricing
  {
    cat: "Billing and Pricing",
    q: "How does Gorgias' pricing work?",
    a: "Gorgias' pricing is based on the number of tickets your team handles each month. Plans start at a base rate with a set number of tickets included, and you pay more as your ticket volume increases. They offer different tiers with additional features like automation, integrations, and analytics.",
  },
  {
    cat: "Billing and Pricing",
    q: "What counts as a billable ticket?",
    a: "A billable ticket is a conversation started on any Gorgias channel that includes a message from a human agent, a Rule or AI Agent. A ticket that receives a response from a human agent, a rule or AI only counts as one billable ticket regardless of the number of messages sent or received in the thread. Note: a reply to an existing ticket thread may count as a new billable ticket, but only after a defined period of inactivity.",
  },
  {
    cat: "Billing and Pricing",
    q: "What is an automated interaction?",
    a: "An automated interaction is a customer request that gets fully resolved without agent involvement, by using AI Agent or another automation feature like Flows or Order Management. If the shopper still ends up talking to a support agent within 72h of the automated resolution, then the interaction will only be charged as a billable helpdesk ticket.",
  },
  {
    cat: "Billing and Pricing",
    q: "What are the pricing details of Helpdesk and AI Agent products?",
    a: "See details of all Helpdesk plans available here, and AI Agent here.",
  },
  {
    cat: "Billing and Pricing",
    q: "How much do overages cost?",
    a: "If you exceed the number of tickets included in your monthly plan, any additional tickets will incur an overage fee. This means you'll be charged a fixed cost for each ticket beyond your plan's monthly limit. The overage rate varies depending on your specific plan. We monitor your usage and, if it's more cost-effective, we'll recommend upgrading to a higher-tier plan to better suit your needs and help you save on overage costs.",
  },
  {
    cat: "Billing and Pricing",
    q: "What is a SMS ticket?",
    a: "Tickets become SMS tickets when at least one text message is sent from a customer to your team or vice versa. Once a ticket becomes an SMS ticket, you can continue texting at no extra charge.",
  },
  {
    cat: "Billing and Pricing",
    q: "What is a Voice ticket?",
    a: "Tickets become Voice tickets when at least one phone call takes place between the customer and your team. Once a ticket becomes a Voice ticket, you can have multiple calls at no extra charge.",
  },
  {
    cat: "Billing and Pricing",
    q: "What are the pricing details of AI Agent?",
    a: "AI Agent interactions are priced at $0.90 each on annual plans or $1.00 on monthly plans. Each AI Agent interaction also counts as a helpdesk ticket and is billed accordingly. Note: Helpdesk tickets include messages sent by a human agent, a rule, or the AI Agent.",
  },
  {
    cat: "Billing and Pricing",
    q: "Will I pay for tickets that are just newsletters, spam or auto-responders?",
    a: "No. Gorgias filters out newsletters, spam, and auto-responders automatically — so you only pay for tickets that actually need a response.",
  },
  {
    cat: "Billing and Pricing",
    q: "Can we choose between annual and monthly subscriptions?",
    a: "Yes, Gorgias offers both monthly and annual subscription options. Monthly plans are billed on a recurring monthly basis, while annual plans are billed upfront for the 12 months.",
  },
  {
    cat: "Billing and Pricing",
    q: "How many seats do I have for my team?",
    a: "The number of seats for your team depends on the plan that you choose!",
  },
  {
    cat: "Billing and Pricing",
    q: "How do I cancel my Gorgias Subscription or trial?",
    a: "To cancel your Gorgias subscription or trial, go to Settings > Billing in your Gorgias dashboard and click Cancel Subscription. If you're on a trial, cancellation will stop billing after the trial ends.",
  },
  {
    cat: "Billing and Pricing",
    q: "Do I have to pay state sales tax on my Gorgias subscription?",
    a: "Yes, Gorgias charges state sales tax where required by law. The exact amount depends on your billing address and local tax regulations.",
  },

  // Support and Services
  {
    cat: "Support and Services",
    q: "Do I have access to a Customer Success Manager?",
    a: "Access to a Customer Success Manager depends on your annual Shopify GMV. Higher-GMV brands typically receive a dedicated CSM, while lower-GMV brands are supported with comprehensive resources.",
  },
  {
    cat: "Support and Services",
    q: "How can I contact Gorgias support?",
    a: "You can contact Gorgias support via live chat in your dashboard or by emailing support@gorgias.com.",
  },

  // Getting started
  {
    cat: "Getting started",
    q: "Can I import my tickets from my previous helpdesk?",
    a: "Yes, Gorgias supports ticket imports from most major helpdesks. Our team can help you migrate your data during onboarding.",
  },
  {
    cat: "Getting started",
    q: "Do I have access to all features during trial?",
    a: "Yes, the Gorgias trial gives you access to all features so you can fully test the platform before committing.",
  },
  {
    cat: "Getting started",
    q: "How long is the trial period?",
    a: "The Gorgias trial period lasts 7 days.",
  },
  {
    cat: "Getting started",
    q: "Do I need to enter any payment info to get started?",
    a: "No, you don't need to enter payment info to start the Gorgias trial.",
  },

  // Data & Security
  {
    cat: "Data & Security",
    q: "How is my data secured with your platform?",
    a: "At Gorgias, we prioritize the security of your data. Our platform employs industry-standard security measures, including encryption protocols for data at rest and in transit, strict access controls, and continuous monitoring to protect against unauthorized access. We adhere to best practices in data security to ensure that your information remains confidential and secure.",
  },
  {
    cat: "Data & Security",
    q: "Are you compliant with GDPR, CCPA, and other data privacy regulations?",
    a: "Yes, Gorgias is fully compliant with GDPR, CCPA, and other major global data protection frameworks. We adhere to strict privacy and handling guidelines to protect customer data, and we offer tools to help merchants meet their own compliance obligations.",
  },
  {
    cat: "Data & Security",
    q: "Where is my data stored?",
    a: "Our servers are hosted in Google Cloud Platform's data centers, and are located in the United States, European Union, and Australia, ensuring that customer data is hosted in the region closest to them for optimal performance, reduced latency, and regional data residency compliance.",
  },
  {
    cat: "Data & Security",
    q: "How does Gorgias manage customer data removal?",
    a: "Gorgias customers retain the full ownership of their data. Gorgias customers are able to delete individual shoppers' data and tickets. And in any case, customers' data is removed from Gorgias data stores within 90 days of the termination of the contractual agreement.",
  },
  {
    cat: "Data & Security",
    q: "Do you offer Single Sign-On (SSO), user permissions, or audit logs for enterprise security?",
    a: "Yes, Gorgias supports Single Sign-On (SSO) for Google and Microsoft 365 accounts, granular user permissions, and audit logs — designed for teams that require enterprise-grade access control and visibility. These features help security-conscious organizations manage team access securely and efficiently.",
  },
];

export function parseFaq(json: string | undefined, fallback: FaqItem[]): FaqItem[] {
  if (!json?.trim()) return fallback;
  try {
    const parsed = JSON.parse(json);
    if (!Array.isArray(parsed) || parsed.length === 0) return fallback;
    return parsed as FaqItem[];
  } catch {
    return fallback;
  }
}
