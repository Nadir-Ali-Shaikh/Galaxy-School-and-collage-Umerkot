import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { P as PageHero } from "./Section-DSunpl44.js";
import { Monitor, FlaskConical, BookOpen, Languages, Moon, ShieldCheck, Users, Trophy, Bus } from "lucide-react";
import { l as labImg } from "./router-u_y3GPsN.js";
import { u as useSiteContent } from "./use-site-content-CQfIhHeJ.js";
import { S as ScrollReveal } from "./ScrollReveal-CVX44pax.js";
import "@tanstack/react-query";
import "react";
import "zod";
import "./client-B4EfndxM.js";
import "@supabase/supabase-js";
import "@libsql/client/web";
function Facilities() {
  const c = useSiteContent("facilities");
  const facilities = [{
    icon: Monitor,
    slug: "Smart Classrooms",
    title: "Smart Classrooms",
    desc: "Interactive displays and digital content for every class."
  }, {
    icon: FlaskConical,
    slug: "Science & Computer Labs",
    title: c.get("labs", "title", "Science & Computer Labs"),
    desc: c.get("labs", "body", "Hands-on learning with modern equipment and software.")
  }, {
    icon: BookOpen,
    slug: "Library",
    title: c.get("library", "title", "Library"),
    desc: c.get("library", "body", "A growing collection of books, references and reading corners.")
  }, {
    icon: Languages,
    slug: "English Medium",
    title: "English Medium",
    desc: "A confident command of English from the very first year."
  }, {
    icon: Moon,
    slug: "Islamic Education",
    title: "Islamic Education",
    desc: "Qur'an, character building and Islamic values woven into school life."
  }, {
    icon: ShieldCheck,
    slug: "CCTV Security",
    title: "CCTV Security",
    desc: "Round-the-clock monitoring across the entire campus."
  }, {
    icon: Users,
    slug: "Experienced Teachers",
    title: "Experienced Teachers",
    desc: "A dedicated, qualified and continuously trained faculty."
  }, {
    icon: Trophy,
    slug: "Sports & Activities",
    title: c.get("sports", "title", "Sports & Activities"),
    desc: c.get("sports", "body", "Cricket, football, athletics, debates, arts and annual functions.")
  }, {
    icon: Bus,
    slug: "Transport",
    title: "Transport (Optional)",
    desc: "Safe transportation routes covering key areas of Umerkot."
  }];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PageHero, { eyebrow: "Facilities", title: c.get("hero", "title", "A campus built for modern learning."), description: c.get("hero", "subtitle", "Every facility — from smart classrooms to sports grounds — is designed to give our students the tools and space to thrive."), image: c.get("labs", "image") || labImg }),
    /* @__PURE__ */ jsx("section", { className: "py-20 content-lazy-render", children: /* @__PURE__ */ jsx("div", { className: "container-prose", children: /* @__PURE__ */ jsx(ScrollReveal, { animation: "fade-up", duration: 900, children: /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6", children: facilities.map((f) => /* @__PURE__ */ jsxs(Link, { to: "/gallery", search: {
      category: f.slug
    }, className: "group rounded-2xl border bg-card p-8 hover:shadow-elegant hover:-translate-y-1 transition-all text-left block", children: [
      /* @__PURE__ */ jsx("div", { className: "h-12 w-12 rounded-xl bg-primary/5 text-primary grid place-items-center group-hover:bg-gold group-hover:text-gold-foreground transition-colors", children: /* @__PURE__ */ jsx(f.icon, { className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsx("h3", { className: "mt-5 text-lg font-semibold text-primary", children: f.title }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground leading-relaxed", children: f.desc }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 text-xs font-semibold text-gold uppercase tracking-wider", children: "View photos →" })
    ] }, f.slug)) }) }) }) })
  ] });
}
export {
  Facilities as component
};
