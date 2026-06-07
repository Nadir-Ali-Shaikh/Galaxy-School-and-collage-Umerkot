import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Loader2, Phone, Mail, Trash2 } from "lucide-react";
import { s as supabase } from "./client-B4EfndxM.js";
import "@supabase/supabase-js";
import "@libsql/client/web";
function InquiriesAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const load = async () => {
    setLoading(true);
    const {
      data
    } = await supabase.from("contact_inquiries").select("*").order("created_at", {
      ascending: false
    });
    setItems(data ?? []);
    setLoading(false);
  };
  useEffect(() => {
    load();
  }, []);
  const toggle = async (id, status) => {
    await supabase.from("contact_inquiries").update({
      status: status === "resolved" ? "new" : "resolved"
    }).eq("id", id);
    load();
  };
  const remove = async (id) => {
    if (!confirm("Delete this inquiry?")) return;
    await supabase.from("contact_inquiries").delete().eq("id", id);
    load();
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm mb-6", children: "Messages submitted via the public contact form." }),
    loading ? /* @__PURE__ */ jsx(Loader2, { className: "h-5 w-5 animate-spin" }) : /* @__PURE__ */ jsxs("div", { className: "grid gap-3", children: [
      items.length === 0 && /* @__PURE__ */ jsx("div", { className: "rounded-2xl border bg-card p-8 text-center text-muted-foreground", children: "No inquiries." }),
      items.map((i) => /* @__PURE__ */ jsx("div", { className: "rounded-2xl border bg-card p-5", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-4 flex-wrap", children: [
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-primary", children: i.subject }),
          /* @__PURE__ */ jsxs("div", { className: "text-sm text-muted-foreground mt-1", children: [
            "From: ",
            i.full_name
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-2 flex flex-wrap gap-3 text-sm", children: [
            /* @__PURE__ */ jsxs("a", { href: `tel:${i.phone}`, className: "inline-flex items-center gap-1 text-primary hover:text-gold", children: [
              /* @__PURE__ */ jsx(Phone, { className: "h-3.5 w-3.5" }),
              " ",
              i.phone
            ] }),
            i.email && /* @__PURE__ */ jsxs("a", { href: `mailto:${i.email}`, className: "inline-flex items-center gap-1 text-primary hover:text-gold", children: [
              /* @__PURE__ */ jsx(Mail, { className: "h-3.5 w-3.5" }),
              " ",
              i.email
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-foreground bg-secondary rounded-md p-3 whitespace-pre-wrap", children: i.message }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground mt-2", children: new Date(i.created_at).toLocaleString() })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("button", { onClick: () => toggle(i.id, i.status), className: `text-xs px-3 py-1.5 rounded-full font-semibold ${i.status === "resolved" ? "bg-emerald-100 text-emerald-700" : "bg-gold/20 text-primary"}`, children: i.status === "resolved" ? "Resolved" : "Mark resolved" }),
          /* @__PURE__ */ jsx("button", { onClick: () => remove(i.id), className: "p-2 hover:bg-destructive/10 text-destructive rounded", children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
        ] })
      ] }) }, i.id))
    ] })
  ] });
}
export {
  InquiriesAdmin as component
};
