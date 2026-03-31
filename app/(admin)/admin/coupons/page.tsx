import { AdminModulePage } from "@/components/admin/admin-module-page";
export default function Page() { return <AdminModulePage title="Coupons" description="Create coupon campaigns, limits, expiries, and redemption insights." columns={["Code","Discount","Usage","Status"]} rows={[["WELCOME25","25%","102","Active"],["YEARLYBOOST","500 INR","20","Scheduled"]]} />; }
