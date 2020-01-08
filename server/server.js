require("express-group-routes");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;
const bodyparser = require("body-parser");

app.use(cors());

app.use(bodyparser.json());

//Users
const AccountController = require("./controllers/User");
//Category
const CategoriesController = require("./controllers/Categories");
//Event
const EventController = require("./controllers/Event");
//login & register
const AuthController = require("./controllers/auth");

//Middleware
// const { authenticated } = require("./middleware");

app.post("/verify", (req, res) => {
  // kita get dahulu headernya
  const authHeader = req.headers["authorization"];

  // lalu kita ambil tokenya dengan cara melakukan split bearer dan token, lalu kita ambil tokennya di index ke 1,
  // lalu kita perlu pengkondisian, jika headernya tidak ada kita akan mengembalikan null dan  menginformasikan bahwa permintaan Unauthorized
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    res.status(401).json({ message: "Unauthorized" });
  }

  // Lalu jika terdapat header kita juga perlu memastikan apakah token yang kita dapatkan valid
  // untuk ini kita dapat menggunakan jwt.verify, lalu kita menggunakan collback untuk memberikan informasi ke user
  jwt.verify(token, "my-secret-key", (err, user) => {
    if (err) {
      return res.status(403).send({ message: "Your Token No Longer Valid" });
    }
    console.log(user);
  });
});

app.get("/", (req, res, next) => {
  res.status(200).json("Ok");
});

app.group("/api/v1", router => {
  router.post("/login", AuthController.login);
  router.post("/register", AuthController.register);

  // get-all-category
  router.get("/getcategories", CategoriesController.categories);
  router.get("/getcategories/:id", CategoriesController.categoriesWithId);
  router.post("/addcategories", CategoriesController.addCategories);
  router.put("/updatecategories/:id", CategoriesController.updateCategories);

  router.get("/getevent", EventController.event);
  router.get("/getevent/:id", EventController.eventWithId);
  router.post("/addevent", EventController.addEvent);
  router.put("/updateevent/:id", EventController.updateEvent);
  router.get("/getevent/", EventController.getEventsByTitle);

  router.get("/getuser", AccountController.user);
  router.get("/getuser/:id", AccountController.userWithId);
  router.post("/adduser", AccountController.addUser);
  router.put("/updateuser/:id", AccountController.updateUser);
});

// app.use((err, req, res, next) => {
//   if (err.name === "Unexpected token") {
//     res.status(400).json({ message: "You are not authorized." });
//   } else {
//     next(err);
//   }
// });

app.listen(port, () => console.log(`Listening on port ${port}!`));
