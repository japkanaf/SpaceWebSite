"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";
import type { BookingField, BookingServiceValue, ServiceId } from "@/content/types";
import { scrollToSection } from "@/components/motion/ScrollController";
import { moscowToday } from "@/lib/bookingDate";
import { canonicalPhone } from "@/lib/phoneMask";
import { demoSubmitter } from "./demoSubmitter";
import type { BookingSubmitter } from "./submitter";
import {
  FIELD_ORDER,
  validateAll,
  validateField,
  type BookingErrors,
  type BookingValues,
  type ValidationContext,
} from "./validation";

export type BookingStatus = "idle" | "submitting" | "success" | "error";
export type SubmitResult = { ok: true } | { ok: false; firstInvalid: BookingField | null };

interface BookingContextValue {
  values: BookingValues;
  errors: BookingErrors;
  status: BookingStatus;
  /** Increments when a service card asks the form to take focus. */
  focusRequest: number;
  setValue: (field: BookingField, value: string) => void;
  blurField: (field: BookingField) => void;
  submit: () => Promise<SubmitResult>;
  reset: () => void;
  preselectService: (id: ServiceId) => void;
}

const EMPTY_VALUES: BookingValues = { name: "", phone: "", service: "", date: "", comment: "" };

const BookingContext = createContext<BookingContextValue | null>(null);

/** Single owner of booking state. Nothing is persisted or sent over the network. */
export function BookingProvider({
  allowedServices,
  submitter = demoSubmitter,
  children,
}: {
  allowedServices: string[];
  submitter?: BookingSubmitter;
  children: ReactNode;
}) {
  const [values, setValues] = useState<BookingValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<BookingErrors>({});
  const [status, setStatus] = useState<BookingStatus>("idle");
  const [focusRequest, setFocusRequest] = useState(0);
  const serviceTouched = useRef(false);
  const inFlight = useRef(false);

  const context = useCallback(
    (): ValidationContext => ({ allowedServices, today: moscowToday() }),
    [allowedServices],
  );

  const setValue = useCallback(
    (field: BookingField, value: string) => {
      if (field === "service") serviceTouched.current = true;
      const next: BookingValues = { ...values, [field]: value };
      setValues(next);
      if (errors[field]) {
        const code = validateField(field, next, context());
        setErrors((previous) => ({ ...previous, [field]: code ?? undefined }));
      }
      if (status === "error") setStatus("idle");
    },
    [values, errors, status, context],
  );

  const blurField = useCallback(
    (field: BookingField) => {
      const code = validateField(field, values, context());
      setErrors((previous) => ({ ...previous, [field]: code ?? undefined }));
    },
    [values, context],
  );

  const submit = useCallback(async (): Promise<SubmitResult> => {
    if (inFlight.current) return { ok: false, firstInvalid: null };
    const found = validateAll(values, context());
    setErrors(found);
    const firstInvalid = FIELD_ORDER.find((field) => found[field] !== undefined) ?? null;
    if (firstInvalid) return { ok: false, firstInvalid };

    inFlight.current = true;
    setStatus("submitting");
    try {
      await submitter.submit({
        name: values.name.trim(),
        phone: canonicalPhone(values.phone),
        service: values.service as BookingServiceValue,
        date: values.date,
        comment: values.comment.trim(),
      });
      setStatus("success");
      return { ok: true };
    } catch {
      setStatus("error");
      return { ok: false, firstInvalid: null };
    } finally {
      inFlight.current = false;
    }
  }, [values, context, submitter]);

  const reset = useCallback(() => {
    setValues(EMPTY_VALUES);
    setErrors({});
    setStatus("idle");
    serviceTouched.current = false;
  }, []);

  const preselectService = useCallback(
    (id: ServiceId) => {
      if (status === "success") {
        serviceTouched.current = false;
        setValues({ ...EMPTY_VALUES, service: id });
        setErrors({});
        setStatus("idle");
      } else if (!serviceTouched.current) {
        setValues((previous) => ({ ...previous, service: id }));
        setErrors((previous) => ({ ...previous, service: undefined }));
      }
      scrollToSection("zapis");
      setFocusRequest((count) => count + 1);
    },
    [status],
  );

  const value = useMemo<BookingContextValue>(
    () => ({ values, errors, status, focusRequest, setValue, blurField, submit, reset, preselectService }),
    [values, errors, status, focusRequest, setValue, blurField, submit, reset, preselectService],
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking(): BookingContextValue {
  const context = useContext(BookingContext);
  if (!context) throw new Error("useBooking must be used inside BookingProvider");
  return context;
}
