// Type Definitions
export type TForm = Record<string, string>

export type Validator = (value: string) => string | false
export type ValidationRule = Validator | typeof OPTIONAL

export type FormErrors<T extends TForm> = { [K in keyof T]?: string | false }

// Metadata used to denote if a field is optional.
// This should be added to the validation chain for optional fields.
export const OPTIONAL = Symbol("optional");

/**
 * Form validation function that takes the form object and a schema object with the same properties
 * And checks each of the validation rules in the schema's field property array.
 * @param {Record<string, string>} form
 * @param {Schema} schema
 * @returns An object with the included errors in the form.
 */
const validateForm = (
  form: TForm,
  schema: { [K in keyof TForm]: ValidationRule[] }
) => {
  const formEntries = Object.entries(form);
  const formErrors: FormErrors<TForm> = {};

  formEntries.forEach(([field, value]) => {
    if (schema[field].includes(OPTIONAL) && value.trim() === "") return;

    for (const validationFunc of schema[field]) {
      if (validationFunc === OPTIONAL) continue;
      const fieldHasError = validationFunc(value);
      if (fieldHasError) formErrors[field] = fieldHasError;

      if (formErrors[field]) break;
    }
  });

  return formErrors;
};

export const formHasErrors = (form: TForm, schema: { [K in keyof TForm]: ValidationRule[] }) => {
  const formErrors = validateForm(form, schema)
  return ({
    hasErrors: Object.values(formErrors).some(val => val),
    fields: formErrors
  })
}