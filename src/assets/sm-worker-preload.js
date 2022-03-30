let post = self.postMessage;
let isAsyncRunning = false;

// @ts-ignore
delete self.postMessage;
// @ts-ignore
delete self.caches;

/** @returns {Promise<any>} */
function onNextMessage() {
  return new Promise((resolve) => {
    self.onmessage = ({ data }) => {
      resolve(data);
    };
  });
}

/** @template T */
async function runAsync(
  /** @type {() => Promise<T>} */ fn,
  /** @type {T} */ defaultValue
) {
  if (isAsyncRunning) return defaultValue;

  isAsyncRunning = true;
  let value = await fn();
  isAsyncRunning = false;

  return value;
}

function _print(/** @type {any[]} */ ...content) {
  post({ type: "print", content });
}

async function $input(/** @type {any[]} */ messages = []) {
  return runAsync(async () => {
    _print(...messages);
    post({ type: "input" });

    return await onNextMessage();
  }, "");
}

/** @type {{ [x: string]: string }} */
let options = {};

/** @type {{ [x: string]: () => Promise<void> | void }} */
let menu = {};

async function $menu(
  /** @type {any[]} */ messages = [],
  /** @type {() => Promise<void> | void } */ cb = () => {}
) {
  runAsync(async () => {
    _print(...messages);

    menu = Object.create(null);
    options = Object.create(null);
    await cb();

    post({ type: "menu", options });
    await menu[await onNextMessage()]?.();
  });
}

function $option(/** @type {any[]} */ [key, value = key] = [], cb = () => {}) {
  options[key] = "" + value;
  menu[key] = cb;
}

export {};
