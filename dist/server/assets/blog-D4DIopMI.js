import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { P as PageHero } from "./Section-DSunpl44.js";
import { Loader2, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { h as heroImg } from "./router-u_y3GPsN.js";
import { u as useSiteContent } from "./use-site-content-CQfIhHeJ.js";
import { s as supabase } from "./client-B4EfndxM.js";
import "@tanstack/react-query";
import "zod";
import "@supabase/supabase-js";
import "@libsql/client/web";
function Blog() {
  const c = useSiteContent("blog");
  const heroImage = c.get("hero", "image_url") || heroImg;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.from("blogs").select("id, slug, title, excerpt, category, image_url, published_at").eq("published", true).order("published_at", {
      ascending: false
    }).then(({
      data
    }) => {
      setPosts(data ?? []);
      setLoading(false);
    });
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PageHero, { eyebrow: c.get("hero", "eyebrow", "News & Blog"), title: c.get("hero", "title", "Stories from our campus."), description: c.get("hero", "description", "Announcements, results, events and updates from the heart of Galaxy Public School & College Umerkot."), image: heroImage }),
    /* @__PURE__ */ jsx("section", { className: "py-20", children: /* @__PURE__ */ jsx("div", { className: "container-prose", children: loading ? /* @__PURE__ */ jsx("div", { className: "grid place-items-center py-16", children: /* @__PURE__ */ jsx(Loader2, { className: "h-6 w-6 animate-spin text-primary" }) }) : posts.length === 0 ? /* @__PURE__ */ jsx("div", { className: "text-center text-muted-foreground py-16", children: c.get("empty", "message", "No news posts yet. Check back soon.") }) : /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: posts.map((p) => /* @__PURE__ */ jsxs(Link, { to: "/blog/$slug", params: {
      slug: p.slug
    }, className: "group rounded-2xl overflow-hidden bg-card border hover:shadow-elegant hover:-translate-y-1 transition-all", children: [
      /* @__PURE__ */ jsx("div", { className: "aspect-[16/10] overflow-hidden bg-secondary", children: p.image_url && /* @__PURE__ */ jsx("img", { src: p.image_url, alt: p.title, loading: "lazy", className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" }) }),
      /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-xs text-white/60", children: [
          p.category && /* @__PURE__ */ jsx("span", { className: "px-2 py-0.5 rounded-full bg-white/10 border border-white/10 text-white text-[10px] font-semibold tracking-wide uppercase", children: p.category }),
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "h-3 w-3" }),
            " ",
            new Date(p.published_at).toLocaleDateString()
          ] })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "mt-3 font-display text-xl font-semibold text-white leading-snug group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.85)] transition-all duration-300", children: p.title }),
        p.excerpt && /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground line-clamp-2", children: p.excerpt })
      ] })
    ] }, p.id)) }) }) })
  ] });
}
export {
  Blog as component
};
