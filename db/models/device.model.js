const {Model, DataTypes, Sequelize} = require('sequelize');
const {NODE_TABLE} = require('./node.model');
const {NETWORK_TABLE} = require('./network.model');

const DEVICE_TABLE = 'devices';

const DeviceSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  model: {
    type: DataTypes.STRING
  },
  mac: {
    type: DataTypes.STRING
  },
  notifications: {
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
  statistics: {
    type: DataTypes.STRING,
  },
  backups:{
    type: DataTypes.STRING,
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
  networkId: {
    field: 'network_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references:{
      model: NETWORK_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
};

class Device extends Model {
  static associate(models){
    this.belongsTo(models.Node,{as:'node'}),
    this.belongsTo(models.Network,{as:'network'})

  }

  static config(sequelize){
    return{
      sequelize,
      tableName: DEVICE_TABLE,
      modelName: 'Device',
      timestamps: false
    }
  }
}

module.exports = {DEVICE_TABLE, DeviceSchema, Device} ;
