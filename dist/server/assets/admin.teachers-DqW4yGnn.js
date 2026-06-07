import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Plus, Loader2, Pencil, Trash2, GraduationCap, X, User, BookOpen, FileText, ArrowUpDown } from "lucide-react";
import { s as supabase } from "./client-B4EfndxM.js";
import { I as ImageUpload } from "./ImageUpload-RrFPxMyT.js";
import "@supabase/supabase-js";
import "@libsql/client/web";
function TeachersAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const load = async () => {
    setLoading(true);
    const {
      data
    } = await supabase.from("teachers").select("*").order("sort_order").order("name");
    setItems(data ?? []);
    setLoading(false);
  };
  useEffect(() => {
    load();
  }, []);
  const save = async () => {
    if (!editing) return;
    const payload = {
      name: editing.name,
      title: editing.title,
      subject: editing.subject,
      bio: editing.bio,
      photo_url: editing.photo_url,
      sort_order: editing.sort_order ?? 0
    };
    const res = editing.id ? await supabase.from("teachers").update(payload).eq("id", editing.id) : await supabase.from("teachers").insert(payload);
    if (res.error) {
      alert(res.error.message);
      return;
    }
    setEditing(null);
    load();
  };
  const remove = async (id) => {
    if (!confirm("Delete this teacher?")) return;
    await supabase.from("teachers").delete().eq("id", id);
    load();
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: "Faculty profiles shown on the About page." }),
      /* @__PURE__ */ jsxs("button", { onClick: () => setEditing({
        sort_order: 0
      }), className: "inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold", children: [
        /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
        " New teacher"
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsx(Loader2, { className: "h-5 w-5 animate-spin" }) : /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: [
      items.length === 0 && /* @__PURE__ */ jsx("div", { className: "col-span-full rounded-2xl border bg-card p-8 text-center text-muted-foreground", children: "No teachers yet." }),
      items.map((t) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border bg-card p-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
          t.photo_url ? /* @__PURE__ */ jsx("img", { src: t.photo_url, alt: t.name, className: "h-16 w-16 rounded-xl object-cover" }) : /* @__PURE__ */ jsx("div", { className: "h-16 w-16 rounded-xl bg-secondary" }),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsx("div", { className: "font-semibold text-primary truncate", children: t.name }),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground truncate", children: t.title }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-gold font-semibold mt-1", children: t.subject })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 flex justify-end gap-1", children: [
          /* @__PURE__ */ jsx("button", { onClick: () => setEditing(t), className: "p-2 hover:bg-secondary rounded", children: /* @__PURE__ */ jsx(Pencil, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsx("button", { onClick: () => remove(t.id), className: "p-2 hover:bg-destructive/10 text-destructive rounded", children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
        ] })
      ] }, t.id))
    ] }),
    editing && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-center p-4 overflow-y-auto animate-in fade-in duration-200", children: /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-2xl w-full max-w-3xl my-8 shadow-2xl border overflow-hidden animate-in zoom-in-95 duration-200", children: [
      /* @__PURE__ */ jsx("div", { className: "relative bg-gradient-to-br from-primary to-primary/90 text-primary-foreground px-7 py-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "h-12 w-12 rounded-xl bg-gold text-gold-foreground grid place-items-center flex-shrink-0 shadow-lg", children: /* @__PURE__ */ jsx(GraduationCap, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsx("div", { className: "text-[11px] tracking-[0.2em] text-gold uppercase font-semibold", children: editing.id ? "Edit Teacher" : "Add Teacher" }),
          /* @__PURE__ */ jsx("h3", { className: "font-display text-2xl font-bold mt-1 leading-tight", children: editing.id ? "Update faculty profile" : "Add a new faculty member" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-primary-foreground/70 mt-1", children: "Faculty profiles appear on the About page." })
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: () => setEditing(null), className: "h-9 w-9 grid place-items-center rounded-lg hover:bg-white/10 transition flex-shrink-0", "aria-label": "Close", children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5" }) })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "px-7 py-6 grid md:grid-cols-[200px_1fr] gap-7", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-sm font-semibold text-primary block mb-2", children: "Photo" }),
          /* @__PURE__ */ jsx(ImageUpload, { value: editing.photo_url ?? null, onChange: (url) => setEditing({
            ...editing,
            photo_url: url
          }), folder: "teachers" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-2", children: "Square portrait works best." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { className: "text-sm font-semibold text-primary mb-2 flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx(User, { className: "h-3.5 w-3.5" }),
              " Full name ",
              /* @__PURE__ */ jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsx("input", { value: editing.name ?? "", onChange: (e) => setEditing({
              ...editing,
              name: e.target.value
            }), placeholder: "e.g. Mr. Ahmed Khan", className: "w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "text-sm font-semibold text-primary mb-2 flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx(GraduationCap, { className: "h-3.5 w-3.5" }),
                " Designation"
              ] }),
              /* @__PURE__ */ jsx("input", { value: editing.title ?? "", onChange: (e) => setEditing({
                ...editing,
                title: e.target.value
              }), placeholder: "e.g. Principal, Senior Teacher", className: "w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition" }),
              /* @__PURE__ */ jsx("p", { className: "text-[11px] text-muted-foreground mt-1", children: 'Tip: Entering "Principal" or "Founder" features this profile in the prominent Leadership layout.' })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "text-sm font-semibold text-primary mb-2 flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx(BookOpen, { className: "h-3.5 w-3.5" }),
                " Subject"
              ] }),
              /* @__PURE__ */ jsx("input", { value: editing.subject ?? "", onChange: (e) => setEditing({
                ...editing,
                subject: e.target.value
              }), placeholder: "Mathematics", className: "w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { className: "text-sm font-semibold text-primary mb-2 flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx(FileText, { className: "h-3.5 w-3.5" }),
              " Bio"
            ] }),
            /* @__PURE__ */ jsx("textarea", { rows: 4, value: editing.bio ?? "", onChange: (e) => setEditing({
              ...editing,
              bio: e.target.value
            }), placeholder: "Qualifications, experience, achievements…", className: "w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition resize-none" }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground mt-1.5", children: [
              (editing.bio ?? "").length,
              " characters"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "max-w-[180px]", children: [
            /* @__PURE__ */ jsxs("label", { className: "text-sm font-semibold text-primary mb-2 flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx(ArrowUpDown, { className: "h-3.5 w-3.5" }),
              " Sort order"
            ] }),
            /* @__PURE__ */ jsx("input", { type: "number", value: editing.sort_order ?? 0, onChange: (e) => setEditing({
              ...editing,
              sort_order: Number(e.target.value)
            }), className: "w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-1.5", children: "Lower numbers appear first." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "px-7 py-4 border-t bg-secondary/40 flex items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground hidden sm:block", children: editing.id ? "Changes save instantly." : "New faculty member will appear on the public site." }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2 ml-auto", children: [
          /* @__PURE__ */ jsx("button", { onClick: () => setEditing(null), className: "px-5 py-2.5 rounded-lg border bg-card hover:bg-secondary text-sm font-medium transition", children: "Cancel" }),
          /* @__PURE__ */ jsxs("button", { onClick: save, disabled: !editing.name, className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition", children: [
            /* @__PURE__ */ jsx(GraduationCap, { className: "h-4 w-4" }),
            editing.id ? "Save changes" : "Add teacher"
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  TeachersAdmin as component
};
