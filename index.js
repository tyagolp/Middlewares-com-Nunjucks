const express = require("express");
const nunjucks = require("nunjucks");

const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
  watch: true
});

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "njk");

const middlewaveCheck = (req, res, next) => {
  if (!req.query.age) return res.redirect("/");

  return next();
};
//const age = 0;
app.get("/", (req, res) => {
  return res.render("home");
});
app.get("/major", middlewaveCheck, (req, res) => {
  return res.render("major", { age: req.query.age });
});
app.get("/minor", middlewaveCheck, (req, res) => {
  return res.render("minor", { age: req.query.age });
});

app.post("/check", (req, res) => {
  if (req.body.age < 18) return res.redirect(`/minor?age=${req.body.age}`);
  else return res.redirect(`/major?age=${req.body.age}`);
});

app.listen(3000);
