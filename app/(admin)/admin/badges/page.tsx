import { AdminModulePage } from "@/components/admin/admin-module-page";
export default function Page() { return <AdminModulePage title="Badges" description="Create and manage rule-driven achievements awarded automatically." columns={["Badge","Rule","Published"]} rows={[["First Quiz Champion","First quiz completed","Yes"],["Typing Accuracy Ace","Accuracy >= 95%","Yes"]]} />; }
