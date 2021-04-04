const express = require("express");

const router = express.Router();

router.get("/header", async (req, res) => {
    res.render("header", { security: { nonce: res.locals.nonce } });
});

module.exports = router;