import { matches, OPTIONAL } from "./rules.js";

// Type Definitions
export type TForm = Record<string, string>

export type Validator = (value: string, form: TForm) => string | false
export type ValidationRule = Validator | typeof OPTIONAL

export type FormErrors<T extends TForm> = { [K in keyof T]?: string | false }

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
  const paramsAreNotObjects = typeof form !== 'object' || typeof schema !== 'object'
  const formKeysNotInSchema = Object.keys(form).every(val => Object.keys(schema).includes(val))

  if (paramsAreNotObjects) throw new Error('Falinks: The provided form and/or schema is not an object')
  if (formKeysNotInSchema) throw new Error('Falinks: The schema fields and form fields do not match.')

  const formEntries = Object.entries(form);
  const formErrors: FormErrors<TForm> = {};

  formEntries.forEach(([field, value]) => {
    if (schema[field].includes(OPTIONAL) && value.trim() === "") return;

    for (const validationFunc of schema[field]) {
      // If the validationFunc is instead the OPTIONAL symbol, skip and go to the next.
      if (validationFunc === OPTIONAL) continue;
      // Check if there is a field error based on the validation function
      const fieldHasError = validationFunc(value, form);
      // If there is an error, set the error to the formErrors property of the same name.
      if (fieldHasError) formErrors[field] = fieldHasError;
      // If there are any errors, end he run, and just got ot he next form field.
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