// ♻️ Reusable: Form validation helpers used across Login, Register, Profile pages
export const validators = {
  required: (value) => (value?.trim() ? null : 'This field is required'),
  email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : 'Enter a valid email address'),
  minLength: (min) => (value) =>
    value?.length >= min ? null : `Must be at least ${min} characters`,
  maxLength: (max) => (value) =>
    value?.length <= max ? null : `Cannot exceed ${max} characters`
};

// ♻️ Runs an array of validator fns and returns first error
export const runValidators = (value, fns) => {
  for (const fn of fns) {
    const err = fn(value);
    if (err) return err;
  }
  return null;
};