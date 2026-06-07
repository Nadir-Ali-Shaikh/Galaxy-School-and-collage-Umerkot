import { useState, useEffect, useMemo, useCallback } from "react";
import { s as supabase } from "./client-B4EfndxM.js";
function useSiteContent(page) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    supabase.from("site_content").select("*").in("page", [page, "global"]).order("sort_order").then(({ data }) => {
      if (!active) return;
      setRows(data || []);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [page]);
  const map = useMemo(() => {
    const m = /* @__PURE__ */ new Map();
    rows.forEach((r) => m.set(`${r.page}.${r.section}.${r.field_key}`, r.value || ""));
    return m;
  }, [rows]);
  const get = useCallback(
    (section, field_key, fallback = "") => {
      const v = map.get(`${page}.${section}.${field_key}`);
      if (v) return v;
      const g = map.get(`global.${section}.${field_key}`);
      return g || fallback;
    },
    [map, page]
  );
  return { get, loading, rows };
}
export {
  useSiteContent as u
};
