import Modal, { type Button } from "@/components/Modal.vue";
import { render } from "vue";

export function createModal<T extends string>(
  content: string,
  buttons: Button<T>[]
) {
  return new Promise<T | "cancel">((resolve) => {
    let modal = (
      <Modal
        buttons={buttons}
        onCancel={() => resolve("cancel")}
        onSelect={(value) => resolve(value as T)}
      >
        {content}
      </Modal>
    );

    render(modal, document.body);
  });
}
