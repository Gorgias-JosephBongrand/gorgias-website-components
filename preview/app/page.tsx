import { PricingPlans } from "../../src/components/PricingPlans/PricingPlans";
import { AddonCard } from "../../src/components/AddonCard/AddonCard";

export default function PreviewPage() {
  return (
    <main style={{ background: "#ffffff", minHeight: "100vh", padding: "48px 24px" }}>
      <h1 style={{ textAlign: "center", marginBottom: 40, fontSize: 20, fontWeight: 600, color: "#1a1e23" }}>
        Pricing Cards — Component Preview
      </h1>
      <PricingPlans />

      <h2 style={{ textAlign: "center", margin: "64px 0 40px", fontSize: 20, fontWeight: 600, color: "#1a1e23" }}>
        Voice &amp; SMS Add-ons
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 48,
          maxWidth: 1240,
          margin: "0 auto",
        }}
      >
        <AddonCard kind="voice" />
        <AddonCard
          kind="sms"
          title="SMS"
          tagline="Two-way text conversations, on any plan"
          counted="A conversation becomes an SMS ticket the moment a text is exchanged. Unlimited follow-up texts on that ticket at no extra charge."
          tags={"Inbound & outbound\nWorks with marketing tools\nMMS supported\nAI Agent answers on SMS"}
          unit="texts"
        />
      </div>
    </main>
  );
}
