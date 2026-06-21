# 🐾 Falinks

Falinks is a tiny, incredibly lightweight, type-safe form validation library for JavaScript/TypeScript inspired by functional validation chains.

It focuses on **composable validation rules**, **straightforward form-based schema**, and an incredibly simple and minimal API.

Like its Pokémon namesake, it works as a chain of small units acting as one system.

### ✨ Features
- 📦 Minimal API
- ⚡ Simple schema-based validation
- 🧩 Out-of-the-box ready or custom composable validation rules
- 🧠 Type-safe form keys (TypeScript)
- 🚫 Optional field support via validation chain
- 🔗 Functional / chainable validator design
- ⛓️‍💥Framework agnostic. It works with React, Vue, Svelte, Vanilla JS, Node, and more.


### 📦 Installation

```bash
npm install falinks
```

## 🤔 Basic Usage

1. Define your form values as an object.
2. Create a schema object with the same property names as your form.
3. Fill in the validation rules as an array of functions in your schema.
4. Call the `formHasErrors` api, passing in the form and schema.
5. `formHasErrors` exposes the `hasErrors` and `fields`, which you can then use as you see fit to handle errors during form submissions. 

### Example
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

### Example Output

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

## ⭐ Core Concepts

Falinks validates forms using a schema-driven validation chain:
```js 
const schema = {
  fieldName: [rule1, rule2, rule3]
}
```
Each rule runs in order until:
- a validation test is failed
- all validation tests are passed

### Core API

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

## 🧰 Out-of-the-box Validation Functions
Falinks provides a few out of the box validation functions for you to use. They are defined below.

### Optional Fields
Use `OPTIONAL` in a validation chain to skip validation when a field is empty:

```js
const schema = {
  email: [OPTIONAL, isEmail],
};
```
Behavior:
- If the field is empty → skip all validation
- Otherwise → run rules normally

### Required Field
Ensures a value is not empty.

`isRequired(text: string)`

```js
const schema = {
  fieldName: [isRequired] // "Input required"
}
```

### Maximum Length
Ensures text is below a maximum length.

`maxLength(limit: number)`

```js
const schema = {
  fieldName: [maxLength(5)] // "Input too long (8 / 5） characters"
}
```

### Minimum Length
Ensures text is above a minimum length.

`minLength(limit: number)`

```js
const schema = {
  fieldName: [tooShort(5)] // "Input too short (3 / 5）characters"
}
```

### Number Required
Ensures the input is numeric.

`isNumber(text: string)`

```js
const schema = {
  fieldName: [isNumber] // "Input must be a number"
}
```

### Email Format 
Validates email format.

`isEmail(text: string)`

```js
const schema = {
  fieldName: [isEmail] // "Invalid email format (ex: person@email.com)"
}
```

### Matches Field
Cross-field validation (e.g. confirm password).

`matches(fieldName: string)`

```js
const schema = {
  fieldName: [matches('password')] // "Values do not match"
}
```

## Example Full Form
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
  password: [isRequired, minLength(8)],
  confirmPassword: [isRequired, matches('password')],
};

const result = formHasErrors(form, schema);
// Optionally you can just destructure in the following way:
// const { hasError, fields } = formHasErrors(form, schema)

if (result.hasErrors) {
  console.log(result.fields);
}
```

## 🤩 Create Your Own Custom Validation

If you would like to implement validation that is not covered by the out-of-the-box validation that Falinks provides, you can also simply add in your own validation function and add it to the validation array.

```js
// Custom validation function

const zipCodeUS = (value: string) => {
  const zipCodeRegex = /^\d{5}(-\d{4})?$/
  const isZipCode = zipCodeRegex.test(value)
  
  // It should return either the validation message (if the validation fails)
  // or false (if the validation succeeds)
  return !isZipCode && "Incorrect zip code format"
}

const form = {
  zipCode: '123567' // wrong format
}

const schema = {
  zipCode: [required, zipCodeUS]
}

const { hasErrors, fields } = fieldHasErrors(form, schema)
// hasErrors: true
// fields: { zipCode: 'Incorrect zip code format'}
```

## 📌 Notes
- Validation stops at the first failing rule per field
- Empty fields can be skipped using OPTIONAL 
- All form values are treated as strings
