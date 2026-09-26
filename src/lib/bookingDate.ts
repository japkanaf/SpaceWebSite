import type { BookingErrorCode } from "@/content/types";

/** Booking date rules evaluated on the Moscow calendar. Dates are ISO "YYYY-MM-DD" strings. */

const DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
export const BOOKING_WINDOW_MONTHS = 3;

export function moscowToday(now: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Moscow",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

function parse(iso: string): [number, number, number] | null {
  const match = DATE_PATTERN.exec(iso);
  if (!match) return null;
  return [Number(match[1]), Number(match[2]), Number(match[3])];
}

export function addMonths(iso: string, months: number): string {
  const parsed = parse(iso);
  if (!parsed) return iso;
  const [year, month, day] = parsed;
  const target = month - 1 + months;
  const nextYear = year + Math.floor(target / 12);
  const nextMonth = ((target % 12) + 12) % 12;
  const lastDay = new Date(Date.UTC(nextYear, nextMonth + 1, 0)).getUTCDate();
  const nextDay = Math.min(day, lastDay);
  return `${nextYear}-${String(nextMonth + 1).padStart(2, "0")}-${String(nextDay).padStart(2, "0")}`;
}

export function isSunday(iso: string): boolean {
  const parsed = parse(iso);
  if (!parsed) return false;
  const [year, month, day] = parsed;
  return new Date(Date.UTC(year, month - 1, day)).getUTCDay() === 0;
}

export function bookingDateLimits(today: string): { min: string; max: string } {
  return { min: today, max: addMonths(today, BOOKING_WINDOW_MONTHS) };
}

export function validateBookingDate(value: string, today: string): BookingErrorCode | null {
  if (!value || !DATE_PATTERN.test(value)) return "dateRequired";
  if (value < today) return "datePast";
  if (value > addMonths(today, BOOKING_WINDOW_MONTHS)) return "dateTooFar";
  if (isSunday(value)) return "dateSunday";
  return null;
}
