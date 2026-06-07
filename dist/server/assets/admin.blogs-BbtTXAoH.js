import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect, useMemo } from "react";
import { Newspaper, FileText, Plus, Loader2, Calendar, EyeOff, Eye, Pencil, Trash2, X, Save, Check } from "lucide-react";
import { s as supabase } from "./client-B4EfndxM.js";
import { I as ImageUpload } from "./ImageUpload-RrFPxMyT.js";
import "@supabase/supabase-js";
import "@libsql/client/web";
const empty = {
  slug: "",
  title: "",
  excerpt: "",
  body: "",
  category: "Announcements",
  image_url: null,
  published: true
};
const slugify = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
function BlogsAdmin() {
  const [tab, setTab] = useState("posts");
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { className: "font-display text-2xl font-bold text-primary", children: "News & Blog" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Manage news posts and the public News page content." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-1 border-b", children: [
      /* @__PURE__ */ jsx(TabBtn, { active: tab === "posts", onClick: () => setTab("posts"), icon: /* @__PURE__ */ jsx(Newspaper, { className: "h-4 w-4" }), label: "News posts" }),
      /* @__PURE__ */ jsx(TabBtn, { active: tab === "page", onClick: () => setTab("page"), icon: /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4" }), label: "Page content" })
    ] }),
    tab === "posts" ? /* @__PURE__ */ jsx(PostsPanel, {}) : /* @__PURE__ */ jsx(PageContentPanel, {})
  ] });
}
function TabBtn({
  active,
  onClick,
  icon,
  label
}) {
  return /* @__PURE__ */ jsxs("button", { onClick, className: `inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition ${active ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`, children: [
    icon,
    " ",
    label
  ] });
}
function PostsPanel() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");
  const load = async () => {
    setLoading(true);
    const {
      data
    } = await supabase.from("blogs").select("*").order("published_at", {
      ascending: false
    });
    setItems(data ?? []);
    setLoading(false);
  };
  useEffect(() => {
    load();
  }, []);
  const filtered = useMemo(() => items.filter((b) => {
    if (filter === "published" && !b.published) return false;
    if (filter === "draft" && b.published) return false;
    if (q && !`${b.title} ${b.category ?? ""}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  }), [items, q, filter]);
  const save = async () => {
    if (!editing) return;
    setSaving(true);
    const payload = {
      slug: editing.slug || slugify(editing.title || ""),
      title: editing.title,
      excerpt: editing.excerpt,
      body: editing.body,
      category: editing.category,
      image_url: editing.image_url,
      published: editing.published ?? true
    };
    const res = editing.id ? await supabase.from("blogs").update(payload).eq("id", editing.id) : await supabase.from("blogs").insert(payload);
    setSaving(false);
    if (res.error) {
      alert(res.error.message);
      return;
    }
    setEditing(null);
    load();
  };
  const remove = async (id) => {
    if (!confirm("Delete this post?")) return;
    await supabase.from("blogs").delete().eq("id", id);
    load();
  };
  const togglePublish = async (b) => {
    await supabase.from("blogs").update({
      published: !b.published
    }).eq("id", b.id);
    load();
  };
  const stats = useMemo(() => ({
    total: items.length,
    published: items.filter((b) => b.published).length,
    draft: items.filter((b) => !b.published).length
  }), [items]);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
      /* @__PURE__ */ jsx(StatCard, { label: "Total", value: stats.total }),
      /* @__PURE__ */ jsx(StatCard, { label: "Published", value: stats.published, tone: "success" }),
      /* @__PURE__ */ jsx(StatCard, { label: "Drafts", value: stats.draft, tone: "muted" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3 items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center flex-1 min-w-[200px]", children: [
        /* @__PURE__ */ jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Search posts…", className: "flex-1 max-w-sm rounded-md border bg-background px-3 py-2 text-sm" }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-1 rounded-md border bg-card p-1", children: ["all", "published", "draft"].map((f) => /* @__PURE__ */ jsx("button", { onClick: () => setFilter(f), className: `px-3 py-1 text-xs rounded capitalize ${filter === f ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`, children: f }, f)) })
      ] }),
      /* @__PURE__ */ jsxs("button", { onClick: () => setEditing({
        ...empty
      }), className: "inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition", children: [
        /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
        " New post"
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsx("div", { className: "h-48 grid place-items-center", children: /* @__PURE__ */ jsx(Loader2, { className: "h-6 w-6 animate-spin text-primary" }) }) : filtered.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border bg-card p-12 text-center", children: [
      /* @__PURE__ */ jsx(Newspaper, { className: "h-10 w-10 mx-auto text-muted-foreground mb-2" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: "No posts found." })
    ] }) : /* @__PURE__ */ jsx("div", { className: "grid gap-3", children: filtered.map((b) => /* @__PURE__ */ jsxs("div", { className: "group rounded-xl border bg-card hover:shadow-md transition overflow-hidden flex flex-col sm:flex-row", children: [
      /* @__PURE__ */ jsx("div", { className: "sm:w-40 aspect-[16/10] sm:aspect-auto bg-secondary shrink-0 overflow-hidden", children: b.image_url ? /* @__PURE__ */ jsx("img", { src: b.image_url, alt: b.title, className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsx("div", { className: "w-full h-full grid place-items-center text-muted-foreground", children: /* @__PURE__ */ jsx(FileText, { className: "h-6 w-6" }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 p-4 flex flex-col sm:flex-row sm:items-center gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-1", children: [
            b.category && /* @__PURE__ */ jsx("span", { className: "px-2 py-0.5 rounded-full bg-gold/15 text-xs font-semibold text-gold-foreground", children: b.category }),
            /* @__PURE__ */ jsx("span", { className: `px-2 py-0.5 rounded-full text-xs font-medium ${b.published ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground"}`, children: b.published ? "Published" : "Draft" }),
            /* @__PURE__ */ jsxs("span", { className: "text-xs text-muted-foreground inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "h-3 w-3" }),
              " ",
              new Date(b.published_at).toLocaleDateString()
            ] })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-primary truncate", children: b.title }),
          b.excerpt && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground line-clamp-1 mt-0.5", children: b.excerpt }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
            "/blog/",
            b.slug
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-1 shrink-0", children: [
          /* @__PURE__ */ jsx(IconBtn, { title: b.published ? "Unpublish" : "Publish", onClick: () => togglePublish(b), children: b.published ? /* @__PURE__ */ jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsx(IconBtn, { title: "Edit", onClick: () => setEditing(b), children: /* @__PURE__ */ jsx(Pencil, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsx(IconBtn, { title: "Delete", tone: "danger", onClick: () => remove(b.id), children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
        ] })
      ] })
    ] }, b.id)) }),
    editing && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-center p-4 overflow-y-auto", children: /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-2xl w-full max-w-2xl my-8 max-h-[90vh] flex flex-col shadow-2xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "p-5 border-b flex items-center justify-between sticky top-0 bg-card rounded-t-2xl", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-display text-xl font-bold text-primary", children: editing.id ? "Edit post" : "New post" }),
        /* @__PURE__ */ jsx("button", { onClick: () => setEditing(null), className: "p-1.5 hover:bg-secondary rounded", children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-5 grid gap-4 overflow-y-auto", children: [
        /* @__PURE__ */ jsx(Field, { label: "Title", children: /* @__PURE__ */ jsx("input", { value: editing.title ?? "", onChange: (e) => setEditing({
          ...editing,
          title: e.target.value,
          slug: editing.id ? editing.slug : slugify(e.target.value)
        }), className: "input-field" }) }),
        /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsx(Field, { label: "Slug", children: /* @__PURE__ */ jsx("input", { value: editing.slug ?? "", onChange: (e) => setEditing({
            ...editing,
            slug: slugify(e.target.value)
          }), className: "input-field" }) }),
          /* @__PURE__ */ jsx(Field, { label: "Category", children: /* @__PURE__ */ jsxs("select", { value: editing.category ?? "Announcements", onChange: (e) => setEditing({
            ...editing,
            category: e.target.value
          }), className: "input-field", children: [
            /* @__PURE__ */ jsx("option", { children: "Announcements" }),
            /* @__PURE__ */ jsx("option", { children: "Events" }),
            /* @__PURE__ */ jsx("option", { children: "Results" }),
            /* @__PURE__ */ jsx("option", { children: "Campus" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx(Field, { label: "Excerpt", children: /* @__PURE__ */ jsx("textarea", { rows: 2, value: editing.excerpt ?? "", onChange: (e) => setEditing({
          ...editing,
          excerpt: e.target.value
        }), className: "input-field" }) }),
        /* @__PURE__ */ jsx(Field, { label: "Body", children: /* @__PURE__ */ jsx("textarea", { rows: 8, value: editing.body ?? "", onChange: (e) => setEditing({
          ...editing,
          body: e.target.value
        }), className: "input-field", placeholder: "Use blank lines to separate paragraphs" }) }),
        /* @__PURE__ */ jsx(Field, { label: "Cover image", children: /* @__PURE__ */ jsx(ImageUpload, { value: editing.image_url, onChange: (url) => setEditing({
          ...editing,
          image_url: url
        }), folder: "blogs" }) }),
        /* @__PURE__ */ jsxs("label", { className: "inline-flex items-center gap-2 text-sm font-medium", children: [
          /* @__PURE__ */ jsx("input", { type: "checkbox", checked: editing.published ?? true, onChange: (e) => setEditing({
            ...editing,
            published: e.target.checked
          }) }),
          " Published"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-5 border-t flex justify-end gap-2 sticky bottom-0 bg-card rounded-b-2xl", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => setEditing(null), className: "px-4 py-2 rounded-md border text-sm hover:bg-secondary", children: "Cancel" }),
        /* @__PURE__ */ jsxs("button", { onClick: save, disabled: saving || !editing.title, className: "px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold disabled:opacity-60 inline-flex items-center gap-2", children: [
          saving ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(Save, { className: "h-4 w-4" }),
          " Save"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("style", { children: `.input-field{width:100%;border-radius:0.375rem;border:1px solid hsl(var(--border));background:hsl(var(--background));padding:0.5rem 0.75rem;font-size:0.875rem}.input-field:focus{outline:none;box-shadow:0 0 0 2px hsl(var(--ring))}` })
  ] });
}
function PageContentPanel() {
  const [rows, setRows] = useState([]);
  const [edits, setEdits] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState(null);
  const load = () => {
    setLoading(true);
    supabase.from("site_content").select("*").eq("page", "blog").order("section").order("sort_order").then(({
      data
    }) => {
      setRows(data || []);
      setLoading(false);
    });
  };
  useEffect(() => {
    load();
  }, []);
  const grouped = useMemo(() => {
    const g = /* @__PURE__ */ new Map();
    rows.forEach((r) => {
      if (!g.has(r.section)) g.set(r.section, []);
      g.get(r.section).push(r);
    });
    return Array.from(g.entries());
  }, [rows]);
  const valueOf = (r) => edits[r.id] !== void 0 ? edits[r.id] : r.value || "";
  const dirty = Object.keys(edits).length > 0;
  const save = async () => {
    setSaving(true);
    try {
      for (const [id, value] of Object.entries(edits)) {
        await supabase.from("site_content").update({
          value
        }).eq("id", id);
      }
      setEdits({});
      load();
      setSavedAt(Date.now());
      setTimeout(() => setSavedAt(null), 2500);
    } finally {
      setSaving(false);
    }
  };
  if (loading) return /* @__PURE__ */ jsx("div", { className: "h-48 grid place-items-center", children: /* @__PURE__ */ jsx(Loader2, { className: "h-6 w-6 animate-spin text-primary" }) });
  return /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-3", children: [
      savedAt && /* @__PURE__ */ jsxs("span", { className: "text-sm text-emerald-600 inline-flex items-center gap-1", children: [
        /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }),
        " Saved"
      ] }),
      /* @__PURE__ */ jsxs("button", { onClick: save, disabled: !dirty || saving, className: "inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gold text-gold-foreground text-sm font-semibold disabled:opacity-50", children: [
        saving ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(Save, { className: "h-4 w-4" }),
        " Save changes"
      ] })
    ] }),
    grouped.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "No content fields for the News page." }) : grouped.map(([section, items]) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border bg-card p-6 shadow-sm", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-display text-lg font-semibold text-primary capitalize mb-4", children: section.replace(/_/g, " ") }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: items.map((r) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium mb-1.5", children: r.label }),
        r.field_type === "textarea" ? /* @__PURE__ */ jsx("textarea", { value: valueOf(r), onChange: (e) => setEdits((p) => ({
          ...p,
          [r.id]: e.target.value
        })), rows: 3, className: "w-full rounded-md border bg-background px-3 py-2 text-sm" }) : r.field_type === "image" ? /* @__PURE__ */ jsx(ImageUpload, { value: valueOf(r) || null, onChange: (url) => setEdits((p) => ({
          ...p,
          [r.id]: url || ""
        })), folder: "site/blog", hint: r.hint }) : /* @__PURE__ */ jsx("input", { type: r.field_type === "url" ? "url" : "text", value: valueOf(r), onChange: (e) => setEdits((p) => ({
          ...p,
          [r.id]: e.target.value
        })), className: "w-full rounded-md border bg-background px-3 py-2 text-sm" }),
        r.hint && /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-1", children: r.hint })
      ] }, r.id)) })
    ] }, section))
  ] });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-primary block mb-1.5", children: label }),
    children
  ] });
}
function StatCard({
  label,
  value,
  tone
}) {
  const color = tone === "success" ? "text-emerald-600" : tone === "muted" ? "text-muted-foreground" : "text-primary";
  return /* @__PURE__ */ jsxs("div", { className: "rounded-xl border bg-card p-4", children: [
    /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: label }),
    /* @__PURE__ */ jsx("div", { className: `text-2xl font-bold mt-1 ${color}`, children: value })
  ] });
}
function IconBtn({
  children,
  onClick,
  title,
  tone
}) {
  return /* @__PURE__ */ jsx("button", { title, onClick, className: `p-2 rounded-md transition ${tone === "danger" ? "hover:bg-destructive/10 text-destructive" : "hover:bg-secondary text-foreground"}`, children });
}
export {
  BlogsAdmin as component
};
