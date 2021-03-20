const helmet = require("helmet");

// Which setting you pick depends on your use-case. The most secure settings include the following:
//  - no-referrer
//  - origin
//  - same-origin
//  - strict-origin
//  - strict-origin-when-cross-origin (this is the current spec default)

module.exports = helmet.referrerPolicy({
    policy: "strict-origin"
});