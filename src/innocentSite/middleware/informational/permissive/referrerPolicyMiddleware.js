const helmet = require("helmet");

// Which setting you pick depends on your use-case.

module.exports = helmet.referrerPolicy({
    policy: "strict-origin-when-cross-origin"
});