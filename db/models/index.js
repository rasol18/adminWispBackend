const {User, UserSchema} = require('./user.model');
const {Company, CompanySchema} = require('./company.model');
const {Client, ClientSchema} = require('./client.model');
const {Node, NodeSchema} = require('./node.model');
const {Product, ProductSchema} = require('./product.model');
const {Plan, PlanSchema} = require('./plan.model');
const {Surcharge, SurchargeSchema} = require('./surcharge.model');
const {Network, NetworkSchema} = require('./network.model');
const {Device, DeviceSchema} = require('./device.model');
const {Bill, BillSchema} = require('./bill.model');
const {UserCompany, UserCompanySchema} = require('./usercompany.model');
const {ClientDevice, ClientDeviceSchema} = require('./clientdevice.model');
const {BillProduct, BillProductSchema} = require('./billproduct.model');
const {BillPlan, BillPlanSchema} = require('./billplan.model');
const {BillSurcharge, BillSurchargeSchema} = require('./billsurcharge.model');
const { ClientProduct, ClientProductSchema } = require('./clientproduct.model');


function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Company.init(CompanySchema, Company.config(sequelize));
  Client.init(ClientSchema, Client.config(sequelize));
  Node.init(NodeSchema, Node.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Plan.init(PlanSchema, Plan.config(sequelize));
  Surcharge.init(SurchargeSchema, Surcharge.config(sequelize));
  Network.init(NetworkSchema, Network.config(sequelize));
  Device.init(DeviceSchema, Device.config(sequelize));
  Bill.init(BillSchema, Bill.config(sequelize));
  UserCompany.init(UserCompanySchema, UserCompany.config(sequelize));
  ClientDevice.init(ClientDeviceSchema, ClientDevice.config(sequelize));
  BillProduct.init(BillProductSchema, BillProduct.config(sequelize));
  BillPlan.init(BillPlanSchema, BillPlan.config(sequelize));
  BillSurcharge.init(BillSurchargeSchema, BillSurcharge.config(sequelize));
  ClientProduct.init(ClientProductSchema, ClientProduct.config(sequelize))

  Node.associate(sequelize.models);
  Network.associate(sequelize.models);
  Device.associate(sequelize.models);
  Client.associate(sequelize.models);
  Plan.associate(sequelize.models);
  Bill.associate(sequelize.models);
  UserCompany.associate(sequelize.models);
  User.associate(sequelize.models);
  ClientDevice.associate(sequelize.models);
  BillProduct.associate(sequelize.models);
  BillPlan.associate(sequelize.models);
  BillSurcharge.associate(sequelize.models);
  ClientProduct.associate(sequelize.models);
}

module.exports = setupModels ;
