//external modules and dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const session = require('express-session');
require('dotenv').config();




const app = express();
app.use( bodyParser.json() );
app.use( cors() );

massive(process.env.CONNECTION_STRING).then(dbInstance => app.set('db', dbInstance));

const mainController = require('./controllers/mainController.js')


app.post('/api/snapshots', mainController.createSnapshot);
app.post('/api/events', mainController.createEvent);
app.get('/api/statuses', mainController.searchStatuses)


const port = process.env.PORT || 4000;
app.listen(port, () => {console.log(`Server is g2g on port ${port}.`)})
