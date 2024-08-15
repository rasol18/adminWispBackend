const {Model, DataTypes, Sequelize} = require('sequelize');
const {USER_TABLE} = require('./user.model');
const {COMPANY_TABLE} = require('./company.model');

const USERCOMPANY_TABLE = 'users_companies';

const UserCompanySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  },
  updateAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: Sequelize.NOW
  },
  active: {
    default: true,
    type: DataTypes.BOOLEAN,
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references:{
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  companyId: {
    field: 'company_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references:{
      model: COMPANY_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
};

class UserCompany extends Model {
  static associate(){

  }

  static config(sequelize){
    return{
      sequelize,
      tableName: USERCOMPANY_TABLE,
      modelName: 'UserCompany',
      timestamps: false
    }
  }
}

module.exports = {USERCOMPANY_TABLE, UserCompanySchema, UserCompany} ;
