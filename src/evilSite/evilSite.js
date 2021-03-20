const express = require("express");

const app = express();

app.use(require("./route/page/clickjackPage"));
app.use(require("./route/page/homePage"));

module.exports = app;