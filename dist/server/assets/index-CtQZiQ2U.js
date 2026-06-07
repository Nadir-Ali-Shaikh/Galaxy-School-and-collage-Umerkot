import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState, useRef, useMemo, useEffect } from "react";
import { ArrowRight, AlertCircle, Megaphone, BookOpen, ShieldCheck, Users, Sparkles, Trophy, GraduationCap, Quote } from "lucide-react";
import { s as supabase } from "./client-B4EfndxM.js";
import { h as heroImg, c as classroomImg, l as labImg, s as sportsImg } from "./router-u_y3GPsN.js";
import { p as principalImg } from "./principal-BG4gMyFt.js";
import { l as libraryImg } from "./library-EUrNu8O0.js";
import { S as SectionHeading } from "./Section-DSunpl44.js";
import { u as useSiteContent } from "./use-site-content-CQfIhHeJ.js";
import { S as ScrollReveal } from "./ScrollReveal-CVX44pax.js";
import "@supabase/supabase-js";
import "@libsql/client/web";
import "@tanstack/react-query";
import "zod";
function AnimatedCounter({ value, duration = 1500 }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);
  const parsed = useMemo(() => {
    const digits = value.replace(/[^0-9]/g, "");
    const target = parseInt(digits, 10) || 0;
    const isPercent = value.includes("%");
    const isPlus = value.includes("+");
    const hasCommas = value.includes(",");
    return { target, isPercent, isPlus, hasCommas };
  }, [value]);
  useEffect(() => {
    if (hasAnimated || parsed.target === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setHasAnimated(true);
          let startTimestamp = null;
          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const elapsed = timestamp - startTimestamp;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = progress * (2 - progress);
            setCount(Math.floor(easeProgress * parsed.target));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(parsed.target);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
      // trigger slightly before entering fully
    );
    const currentRef = elementRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [parsed.target, duration, hasAnimated]);
  const displayValue = useMemo(() => {
    if (!hasAnimated) return value;
    let formatted = count.toString();
    if (parsed.hasCommas) {
      formatted = count.toLocaleString();
    }
    if (parsed.isPlus) {
      formatted += "+";
    }
    if (parsed.isPercent) {
      formatted += "%";
    }
    return formatted;
  }, [count, hasAnimated, parsed, value]);
  return /* @__PURE__ */ jsx("div", { ref: elementRef, className: "inline-block transition-all duration-300", children: displayValue });
}
const features = [{
  icon: BookOpen,
  title: "Smart Classrooms",
  desc: "Interactive digital learning across every level."
}, {
  icon: ShieldCheck,
  title: "Safe Campus",
  desc: "24/7 CCTV monitoring and trained staff."
}, {
  icon: Users,
  title: "Experienced Faculty",
  desc: "Dedicated teachers committed to student growth."
}, {
  icon: Sparkles,
  title: "Islamic Values",
  desc: "Character building rooted in tradition."
}, {
  icon: Trophy,
  title: "Co-curricular",
  desc: "Sports, debates, art and annual functions."
}, {
  icon: GraduationCap,
  title: "College Section",
  desc: "Pre-Medical, Pre-Engineering & Commerce."
}];
function Home() {
  const c = useSiteContent("home");
  const [notices, setNotices] = useState([]);
  useEffect(() => {
    supabase.from("notices").select("id,title,body,important,published_at").eq("published", true).order("published_at", {
      ascending: false
    }).limit(4).then(({
      data
    }) => setNotices(data ?? []));
  }, []);
  const heroImage = c.get("hero", "image_url") || heroImg;
  const principalPhoto = c.get("principal", "photo") || principalImg;
  const cardPrincipal = c.get("cards", "principal") || principalImg;
  const cardClassroom = c.get("cards", "classroom") || classroomImg;
  const cardLab = c.get("cards", "lab") || labImg;
  const cardLibrary = c.get("cards", "library") || libraryImg;
  const cardSports = c.get("cards", "sports") || sportsImg;
  const stats = [{
    value: c.get("stats", "students", "1,200+"),
    label: "Students Enrolled"
  }, {
    value: c.get("stats", "teachers", "60+"),
    label: "Qualified Teachers"
  }, {
    value: c.get("stats", "results", "98%"),
    label: "Result Success Rate"
  }, {
    value: c.get("stats", "years", "15+"),
    label: "Years of Excellence"
  }];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("section", { className: "relative min-h-[88vh] flex items-center overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "absolute inset-0", children: [
        /* @__PURE__ */ jsx("img", { src: heroImage, alt: "Galaxy Public School & College campus", className: "w-full h-full object-cover", width: 1920, height: 1080, fetchPriority: "high" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-[#060612]/90 via-[#060612]/75 to-[#060612]/30" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "relative container-prose py-24 text-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl animate-fade-up", children: [
        /* @__PURE__ */ jsx("h1", { className: "font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05]", children: c.get("hero", "title", "Shaping Tomorrow's Leaders Today") }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 text-base md:text-lg text-white/90 leading-relaxed max-w-2xl", children: c.get("hero", "subtitle", "Galaxy Public School & College Umerkot blends modern academics, Islamic values and a nurturing environment to prepare students for excellence — from Montessori to Intermediate.") }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxs(Link, { to: "/admissions", className: "inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[oklch(0.62_0.2_255)] text-white font-semibold shadow-[0_0_20px_oklch(0.62_0.2_255/0.3)] hover:shadow-[0_0_30px_oklch(0.62_0.2_255/0.6)] hover:scale-[1.02] transition-all duration-300", children: [
            c.get("hero", "cta_primary", "Apply for Admission"),
            " ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
          ] }),
          /* @__PURE__ */ jsx(Link, { to: "/about", className: "inline-flex items-center gap-2 px-6 py-3 rounded-md bg-white/10 border-2 border-white text-white font-semibold hover:bg-[oklch(0.62_0.2_255)] hover:border-[oklch(0.62_0.2_255)] hover:shadow-[0_0_25px_oklch(0.62_0.2_255/0.5)] hover:scale-[1.02] transition-all duration-300", children: c.get("hero", "cta_secondary", "Discover Our School") })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "relative mt-8 md:mt-12 z-10", children: /* @__PURE__ */ jsx("div", { className: "container-prose", children: /* @__PURE__ */ jsx(ScrollReveal, { animation: "fade-up", duration: 800, delay: 100, children: /* @__PURE__ */ jsx("div", { className: "glass rounded-2xl shadow-elegant grid grid-cols-2 md:grid-cols-4 divide-x divide-border", children: stats.map((s) => /* @__PURE__ */ jsxs("div", { className: "p-6 md:p-8 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "font-display text-3xl md:text-4xl font-bold text-primary", children: /* @__PURE__ */ jsx(AnimatedCounter, { value: s.value }) }),
      /* @__PURE__ */ jsx("div", { className: "mt-1 text-xs md:text-sm text-muted-foreground uppercase tracking-wider", children: s.label })
    ] }, s.label)) }) }) }) }),
    notices.length > 0 && /* @__PURE__ */ jsx("section", { className: "pt-20 pb-4 content-lazy-render", children: /* @__PURE__ */ jsx("div", { className: "container-prose", children: /* @__PURE__ */ jsxs(ScrollReveal, { animation: "fade-up", duration: 900, children: [
      /* @__PURE__ */ jsx(SectionHeading, { eyebrow: "Latest Notices", title: /* @__PURE__ */ jsxs(Fragment, { children: [
        "School ",
        /* @__PURE__ */ jsx("span", { className: "gold-underline", children: "Announcements" })
      ] }), description: "Important updates and announcements for students and parents." }),
      /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-4", children: notices.map((n) => /* @__PURE__ */ jsxs("div", { className: `group relative rounded-2xl border bg-card p-6 hover:shadow-elegant transition-all overflow-hidden ${n.important ? "border-destructive/40" : ""}`, children: [
        n.important && /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 px-3 py-1 bg-destructive text-destructive-foreground text-[10px] font-bold uppercase tracking-wider rounded-bl-xl", children: "Important" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: `h-11 w-11 rounded-xl grid place-items-center flex-shrink-0 ${n.important ? "bg-destructive/10 text-destructive" : "bg-gold/15 text-primary"}`, children: n.important ? /* @__PURE__ */ jsx(AlertCircle, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(Megaphone, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground mb-1", children: new Date(n.published_at).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric"
            }) }),
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-primary leading-snug", children: n.title }),
            n.body && /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground line-clamp-2", children: n.body })
          ] })
        ] })
      ] }, n.id)) })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-24 content-lazy-render", children: /* @__PURE__ */ jsx("div", { className: "container-prose", children: /* @__PURE__ */ jsxs(ScrollReveal, { animation: "fade-up", duration: 900, children: [
      /* @__PURE__ */ jsx(SectionHeading, { center: true, eyebrow: "Why Choose Us", title: /* @__PURE__ */ jsxs(Fragment, { children: [
        "An Environment Where ",
        /* @__PURE__ */ jsx("span", { className: "gold-underline", children: "Students Flourish" })
      ] }), description: "From foundational years to college preparation, every detail of our campus is designed for academic, moral and personal growth." }),
      /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6", children: features.map((f) => /* @__PURE__ */ jsxs("div", { className: "group rounded-2xl border bg-card p-8 hover:shadow-elegant hover:-translate-y-1 transition-all", children: [
        /* @__PURE__ */ jsx("div", { className: "h-12 w-12 rounded-xl bg-primary/5 text-primary grid place-items-center group-hover:bg-gold group-hover:text-gold-foreground transition-colors", children: /* @__PURE__ */ jsx(f.icon, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsx("h3", { className: "mt-5 text-lg font-semibold text-primary", children: f.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground leading-relaxed", children: f.desc })
      ] }, f.title)) })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-24 bg-secondary content-lazy-render", children: /* @__PURE__ */ jsxs("div", { className: "container-prose grid lg:grid-cols-2 gap-12 items-center overflow-hidden", children: [
      /* @__PURE__ */ jsx(ScrollReveal, { animation: "slide-left", duration: 900, className: "w-full", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute -inset-4 bg-gold/20 rounded-3xl -rotate-2" }),
        /* @__PURE__ */ jsx("img", { src: principalPhoto, alt: "Principal of Galaxy Public School & College", className: "relative rounded-3xl shadow-elegant w-full object-cover", width: 1024, height: 1280, loading: "lazy" })
      ] }) }),
      /* @__PURE__ */ jsx(ScrollReveal, { animation: "slide-right", duration: 900, className: "w-full", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "text-xs font-semibold uppercase tracking-[0.25em] text-gold mb-3", children: "A Message from the Principal" }),
        /* @__PURE__ */ jsx("h2", { className: "font-display text-3xl md:text-4xl font-bold text-primary", children: c.get("welcome", "title", "Education is the most powerful gift we can offer the next generation.") }),
        /* @__PURE__ */ jsx(Quote, { className: "h-8 w-8 text-gold mt-6" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-muted-foreground leading-relaxed", children: c.get("welcome", "body", "At Galaxy Public School & College Umerkot, we believe each child carries a unique spark.") }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
          /* @__PURE__ */ jsx("div", { className: "font-semibold text-primary", children: "Principal" }),
          /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: "Galaxy Public School & College Umerkot" })
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-24 content-lazy-render", children: /* @__PURE__ */ jsx("div", { className: "container-prose", children: /* @__PURE__ */ jsxs(ScrollReveal, { animation: "fade-up", duration: 950, children: [
      /* @__PURE__ */ jsx(SectionHeading, { eyebrow: "Our Campus", title: /* @__PURE__ */ jsxs(Fragment, { children: [
        "A Place Built for ",
        /* @__PURE__ */ jsx("span", { className: "gold-underline", children: "Learning" })
      ] }), description: "Smart classrooms, science and computer labs, a well-stocked library and dedicated sports facilities." }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-4", children: [{
        src: cardClassroom,
        label: "Smart Classrooms"
      }, {
        src: cardLab,
        label: "Computer & Science Labs"
      }, {
        src: cardLibrary,
        label: "Library"
      }, {
        src: cardSports,
        label: "Sports Ground"
      }, {
        src: heroImage,
        label: "Main Campus"
      }, {
        src: cardPrincipal,
        label: "Leadership"
      }].slice(0, 6).map((g, i) => /* @__PURE__ */ jsxs("div", { className: "group relative overflow-hidden rounded-2xl aspect-[4/3]", children: [
        /* @__PURE__ */ jsx("img", { src: g.src, alt: g.label, className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110", loading: "lazy" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#060612]/90 to-transparent opacity-90" }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-4 left-4 right-4 text-white font-semibold", children: g.label })
      ] }, i)) }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 text-center", children: /* @__PURE__ */ jsxs(Link, { to: "/gallery", className: "inline-flex items-center gap-2 text-primary font-semibold hover:text-gold", children: [
        "View Full Gallery ",
        /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 content-lazy-render", children: /* @__PURE__ */ jsx("div", { className: "container-prose", children: /* @__PURE__ */ jsx(ScrollReveal, { animation: "scale-in", duration: 850, children: /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-3xl bg-[#0D0D1A] border border-white/10 text-white p-10 md:p-16 shadow-elegant", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" }),
      /* @__PURE__ */ jsx("div", { className: "absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[oklch(0.62_0.2_255/0.2)] blur-3xl" }),
      /* @__PURE__ */ jsxs("div", { className: "relative grid md:grid-cols-2 gap-8 items-center", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "text-xs font-semibold uppercase tracking-[0.3em] text-white/80 mb-3", children: "Admissions Open" }),
          /* @__PURE__ */ jsx("h3", { className: "font-display text-3xl md:text-4xl font-bold", children: "Join a community that believes in your child's future." }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 text-white/80", children: "Applications for the new academic session are now open. Reserve your child's seat today." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex md:justify-end gap-3 flex-wrap", children: [
          /* @__PURE__ */ jsx(Link, { to: "/admissions", className: "px-6 py-3 rounded-md bg-[oklch(0.62_0.2_255)] text-white font-semibold shadow-[0_0_20px_oklch(0.62_0.2_255/0.3)] hover:shadow-[0_0_30px_oklch(0.62_0.2_255/0.6)] hover:scale-[1.02] transition-all duration-300", children: "Start Application" }),
          /* @__PURE__ */ jsx(Link, { to: "/contact", className: "px-6 py-3 rounded-md bg-white/10 border-2 border-white text-white font-semibold hover:bg-[oklch(0.62_0.2_255)] hover:border-[oklch(0.62_0.2_255)] hover:shadow-[0_0_25px_oklch(0.62_0.2_255/0.5)] hover:scale-[1.02] transition-all duration-300", children: "Talk to Us" })
        ] })
      ] })
    ] }) }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-24 bg-secondary content-lazy-render", children: /* @__PURE__ */ jsx("div", { className: "container-prose", children: /* @__PURE__ */ jsxs(ScrollReveal, { animation: "fade-up", duration: 900, children: [
      /* @__PURE__ */ jsx(SectionHeading, { center: true, eyebrow: "Parents Speak", title: "Trusted by Families Across Umerkot" }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-6", children: [{
        q: "The teachers genuinely care about every child. My daughter's confidence has grown beyond measure.",
        n: "Aisha R.",
        r: "Parent, Grade 5"
      }, {
        q: "A perfect balance of modern education and Islamic values. Highly recommended for any family in Umerkot.",
        n: "Imran K.",
        r: "Parent, Grade 8"
      }, {
        q: "Smart classrooms and excellent results. Best decision we made for our son's future.",
        n: "Sana M.",
        r: "Parent, Grade 10"
      }].map((t, i) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-card border p-8 hover:shadow-elegant transition", children: [
        /* @__PURE__ */ jsx(Quote, { className: "h-6 w-6 text-gold" }),
        /* @__PURE__ */ jsxs("p", { className: "mt-4 text-foreground leading-relaxed", children: [
          '"',
          t.q,
          '"'
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 pt-6 border-t", children: [
          /* @__PURE__ */ jsx("div", { className: "font-semibold text-primary", children: t.n }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: t.r })
        ] })
      ] }, i)) })
    ] }) }) })
  ] });
}
export {
  Home as component
};
