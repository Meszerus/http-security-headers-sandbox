const express = require("express");

const router = express.Router();

router.get("/home", async (req, res) => {
    res.render("home", { referrer: req.headers["referer"] });
});

module.exports = router;