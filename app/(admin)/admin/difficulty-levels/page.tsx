import { AdminModulePage } from "@/components/admin/admin-module-page";
export default function Page() { return <AdminModulePage title="Difficulty Levels" description="Manage easy, medium, hard tiers used across modules." columns={["Level","Order","Color"]} rows={[["Easy","1","Green"],["Medium","2","Orange"],["Hard","3","Blue"]]} />; }
