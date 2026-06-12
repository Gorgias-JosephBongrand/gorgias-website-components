import { AiAgentToggle } from "./AiAgentToggle";

const AiAgentToggleWebflow = declareComponent(AiAgentToggle, {
  name: "AiAgentToggle",
  description: "AI Agent on/off toggle. Wire onChange to pricing cards via Webflow interactions.",
  group: "Pricing",
  props: {
    defaultOn: attribute.boolean("Default on", { defaultValue: true }),
    label: attribute.text("Label", { defaultValue: "AI Agent" }),
    sublabel: attribute.text("Sublabel", { defaultValue: "Add AI automation to your plan" }),
  },
  ssr: false,
});

export default AiAgentToggleWebflow;
