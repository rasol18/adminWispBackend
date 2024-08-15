const {Model, DataTypes, Sequelize} = require('sequelize');
const {BILL_TABLE} = require('./bill.model');
const {PLAN_TABLE} = require('./plan.model');

const BILLPLAN_TABLE = 'billing_plans';

const BillPlanSchema = {
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
  planId: {
    field: 'plan_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references:{
      model: PLAN_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
};

class BillPlan extends Model {
  static associate(models){

  }

  static config(sequelize){
    return{
      sequelize,
      tableName: BILLPLAN_TABLE,
      modelName: 'BillPlan',
      timestamps: false
    }
  }
}

module.exports = {BILLPLAN_TABLE, BillPlanSchema, BillPlan} ;
