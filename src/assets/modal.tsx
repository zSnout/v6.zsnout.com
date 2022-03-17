import Modal, { type Button } from "@/components/Modal.vue";

export function createModal<T extends string>(
  content: string,
  cancel: string,
  buttons: Button<T>[]
) {
  return new Promise<T | "cancel">((resolve) => {
    let modal = (
      <Modal
        cancelText={cancel}
        buttons={buttons}
        onCancel={() => resolve("cancel")}
        onSelect={(value) => resolve(value as T)}
      >
        {content}
      </Modal>
    );
  });
}
