const {Model, DataTypes, Sequelize} = require('sequelize');
const {COMPANY_TABLE} = require('./node.model');

const BILL_TABLE = 'billing';

const BillSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  discount: {
    type: DataTypes.INTEGER
  },
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  },
  untilAt: {
    type: DataTypes.DATE,
    field: 'until_at',
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
  prepaid: {
    default: false,
    type: DataTypes.BOOLEAN,
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
  clientId: {
    field: 'client_id',
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

class Bill extends Model {
  static associate(models){
    this.belongsTo(models.Client,{as:'client'}),
    this.belongsTo(models.Company,{as:'company'}),
    this.belongsToMany(models.Product, {
      as:'products',
      through: models.BillProduct,
      foreignKey: 'billId',
      otherKey: 'productId'
    }),
    this.belongsToMany(models.Plan, {
      as:'plans',
      through: models.BillPlan,
      foreignKey: 'billId',
      otherKey: 'planId'
    }),
    this.belongsToMany(models.Surcharge, {
      as:'surcharges',
      through: models.BillSurcharge,
      foreignKey: 'billId',
      otherKey: 'surchargeId'
    })
  }

  static config(sequelize){
    return{
      sequelize,
      tableName: BILL_TABLE,
      modelName: 'Bill',
      timestamps: false
    }
  }
}

module.exports = {BILL_TABLE, BillSchema, Bill} ;
