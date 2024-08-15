const {Model, DataTypes, Sequelize} = require('sequelize');

const SURCHARGE_TABLE = 'surcharges';

const SurchargeSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  price: {
    allowNull: false,
    type: DataTypes.NUMBER
  },
  description: {
    type: DataTypes.STRING,
  },
  billingText: {
    type: DataTypes.STRING,
    field: 'billing_text',
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
  }
};

class Surcharge extends Model {
  static associate(){

  }

  static config(sequelize){
    return{
      sequelize,
      tableName: SURCHARGE_TABLE,
      modelName: 'Surcharge',
      timestamps: false
    }
  }
}

module.exports = {SURCHARGE_TABLE, SurchargeSchema, Surcharge} ;
