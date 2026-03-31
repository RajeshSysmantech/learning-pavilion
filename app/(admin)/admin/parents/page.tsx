import { AdminModulePage } from "@/components/admin/admin-module-page";
export default function Page() { return <AdminModulePage title="Parents" description="Manage linked parent accounts, child relationships, and plan status." columns={["Parent","Children","Plan","Status"]} rows={[["Riya Patel","2","Yearly","Active"],["Neha Mehta","1","Monthly","Active"]]} />; }
