const {Model, DataTypes, Sequelize} = require('sequelize');

const PRODUCT_TABLE = 'products';

const ProductSchema = {
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
  },
};

class Product extends Model {
  static associate(models){
    Product.belongsToMany(models.Client, {
      through: models.ClientProduct,
      as: 'clients',
      foreignKey: 'product_id',
      otherKey: 'client_id'
    });
  }

  static config(sequelize){
    return{
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false
    }
  }
}

module.exports = {PRODUCT_TABLE, ProductSchema, Product} ;
