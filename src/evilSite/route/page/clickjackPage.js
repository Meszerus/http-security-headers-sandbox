const express = require("express");

const router = express.Router();

router.get("/clickjack", async (req, res) => {
    res.render("clickjack", { site: { id: "evil" } });
});

module.exports = router;