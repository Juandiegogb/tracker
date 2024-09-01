const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./env/.env" });
const app = express();
const port = process.env.port || 3000;
const router = require("./routes/routes");
const cookieParser = require("cookie-parser");
const bot = require("./tools/notificador");
const getTables = require("./tools/tablesGetter");
const verify = require("./tools/verify");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(getTables);
app.use(verify);
app.use(router);
bot.getReady();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
