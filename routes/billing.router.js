const express = require("express");
const billingService = require('../services/billing.service');
const validatorHandler = require('../middlewares/validator.handler');
const {updateBillSchema,createBillSchema,getBillSchema, addProductSchema, addPlanSchema, addSurchargeSchema, queryBillSchema} = require('../schemas/billing.schema');

const router = express.Router();
const service = new billingService();

router.get('/',
  validatorHandler(queryBillSchema,'query'),
  async (req, res) => {
  try {
    const billing =await service.find(req.query);
    return res.json(billing);
  }catch(err) {
    throw(err);
  }

});

router.post('/',
  validatorHandler(createBillSchema,'body'),
  async(req, res, next)=> {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
    }catch(err) {
      next(err);
    }
  }
);

router.post('/addProduct',
  validatorHandler(addProductSchema,'body'),
  async(req, res, next)=> {
    try {
      const body = req.body;
      const addProduct = await service.addProduct(body);
      res.status(201).json(addProduct);
    }catch(err) {
      next(err);
    }
  }
);

router.post('/addPlan',
  validatorHandler(addPlanSchema,'body'),
  async(req, res, next)=> {
    try {
      const body = req.body;
      const addPlan = await service.addPlan(body);
      res.status(201).json(addPlan);
    }catch(err) {
      next(err);
    }
  }
);

router.post('/addSurcharge',
  validatorHandler(addSurchargeSchema,'body'),
  async(req, res, next)=> {
    try {
      const body = req.body;
      const addSurcharge = await service.addSurcharge(body);
      res.status(201).json(addSurcharge);
    }catch(err) {
      next(err);
    }
  }
);

router.get('/:id',
  validatorHandler(getBillSchema,'params'),
  async(req,res,next)=>{
    try{
      const{id}=req.params;
      const category=await service.findOne(id);
      res.json(category);
    }
    catch(error){
      next(error);}
    });

router.patch('/:id',
  validatorHandler(getBillSchema,'params'),
  validatorHandler(updateBillSchema,'body'),
  async(req,res,next)=>{
    try{
      const{id}=req.params;
      const body=req.body;
      const category=await service.update(id,body);
      res.json(category);
    }
    catch(error){
      next(error);}
    });

router.delete('/:id',
    validatorHandler(getBillSchema,'params'),
    async(req,res,next)=>{
      try{
        const{id}=req.params;
        await service.delete(id);
        res.status(201).json({id});
      }
      catch(error){
        next(error);}
      });

module.exports = router ;
