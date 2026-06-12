import { Badge } from "./Badge";

declareComponent({
  component: Badge,
  displayName: "Badge",
  ssr: true,
  props: {
    children: slot({ displayName: "Text" }),
    variant: attribute({
      type: "Enum",
      displayName: "Variant",
      options: [
        { value: "default", displayName: "Brand" },
        { value: "success", displayName: "Success" },
        { value: "neutral", displayName: "Neutral" },
        { value: "accent", displayName: "Accent" },
      ],
      defaultValue: "default",
    }),
  },
});
