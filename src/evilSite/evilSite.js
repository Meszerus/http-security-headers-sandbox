const express = require("express");

const app = express();

app.use(require("./route/page/clickjackPage"));

module.exports = app;