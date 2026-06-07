import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Loader2, User, Quote, Award, GraduationCap, BookOpen } from "lucide-react";
import { s as supabase } from "./client-B4EfndxM.js";
import { P as PageHero, S as SectionHeading } from "./Section-DSunpl44.js";
import { S as ScrollReveal } from "./ScrollReveal-CVX44pax.js";
import { c as classroomImg } from "./router-u_y3GPsN.js";
import { p as principalImg } from "./principal-BG4gMyFt.js";
import "@supabase/supabase-js";
import "@libsql/client/web";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "zod";
const DEFAULT_TEACHERS = [{
  id: "default-1",
  name: "Dr. Muhammad Galaxy",
  title: "Principal & Founder",
  subject: "Education Leadership",
  bio: "Dr. Galaxy has over 20 years of experience in leading educational institutions. He holds a Ph.D. in Education Management and is passionate about building a learning ecosystem that merges modern academic tools with moral values.",
  photo_url: principalImg,
  sort_order: 1
}, {
  id: "default-2",
  name: "Mrs. Aisha Rehman",
  title: "Vice Principal",
  subject: "English Language & Literature",
  bio: "Mrs. Aisha holds an M.A. in English Literature. She is dedicated to training students in communicative English and soft skills, helping them express themselves with high confidence.",
  photo_url: null,
  sort_order: 2
}, {
  id: "default-3",
  name: "Mr. Imran Khan",
  title: "Head of Science Department",
  subject: "Physics",
  bio: "Mr. Imran has taught physics for 12 years. He uses smart classroom tools and experimental lab demonstrations to make complex scientific concepts intuitive and exciting.",
  photo_url: null,
  sort_order: 3
}, {
  id: "default-4",
  name: "Ms. Sana Malik",
  title: "Senior Instructor",
  subject: "Computer Science",
  bio: "Ms. Sana holds a Master's degree in Computer Science. She guides students through programming, smart tech usage, and prepares them for the future digital economy.",
  photo_url: null,
  sort_order: 4
}, {
  id: "default-5",
  name: "Mr. Ahmed Shah",
  title: "Mathematics Faculty",
  subject: "Mathematics",
  bio: "Mr. Ahmed holds an M.Sc. in Mathematics. He designs conceptual worksheets and mental math challenges that build strong analytical thinking and quantitative skills.",
  photo_url: null,
  sort_order: 5
}, {
  id: "default-6",
  name: "Ms. Fatima Ali",
  title: "Montessori Directress",
  subject: "Early Childhood Development",
  bio: "Ms. Fatima is a certified Montessori practitioner. She creates a warm, sensory-rich playing-to-learn environment that builds curiosity and fine motor skills.",
  photo_url: null,
  sort_order: 6
}];
function TeachersPublic() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const {
          data,
          error
        } = await supabase.from("teachers").select("*").order("sort_order").order("name");
        if (error) throw error;
        if (data && data.length > 0) {
          setTeachers(data);
        } else {
          setTeachers(DEFAULT_TEACHERS);
        }
      } catch (err) {
        console.error("Failed to load teachers from Supabase, utilizing premium defaults:", err);
        setTeachers(DEFAULT_TEACHERS);
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);
  const leadership = teachers.filter((t) => {
    const title = t.title?.toLowerCase() || "";
    const isLead = title.includes("principal") || title.includes("founder") || title.includes("headmaster");
    const isAuxiliary = title.includes("vice") || title.includes("assistant") || title.includes("jr") || title.includes("junior");
    return isLead && !isAuxiliary;
  });
  const faculty = teachers.filter((t) => !leadership.some((lead) => lead.id === t.id));
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PageHero, { eyebrow: "Our Faculty", title: "Meet Our Distinguished Educators", description: "A team of passionate, highly qualified teachers and visionary leaders dedicated to academic excellence, moral grounding, and character building.", image: classroomImg }),
    loading ? /* @__PURE__ */ jsxs("div", { className: "py-24 text-center", children: [
      /* @__PURE__ */ jsx(Loader2, { className: "h-8 w-8 animate-spin text-primary mx-auto" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-muted-foreground text-sm", children: "Loading faculty profiles..." })
    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      leadership.length > 0 && /* @__PURE__ */ jsx("section", { className: "py-24 bg-secondary/30 overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "container-prose", children: [
        /* @__PURE__ */ jsx(SectionHeading, { center: true, eyebrow: "School Leadership", title: /* @__PURE__ */ jsxs(Fragment, { children: [
          "Visionary ",
          /* @__PURE__ */ jsx("span", { className: "gold-underline", children: "Guidance" })
        ] }), description: "Leading our school with high standards of academic distinction and deep-rooted ethical values." }),
        /* @__PURE__ */ jsx("div", { className: "space-y-12", children: leadership.map((l, i) => /* @__PURE__ */ jsxs("div", { className: "glass rounded-3xl p-8 md:p-12 border shadow-elegant grid md:grid-cols-[300px_1fr] gap-10 items-center max-w-5xl mx-auto", children: [
          /* @__PURE__ */ jsx(ScrollReveal, { animation: i % 2 === 0 ? "slide-left" : "slide-right", duration: 900, className: "w-full flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute -inset-2 bg-gold rounded-2xl rotate-3 opacity-30 group-hover:rotate-1 transition-transform duration-500" }),
            /* @__PURE__ */ jsx("div", { className: "relative h-72 w-56 rounded-2xl overflow-hidden shadow-md", children: l.photo_url ? /* @__PURE__ */ jsx("img", { src: l.photo_url, alt: l.name, className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-110", loading: "lazy" }) : /* @__PURE__ */ jsx("div", { className: "h-full w-full bg-primary/10 flex flex-col items-center justify-center text-primary/30", children: /* @__PURE__ */ jsx(User, { className: "h-16 w-16" }) }) })
          ] }) }),
          /* @__PURE__ */ jsx(ScrollReveal, { animation: i % 2 === 0 ? "slide-right" : "slide-left", duration: 900, className: "w-full", children: /* @__PURE__ */ jsxs("div", { className: "text-left", children: [
            /* @__PURE__ */ jsx(Quote, { className: "h-10 w-10 text-gold mb-4 opacity-50" }),
            /* @__PURE__ */ jsx("h3", { className: "font-display text-2xl md:text-3xl font-bold text-primary", children: l.name }),
            /* @__PURE__ */ jsxs("div", { className: "text-sm font-semibold text-gold uppercase tracking-wider mt-1", children: [
              l.title,
              " ",
              l.subject && `• ${l.subject}`
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "mt-4 text-muted-foreground leading-relaxed italic text-base md:text-lg", children: [
              '"',
              l.bio || "Leading the generation towards a luminous future of education and character development.",
              '"'
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-6 flex gap-4 text-xs font-semibold text-primary uppercase tracking-wider", children: [
              /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsx(Award, { className: "h-4 w-4 text-gold" }),
                " Experienced Leadership"
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsx(GraduationCap, { className: "h-4 w-4 text-gold" }),
                " Distinguished Academician"
              ] })
            ] })
          ] }) })
        ] }, l.id)) })
      ] }) }),
      faculty.length > 0 && /* @__PURE__ */ jsx("section", { className: "py-24 content-lazy-render", children: /* @__PURE__ */ jsxs("div", { className: "container-prose", children: [
        /* @__PURE__ */ jsx(SectionHeading, { center: true, eyebrow: "Our Educators", title: /* @__PURE__ */ jsxs(Fragment, { children: [
          "Our Experienced ",
          /* @__PURE__ */ jsx("span", { className: "gold-underline", children: "Teachers" })
        ] }), description: "Meet our highly qualified subject specialists who guide, nurture, and prepare students for outstanding accomplishments." }),
        /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-8", children: faculty.map((f, i) => /* @__PURE__ */ jsx(ScrollReveal, { animation: "fade-up", duration: 800, delay: i % 3 * 100, children: /* @__PURE__ */ jsxs("div", { className: "group rounded-2xl border bg-card p-6 shadow-sm hover:shadow-elegant hover:-translate-y-2 transition-all duration-300 flex flex-col h-full", children: [
          /* @__PURE__ */ jsxs("div", { className: "aspect-[4/3] w-full rounded-xl overflow-hidden relative bg-secondary mb-5", children: [
            f.photo_url ? /* @__PURE__ */ jsx("img", { src: f.photo_url, alt: f.name, className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105", loading: "lazy" }) : /* @__PURE__ */ jsx("div", { className: "h-full w-full bg-primary/5 flex items-center justify-center text-primary/20", children: /* @__PURE__ */ jsx(User, { className: "h-16 w-16" }) }),
            /* @__PURE__ */ jsxs("div", { className: "absolute bottom-3 left-3 px-3 py-1 rounded-md bg-primary text-primary-foreground text-xs font-semibold flex items-center gap-1 shadow-sm", children: [
              /* @__PURE__ */ jsx(BookOpen, { className: "h-3 w-3 text-gold" }),
              f.subject || "General Faculty"
            ] })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-primary group-hover:text-gold transition-colors duration-300", children: f.name }),
          /* @__PURE__ */ jsx("div", { className: "text-xs font-semibold text-muted-foreground mt-1 uppercase tracking-wider", children: f.title || "Subject Teacher" }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-muted-foreground leading-relaxed flex-1 border-t pt-3 line-clamp-3", children: f.bio || "Dedicated educator focused on dynamic classroom interaction and robust character building." })
        ] }) }, f.id)) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-20 bg-[#0D0D1A] border-t border-b border-white/10 text-white content-lazy-render", children: /* @__PURE__ */ jsx("div", { className: "container-prose text-center", children: /* @__PURE__ */ jsx(ScrollReveal, { animation: "scale-in", duration: 850, children: /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto", children: [
        /* @__PURE__ */ jsx(GraduationCap, { className: "h-12 w-12 text-white/80 mx-auto mb-4" }),
        /* @__PURE__ */ jsx("h3", { className: "font-display text-3xl font-bold", children: "Have Questions for Our Faculty?" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-white/80 text-sm md:text-base leading-relaxed", children: "Our team of counselors and teachers are always happy to discuss your child's academic pathways, custom requirements, and our teaching methodologies." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 flex justify-center gap-4", children: [
          /* @__PURE__ */ jsx("a", { href: "/contact", className: "px-6 py-3 rounded-lg bg-gold text-gold-foreground font-semibold shadow-gold hover:brightness-105 transition", children: "Get In Touch" }),
          /* @__PURE__ */ jsx("a", { href: "/admissions", className: "px-6 py-3 rounded-lg border border-white/20 hover:bg-white/10 transition text-sm font-medium", children: "Admission Info" })
        ] })
      ] }) }) }) })
    ] })
  ] });
}
export {
  TeachersPublic as component
};
