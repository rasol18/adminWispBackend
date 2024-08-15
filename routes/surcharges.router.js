const express = require("express");
const surchargesService = require('../services/surcharges.service');
const validatorHandler = require('../middlewares/validator.handler');
const {updateSurchargeSchema,createSurchargeSchema,getSurchargeSchema, querySurchargeSchema} = require('../schemas/surcharges.schema');

const router = express.Router();
const service = new surchargesService();

router.get('/',
  validatorHandler(querySurchargeSchema,'query'),
  async (req, res) => {
  try {
    const surcharges =await service.find(req.query);
    return res.json(surcharges);
  }catch(err) {
    throw(err);
  }

});

router.post('/',
  validatorHandler(createSurchargeSchema,'body'),
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

router.get('/:id',
  validatorHandler(getSurchargeSchema,'params'),
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
  validatorHandler(getSurchargeSchema,'params'),
  validatorHandler(updateSurchargeSchema,'body'),
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
    validatorHandler(getSurchargeSchema,'params'),
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
