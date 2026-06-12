// Ambient types for Webflow code component globals injected by @webflow/cli

type AttributeType =
  | { type: "PlainText"; defaultValue?: string; displayName?: string }
  | { type: "RichText"; defaultValue?: string; displayName?: string }
  | { type: "Image"; displayName?: string }
  | { type: "Boolean"; defaultValue?: boolean; displayName?: string }
  | { type: "Number"; defaultValue?: number; displayName?: string }
  | {
      type: "Enum";
      options: { value: string; displayName?: string }[];
      defaultValue?: string;
      displayName?: string;
    };

type SlotOptions = { displayName?: string };

declare function attribute(options: AttributeType): unknown;
declare function slot(options?: SlotOptions): unknown;

declare function declareComponent<P extends Record<string, unknown>>(options: {
  component: React.ComponentType<P>;
  displayName: string;
  props?: Record<string, unknown>;
  ssr?: boolean;
}): void;
