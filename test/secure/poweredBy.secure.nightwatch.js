const express = require("express");
const request = require('request');
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

    "Will prevent x-powered-by header informing malicious actors of the tech/framework we're using": (browser) => {
        browser.perform(done => {
           request(`http://www.innocent.com:${port}`, (_, response) => {
               browser.assert.equal(response.headers["x-powered-by"], undefined);
               done();
           })
        });
    }
};
