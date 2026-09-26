import type { BookingServiceValue } from "@/content/types";

/** A fully validated appointment request. Exists only in browser memory in this version. */
export interface BookingRequest {
  name: string;
  /** Canonical "+7XXXXXXXXXX". */
  phone: string;
  service: BookingServiceValue;
  /** "YYYY-MM-DD" on the Moscow calendar. */
  date: string;
  comment: string;
}

/** Delivery boundary. Real delivery (email, messenger, CRM) implements this without UI changes. */
export interface BookingSubmitter {
  submit(request: BookingRequest): Promise<void>;
}
