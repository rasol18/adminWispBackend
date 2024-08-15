const boom = require('@hapi/boom');
const {models} = require ('../libs/sequelize');

class ProductsService {

    constructor() {
    }

  async create (data) {
   const newProduct = await models.Product.create(data);
    return newProduct;
  }


  async update(id, changes) {
    const product = await this.findOne(id);
    const rta = await product.update(changes);
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
      const rta = await models.Product.findAll(options);
      return rta;
    }catch(err){
      console.log(err)
    }

  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);
    if(!product){
      throw boom.notFound('product not found');
    }
    return product;
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return {id}
  }
}

module.exports = ProductsService ;
