import { AdminModulePage } from "@/components/admin/admin-module-page";
export default function Page() { return <AdminModulePage title="Notifications" description="Monitor notification templates, delivery state, and targeting rules." columns={["Template","Channel","Audience","Status"]} rows={[["Badge Won","In-app","Students","Active"],["Plan Reminder","Email","Parents","Active"]]} />; }
