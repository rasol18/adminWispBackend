const boom = require('@hapi/boom');
const {models} = require ('../libs/sequelize');
const bcrypt = require('bcrypt') ;

class UsersService {

    constructor() {
    }

  async create (data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await models.User.create({
      ...data,
      password: hash
    });
    delete newUser.dataValues.password;
    return newUser;
  }

  async createUserCompany (data) {
    const newUserCompany = await models.UserCompany.create(data);
    return newUserCompany;
   }



  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async find(query) {
      const options = {}
      const {limit, offset} = query;
      if(limit && offset){
        options.limit = parseInt(limit);
        options.offset = parseInt(offset);
      }
      const rta = await models.User.findAll(options);
      return rta;
  }

  async findByEmail(email) {
    const rta = await models.User.findOne( {
      where: {email}
    });
    return rta;
}

  async findOne(id) {
    const user = await models.User.findByPk(id, {
      include: ['companies']
    });
    if(!user){
      throw boom.notFound('user not found');
    }
    return user;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return {id}
  }
}


module.exports = UsersService ;
