import { AdminHero } from "@/components/admin/admin-hero";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { DataTable } from "@/components/ui/data-table";

export function AdminModulePage({
  title,
  description,
  columns,
  rows
}: {
  title: string;
  description: string;
  columns: string[];
  rows: Array<Array<string>>;
}) {
  return (
    <div className="space-y-6">
      <AdminHero title={title} description={description} />
      <div className="flex flex-wrap gap-3">
        <input className="min-w-64 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm" placeholder="Search..." />
        <select className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm">
          <option>All status</option>
          <option>Published</option>
          <option>Draft</option>
          <option>Archived</option>
        </select>
        <ConfirmDialog triggerLabel="Bulk archive" title="Archive selected items?" description="This action should be connected to a bulk mutation in production." />
      </div>
      <DataTable columns={columns} rows={rows} />
    </div>
  );
}
