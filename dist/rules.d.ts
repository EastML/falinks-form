import { TForm } from "./validation.js";
export declare const OPTIONAL: unique symbol;
/**
 * Checks if a string is empty or not
 * @param {string} text
 * @returns A failed validation message or false.
 */
export declare const isRequired: (text: string) => false | "Input required";
/**
 * Checks if a string exceeds some arbitrary amount of characters
 * @param {number} limit
 * @returns A failed validation message or false.
 */
export declare const maxLength: (limit: number) => (text: string) => string | false;
/**
 * Checks if a string is below some arbitrary amount of characters
 * @param {number} limit
 * @returns A failed validation message or false.
 */
export declare const minLength: (limit: number) => (text: string) => string | false;
/**
 * Checks if the provided string is a numeric value
 * @param {string} text
 * @returns A failed validation message or false.
 */
export declare const isNumber: (text: string) => false | "Input must be a number";
/**
 * Validate if text is a valid email address like: xxx@xxx.com
 * @param {String} text text to test
 * @returns A failed validation message or false
 */
export declare const isEmail: (text: string) => false | "Invalid email format (ex: person@email.com)";
/**
 * Validates input is the same as another input in the form.
 * @param {String} checkedValue The form value you want this field to be the same as.
 * @returns A failed validation message or false
 */
export declare const matches: (checkedValue: keyof TForm) => (value: string, form: TForm) => false | "Values do not match";
//# sourceMappingURL=rules.d.ts.map