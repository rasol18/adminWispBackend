const {Model, DataTypes, Sequelize} = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  username: {
    allowNull: false,
    type: DataTypes.STRING
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  recoveryToken: {
    field: 'recovery_token',
    allowNull: true,
    type: DataTypes.STRING
  },
  email: {
    allowNull: false,
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
  active: {
    default: true,
    type: DataTypes.BOOLEAN,
  },
  service: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  role:{
    allowNull: true,
    type: DataTypes.STRING,
  }
};

class User extends Model {
  static associate(models){
    this.belongsToMany(models.Company, {
      as:'companies',
      through: models.UserCompany,
      foreignKey: 'userId',
      otherKey: 'companyId'
    })
  }

  static config(sequelize){
    return{
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    }
  }
}

module.exports = {USER_TABLE, UserSchema, User} ;
