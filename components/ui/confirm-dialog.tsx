import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

export function ConfirmDialog({
  triggerLabel,
  title,
  description
}: {
  triggerLabel: string;
  title: string;
  description: string;
}) {
  return (
    <Modal
      trigger={<Button variant="ghost">{triggerLabel}</Button>}
      title={title}
      description={description}
    >
      <div className="flex justify-end gap-3">
        <Button variant="ghost">Cancel</Button>
        <Button variant="danger">Confirm</Button>
      </div>
    </Modal>
  );
}
