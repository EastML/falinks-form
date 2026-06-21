import { OPTIONAL } from "./rules.js";
export type TForm = Record<string, string>;
export type Validator = (value: string, form: TForm) => string | false;
export type ValidationRule = Validator | typeof OPTIONAL;
export type FormErrors<T extends TForm> = {
    [K in keyof T]?: string | false;
};
export declare const formHasErrors: (form: TForm, schema: { [K in keyof TForm]: ValidationRule[]; }) => {
    hasErrors: boolean;
    fields: FormErrors<TForm>;
};
//# sourceMappingURL=validation.d.ts.map