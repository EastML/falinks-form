// Metadata used to denote if a field is optional.

import { Schema } from "./types.js";

// This should be added to the validation chain for optional fields.
export const OPTIONAL = Symbol("optional");

/**
 * Form validation function that takes the form object and a schema object with the same properties
 * And checks each of the validation rules in the schema's field property array.
 * @param {Record<string, string>} form
 * @param {Schema} schema
 * @returns An object with the included errors in the form.
 */
export const validateForm = <T extends Record<string, string>>(
  form: Record<string, string>,
  schema: Schema<T>,
) => {
  const formEntries = Object.entries(form);
  const formErrors: Partial<Record<keyof T, string>> = {};

  // Loop through each form entry
  formEntries.forEach(([field, value]) => {
    // if the field isn't required, and it's blank, skip it.
    if (schema[field].includes(OPTIONAL) && value.trim() === "") return;
    // each schema property is an array of validation functions.
    // we loop through each of them to make sure the form field is valid.
    for (const validationFunc of schema[field]) {
      // step over this iteration if the validation is the optional keyword
      if (validationFunc === OPTIONAL) continue;
      // If it's not valid (function returns true), we set the field name property in formErrors to the name of the error.
      const fieldHasError = validationFunc(value);
      if (fieldHasError) formErrors[field] = fieldHasError;

      // Once we encounter an error with a form field, there is no reason to continue checking.
      if (formErrors[field]) break;
    }
  });

  return formErrors;
};

/**
 * Checks if a string exceeds some arbitrary amount of characters
 * @param {string} text
 * @param {number} limit
 * @returns An error message or false.
 */
export const tooLong = (text, limit) =>
  text.length >= limit &&
  `${limit}文字まで入力してください。（${text.length} / ${limit}）`;

/**
 * Checks if a string is below some arbitrary amount of characters
 * @param {string} text
 * @param {number} limit
 * @returns An error message or false.
 */
export const tooShort = (text, limit) =>
  text.length <= limit &&
  `少なくとも${limit}文字を入力してください。（${text.length} / ${limit}）`;

/**
 * Checks if a string is empty or not
 * @param {string} text
 * @returns An error message or false.
 */
export const isRequired = (text) => text.trim() === "" && "この項目は必須です";

/**
 * Checks if a string contains only katakana characters
 * @param {string} text
 * @returns An error message or false.
 */
export const isKatakana = (text) =>
  /^\p{Script=Katakana}+$/u.test(text) && "カタカナ文字のみを入力してください";

/**
 * Checks if a string contains characters other than katakana
 * @param {string} text
 * @returns An error message or false.
 */
export const isNotKatakana = (text) =>
  !isKatakana(text) && "カタカナ文字は使用できません";

/**
 * Checks if a string contains only hiragana characters
 * @param {string} text
 * @returns An error message or false.
 */
export const isHiragana = (text) =>
  /^\p{Script=Hiragana}+$/u.test(text) && "ひらがな文字のみを入力してください";

/**
 * Checks if a string contains characters other than hiragana
 * @param {string} text
 * @returns An error message or false.
 */
export const isNotHiragana = (text) =>
  !isHiragana(text) && "ひらがな文字は使用できません";

const isPhoneNumber = (text) =>
  /^\d{2}(?:-\d{4}-\d{4}|\d{8}|\d-\d{3,4}-\d{4})$/.test(text);

/**
 * Validate if text is a Japanese phone number.
 * Dashes that separate the digit groups are optional and accepted.
 * @param {String} text text to test
 * @returns true if it's a phone number, false otherwise
 */
export const isNotPhoneNumber = (text) =>
  !isPhoneNumber(text) && "有効な電話番号を入力してください";

export const isDashedPhoneNumber = (text) => /^\d{2,3}-\d{4}-\d{4}$/.test(text);

/**
 * Validate if text is a dash-separated Japanese phone number like: 01-2345-6789 or 012-2345-6789
 * Dashes are not optional.
 * @param {String} text text to test
 * @returns error message if it's not a phone number in the mentinoned format, false otherwise
 */
export const isNotDashedPhoneNumber = (text) =>
  !isDashedPhoneNumber(text) &&
  "電話番号はハイフン（-）を含めて入力してください（例：012-3456-7890）。";

const isEmail = (text) =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(text);

/**
 * Validate if text is a valid email address like: xxx@xxx.com
 * @param {String} text text to test
 * @returns error message if it is not an email address, false otherwise
 */
export const isNotEmail = (text) =>
  !isEmail(text) &&
  "メールアドレスを正しい形式で入力してください（例：taro.yamada@abc.com）";

/**
 * Validate if text is a Japanese zip code: 123-4567 or 1234567
 * Dash is aptional.
 * @param {String} text text to test
 * @returns true if it's a zip code in the mentinoned format, false otherwise
 */
export const isZipCode = (text) => /^\d{3}-?\d{4}$/.test(text);

/**
 * @see isZipCode
 */
export const isNotZipCode = (text) =>
  !isZipCode(text) &&
  "郵便番号はハイフンを含めて（xxx-xxxx）の形式で入力してください。";

/**
 * Validate if text is a dash-separated Japanese zip code: 123-4567
 * Dash is not optional.
 * @param {String} text text to test
 * @returns true if it's a zip code in the mentinoned format, false otherwise
 */
export const isDashedZipCode = (text) => /^\d{3}-\d{4}$/.test(text);

export const isNotDashedZipCode = (text) =>
  !isDashedZipCode(text) &&
  "郵便番号はハイフン（-）を含めて入力してください（例：123-4567）。";

const PROFILE_FIELD_MAX_LENGTH = 255;

const fieldTooLong = (text) => tooLong(text, PROFILE_FIELD_MAX_LENGTH);

const profileFormSchema = {
  lastName: [optional, fieldTooLong],
  firstName: [optional, fieldTooLong],
  lastNameFurigana: [optional, isNotHiragana],
  firstNameFurigana: [optional, isNotHiragana],
  company: [optional, fieldTooLong],
  department: [optional, fieldTooLong],
  title: [optional, fieldTooLong],
  email: [optional, fieldTooLong, isNotEmail],
  phone: [optional, isNotPhoneNumber, isNotDashedPhoneNumber],
  zipCode: [optional, isNotZipCode, isNotDashedZipCode],
  prefecture: [optional, fieldTooLong],
  municipality: [optional, fieldTooLong],
  city: [optional, fieldTooLong],
  street: [optional, fieldTooLong],
  building: [optional, fieldTooLong],
};
