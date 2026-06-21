import { OPTIONAL } from "./rules.js";
/**
 * Form validation function that takes the form object and a schema object with the same properties
 * And checks each of the validation rules in the schema's field property array.
 * @param {Record<string, string>} form
 * @param {Schema} schema
 * @returns An object with the included errors in the form.
 */
const validateForm = (form, schema) => {
    const paramsAreNotObjects = typeof form !== 'object' || typeof schema !== 'object';
    const formKeysNotInSchema = Object.keys(form).some(val => Object.keys(schema).indexOf(val) === -1);
    if (paramsAreNotObjects)
        throw new Error('Falinks: The provided form and/or schema is not an object');
    if (formKeysNotInSchema)
        throw new Error('Falinks: The schema fields and form fields do not match.');
    const formEntries = Object.entries(form);
    const formErrors = {};
    formEntries.forEach(([field, value]) => {
        if (schema[field].includes(OPTIONAL) && value.trim() === "")
            return;
        for (const validationFunc of schema[field]) {
            // If the validationFunc is instead the OPTIONAL symbol, skip and go to the next.
            if (validationFunc === OPTIONAL)
                continue;
            // Check if there is a field error based on the validation function
            const fieldHasError = validationFunc(value, form);
            // If there is an error, set the error to the formErrors property of the same name.
            if (fieldHasError)
                formErrors[field] = fieldHasError;
            // If there are any errors, end he run, and just got ot he next form field.
            if (formErrors[field])
                break;
        }
    });
    return formErrors;
};
export const formHasErrors = (form, schema) => {
    const formErrors = validateForm(form, schema);
    return ({
        hasErrors: Object.values(formErrors).some(val => val),
        fields: formErrors
    });
};
