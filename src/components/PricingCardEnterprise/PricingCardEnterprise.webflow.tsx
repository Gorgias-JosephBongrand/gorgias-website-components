import { PricingCardEnterprise } from "./PricingCardEnterprise";

const DEFAULT_FEATURES_STR = [
  "SSO (SAML), audit logs, SCIM provisioning",
  "Unlimited Help Centers, API 4 req/sec",
  "Custom DPA/MSA + security review support",
  "Dedicated CSM + solutions architect",
  "New Actions / deeper integrations & custom automations",
  "Knowledge-gap and knowledge-conflict opportunities",
];

const PricingCardEnterpriseWebflow = declareComponent(PricingCardEnterprise, {
  name: "PricingCardEnterprise",
  description: "Full-width 2-column enterprise card with feature list. Not a plan card — separate CTA section.",
  group: "Pricing",
  props: {
    eyebrow: attribute.text("Eyebrow", { defaultValue: "Enterprise" }),
    title: attribute.text("Title", { defaultValue: "Need a fully custom plan?" }),
    description: attribute.text("Description", {
      defaultValue:
        "Get a tailored package with dedicated support, custom integrations, and enterprise-grade security built around your team.",
    }),
    ctaLabel: attribute.text("CTA label", { defaultValue: "Talk to Sales" }),
    ctaHref: attribute.text("CTA href", { defaultValue: "#" }),
    features: attribute.json("Features", { defaultValue: DEFAULT_FEATURES_STR }),
  },
  ssr: true,
});

export default PricingCardEnterpriseWebflow;
