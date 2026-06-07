import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

type AuthState = {
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  isTeacher: boolean;
  roleLoading: boolean;
};

export function useAuth(): AuthState {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    const localSession = typeof window !== 'undefined' ? localStorage.getItem("galaxy-admin-session") : null;
    if (localSession === "true") {
      setSession({
        user: { email: "galaxycollege02@gmail.com", id: "galaxy-mock-admin-id" },
      } as any);
      setLoading(false);
      return;
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      if (s) {
        localStorage.removeItem("galaxy-admin-session");
      }
      setSession(s);
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        localStorage.removeItem("galaxy-admin-session");
      }
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

    const isGalaxyAdmin = session.user.email?.toLowerCase() === "galaxycollege02@gmail.com";
    if (isGalaxyAdmin) {
      setIsAdmin(true);
      setIsTeacher(false);
      setRoleLoading(false);
      return;
    }

    // Non-galaxycollege02 accounts are strictly denied admin status
    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .then(({ data }) => {
        const roles = (data ?? []).map((r) => r.role);
        setIsAdmin(false);
        setIsTeacher(roles.includes("teacher"));
        setRoleLoading(false);
      });
  }, [session?.user?.id, session?.user?.email]);

  return { session, loading, isAdmin, isTeacher, roleLoading };
}
