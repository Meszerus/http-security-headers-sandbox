const express = require("express");
const path = require("path");

const { app } = require("../../src/appConfiguration");
const port = 80;
let server;

app.use(express.static(path.join(__dirname, "csp-site")));

module.exports = {
    before() {
        server = app.listen(port, () => {
            console.log(`Sandbox app listening.`);
        });
    },

    after() {
        server.close();
    },

    "Will prevent iframe from loading": (browser) => {
        browser
            .url(`http://www.evil.com:${port}/clickjack`)
            .waitForElementVisible("iframe")
            .getLog("browser", (result) => {
                const securityLogs = result.filter((log) => log.message.includes("Refused to frame 'http://www.innocent.com/'"));

                if(securityLogs.length) {
                    throw new Error("Expected iframe to load successfully.");
                }
            })
            .end();
    }
};
