const helmet = require("helmet");

// THIS HEADER IS SUPERSEDED BY THE "frame-ancestors" DIRECTIVE OF THE CONTENT SECURITY POLICY HEADER.
// REFER TO THE README FOR MORE INFO.

// Which setting you pick depends on your use-case. The most secure settings include the following:
//  - no-referrer
//  - sameorigin

// A legacy configuration - "ALLOW-FROM" - is not supported by this middleware, as that setting is not widely supported
// by browsers. Mozilla Developer Network discourages using that setting.

module.exports = helmet.frameguard({
    action: "sameorigin"
});
