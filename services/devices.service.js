const boom = require('@hapi/boom');
const {models} = require ('../libs/sequelize');

class devicesService {

    constructor() {
    }

  async create (data) {
   const newDevice = await models.Device.create(data);
    return newDevice;
  }


  async update(id, changes) {
    const device = await this.findOne(id);
    const rta = await device.update(changes);
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
      const rta = await models.Device.findAll(options);
      return rta;
    }catch(err){
      console.log(err)
    }

  }

  async findOne(id) {
    const device = await models.Device.findByPk(id);
    if(!device){
      throw boom.notFound('device not found');
    }
    return device;
  }

  async delete(id) {
    const device = await this.findOne(id);
    await device.destroy();
    return {id}
  }
}

module.exports = devicesService ;
