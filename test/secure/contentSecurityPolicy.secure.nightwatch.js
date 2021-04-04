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

    "Will prevent iframe from loading": (browser) => {
        browser.url(`http://www.evil.com:${port}/clickjack`)
            .waitForElementVisible("iframe")
            .getLog("browser", (result) => {
                const securityLogs = result.filter((log) => log.message.includes("Refused to frame 'http://www.innocent.com/'"));

                if(!securityLogs.length) {
                    throw new Error("Expected CSP to prevent iframe from loading successfully.");
                }
            })
            .end();
    },
    "Given inline script missing crypto-nonce, When attempting to load the script, Then block it being loaded": (browser) => {
        browser.url(`http://www.innocent.com:${port}/home`)
            .waitForElementVisible("h1")
            .getLog("browser", (result) => {
                const securityLogs = result.filter((log) => log.message.includes("innocent.com - this log comes from a BAD inline script."));

                if(securityLogs.length) {
                    throw new Error("Expected CSP to prevent inline script from executing successfully.");
                }
            })
            .end();
    },
    "Given inline script with crypto-nonce, When attempting to load the script, Then allow it being loaded": (browser) => {
        browser.url(`http://www.innocent.com:${port}/home`)
            .waitForElementVisible("h1")
            .getLog("browser", (result) => {
                console.log(result);
                const securityLogs = result.filter((log) => log.message.includes("innocent.com - this log comes from a GOOD inline script."));

                if(!securityLogs.length) {
                    throw new Error("Expected CSP to allow inline script to execute successfully.");
                }
            })
            .end();
    },
    "Given external script from non-whitelisted domain, When attempting to load the script, Then block it being loaded": (browser) => {
        browser.url(`http://www.innocent.com:${port}/home`)
            .waitForElementVisible("h1")
            .getLog("browser", (result) => {
                const securityLogs = result.filter((log) =>
                    log.message.includes("Refused to load the script 'https://www.absolutely-random-website.com/example-script.js'"));

                if(!securityLogs.length) {
                    throw new Error("Expected CSP to prevent external script on non-whitelisted domains from executing successfully.");
                }
            })
            .end();
    },
    "Given external script from whitelisted domain, When attempting to load the script, Then allow it being loaded": (browser) => {
        browser.url(`http://www.innocent.com:${port}/home`)
            .waitForElementVisible("h1")
            .getLog("browser", (result) => {
                const securityLogs = result.filter((log) =>
                    log.message.includes("Refused to load the script 'https://code.jquery.com/jquery-3.6.0.slim.min.js'"));

                if(securityLogs.length) {
                    throw new Error("Expected CSP to allow external script on whitelisted domains to execute successfully.");
                }
            })
            .end();
    },
};
