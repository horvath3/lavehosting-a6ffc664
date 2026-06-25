import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) throw redirect({ to: "/auth" });
      return { user: data.user };
    } catch (error) {
      console.error("[Supabase] Unable to load authenticated user.", error);
      throw redirect({ to: "/auth" });
    }
  },
  component: ProtectedLayout,
});

function ProtectedLayout() {
  return (
    <DashboardShell>
      <Outlet />
    </DashboardShell>
  );
}
