const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string().min(3).max(50);
const price = Joi.number().integer();
const download = Joi.number().integer();
const upload = Joi.number().integer();
const active = Joi.boolean();
const billingText = Joi.string();
const addressList = Joi.string();
const parents = Joi.string();
const limit = Joi.number().integer();
const offset = Joi.number().integer();
const limitAt = Joi.number().integer();
const burstLimit = Joi.number().integer();
const burstThreshold = Joi.number().integer();
const burstTime = Joi.number().integer();
const priority = Joi.number().integer();


const createPlanSchema = Joi.object({
  name : name.required(),
  price: price.required(),
  download : download.required(),
  active: active,
  upload: upload.required(),
  billingText: billingText,
  addressList:addressList,
  parents:parents,
  limitAt:limitAt,
  burstLimit:burstLimit,
  burstThreshold:burstThreshold,
  burstTime:burstTime,
  priority:priority
});

const updatePlanSchema = Joi.object({
  name : name.required(),
  price: price.required(),
  download : download.required(),
  active: active,
  upload: upload.required(),
  billingText: billingText,
  addressList:addressList,
  parents:parents,
  limitAt:limitAt,
  burstLimit:burstLimit,
  burstThreshold:burstThreshold,
  burstTime:burstTime,
  priority:priority
});

const getPlanSchema = Joi.object({
  id: id.required(),
});

const queryPlanSchema = Joi.object({
  limit: limit,
  offset : offset
});

module.exports = {getPlanSchema, updatePlanSchema, createPlanSchema, queryPlanSchema} ;
