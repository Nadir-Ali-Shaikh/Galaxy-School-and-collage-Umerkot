import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect, useMemo } from "react";
import { Check, Loader2, Save, Plus, Trash2, HelpCircle } from "lucide-react";
import { I as ImageUpload } from "./ImageUpload-RrFPxMyT.js";
import { s as supabase } from "./client-B4EfndxM.js";
import { toast } from "sonner";
import "@supabase/supabase-js";
import "@libsql/client/web";
const PAGES = [{
  key: "global",
  label: "🌐 Global / Brand"
}, {
  key: "home",
  label: "🏠 Home"
}, {
  key: "about",
  label: "ℹ️ About"
}, {
  key: "academics",
  label: "📚 Academics"
}, {
  key: "facilities",
  label: "🏫 Facilities"
}, {
  key: "admissions",
  label: "📝 Admissions"
}, {
  key: "gallery",
  label: "🖼️ Gallery"
}, {
  key: "blog",
  label: "✍️ Blog"
}, {
  key: "results",
  label: "📊 Results"
}, {
  key: "contact",
  label: "📞 Contact"
}];
function ContentEditor() {
  const [page, setPage] = useState("home");
  const [rows, setRows] = useState([]);
  const [edits, setEdits] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState(null);
  const [showAddField, setShowAddField] = useState(false);
  const [newSection, setNewSection] = useState("");
  const [newFieldKey, setNewFieldKey] = useState("");
  const [newLabel, setNewLabel] = useState("");
  const [newFieldType, setNewFieldType] = useState("text");
  const [newHint, setNewHint] = useState("");
  const [addingField, setAddingField] = useState(false);
  const loadRows = async () => {
    setLoading(true);
    setEdits({});
    try {
      const {
        data,
        error
      } = await supabase.from("site_content").select("*").eq("page", page).order("section").order("sort_order");
      if (error) {
        toast.error("Failed to load content fields: " + error.message);
      } else {
        setRows(data || []);
      }
    } catch (err) {
      toast.error("An error occurred while loading content.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadRows();
  }, [page]);
  const grouped = useMemo(() => {
    const g = /* @__PURE__ */ new Map();
    rows.forEach((r) => {
      if (!g.has(r.section)) g.set(r.section, []);
      g.get(r.section).push(r);
    });
    return Array.from(g.entries());
  }, [rows]);
  const setVal = (id, v) => setEdits((e) => ({
    ...e,
    [id]: v
  }));
  const valueOf = (r) => edits[r.id] !== void 0 ? edits[r.id] : r.value || "";
  const dirty = Object.keys(edits).length > 0;
  const save = async () => {
    setSaving(true);
    try {
      for (const [id, value] of Object.entries(edits)) {
        const {
          error
        } = await supabase.from("site_content").update({
          value
        }).eq("id", id);
        if (error) throw error;
      }
      toast.success("All changes saved successfully!");
      setEdits({});
      setSavedAt(Date.now());
      setTimeout(() => setSavedAt(null), 2500);
      loadRows();
    } catch (err) {
      toast.error("Failed to save changes: " + err.message);
    } finally {
      setSaving(false);
    }
  };
  const handleAddField = async (e) => {
    e.preventDefault();
    if (!newSection || !newFieldKey || !newLabel) {
      toast.error("Section, Field Key, and Label are required!");
      return;
    }
    setAddingField(true);
    const section_safe = newSection.toLowerCase().trim().replace(/[-\s]+/g, "_");
    const key_safe = newFieldKey.toLowerCase().trim().replace(/[-\s]+/g, "_");
    const sort_order = rows.length > 0 ? Math.max(...rows.map((r) => r.sort_order)) + 1 : 0;
    try {
      const {
        error
      } = await supabase.from("site_content").insert({
        page,
        section: section_safe,
        field_key: key_safe,
        label: newLabel.trim(),
        field_type: newFieldType,
        value: "",
        sort_order,
        hint: newHint.trim() || null
      });
      if (error) {
        toast.error("Failed to add field: " + error.message);
      } else {
        toast.success(`Successfully added "${newLabel}" to section "${section_safe}"!`);
        setNewSection("");
        setNewFieldKey("");
        setNewLabel("");
        setNewHint("");
        setShowAddField(false);
        loadRows();
      }
    } catch (err) {
      toast.error("An error occurred while adding the field.");
    } finally {
      setAddingField(false);
    }
  };
  const handleDeleteField = async (id, label) => {
    if (!confirm(`Are you sure you want to delete the field "${label}"? This action cannot be undone.`)) return;
    try {
      const {
        error
      } = await supabase.from("site_content").delete().eq("id", id);
      if (error) {
        toast.error("Failed to delete field: " + error.message);
      } else {
        toast.success(`Deleted field "${label}" successfully.`);
        loadRows();
      }
    } catch (err) {
      toast.error("An error occurred while deleting the field.");
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6 max-w-5xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h2", { className: "font-display text-2xl font-bold text-primary capitalize", children: [
          page,
          " Page Editor"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Manage text content, headlines, and image banners displayed on the frontend." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 self-end md:self-auto", children: [
        savedAt && /* @__PURE__ */ jsxs("span", { className: "text-sm text-green-600 inline-flex items-center gap-1 animate-fade-in", children: [
          /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }),
          " Saved"
        ] }),
        /* @__PURE__ */ jsxs("button", { onClick: save, disabled: !dirty || saving, className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gold text-gold-foreground font-semibold hover:brightness-105 transition disabled:opacity-50 shadow cursor-pointer text-sm", children: [
          saving ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(Save, { className: "h-4 w-4" }),
          "Save Changes"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 bg-secondary/30 p-2 rounded-xl border", children: PAGES.map((p) => /* @__PURE__ */ jsx("button", { onClick: () => setPage(p.key), className: `px-3 py-2 rounded-lg text-sm font-semibold transition cursor-pointer ${page === p.key ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:bg-secondary hover:text-primary"}`, children: p.label }, p.key)) }),
    /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border bg-card overflow-hidden shadow-sm", children: [
      /* @__PURE__ */ jsxs("button", { onClick: () => setShowAddField(!showAddField), className: "flex items-center justify-between w-full px-6 py-4 font-semibold text-primary hover:bg-secondary/20 transition text-left", children: [
        /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4 text-gold" }),
          "Add Custom Field to this Page"
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-xs px-2.5 py-1 rounded bg-secondary text-primary uppercase tracking-wide", children: showAddField ? "Close Form" : "Open Form" })
      ] }),
      showAddField && /* @__PURE__ */ jsxs("form", { onSubmit: handleAddField, className: "p-6 border-t bg-secondary/10 grid md:grid-cols-2 gap-4 animate-fade-up", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5", children: "Section Key (e.g. hero, welcome) *" }),
          /* @__PURE__ */ jsx("input", { type: "text", required: true, placeholder: "e.g. hero", value: newSection, onChange: (e) => setNewSection(e.target.value), className: "w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5", children: "Field Key (e.g. title, subtitle) *" }),
          /* @__PURE__ */ jsx("input", { type: "text", required: true, placeholder: "e.g. title", value: newFieldKey, onChange: (e) => setNewFieldKey(e.target.value), className: "w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5", children: "Label (Display Name) *" }),
          /* @__PURE__ */ jsx("input", { type: "text", required: true, placeholder: "e.g. Hero Headline", value: newLabel, onChange: (e) => setNewLabel(e.target.value), className: "w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5", children: "Field Type *" }),
          /* @__PURE__ */ jsxs("select", { value: newFieldType, onChange: (e) => setNewFieldType(e.target.value), className: "w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50", children: [
            /* @__PURE__ */ jsx("option", { value: "text", children: "Text Input (Short)" }),
            /* @__PURE__ */ jsx("option", { value: "textarea", children: "Textarea (Paragraphs)" }),
            /* @__PURE__ */ jsx("option", { value: "image", children: "Image Upload File" }),
            /* @__PURE__ */ jsx("option", { value: "url", children: "URL Link" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5", children: "Helper Hint (e.g. Recommended size 1920x1080)" }),
          /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Recommended dimensions, requirements, etc.", value: newHint, onChange: (e) => setNewHint(e.target.value), className: "w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-2 flex justify-end gap-2 border-t pt-4", children: [
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setShowAddField(false), className: "px-4 py-2 text-sm border rounded-lg bg-card font-medium hover:bg-secondary/30 transition cursor-pointer", children: "Cancel" }),
          /* @__PURE__ */ jsxs("button", { type: "submit", disabled: addingField, className: "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition cursor-pointer disabled:opacity-50", children: [
            addingField ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
            "Add Field"
          ] })
        ] })
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsx("div", { className: "h-64 grid place-items-center", children: /* @__PURE__ */ jsx(Loader2, { className: "h-6 w-6 animate-spin text-primary" }) }) : /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
      grouped.map(([section, items]) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border bg-card p-6 shadow-sm space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b pb-3", children: [
          /* @__PURE__ */ jsxs("h3", { className: "font-display text-xl font-bold text-primary capitalize flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full bg-gold" }),
            section.replace(/_/g, " ")
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "text-xs font-semibold px-2 py-0.5 rounded bg-gold/10 text-primary uppercase tracking-wide", children: [
            items.length,
            " Field",
            items.length !== 1 && "s"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-6", children: items.map((r) => {
          const val = valueOf(r);
          return /* @__PURE__ */ jsxs("div", { className: "relative group/field border bg-secondary/5 p-4 md:p-5 rounded-xl border-dashed hover:border-gold/30 hover:bg-secondary/10 transition", children: [
            /* @__PURE__ */ jsx("button", { onClick: () => handleDeleteField(r.id, r.label), className: "absolute top-4 right-4 p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-colors opacity-0 group-hover/field:opacity-100 cursor-pointer", title: "Delete this custom field", children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 mb-2 pr-6", children: [
              /* @__PURE__ */ jsx("label", { className: "text-sm font-bold text-primary flex items-center gap-1", children: r.label }),
              r.hint && /* @__PURE__ */ jsxs("div", { className: "group relative cursor-help", children: [
                /* @__PURE__ */ jsx(HelpCircle, { className: "h-3.5 w-3.5 text-muted-foreground hover:text-gold transition" }),
                /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 -translate-x-1/2 bottom-full mb-1 w-48 bg-primary text-primary-foreground text-[10px] p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition z-10 whitespace-normal", children: r.hint })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-semibold", children: r.field_type })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "grid gap-3", children: r.field_type === "image" ? /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-5 gap-4 items-start", children: [
              /* @__PURE__ */ jsxs("div", { className: "md:col-span-3", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs text-muted-foreground font-semibold mb-1 uppercase tracking-wider", children: "Live Image Preview" }),
                val ? /* @__PURE__ */ jsxs("div", { className: "relative group overflow-hidden rounded-lg border aspect-[16/8] max-w-lg bg-black/5", children: [
                  /* @__PURE__ */ jsx("img", { src: val, alt: r.label, className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" }),
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-white text-xs font-semibold bg-primary/80 px-3 py-1.5 rounded-full shadow", children: "Current Live Banner" }) })
                ] }) : /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center justify-center rounded-lg border border-dashed aspect-[16/8] max-w-lg bg-secondary/20 text-center p-4", children: /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: "No image set. Upload one to display it on the frontend." }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs text-muted-foreground font-semibold mb-1 uppercase tracking-wider", children: "Upload / Change Image" }),
                /* @__PURE__ */ jsx(ImageUpload, { value: val || null, onChange: (url) => setVal(r.id, url || ""), folder: `site/${page}/${section}`, hint: r.hint })
              ] })
            ] }) : r.field_type === "textarea" ? /* @__PURE__ */ jsx("textarea", { value: val, onChange: (e) => setVal(r.id, e.target.value), rows: 4, placeholder: `Enter text content for ${r.label.toLowerCase()}`, className: "w-full rounded-lg border bg-background px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" }) : /* @__PURE__ */ jsx("input", { type: r.field_type === "url" ? "url" : "text", value: val, onChange: (e) => setVal(r.id, e.target.value), placeholder: `Enter ${r.label.toLowerCase()} link or text`, className: "w-full rounded-lg border bg-background px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" }) })
          ] }, r.id);
        }) })
      ] }, section)),
      grouped.length === 0 && /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-dashed bg-card p-12 text-center text-muted-foreground animate-fade-in", children: [
        /* @__PURE__ */ jsx("p", { className: "font-semibold text-lg", children: "No content fields for this page yet." }),
        /* @__PURE__ */ jsx("p", { className: "text-sm mt-1 max-w-md mx-auto", children: 'Use the "Add Custom Field" form above to create the first content key for this page!' })
      ] })
    ] })
  ] });
}
export {
  ContentEditor as component
};
