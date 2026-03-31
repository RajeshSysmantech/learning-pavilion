import { AdminModulePage } from "@/components/admin/admin-module-page";
export default function Page() { return <AdminModulePage title="Rewards" description="Manage catalog items, coin pricing, stock, approval rules, and visibility." columns={["Reward","Coins","Stock","Status"]} rows={[["Astronaut Pencil Kit","450","15","Published"],["Premium Puzzle Bundle","1000","10","Published"]]} />; }
