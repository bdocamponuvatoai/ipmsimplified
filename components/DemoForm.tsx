"use client";
import { useActionState, useEffect, useRef, useState } from "react";
import { requestDemo } from "@/app/actions";
import {
  demoSchema,
  flattenErrors,
  formValues,
  roles,
  interests,
  type FormState,
} from "@/lib/schema";
const initial: FormState = { status: "idle" };
export function DemoForm() {
  const [state, action, pending] = useActionState(requestDemo, initial);
  const [clientErrors, setClientErrors] = useState<Record<string, string[]>>(
    {},
  );
  const result = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (state.status !== "idle") result.current?.focus();
  }, [state]);
  const errors = Object.keys(clientErrors).length
    ? clientErrors
    : state.errors || {};
  function error(name: string) {
    return errors[name] ? (
      <p className="field-error" id={`${name}-error`}>
        {errors[name][0]}
      </p>
    ) : null;
  }
  if (state.status === "success")
    return (
      <div className="success-panel" ref={result} tabIndex={-1} role="status">
        <h2>Request received.</h2>
        <p>{state.message}</p>
      </div>
    );
  return (
    <form
      action={action}
      className="demo-form"
      onSubmit={(event) => {
        const validation = demoSchema.safeParse(
          formValues(new FormData(event.currentTarget)),
        );
        if (!validation.success) {
          event.preventDefault();
          const next = flattenErrors(validation.error).fieldErrors;
          setClientErrors(next);
          const name = Object.keys(next)[0];
          (
            event.currentTarget.elements.namedItem(name) as HTMLElement | null
          )?.focus?.();
        } else setClientErrors({});
      }}
    >
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input name="website" id="website" tabIndex={-1} autoComplete="off" />
      </div>
      {(
        [
          { name: "name", label: "Name", auto: "name", type: "text" },
          { name: "email", label: "Work email", auto: "email", type: "email" },
          {
            name: "organisation",
            label: "Organisation",
            auto: "organization",
            type: "text",
          },
        ] as const
      ).map((field) => (
        <div className="form-field" key={field.name}>
          <label htmlFor={field.name}>{field.label}</label>
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            autoComplete={field.auto}
            required
            maxLength={
              field.name === "email" ? 254 : field.name === "name" ? 100 : 150
            }
            defaultValue={state.values?.[field.name]}
            aria-invalid={Boolean(errors[field.name])}
            aria-describedby={
              errors[field.name] ? `${field.name}-error` : undefined
            }
          />
          {error(field.name)}
        </div>
      ))}
      <div className="form-field">
        <label htmlFor="role">Role</label>
        <select
          id="role"
          name="role"
          required
          defaultValue={state.values?.role || ""}
          aria-invalid={Boolean(errors.role)}
          aria-describedby={errors.role ? "role-error" : undefined}
        >
          <option value="" disabled>
            Select your role
          </option>
          {roles.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
        {error("role")}
      </div>
      <fieldset
        className="form-wide"
        aria-describedby={errors.products ? "products-error" : undefined}
      >
        <legend>Product interest — choose at least one</legend>
        {interests.map((p) => (
          <label className="checkbox-label" key={p}>
            <input
              type="checkbox"
              name="products"
              value={p}
              defaultChecked={state.values?.products?.includes(p)}
            />
            {p}
          </label>
        ))}
        {error("products")}
      </fieldset>
      <div className="form-field form-wide">
        <label htmlFor="message">
          Message <span className="form-note">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          maxLength={3000}
          defaultValue={state.values?.message}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {error("message")}
      </div>
      {state.status === "error" && (
        <div
          className="form-error form-wide"
          role="alert"
          ref={result}
          tabIndex={-1}
        >
          {state.message}
        </div>
      )}
      <div className="form-wide">
        <button type="submit" className="button" disabled={pending}>
          {pending ? "Sending request…" : "Schedule a demo"}
          <span aria-hidden="true">↗</span>
        </button>
      </div>
      <p className="form-note form-wide">
        Your details are used to respond to this enquiry. You can also{" "}
        <a href="mailto:contact@ipmsimplified.com">email us</a>
        .
      </p>
    </form>
  );
}
