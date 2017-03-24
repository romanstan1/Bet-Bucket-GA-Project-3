const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.plugin(require('./lib/globalToJSON'));
mongoose.Promise = require('bluebird');
const customResponses = require('./lib/customResponses');
const errorHandler = require('./lib/errorHandler');
const { port, dbURI, env } = require('./config/environment');
const routes = require('./config/routes');

mongoose.connect(dbURI);

const app = express();

if(env !== 'test') app.use(morgan('dev'));

app.use(customResponses);

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());

app.use('/api', routes);
app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));


app.use(errorHandler);
app.listen(port, () => console.log(`Express is listening on port ${port}`));
