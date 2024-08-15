const {Model, DataTypes, Sequelize} = require('sequelize');
const {NODE_TABLE} = require('./node.model');
const { COMPANY_TABLE } = require('./company.model');


const NETWORK_TABLE = 'networks';

const NetworkSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING
  },
  ipRange: {
    allowNull: false,
    type: DataTypes.NUMBER,
    field: 'ip_range',
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
  nodeId: {
    field: 'node_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references:{
      model: NODE_TABLE,
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

class Network extends Model {
  static associate(models){
    this.belongsTo(models.Node,{as:'node'}),
    this.belongsTo(models.Company,{as:'company'}),
    this.hasMany(models.Device, {
      as:'devices',
      foreignKey: 'networkId'
    });

  }

  static config(sequelize){
    return{
      sequelize,
      tableName: NETWORK_TABLE,
      modelName: 'Network',
      timestamps: false
    }
  }
}

module.exports = {NETWORK_TABLE, NetworkSchema, Network} ;
