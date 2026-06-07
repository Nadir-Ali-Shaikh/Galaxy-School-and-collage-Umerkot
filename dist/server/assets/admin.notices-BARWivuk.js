import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Plus, Loader2, Megaphone, Pencil, Trash2 } from "lucide-react";
import { s as supabase } from "./client-B4EfndxM.js";
import "@supabase/supabase-js";
import "@libsql/client/web";
function NoticesAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const load = async () => {
    setLoading(true);
    const {
      data
    } = await supabase.from("notices").select("*").order("published_at", {
      ascending: false
    });
    setItems(data ?? []);
    setLoading(false);
  };
  useEffect(() => {
    load();
  }, []);
  const save = async () => {
    if (!editing) return;
    const payload = {
      title: editing.title,
      body: editing.body,
      important: editing.important ?? false,
      published: editing.published ?? true
    };
    const res = editing.id ? await supabase.from("notices").update(payload).eq("id", editing.id) : await supabase.from("notices").insert(payload);
    if (res.error) {
      alert(res.error.message);
      return;
    }
    setEditing(null);
    load();
  };
  const remove = async (id) => {
    if (!confirm("Delete this notice?")) return;
    await supabase.from("notices").delete().eq("id", id);
    load();
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: "Quick announcements shown on the website." }),
      /* @__PURE__ */ jsxs("button", { onClick: () => setEditing({
        important: false,
        published: true
      }), className: "inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold", children: [
        /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
        " New notice"
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsx(Loader2, { className: "h-5 w-5 animate-spin" }) : /* @__PURE__ */ jsxs("div", { className: "grid gap-3", children: [
      items.length === 0 && /* @__PURE__ */ jsx("div", { className: "rounded-2xl border bg-card p-8 text-center text-muted-foreground", children: "No notices yet." }),
      items.map((n) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border bg-card p-5 flex gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: `h-10 w-10 rounded-xl grid place-items-center flex-shrink-0 ${n.important ? "bg-destructive/15 text-destructive" : "bg-gold/15 text-primary"}`, children: /* @__PURE__ */ jsx(Megaphone, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-primary", children: n.title }),
            n.important && /* @__PURE__ */ jsx("span", { className: "text-xs px-2 py-0.5 rounded-full bg-destructive/10 text-destructive font-semibold", children: "Important" }),
            !n.published && /* @__PURE__ */ jsx("span", { className: "text-xs px-2 py-0.5 rounded-full bg-muted", children: "Draft" })
          ] }),
          n.body && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground line-clamp-2", children: n.body }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground mt-1", children: new Date(n.published_at).toLocaleDateString() })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
          /* @__PURE__ */ jsx("button", { onClick: () => setEditing(n), className: "p-2 hover:bg-secondary rounded", children: /* @__PURE__ */ jsx(Pencil, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsx("button", { onClick: () => remove(n.id), className: "p-2 hover:bg-destructive/10 text-destructive rounded", children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
        ] })
      ] }, n.id))
    ] }),
    editing && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-center p-4 animate-in fade-in duration-200", children: /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-2xl w-full max-w-2xl shadow-2xl border overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200", children: [
      /* @__PURE__ */ jsx("div", { className: "relative bg-gradient-to-br from-primary to-primary/90 text-primary-foreground px-7 py-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "h-12 w-12 rounded-xl bg-gold text-gold-foreground grid place-items-center flex-shrink-0 shadow-lg", children: /* @__PURE__ */ jsx(Megaphone, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsx("div", { className: "text-[11px] tracking-[0.2em] text-gold uppercase font-semibold", children: editing.id ? "Edit Notice" : "Create New Notice" }),
          /* @__PURE__ */ jsx("h3", { className: "font-display text-2xl font-bold mt-1 leading-tight", children: editing.id ? "Update announcement" : "Publish an announcement" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-primary-foreground/70 mt-1", children: "Quick announcements shown live on the school website." })
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: () => setEditing(null), className: "h-9 w-9 grid place-items-center rounded-lg hover:bg-white/10 transition flex-shrink-0", "aria-label": "Close", children: /* @__PURE__ */ jsx("span", { className: "text-xl leading-none", children: "×" }) })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "px-7 py-6 space-y-5 overflow-y-auto", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { className: "text-sm font-semibold text-primary block mb-2", children: [
            "Notice title ",
            /* @__PURE__ */ jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsx("input", { value: editing.title ?? "", onChange: (e) => setEditing({
            ...editing,
            title: e.target.value
          }), placeholder: "e.g. School closed on Friday", className: "w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-1.5", children: "Keep it short and clear — this is the headline parents will see." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-sm font-semibold text-primary block mb-2", children: "Details" }),
          /* @__PURE__ */ jsx("textarea", { rows: 5, value: editing.body ?? "", onChange: (e) => setEditing({
            ...editing,
            body: e.target.value
          }), placeholder: "Add timing, location or any extra information…", className: "w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition resize-none" }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground mt-1.5", children: [
            "Optional. ",
            (editing.body ?? "").length,
            " characters."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-3 pt-1", children: [
          /* @__PURE__ */ jsxs("label", { className: `flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition ${editing.important ? "border-destructive bg-destructive/5" : "border-border hover:border-muted-foreground/30"}`, children: [
            /* @__PURE__ */ jsx("input", { type: "checkbox", checked: editing.important ?? false, onChange: (e) => setEditing({
              ...editing,
              important: e.target.checked
            }), className: "mt-0.5 h-4 w-4 accent-destructive" }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold text-primary", children: "Mark as important" }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground mt-0.5", children: "Highlighted with a red badge on the site." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: `flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition ${editing.published ?? true ? "border-green-500 bg-green-500/5" : "border-border hover:border-muted-foreground/30"}`, children: [
            /* @__PURE__ */ jsx("input", { type: "checkbox", checked: editing.published ?? true, onChange: (e) => setEditing({
              ...editing,
              published: e.target.checked
            }), className: "mt-0.5 h-4 w-4 accent-green-600" }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold text-primary", children: "Publish now" }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground mt-0.5", children: "Uncheck to save as a draft instead." })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "px-7 py-4 border-t bg-secondary/40 flex items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground hidden sm:block", children: editing.id ? "Changes go live on save." : "New notice will appear immediately if published." }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2 ml-auto", children: [
          /* @__PURE__ */ jsx("button", { onClick: () => setEditing(null), className: "px-5 py-2.5 rounded-lg border bg-card hover:bg-secondary text-sm font-medium transition", children: "Cancel" }),
          /* @__PURE__ */ jsxs("button", { onClick: save, disabled: !editing.title, className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition", children: [
            /* @__PURE__ */ jsx(Megaphone, { className: "h-4 w-4" }),
            editing.id ? "Save changes" : "Publish notice"
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  NoticesAdmin as component
};
