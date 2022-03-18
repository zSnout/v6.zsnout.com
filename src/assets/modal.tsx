import Modal, { type Button } from "@/components/Modal.vue";
import { render } from "vue";

export function createModal<T extends string>(
  content: string,
  buttons: Button<T>[]
) {
  return new Promise<T | "cancel">((resolve) => {
    let el = document.createElement("div");
    document.body.append(el);

    function send(value: T | "cancel") {
      resolve(value);
      render(null, el);
    }

    let modal = (
      <Modal
        buttons={buttons}
        onCancel={() => send("cancel")}
        onSelect={(value) => send(value as T)}
      >
        {content}
      </Modal>
    );

    render(modal, el);
  });
}
