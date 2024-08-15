const {Model, DataTypes, Sequelize} = require('sequelize');

const COMPANY_TABLE = 'companies';

const CompanySchema = {
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
  cuit: {
    type: DataTypes.NUMBER,
    unique: true
  },
  logo: {
    type: DataTypes.STRING,
    unique: true
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
  address: {
    type: DataTypes.STRING,
  },
  active: {
    default: true,
    type: DataTypes.BOOLEAN,
  },
};

class Company extends Model {
  static associate(models){
    this.hasMany(models.Network, {
      as:'networks',
      foreignKey: 'companyId'
    }),
    this.hasMany(models.Client, {
      as:'clients',
      foreignKey: 'companyId'
    }),
    this.hasMany(models.Bill, {
      as:'billing',
      foreignKey: 'companyId'
    })
  }

  static config(sequelize){
    return{
      sequelize,
      tableName: COMPANY_TABLE,
      modelName: 'Company',
      timestamps: false
    }
  }
}

module.exports = {COMPANY_TABLE, CompanySchema, Company} ;
