const express = require("express");
const { Note } = require("../models");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const note = await Note.create({
    title: req.body.title,
    content: req.body.content,
    UserId: req.user.id
  });
  res.json(note);
});

router.get("/", auth, async (req, res) => {
  const notes = await Note.findAll({ where: { UserId: req.user.id } });
  res.json(notes);
});

router.put("/:id", auth, async (req, res) => {
  await Note.update(req.body, {
    where: { id: req.params.id, UserId: req.user.id }
  });
  res.sendStatus(200);
});

router.delete("/:id", auth, role("admin"), async (req, res) => {
  await Note.destroy({ where: { id: req.params.id } });
  res.sendStatus(200);
});

module.exports = router;