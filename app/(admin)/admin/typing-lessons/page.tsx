import { AdminModulePage } from "@/components/admin/admin-module-page";
export default function Page() { return <AdminModulePage title="Typing Lessons" description="Manage lesson texts, difficulty, target WPM, and unlock sequence." columns={["Lesson","Level","Target WPM","Status"]} rows={[["Home Row Heroes","Beginner","20","Published"],["Accuracy Quest","Intermediate","28","Published"]]} />; }
