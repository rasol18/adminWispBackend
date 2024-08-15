const express = require("express");
const usersService = require('../services/users.service');
const validatorHandler = require('../middlewares/validator.handler');
const {updateUserSchema,createUserSchema,getUserSchema, createUser_CompanySchema, queryUserSchema, getLoginUserSchema} = require('../schemas/users.schema');

const router = express.Router();
const service = new usersService();

router.get('/',
  validatorHandler(queryUserSchema,'query'),
  async (req, res) => {
  try {
    const users =await service.find(req.query);
    return res.json(users);
  }catch(err) {
    throw(err);
  }
});

router.post('/',
  validatorHandler(createUserSchema,'body'),
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

router.post('/userCompany',
  validatorHandler(createUser_CompanySchema,'body'),
  async(req, res, next)=> {
    try {
      const body = req.body;
      const newCategory = await service.createUserCompany(body);
      res.status(201).json(newCategory);
    }catch(err) {
      next(err);
    }
  }
);

router.get('/:id',
  validatorHandler(getUserSchema,'params'),
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
  validatorHandler(getUserSchema,'params'),
  validatorHandler(updateUserSchema,'body'),
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
    validatorHandler(getUserSchema,'params'),
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
