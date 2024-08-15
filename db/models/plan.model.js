const {Model, DataTypes, Sequelize} = require('sequelize');

const PLAN_TABLE = 'plans';

const PlanSchema = {
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
    type: DataTypes.INTEGER
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
  },
  download: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  upload: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  limitAt: {
    field: 'limit_at',
    type: DataTypes.INTEGER
  },
  burstLimit: {
    field: 'burst_limit',
    type: DataTypes.INTEGER
  },
  burstThreshold: {
    field: 'burst_threshold',
    type: DataTypes.INTEGER
  },
  burstTime: {
    field: 'burst_time',
    type: DataTypes.INTEGER
  },
  priority: {
    type: DataTypes.INTEGER
  },
  addressList: {
    field: 'address_list',
    type: DataTypes.STRING,
  },
  parents: {
    type: DataTypes.STRING,
  },
};

class Plan extends Model {
  static associate(models){
    this.hasMany(models.Client, {
      as:'clients',
      foreignKey: 'planId'
    })
  }

  static config(sequelize){
    return{
      sequelize,
      tableName: PLAN_TABLE,
      modelName: 'Plan',
      timestamps: false
    }
  }
}

module.exports = {PLAN_TABLE, PlanSchema, Plan} ;
