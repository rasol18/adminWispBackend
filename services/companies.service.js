const boom = require('@hapi/boom');
const {models} = require ('../libs/sequelize');

class CompaniesService {

    constructor() {
    }

  async create (data) {
   const newCompany = await models.Company.create(data);
    return newCompany;
  }


  async update(id, changes) {
    const company = await this.findOne(id);
    const rta = await company.update(changes);
    return rta;
  }

  async find() {
    try{
      const options = {}
      const {limit, offset} = query;
      if(limit && offset){
        options.limit = parseInt(limit);
        options.offset = parseInt(offset);
      }
      const rta = await models.Company.findAll(options);
      return rta;
    }catch(err){
      console.log(err)
    }

  }

  async findOne(id) {
    const company = await models.Company.findByPk(id);
    if(!company){
      throw boom.notFound('company not found');
    }
    return company;
  }

  async delete(id) {
    const company = await this.findOne(id);
    await company.destroy();
    return {id}
  }
}

module.exports = CompaniesService ;
