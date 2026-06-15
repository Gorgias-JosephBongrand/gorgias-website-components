import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import { PricingCardEnterprise } from "./PricingCardEnterprise";

const DEFAULT_FEATURES = [
  "SSO (SAML), audit logs, SCIM provisioning",
  "Unlimited Help Centers, API 4 req/sec",
  "Custom DPA/MSA + security review support",
  "Dedicated CSM + solutions architect",
  "New Actions / deeper integrations & custom automations",
  "Knowledge-gap and knowledge-conflict opportunities",
].join(" | ");

export default declareComponent(PricingCardEnterprise, {
  name: "PricingCardEnterprise",
  description:
    "Full-width 2-column enterprise card with feature list. Not a plan card — separate CTA section.",
  group: "Pricing",
  props: {
    title: props.Text({ name: "Title", defaultValue: "Need a fully custom plan?" }),
    description: props.Text({
      name: "Description",
      defaultValue:
        "For teams over 5,000 conversations/month with complex security, compliance, or integration needs.",
    }),
    ctaLabel: props.Text({ name: "CTA label", defaultValue: "Talk to Sales" }),
    ctaHref: props.Link({ name: "CTA link" }),
    features: props.Text({
      name: "Features, separated by |",
      defaultValue: DEFAULT_FEATURES,
    }),
  },
  options: {
    ssr: true,
  },
});
