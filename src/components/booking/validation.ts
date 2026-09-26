import type { BookingErrorCode, BookingField } from "@/content/types";
import { validateBookingDate } from "@/lib/bookingDate";
import { phoneDigits } from "@/lib/phoneMask";

export interface BookingValues {
  name: string;
  phone: string;
  service: string;
  date: string;
  comment: string;
}

export interface ValidationContext {
  allowedServices: readonly string[];
  /** Current Moscow date as "YYYY-MM-DD". */
  today: string;
}

export type BookingErrors = Partial<Record<BookingField, BookingErrorCode>>;

export const FIELD_ORDER: readonly BookingField[] = ["name", "phone", "service", "date", "comment"];
export const REQUIRED_FIELDS: readonly BookingField[] = ["name", "phone", "service", "date"];
export const NAME_MAX = 60;
export const COMMENT_MAX = 500;

export function validateName(value: string): BookingErrorCode | null {
  const name = value.trim();
  if (name.length === 0) return "nameRequired";
  if (name.length > NAME_MAX) return "nameTooLong";
  if (!/^[\p{L}\s-]+$/u.test(name)) return "nameInvalidCharacters";
  const letters = name.match(/\p{L}/gu)?.length ?? 0;
  if (letters < 2) return "nameTooShort";
  return null;
}

export function validatePhone(value: string): BookingErrorCode | null {
  const digits = phoneDigits(value);
  if (digits.length === 0) return "phoneRequired";
  if (digits.length !== 10) return "phoneInvalid";
  return null;
}

export function validateService(value: string, allowed: readonly string[]): BookingErrorCode | null {
  return allowed.includes(value) ? null : "serviceRequired";
}

export function validateComment(value: string): BookingErrorCode | null {
  return value.length > COMMENT_MAX ? "commentTooLong" : null;
}

export function validateField(
  field: BookingField,
  values: BookingValues,
  context: ValidationContext,
): BookingErrorCode | null {
  switch (field) {
    case "name":
      return validateName(values.name);
    case "phone":
      return validatePhone(values.phone);
    case "service":
      return validateService(values.service, context.allowedServices);
    case "date":
      return validateBookingDate(values.date, context.today);
    case "comment":
      return validateComment(values.comment);
    default:
      return null;
  }
}

export function validateAll(values: BookingValues, context: ValidationContext): BookingErrors {
  const errors: BookingErrors = {};
  for (const field of FIELD_ORDER) {
    const code = validateField(field, values, context);
    if (code) errors[field] = code;
  }
  return errors;
}
