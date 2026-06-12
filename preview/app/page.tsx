import { PricingCard } from "../../src/components/PricingCard/PricingCard";
import { PricingCardEnterprise } from "../../src/components/PricingCardEnterprise/PricingCardEnterprise";

export default function PreviewPage() {
  return (
    <main style={{ background: "#f9fafb", minHeight: "100vh", padding: "48px 24px" }}>
      <h1 style={{ textAlign: "center", marginBottom: 40, fontSize: 22, fontWeight: 600, color: "#111827" }}>
        Pricing Cards — Component Preview
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, maxWidth: 1200, margin: "0 auto" }}>
        {/* Starter — disabled state */}
        <PricingCard
          state="disabled"
          topNoteText="Monthly billing only"
          planName="Starter"
          description="For small stores getting started with customer support"
          originalPrice=""
          currentPrice="$10"
          pricePeriod="/mo"
          annualNote="Billed monthly · cancel anytime"
          ticketCount="50 tickets / month"
          helpdeskPrice="$10/mo"
          aiAgentPrice="$0.90 / interaction"
          aiAgentNote="Pay only when AI resolves a ticket. No monthly base."
          showAiAgentInfoIcon={false}
          ctaLabel="Start free trial"
        />

        {/* Basic — default state */}
        <PricingCard
          state="default"
          planName="Basic"
          description="For growing stores handling up to 300 tickets/month"
          originalPrice="$69"
          currentPrice="$57"
          pricePeriod="/mo"
          annualNote="$684 billed annually"
          ticketCount="300 tickets / month"
          helpdeskPrice="$50/mo"
          aiAgentPrice="$7/mo"
          aiAgentNote="~45 automated interactions · at $0.90 per interaction"
          ctaLabel="Start free trial"
        />

        {/* Pro — featured state */}
        <PricingCard
          state="featured"
          topBannerText="Most popular · 12,600 brands"
          planName="Pro"
          description="AI Agent on the front line, with revenue analytics behind it."
          originalPrice="$414"
          currentPrice="$345"
          pricePeriod="/mo"
          annualNote="$4,140 billed annually"
          ticketCount="2,000 tickets / month"
          helpdeskPrice="$300/mo"
          aiAgentPrice="$45/mo"
          aiAgentNote="~300 automated interactions · at $0.90 per interaction"
          ctaLabel="Start free trial"
        />

        {/* Advanced — enterprise component */}
        <PricingCardEnterprise
          planName="Advanced"
          description="High-volume AI scaling, with white-glove onboarding & analytics."
          originalPrice="$1035"
          currentPrice="$862"
          pricePeriod="/mo"
          annualNote="$10,344 billed annually"
          ticketCount="5,000 tickets / month"
          helpdeskPrice="$750/mo"
          aiAgentPrice="$112/mo"
          aiAgentNote="~750 automated interactions · at $0.90 per interaction"
          ctaLabel="Talk to sales"
        />
      </div>
    </main>
  );
}
