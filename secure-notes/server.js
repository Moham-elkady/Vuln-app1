const express = require("express");
const { sequelize } = require("./models");

const app = express();
app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/notes", require("./routes/notes"));

sequelize.sync().then(() => {
  app.listen(3000);
});
