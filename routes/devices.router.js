const express = require("express");
const devicesService = require('../services/devices.service');
const validatorHandler = require('../middlewares/validator.handler');
const {updateDeviceSchema,createDeviceSchema,getDeviceSchema, queryDeviceSchema} = require('../schemas/devices.schema');

const router = express.Router();
const service = new devicesService();

router.get('/',
  validatorHandler(queryDeviceSchema,'query'),
  async (req, res) => {
  try {
    const devices =await service.find(req.query);
    return res.json(devices);
  }catch(err) {
    throw(err);
  }

});

router.post('/',
  validatorHandler(createDeviceSchema,'body'),
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
  validatorHandler(getDeviceSchema,'params'),
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
  validatorHandler(getDeviceSchema,'params'),
  validatorHandler(updateDeviceSchema,'body'),
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
    validatorHandler(getDeviceSchema,'params'),
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
