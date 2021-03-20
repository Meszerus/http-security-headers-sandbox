const express = require("express");

const router = express.Router();

router.get("/clickjack", async (_, res) => {
    res.render("clickjack", {});
});

module.exports = router;