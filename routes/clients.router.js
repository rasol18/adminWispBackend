const express = require("express");
const clientsService = require('../services/clients.service');
const validatorHandler = require('../middlewares/validator.handler');
const {updateClientSchema,createClientSchema,getClientSchema,AddDeviceSchema, queryClientSchema} = require('../schemas/clients.schema');
const {ClientProduct} = require ('../db/models/clientproduct.model')
const  sequelize  = require('../libs/sequelize');

const router = express.Router();
const service = new clientsService();

router.get('/',
  validatorHandler(queryClientSchema,'query'),
  async (req, res) => {
  try {
    const clients =await service.find(req.query);
    return res.json(clients);
  }catch(err) {
    throw(err);
  }

});

router.post('/',
  validatorHandler(createClientSchema,'body'),
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

router.post('/addDevice',
  validatorHandler(AddDeviceSchema,'body'),
  async(req, res, next)=> {
    try {
      const body = req.body;
      const newCategory = await service.AddDevice(body);
      res.status(201).json(newCategory);
    }catch(err) {
      next(err);
    }
  }
);

router.get('/:id',
  validatorHandler(getClientSchema,'params'),
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
  validatorHandler(getClientSchema,'params'),
  validatorHandler(updateClientSchema,'body'),
  async(req,res,next)=>{
    const transaction = await sequelize.transaction();
    try{
      const{id}=req.params;
      const body=req.body;
      const category=await service.update(id,body, { transaction });

      console.log('Updated client:', category);
      if (body.products && body.products.length > 0) {
        const deleteResult = await ClientProduct.destroy({ where: { clientId: id }, transaction });

        // Luego, crea las nuevas asociaciones
        const clientProducts = body.products.map(productId => ({ clientId: id, productId }));
        const createResult = await ClientProduct.bulkCreate(clientProducts, { transaction });
      }
      await transaction.commit();
      console.log('Transaction committed successfully');
      res.json(category);
    }
    catch(error){
      await transaction.rollback();
      next(error);}
    });

router.delete('/:id',
    validatorHandler(getClientSchema,'params'),
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
