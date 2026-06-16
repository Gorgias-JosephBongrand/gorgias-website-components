/*
 * Navbar menu model — mirrors the Gorgias primary nav, flattened into a
 * single data-driven shape so every panel is editable as JSON.
 *
 * A top-level item is either a direct link (href, no columns) or a
 * dropdown with a mega-menu panel (columns + optional showcase).
 *
 * Link rendering:
 *   - description present → "feature" item (icon tile + name + description)
 *   - icon (image URL) present → small icon + label
 *   - glyph ("sparkle" | "help") → inline coral-tile icon (AI Agent / Helpdesk)
 */

const CDN = "https://cdn.prod.website-files.com/5e4ff204e7b6f80e402d407a";

export const GORGIAS_LOGO = `${CDN}/669a5ab4a69be50c3a94800a_Gorgias%20Logo%20-%20Black.svg`;

export type NavGlyph = "sparkle" | "help";

export interface NavLink {
  label: string;
  href: string;
  description?: string;
  /** Small image icon URL */
  icon?: string;
  /** Inline glyph rendered in a coral tile (for the two flagship products) */
  glyph?: NavGlyph;
}

export interface NavColumn {
  title?: string;
  links: NavLink[];
  footer?: NavLink;
  /** Render links in a 2-column grid (e.g. Industries) */
  grid?: boolean;
}

export interface NavShowcase {
  eyebrow?: string;
  title: string;
  description?: string;
  href: string;
}

export interface NavItem {
  label: string;
  href?: string;
  columns?: NavColumn[];
  showcase?: NavShowcase;
  /** Which side the showcase card sits on within the panel (default right) */
  showcaseSide?: "left" | "right";
  /** Full-width coral strip below the columns (e.g. "Gorgias product tour →") */
  tour?: NavLink;
}

export const DEFAULT_MENU: NavItem[] = [
  {
    label: "Product",
    columns: [
      {
        links: [
          { label: "AI Agent", href: "/ai-agent", description: "Your AI teammate for customer experience", glyph: "sparkle" },
          { label: "Support Agent", href: "/ai-agent/support-skills", icon: `${CDN}/698c5d278acd75c176a7618f_Support%20agent%20icon.svg` },
          { label: "Shopping Assistant", href: "/ai-agent/shopping-assistant", icon: `${CDN}/698c5d2788ea9afe82434782_Shopping%20assistant%20icon.svg` },
        ],
      },
      {
        links: [
          { label: "Helpdesk", href: "/products/helpdesk", description: "One inbox for every customer conversation", glyph: "help" },
          { label: "Voice", href: "/products/voice", icon: `${CDN}/698c5d2732a0604ff46df936_Voice%20icon.svg` },
          { label: "SMS", href: "/product/sms", icon: `${CDN}/698c5d271841c75d9b7b625c_Sms%20icon.svg` },
        ],
      },
    ],
    showcase: {
      eyebrow: "See what's new",
      title: "Spring 2026 Release",
      description: "Conversations That Raise the Bar",
      href: "/product-announcement/spring-2026",
    },
    tour: { label: "Gorgias product tour →", href: "/product-tour" },
  },
  {
    label: "Solutions",
    columns: [
      {
        title: "Industries",
        grid: true,
        links: [
          { label: "Clothing & Apparel", href: "/industry/clothing-apparel", icon: `${CDN}/694144b46e768d24f825ad68_Clothing%20%26%20Apparel.svg` },
          { label: "Subscriptions", href: "/industry/subscriptions", icon: `${CDN}/694144b40d4cb1bf0e1482e3_Subscriptions.svg` },
          { label: "Beauty & Cosmetics", href: "/industry/beauty-cosmetics", icon: `${CDN}/694144b4d0faac205aa0288b_Beauty%20%26%20Cosmetics.svg` },
          { label: "Health & Wellness", href: "/industry/health-wellness", icon: `${CDN}/694144b4ab7b0c4086f3d454_Health%20%26%20Wellness.svg` },
          { label: "Home & Garden", href: "/industry/home-garden", icon: `${CDN}/694144b4a87168cfb1d5c6e2_Home%20%26%20Garden.svg` },
          { label: "Food & Beverage", href: "/industry/food-beverage", icon: `${CDN}/694144b4f3512e5e5fd06e07_Food%20%26%20Beverage.svg` },
        ],
        footer: { label: "Explore all →", href: "/industries" },
      },
      {
        title: "Use cases",
        links: [
          { label: "Product Education", href: "/use-case/guide-every-shopper-to-the-right-gear-for-their-workouts" },
          { label: "Proactive engagement", href: "/use-case/speed-up-product-discovery-with-proactive-assistance" },
          { label: "Recommendations", href: "/use-case/retain-loyal-customers-by-helping-them-find-replacements-for-their-discontinued-favorites" },
        ],
        footer: { label: "Explore all →", href: "/use-cases" },
      },
    ],
    showcaseSide: "left",
    showcase: {
      title: "Designed for Enterprise",
      description: "Trusted by the largest Shopify brands to deliver winning experiences",
      href: "/enterprise",
    },
  },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Integrations",
    columns: [
      {
        title: "Ecommerce Platforms",
        links: [
          { label: "Shopify", href: "/ecommerce/shopify", icon: `${CDN}/694150cb2ce0fdbd56d48408_Shopify.svg` },
          { label: "BigCommerce", href: "/ecommerce/bigcommerce", icon: `${CDN}/694150cbe4e1cbc1d1a77d0a_BigCommerce.svg` },
          { label: "Magento", href: "/ecommerce/magento", icon: `${CDN}/694150cb2cda6fc1cb0149a9_Magento.svg` },
          { label: "WooCommerce", href: "/ecommerce/woocommerce", icon: `${CDN}/694150cbd4f5f01bb23d7b70_WooCommerce.svg` },
        ],
      },
      {
        title: "Preferred Integrations",
        links: [
          { label: "Loop Returns", href: "/ecommerce/loop-returns", icon: `${CDN}/694150cc3ca2cb14d419fb47_Loop%20Returns.svg` },
          { label: "Yotpo", href: "/ecommerce/yotpo", icon: `${CDN}/694150cbec063d362f6bf610_Yotpo.svg` },
          { label: "Recharge", href: "/ecommerce/recharge", icon: `${CDN}/694150cc7591b7d1debc1e0b_Recharge.svg` },
          { label: "Bloomreach", href: "/apps/bloomreach", icon: `${CDN}/697737baaaa0ba9bb1bc4a69_Bloomreach.svg` },
          { label: "Attentive", href: "/ecommerce/attentive", icon: `${CDN}/69773876bc3d9ee29c636ae8_Attentive.svg` },
        ],
        footer: { label: "Explore all 100+ Apps →", href: "/apps" },
      },
      {
        title: "Custom Integrations",
        links: [
          { label: "Developer Docs", href: "https://docs.gorgias.com/en-US", icon: `${CDN}/694150cbdaa22d6816b62eb9_Developer%20Docs.svg` },
          { label: "Become an app partner", href: "/tech-partner", icon: `${CDN}/694150cb929045143d025cd6_App%20Partner.svg` },
        ],
      },
    ],
  },
  {
    label: "Resources",
    columns: [
      {
        title: "Learn",
        links: [
          { label: "Gorgias Academy", href: "/customer-resources/academy", icon: `${CDN}/6941538c0c7c55d1f05c1b44_Gorgias%20Academy.svg` },
          { label: "Blog", href: "/blog", icon: `${CDN}/694152446323c443ef843c44_Blog.svg` },
          { label: "Ebooks", href: "/ebooks", icon: `${CDN}/694152441b5207dfc43b3907_Playbooks.svg` },
        ],
      },
      {
        title: "Connect",
        links: [
          { label: "Customer Stories", href: "/customers", icon: `${CDN}/6941538cd03780662cf45542_Customer%20Stories.svg` },
          { label: "Events", href: "/events", icon: `${CDN}/6941538cf0daf2b6ac079929_Events.svg` },
        ],
      },
      {
        title: "Community",
        links: [
          { label: "Help Center", href: "https://docs.gorgias.com/en-US", icon: `${CDN}/6941538c1fd9a548bc23a851_Help%20Center.svg` },
          { label: "Gorgias Community", href: "https://community.gorgias.com/feed", icon: `${CDN}/6941538c0406b75966a175c4_Gorgias%20Community.svg` },
        ],
      },
      {
        title: "Tools",
        links: [
          { label: "ROI Calculator", href: "/shopping-assistant-roi-calculator", icon: `${CDN}/6941538c0a7e2c821306d30b_ROI%20Calculator.svg` },
          { label: "SKU Generator", href: "/tools/sku-generator", icon: `${CDN}/6941538cb035a41637cc8648_SKU%20Generator.svg` },
          { label: "Playbooks", href: "/playbooks", icon: `${CDN}/694152441b5207dfc43b3907_Playbooks.svg` },
        ],
      },
    ],
    showcase: {
      eyebrow: "Featured Resource",
      title: "Gorgias Ecom Lab",
      description: "Transparent, data-backed insights for the future of CX.",
      href: "/ecom-lab",
    },
  },
];
