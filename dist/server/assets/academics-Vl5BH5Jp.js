import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { P as PageHero, S as SectionHeading } from "./Section-DSunpl44.js";
import { c as classroomImg, g as graduationImg } from "./router-u_y3GPsN.js";
import { l as libraryImg } from "./library-EUrNu8O0.js";
import { u as useSiteContent } from "./use-site-content-CQfIhHeJ.js";
import { S as ScrollReveal } from "./ScrollReveal-CVX44pax.js";
import "@tanstack/react-query";
import "react";
import "lucide-react";
import "zod";
import "./client-B4EfndxM.js";
import "@supabase/supabase-js";
import "@libsql/client/web";
const montessoriImg = "/assets/montessori-MgKtRGXi.jpg";
function Academics() {
  const c = useSiteContent("academics");
  const heroImage = c.get("hero", "image_url") || classroomImg;
  const sections = [{
    name: c.get("montessori", "title", "Montessori"),
    grades: "Playgroup – KG",
    img: c.get("montessori", "image") || montessoriImg,
    body: c.get("montessori", "body", "A nurturing first step into learning."),
    highlights: ["Trained Montessori teachers", "Activity-based learning", "Safe, joyful environment"]
  }, {
    name: c.get("primary", "title", "Primary"),
    grades: "Class 1 – 5",
    img: c.get("primary", "image") || classroomImg,
    body: c.get("primary", "body", "Strong academic foundation."),
    highlights: ["English-medium curriculum", "Smart classroom integration", "Regular parent feedback"]
  }, {
    name: c.get("secondary", "title", "Secondary"),
    grades: "Class 6 – 10",
    img: c.get("secondary", "image") || c.get("middle", "image") || libraryImg,
    body: c.get("secondary", "body", "Cambridge and Matriculation streams."),
    highlights: ["Science & Computer labs", "Board exam preparation", "Co-curricular activities"]
  }, {
    name: c.get("college", "title", "College Section"),
    grades: "Intermediate (XI – XII)",
    img: c.get("college", "image") || graduationImg,
    body: c.get("college", "body", "Pre-Medical, Pre-Engineering, ICS, and Commerce groups."),
    highlights: ["Multiple academic groups", "Entry test guidance", "Career counselling"]
  }];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PageHero, { eyebrow: "Academics", title: c.get("hero", "title", "A complete academic journey, under one roof."), description: c.get("hero", "subtitle", "From Montessori to College, we offer comprehensive education at every stage."), image: heroImage }),
    /* @__PURE__ */ jsx("section", { className: "py-20 overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "container-prose space-y-16", children: sections.map((s, i) => /* @__PURE__ */ jsxs("div", { className: `grid lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`, children: [
      /* @__PURE__ */ jsx(ScrollReveal, { animation: i % 2 === 0 ? "slide-left" : "slide-right", duration: 900, className: "w-full", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute -inset-3 bg-gold/20 rounded-3xl -rotate-1" }),
        /* @__PURE__ */ jsx("img", { src: s.img, alt: s.name, className: "relative rounded-3xl shadow-elegant w-full aspect-[4/3] object-cover", width: 1600, height: 1067, loading: "lazy" })
      ] }) }),
      /* @__PURE__ */ jsx(ScrollReveal, { animation: i % 2 === 0 ? "slide-right" : "slide-left", duration: 900, className: "w-full", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "text-xs font-semibold uppercase tracking-[0.25em] text-gold", children: s.grades }),
        /* @__PURE__ */ jsx("h2", { className: "mt-2 font-display text-3xl md:text-4xl font-bold text-primary", children: s.name }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-muted-foreground leading-relaxed", children: s.body }),
        /* @__PURE__ */ jsx("ul", { className: "mt-5 space-y-2", children: s.highlights.map((h) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2 text-sm text-foreground", children: [
          /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-gold" }),
          " ",
          h
        ] }, h)) }),
        /* @__PURE__ */ jsxs(Link, { to: "/admissions", className: "mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary/90", children: [
          "Apply to ",
          s.name
        ] })
      ] }) })
    ] }, s.name)) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-secondary content-lazy-render", children: /* @__PURE__ */ jsx("div", { className: "container-prose", children: /* @__PURE__ */ jsxs(ScrollReveal, { animation: "fade-up", duration: 900, children: [
      /* @__PURE__ */ jsx(SectionHeading, { center: true, eyebrow: "Our Curriculum", title: "Built for understanding, not just memorisation", description: "A balanced curriculum integrating national board syllabi with smart classroom tools, continuous assessment and value-based learning." }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-4 gap-4", children: ["English", "Urdu", "Mathematics", "Science", "Islamic Studies", "Computer", "Social Studies", "Arts & Sports"].map((c2) => /* @__PURE__ */ jsx("div", { className: "rounded-xl bg-card border p-5 text-center font-medium text-primary hover:shadow-elegant transition-all hover:-translate-y-1", children: c2 }, c2)) })
    ] }) }) })
  ] });
}
export {
  Academics as component
};
