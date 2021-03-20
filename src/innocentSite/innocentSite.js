const express = require("express");

const app = express();

const protectionMode = process.env.PROTECTION_MODE;

if(protectionMode !== "naked") {
    app.use(require(`./middleware/security/${protectionMode}/contentSecurityPolicyMiddleware`));
}

app.use(require("./route/page/homePageRoute"));

module.exports = app;