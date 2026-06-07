import { jsx, jsxs } from "react/jsx-runtime";
import { notFound, Link } from "@tanstack/react-router";
import { Loader2, ArrowLeft, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { s as supabase } from "./client-B4EfndxM.js";
import { a as Route } from "./router-u_y3GPsN.js";
import "@supabase/supabase-js";
import "@libsql/client/web";
import "@tanstack/react-query";
import "zod";
function PostPage() {
  const {
    slug
  } = Route.useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);
  useEffect(() => {
    supabase.from("blogs").select("*").eq("slug", slug).eq("published", true).maybeSingle().then(({
      data
    }) => {
      if (!data) setMissing(true);
      else setPost(data);
      setLoading(false);
    });
  }, [slug]);
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "container-prose py-32 grid place-items-center", children: /* @__PURE__ */ jsx(Loader2, { className: "h-6 w-6 animate-spin text-primary" }) });
  }
  if (missing || !post) {
    throw notFound();
  }
  const paragraphs = (post.body ?? "").split(/\n\s*\n/).filter(Boolean);
  return /* @__PURE__ */ jsxs("article", { children: [
    /* @__PURE__ */ jsxs("section", { className: "relative h-[50vh] min-h-[360px] flex items-end", children: [
      /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 bg-background", children: [
        post.image_url && /* @__PURE__ */ jsx("img", { src: post.image_url, alt: "", className: "w-full h-full object-cover" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#060612]/85 via-[#060612]/50 to-[#060612]/10" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative container-prose pb-12 text-white", children: [
        /* @__PURE__ */ jsxs(Link, { to: "/blog", className: "inline-flex items-center gap-2 text-white/70 text-sm font-semibold mb-4 hover:text-white hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.8)] transition-all duration-300", children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
          " All News"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-xs", children: [
          post.category && /* @__PURE__ */ jsx("span", { className: "px-2 py-0.5 rounded-full bg-white/10 border border-white/10 text-white text-[10px] font-semibold tracking-wide uppercase", children: post.category }),
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 text-white/80", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "h-3 w-3" }),
            " ",
            new Date(post.published_at).toLocaleDateString()
          ] })
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "mt-3 font-display text-3xl md:text-5xl font-bold max-w-3xl leading-tight", children: post.title })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-16", children: /* @__PURE__ */ jsx("div", { className: "container-prose max-w-3xl space-y-5 text-foreground leading-relaxed", children: paragraphs.length > 0 ? paragraphs.map((p, i) => /* @__PURE__ */ jsx("p", { children: p }, i)) : /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "No content yet." }) }) })
  ] });
}
export {
  PostPage as component
};
