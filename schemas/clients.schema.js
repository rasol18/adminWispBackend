const Joi = require("joi");

const id = Joi.number().integer();
const companyId = Joi.number().integer();
const fullname = Joi.string().min(3).max(50);
const dni = Joi.number().integer();
const phone = Joi.number().integer();
const address = Joi.string().pattern(/^[a-zA-Z0-9\s,.-]+$/);
const password = Joi.string().alphanum();
const active = Joi.boolean();
const latitude = Joi.string();
const longitude = Joi.string();
const email = Joi.string().email();
const clientId = Joi.number().integer();
const deviceId = Joi.number().integer();
const limit = Joi.number().integer();
const offset = Joi.number().integer();
const instalationDate = Joi.date();
const plan = Joi.string();
const planId = Joi.number().integer();
const products = Joi.array().items(Joi.number().integer());


const createClientSchema = Joi.object({
  fullname : fullname.required(),
  dni: dni,
  latitude : latitude,
  longitude: longitude,
  phone: phone,
  address: address.required(),
  password: password,
  active: active,
  email : email,
  companyId: companyId.required(),
  instalationDate:instalationDate,
  plan: plan,
  planId: planId
});

const updateClientSchema = Joi.object({
  fullname : fullname,
  dni: dni,
  latitude : latitude,
  longitude: longitude,
  phone: phone,
  address: address,
  email : email,
  password: password,
  active: active,
  companyId: companyId.required(),
  instalationDate:instalationDate,
  plan: plan,
  planId: planId,
  products: products
});

const getClientSchema = Joi.object({
  id: id.required(),
});

const AddDeviceSchema = Joi.object({
  clientId: clientId.required(),
  deviceId : deviceId.required()
});

const queryClientSchema = Joi.object({
  limit: limit,
  offset : offset
});

module.exports = {getClientSchema, createClientSchema, updateClientSchema, AddDeviceSchema, queryClientSchema} ;
