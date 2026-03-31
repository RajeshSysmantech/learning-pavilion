import { AdminModulePage } from "@/components/admin/admin-module-page";
export default function Page() { return <AdminModulePage title="Leaderboards" description="Inspect leaderboard windows, cache status, and recomputation health." columns={["Window","Module","Entries","Status"]} rows={[["Daily","Quiz","100","Fresh"],["Weekly","Typing","100","Fresh"]]} />; }
