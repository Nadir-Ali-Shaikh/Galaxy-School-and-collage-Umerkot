import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { s as supabase } from "./client-B4EfndxM.js";
import { Plus, GraduationCap, Search, Loader2, Pencil, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import "@supabase/supabase-js";
import "@libsql/client/web";
const CLASSES = Array.from({
  length: 12
}, (_, i) => i + 1);
const empty = () => ({
  class_level: 1,
  seat_number: "",
  student_name: "",
  father_name: "",
  exam_name: "Annual Exam",
  session: "2025-26",
  total_marks: 0,
  obtained_marks: 0,
  grade: "",
  status: "pass",
  remarks: "",
  subjects: []
});
function calcGrade(p) {
  if (p >= 90) return "A+";
  if (p >= 80) return "A";
  if (p >= 70) return "B";
  if (p >= 60) return "C";
  if (p >= 50) return "D";
  if (p >= 40) return "E";
  return "F";
}
function AdminResults() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [classFilter, setClassFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const load = async () => {
    setLoading(true);
    const {
      data,
      error
    } = await supabase.from("student_results").select("*").order("class_level", {
      ascending: true
    }).order("seat_number", {
      ascending: true
    });
    if (error) toast.error(error.message);
    setRows(data ?? []);
    setLoading(false);
  };
  useEffect(() => {
    load();
  }, []);
  const filtered = rows.filter((r) => {
    if (classFilter !== "all" && r.class_level !== classFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return r.seat_number.toLowerCase().includes(q) || r.student_name.toLowerCase().includes(q) || (r.father_name?.toLowerCase() ?? "").includes(q);
    }
    return true;
  });
  const byClass = CLASSES.map((c) => ({
    c,
    count: rows.filter((r) => r.class_level === c).length
  }));
  const save = async () => {
    if (!editing) return;
    if (!editing.seat_number || !editing.student_name || !editing.class_level) {
      toast.error("Class, seat number and student name are required");
      return;
    }
    setSaving(true);
    const subjects = editing.subjects ?? [];
    const total_marks = subjects.length ? subjects.reduce((s, x) => s + (Number(x.total) || 0), 0) : Number(editing.total_marks) || 0;
    const obtained_marks = subjects.length ? subjects.reduce((s, x) => s + (Number(x.obtained) || 0), 0) : Number(editing.obtained_marks) || 0;
    const percentage = total_marks > 0 ? Number((obtained_marks / total_marks * 100).toFixed(2)) : 0;
    const grade = editing.grade || calcGrade(percentage);
    const status = editing.status || (percentage >= 40 ? "pass" : "fail");
    const payload = {
      class_level: Number(editing.class_level),
      seat_number: editing.seat_number.trim(),
      student_name: editing.student_name.trim(),
      father_name: editing.father_name?.trim() || null,
      exam_name: editing.exam_name || "Annual Exam",
      session: editing.session?.trim() || null,
      total_marks,
      obtained_marks,
      percentage,
      grade,
      status,
      remarks: editing.remarks?.trim() || null,
      subjects
    };
    const {
      error
    } = editing.id ? await supabase.from("student_results").update(payload).eq("id", editing.id) : await supabase.from("student_results").insert(payload);
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(editing.id ? "Result updated" : "Result added");
    setEditing(null);
    load();
  };
  const del = async (id) => {
    if (!confirm("Delete this result?")) return;
    const {
      error
    } = await supabase.from("student_results").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Result deleted");
    load();
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "font-display text-2xl font-bold text-primary", children: "Student Results" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Manage results class-wise (Class 1 to 12)." })
      ] }),
      /* @__PURE__ */ jsxs("button", { onClick: () => setEditing(empty()), className: "inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:bg-primary/90", children: [
        /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
        " Add Result"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
      /* @__PURE__ */ jsxs("button", { onClick: () => setClassFilter("all"), className: `rounded-full px-3 py-1.5 text-xs font-semibold border ${classFilter === "all" ? "bg-primary text-primary-foreground border-primary" : "bg-card hover:bg-secondary"}`, children: [
        "All (",
        rows.length,
        ")"
      ] }),
      byClass.map(({
        c,
        count
      }) => /* @__PURE__ */ jsxs("button", { onClick: () => setClassFilter(c), className: `rounded-full px-3 py-1.5 text-xs font-semibold border inline-flex items-center gap-1.5 ${classFilter === c ? "bg-primary text-primary-foreground border-primary" : "bg-card hover:bg-secondary"}`, children: [
        /* @__PURE__ */ jsx(GraduationCap, { className: "h-3 w-3" }),
        " Class ",
        c,
        /* @__PURE__ */ jsx("span", { className: `rounded-full px-1.5 ${classFilter === c ? "bg-white/20" : "bg-secondary"}`, children: count })
      ] }, c))
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative max-w-sm", children: [
      /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
      /* @__PURE__ */ jsx("input", { value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Search seat no, name…", className: "w-full pl-9 pr-3 py-2 rounded-md border bg-card text-sm" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "rounded-2xl border bg-card overflow-hidden", children: loading ? /* @__PURE__ */ jsx("div", { className: "p-10 grid place-items-center", children: /* @__PURE__ */ jsx(Loader2, { className: "h-6 w-6 animate-spin text-primary" }) }) : filtered.length === 0 ? /* @__PURE__ */ jsx("div", { className: "p-10 text-center text-sm text-muted-foreground", children: "No results found." }) : /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-secondary text-primary", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "text-left px-4 py-3", children: "Class" }),
        /* @__PURE__ */ jsx("th", { className: "text-left px-4 py-3", children: "Seat No." }),
        /* @__PURE__ */ jsx("th", { className: "text-left px-4 py-3", children: "Student" }),
        /* @__PURE__ */ jsx("th", { className: "text-left px-4 py-3", children: "Exam" }),
        /* @__PURE__ */ jsx("th", { className: "text-left px-4 py-3", children: "Marks" }),
        /* @__PURE__ */ jsx("th", { className: "text-left px-4 py-3", children: "%" }),
        /* @__PURE__ */ jsx("th", { className: "text-left px-4 py-3", children: "Grade" }),
        /* @__PURE__ */ jsx("th", { className: "text-left px-4 py-3", children: "Status" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: filtered.map((r) => /* @__PURE__ */ jsxs("tr", { className: "border-t hover:bg-secondary/50", children: [
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-semibold", children: r.class_level }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-mono text-xs", children: r.seat_number }),
        /* @__PURE__ */ jsxs("td", { className: "px-4 py-3", children: [
          /* @__PURE__ */ jsx("div", { className: "font-medium text-primary", children: r.student_name }),
          r.father_name && /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground", children: [
            "S/o ",
            r.father_name
          ] })
        ] }),
        /* @__PURE__ */ jsxs("td", { className: "px-4 py-3 text-xs", children: [
          r.exam_name,
          /* @__PURE__ */ jsx("div", { className: "text-muted-foreground", children: r.session })
        ] }),
        /* @__PURE__ */ jsxs("td", { className: "px-4 py-3", children: [
          r.obtained_marks,
          "/",
          r.total_marks
        ] }),
        /* @__PURE__ */ jsxs("td", { className: "px-4 py-3", children: [
          r.percentage ?? 0,
          "%"
        ] }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx("span", { className: "rounded bg-gold/20 text-gold px-2 py-0.5 text-xs font-bold", children: r.grade }) }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx("span", { className: `rounded px-2 py-0.5 text-xs font-semibold ${r.status === "pass" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`, children: r.status.toUpperCase() }) }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxs("div", { className: "inline-flex gap-1", children: [
          /* @__PURE__ */ jsx("button", { onClick: () => setEditing(r), className: "p-2 rounded hover:bg-secondary", children: /* @__PURE__ */ jsx(Pencil, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsx("button", { onClick: () => del(r.id), className: "p-2 rounded hover:bg-red-50 text-red-600", children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
        ] }) })
      ] }, r.id)) })
    ] }) }) }),
    editing && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 bg-black/50 grid place-items-center p-4 overflow-y-auto", children: /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-2xl w-full max-w-3xl shadow-xl my-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-5 border-b", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-display text-xl font-bold text-primary", children: editing.id ? "Edit Result" : "Add Result" }),
        /* @__PURE__ */ jsx("button", { onClick: () => setEditing(null), className: "p-2 rounded hover:bg-secondary", children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-5 space-y-4 max-h-[70vh] overflow-y-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsx(Field, { label: "Class *", children: /* @__PURE__ */ jsx("select", { value: editing.class_level, onChange: (e) => setEditing({
            ...editing,
            class_level: Number(e.target.value)
          }), className: "w-full rounded-md border bg-background px-3 py-2 text-sm", children: CLASSES.map((c) => /* @__PURE__ */ jsxs("option", { value: c, children: [
            "Class ",
            c
          ] }, c)) }) }),
          /* @__PURE__ */ jsx(Field, { label: "Seat Number *", children: /* @__PURE__ */ jsx("input", { value: editing.seat_number ?? "", onChange: (e) => setEditing({
            ...editing,
            seat_number: e.target.value
          }), className: "input" }) }),
          /* @__PURE__ */ jsx(Field, { label: "Student Name *", children: /* @__PURE__ */ jsx("input", { value: editing.student_name ?? "", onChange: (e) => setEditing({
            ...editing,
            student_name: e.target.value
          }), className: "input" }) }),
          /* @__PURE__ */ jsx(Field, { label: "Father Name", children: /* @__PURE__ */ jsx("input", { value: editing.father_name ?? "", onChange: (e) => setEditing({
            ...editing,
            father_name: e.target.value
          }), className: "input" }) }),
          /* @__PURE__ */ jsx(Field, { label: "Exam Name", children: /* @__PURE__ */ jsx("input", { value: editing.exam_name ?? "", onChange: (e) => setEditing({
            ...editing,
            exam_name: e.target.value
          }), className: "input" }) }),
          /* @__PURE__ */ jsx(Field, { label: "Session", children: /* @__PURE__ */ jsx("input", { value: editing.session ?? "", onChange: (e) => setEditing({
            ...editing,
            session: e.target.value
          }), placeholder: "e.g. 2025-26", className: "input" }) }),
          /* @__PURE__ */ jsx(Field, { label: "Status", children: /* @__PURE__ */ jsxs("select", { value: editing.status, onChange: (e) => setEditing({
            ...editing,
            status: e.target.value
          }), className: "input", children: [
            /* @__PURE__ */ jsx("option", { value: "pass", children: "Pass" }),
            /* @__PURE__ */ jsx("option", { value: "fail", children: "Fail" })
          ] }) }),
          /* @__PURE__ */ jsx(Field, { label: "Grade (auto if empty)", children: /* @__PURE__ */ jsx("input", { value: editing.grade ?? "", onChange: (e) => setEditing({
            ...editing,
            grade: e.target.value
          }), placeholder: "A+", className: "input" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-lg border p-4 space-y-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-primary text-sm", children: "Subjects" }),
            /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setEditing({
              ...editing,
              subjects: [...editing.subjects ?? [], {
                name: "",
                total: 100,
                obtained: 0
              }]
            }), className: "text-xs inline-flex items-center gap-1 rounded bg-primary text-primary-foreground px-2 py-1", children: [
              /* @__PURE__ */ jsx(Plus, { className: "h-3 w-3" }),
              " Subject"
            ] })
          ] }),
          (editing.subjects ?? []).length === 0 && /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "No subjects added. You can also set Total / Obtained manually below." }),
          (editing.subjects ?? []).map((s, i) => /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 gap-2 items-end", children: [
            /* @__PURE__ */ jsxs("div", { className: "col-span-6", children: [
              /* @__PURE__ */ jsx("label", { className: "text-xs text-muted-foreground", children: "Subject" }),
              /* @__PURE__ */ jsx("input", { value: s.name, onChange: (e) => {
                const subs = [...editing.subjects ?? []];
                subs[i] = {
                  ...subs[i],
                  name: e.target.value
                };
                setEditing({
                  ...editing,
                  subjects: subs
                });
              }, className: "input" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "col-span-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-xs text-muted-foreground", children: "Total" }),
              /* @__PURE__ */ jsx("input", { type: "number", value: s.total, onChange: (e) => {
                const subs = [...editing.subjects ?? []];
                subs[i] = {
                  ...subs[i],
                  total: Number(e.target.value)
                };
                setEditing({
                  ...editing,
                  subjects: subs
                });
              }, className: "input" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "col-span-3", children: [
              /* @__PURE__ */ jsx("label", { className: "text-xs text-muted-foreground", children: "Obtained" }),
              /* @__PURE__ */ jsx("input", { type: "number", value: s.obtained, onChange: (e) => {
                const subs = [...editing.subjects ?? []];
                subs[i] = {
                  ...subs[i],
                  obtained: Number(e.target.value)
                };
                setEditing({
                  ...editing,
                  subjects: subs
                });
              }, className: "input" })
            ] }),
            /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setEditing({
              ...editing,
              subjects: (editing.subjects ?? []).filter((_, j) => j !== i)
            }), className: "col-span-1 p-2 rounded hover:bg-red-50 text-red-600", children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
          ] }, i))
        ] }),
        (editing.subjects ?? []).length === 0 && /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsx(Field, { label: "Total Marks", children: /* @__PURE__ */ jsx("input", { type: "number", value: editing.total_marks ?? 0, onChange: (e) => setEditing({
            ...editing,
            total_marks: Number(e.target.value)
          }), className: "input" }) }),
          /* @__PURE__ */ jsx(Field, { label: "Obtained Marks", children: /* @__PURE__ */ jsx("input", { type: "number", value: editing.obtained_marks ?? 0, onChange: (e) => setEditing({
            ...editing,
            obtained_marks: Number(e.target.value)
          }), className: "input" }) })
        ] }),
        /* @__PURE__ */ jsx(Field, { label: "Remarks", children: /* @__PURE__ */ jsx("textarea", { value: editing.remarks ?? "", onChange: (e) => setEditing({
          ...editing,
          remarks: e.target.value
        }), rows: 2, className: "input" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2 p-5 border-t", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => setEditing(null), className: "px-4 py-2 rounded-md border text-sm", children: "Cancel" }),
        /* @__PURE__ */ jsxs("button", { onClick: save, disabled: saving, className: "px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold inline-flex items-center gap-2", children: [
          saving && /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }),
          " Save"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("style", { children: `.input{width:100%;border-radius:0.375rem;border:1px solid hsl(var(--border));background:transparent;padding:0.5rem 0.75rem;font-size:0.875rem}` })
  ] });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("label", { className: "text-xs font-medium text-primary", children: label }),
    /* @__PURE__ */ jsx("div", { className: "mt-1", children })
  ] });
}
export {
  AdminResults as component
};
