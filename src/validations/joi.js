const language = {
  root: 'value',
  key: 'error.joi.{{label}}_',
  any: {
    required: 'is_required',
    empty: 'not_allowed_empty',
  },
  date: {
    base: 'must_be_valid_date',
  },
};
const defaultOptions = {
  language,
  allowUnknown: true,
};

const validate = (payload, schema, options) => {
  const joiValidationOptions = options ? Object.assign(defaultOptions, options) : defaultOptions;
  const { error, value } = schema.validate(payload, joiValidationOptions);
  if (error) {
    error.isJoi = true;
    throw error;
  }
  return value;
};
export default validate; 