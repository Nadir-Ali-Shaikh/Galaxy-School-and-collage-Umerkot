import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate, useRouterState, Link, Outlet } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Loader2, LogOut, GraduationCap, ExternalLink, X, Menu, LayoutDashboard, FileText, Newspaper, Megaphone, Users, Image, Award, Inbox, MessageSquare } from "lucide-react";
import { u as useAuth } from "./use-auth-DVOU-CNx.js";
import { s as supabase } from "./client-B4EfndxM.js";
import "@supabase/supabase-js";
import "@libsql/client/web";
const NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/content", label: "Site Content", icon: FileText },
  { to: "/admin/blogs", label: "Blogs", icon: Newspaper },
  { to: "/admin/notices", label: "Notices", icon: Megaphone },
  { to: "/admin/teachers", label: "Teachers", icon: Users },
  { to: "/admin/gallery", label: "Gallery", icon: Image },
  { to: "/admin/results", label: "Results", icon: Award },
  { to: "/admin/admissions", label: "Admissions", icon: Inbox },
  { to: "/admin/inquiries", label: "Inquiries", icon: MessageSquare }
];
function AdminLayout() {
  const navigate = useNavigate();
  const { session, loading, isAdmin, roleLoading } = useAuth();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!loading && !session) navigate({ to: "/login" });
  }, [loading, session, navigate]);
  useEffect(() => {
    setOpen(false);
  }, [path]);
  if (loading || roleLoading) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen grid place-items-center bg-secondary", children: /* @__PURE__ */ jsx(Loader2, { className: "h-8 w-8 animate-spin text-primary" }) });
  }
  if (!session) return null;
  if (!isAdmin) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen grid place-items-center bg-secondary px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center rounded-2xl border bg-card p-10 shadow-elegant", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-display text-2xl font-bold text-primary", children: "Access denied" }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "Your account does not have admin access. Please contact the administrator." }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: async () => {
            await supabase.auth.signOut();
            navigate({ to: "/login" });
          },
          className: "mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold",
          children: [
            /* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4" }),
            " Sign out"
          ]
        }
      )
    ] }) });
  }
  const NavList = () => /* @__PURE__ */ jsx("nav", { className: "flex-1 px-3 py-4 space-y-1", children: NAV.map((n) => {
    const active = n.exact ? path === n.to : path === n.to || path.startsWith(n.to + "/");
    return /* @__PURE__ */ jsxs(
      Link,
      {
        to: n.to,
        className: `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-300 ${active ? "bg-[oklch(0.62_0.2_255)] text-white shadow-[0_0_15px_oklch(0.62_0.2_255/0.3)] font-semibold" : "text-foreground/80 hover:text-white hover:bg-white/10 hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]"}`,
        children: [
          /* @__PURE__ */ jsx(n.icon, { className: "h-4 w-4" }),
          " ",
          n.label
        ]
      },
      n.to
    );
  }) });
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex bg-secondary", children: [
    /* @__PURE__ */ jsxs("aside", { className: "hidden lg:flex w-64 flex-col bg-background text-foreground sticky top-0 h-screen", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/admin", className: "flex items-center gap-3 px-5 h-16 border-b border-white/10", children: [
        /* @__PURE__ */ jsx("div", { className: "h-9 w-9 rounded-lg bg-gold text-gold-foreground grid place-items-center", children: /* @__PURE__ */ jsx(GraduationCap, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxs("div", { className: "leading-tight", children: [
          /* @__PURE__ */ jsx("div", { className: "font-display text-sm font-bold", children: "Galaxy Public School & College" }),
          /* @__PURE__ */ jsx("div", { className: "text-[10px] tracking-[0.2em] text-gold uppercase", children: "Admin" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(NavList, {}),
      /* @__PURE__ */ jsxs("div", { className: "p-3 border-t border-white/10 space-y-1", children: [
        /* @__PURE__ */ jsxs("a", { href: "/", target: "_blank", rel: "noreferrer", className: "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-foreground/80 hover:bg-white/10", children: [
          /* @__PURE__ */ jsx(ExternalLink, { className: "h-4 w-4" }),
          " View site"
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: async () => {
              await supabase.auth.signOut();
              navigate({ to: "/login" });
            },
            className: "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-foreground/80 hover:bg-white/10",
            children: [
              /* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4" }),
              " Sign out"
            ]
          }
        )
      ] })
    ] }),
    open && /* @__PURE__ */ jsxs("div", { className: "lg:hidden fixed inset-0 z-50 flex", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/50", onClick: () => setOpen(false) }),
      /* @__PURE__ */ jsxs("aside", { className: "relative w-64 bg-background text-foreground flex flex-col", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-5 h-16 border-b border-white/10", children: [
          /* @__PURE__ */ jsx("span", { className: "font-display font-bold", children: "Admin" }),
          /* @__PURE__ */ jsx("button", { onClick: () => setOpen(false), children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5" }) })
        ] }),
        /* @__PURE__ */ jsx(NavList, {})
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col min-w-0", children: [
      /* @__PURE__ */ jsx("header", { className: "bg-card border-b sticky top-0 z-30", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-4 lg:px-8 h-16", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => setOpen(true), className: "lg:hidden p-2 -ml-2", children: /* @__PURE__ */ jsx(Menu, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsx("div", { className: "font-display text-lg font-semibold text-primary", children: NAV.find((n) => n.exact ? path === n.to : path === n.to || path.startsWith(n.to + "/"))?.label ?? "Admin" }),
        /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground hidden sm:block", children: session.user.email })
      ] }) }),
      /* @__PURE__ */ jsx("main", { className: "flex-1 p-4 lg:p-8 overflow-x-hidden", children: /* @__PURE__ */ jsx(Outlet, {}) })
    ] })
  ] });
}
const SplitComponent = AdminLayout;
export {
  SplitComponent as component
};
