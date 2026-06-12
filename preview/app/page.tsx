import { PricingSection } from "./PricingSection";

export default function PreviewPage() {
  return (
    <main style={{ background: "#ffffff", minHeight: "100vh", padding: "48px 24px" }}>
      <h1 style={{ textAlign: "center", marginBottom: 40, fontSize: 20, fontWeight: 600, color: "#1a1e23" }}>
        Pricing Cards — Component Preview
      </h1>
      <PricingSection />
    </main>
  );
}
