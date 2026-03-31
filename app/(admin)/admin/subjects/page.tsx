import { AdminModulePage } from "@/components/admin/admin-module-page";
export default function Page() { return <AdminModulePage title="Subjects" description="CRUD subjects used across quizzes, reports, and learning journeys." columns={["Subject","Slug","Published"]} rows={[["Maths","maths","Yes"],["Science","science","Yes"],["English","english","Yes"],["GK","gk","Yes"]]} />; }
