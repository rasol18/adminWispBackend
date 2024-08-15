const boom = require('@hapi/boom');
const {models} = require ('../libs/sequelize');

class BillingService {

    constructor() {
    }

  async create (data) {
   const newBill = await models.Bill.create(data);
    return newBill;
  }

  async addProduct (data) {
    const addProduct = await models.BillProduct.create(data);
     return addProduct;
   }

  async addPlan (data) {
    const addPlan = await models.BillPlan.create(data);
     return addPlan;
   }

   async addSurcharge (data) {
    const addSurcharge = await models.BillSurcharge.create(data);
     return addSurcharge;
   }

  async update(id, changes) {
    const bill = await this.findOne(id);
    const rta = await bill.update(changes);
    return rta;
  }

  async find(query) {
    try{
      const options = {}
      const {limit, offset} = query;
      if(limit && offset){
        options.limit = parseInt(limit);
        options.offset = parseInt(offset);
      }
      const rta = await models.Bill.findAll(options);
      return rta;
    }catch(err){
      console.log(err)
    }

  }

  async findOne(id) {
    const bill = await models.Bill.findByPk(id, {
      include: ['products','plans', 'surcharges', 'client','company',]
    });
    if(!bill){
      throw boom.notFound('bill not found');
    }
    return bill;
  }

  async delete(id) {
    const bill = await this.findOne(id);
    await bill.destroy();
    return {id}
  }
}

module.exports = BillingService ;
