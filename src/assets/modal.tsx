import Modal, { type Button } from "@/components/Modal.vue";
import { render } from "vue";

export function createModal<T extends string>(
  content: string,
  buttons: Button<T | "cancel">[]
) {
  return new Promise<T | { value: string } | null>((resolve) => {
    let el = document.createElement("div");
    document.body.append(el);

    function send(value: T | { value: string } | null) {
      if (value == "cancel") resolve(null);
      else resolve(value);

      render(null, el);
      el.remove();
    }

    let modal = (
      <Modal
        buttons={buttons}
        onCancel={() => send(null)}
        onSelect={(value) => send(value as T)}
        onSubmit={(value) => send({ value })}
      >
        {content}
      </Modal>
    );

    render(modal, el);
  });
}

export async function alert(message: string) {
  await createModal(message, [
    {
      content: "OK",
      value: "cancel",
    },
  ]);
}
