const Joi = require('joi');

const validate = require('./validate');

const registerSchema = Joi.object({
  firstName: Joi.string().trim().required().messages({
    'any.required': 'first name is required',
    'string.empty': 'first name is required',
    'string.base': 'first name must be a string',
  }),
  lastName: Joi.string().trim().required().messages({
    'string.empty': 'last name is required',
  }),
  emailOrMobile: Joi.alternatives()
    .try(
      Joi.string().email({ tlds: false }),
      Joi.string().pattern(/^[0-9]{10}$/)
    )
    .messages({
      'alternatives.any': 'must be a valid email address or mobile number',
    })
    .strip(),
  password: Joi.string().alphanum().min(6).trim().required().messages({
    'string.empty': 'password is required',
    'string.alphanum': 'password must only contain 0-9 and a-Z',
    'string.min': 'password must have at least 6 characters',
  }),
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .trim()
    .required()
    .messages({
      'any.only': 'password and confirm password did not match',
      'string.empty': 'confirm password is required',
    })
    .strip(),
  email: Joi.forbidden().when('emailOrMobile', {
    is: Joi.string().email({ tlds: false }),
    then: Joi.string().default(Joi.ref('emailOrMobile')),
  }),
  mobile: Joi.forbidden().when('emailOrMobile', {
    is: Joi.string().pattern(/^[0-9]{10}$/),
    then: Joi.string().default(Joi.ref('emailOrMobile')),
  }),
});

exports.validateRegister = validate(registerSchema);



const loginSchema = Joi.object({
  emailOrMobile: Joi.string().required(),
  password: Joi.string().required(),
});

exports.validateLogin = validate(loginSchema);
