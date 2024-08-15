const express = require("express");
const productsService = require('../services/products.service');
const validatorHandler = require('../middlewares/validator.handler');
const {updateProductSchema,createProductSchema,getProductSchema, queryProductSchema} = require('../schemas/products.schema');

const router = express.Router();
const service = new productsService();

router.get('/',
  validatorHandler(queryProductSchema,'query'),
  async (req, res) => {
  try {
    const products =await service.find(req.query);
    return res.json(products);
  }catch(err) {
    throw(err);
  }

});

router.post('/',
  validatorHandler(createProductSchema,'body'),
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
  validatorHandler(getProductSchema,'params'),
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
  validatorHandler(getProductSchema,'params'),
  validatorHandler(updateProductSchema,'body'),
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
    validatorHandler(getProductSchema,'params'),
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
