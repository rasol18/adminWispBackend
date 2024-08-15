const Joi = require("joi");

const id = Joi.number().integer();
const model = Joi.string();
const mac = Joi.string().hex();
const notifications = Joi.string().min(3).max(50);
const active = Joi.boolean();
const statistics = Joi.string().min(3).max(50);
const backups = Joi.string().min(3).max(50);
const networkId = Joi.number().integer();
const nodeId = Joi.number().integer();
const limit = Joi.number().integer();
const offset = Joi.number().integer();


const createDeviceSchema = Joi.object({
  model : model,
  mac: mac,
  notifications : notifications,
  active: active,
  statistics: statistics,
  backups:backups,
  networkId: networkId.required(),
  nodeId: nodeId.required()
});

const updateDeviceSchema = Joi.object({
  model : model,
  mac: mac,
  notifications : notifications,
  active: active,
  statistics: statistics,
  backups:backups,
  networkId: networkId
});

const getDeviceSchema = Joi.object({
  id: id.required(),
});

const queryDeviceSchema = Joi.object({
  limit: limit,
  offset : offset
});


module.exports = {getDeviceSchema, updateDeviceSchema, createDeviceSchema, queryDeviceSchema} ;
