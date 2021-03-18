const express = require("express");
const path = require("path");
const vhost = require("vhost");
require("dotenv").config({ path: path.resolve(__dirname, `../.env`) });

const PORT = process.env.PORT;

const app = express();

const innocentSite = require("../src/innocentSite/innocentSite");
const evilSite = require("../src/evilSite/evilSite");

innocentSite.set("view engine", "ejs");
innocentSite.set("views", ["src/innocentSite/template"]);

evilSite.set("view engine", "ejs");
evilSite.set("views", ["src/evilSite/template"]);

app.use(vhost("*.innocent.com", innocentSite));
app.use(vhost("*.evil.com", evilSite));

app.set("port", PORT);

module.exports = {
    app,
    innocentSite,
    evilSite
};