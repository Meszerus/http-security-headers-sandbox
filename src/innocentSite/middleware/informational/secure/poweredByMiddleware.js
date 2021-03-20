const helmet = require("helmet");

// The most secure approach is to unset the header entirely, which is what the Helmet library does here.

module.exports = helmet.hidePoweredBy();
