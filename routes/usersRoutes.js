const express = require("express");
const router = express.Router();
const usersControllers = require("../controllers/usersControllers");
const authControllers = require("../controllers/authControllers");

router
  .route("/")
  .get(authControllers.verifyToken, usersControllers.getAllUsers) //ADMIN ACCESS ONLY
  .post(usersControllers.create); //create a new user

router.route("/:id").get(authControllers.verifyToken, usersControllers.getOneUser) 
                    .put(authControllers.verifyToken, usersControllers.updateUserInfo)
                    .delete(authControllers.verifyToken, usersControllers.deleteAccount)

router.route("/login").post(usersControllers.login); //PUBLIC

router.all("*", (req, res) => {
  res.status(404).json({ message: "Try again, not found" }); //send a predefined error message
});

//export this router
module.exports = router; //sent
