import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useRouterState, Link, createRootRouteWithContext, useRouter, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { X, Menu, GraduationCap, Facebook, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { z } from "zod";
const appCss = "/assets/styles-Bgd6tSRY.css";
const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/academics", label: "Academics" },
  { to: "/teachers", label: "Faculty" },
  { to: "/admissions", label: "Admissions" },
  { to: "/facilities", label: "Facilities" },
  { to: "/gallery", label: "Gallery" },
  { to: "/blog", label: "News" },
  { to: "/results", label: "Results" },
  { to: "/contact", label: "Contact" }
];
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    setOpen(false);
  }, [path]);
  return /* @__PURE__ */ jsxs(
    "header",
    {
      className: `sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-md shadow-elegant" : "bg-background"}`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "container-prose flex items-center justify-between h-16 md:h-20 text-foreground flex-nowrap", children: [
          /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 sm:gap-3 group flex-shrink-0", children: [
            /* @__PURE__ */ jsx("div", { className: "h-8 w-8 sm:h-10 sm:w-10 rounded-lg overflow-hidden bg-white/5 border border-white/15 p-0.5 shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-transform group-hover:scale-105 flex-shrink-0", children: /* @__PURE__ */ jsx("img", { src: "/logo.png", alt: "Galaxy Public School & College Logo", className: "w-full h-full object-contain" }) }),
            /* @__PURE__ */ jsxs("div", { className: "leading-tight flex-shrink-0", children: [
              /* @__PURE__ */ jsx("div", { className: "font-display text-xs sm:text-sm xl:text-base font-bold whitespace-nowrap", children: "Galaxy Public School" }),
              /* @__PURE__ */ jsx("div", { className: "font-display text-[10px] sm:text-xs xl:text-sm font-semibold whitespace-nowrap text-white/90 mt-0.5", children: "& College" }),
              /* @__PURE__ */ jsx("div", { className: "text-[8px] sm:text-[9px] xl:text-[10px] tracking-[0.2em] text-white/60 uppercase mt-0.5", children: "Umerkot" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("nav", { className: "hidden xl:flex items-center gap-1 xl:gap-2", children: [
            links.map((l) => {
              const active = path === l.to || l.to !== "/" && path.startsWith(l.to);
              return /* @__PURE__ */ jsxs(
                Link,
                {
                  to: l.to,
                  className: `px-2 xl:px-3 py-2 text-xs xl:text-sm font-medium rounded-md transition-all duration-300 relative whitespace-nowrap ${active ? "text-[oklch(0.72_0.15_255)] drop-shadow-[0_0_8px_oklch(0.62_0.2_255/0.8)] font-semibold" : "text-white/70 hover:text-[oklch(0.72_0.15_255)] hover:drop-shadow-[0_0_6px_oklch(0.62_0.2_255/0.6)]"}`,
                  children: [
                    l.label,
                    active && /* @__PURE__ */ jsx("span", { className: "absolute left-2 right-2 -bottom-0.5 h-0.5 bg-[oklch(0.62_0.2_255)] shadow-[0_0_8px_oklch(0.62_0.2_255/0.8)] rounded-full animate-pulse" })
                  ]
                },
                l.to
              );
            }),
            /* @__PURE__ */ jsx(
              Link,
              {
                to: "/admissions",
                className: "ml-2 xl:ml-3 inline-flex items-center px-3 xl:px-4 py-2 rounded-md bg-[oklch(0.62_0.2_255)] text-white text-xs xl:text-sm font-semibold shadow-[0_0_20px_oklch(0.62_0.2_255/0.3)] hover:shadow-[0_0_25px_oklch(0.62_0.2_255/0.6)] hover:scale-[1.02] transition-all duration-300 cursor-pointer whitespace-nowrap",
                children: "Apply Now"
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              "aria-label": "Toggle menu",
              className: "xl:hidden p-2 text-foreground",
              onClick: () => setOpen((v) => !v),
              children: open ? /* @__PURE__ */ jsx(X, { className: "h-6 w-6" }) : /* @__PURE__ */ jsx(Menu, { className: "h-6 w-6" })
            }
          )
        ] }),
        open && /* @__PURE__ */ jsx("div", { className: "xl:hidden border-t border-white/10 bg-background text-foreground", children: /* @__PURE__ */ jsxs("div", { className: "container-prose py-3 flex flex-col", children: [
          links.map((l) => /* @__PURE__ */ jsx(
            Link,
            {
              to: l.to,
              className: "py-2.5 text-sm font-medium border-b border-white/5 last:border-0 text-white/70 hover:text-[oklch(0.72_0.15_255)] hover:drop-shadow-[0_0_6px_oklch(0.62_0.2_255/0.6)]",
              children: l.label
            },
            l.to
          )),
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/admissions",
              className: "mt-3 inline-flex items-center justify-center px-4 py-2.5 rounded-md bg-[oklch(0.62_0.2_255)] text-white text-sm font-semibold shadow-[0_0_20px_oklch(0.62_0.2_255/0.3)] hover:shadow-[0_0_25px_oklch(0.62_0.2_255/0.6)] transition-all duration-300",
              children: "Apply Now"
            }
          )
        ] }) })
      ]
    }
  );
}
function Footer() {
  return /* @__PURE__ */ jsxs("footer", { className: "bg-background border-t border-white/10 text-foreground mt-24 shadow-2xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "container-prose py-16 grid gap-10 md:grid-cols-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "md:col-span-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "h-10 w-10 rounded-lg bg-white/10 border border-white/20 text-white grid place-items-center shadow-[0_0_15px_rgba(255,255,255,0.15)]", children: /* @__PURE__ */ jsx(GraduationCap, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxs("div", { className: "leading-tight", children: [
            /* @__PURE__ */ jsx("div", { className: "font-display text-base font-bold text-white", children: "Galaxy Public School & College" }),
            /* @__PURE__ */ jsx("div", { className: "text-[10px] tracking-[0.2em] text-white/60 uppercase", children: "Umerkot" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm text-foreground/70 leading-relaxed", children: "Nurturing young minds with academic excellence, Islamic values and modern education since our founding." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-5 flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("a", { href: "#", "aria-label": "Facebook", className: "h-9 w-9 rounded-full grid place-items-center bg-white/10 hover:bg-[oklch(0.62_0.2_255)] hover:shadow-[0_0_15px_oklch(0.62_0.2_255/0.5)] transition-all duration-300", children: /* @__PURE__ */ jsx(Facebook, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsx("a", { href: "#", "aria-label": "Instagram", className: "h-9 w-9 rounded-full grid place-items-center bg-white/10 hover:bg-[oklch(0.62_0.2_255)] hover:shadow-[0_0_15px_oklch(0.62_0.2_255/0.5)] transition-all duration-300", children: /* @__PURE__ */ jsx(Instagram, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsx("a", { href: "#", "aria-label": "YouTube", className: "h-9 w-9 rounded-full grid place-items-center bg-white/10 hover:bg-[oklch(0.62_0.2_255)] hover:shadow-[0_0_15px_oklch(0.62_0.2_255/0.5)] transition-all duration-300", children: /* @__PURE__ */ jsx(Youtube, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsx("a", { href: "https://www.tiktok.com", target: "_blank", rel: "noopener noreferrer", "aria-label": "TikTok", className: "h-9 w-9 rounded-full grid place-items-center bg-white/10 hover:bg-[oklch(0.62_0.2_255)] hover:shadow-[0_0_15px_oklch(0.62_0.2_255/0.5)] transition-all duration-300", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "h-4 w-4", children: /* @__PURE__ */ jsx("path", { d: "M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" }) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-sm font-semibold uppercase tracking-wider text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]", children: "Explore" }),
        /* @__PURE__ */ jsxs("ul", { className: "mt-4 space-y-2 text-sm text-foreground/80", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/about", className: "hover:text-[oklch(0.72_0.15_255)] hover:drop-shadow-[0_0_6px_oklch(0.62_0.2_255/0.6)] transition-all duration-300", children: "About Us" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/academics", className: "hover:text-[oklch(0.72_0.15_255)] hover:drop-shadow-[0_0_6px_oklch(0.62_0.2_255/0.6)] transition-all duration-300", children: "Academics" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/teachers", className: "hover:text-[oklch(0.72_0.15_255)] hover:drop-shadow-[0_0_6px_oklch(0.62_0.2_255/0.6)] transition-all duration-300", children: "Our Faculty" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/facilities", className: "hover:text-[oklch(0.72_0.15_255)] hover:drop-shadow-[0_0_6px_oklch(0.62_0.2_255/0.6)] transition-all duration-300", children: "Facilities" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/gallery", className: "hover:text-[oklch(0.72_0.15_255)] hover:drop-shadow-[0_0_6px_oklch(0.62_0.2_255/0.6)] transition-all duration-300", children: "Gallery" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/blog", className: "hover:text-[oklch(0.72_0.15_255)] hover:drop-shadow-[0_0_6px_oklch(0.62_0.2_255/0.6)] transition-all duration-300", children: "News & Blog" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-sm font-semibold uppercase tracking-wider text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]", children: "Quick Links" }),
        /* @__PURE__ */ jsxs("ul", { className: "mt-4 space-y-2 text-sm text-foreground/80", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/admissions", className: "hover:text-[oklch(0.72_0.15_255)] hover:drop-shadow-[0_0_6px_oklch(0.62_0.2_255/0.6)] transition-all duration-300", children: "Admissions" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/results", className: "hover:text-[oklch(0.72_0.15_255)] hover:drop-shadow-[0_0_6px_oklch(0.62_0.2_255/0.6)] transition-all duration-300", children: "Result Portal" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/contact", className: "hover:text-[oklch(0.72_0.15_255)] hover:drop-shadow-[0_0_6px_oklch(0.62_0.2_255/0.6)] transition-all duration-300", children: "Contact" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-[oklch(0.72_0.15_255)] hover:drop-shadow-[0_0_6px_oklch(0.62_0.2_255/0.6)] transition-all duration-300", children: "Download Prospectus" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-sm font-semibold uppercase tracking-wider text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]", children: "Contact" }),
        /* @__PURE__ */ jsxs("ul", { className: "mt-4 space-y-3 text-sm text-foreground/80", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4 mt-0.5 text-white/80 flex-shrink-0" }),
            /* @__PURE__ */ jsx("span", { children: "Main Campus, Umerkot, Sindh, Pakistan" })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4 mt-0.5 text-white/80 flex-shrink-0" }),
            /* @__PURE__ */ jsx("span", { children: "+92 342 3299800" })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(Mail, { className: "h-4 w-4 mt-0.5 text-white/80 flex-shrink-0" }),
            /* @__PURE__ */ jsx("span", { children: "info@galaxyschool.edu.pk" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "border-t border-white/10", children: /* @__PURE__ */ jsxs("div", { className: "container-prose py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-foreground/60", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Galaxy Public School & College Umerkot. All rights reserved."
      ] }),
      /* @__PURE__ */ jsx("p", { children: "Crafted with care for the next generation of leaders." })
    ] }) })
  ] });
}
function WhatsAppButton() {
  return /* @__PURE__ */ jsx(
    "a",
    {
      href: "https://wa.me/923423299800",
      target: "_blank",
      rel: "noopener noreferrer",
      "aria-label": "Chat on WhatsApp",
      className: "fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-[#25D366] text-white grid place-items-center shadow-elegant hover:scale-110 transition-transform",
      children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", className: "h-7 w-7", fill: "currentColor", "aria-hidden": true, children: /* @__PURE__ */ jsx("path", { d: "M20.52 3.48A11.86 11.86 0 0012.04 0C5.5 0 .18 5.32.18 11.86c0 2.09.55 4.13 1.6 5.93L0 24l6.4-1.68a11.84 11.84 0 005.64 1.44h.01c6.54 0 11.86-5.32 11.86-11.86 0-3.17-1.23-6.15-3.39-8.42zM12.05 21.4h-.01a9.5 9.5 0 01-4.85-1.33l-.35-.21-3.8 1 1.02-3.7-.23-.38a9.5 9.5 0 01-1.46-5.02c0-5.25 4.28-9.52 9.53-9.52 2.55 0 4.94.99 6.74 2.8a9.46 9.46 0 012.79 6.74c0 5.25-4.28 9.52-9.52 9.52zm5.49-7.13c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.36.22-.66.07-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.78-1.68-2.08-.18-.3-.02-.46.13-.61.13-.13.3-.36.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.07-.15-.68-1.64-.93-2.24-.24-.59-.49-.51-.68-.52l-.58-.01c-.2 0-.53.07-.8.38s-1.05 1.03-1.05 2.5 1.07 2.9 1.22 3.1c.15.2 2.11 3.23 5.12 4.53.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.78-.73 2.03-1.43.25-.7.25-1.31.18-1.43-.07-.13-.27-.2-.57-.35z" }) })
    }
  );
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "font-display text-7xl font-bold text-primary", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold text-primary", children: "Something went wrong" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsx("a", { href: "/", className: "rounded-md border border-input bg-background px-4 py-2 text-sm font-medium", children: "Go home" })
    ] })
  ] }) });
}
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Galaxy Public School & College Umerkot",
  description: "Premier English-medium school and college in Umerkot offering Montessori, Primary, Secondary and Intermediate education.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Umerkot",
    addressRegion: "Sindh",
    addressCountry: "PK"
  }
};
const Route$n = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Galaxy Public School & College Umerkot | Premier English-Medium Education" },
      { name: "description", content: "Premier English-medium school and college in Umerkot — Montessori to Intermediate. Smart classes, experienced teachers, Islamic values and modern facilities." },
      { name: "author", content: "Galaxy Public School & College Umerkot" },
      { property: "og:site_name", content: "Galaxy Public School & College Umerkot" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#060612" },
      { property: "og:title", content: "Galaxy Public School & College Umerkot | Premier English-Medium Education" },
      { name: "twitter:title", content: "Galaxy Public School & College Umerkot | Premier English-Medium Education" },
      { property: "og:description", content: "Premier English-medium school and college in Umerkot — Montessori to Intermediate. Smart classes, experienced teachers, Islamic values and modern facilities." },
      { name: "twitter:description", content: "Premier English-medium school and college in Umerkot — Montessori to Intermediate. Smart classes, experienced teachers, Islamic values and modern facilities." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a709993b-66f0-4706-a47b-9911e04c8feb/id-preview-e3a896c8--0f1491f4-28cf-435e-87fe-20a8d4b9931f.lovable.app-1779951434642.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a709993b-66f0-4706-a47b-9911e04c8feb/id-preview-e3a896c8--0f1491f4-28cf-435e-87fe-20a8d4b9931f.lovable.app-1779951434642.png" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preload", href: "/logo.png", as: "image" }
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(orgJsonLd) }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          id: "root-preloader",
          style: {
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#060612",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)"
          },
          children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                style: {
                  position: "absolute",
                  inset: 0,
                  background: "radial-gradient(circle at center, rgba(255,255,255,0.06) 0%, transparent 70%)",
                  pointerEvents: "none"
                }
              }
            ),
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: "animate-preloader-intro",
                style: {
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  maxWidth: "24rem",
                  paddingLeft: "1.5rem",
                  paddingRight: "1.5rem",
                  textAlign: "center"
                },
                children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      style: {
                        position: "absolute",
                        height: "16rem",
                        width: "16rem",
                        borderRadius: "9999px",
                        background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%)",
                        filter: "blur(24px)",
                        animation: "pulse 2s infinite"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    "div",
                    {
                      style: {
                        position: "relative",
                        marginBottom: "2rem",
                        overflow: "hidden",
                        borderRadius: "1rem",
                        padding: "1.25rem",
                        backgroundColor: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        boxShadow: "0 0 50px rgba(255,255,255,0.05)"
                      },
                      children: [
                        /* @__PURE__ */ jsx(
                          "img",
                          {
                            src: "/logo.png",
                            alt: "Galaxy Public School & College Logo",
                            style: {
                              width: "15rem",
                              height: "15rem",
                              objectFit: "contain",
                              filter: "drop-shadow(0 4px 20px rgba(255,255,255,0.15))"
                            },
                            width: "240",
                            height: "240"
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "div",
                          {
                            className: "animate-preloader-shine",
                            style: {
                              position: "absolute",
                              inset: 0,
                              background: "linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)"
                            }
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      style: {
                        width: "12rem",
                        height: "2px",
                        backgroundColor: "rgba(255,255,255,0.1)",
                        borderRadius: "9999px",
                        overflow: "hidden",
                        position: "relative",
                        marginBottom: "1rem"
                      },
                      children: /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: "animate-preloader-bar",
                          style: {
                            position: "absolute",
                            left: 0,
                            top: 0,
                            height: "100%",
                            width: "0%",
                            backgroundColor: "white",
                            borderRadius: "9999px"
                          }
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      style: {
                        fontSize: "10px",
                        textTransform: "uppercase",
                        letterSpacing: "0.35em",
                        color: "rgba(255,255,255,0.7)",
                        fontWeight: 600,
                        display: "inline-block"
                      },
                      children: "LEARN • LEAD • ACHIEVE"
                    }
                  )
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        "script",
        {
          dangerouslySetInnerHTML: {
            __html: `
              (function() {
                var preloader = document.getElementById("root-preloader");
                document.body.style.overflow = "hidden";
                setTimeout(function() {
                  if (preloader) {
                    preloader.style.opacity = "0";
                    preloader.style.transform = "scale(1.08) translateY(0)";
                    preloader.style.filter = "blur(12px)";
                    preloader.style.pointerEvents = "none";
                  }
                }, 2000);
                setTimeout(function() {
                  if (preloader) {
                    preloader.style.display = "none";
                  }
                  document.body.style.overflow = "";
                }, 2700);
              })();
            `
          }
        }
      ),
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$n.useRouteContext();
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen flex-col", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("main", { className: "flex-1", children: /* @__PURE__ */ jsx(Outlet, {}) }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(WhatsAppButton, {})
  ] }) });
}
const classroomImg = "/assets/classroom-xaBO_vPC.jpg";
const $$splitComponentImporter$l = () => import("./teachers-CCdnHDUA.js");
const Route$m = createFileRoute("/teachers")({
  head: () => ({
    meta: [{
      title: "Our Faculty | Galaxy Public School & College Umerkot"
    }, {
      name: "description",
      content: "Meet the experienced, highly qualified teachers and leadership at Galaxy Public School & College Umerkot — dedicated to academic excellence."
    }, {
      property: "og:title",
      content: "Our Faculty — Galaxy Public School & College Umerkot"
    }, {
      property: "og:description",
      content: "Experienced educators shaping tomorrow's leaders."
    }, {
      property: "og:image",
      content: classroomImg
    }, {
      property: "og:url",
      content: "/teachers"
    }],
    links: [{
      rel: "canonical",
      href: "/teachers"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$l, "component")
});
const heroImg = "/assets/hero-campus-C7fmOjD4.jpg";
const sportsImg = "/assets/sports-KRxB2I6U.jpg";
const graduationImg = "/assets/graduation-BFQBtTRh.jpg";
const posts = [
  {
    slug: "admissions-open-2026",
    title: "Admissions Open for the 2026 Academic Session",
    excerpt: "Applications are now being accepted for all sections — Montessori through Intermediate. Limited seats available.",
    date: "2026-05-15",
    category: "Announcements",
    image: heroImg,
    body: [
      "We are pleased to announce that admissions for the 2026 academic session are now open across all sections of Galaxy Public School & College Umerkot.",
      "Parents are encouraged to apply early as seats are limited, especially in Montessori and Primary. Visit our admissions page to submit an inquiry online or call us to schedule a campus tour.",
      "We look forward to welcoming new families into the Galaxy's community."
    ]
  },
  {
    slug: "annual-sports-day-recap",
    title: "Annual Sports Day: A Day of Energy and Pride",
    excerpt: "Our students lit up the field at this year's Annual Sports Day with athletics, team games and a memorable closing ceremony.",
    date: "2026-04-22",
    category: "Events",
    image: sportsImg,
    body: [
      "This year's Annual Sports Day was a celebration of athleticism, teamwork and pure joy. From the Montessori races to the senior relay finals, every student had a moment to shine.",
      "We are deeply grateful to the parents who came out in numbers to cheer their children on — your support means everything."
    ]
  },
  {
    slug: "matric-results-2026",
    title: "Outstanding Matric Results — 98% Pass Rate",
    excerpt: "Heartfelt congratulations to our Matric students for achieving a 98% pass rate with multiple distinctions across subjects.",
    date: "2026-03-10",
    category: "Results",
    image: graduationImg,
    body: [
      "Alhamdulillah, our Matric students have once again delivered outstanding results in the Sindh Board examinations, with a 98% pass rate and several students securing distinctions.",
      "We thank our dedicated teachers, supportive parents and hardworking students for making this possible."
    ]
  },
  {
    slug: "smart-classrooms-rollout",
    title: "Smart Classrooms Now in Every Section",
    excerpt: "We have completed the rollout of interactive smart boards across all classrooms — bringing digital learning to every student.",
    date: "2026-02-01",
    category: "Campus",
    image: classroomImg,
    body: [
      "As part of our ongoing commitment to modern education, we have completed the installation of interactive smart boards in every classroom across the campus.",
      "These tools allow teachers to integrate video, simulations and digital content into everyday lessons, making learning more engaging and effective."
    ]
  }
];
const BASE_URL = "";
const Route$l = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths = ["/", "/about", "/academics", "/admissions", "/facilities", "/gallery", "/blog", "/results", "/contact"];
        const postPaths = posts.map((p) => `/blog/${p.slug}`);
        const all = [...staticPaths, ...postPaths];
        const urls = all.map(
          (p) => `  <url><loc>${BASE_URL}${p}</loc><changefreq>weekly</changefreq></url>`
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`
        ].join("\n");
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" }
        });
      }
    }
  }
});
const $$splitComponentImporter$k = () => import("./results-C9ZpH6iN.js");
const Route$k = createFileRoute("/results")({
  head: () => ({
    meta: [{
      title: "Result Portal | Galaxy Public School & College Umerkot"
    }, {
      name: "description",
      content: "Check your result by selecting your class and entering your seat number."
    }, {
      property: "og:title",
      content: "Result Portal — Galaxy Public School & College Umerkot"
    }, {
      property: "og:description",
      content: "Class-wise online result lookup."
    }, {
      property: "og:url",
      content: "/results"
    }],
    links: [{
      rel: "canonical",
      href: "/results"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$k, "component")
});
const $$splitComponentImporter$j = () => import("./login-CTheYIMn.js");
const Route$j = createFileRoute("/login")({
  head: () => ({
    meta: [{
      title: "Login | Admin — Galaxy Public School & College"
    }, {
      name: "robots",
      content: "noindex"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$j, "component")
});
const $$splitComponentImporter$i = () => import("./gallery-DT3BsEVp.js");
const searchSchema = z.object({
  category: z.string().optional()
});
const Route$i = createFileRoute("/gallery")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [{
      title: "Gallery | Galaxy Public School & College Umerkot"
    }, {
      name: "description",
      content: "Take a visual tour of our campus — classrooms, events, sports, annual functions and student activities."
    }, {
      property: "og:title",
      content: "Gallery — Galaxy Public School & College Umerkot"
    }, {
      property: "og:description",
      content: "Photos and videos from campus life."
    }, {
      property: "og:image",
      content: heroImg
    }, {
      property: "og:url",
      content: "/gallery"
    }],
    links: [{
      rel: "canonical",
      href: "/gallery"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
const labImg = "/assets/lab-xaA39jkU.jpg";
const $$splitComponentImporter$h = () => import("./facilities-tEBzgEaQ.js");
const Route$h = createFileRoute("/facilities")({
  head: () => ({
    meta: [{
      title: "Facilities | Galaxy Public School & College Umerkot"
    }, {
      name: "description",
      content: "Smart classrooms, computer & science labs, library, sports facilities, CCTV security and more — a campus built for modern learning."
    }, {
      property: "og:title",
      content: "Facilities — Galaxy Public School & College Umerkot"
    }, {
      property: "og:description",
      content: "Smart classes, labs, library and more."
    }, {
      property: "og:image",
      content: labImg
    }, {
      property: "og:url",
      content: "/facilities"
    }],
    links: [{
      rel: "canonical",
      href: "/facilities"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("./contact-DJsmnfTs.js");
const Route$g = createFileRoute("/contact")({
  head: () => ({
    meta: [{
      title: "Contact Us | Galaxy Public School & College Umerkot"
    }, {
      name: "description",
      content: "Get in touch with Galaxy Public School & College Umerkot — address, phone, email, WhatsApp and a contact form. We respond within one working day."
    }, {
      property: "og:title",
      content: "Contact — Galaxy Public School & College Umerkot"
    }, {
      property: "og:description",
      content: "Get in touch with our school."
    }, {
      property: "og:image",
      content: heroImg
    }, {
      property: "og:url",
      content: "/contact"
    }],
    links: [{
      rel: "canonical",
      href: "/contact"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./blog-D4DIopMI.js");
const Route$f = createFileRoute("/blog")({
  head: () => ({
    meta: [{
      title: "News & Blog | Galaxy Public School & College Umerkot"
    }, {
      name: "description",
      content: "Latest news, announcements, results and events from Galaxy Public School & College Umerkot."
    }, {
      property: "og:title",
      content: "News & Blog — Galaxy Public School & College Umerkot"
    }, {
      property: "og:description",
      content: "Announcements, events and stories from our campus."
    }, {
      property: "og:image",
      content: heroImg
    }, {
      property: "og:url",
      content: "/blog"
    }],
    links: [{
      rel: "canonical",
      href: "/blog"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./admissions-DYvtoXWJ.js");
const Route$e = createFileRoute("/admissions")({
  head: () => ({
    meta: [{
      title: "Admissions | Galaxy Public School & College Umerkot"
    }, {
      name: "description",
      content: "Admissions are open at Galaxy Public School & College Umerkot. Apply online for Montessori, Primary, Secondary or College — quick, simple and parent-friendly."
    }, {
      property: "og:title",
      content: "Admissions — Galaxy Public School & College Umerkot"
    }, {
      property: "og:description",
      content: "Apply online for the upcoming session."
    }, {
      property: "og:image",
      content: heroImg
    }, {
      property: "og:url",
      content: "/admissions"
    }],
    links: [{
      rel: "canonical",
      href: "/admissions"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./admin-BslAELad.js");
const Route$d = createFileRoute("/admin")({
  head: () => ({
    meta: [{
      title: "Admin | Galaxy Public School & College"
    }, {
      name: "robots",
      content: "noindex"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./academics-Vl5BH5Jp.js");
const Route$c = createFileRoute("/academics")({
  head: () => ({
    meta: [{
      title: "Academics | Galaxy Public School & College Umerkot"
    }, {
      name: "description",
      content: "Montessori, Primary, Secondary and College sections at Galaxy Public School & College Umerkot — a complete academic journey under one roof."
    }, {
      property: "og:title",
      content: "Academics — Galaxy Public School & College Umerkot"
    }, {
      property: "og:description",
      content: "Montessori to Intermediate, all under one roof."
    }, {
      property: "og:image",
      content: classroomImg
    }, {
      property: "og:url",
      content: "/academics"
    }],
    links: [{
      rel: "canonical",
      href: "/academics"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./about-DLvi3NVK.js");
const Route$b = createFileRoute("/about")({
  head: () => ({
    meta: [{
      title: "About Us | Galaxy Public School & College Umerkot"
    }, {
      name: "description",
      content: "Learn about Galaxy Public School & College Umerkot — our history, mission, vision and the leadership shaping a generation of confident, ethical learners."
    }, {
      property: "og:title",
      content: "About Galaxy Public School & College Umerkot"
    }, {
      property: "og:description",
      content: "Our story, mission, vision and leadership."
    }, {
      property: "og:image",
      content: heroImg
    }, {
      property: "og:url",
      content: "/about"
    }],
    links: [{
      rel: "canonical",
      href: "/about"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./index-CtQZiQ2U.js");
const Route$a = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Galaxy Public School & College Umerkot | Premier English-Medium School & College"
    }, {
      name: "description",
      content: "Welcome to Galaxy Public School & College Umerkot — academic excellence from Montessori to Intermediate with smart classes, Islamic values and experienced faculty."
    }, {
      property: "og:title",
      content: "Galaxy Public School & College Umerkot"
    }, {
      property: "og:description",
      content: "Premier English-medium school & college in Umerkot."
    }, {
      property: "og:image",
      content: heroImg
    }, {
      property: "og:url",
      content: "/"
    }],
    links: [{
      rel: "canonical",
      href: "/"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./admin.index-C181ILBc.js");
const Route$9 = createFileRoute("/admin/")({
  head: () => ({
    meta: [{
      title: "Dashboard | Admin"
    }, {
      name: "robots",
      content: "noindex"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitNotFoundComponentImporter = () => import("./blog._slug-BpV3zlHG.js");
const $$splitComponentImporter$8 = () => import("./blog._slug-Ce3zeHqY.js");
const Route$8 = createFileRoute("/blog/$slug")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
const $$splitComponentImporter$7 = () => import("./admin.teachers-DqW4yGnn.js");
const Route$7 = createFileRoute("/admin/teachers")({
  head: () => ({
    meta: [{
      title: "Teachers | Admin"
    }, {
      name: "robots",
      content: "noindex"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./admin.results-X9aqy5qN.js");
const Route$6 = createFileRoute("/admin/results")({
  head: () => ({
    meta: [{
      title: "Results | Admin"
    }, {
      name: "robots",
      content: "noindex"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./admin.notices-BARWivuk.js");
const Route$5 = createFileRoute("/admin/notices")({
  head: () => ({
    meta: [{
      title: "Notices | Admin"
    }, {
      name: "robots",
      content: "noindex"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./admin.inquiries-OWVoRRf0.js");
const Route$4 = createFileRoute("/admin/inquiries")({
  head: () => ({
    meta: [{
      title: "Inquiries | Admin"
    }, {
      name: "robots",
      content: "noindex"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./admin.gallery-C90AqTdL.js");
const Route$3 = createFileRoute("/admin/gallery")({
  head: () => ({
    meta: [{
      title: "Gallery | Admin"
    }, {
      name: "robots",
      content: "noindex"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./admin.content-SFq7JNcf.js");
const Route$2 = createFileRoute("/admin/content")({
  head: () => ({
    meta: [{
      title: "Site Content | Admin"
    }, {
      name: "robots",
      content: "noindex"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./admin.blogs-BbtTXAoH.js");
const Route$1 = createFileRoute("/admin/blogs")({
  head: () => ({
    meta: [{
      title: "News & Blog | Admin"
    }, {
      name: "robots",
      content: "noindex"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./admin.admissions-Cs-5xZAA.js");
const Route = createFileRoute("/admin/admissions")({
  head: () => ({
    meta: [{
      title: "Admissions Inbox | Admin"
    }, {
      name: "robots",
      content: "noindex"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const TeachersRoute = Route$m.update({
  id: "/teachers",
  path: "/teachers",
  getParentRoute: () => Route$n
});
const SitemapDotxmlRoute = Route$l.update({
  id: "/sitemap.xml",
  path: "/sitemap.xml",
  getParentRoute: () => Route$n
});
const ResultsRoute = Route$k.update({
  id: "/results",
  path: "/results",
  getParentRoute: () => Route$n
});
const LoginRoute = Route$j.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$n
});
const GalleryRoute = Route$i.update({
  id: "/gallery",
  path: "/gallery",
  getParentRoute: () => Route$n
});
const FacilitiesRoute = Route$h.update({
  id: "/facilities",
  path: "/facilities",
  getParentRoute: () => Route$n
});
const ContactRoute = Route$g.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$n
});
const BlogRoute = Route$f.update({
  id: "/blog",
  path: "/blog",
  getParentRoute: () => Route$n
});
const AdmissionsRoute = Route$e.update({
  id: "/admissions",
  path: "/admissions",
  getParentRoute: () => Route$n
});
const AdminRoute = Route$d.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$n
});
const AcademicsRoute = Route$c.update({
  id: "/academics",
  path: "/academics",
  getParentRoute: () => Route$n
});
const AboutRoute = Route$b.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$n
});
const IndexRoute = Route$a.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$n
});
const AdminIndexRoute = Route$9.update({
  id: "/",
  path: "/",
  getParentRoute: () => AdminRoute
});
const BlogSlugRoute = Route$8.update({
  id: "/$slug",
  path: "/$slug",
  getParentRoute: () => BlogRoute
});
const AdminTeachersRoute = Route$7.update({
  id: "/teachers",
  path: "/teachers",
  getParentRoute: () => AdminRoute
});
const AdminResultsRoute = Route$6.update({
  id: "/results",
  path: "/results",
  getParentRoute: () => AdminRoute
});
const AdminNoticesRoute = Route$5.update({
  id: "/notices",
  path: "/notices",
  getParentRoute: () => AdminRoute
});
const AdminInquiriesRoute = Route$4.update({
  id: "/inquiries",
  path: "/inquiries",
  getParentRoute: () => AdminRoute
});
const AdminGalleryRoute = Route$3.update({
  id: "/gallery",
  path: "/gallery",
  getParentRoute: () => AdminRoute
});
const AdminContentRoute = Route$2.update({
  id: "/content",
  path: "/content",
  getParentRoute: () => AdminRoute
});
const AdminBlogsRoute = Route$1.update({
  id: "/blogs",
  path: "/blogs",
  getParentRoute: () => AdminRoute
});
const AdminAdmissionsRoute = Route.update({
  id: "/admissions",
  path: "/admissions",
  getParentRoute: () => AdminRoute
});
const AdminRouteChildren = {
  AdminAdmissionsRoute,
  AdminBlogsRoute,
  AdminContentRoute,
  AdminGalleryRoute,
  AdminInquiriesRoute,
  AdminNoticesRoute,
  AdminResultsRoute,
  AdminTeachersRoute,
  AdminIndexRoute
};
const AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
const BlogRouteChildren = {
  BlogSlugRoute
};
const BlogRouteWithChildren = BlogRoute._addFileChildren(BlogRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  AcademicsRoute,
  AdminRoute: AdminRouteWithChildren,
  AdmissionsRoute,
  BlogRoute: BlogRouteWithChildren,
  ContactRoute,
  FacilitiesRoute,
  GalleryRoute,
  LoginRoute,
  ResultsRoute,
  SitemapDotxmlRoute,
  TeachersRoute
};
const routeTree = Route$n._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$i as R,
  Route$8 as a,
  classroomImg as c,
  graduationImg as g,
  heroImg as h,
  labImg as l,
  router as r,
  sportsImg as s
};
