const {Model, DataTypes, Sequelize} = require('sequelize');
const {BILL_TABLE} = require('./bill.model');
const {SURCHARGE_TABLE} = require('./surcharge.model');

const BILLSURCHARGE_TABLE = 'billing_surcharges';

const BillSurchargeSchema = {
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
  billId: {
    field: 'bill_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references:{
      model: BILL_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  surchargeId: {
    field: 'surcharge_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references:{
      model: SURCHARGE_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
};

class BillSurcharge extends Model {
  static associate(){

  }

  static config(sequelize){
    return{
      sequelize,
      tableName: BILLSURCHARGE_TABLE,
      modelName: 'BillSurcharge',
      timestamps: false
    }
  }
}

module.exports = {BILLSURCHARGE_TABLE, BillSurchargeSchema, BillSurcharge} ;
