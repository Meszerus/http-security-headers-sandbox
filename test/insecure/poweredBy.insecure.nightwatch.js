const request = require('request');
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

    "Will not prevent x-powered-by header informing malicious actors of the tech/framework we're using": (browser) => {
        browser.perform(done => {
            request(`http://www.innocent.com`, (_, response) => {
                browser.assert.equal(response.headers["x-powered-by"], "Express");
                done();
            })
        });
    }
};
