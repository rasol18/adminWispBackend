const {Model, DataTypes, Sequelize} = require('sequelize');
const {PRODUCT_TABLE} = require('./product.model');
const {CLIENT_TABLE} = require('./client.model');

const CLIENTPRODUCT_TABLE = 'clients_products';

const ClientProductSchema = {
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
  },
};

class ClientProduct extends Model {
  static associate(){

  }

  static config(sequelize){
    return{
      sequelize,
      tableName: CLIENTPRODUCT_TABLE,
      modelName: 'ClientProduct',
      timestamps: false,
      indexes: [
        {
          name: 'client_product_index',
          fields: ['client_id', 'product_id'],
          unique: false // Asegura que el índice no sea único
        }
      ]
    }
  }
}

module.exports = {CLIENTPRODUCT_TABLE, ClientProductSchema, ClientProduct} ;
