const {Strategy} = require('passport-local');
const  authService = require('../../../services/auth.service');

const service = new authService();
const localStrategy = new Strategy( {
  usernameField: 'email'
},
  async(email, password, done)=> {
  try{
   const user= await service.getUser(email,password);
   done(null, user);
  }catch(err ){
    done(err, false);
  }
});

module.exports = localStrategy;
