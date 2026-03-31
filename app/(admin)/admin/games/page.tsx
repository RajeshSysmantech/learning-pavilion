import { AdminModulePage } from "@/components/admin/admin-module-page";
export default function Page() { return <AdminModulePage title="Games" description="Prepare puzzle game catalog, levels, and publishing workflow for Phase 2." columns={["Game","Levels","Status"]} rows={[["Pattern Pop","12","Draft"],["Math Match","8","Draft"]]} />; }
