/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field } from "../shared/Form";
import { validateImageFile } from "./imageValidation";

export function validateFormFields<T>(
  fields: Field[],
  values: T
): Record<string, string> {
  const errors: Record<string, string> = {};

  fields.forEach((field) => {
    const value = (values as Record<string, any>)[field.name];

    if (field.type === "file") {
      const imageError = validateImageFile(value);
      if (imageError) {
        errors[field.name] = imageError;
      }
      if (field.required && !value) {
        errors[field.name] = "This image is required.";
      }
    } else if (field.required && !value) {
      errors[field.name] = `${field.label} is required.`;
    }
  });

  return errors;
}
