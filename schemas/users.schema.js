const Joi = require("joi");

const id = Joi.number().integer();
const companyId = Joi.number().integer();
const userId = Joi.number().integer();
const username = Joi.string().min(3).max(50);
const password = Joi.string().alphanum();
const email = Joi.string().email();
const active = Joi.boolean();
const service = Joi.string();
const role = Joi.string();
const limit = Joi.number().integer();
const offset = Joi.number().integer();


const createUserSchema = Joi.object({
  username : username.required(),
  password: password.required(),
  email : email.required(),
  active: active,
  service: service.required(),
  role: role.required(),
});

const updateUserSchema = Joi.object({
  username : username,
  password: password,
  email : email,
  active: active,
  service: service,
  role: role,
  companyId : companyId

});

const getUserSchema = Joi.object({
  id: id.required(),
});

const createUser_CompanySchema = Joi.object({
  userId: userId.required(),
  companyId : companyId.required()
});

const queryUserSchema = Joi.object({
  limit: limit,
  offset : offset
});

module.exports = {getUserSchema, createUserSchema, updateUserSchema, createUser_CompanySchema, queryUserSchema} ;
