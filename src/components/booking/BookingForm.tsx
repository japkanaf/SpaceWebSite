"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { CircleAlert } from "lucide-react";
import type { BookingField, BookingFormCopy } from "@/content/types";
import { cn } from "@/lib/cn";
import { bookingDateLimits, moscowToday } from "@/lib/bookingDate";
import { formatPhoneInput } from "@/lib/phoneMask";
import { Button } from "@/components/ui/Button";
import { FormField, SelectInput, TextArea, TextInput } from "@/components/ui/Form";
import { useBooking } from "./BookingProvider";
import { BookingSuccess } from "./BookingSuccess";
import { COMMENT_MAX, REQUIRED_FIELDS } from "./validation";

export function BookingForm({ copy }: { copy: BookingFormCopy }) {
  const { values, errors, status, focusRequest, setValue, blurField, submit, reset } = useBooking();
  const fields = useRef<Partial<Record<BookingField, HTMLElement | null>>>({});
  const [limits, setLimits] = useState<{ min: string; max: string } | null>(null);

  useEffect(() => {
    setLimits(bookingDateLimits(moscowToday()));
  }, []);

  // After a service card preselects a service, move focus to the first empty required field.
  useEffect(() => {
    if (focusRequest === 0) return;
    const target = REQUIRED_FIELDS.find((field) => values[field].trim() === "") ?? "comment";
    fields.current[target]?.focus({ preventScroll: true });
    // Only react to new focus requests.
  }, [focusRequest]); // eslint-disable-line react-hooks/exhaustive-deps

  if (status === "success") {
    return (
      <BookingSuccess
        title={copy.successTitle}
        text={copy.successText}
        action={copy.successAction}
        onReset={reset}
      />
    );
  }

  const register = (field: BookingField) => (element: HTMLElement | null) => {
    fields.current[field] = element;
  };
  const message = (field: BookingField): string | undefined => {
    const code = errors[field];
    return code ? copy.errors[code] : undefined;
  };
  const invalid = (field: BookingField) => (errors[field] ? true : undefined);
  const submitting = status === "submitting";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = await submit();
    if (!result.ok && result.firstInvalid) {
      fields.current[result.firstInvalid]?.focus();
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="rounded-card border border-line bg-paper p-6 shadow-soft sm:p-8 lg:p-10"
    >
      <div className="grid gap-x-5 gap-y-6 md:grid-cols-2">
        <FormField id="booking-name" label={copy.fields.name.label} required error={message("name")}>
          <TextInput
            ref={register("name")}
            id="booking-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder={copy.fields.name.placeholder}
            value={values.name}
            onChange={(event) => setValue("name", event.target.value)}
            onBlur={() => blurField("name")}
            aria-required="true"
            aria-invalid={invalid("name")}
            aria-describedby="booking-name-error"
          />
        </FormField>

        <FormField id="booking-phone" label={copy.fields.phone.label} required error={message("phone")}>
          <TextInput
            ref={register("phone")}
            id="booking-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder={copy.fields.phone.placeholder}
            value={values.phone}
            onChange={(event) => setValue("phone", formatPhoneInput(event.target.value))}
            onBlur={() => blurField("phone")}
            aria-required="true"
            aria-invalid={invalid("phone")}
            aria-describedby="booking-phone-error"
          />
        </FormField>

        <FormField id="booking-service" label={copy.fields.service.label} required error={message("service")}>
          <SelectInput
            ref={register("service")}
            id="booking-service"
            name="service"
            value={values.service}
            empty={values.service === ""}
            onChange={(event) => setValue("service", event.target.value)}
            onBlur={() => blurField("service")}
            aria-required="true"
            aria-invalid={invalid("service")}
            aria-describedby="booking-service-error"
          >
            <option value="" disabled>
              {copy.fields.service.placeholder}
            </option>
            {copy.serviceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </SelectInput>
        </FormField>

        <FormField id="booking-date" label={copy.fields.date.label} required error={message("date")}>
          <TextInput
            ref={register("date")}
            id="booking-date"
            name="date"
            type="date"
            min={limits?.min}
            max={limits?.max}
            placeholder={copy.fields.date.placeholder}
            value={values.date}
            onChange={(event) => setValue("date", event.target.value)}
            onBlur={() => blurField("date")}
            aria-required="true"
            aria-invalid={invalid("date")}
            aria-describedby="booking-date-error"
          />
        </FormField>

        <FormField
          id="booking-comment"
          label={copy.fields.comment.label}
          error={message("comment")}
          className="md:col-span-2"
          counter={
            <span
              aria-hidden="true"
              className={cn(
                "text-xs tabular-nums",
                values.comment.length > COMMENT_MAX ? "text-danger" : "text-muted",
              )}
            >
              {values.comment.length} / {COMMENT_MAX}
            </span>
          }
        >
          <TextArea
            ref={register("comment")}
            id="booking-comment"
            name="comment"
            rows={4}
            placeholder={copy.fields.comment.placeholder}
            value={values.comment}
            onChange={(event) => setValue("comment", event.target.value)}
            onBlur={() => blurField("comment")}
            aria-invalid={invalid("comment")}
            aria-describedby="booking-comment-error"
          />
        </FormField>
      </div>

      {status === "error" ? (
        <p
          role="alert"
          className="mt-6 flex items-start gap-2.5 rounded-control bg-danger/5 px-4 py-3 text-sm leading-snug text-danger"
        >
          <CircleAlert aria-hidden="true" strokeWidth={1.75} className="mt-px size-4 shrink-0" />
          <span>{copy.submitError}</span>
        </p>
      ) : null}

      <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-8">
        <Button type="submit" size="lg" icon="arrow" loading={submitting} className="w-full md:w-auto">
          {submitting ? copy.submitting : copy.submit}
        </Button>
        <p className="text-sm leading-relaxed text-muted md:max-w-xs">{copy.consent}</p>
      </div>
    </form>
  );
}
