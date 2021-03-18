const express = require("express");

const router = express.Router();

router.get("/home", async (req, res) => {
    res.render("home", { site: { id: "innocent" } });
});

module.exports = router;