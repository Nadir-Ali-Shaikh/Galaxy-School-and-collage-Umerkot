import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Loader2, Phone, Mail, Trash2 } from "lucide-react";
import { s as supabase } from "./client-B4EfndxM.js";
import "@supabase/supabase-js";
import "@libsql/client/web";
const STATUSES = ["new", "contacted", "enrolled", "rejected"];
function AdmissionsAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const load = async () => {
    setLoading(true);
    const q = supabase.from("admission_applications").select("*").order("created_at", {
      ascending: false
    });
    const {
      data
    } = filter === "all" ? await q : await q.eq("status", filter);
    setItems(data ?? []);
    setLoading(false);
  };
  useEffect(() => {
    load();
  }, [filter]);
  const updateStatus = async (id, status) => {
    await supabase.from("admission_applications").update({
      status
    }).eq("id", id);
    load();
  };
  const remove = async (id) => {
    if (!confirm("Delete this application?")) return;
    await supabase.from("admission_applications").delete().eq("id", id);
    load();
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6 flex-wrap gap-3", children: [
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: "Applications submitted via the admissions form." }),
      /* @__PURE__ */ jsxs("select", { value: filter, onChange: (e) => setFilter(e.target.value), className: "rounded-md border bg-card px-3 py-2 text-sm", children: [
        /* @__PURE__ */ jsx("option", { value: "all", children: "All statuses" }),
        STATUSES.map((s) => /* @__PURE__ */ jsx("option", { value: s, children: s }, s))
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsx(Loader2, { className: "h-5 w-5 animate-spin" }) : /* @__PURE__ */ jsxs("div", { className: "grid gap-3", children: [
      items.length === 0 && /* @__PURE__ */ jsx("div", { className: "rounded-2xl border bg-card p-8 text-center text-muted-foreground", children: "No applications." }),
      items.map((a) => /* @__PURE__ */ jsx("div", { className: "rounded-2xl border bg-card p-5", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-4 flex-wrap", children: [
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxs("h3", { className: "font-semibold text-primary", children: [
            a.student_name,
            " ",
            /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground font-normal", children: [
              "· ",
              a.class_applying
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-sm text-muted-foreground mt-1", children: [
            "Parent: ",
            a.parent_name
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-2 flex flex-wrap gap-3 text-sm", children: [
            /* @__PURE__ */ jsxs("a", { href: `tel:${a.phone}`, className: "inline-flex items-center gap-1 text-primary hover:text-gold", children: [
              /* @__PURE__ */ jsx(Phone, { className: "h-3.5 w-3.5" }),
              " ",
              a.phone
            ] }),
            a.email && /* @__PURE__ */ jsxs("a", { href: `mailto:${a.email}`, className: "inline-flex items-center gap-1 text-primary hover:text-gold", children: [
              /* @__PURE__ */ jsx(Mail, { className: "h-3.5 w-3.5" }),
              " ",
              a.email
            ] })
          ] }),
          a.message && /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-foreground bg-secondary rounded-md p-3", children: a.message }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground mt-2", children: new Date(a.created_at).toLocaleString() })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("select", { value: a.status, onChange: (e) => updateStatus(a.id, e.target.value), className: "rounded-md border bg-background px-3 py-1.5 text-sm capitalize", children: STATUSES.map((s) => /* @__PURE__ */ jsx("option", { value: s, children: s }, s)) }),
          /* @__PURE__ */ jsx("button", { onClick: () => remove(a.id), className: "p-2 hover:bg-destructive/10 text-destructive rounded", children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
        ] })
      ] }) }, a.id))
    ] })
  ] });
}
export {
  AdmissionsAdmin as component
};
