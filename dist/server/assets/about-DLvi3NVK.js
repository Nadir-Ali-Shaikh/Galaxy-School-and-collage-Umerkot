import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Target, Eye, Heart, Award } from "lucide-react";
import { P as PageHero, S as SectionHeading } from "./Section-DSunpl44.js";
import { h as heroImg } from "./router-u_y3GPsN.js";
import { p as principalImg } from "./principal-BG4gMyFt.js";
import { u as useSiteContent } from "./use-site-content-CQfIhHeJ.js";
import { S as ScrollReveal } from "./ScrollReveal-CVX44pax.js";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "react";
import "zod";
import "./client-B4EfndxM.js";
import "@supabase/supabase-js";
import "@libsql/client/web";
function About() {
  const c = useSiteContent("about");
  const principalPhoto = c.get("principal", "photo") || principalImg;
  const heroImage = c.get("hero", "image_url") || heroImg;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PageHero, { eyebrow: "About Us", title: c.get("hero", "title", "A legacy of education in Umerkot."), description: c.get("hero", "subtitle", "From humble beginnings to one of the region's most trusted institutions, our story is one of dedication, growth and unwavering belief in young minds."), image: heroImage }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-secondary content-lazy-render", children: /* @__PURE__ */ jsx("div", { className: "container-prose", children: /* @__PURE__ */ jsxs(ScrollReveal, { animation: "fade-up", duration: 900, children: [
      /* @__PURE__ */ jsx(SectionHeading, { center: true, eyebrow: "What We Stand For", title: "Mission, Vision & Values" }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-6", children: [{
        icon: Target,
        title: c.get("mission", "title", "Our Mission"),
        body: c.get("mission", "body", "To deliver excellent academic education combined with strong moral character and Islamic values.")
      }, {
        icon: Eye,
        title: c.get("vision", "title", "Our Vision"),
        body: c.get("vision", "body", "To be the leading institution in Umerkot producing confident, ethical and globally-minded leaders.")
      }, {
        icon: Heart,
        title: "Our Values",
        body: "Integrity, excellence, respect, compassion and lifelong curiosity guide everything we do."
      }].map((v) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-card border p-8 hover:shadow-elegant transition-all hover:-translate-y-1", children: [
        /* @__PURE__ */ jsx("div", { className: "h-12 w-12 rounded-xl bg-gold text-gold-foreground grid place-items-center", children: /* @__PURE__ */ jsx(v.icon, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsx("h3", { className: "mt-5 text-lg font-semibold text-primary", children: v.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground leading-relaxed", children: v.body })
      ] }, v.title)) })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 content-lazy-render", children: /* @__PURE__ */ jsxs("div", { className: "container-prose grid lg:grid-cols-2 gap-12 items-center overflow-hidden", children: [
      /* @__PURE__ */ jsx(ScrollReveal, { animation: "slide-left", duration: 900, className: "w-full", children: /* @__PURE__ */ jsx("img", { src: principalPhoto, alt: "Principal", className: "rounded-3xl shadow-elegant w-full", width: 1024, height: 1280, loading: "lazy" }) }),
      /* @__PURE__ */ jsx(ScrollReveal, { animation: "slide-right", duration: 900, className: "w-full", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "text-xs font-semibold uppercase tracking-[0.25em] text-gold mb-3", children: "Principal's Message" }),
        /* @__PURE__ */ jsx("h2", { className: "font-display text-3xl md:text-4xl font-bold text-primary", children: c.get("principal", "name", "Dr. Muhammad Galaxy") }),
        /* @__PURE__ */ jsx("div", { className: "mt-2 text-sm text-muted-foreground", children: c.get("principal", "title", "Founder & Principal") }),
        /* @__PURE__ */ jsx("div", { className: "mt-6 space-y-4 text-muted-foreground leading-relaxed", children: /* @__PURE__ */ jsx("p", { children: c.get("principal", "message", "Education is the most powerful weapon to change the world. At Galaxy Public School & College, we are committed to nurturing every child's potential.") }) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 flex items-start gap-3 text-sm", children: [
          /* @__PURE__ */ jsx(Award, { className: "h-5 w-5 text-gold flex-shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Consistently top results in board exams, recognized college section, active parent and alumni community." })
        ] })
      ] }) })
    ] }) })
  ] });
}
export {
  About as component
};
