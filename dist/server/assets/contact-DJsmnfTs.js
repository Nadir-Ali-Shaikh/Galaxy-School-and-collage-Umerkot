import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { P as PageHero } from "./Section-DSunpl44.js";
import { MapPin, Phone, Mail, Clock, Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { h as heroImg } from "./router-u_y3GPsN.js";
import { u as useSiteContent } from "./use-site-content-CQfIhHeJ.js";
import { s as supabase } from "./client-B4EfndxM.js";
import { toast } from "sonner";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "zod";
import "@supabase/supabase-js";
import "@libsql/client/web";
function Contact() {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const sc = useSiteContent("contact");
  const heroImage = sc.get("hero", "image_url") || heroImg;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const full_name = formData.get("name");
    const phone = formData.get("phone");
    const email = formData.get("email") || null;
    const subject = formData.get("subject");
    const message = formData.get("message");
    try {
      const {
        error
      } = await supabase.from("contact_inquiries").insert({
        full_name,
        phone,
        email,
        subject,
        message,
        status: "new"
      });
      if (error) {
        toast.error(error.message);
        console.error("Supabase insert error:", error);
      } else {
        toast.success("Message sent successfully!");
        setDone(true);
      }
    } catch (err) {
      toast.error("Failed to send message. Please try again.");
      console.error("Submission error:", err);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PageHero, { eyebrow: "Contact", title: sc.get("hero", "title", "We'd love to hear from you."), description: sc.get("hero", "subtitle", "Whether you're a parent, prospective student or community partner — reach out and we'll respond within one working day."), image: heroImage }),
    /* @__PURE__ */ jsx("section", { className: "py-20", children: /* @__PURE__ */ jsxs("div", { className: "container-prose grid lg:grid-cols-5 gap-10", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-2 space-y-6", children: [{
        icon: MapPin,
        title: "Address",
        body: sc.get("info", "address", "Main Campus, Umerkot, Sindh, Pakistan")
      }, {
        icon: Phone,
        title: "Phone",
        body: sc.get("info", "phone", "+92 342 3299800")
      }, {
        icon: Mail,
        title: "Email",
        body: sc.get("info", "email", "info@thegalaxyschool.edu.pk")
      }, {
        icon: Clock,
        title: "Office Hours",
        body: sc.get("info", "hours", "Mon – Sat, 8:00 AM – 3:00 PM")
      }].map((c) => /* @__PURE__ */ jsxs("div", { className: "flex gap-4 rounded-2xl border bg-card p-5", children: [
        /* @__PURE__ */ jsx("div", { className: "h-11 w-11 rounded-xl bg-gold/15 text-gold-foreground grid place-items-center", children: /* @__PURE__ */ jsx(c.icon, { className: "h-5 w-5 text-primary" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "font-semibold text-primary", children: c.title }),
          /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground whitespace-pre-line", children: c.body })
        ] })
      ] }, c.title)) }),
      /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit, className: "lg:col-span-3 rounded-2xl bg-card border p-6 md:p-8 grid gap-4 animate-fade-in", children: done ? /* @__PURE__ */ jsxs("div", { className: "text-center py-10", children: [
        /* @__PURE__ */ jsx("div", { className: "h-14 w-14 mx-auto rounded-full bg-gold/20 grid place-items-center", children: /* @__PURE__ */ jsx(Check, { className: "h-7 w-7 text-gold" }) }),
        /* @__PURE__ */ jsx("h3", { className: "mt-4 font-display text-2xl font-bold text-primary", children: "Message sent" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-muted-foreground", children: "Thank you for reaching out. We'll get back to you shortly, Insha'Allah." })
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-primary", children: "Full Name *" }),
            /* @__PURE__ */ jsx("input", { name: "name", required: true, maxLength: 100, disabled: loading, className: "mt-1 w-full rounded-md border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 disabled:opacity-50 transition" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-primary", children: "Phone *" }),
            /* @__PURE__ */ jsx("input", { name: "phone", required: true, type: "tel", maxLength: 20, disabled: loading, className: "mt-1 w-full rounded-md border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 disabled:opacity-50 transition" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-primary", children: "Email" }),
          /* @__PURE__ */ jsx("input", { name: "email", type: "email", maxLength: 120, disabled: loading, className: "mt-1 w-full rounded-md border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 disabled:opacity-50 transition" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-primary", children: "Subject *" }),
          /* @__PURE__ */ jsx("input", { name: "subject", required: true, maxLength: 150, disabled: loading, className: "mt-1 w-full rounded-md border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 disabled:opacity-50 transition" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-primary", children: "Message *" }),
          /* @__PURE__ */ jsx("textarea", { name: "message", required: true, rows: 5, maxLength: 1e3, disabled: loading, className: "mt-1 w-full rounded-md border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 disabled:opacity-50 transition" })
        ] }),
        /* @__PURE__ */ jsx("button", { type: "submit", disabled: loading, className: "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary/90 disabled:opacity-50 transition cursor-pointer", children: loading ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }),
          " Sending..."
        ] }) : "Send Message" })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "pb-20", children: /* @__PURE__ */ jsxs("div", { className: "container-prose", children: [
      /* @__PURE__ */ jsx("div", { className: "rounded-2xl overflow-hidden border shadow-elegant aspect-[16/7]", children: /* @__PURE__ */ jsx("iframe", { title: "Galaxy Public School & College Umerkot — Location", src: "https://www.google.com/maps?q=The+Galaxy's+School+Umerkot&ll=25.3603936,69.7397664&z=18&output=embed", className: "w-full h-full border-0", loading: "lazy", referrerPolicy: "no-referrer-when-downgrade", allowFullScreen: true }) }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 text-center", children: /* @__PURE__ */ jsxs("a", { href: "https://www.google.com/maps/place/The+Galaxy's+School+Umerkot/@25.3603936,69.7397664,18z", target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-2 text-primary font-semibold hover:text-gold transition", children: [
        /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4" }),
        " Get Directions on Google Maps"
      ] }) })
    ] }) })
  ] });
}
export {
  Contact as component
};
