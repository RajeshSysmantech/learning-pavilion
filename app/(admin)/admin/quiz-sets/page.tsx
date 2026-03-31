import { AdminModulePage } from "@/components/admin/admin-module-page";
export default function Page() { return <AdminModulePage title="Quiz Sets" description="Create, filter, publish, and review quiz set performance." columns={["Quiz Set","Subject","Difficulty","Status"]} rows={[["Math Magic - Fractions","Maths","Easy","Published"],["Space Science Sprint","Science","Medium","Published"]]} />; }
