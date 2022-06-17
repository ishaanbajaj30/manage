const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

const app = express();
app.use(express.json());

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  session({
    secret: "Mysecret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/newdb", {
  useNewUrlParser: true,
});

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  Department: String,
});

const itemSchema = new mongoose.Schema({
  itemcode: String,
  itemname: String,
  department: String,
  amount: Number,
});

const departmentSchema = new mongoose.Schema({
  name: String,
  totalbudget: Number,
  remainingbudget: Number,
  item: [itemSchema],
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);
const Item = new mongoose.model("Item", itemSchema);
const Department = new mongoose.model("Department", departmentSchema);

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

app.get("/", function (req, res) {
  res.render("home");
});

app.post("/register", function (req, res) {
  console.log(req.body);
  // res.send("Hello " + req.body.new);

  User.register(
    {
      username: req.body.username,
      email: req.body.email,
      Department: req.body.Department,
    },
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        res.redirect("/");
      } else {
        console.log("Hongya");
        passport.authenticate("local")(req, res, function () {
          res.redirect("/");
        });
      }
    }
  );
});

app.post("/login", function (req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  //console.log("errors");
  req.login(user, function (err) {
    if (err) {
      //console.log("error");
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function () {
        console.log("login hongya");
        res.redirect("/");
      });
    }
  });
});

app.post("/createdept", function (req, res) {
  const name1 = req.body.name;
  const totalbudget1 = req.body.totalbudget;
  const remainingbudget1 = req.body.remainingbudget;
  const Department1 = new Department({
    name: name1,
    totalbudget: totalbudget1,
    remainingbudget: remainingbudget1,
  });
  console.log(Department1);
  Department1.save();
  res.redirect("/");
});

app.post("/additem", function (req, res) {
  const itemcode1 = req.body.itemcode;
  const itemname1 = req.body.itemname;
  const department1 = req.body.department;
  const amount1 = req.body.amount;
  const Item1 = new Item({
    itemcode: itemcode1,
    itemname: itemname1,
    department: department1,
    amount: amount1,
  });
  console.log(Item1);
  Item1.save();
  var bchahua;
  Department.find({ name: department1 }, async function (err, foundDept) {
    if (err) {
      console.log(err);
    } else {
      // console.log(foundDept[0].item);

      foundDept[0].remainingbudget = foundDept[0].remainingbudget - amount1;
      bchahua = await foundDept[0].remainingbudget;
      // console.log("sad" + bchahua);
      // console.log("Veere");
      Department.updateOne(
        { name: department1 },
        {
          $set: {
            remainingbudget: bchahua,
          },
        },
        function (err, res) {
          if (!err) {
            //console.log("Hello");
          }
        }
      );

      // console.log(foundDept);
      // Department.save();
    }
  });

  res.redirect("/");
});

app.listen(3000, function (req, res) {
  console.log("Server started on port 3000");
});
