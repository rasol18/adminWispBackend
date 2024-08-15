const {Model, DataTypes, Sequelize} = require('sequelize');
const {COMPANY_TABLE, PLAN_TABLE} = require('./node.model');

const CLIENT_TABLE = 'clients';

const ClientSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  fullname: {
    allowNull: false,
    type: DataTypes.STRING
  },
  dni: {
    type: DataTypes.INTEGER
  },
  phone: {
    type: DataTypes.INTEGER,
  },
  password: {
    type: DataTypes.STRING
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
  address: {
    type: DataTypes.STRING,
  },
  location:{
    type: DataTypes.GEOMETRY('POINT'),
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  instalationDate:{
    type: DataTypes.DATE,
    field: 'instalation_date',
    defaultValue: Sequelize.NOW
  },

  planId:{
    field: 'plan_id',
    type: DataTypes.INTEGER,
    references:{
      model: PLAN_TABLE,
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
  },
};

class Client extends Model {
  static associate(models){
    this.hasMany(models.Bill, {
      as:'billing',
      foreignKey: 'clientId'
    }),
    this.belongsToMany(models.Device, {
      as:'devices',
      through: models.ClientDevice,
      foreignKey: 'clientId',
      otherKey: 'deviceId'
    }),
    this.belongsToMany(models.Product, {
      through: models.ClientProduct,
      as:'products',
      through: models.ClientProduct,
      foreignKey: 'clientId',
      otherKey: 'productId'
    }),
    this.belongsTo(models.Plan,{as:'plan', foreignKey: 'planId'})
  }

  static config(sequelize){
    return{
      sequelize,
      tableName: CLIENT_TABLE,
      modelName: 'Client',
      timestamps: false
    }
  }
}

module.exports = {CLIENT_TABLE, ClientSchema, Client} ;
