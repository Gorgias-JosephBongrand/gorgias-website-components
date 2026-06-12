import { PricingCard } from "../../src/components/PricingCard/PricingCard";
import { PricingCardEnterprise } from "../../src/components/PricingCardEnterprise/PricingCardEnterprise";

export default function PreviewPage() {
  return (
    <main style={{ background: "#f3f1f0", minHeight: "100vh", padding: "48px 24px" }}>
      <h1 style={{ textAlign: "center", marginBottom: 40, fontSize: 20, fontWeight: 600, color: "#1a1e23" }}>
        Pricing Cards — Component Preview
      </h1>

      {/* Plan cards: 4-col grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 20,
          maxWidth: 1240,
          margin: "0 auto 32px",
        }}
      >
        {/* Starter — disabled (annual billing) */}
        <PricingCard
          state="disabled"
          tagText="Monthly billing only"
          planName="Starter"
          audience="For small stores getting started with customer support"
          originalPrice=""
          currentPrice="$10"
          pricePeriod="/mo"
          billingNote="Billed monthly · cancel anytime"
          ticketLabel="50 tickets / month"
          helpdeskPrice="$10/mo"
          aiAgentDisplayValue="$1.00 / interaction"
          aiAgentNote="Pay only when AI resolves a ticket. No monthly base."
          aiAgentTooltip=""
          ctaVariant="ghost"
          ctaLabel="Start free trial"
          ctaHref="#"
        />

        {/* Basic — default */}
        <PricingCard
          state="default"
          planName="Basic"
          audience="For growing stores handling up to 300 tickets/month"
          originalPrice="$69"
          currentPrice="$57"
          pricePeriod="/mo"
          billingNote="$684 billed annually"
          ticketLabel="300 tickets / month"
          helpdeskPrice="$50/mo"
          aiAgentDisplayValue="$7/mo"
          aiAgentNote="~45 automated interactions · at $0.90 per interaction"
          ctaVariant="dark"
          ctaLabel="Start free trial"
          ctaHref="#"
        />

        {/* Pro — featured */}
        <PricingCard
          state="featured"
          tagText="Most popular · 12,600 brands"
          planName="Pro"
          audience="AI Agent on the front line, with revenue analytics behind it."
          originalPrice="$414"
          currentPrice="$345"
          pricePeriod="/mo"
          billingNote="$4,140 billed annually"
          ticketLabel="2,000 tickets / month"
          helpdeskPrice="$300/mo"
          aiAgentDisplayValue="$45/mo"
          aiAgentNote="~300 automated interactions · at $0.90 per interaction"
          ctaVariant="dark"
          ctaLabel="Start free trial"
          ctaHref="#"
        />

        {/* Advanced */}
        <PricingCard
          state="default"
          planName="Advanced"
          audience="High-volume AI scaling, with white-glove onboarding & analytics."
          originalPrice="$1,035"
          currentPrice="$862"
          pricePeriod="/mo"
          billingNote="$10,344 billed annually"
          ticketLabel="5,000 tickets / month"
          helpdeskPrice="$750/mo"
          aiAgentDisplayValue="$112/mo"
          aiAgentNote="~750 automated interactions · at $0.90 per interaction"
          ctaVariant="ghost"
          ctaLabel="Talk to sales"
          ctaHref="#"
        />
      </div>

      {/* Enterprise card — full width */}
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <PricingCardEnterprise />
      </div>
    </main>
  );
}
