const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string().min(3).max(50);
const price = Joi.number().integer();
const description = Joi.string().min(3).max(50);
const active = Joi.boolean();
const limit = Joi.number().integer();
const offset = Joi.number().integer();
const billingText = Joi.string();


const createSurchargeSchema = Joi.object({
  name : name.required(),
  price: price.required(),
  description : description,
  active: active,
  billingText: billingText
});

const updateSurchargeSchema = Joi.object({
  name : name,
  price: price,
  description : description,
  active: active,
  billingText: billingText
});

const getSurchargeSchema = Joi.object({
  id: id.required(),
});

const querySurchargeSchema = Joi.object({
  limit: limit,
  offset : offset
});

module.exports = {getSurchargeSchema, updateSurchargeSchema, createSurchargeSchema, querySurchargeSchema} ;
