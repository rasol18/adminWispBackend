const {Model, DataTypes, Sequelize} = require('sequelize');
const {DEVICE_TABLE} = require('./device.model');
const {CLIENT_TABLE} = require('./client.model');

const CLIENTDEVICE_TABLE = 'clients_devices';

const ClientDeviceSchema = {
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
  clientId: {
    field: 'client_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references:{
      model: CLIENT_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  deviceId: {
    field: 'device_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references:{
      model: DEVICE_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
};

class ClientDevice extends Model {
  static associate(){

  }

  static config(sequelize){
    return{
      sequelize,
      tableName: CLIENTDEVICE_TABLE,
      modelName: 'ClientDevice',
      timestamps: false
    }
  }
}

module.exports = {CLIENTDEVICE_TABLE, ClientDeviceSchema, ClientDevice} ;
