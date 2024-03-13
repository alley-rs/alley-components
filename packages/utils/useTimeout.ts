import { onCleanup, onMount } from "solid-js";
import type { TimeoutID } from "~/interface";

export class Timeout {
  static create() {
    return new Timeout();
  }

  currentId: TimeoutID | null = null;

  start(delay: number, fn: Function) {
    this.reset();
    this.currentId = setTimeout(() => {
      fn();
    }, delay);
  }

  reset() {
    if (this.currentId !== null) {
      clearTimeout(this.currentId);
      this.currentId = null;
    }
  }

  clear() {
    if (this.currentId !== null) {
      clearTimeout(this.currentId);
    }
  }
}

export default function useTimeout() {
  const timeout = Timeout.create();

  onMount(() => timeout.clear());

  onCleanup(() => timeout.clear());

  return timeout;
}
