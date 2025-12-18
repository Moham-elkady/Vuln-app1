const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const router = express.Router();

router.post("/register", async (req, res) => {
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
        username: req.body.username,
        password: hash,
        role: "user"
    });
    res.json(user);
});

router.post("/login", async (req, res) => {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (!user) return res.sendStatus(401);

    const ok = await bcrypt.compare(req.body.password, user.password);
    if (!ok) return res.sendStatus(401);

    const token = jwt.sign(
        { id: user.id, role: user.role },
        "secretkey"
    );

    res.json({ token });
});

module.exports = router;
