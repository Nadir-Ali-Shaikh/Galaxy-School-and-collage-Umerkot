import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { P as PageHero, S as SectionHeading } from "./Section-DSunpl44.js";
import { FileText, CalendarCheck, UserCheck, Check, Download, Loader2 } from "lucide-react";
import { h as heroImg } from "./router-u_y3GPsN.js";
import { u as useSiteContent } from "./use-site-content-CQfIhHeJ.js";
import { s as supabase } from "./client-B4EfndxM.js";
import { toast } from "sonner";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "zod";
import "@supabase/supabase-js";
import "@libsql/client/web";
const steps = [{
  icon: FileText,
  title: "Fill the Form",
  desc: "Complete the online inquiry form below."
}, {
  icon: CalendarCheck,
  title: "Schedule a Visit",
  desc: "Our team will contact you to arrange a campus tour."
}, {
  icon: UserCheck,
  title: "Assessment",
  desc: "Light assessment & parent meeting."
}, {
  icon: Check,
  title: "Welcome Aboard",
  desc: "Receive offer letter and complete enrolment."
}];
function Admissions() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const c = useSiteContent("admissions");
  const heroImage = c.get("hero", "image_url") || heroImg;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const parent_name = formData.get("parent");
    const phone = formData.get("phone");
    const email = formData.get("email") || null;
    const student_name = formData.get("student");
    const class_applying = formData.get("class");
    const message = formData.get("message") || null;
    try {
      const {
        error
      } = await supabase.from("admission_applications").insert({
        parent_name,
        phone,
        email,
        student_name,
        class_applying,
        message,
        status: "new"
      });
      if (error) {
        toast.error(error.message);
        console.error("Supabase insert error:", error);
      } else {
        toast.success("Application submitted successfully!");
        setSubmitted(true);
      }
    } catch (err) {
      toast.error("Failed to submit inquiry. Please try again.");
      console.error("Submission error:", err);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PageHero, { eyebrow: "Admissions Open", title: "Begin your child's journey with us.", description: "A simple, transparent admissions process designed for busy parents — start online and we'll guide you the rest of the way.", image: heroImage }),
    /* @__PURE__ */ jsx("section", { className: "py-20", children: /* @__PURE__ */ jsxs("div", { className: "container-prose", children: [
      /* @__PURE__ */ jsx(SectionHeading, { center: true, eyebrow: "How it Works", title: "Four simple steps" }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-4 gap-6", children: steps.map((s, i) => /* @__PURE__ */ jsxs("div", { className: "relative rounded-2xl border bg-card p-6 text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute -top-4 left-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-gold text-gold-foreground grid place-items-center text-sm font-bold", children: i + 1 }),
        /* @__PURE__ */ jsx(s.icon, { className: "h-7 w-7 mx-auto mt-3 text-primary" }),
        /* @__PURE__ */ jsx("h3", { className: "mt-3 font-semibold text-primary", children: s.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: s.desc })
      ] }, s.title)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-secondary", children: /* @__PURE__ */ jsxs("div", { className: "container-prose grid lg:grid-cols-5 gap-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsx("div", { className: "text-xs font-semibold uppercase tracking-[0.25em] text-gold mb-3", children: "Inquiry Form" }),
        /* @__PURE__ */ jsx("h2", { className: "font-display text-3xl md:text-4xl font-bold text-primary", children: "Tell us about your child." }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-muted-foreground", children: "Fill the form — our admissions office will reach out within one working day. You can also call us directly at +92 342 3299800." }),
        /* @__PURE__ */ jsxs("a", { href: "#", className: "mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-md border border-primary/20 bg-card text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition", children: [
          /* @__PURE__ */ jsx(Download, { className: "h-4 w-4" }),
          " Download Prospectus (PDF)"
        ] })
      ] }),
      /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit, className: "lg:col-span-3 rounded-2xl bg-card border p-6 md:p-8 grid gap-4 animate-fade-in", children: submitted ? /* @__PURE__ */ jsxs("div", { className: "text-center py-10", children: [
        /* @__PURE__ */ jsx("div", { className: "h-14 w-14 mx-auto rounded-full bg-gold/20 grid place-items-center", children: /* @__PURE__ */ jsx(Check, { className: "h-7 w-7 text-gold" }) }),
        /* @__PURE__ */ jsx("h3", { className: "mt-4 font-display text-2xl font-bold text-primary", children: "Thank you!" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-muted-foreground", children: "Your inquiry has been received. Our admissions team will contact you shortly, Insha'Allah." })
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsx(Field, { label: "Parent / Guardian Name", name: "parent", required: true, disabled: loading }),
          /* @__PURE__ */ jsx(Field, { label: "Mobile Number", name: "phone", type: "tel", required: true, disabled: loading })
        ] }),
        /* @__PURE__ */ jsx(Field, { label: "Email Address", name: "email", type: "email", disabled: loading }),
        /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsx(Field, { label: "Student Name", name: "student", required: true, disabled: loading }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-primary", children: "Class Applying For" }),
            /* @__PURE__ */ jsxs("select", { required: true, disabled: loading, className: "mt-1 w-full rounded-md border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 disabled:opacity-50", name: "class", children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Select…" }),
              /* @__PURE__ */ jsx("option", { children: "Montessori" }),
              /* @__PURE__ */ jsx("option", { children: "Primary (1–5)" }),
              /* @__PURE__ */ jsx("option", { children: "Secondary (6–10)" }),
              /* @__PURE__ */ jsx("option", { children: "College (XI–XII)" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-primary", children: "Message (optional)" }),
          /* @__PURE__ */ jsx("textarea", { rows: 4, name: "message", maxLength: 500, disabled: loading, className: "mt-1 w-full rounded-md border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 disabled:opacity-50", placeholder: "Anything you'd like us to know" })
        ] }),
        /* @__PURE__ */ jsx("button", { type: "submit", disabled: loading, className: "mt-2 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary/90 disabled:opacity-50 transition cursor-pointer", children: loading ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }),
          " Submitting..."
        ] }) : "Submit Inquiry" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "By submitting you agree to be contacted by Galaxy Public School & College admissions office." })
      ] }) })
    ] }) })
  ] });
}
function Field({
  label,
  name,
  type = "text",
  required,
  disabled
}) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("label", { className: "text-sm font-medium text-primary", children: [
      label,
      required && /* @__PURE__ */ jsx("span", { className: "text-destructive", children: " *" })
    ] }),
    /* @__PURE__ */ jsx("input", { name, type, required, disabled, maxLength: 150, className: "mt-1 w-full rounded-md border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 disabled:opacity-50 transition" })
  ] });
}
export {
  Admissions as component
};
