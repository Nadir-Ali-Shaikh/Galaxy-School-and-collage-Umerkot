import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin | Galaxy Public School & College" }, { name: "robots", content: "noindex" }] }),
  component: AdminLayout,
});
