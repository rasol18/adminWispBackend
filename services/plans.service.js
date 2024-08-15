const boom = require('@hapi/boom');
const {models} = require ('../libs/sequelize');

class PlansService {

    constructor() {
    }

  async create (data) {
   const newPlan = await models.Plan.create(data);
    return newPlan;
  }


  async update(id, changes) {
    const plan = await this.findOne(id);
    const rta = await plan.update(changes);
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
      options.include = ['clients'];
      const rta = await models.Plan.findAll(options);
      return rta;
    }catch(err){
      console.log(err)
    }

  }

  async findOne(id) {
    const plan = await models.Plan.findByPk(id, {
      include: ['clients']
    });
    if(!plan){
      throw boom.notFound('user not found');
    }
    return plan;
  }

  async delete(id) {
    const plan = await this.findOne(id);
    await plan.destroy();
    return {id}
  }
}

module.exports = PlansService ;
