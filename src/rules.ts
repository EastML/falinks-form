/**
 * Checks if a string is empty or not
 * @param {string} text
 * @returns An error message or false.
 */
export const isRequired = (text: string) => text.trim() === "" && "Input required";

/**
 * Checks if a string exceeds some arbitrary amount of characters
 * @param {string} text
 * @param {number} limit
 * @returns An error message or false.
 */
export const maxLength = (text: string, limit: number) =>
    text.length >= limit &&
    `Input too long. (${text.length} / ${limit}) characters`;

/**
 * Checks if a string is below some arbitrary amount of characters
 * @param {string} text
 * @param {number} limit
 * @returns An error message or false.
 */
export const minLength = (text: string, limit: number) =>
    text.length <= limit &&
    `Input too short (${text.length} / ${limit}） characters`

export const isNumber = (text: string) =>
    isNaN(Number(text)) && 'Input must be a number'

const email = (text: string) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(text);

/**
 * Validate if text is a valid email address like: xxx@xxx.com
 * @param {String} text text to test
 * @returns error message if it is not an email address, false otherwise
 */
export const isEmail = (text: string) =>
    !email(text) && 'Invalid email format (ex: person@email.com)'

export const matches = (getValue: () => string) => (value: string) => value !== getValue() && "Values do not match";
