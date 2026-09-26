import type { BookingSubmitter } from "./submitter";

const DEMO_DELAY_MS = 1200;

/**
 * Demonstration submitter: waits briefly and resolves. It sends nothing anywhere.
 * It rejects when the browser is offline so the failure path can be seen and tested.
 */
export const demoSubmitter: BookingSubmitter = {
  submit() {
    return new Promise<void>((resolve, reject) => {
      window.setTimeout(() => {
        if (typeof navigator !== "undefined" && navigator.onLine === false) {
          reject(new Error("offline"));
          return;
        }
        resolve();
      }, DEMO_DELAY_MS);
    });
  },
};
