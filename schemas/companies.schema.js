const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string().min(3).max(50);
const address = Joi.string().pattern(/^[a-zA-Z0-9\s,.-]+$/);
const cuit = Joi.number().integer();
const logo = Joi.number().integer();
const active = Joi.boolean();
const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createCompanySchema = Joi.object({
  name : name.required(),
  cuit: cuit,
  logo : logo,
  address: address,
  active: active
});

const updateCompanySchema = Joi.object({
  name : name,
  cuit: cuit,
  logo : logo,
  address: address,
  active: active
});

const getCompanySchema = Joi.object({
  id: id.required(),
});

const queryCompanySchema = Joi.object({
  limit: limit,
  offset : offset
});
module.exports = {createCompanySchema, updateCompanySchema, getCompanySchema, queryCompanySchema} ;
