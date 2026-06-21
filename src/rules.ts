import { TForm } from "./validation.js";

// Metadata used to denote if a field is optional.
// This should be added to the validation chain for optional fields.
export const OPTIONAL = Symbol("optional");

/**
 * Checks if a string is empty or not
 * @param {string} text
 * @returns A failed validation message or false.
 */
export const isRequired = (text: string) => text.trim() === "" && "Input required";

/**
 * Checks if a string exceeds some arbitrary amount of characters
 * @param {number} limit
 * @returns A failed validation message or false.
 */
export const maxLength =
    (limit: number) =>
        (text: string) =>
            text.length > limit && `Input too long. (${text.length} / ${limit}) characters`;

/**
 * Checks if a string is below some arbitrary amount of characters
 * @param {number} limit
 * @returns A failed validation message or false.
 */
export const minLength =
    (limit: number) =>
        (text: string) => text.length < limit &&
            `Input too short (${text.length} / ${limit}) characters`

/**
 * Checks if the provided string is a numeric value
 * @param {string} text 
 * @returns A failed validation message or false.
 */
export const isNumber = (text: string) =>
    isNaN(Number(text)) && 'Input must be a number'


const email = (text: string) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(text);

/**
 * Validate if text is a valid email address like: xxx@xxx.com
 * @param {String} text text to test
 * @returns A failed validation message or false
 */
export const isEmail = (text: string) =>
    !email(text) && 'Invalid email format (ex: person@email.com)'

/**
 * Validates input is the same as another input in the form.
 * @param {String} checkedValue The form value you want this field to be the same as.
 * @returns A failed validation message or false
 */
export const matches = (checkedValue: keyof TForm) =>
    (value: string, form: TForm) =>
        value !== form[checkedValue] && "Values do not match";
