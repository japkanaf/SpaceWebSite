/**
 * Russian phone helpers. The visible value is always "+7 (XXX) XXX-XX-XX";
 * a leading 8 or 7 typed or pasted without "+" is treated as the country code.
 */

export function phoneDigits(raw: string): string {
  const trimmed = raw.trim();
  let digits = trimmed.replace(/\D/g, "");
  if (trimmed.startsWith("+7")) {
    digits = digits.slice(1);
  } else if (digits.startsWith("8") || digits.startsWith("7")) {
    digits = digits.slice(1);
  }
  return digits.slice(0, 10);
}

export function formatPhone(digits: string): string {
  if (digits.length === 0) return "";
  const area = digits.slice(0, 3);
  const first = digits.slice(3, 6);
  const second = digits.slice(6, 8);
  const third = digits.slice(8, 10);
  let out = `+7 (${area}`;
  if (first) out += `) ${first}`;
  if (second) out += `-${second}`;
  if (third) out += `-${third}`;
  return out;
}

export function formatPhoneInput(raw: string): string {
  return formatPhone(phoneDigits(raw));
}

/** Canonical "+7XXXXXXXXXX" form passed to the submitter. */
export function canonicalPhone(raw: string): string {
  return `+7${phoneDigits(raw)}`;
}
