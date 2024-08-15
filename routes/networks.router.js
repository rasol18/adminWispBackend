const express = require("express");
const networksService = require('../services/networks.service');
const validatorHandler = require('../middlewares/validator.handler');
const {updateNetworkSchema,createNetworkSchema,getNetworkSchema, queryNetworkSchema} = require('../schemas/networks.schema');

const router = express.Router();
const service = new networksService();

router.get('/',
  validatorHandler(queryNetworkSchema,'query'),
  async (req, res) => {
  try {
    const networks =await service.find(req.query);
    return res.json(networks);
  }catch(err) {
    throw(err);
  }

});

router.post('/',
  validatorHandler(createNetworkSchema,'body'),
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
  validatorHandler(getNetworkSchema,'params'),
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
  validatorHandler(getNetworkSchema,'params'),
  validatorHandler(updateNetworkSchema,'body'),
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
    validatorHandler(getNetworkSchema,'params'),
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
