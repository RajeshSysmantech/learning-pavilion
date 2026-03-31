import { AdminModulePage } from "@/components/admin/admin-module-page";
export default function Page() { return <AdminModulePage title="Students" description="Search students, profile completion, grade, subscription, and activity trends." columns={["Student","Grade","Coins","Streak"]} rows={[["Aarohi Sharma","5","1240","7"],["Vihaan Mehta","4","980","5"]]} />; }
