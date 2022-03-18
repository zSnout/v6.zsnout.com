import Modal, { type Button } from "@/components/Modal.vue";
import { render } from "vue";

export function createModal<T extends string>(
  content: string,
  buttons: Button<T | "cancel">[],
  options?: {
    fieldValue?: string;
    placeholder?: string;
  }
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
        placeholder={options?.placeholder}
        fieldValue={options?.fieldValue}
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

export async function alert(
  message: string,
  options: { buttonText?: string } = {}
) {
  await createModal(message, [
    {
      content: options.buttonText || "OK",
      value: "cancel",
    },
  ]);
}

export async function prompt(
  message: string,
  options: {
    default?: string;
    placeholder?: string;
    submitText?: string;
    cancelText?: string;
    validator?(value: string): boolean;
  } = {}
) {
  let result = await createModal(
    message,
    [
      {
        submitter: options.validator || true,
        content: options.submitText || "OK",
        value: "submit",
      },
      {
        content: options.cancelText || "Cancel",
        value: "cancel",
      },
    ],
    { fieldValue: options.default, placeholder: options.placeholder }
  );

  if (typeof result == "string" || result == null) return null;
  return result.value;
}

export async function confirm(
  message: string,
  options: { submitText?: string; cancelText?: string } = {}
) {
  let result = await createModal(message, [
    {
      content: options.submitText || "OK",
      value: "ok",
    },
    {
      content: options.cancelText || "Cancel",
      value: "cancel",
    },
  ]);

  return result == "ok";
}
