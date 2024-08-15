const express = require("express");
const companiesService = require('../services/companies.service');
const validatorHandler = require('../middlewares/validator.handler');
const {checkRoles} = require('../middlewares/auth.handler');
const {updateCompanySchema,createCompanySchema,getCompanySchema, queryCompanySchema} = require('../schemas/companies.schema');
const passport = require('passport');

const router = express.Router();
const service = new companiesService();

router.get('/',
  validatorHandler(queryCompanySchema,'query'),
  async (req, res) => {
  try {
    const companies =await service.find(req.query);
    return res.json(companies);
  }catch(err) {
    throw(err);
  }

});

router.post('/',
  passport.authenticate('jwt', {session:false}),
  checkRoles('administración', 'admin'),
  validatorHandler(createCompanySchema,'body'),
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
  validatorHandler(getCompanySchema,'params'),
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
  validatorHandler(getCompanySchema,'params'),
  validatorHandler(updateCompanySchema,'body'),
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
    validatorHandler(getCompanySchema,'params'),
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
