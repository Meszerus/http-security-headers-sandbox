const express = require("express");

const app = express();

if(process.env.PROTECTION_MODE === "permissive") {
    app.use(require("./middleware/security/permissive/contentSecurityPolicyMiddleware"));
}

if(process.env.PROTECTION_MODE === "secure") {
    app.use(require("./middleware/security/secure/contentSecurityPolicyMiddleware"));
}

app.use(require("./route/page/homePageRoute"));

module.exports = app;