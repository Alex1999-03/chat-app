const { APP_PORT } = require('./config');
const { 
   errorHandler, 
   httpErrorHandler, 
   sequelizeErrorHandler 
} = require('./middlewares/error.handler');
const ConfigController = require('./controllers');
const { connectSocket } = require('./libs/socketio');
const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').Server(app);

app.use(express.json());
app.use(cors());

require('./libs/passport');
connectSocket(server);
ConfigController(app);
app.use('/app', express.static('public'));

app.use(sequelizeErrorHandler);
app.use(httpErrorHandler);
app.use(errorHandler);

server.listen(APP_PORT, () => {
   console.log(`App listening in http://localhost:${APP_PORT}`); 
});