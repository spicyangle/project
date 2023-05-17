const express = require("express");
const router = express.Router();
const eventsControllers = require("../controllers/eventsControllers");
const interestedUsersControllers = require("../controllers/interestedUsersControllers");
const authControllers = require("../controllers/authControllers");

router
  .route("/")
  .get(eventsControllers.findAllEvents) // Finds all events
  .post(authControllers.verifyToken, eventsControllers.create); //creates a new event

router
  .route("/:id/interested-users")
  .get(authControllers.verifyToken,interestedUsersControllers.findAllInterestedUsers)
  .post(authControllers.verifyToken,interestedUsersControllers.create); //show interest to event

router
  .route("/:id/interested-users/:uid")
  .delete(authControllers.verifyToken,interestedUsersControllers.deleteInterest);

router.all("*", (req, res) => {
  res.status(404).json({ message: "Try again, not found" }); //send a predefined error message
});

//export this router
module.exports = router; //sent