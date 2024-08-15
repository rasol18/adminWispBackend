const {Model, DataTypes, Sequelize} = require('sequelize');

const NODE_TABLE = 'nodes';

const NodeSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.STRING
  },
  phone: {
    type: DataTypes.STRING,
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
  location: {
    type: DataTypes.STRING,
  },
};

class Node extends Model {
  static associate(models){
    this.hasMany(models.Network, {
      as:'networks',
      foreignKey: 'nodeId'
    }),
    this.hasMany(models.Device, {
      as:'devices',
      foreignKey: 'nodeId'
    })
  }

  static config(sequelize){
    return{
      sequelize,
      tableName: NODE_TABLE,
      modelName: 'Node',
      timestamps: false
    }
  }
}

module.exports = {NODE_TABLE, NodeSchema, Node} ;
