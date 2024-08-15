const boom = require('@hapi/boom');
const {models} = require ('../libs/sequelize');

class SurchargesService {

    constructor() {
    }

  async create (data) {
   const newSurcharge = await models.Surcharge.create(data);
    return newSurcharge;
  }


  async update(id, changes) {
    const surcharge = await this.findOne(id);
    const rta = await surcharge.update(changes);
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
      const rta = await models.Surcharge.findAll(options);
      return rta;
    }catch(err){
      console.log(err)
    }

  }

  async findOne(id) {
    const surcharge = await models.Surcharge.findByPk(id);
    if(!surcharge){
      throw boom.notFound('surcharge not found');
    }
    return surcharge;
  }

  async delete(id) {
    const surcharge = await this.findOne(id);
    await surcharge.destroy();
    return {id}
  }
}

module.exports = SurchargesService ;
