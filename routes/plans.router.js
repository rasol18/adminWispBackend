const express = require("express");
const plansService = require('../services/plans.service');
const validatorHandler = require('../middlewares/validator.handler');
const {updatePlanSchema,createPlanSchema,getPlanSchema, queryPlanSchema} = require('../schemas/plans.schema');

const router = express.Router();
const service = new plansService();

router.get('/',
  validatorHandler(queryPlanSchema,'query'),
  async (req, res) => {
  try {
    const plans =await service.find(req.query);
    return res.json(plans);
  }catch(err) {
    throw(err);
  }

});

router.post('/',
  validatorHandler(createPlanSchema,'body'),
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
  validatorHandler(getPlanSchema,'params'),
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
  validatorHandler(getPlanSchema,'params'),
  validatorHandler(updatePlanSchema,'body'),
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
    validatorHandler(getPlanSchema,'params'),
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
