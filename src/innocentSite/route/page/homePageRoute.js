const express = require("express");

const router = express.Router();

router.get("/home", async (req, res) => {
    res.render("home", { security: { nonce: res.locals.nonce } });
});

module.exports = router;