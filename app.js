const connection = require('./db-config');
const { setupRoutes } = require('./routes');
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const Joi = require('joi');

connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
  } else {
    console.log('connected as id ' + connection.threadId);
  }
});

app.use(express.json());

setupRoutes(app);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
