const Joi = require("joi");

const id = Joi.number().integer();
const discount = Joi.number().integer();
const active = Joi.boolean();
const companyId = Joi.number().integer();
const clientId = Joi.number().integer();
const productId = Joi.number().integer();
const planId = Joi.number().integer();
const surchargeId = Joi.number().integer();
const billId = Joi.number().integer();
const prepaid = Joi.boolean();
const until_at = Joi.date();
const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createBillSchema = Joi.object({
  discount : discount,
  active: active,
  companyId: companyId.required(),
  clientId: clientId.required(),
  prepaid : prepaid,
  until_at: until_at,
});

const addProductSchema = Joi.object({
  productId : productId.required(),
  billId: billId.required(),
});

const addPlanSchema = Joi.object({
  planId: planId.required(),
  billId: billId.required(),
});

const addSurchargeSchema = Joi.object({
  surchargeId: surchargeId.required(),
  billId: billId.required(),
});

const updateBillSchema = Joi.object({
  discount : discount,
  active: active,
  companyId: companyId,
  prepaid : prepaid,
  until_at: until_at
});

const getBillSchema = Joi.object({
  id: id.required(),
});

const queryBillSchema = Joi.object({
  limit: limit,
  offset : offset
});

module.exports = {getBillSchema, createBillSchema, updateBillSchema, addProductSchema, addPlanSchema, addSurchargeSchema, queryBillSchema} ;
