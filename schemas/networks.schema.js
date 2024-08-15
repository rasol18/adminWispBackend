const Joi = require("joi");

const id = Joi.number().integer();
const nodeId = Joi.number().integer();
const companyId = Joi.number().integer();
const ipRange = Joi.string().ip({
  version: [
    'ipv4',
    'ipv6'
  ],
  cidr: 'required'
});
const name = Joi.string().min(3).max(50);
const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createNetworkSchema = Joi.object({
  name : name,
  ipRange: ipRange.required(),
  nodeId: nodeId.required(),
  companyId: companyId.required(),
});

const updateNetworkSchema = Joi.object({
  name : name,
  ipRange: ipRange,
  nodeId: nodeId,
  companyId:companyId,
});

const getNetworkSchema = Joi.object({
  id: id.required(),
});

const queryNetworkSchema = Joi.object({
  limit: limit,
  offset : offset
});

module.exports = {createNetworkSchema, updateNetworkSchema, getNetworkSchema, queryNetworkSchema} ;
