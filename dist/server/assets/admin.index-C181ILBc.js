import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Newspaper, Megaphone, Users, Image, Award, Inbox, MessageSquare } from "lucide-react";
import { s as supabase } from "./client-B4EfndxM.js";
import "@supabase/supabase-js";
import "@libsql/client/web";
function AdminDashboard() {
  const [c, setC] = useState(null);
  useEffect(() => {
    let active = true;
    (async () => {
      const getCount = async (table, eqFilter) => {
        try {
          let q = supabase.from(table).select("*", {
            count: "exact",
            head: true
          });
          if (eqFilter) {
            q = q.eq(eqFilter.col, eqFilter.val);
          }
          const {
            count,
            error
          } = await q;
          if (error) {
            console.error(`[Dashboard] Error fetching count for ${table}:`, error);
            return 0;
          }
          return count ?? 0;
        } catch (err) {
          console.error(`[Dashboard] Failed to fetch count for ${table}:`, err);
          return 0;
        }
      };
      const [blogs, notices, teachers, gallery, admissions, inquiries, results, newAdmissions] = await Promise.all([getCount("blogs"), getCount("notices"), getCount("teachers"), getCount("gallery_items"), getCount("admission_applications"), getCount("contact_inquiries"), getCount("student_results"), getCount("admission_applications", {
        col: "status",
        val: "new"
      })]);
      if (active) {
        setC({
          blogs,
          notices,
          teachers,
          gallery,
          admissions,
          inquiries,
          results,
          newAdmissions
        });
      }
    })();
    return () => {
      active = false;
    };
  }, []);
  const cards = [{
    label: "Blogs",
    value: c?.blogs,
    icon: Newspaper,
    color: "bg-blue-500/10 text-blue-700",
    to: "/admin/blogs"
  }, {
    label: "Notices",
    value: c?.notices,
    icon: Megaphone,
    color: "bg-amber-500/10 text-amber-700",
    to: "/admin/notices"
  }, {
    label: "Teachers",
    value: c?.teachers,
    icon: Users,
    color: "bg-emerald-500/10 text-emerald-700",
    to: "/admin/teachers"
  }, {
    label: "Gallery",
    value: c?.gallery,
    icon: Image,
    color: "bg-purple-500/10 text-purple-700",
    to: "/admin/gallery"
  }, {
    label: "Student Results",
    value: c?.results,
    icon: Award,
    color: "bg-indigo-500/10 text-indigo-700",
    to: "/admin/results"
  }, {
    label: "Admissions",
    value: c?.admissions,
    icon: Inbox,
    color: "bg-rose-500/10 text-rose-700",
    badge: c?.newAdmissions,
    to: "/admin/admissions"
  }, {
    label: "Inquiries",
    value: c?.inquiries,
    icon: MessageSquare,
    color: "bg-sky-500/10 text-sky-700",
    to: "/admin/inquiries"
  }];
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h2", { className: "font-display text-2xl font-bold text-primary", children: "Welcome back" }),
    /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Manage your school website content and review inquiries." }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: cards.map((card) => /* @__PURE__ */ jsx(Link, { to: card.to, className: "rounded-2xl border bg-card p-6 hover:shadow-elegant hover:-translate-y-0.5 transition-all cursor-pointer block", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: card.label }),
        /* @__PURE__ */ jsx("div", { className: "mt-2 text-3xl font-display font-bold text-primary", children: card.value ?? "—" }),
        card.badge ? /* @__PURE__ */ jsxs("div", { className: "mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gold/20 text-xs font-semibold text-primary", children: [
          card.badge,
          " new"
        ] }) : null
      ] }),
      /* @__PURE__ */ jsx("div", { className: `h-11 w-11 rounded-xl grid place-items-center ${card.color}`, children: /* @__PURE__ */ jsx(card.icon, { className: "h-5 w-5" }) })
    ] }) }, card.label)) })
  ] });
}
export {
  AdminDashboard as component
};
