import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { P as PageHero } from "./Section-DSunpl44.js";
import { Loader2, Search, ArrowLeft, Printer } from "lucide-react";
import { useState } from "react";
import { h as heroImg } from "./router-u_y3GPsN.js";
import { u as useSiteContent } from "./use-site-content-CQfIhHeJ.js";
import { s as supabase } from "./client-B4EfndxM.js";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "zod";
import "@supabase/supabase-js";
import "@libsql/client/web";
const CLASSES = Array.from({
  length: 12
}, (_, i) => i + 1);
function Results() {
  const c = useSiteContent("results");
  const heroImage = c.get("hero", "image_url") || heroImg;
  const [classLevel, setClassLevel] = useState("");
  const [seat, setSeat] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const lookup = async (e) => {
    e.preventDefault();
    if (!classLevel || !seat.trim()) return;
    setLoading(true);
    setNotFound(false);
    setResult(null);
    const {
      data
    } = await supabase.from("student_results").select("*").eq("class_level", classLevel).ilike("seat_number", seat.trim()).maybeSingle();
    setLoading(false);
    if (!data) {
      setNotFound(true);
      return;
    }
    setResult(data);
  };
  const reset = () => {
    setResult(null);
    setNotFound(false);
    setSeat("");
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PageHero, { eyebrow: "Result Portal", title: "Check your result online.", description: "Select your class and enter your seat number to view your result.", image: heroImage }),
    /* @__PURE__ */ jsx("section", { className: "py-16 print:py-0", children: /* @__PURE__ */ jsx("div", { className: "container-prose max-w-3xl", children: !result ? /* @__PURE__ */ jsx("div", { className: "rounded-2xl border bg-card p-8 shadow-elegant", children: /* @__PURE__ */ jsxs("form", { onSubmit: lookup, className: "space-y-5", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-primary mb-2 block", children: "Select Your Class" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 sm:grid-cols-6 gap-2", children: CLASSES.map((c2) => /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setClassLevel(c2), className: `py-3 rounded-md border text-sm font-semibold transition ${classLevel === c2 ? "bg-primary text-primary-foreground border-primary" : "bg-background hover:bg-secondary"}`, children: [
          "Class ",
          c2
        ] }, c2)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-primary", children: "Seat Number" }),
        /* @__PURE__ */ jsx("input", { required: true, maxLength: 30, value: seat, onChange: (e) => setSeat(e.target.value), className: "mt-1 w-full rounded-md border bg-background px-3 py-2.5 text-sm", placeholder: "e.g. 2026-AS-0123" })
      ] }),
      /* @__PURE__ */ jsxs("button", { disabled: loading || !classLevel, className: "w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-md bg-[oklch(0.62_0.2_255)] text-white font-semibold shadow-[0_0_20px_oklch(0.62_0.2_255/0.3)] hover:shadow-[0_0_30px_oklch(0.62_0.2_255/0.6)] hover:scale-[1.01] transition-all duration-300 disabled:opacity-50 cursor-pointer", children: [
        loading ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(Search, { className: "h-4 w-4" }),
        "Check Result"
      ] }),
      notFound && /* @__PURE__ */ jsxs("div", { className: "rounded-md bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm", children: [
        "No result found for Class ",
        classLevel,
        ', seat number "',
        seat,
        '". Please verify and try again.'
      ] })
    ] }) }) : /* @__PURE__ */ jsx(ResultCard, { result, onBack: reset }) }) })
  ] });
}
function ResultCard({
  result,
  onBack
}) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4 print:hidden", children: [
      /* @__PURE__ */ jsxs("button", { onClick: onBack, className: "inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Check another"
      ] }),
      /* @__PURE__ */ jsxs("button", { onClick: () => window.print(), className: "inline-flex items-center gap-2 rounded-md bg-[oklch(0.62_0.2_255)] text-white hover:shadow-[0_0_15px_oklch(0.62_0.2_255/0.4)] transition-all px-4 py-2 text-sm font-semibold", children: [
        /* @__PURE__ */ jsx(Printer, { className: "h-4 w-4" }),
        " Print"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border bg-card overflow-hidden shadow-elegant", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-[#0D0D1A] border-b border-white/10 text-white p-6 text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "text-xs tracking-[0.2em] text-white/60 uppercase", children: "Galaxy Public School & College Umerkot" }),
        /* @__PURE__ */ jsxs("h2", { className: "font-display text-2xl font-bold mt-1", children: [
          result.exam_name,
          " ",
          result.session ? `— ${result.session}` : ""
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-sm opacity-80 mt-1", children: [
          "Class ",
          result.class_level,
          " Result Card"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-6 grid sm:grid-cols-2 gap-4 border-b", children: [
        /* @__PURE__ */ jsx(Info, { label: "Student Name", value: result.student_name }),
        result.father_name && /* @__PURE__ */ jsx(Info, { label: "Father's Name", value: result.father_name }),
        /* @__PURE__ */ jsx(Info, { label: "Class", value: `Class ${result.class_level}` }),
        /* @__PURE__ */ jsx(Info, { label: "Seat Number", value: result.seat_number })
      ] }),
      result.subjects && result.subjects.length > 0 && /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-primary mb-3", children: "Subjects" }),
        /* @__PURE__ */ jsxs("table", { className: "w-full text-sm border", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-secondary text-primary", children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { className: "text-left px-3 py-2", children: "Subject" }),
            /* @__PURE__ */ jsx("th", { className: "text-right px-3 py-2", children: "Total" }),
            /* @__PURE__ */ jsx("th", { className: "text-right px-3 py-2", children: "Obtained" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: result.subjects.map((s, i) => /* @__PURE__ */ jsxs("tr", { className: "border-t", children: [
            /* @__PURE__ */ jsx("td", { className: "px-3 py-2", children: s.name }),
            /* @__PURE__ */ jsx("td", { className: "px-3 py-2 text-right", children: s.total }),
            /* @__PURE__ */ jsx("td", { className: "px-3 py-2 text-right font-medium", children: s.obtained })
          ] }, i)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-6 bg-secondary grid sm:grid-cols-4 gap-4 text-center", children: [
        /* @__PURE__ */ jsx(Stat, { label: "Total Marks", value: String(result.total_marks) }),
        /* @__PURE__ */ jsx(Stat, { label: "Obtained", value: String(result.obtained_marks) }),
        /* @__PURE__ */ jsx(Stat, { label: "Percentage", value: `${result.percentage ?? 0}%` }),
        /* @__PURE__ */ jsx(Stat, { label: "Grade", value: result.grade ?? "-", highlight: true })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-6 border-t flex items-center justify-between flex-wrap gap-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "Status" }),
          /* @__PURE__ */ jsx("span", { className: `mt-1 inline-block rounded px-3 py-1 text-sm font-bold ${result.status === "pass" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`, children: result.status.toUpperCase() })
        ] }),
        result.remarks && /* @__PURE__ */ jsxs("div", { className: "text-sm text-muted-foreground max-w-md text-right", children: [
          /* @__PURE__ */ jsx("div", { className: "text-xs", children: "Remarks" }),
          /* @__PURE__ */ jsx("div", { className: "text-primary", children: result.remarks })
        ] })
      ] })
    ] })
  ] });
}
function Info({
  label,
  value
}) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: label }),
    /* @__PURE__ */ jsx("div", { className: "font-medium text-primary", children: value })
  ] });
}
function Stat({
  label,
  value,
  highlight
}) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: label }),
    /* @__PURE__ */ jsx("div", { className: `font-display text-2xl font-bold ${highlight ? "text-gold" : "text-primary"}`, children: value })
  ] });
}
export {
  Results as component
};
