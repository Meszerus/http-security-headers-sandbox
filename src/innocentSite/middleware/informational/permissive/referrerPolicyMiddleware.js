const helmet = require("helmet");

// Which setting you pick depends on your use-case. The following setting is rarely advised, it is set here purely
// to demonstrate the most permissive configuration.

module.exports = helmet.referrerPolicy({
    policy: "unsafe-url"
});