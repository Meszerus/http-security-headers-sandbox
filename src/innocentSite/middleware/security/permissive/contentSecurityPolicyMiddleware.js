const helmet = require("helmet");

const PERMISSIVE_DIRECTIVE_VALUES = [
    "*",
    "'unsafe-eval'",
    "'unsafe-inline'",
    "about:",
    "blob:",
    "data:",
    "filesystem:",
    "mediastream:",
    "ws:",
    "wss:"
];

module.exports = helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: PERMISSIVE_DIRECTIVE_VALUES
    }
});
