import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect, useMemo } from "react";
import { FolderPlus, Loader2, Plus, Trash2, RefreshCw, X } from "lucide-react";
import { s as supabase } from "./client-B4EfndxM.js";
import { I as ImageUpload } from "./ImageUpload-RrFPxMyT.js";
import "@supabase/supabase-js";
import "@libsql/client/web";
function GalleryAdmin() {
  const [items, setItems] = useState([]);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(null);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [replacing, setReplacing] = useState(null);
  const [replaceUrl, setReplaceUrl] = useState(null);
  const [newSection, setNewSection] = useState(false);
  const [newSectionName, setNewSectionName] = useState("");
  const load = async () => {
    setLoading(true);
    const [itemsRes, sectionsRes] = await Promise.all([supabase.from("gallery_items").select("*").order("sort_order").order("created_at", {
      ascending: false
    }), supabase.from("gallery_sections").select("*").order("sort_order").order("name")]);
    setItems(itemsRes.data ?? []);
    setSections(sectionsRes.data ?? []);
    setLoading(false);
  };
  useEffect(() => {
    load();
  }, []);
  const grouped = useMemo(() => {
    const m = /* @__PURE__ */ new Map();
    sections.forEach((s) => m.set(s.name, []));
    items.forEach((it) => {
      const k = it.category ?? "Uncategorized";
      if (!m.has(k)) m.set(k, []);
      m.get(k).push(it);
    });
    return Array.from(m.entries());
  }, [items, sections]);
  const add = async () => {
    if (!imageUrl || !adding) return;
    const res = await supabase.from("gallery_items").insert({
      title: title || null,
      category: adding,
      image_url: imageUrl
    });
    if (res.error) {
      alert(res.error.message);
      return;
    }
    setAdding(null);
    setTitle("");
    setImageUrl(null);
    load();
  };
  const remove = async (id) => {
    if (!confirm("Delete this image?")) return;
    await supabase.from("gallery_items").delete().eq("id", id);
    load();
  };
  const saveReplace = async () => {
    if (!replacing || !replaceUrl) return;
    const res = await supabase.from("gallery_items").update({
      image_url: replaceUrl
    }).eq("id", replacing.id);
    if (res.error) {
      alert(res.error.message);
      return;
    }
    setReplacing(null);
    setReplaceUrl(null);
    load();
  };
  const addSection = async () => {
    const name = newSectionName.trim();
    if (!name) return;
    const maxOrder = sections.reduce((m, s) => Math.max(m, s.sort_order), 0);
    const res = await supabase.from("gallery_sections").insert({
      name,
      sort_order: maxOrder + 1
    });
    if (res.error) {
      alert(res.error.message);
      return;
    }
    setNewSection(false);
    setNewSectionName("");
    load();
  };
  const removeSection = async (s, imageCount) => {
    const msg = imageCount > 0 ? `Delete section "${s.name}" AND its ${imageCount} image${imageCount === 1 ? "" : "s"}? This cannot be undone.` : `Delete section "${s.name}"?`;
    if (!confirm(msg)) return;
    if (imageCount > 0) {
      await supabase.from("gallery_items").delete().eq("category", s.name);
    }
    const res = await supabase.from("gallery_sections").delete().eq("id", s.id);
    if (res.error) {
      alert(res.error.message);
      return;
    }
    load();
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: "Images grouped by section. Each section matches a facility on the public site." }),
      /* @__PURE__ */ jsxs("button", { onClick: () => {
        setNewSection(true);
        setNewSectionName("");
      }, className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-gold text-gold-foreground text-sm font-semibold", children: [
        /* @__PURE__ */ jsx(FolderPlus, { className: "h-4 w-4" }),
        " New section"
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsx(Loader2, { className: "h-5 w-5 animate-spin" }) : /* @__PURE__ */ jsxs("div", { className: "space-y-10", children: [
      grouped.length === 0 && /* @__PURE__ */ jsx("div", { className: "rounded-2xl border border-dashed p-8 text-center text-sm text-muted-foreground", children: 'No sections yet. Click "New section" to create one.' }),
      grouped.map(([cat, list]) => {
        const section = sections.find((s) => s.name === cat);
        return /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border bg-card p-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3 mb-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "font-display text-lg font-semibold text-primary", children: cat }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                list.length,
                " image",
                list.length === 1 ? "" : "s"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxs("button", { onClick: () => {
                setAdding(cat);
                setTitle("");
                setImageUrl(null);
              }, className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-sm font-semibold", children: [
                /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
                " Add image"
              ] }),
              section && /* @__PURE__ */ jsxs("button", { onClick: () => removeSection(section, list.length), title: "Delete section", className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-destructive/40 text-destructive text-sm font-semibold hover:bg-destructive/10", children: [
                /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }),
                " Section"
              ] })
            ] })
          ] }),
          list.length === 0 ? /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground", children: "No images in this section yet." }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4", children: list.map((it) => /* @__PURE__ */ jsxs("div", { className: "group relative aspect-square rounded-xl overflow-hidden border bg-secondary", children: [
            /* @__PURE__ */ jsx("img", { src: it.image_url, alt: it.title ?? "", className: "w-full h-full object-cover" }),
            /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition flex flex-col justify-between p-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-1.5", children: [
                /* @__PURE__ */ jsx("button", { onClick: () => {
                  setReplacing(it);
                  setReplaceUrl(it.image_url);
                }, title: "Replace", className: "h-8 w-8 rounded-full bg-white/90 text-primary grid place-items-center hover:bg-white", children: /* @__PURE__ */ jsx(RefreshCw, { className: "h-4 w-4" }) }),
                /* @__PURE__ */ jsx("button", { onClick: () => remove(it.id), title: "Delete", className: "h-8 w-8 rounded-full bg-destructive text-destructive-foreground grid place-items-center", children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
              ] }),
              it.title && /* @__PURE__ */ jsx("div", { className: "text-white text-xs font-semibold truncate", children: it.title })
            ] })
          ] }, it.id)) })
        ] }, cat);
      })
    ] }),
    newSection && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 bg-black/50 grid place-items-center p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-2xl w-full max-w-md", children: [
      /* @__PURE__ */ jsxs("div", { className: "p-6 border-b flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-display text-xl font-bold text-primary", children: "New section" }),
        /* @__PURE__ */ jsx("button", { onClick: () => setNewSection(false), children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
        /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-primary block mb-1", children: "Section name" }),
        /* @__PURE__ */ jsx("input", { value: newSectionName, onChange: (e) => setNewSectionName(e.target.value), placeholder: "e.g. Annual Day 2026", className: "input", autoFocus: true })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-6 border-t flex justify-end gap-2", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => setNewSection(false), className: "px-4 py-2 rounded-md border text-sm", children: "Cancel" }),
        /* @__PURE__ */ jsx("button", { onClick: addSection, disabled: !newSectionName.trim(), className: "px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold disabled:opacity-60", children: "Create" })
      ] })
    ] }) }),
    adding && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 bg-black/50 grid place-items-center p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-2xl w-full max-w-lg", children: [
      /* @__PURE__ */ jsxs("div", { className: "p-6 border-b", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-display text-xl font-bold text-primary", children: "Add image" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
          "Section: ",
          /* @__PURE__ */ jsx("span", { className: "font-medium text-foreground", children: adding })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-6 grid gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-primary block mb-1", children: "Title (optional)" }),
          /* @__PURE__ */ jsx("input", { value: title, onChange: (e) => setTitle(e.target.value), className: "input" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-primary block mb-1", children: "Image" }),
          /* @__PURE__ */ jsx(ImageUpload, { value: imageUrl, onChange: setImageUrl, folder: "gallery", hint: "Recommended 1200×900px" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-6 border-t flex justify-end gap-2", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => {
          setAdding(null);
          setImageUrl(null);
          setTitle("");
        }, className: "px-4 py-2 rounded-md border text-sm", children: "Cancel" }),
        /* @__PURE__ */ jsx("button", { onClick: add, disabled: !imageUrl, className: "px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold disabled:opacity-60", children: "Add" })
      ] })
    ] }) }),
    replacing && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 bg-black/50 grid place-items-center p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-2xl w-full max-w-lg", children: [
      /* @__PURE__ */ jsxs("div", { className: "p-6 border-b", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-display text-xl font-bold text-primary", children: "Replace image" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
          "Section: ",
          /* @__PURE__ */ jsx("span", { className: "font-medium text-foreground", children: replacing.category })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "p-6", children: /* @__PURE__ */ jsx(ImageUpload, { value: replaceUrl, onChange: setReplaceUrl, folder: "gallery", hint: "Recommended 1200×900px" }) }),
      /* @__PURE__ */ jsxs("div", { className: "p-6 border-t flex justify-end gap-2", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => {
          setReplacing(null);
          setReplaceUrl(null);
        }, className: "px-4 py-2 rounded-md border text-sm", children: "Cancel" }),
        /* @__PURE__ */ jsx("button", { onClick: saveReplace, disabled: !replaceUrl || replaceUrl === replacing.image_url, className: "px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold disabled:opacity-60", children: "Save" })
      ] })
    ] }) })
  ] });
}
export {
  GalleryAdmin as component
};
