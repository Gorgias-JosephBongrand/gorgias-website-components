import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import { Navbar } from "./Navbar";
import { DEFAULT_MENU, GORGIAS_LOGO } from "./navbar-data";

export default declareComponent(Navbar, {
  name: "Navbar",
  description:
    "Primary navigation with hover mega-menu (desktop), scroll-blur pill, and a burger accordion (mobile). Menu structure is editable as JSON; CTAs use Webflow links.",
  group: "Navigation",
  props: {
    logoSrc: props.Text({
      name: "Logo URL",
      defaultValue: GORGIAS_LOGO,
    }),
    logoAlt: props.Text({ name: "Logo alt", defaultValue: "Gorgias" }),
    brandHref: props.Link({ name: "Brand link" }),
    menuJson: props.Text({
      name: "Menu JSON",
      defaultValue: JSON.stringify(DEFAULT_MENU),
    }),
    loginLabel: props.Text({ name: "Login label", defaultValue: "Login" }),
    loginHref: props.Link({ name: "Login link" }),
    demoLabel: props.Text({ name: "Demo label", defaultValue: "Book a demo" }),
    demoHref: props.Link({ name: "Demo link" }),
    signupLabel: props.Text({ name: "Signup label", defaultValue: "Sign up free" }),
    signupHref: props.Link({ name: "Signup link" }),
    scrollThreshold: props.Number({ name: "Scroll threshold (px)", defaultValue: 8 }),
  },
  options: {
    // Reads window.scrollY and toggles hover state — client-only
    ssr: false,
  },
});
