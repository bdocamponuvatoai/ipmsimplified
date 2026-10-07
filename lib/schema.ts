import * as z from "zod/mini";
export const flattenErrors = z.flattenError;
export const roles = [
  "Jurisdiction",
  "Contractor",
  "Owner or manager",
  "Other",
] as const;
export const interests = [
  "InspectionSimplified",
  "PermitSimplified",
  "MaintenanceSimplified",
] as const;
export const demoSchema = z.object({
  name: z
    .string()
    .check(
      z.trim(),
      z.minLength(2, "Enter your name."),
      z.maxLength(100, "Use 100 characters or fewer."),
    ),
  email: z.email("Enter a valid work email.").check(z.maxLength(254)),
  organisation: z
    .string()
    .check(
      z.trim(),
      z.minLength(2, "Enter your organisation."),
      z.maxLength(150),
    ),
  role: z.enum(roles, { error: "Choose your role." }),
  products: z
    .array(z.enum(interests))
    .check(z.minLength(1, "Choose at least one product."), z.maxLength(3)),
  message: z.optional(
    z
      .string()
      .check(z.trim(), z.maxLength(3000, "Use 3,000 characters or fewer.")),
  ),
});
export type DemoInput = z.infer<typeof demoSchema>;
export type FormState = {
  status: "idle" | "error" | "success";
  message?: string;
  errors?: Record<string, string[]>;
  values?: Partial<DemoInput>;
};
export function formValues(data: FormData) {
  return {
    name: String(data.get("name") || ""),
    email: String(data.get("email") || ""),
    organisation: String(data.get("organisation") || ""),
    role: String(data.get("role") || ""),
    products: data.getAll("products").map(String),
    message: String(data.get("message") || ""),
  };
}
