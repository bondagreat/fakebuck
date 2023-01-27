import Joi from 'joi';

const registerSchema = Joi.object({
  firstName: Joi.string().trim().required().messages({
    'string.empty': 'first name is required'
  }),
  lastName: Joi.string().trim().required().messages({
    'string.empty': 'last name is required'
  }),
  emailOrMobile: Joi.alternatives().try(
    Joi.string().email({ tlds: false }),
    Joi.string().pattern(/^[0-9]{10}$/)
  ).messages({
    'alternatives.any': 'must be a valid email address or mobile number'
  }),
  password: Joi.string().alphanum().min(6).trim().required().messages({
    'string.empty': 'password is required',
    'string.alphanum': 'password must only contain 0-9 and a-Z',
    'string.min': 'password must have at least 6 characters'
  }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).trim().required().messages({
    'any.only': 'password and confirm password did not match',
    'string.empty': 'confirm password is required'
  }),
});

const validateRegister = (input) => {
  const { error } = registerSchema.validate(input, {
    abortEarly: false,
  });

  if (error) {
    const result = error.details.reduce((acc, el) => {
      acc[el.path[0]] = el.message;
      return acc;
    }, {});
    return result;
  }
};

export default validateRegister;
