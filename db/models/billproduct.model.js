const {Model, DataTypes, Sequelize} = require('sequelize');
const {BILL_TABLE} = require('./bill.model');
const {PRODUCT_TABLE} = require('./product.model');

const BILLPRODUCT_TABLE = 'billing_products';

const BillProductSchema = {
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
  productId: {
    field: 'product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references:{
      model: PRODUCT_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
};

class BillProduct extends Model {
  static associate(){

  }

  static config(sequelize){
    return{
      sequelize,
      tableName: BILLPRODUCT_TABLE,
      modelName: 'BillProduct',
      timestamps: false
    }
  }
}

module.exports = {BILLPRODUCT_TABLE, BillProductSchema, BillProduct} ;
