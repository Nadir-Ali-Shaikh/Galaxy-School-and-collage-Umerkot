import { useState, useEffect } from "react";
import { s as supabase } from "./client-B4EfndxM.js";
function useAuth() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [roleLoading, setRoleLoading] = useState(true);
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);
  useEffect(() => {
    if (!session?.user) {
      setIsAdmin(false);
      setIsTeacher(false);
      setRoleLoading(false);
      return;
    }
    setRoleLoading(true);
    supabase.from("user_roles").select("role").eq("user_id", session.user.id).then(({ data }) => {
      const roles = (data ?? []).map((r) => r.role);
      setIsAdmin(roles.includes("admin"));
      setIsTeacher(roles.includes("teacher"));
      setRoleLoading(false);
    });
  }, [session?.user?.id]);
  return { session, loading, isAdmin, isTeacher, roleLoading };
}
export {
  useAuth as u
};
