const boom = require('@hapi/boom');
const {models} = require ('../libs/sequelize');

class NodesService {

    constructor() {
    }

  async create (data) {
   const newNode = await models.Node.create(data);
    return newNode;
  }


  async update(id, changes) {
    const node = await this.findOne(id);
    const rta = await node.update(changes);
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
      const rta = await models.Node.findAll(options);
      return rta;
    }catch(err){
      console.log(err)
    }

  }

  async findOne(id) {
    const node = await models.Node.findByPk(id);
    if(!node){
      throw boom.notFound('node not found');
    }
    return node;
  }

  async delete(id) {
    const node = await this.findOne(id);
    await node.destroy();
    return {id}
  }
}

module.exports = NodesService ;
