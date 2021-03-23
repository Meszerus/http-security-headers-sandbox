const { app } = require("../../src/appConfiguration");

const port = 80;
let server;

module.exports = {
    before() {
        server = app.listen(port, () => {
            console.log(`Sandbox app listening.`);
        });
    },

    after() {
        server.close();
    },

    "Will not prevent iframe from loading": (browser) => {
        browser.url(`http://www.evil.com:${port}/clickjack`)
            .waitForElementVisible("iframe")
            .getLog("browser", (result) => {
                const securityLogs = result.filter((log) => log.message.includes("Refused to frame 'http://www.innocent.com/'"));

                if(securityLogs.length) {
                    throw new Error("Expected iframe to load successfully.");
                }
            })
            .end();
    },
    "Will not prevent inline scripts from executing": (browser) => {
        browser.url(`http://www.innocent.com:${port}/home`)
            .waitForElementVisible("h1")
            .getLog("browser", (result) => {
                const securityLogs = result.filter((log) => log.message.includes("this log comes from an inline script"));

                if(securityLogs.length) {
                    throw new Error("Expected inline script to execute successfully.");
                }
            })
            .end();
    }
};
