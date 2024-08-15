const boom = require('@hapi/boom');
const {models} = require ('../libs/sequelize');
const sequelize = require('../libs/sequelize');

class ClientsService {

    constructor() {
    }

  async create (data) {
   const newClient = await models.Client.create({...data,
     location:sequelize.literal(`ST_GeomFromText('POINT(${data.latitude} ${data.longitude})')`)});
    return newClient;
  }


  async AddDevice (data) {
    const newDevice = await models.ClientDevice.create(data);
     return newDevice;
   }

  async update(id, changes,  options) {
    const { transaction } = options;
    const client = await this.findOne(id);
    const rta = await client.update(changes, { transaction });
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
      options.include = ['devices', 'billing','products'];
      const totalItems = await models.Client.count();
      const items = await models.Client.findAll(options);
      const rta = {items, totalItems}
      return rta;
    }catch(err){
      console.log(err)
      res.status(500).json({ message: 'Error al obtener los clientes' });
    }

  }

  async findOne(id) {
    const client = await models.Client.findByPk(id, {
      include: ['devices', 'billing','products'],

    });
    if(!client){
      throw boom.notFound('client not found');
    }
    return client;
  }

  async delete(id) {
    const client = await this.findOne(id);
    await client.destroy();
    return {id}
  }
}

module.exports = ClientsService ;
