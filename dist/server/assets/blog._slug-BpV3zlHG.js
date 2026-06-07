import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
const SplitNotFoundComponent = () => /* @__PURE__ */ jsxs("div", { className: "container-prose py-32 text-center", children: [
  /* @__PURE__ */ jsx("h1", { className: "font-display text-3xl text-primary", children: "Post not found" }),
  /* @__PURE__ */ jsx(Link, { to: "/blog", className: "mt-4 inline-block text-gold font-semibold", children: "← Back to news" })
] });
export {
  SplitNotFoundComponent as notFoundComponent
};
