import { AdminModulePage } from "@/components/admin/admin-module-page";
export default function Page() { return <AdminModulePage title="Categories" description="Manage quiz and learning categories mapped to subjects." columns={["Category","Subject","Status"]} rows={[["Fractions","Maths","Published"],["Space","Science","Published"]]} />; }
