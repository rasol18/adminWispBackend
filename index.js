const express = require("express");
const routerApi = require("./routes");
const {errorHandlers, logErrors, boomErrorHandlers, ormErrorHandler } = require("./middlewares/error.handler");
const cors= require("cors");
const {checkApiKey} = require('./middlewares/auth.handler');

const app = express();
const port = process.env.PORT || 3000;
//const whitelist = ['https://localhost', 'http://192.168.0.100'];
//const options = {
//  origin: (origin, callback) => {
//    if(whitelist.includes(origin)) {
//      callback(null, true);
//    }else {
 //     callback(new Error('no permitido'))
 //   }
 // }
//}
app.use(cors());
require('./utils/auth/index');
app.use(express.json());
app.get('/', checkApiKey, (req, res) => {
  res.send ('Hola mi server en express ');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandlers);
app.use(errorHandlers);

app.listen(port, () => {
  console.log('Mi port' + port)
})
