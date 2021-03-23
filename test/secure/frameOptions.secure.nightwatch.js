const vhost = require("vhost");
const { app, innocentSite } = require("../../src/appConfiguration");

const port = 80;
let server;

// This test is not yet included in the overall test commands, it needs a bit more work to actaully pick up
// the middleware set here which is not registered prior.

innocentSite.use(require("../../src/innocentSite/middleware/security/secure/frameOptionsMiddleware"));

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
                const securityLogs = result.filter((log) => log.message.includes("Refused to display 'http://www.innocent.com/' in a frame"));

                if(!securityLogs.length) {
                    throw new Error("Expected Frame Options to prevent iframe from loading successfully.");
                }
            })
            .end();
    }
};
