import { OPTIONAL } from "./validations.js";

export type Validator = (value: string | number) => string | false;

export type ValidationRule = Validator | typeof OPTIONAL;

export type Schema<T extends Record<string, unknown>> = {
  [K in keyof T]: ValidationRule[];
};
