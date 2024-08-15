const express = require("express");
const nodesService = require('../services/nodes.service');
const validatorHandler = require('../middlewares/validator.handler');
const {updateNodeSchema,createNodeSchema,getNodeSchema, queryNodeSchema} = require('../schemas/nodes.schema');

const router = express.Router();
const service = new nodesService();

router.get('/',
  validatorHandler(queryNodeSchema,'query'),
  async (req, res) => {
  try {
    const nodes =await service.find(req.query);
    return res.json(nodes);
  }catch(err) {
    throw(err);
  }

});

router.post('/',
  validatorHandler(createNodeSchema,'body'),
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
  validatorHandler(getNodeSchema,'params'),
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
  validatorHandler(getNodeSchema,'params'),
  validatorHandler(updateNodeSchema,'body'),
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
    validatorHandler(getNodeSchema,'params'),
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
