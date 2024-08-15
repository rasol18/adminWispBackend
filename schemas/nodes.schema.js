const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string().min(3).max(50);
const address = Joi.string().pattern(/^[a-zA-Z0-9\s,.-]+$/);
const phone = Joi.boolean();
const location = Joi.string().pattern(/^[a-zA-Z0-9\s,.-]+$/);
const active = Joi.boolean();
const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createNodeSchema = Joi.object({
  name : name,
  address: address,
  phone : phone,
  location: location,
  active: active,
});

const updateNodeSchema = Joi.object({
  name : name,
  address: address,
  phone : phone,
  location: location,
  active: active,
});

const getNodeSchema = Joi.object({
  id: id.required(),
});

const queryNodeSchema = Joi.object({
  limit: limit,
  offset : offset
});

module.exports = {getNodeSchema, createNodeSchema, updateNodeSchema, queryNodeSchema} ;
