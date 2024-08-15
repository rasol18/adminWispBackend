const boom = require('@hapi/boom');
const bcrypt = require('bcrypt') ;
const { config } = require('../config/config');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const  userService = require('../services/users.service');

const service = new userService();

class AuthService{
  async getUser(email, password){
    const user= await service.findByEmail(email);
    if(!user){
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  };

  signToken(user){
    const payload = {
      sub: user.id,
      role: user.role
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return {user, token};
  };

  async sendMail(infoMail){
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'leonardogarrido1994@gmail.com',
        pass: 'wkjs eeey faci emko '
      },
    });
    await transporter.sendMail(infoMail);
    return {message: 'el correo fue enviado con exito'}
  };

  async sendRecovery(email) {
    const user= await service.findByEmail(email);
    if(!user){
      throw boom.unauthorized();
    };
    const payload= {sub: user.id};
    const token = jwt.sign(payload, config.jwtSecret, {expiresIn:'15min'});
    const link =`https://www.google.com/recovery?token=${token}`;
    await service.update(user.id, {recoveryToken: token});
    const mail= {
      from: 'leonardogarrido1994@gmail.com.ar',
        to: `${user.email}`,
        subject: "Email para recuperar contraseña",
        html: `
        <h2>Recupera tu contraseña</h2>
        <p>Recibimos una solicitud para restablecer tu contraseña de Adminwisp</p>
        <b>Ingresa a este link => ${link}</b>
        <p>Si no solicitó un restablecimiento de contraseña, puede ignorar este correo electrónico.</p>
        <p>Estás recibiendo este correo electrónico porque te registraste en Adminwisp.</p>
        `,
    };
    const rta = await this.sendMail(mail);
    return rta;
  };

  async changePassword(token, newPassword){
    try {
      const payload= jwt.verify(token, config.jwtSecret);
      const user= await service.findOne(payload.sub);
      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      };
      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, {recoveryToken: null, password: hash});
      return {message:'La contraseña fue cambiada con exito'}
    } catch (error) {
      throw boom.unauthorized();
    }
  }
};



module.exports = AuthService;
