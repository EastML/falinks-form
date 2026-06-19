# 🐾 Falinks

Falinks is a tiny, type-safe form validation library for JavaScript/TypeScript inspired by functional validation chains.

It focuses on **composable validation rules**, **per-field schemas**, and an incredibly simple and minimal API .

Only one function is exposed publicly: `formHasErrors`.

---

## ✨ Features

- ⚡ Simple schema-based validation
- 🧩 Composable validation rules
- 🧠 Type-safe form keys (TypeScript)
- 🚫 Optional field support via validation chain
- 🔗 Functional / chainable validator design
- 📦 Minimal API (only `formHasErrors` is exposed)

---

## 📦 Installation

```bash
npm install falinks
```

# Basic Usage

## Example
```js
import { formHasErrors, isRequired, isEmail } from "falinks";

const form = {
  email: "",
  password: "",
};

const schema = {
  email: [isRequired, isEmail],
  password: [isRequired],
};

const result = formHasErrors(form, schema);

console.log(result.hasErrors);
console.log(result.fields);
```

## Example Output

```ts
{
  hasErrors: boolean,
  fields: {
    email?: string,
    password?: string
  }
}
```
- hasErrors: true if any validation failed
- fields: object containing field-level error messages

# Core Concept

Falinks validates forms using a schema-driven validation chain:
```js 
schema[field] = [rule1, rule2, rule3]
```
Each rule runs in order until:
- a validation test is failed
- all validation tests are passed

## Core API

`formHasErrors(form, schema)`
The only exported function from Falinks.

```js
formHasErrors(form, schema)
```
#### Parameters
- `form`: object of string values
- `schema`: validation rules per field

#### Returns
```js
{
  hasErrors: boolean;
  fields: Record<string, string | false>;
}
```

# Optional Fields
Use `OPTIONAL` in a validation chain to skip validation when a field is empty:

```js
import { OPTIONAL, isEmail } from "falinks";

const schema = {
  email: [OPTIONAL, isEmail],
};
```
Behavior:
- If the field is empty → skip all validation
- Otherwise → run rules normally

# Built-in Validation Rules

## Required Field
`isRequired(text: string)`
Ensures a value is not empty.

```js
isRequired(" ") // "Input required"
```

## Minimum Length
`minLength(text: string, limit: number)`
Ensures text is above a minimum length.

```js
minLength("abc", 5) // "Input too short (3 / 5） characters"
```

## Maximum Length
`maxLength(text: string, limit: number)`
Ensures text is below a maximum length.

```js
maxLength("hello world", 5) // "Input too long. (11 / 5) characters"
```

## Number Required
`isNumber(text: string)`
Ensures the input is numeric.

```js
isNumber("abc") // "Input must be a number"
```

## Email Format 
`isEmail(text: string)`
Validates email format.

```js
isEmail("not-an-email") // "Invalid email format (ex: person@email.com)"
```

## Matches Field
`matches(getValue: () => string)`
Cross-field validation (e.g. confirm password).

```js
matches(() => form.password)
```

# 🐉 Philosophy

Falinks is designed around:
- Small, composable validation units
- Functional programming style
- Predictable, explicit schemas
- Minimal API surface (no bloat)

Like its Pokémon namesake, it works as a chain of small units acting as one system.

# Example Full Form
```js
import {
  formHasErrors,
  isRequired,
  isEmail,
  minLength,
  matches,
} from "falinks";

const form = {
  email: "",
  password: "",
  confirmPassword: "",
};

const schema = {
  email: [isRequired, isEmail],
  password: [isRequired, minLength],
  confirmPassword: [
    isRequired,
    matches(() => form.password),
  ],
};

const result = formHasErrors(form, schema);

if (result.hasErrors) {
  console.log(result.fields);
}
```

# 📌 Notes
- Validation stops at the first failing rule per field
- Empty fields can be skipped using OPTIONAL
- All form values are treated as strings