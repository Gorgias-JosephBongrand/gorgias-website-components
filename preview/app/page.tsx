import { PricingHero } from "../../src/components/pricing/PricingHero/PricingHero";
import { PricingCard } from "../../src/components/pricing/PricingCard/PricingCard";
import { PricingToggle } from "../../src/components/pricing/PricingToggle/PricingToggle";

const PLANS = [
  {
    planName: "Starter",
    price: "Free",
    priceSuffix: "forever",
    description: "For small teams getting started with customer support.",
    features:
      "50 tickets / month\n1 support agent\nEmail support\nBasic reporting",
    ctaLabel: "Get started for free",
    ctaHref: "/signup",
    ctaId: "pricing-starter-cta",
    featured: false,
    badge: undefined,
  },
  {
    planName: "Pro",
    price: "$10",
    priceSuffix: "/ agent / month",
    description: "For growing teams that need more power and integrations.",
    features:
      "Unlimited tickets\nUnlimited agents\nAll integrations\nAdvanced reporting\nPriority support",
    ctaLabel: "Start free trial",
    ctaHref: "/signup?plan=pro",
    ctaId: "pricing-pro-cta",
    featured: true,
    badge: "Most popular",
  },
  {
    planName: "Enterprise",
    price: "Custom",
    priceSuffix: "",
    description: "For large teams with custom needs and dedicated support.",
    features:
      "Everything in Pro\nCustom integrations\nSSO / SAML\nDedicated CSM\nSLA guarantee",
    ctaLabel: "Talk to sales",
    ctaHref: "/demo",
    ctaId: "pricing-enterprise-cta",
    featured: false,
    badge: undefined,
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[var(--color-neutral-50)]">
      <PricingHero
        eyebrow="Pricing"
        headline="Simple, transparent pricing"
        subtext="Start free. Scale as you grow. No surprises."
      />

      <div className="flex justify-center pb-10">
        <PricingToggle savingsLabel="Save 20%" />
      </div>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 pb-24 md:grid-cols-3">
        {PLANS.map((plan) => (
          <PricingCard key={plan.planName} {...plan} />
        ))}
      </section>
    </main>
  );
}
