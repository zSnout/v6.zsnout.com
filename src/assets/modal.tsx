import Modal, { type Button } from "@/components/Modal.vue";
import { render } from "vue";

export function createModal<T extends string>(
  content: string,
  buttons: Button<T | "cancel">[]
) {
  return new Promise<T | null>((resolve) => {
    let el = document.createElement("div");
    document.body.append(el);

    function send(value: T | null) {
      if (value == "cancel") resolve(null);
      else resolve(value);

      render(null, el);
    }

    let modal = (
      <Modal
        buttons={buttons}
        onCancel={() => send(null)}
        onSelect={(value) => send(value as T)}
      >
        {content}
      </Modal>
    );

    render(modal, el);
  });
}
