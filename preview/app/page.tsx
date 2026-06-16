import { PricingPlans } from "../../src/components/PricingPlans/PricingPlans";
import { AddonCard } from "../../src/components/AddonCard/AddonCard";
import { CompareTable } from "../../src/components/CompareTable/CompareTable";
import { Faq } from "../../src/components/Faq/Faq";
import { Navbar } from "../../src/components/Navbar/Navbar";

export default function PreviewPage() {
  return (
    <main style={{ background: "#ffffff", minHeight: "100vh", padding: "48px 24px" }}>
      <Navbar />
      <div style={{ height: 96 }} />
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
        <AddonCard kind="sms" />
      </div>

      <h2 style={{ textAlign: "center", margin: "64px 0 40px", fontSize: 20, fontWeight: 600, color: "#1a1e23" }}>
        Compare Plans
      </h2>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <CompareTable />
      </div>

      <h2 style={{ textAlign: "center", margin: "64px 0 40px", fontSize: 20, fontWeight: 600, color: "#1a1e23" }}>
        FAQ
      </h2>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <Faq />
      </div>
    </main>
  );
}
