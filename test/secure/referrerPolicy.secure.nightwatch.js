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

    "Will prevent potentially sensitive path/querystring information being leaked via the Referrer header": (browser) => {
        browser.url(`http://www.innocent.com/home?private=sensitive`)
            .waitForElementVisible("#innocentSite")
            .click("#evilLinkHttp")
            .waitForElementVisible("#evilSite")
            .expect.element('#referrerObtained').text.to.equal("http://www.innocent.com/")
    }
};
