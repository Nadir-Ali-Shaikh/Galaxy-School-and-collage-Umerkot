import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { P as PageHero } from "./Section-DSunpl44.js";
import { R as Route, h as heroImg } from "./router-u_y3GPsN.js";
import { useState, useEffect } from "react";
import { u as useSiteContent } from "./use-site-content-CQfIhHeJ.js";
import { s as supabase } from "./client-B4EfndxM.js";
import "@tanstack/react-query";
import "lucide-react";
import "zod";
import "@supabase/supabase-js";
import "@libsql/client/web";
function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
function Gallery() {
  const {
    category
  } = Route.useSearch();
  const [active, setActive] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const c = useSiteContent("gallery");
  const heroImage = c.get("hero", "image_url") || heroImg;
  useEffect(() => {
    supabase.from("gallery_items").select("*").order("sort_order").order("created_at", {
      ascending: false
    }).then(({
      data
    }) => {
      setItems(data ?? []);
      setLoading(false);
    });
  }, []);
  useEffect(() => {
    if (!category || loading) return;
    const id = `cat-${slugify(category)}`;
    const el = document.getElementById(id);
    if (el) {
      setTimeout(() => el.scrollIntoView({
        behavior: "smooth",
        block: "start"
      }), 100);
    }
  }, [category, loading]);
  const visible = category ? items.filter((i) => (i.category ?? "Uncategorized") === category) : items;
  const grouped = /* @__PURE__ */ new Map();
  visible.forEach((it) => {
    const k = it.category ?? "Uncategorized";
    if (!grouped.has(k)) grouped.set(k, []);
    grouped.get(k).push(it);
  });
  const sections = Array.from(grouped.entries());
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PageHero, { eyebrow: "Gallery", title: category ? category : "A glimpse into life at our school.", description: category ? `Photos and videos from ${category}.` : "Smiling faces, focused minds and proud moments — captured across our campus.", image: heroImage }),
    category && /* @__PURE__ */ jsx("div", { className: "container-prose pt-6", children: /* @__PURE__ */ jsx(Link, { to: "/gallery", search: {}, className: "text-sm text-primary hover:underline", children: "← View all categories" }) }),
    /* @__PURE__ */ jsx("section", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "container-prose space-y-16", children: [
      loading && /* @__PURE__ */ jsx("div", { className: "text-center text-muted-foreground py-12", children: "Loading…" }),
      !loading && sections.length === 0 && /* @__PURE__ */ jsx("div", { className: "text-center text-muted-foreground py-12", children: category ? `No images for "${category}" yet.` : "No images in the gallery yet." }),
      sections.map(([cat, list]) => /* @__PURE__ */ jsxs("div", { id: `cat-${slugify(cat)}`, className: "scroll-mt-24", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "text-xs font-semibold uppercase tracking-[0.25em] text-gold mb-2", children: "Section" }),
          /* @__PURE__ */ jsx("h2", { className: "font-display text-2xl md:text-3xl font-bold text-primary", children: cat })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: list.map((p) => /* @__PURE__ */ jsxs("button", { onClick: () => setActive(p.image_url), className: "group relative overflow-hidden rounded-2xl aspect-[4/3] text-left", children: [
          /* @__PURE__ */ jsx("img", { src: p.image_url, alt: p.title ?? cat, className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110", loading: "lazy" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#060612]/80 via-[#060612]/20 to-transparent" }),
          p.title && /* @__PURE__ */ jsx("div", { className: "absolute bottom-4 left-4 right-4 text-white font-semibold", children: p.title })
        ] }, p.id)) })
      ] }, cat))
    ] }) }),
    active && /* @__PURE__ */ jsx("div", { onClick: () => setActive(null), className: "fixed inset-0 z-50 bg-[#060612]/90 backdrop-blur grid place-items-center p-6 cursor-zoom-out", children: /* @__PURE__ */ jsx("img", { src: active, alt: "", className: "max-h-[88vh] max-w-full rounded-xl shadow-elegant" }) })
  ] });
}
export {
  Gallery as component
};
