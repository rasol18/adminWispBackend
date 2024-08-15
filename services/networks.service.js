const boom = require('@hapi/boom');
const {models} = require ('../libs/sequelize');

class NetworksService {

    constructor() {
    }

  async create (data) {
   const newNetwork = await models.Network.create(data);
    return newNetwork;
  }


  async update(id, changes) {
    const network = await this.findOne(id);
    const rta = await network.update(changes);
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
      const rta = await models.Network.findAll(options);
      return rta;
    }catch(err){
      console.log(err)
    }

  }

  async findOne(id) {
    const network = await models.Network.findByPk(id);
    if(!network){
      throw boom.notFound('user not found');
    }
    return network;
  }

  async delete(id) {
    const network = await this.findOne(id);
    await network.destroy();
    return {id}
  }
}

module.exports = NetworksService ;
