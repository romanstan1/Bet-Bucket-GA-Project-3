const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.plugin(require('./lib/globalToJSON'));
mongoose.Promise = require('bluebird');
const customResponses = require('./lib/customResponses');
const errorHandler = require('./lib/errorHandler');
const { port, dbURI, env } = require('./config/environment');

const app = express();
mongoose.connect(dbURI);

if(env !== 'test') app.use(morgan('dev'));

app.use(customResponses);

app.use(express.static(`${__dirname}/public`));
app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));


app.use(errorHandler);
app.listen(port, () => console.log(`Express is listening on port ${port}`));
