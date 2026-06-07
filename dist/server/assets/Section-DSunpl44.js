import { jsxs, jsx } from "react/jsx-runtime";
function SectionHeading({
  eyebrow,
  title,
  description,
  center = false
}) {
  return /* @__PURE__ */ jsxs("div", { className: `mb-12 ${center ? "text-center mx-auto max-w-2xl" : "max-w-3xl"}`, children: [
    eyebrow && /* @__PURE__ */ jsx("div", { className: "text-xs font-semibold uppercase tracking-[0.25em] text-gold mb-3", children: eyebrow }),
    /* @__PURE__ */ jsx("h2", { className: "font-display text-3xl md:text-4xl font-bold text-primary leading-tight", children: title }),
    description && /* @__PURE__ */ jsx("p", { className: "mt-4 text-muted-foreground text-base md:text-lg leading-relaxed", children: description })
  ] });
}
function PageHero({
  eyebrow,
  title,
  description,
  image
}) {
  return /* @__PURE__ */ jsxs("section", { className: "relative h-[44vh] min-h-[320px] flex items-end", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0", children: [
      /* @__PURE__ */ jsx("img", { src: image, alt: "", className: "w-full h-full object-cover", loading: "eager", fetchPriority: "high" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#060612]/85 via-[#060612]/60 to-[#060612]/20" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative container-prose pb-12 text-white", children: [
      /* @__PURE__ */ jsx("div", { className: "text-xs font-semibold uppercase tracking-[0.3em] text-white/80 mb-3", children: eyebrow }),
      /* @__PURE__ */ jsx("h1", { className: "font-display text-4xl md:text-6xl font-bold leading-tight max-w-3xl", children: title }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-base md:text-lg text-white/90 max-w-2xl", children: description })
    ] })
  ] });
}
export {
  PageHero as P,
  SectionHeading as S
};
