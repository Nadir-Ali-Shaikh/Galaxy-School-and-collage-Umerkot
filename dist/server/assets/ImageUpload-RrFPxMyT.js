import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { X, Loader2, Upload } from "lucide-react";
import { s as supabase } from "./client-B4EfndxM.js";
async function uploadMedia(file, folder = "uploads") {
  const ext = file.name.split(".").pop() ?? "bin";
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("media").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type
  });
  if (error) throw error;
  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return data.publicUrl;
}
function ImageUpload({
  value,
  onChange,
  folder = "uploads",
  hint
}) {
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState(null);
  const handle = async (file) => {
    setUploading(true);
    setErr(null);
    try {
      const url = await uploadMedia(file, folder);
      onChange(url);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    value ? /* @__PURE__ */ jsxs("div", { className: "relative inline-block", children: [
      /* @__PURE__ */ jsx("img", { src: value, alt: "", className: "h-32 w-48 object-cover rounded-md border" }),
      /* @__PURE__ */ jsx("button", { type: "button", onClick: () => onChange(null), className: "absolute -top-2 -right-2 h-7 w-7 rounded-full bg-destructive text-destructive-foreground grid place-items-center shadow", children: /* @__PURE__ */ jsx(X, { className: "h-3.5 w-3.5" }) })
    ] }) : /* @__PURE__ */ jsxs("label", { className: "flex items-center justify-center gap-2 h-32 w-48 rounded-md border-2 border-dashed cursor-pointer hover:bg-secondary text-sm text-muted-foreground", children: [
      uploading ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(Upload, { className: "h-4 w-4" }),
      uploading ? "Uploading..." : "Upload image",
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "file",
          accept: "image/*",
          className: "hidden",
          onChange: (e) => {
            const f = e.target.files?.[0];
            if (f) handle(f);
          }
        }
      )
    ] }),
    hint && /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground mt-1.5", children: [
      "Recommended: ",
      /* @__PURE__ */ jsx("span", { className: "font-medium text-foreground", children: hint })
    ] }),
    err && /* @__PURE__ */ jsx("div", { className: "text-xs text-destructive mt-1", children: err })
  ] });
}
export {
  ImageUpload as I
};
