"use server";
import { headers } from "next/headers";
import { Resend } from "resend";
import {
  demoSchema,
  flattenErrors,
  formValues,
  type FormState,
} from "@/lib/schema";
import { allowRequest, limiterConfigured } from "@/lib/ratelimit";
export async function requestDemo(
  _previous: FormState,
  data: FormData,
): Promise<FormState> {
  const raw = formValues(data);
  const parsed = demoSchema.safeParse(raw);
  if (!parsed.success)
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors: flattenErrors(parsed.error).fieldErrors,
      values: raw as FormState["values"],
    };
  const values = parsed.data;
  if (String(data.get("website") || "").length)
    return {
      status: "error",
      message: "This request could not be submitted.",
      values,
    };
  if (
    !process.env.RESEND_API_KEY ||
    !process.env.DEMO_FROM_EMAIL ||
    (process.env.NODE_ENV === "production" && !limiterConfigured)
  )
    return {
      status: "error",
      message:
        "The demo form is not connected yet. Please email contact@ipmsimplified.com.",
      values,
    };
  try {
    const h = await headers();
    // Vercel overwrites x-vercel-forwarded-for. Do not trust arbitrary forwarded headers on other hosts.
    const ip = process.env.VERCEL
      ? h.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
        "unknown-vercel"
      : process.env.NODE_ENV === "development"
        ? "local-development"
        : "untrusted-host";
    if (!(await allowRequest(ip)))
      return {
        status: "error",
        message:
          "Too many requests. Please try again in 15 minutes or email us.",
        values,
      };
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data: sent, error } = await resend.emails.send({
      from: process.env.DEMO_FROM_EMAIL,
      to: process.env.DEMO_TO_EMAIL || "contact@ipmsimplified.com",
      replyTo: values.email,
      subject: "IPM Simplified — Demo request",
      text: [
        `Name: ${values.name}`,
        `Work email: ${values.email}`,
        `Organisation: ${values.organisation}`,
        `Role: ${values.role}`,
        `Products: ${values.products.join(", ")}`,
        "",
        values.message || "No additional message.",
      ].join("\n"),
    });
    // Success only when the provider acknowledged the message with an id.
    if (error || !sent?.id)
      return {
        status: "error",
        message:
          "Your request could not be delivered. Please try again or email contact@ipmsimplified.com.",
        values,
      };
    return {
      status: "success",
      message:
        "Your request has been sent. The IPM Simplified team will reply to your work email to arrange a conversation.",
    };
  } catch {
    return {
      status: "error",
      message:
        "Your request could not be delivered. Please try again or email contact@ipmsimplified.com.",
      values,
    };
  }
}
