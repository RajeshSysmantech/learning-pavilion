import { AdminModulePage } from "@/components/admin/admin-module-page";
export default function Page() { return <AdminModulePage title="Plans" description="Manage subscription plans, entitlements, pricing, and plan availability." columns={["Plan","Billing","Price","Status"]} rows={[["Free","N/A","0","Active"],["Monthly","Monthly","299","Active"],["Yearly","Yearly","2999","Active"]]} />; }
