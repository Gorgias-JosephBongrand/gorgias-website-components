import { Button } from "./Button";

// Component filename is a stable identifier — renaming this file
// creates a new component in Webflow and breaks existing canvas instances.

declareComponent({
  component: Button,
  displayName: "Button",
  ssr: true,
  props: {
    children: slot({ displayName: "Label" }),
    variant: attribute({
      type: "Enum",
      displayName: "Variant",
      options: [
        { value: "primary", displayName: "Primary" },
        { value: "secondary", displayName: "Secondary" },
        { value: "ghost", displayName: "Ghost" },
        { value: "destructive", displayName: "Destructive" },
      ],
      defaultValue: "primary",
    }),
    size: attribute({
      type: "Enum",
      displayName: "Size",
      options: [
        { value: "sm", displayName: "Small" },
        { value: "md", displayName: "Medium" },
        { value: "lg", displayName: "Large" },
      ],
      defaultValue: "md",
    }),
    ctaId: attribute({
      type: "PlainText",
      displayName: "CTA tracking ID",
      defaultValue: "",
    }),
    disabled: attribute({
      type: "Boolean",
      displayName: "Disabled",
      defaultValue: false,
    }),
  },
});
