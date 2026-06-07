import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { GraduationCap, Loader2 } from "lucide-react";
import { s as supabase } from "./client-B4EfndxM.js";
import { u as useAuth } from "./use-auth-DVOU-CNx.js";
import "@supabase/supabase-js";
import "@libsql/client/web";
function LoginPage() {
  const navigate = useNavigate();
  const {
    session
  } = useAuth();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);
  useEffect(() => {
    if (session) navigate({
      to: "/admin"
    });
  }, [session, navigate]);
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setInfo(null);
    try {
      if (mode === "login") {
        const {
          error: error2
        } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error2) throw error2;
        navigate({
          to: "/admin"
        });
      } else {
        const {
          error: error2
        } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/admin`,
            data: {
              full_name: fullName
            }
          }
        });
        if (error2) throw error2;
        setInfo("Account created. If email confirmation is enabled, please check your inbox.");
      }
    } catch (e2) {
      setError(e2 instanceof Error ? e2.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen grid place-items-center bg-secondary px-4 py-16", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center justify-center gap-3 mb-8", children: [
      /* @__PURE__ */ jsx("div", { className: "h-11 w-11 rounded-lg bg-gold text-gold-foreground grid place-items-center", children: /* @__PURE__ */ jsx(GraduationCap, { className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsxs("div", { className: "leading-tight", children: [
        /* @__PURE__ */ jsx("div", { className: "font-display text-lg font-bold text-primary", children: "Galaxy Public School & College" }),
        /* @__PURE__ */ jsx("div", { className: "text-[10px] tracking-[0.2em] text-gold uppercase", children: "Admin Panel" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-card border shadow-elegant p-7", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-display text-2xl font-bold text-primary", children: mode === "login" ? "Sign in to admin" : "Create admin account" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: mode === "login" ? "Enter your credentials to continue." : "First account becomes the admin automatically." }),
      /* @__PURE__ */ jsxs("form", { onSubmit, className: "mt-6 grid gap-4", children: [
        mode === "signup" && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-primary", children: "Full Name" }),
          /* @__PURE__ */ jsx("input", { type: "text", value: fullName, onChange: (e) => setFullName(e.target.value), required: true, maxLength: 100, className: "mt-1 w-full rounded-md border bg-background px-3 py-2.5 text-sm" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-primary", children: "Email" }),
          /* @__PURE__ */ jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, autoComplete: "email", className: "mt-1 w-full rounded-md border bg-background px-3 py-2.5 text-sm" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-primary", children: "Password" }),
          /* @__PURE__ */ jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, minLength: 6, autoComplete: mode === "login" ? "current-password" : "new-password", className: "mt-1 w-full rounded-md border bg-background px-3 py-2.5 text-sm" })
        ] }),
        error && /* @__PURE__ */ jsx("div", { className: "text-sm text-destructive bg-destructive/10 rounded-md px-3 py-2", children: error }),
        info && /* @__PURE__ */ jsx("div", { className: "text-sm text-primary bg-gold/15 rounded-md px-3 py-2", children: info }),
        /* @__PURE__ */ jsxs("button", { type: "submit", disabled: loading, className: "inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary/90 disabled:opacity-60", children: [
          loading && /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }),
          mode === "login" ? "Sign In" : "Create Account"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-5 text-center text-sm text-muted-foreground", children: mode === "login" ? /* @__PURE__ */ jsx("button", { onClick: () => {
        setMode("signup");
        setError(null);
        setInfo(null);
      }, className: "text-gold font-semibold hover:underline", children: "Need an account? Sign up" }) : /* @__PURE__ */ jsx("button", { onClick: () => {
        setMode("login");
        setError(null);
        setInfo(null);
      }, className: "text-gold font-semibold hover:underline", children: "Already have an account? Sign in" }) })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mt-6 text-center text-xs text-muted-foreground", children: /* @__PURE__ */ jsx(Link, { to: "/", className: "hover:text-primary", children: "← Back to website" }) })
  ] }) });
}
export {
  LoginPage as component
};
