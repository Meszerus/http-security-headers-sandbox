const express = require("express");

const app = express();

const protectionMode = process.env.PROTECTION_MODE;

// Setup
app.use(require("./middleware/security/util/nonceMiddleware"));

if([ "permissive", "secure" ].includes(protectionMode)) {
    app.use(require(`./middleware/security/${protectionMode}/contentSecurityPolicyMiddleware`));
    app.use(require(`./middleware/informational/${protectionMode}/referrerPolicyMiddleware`));

    if(protectionMode === "secure") {
        // There are no "permissive" variants of the following - they are binary yes/no secure.
        app.use(require("./middleware/informational/secure/poweredByMiddleware"));
        // app.use(require("./middleware/security/secure/frameOptionsMiddleware"));
    }
}

app.use(require("./route/component/headerComponentRoute"));
app.use(require("./route/page/homePageRoute"));

module.exports = app;