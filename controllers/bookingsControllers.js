const db = require("../models/index.js");
const bookings = db.bookings;
const accommodations = db.accommodations;
const users = db.users;
// const accommmodations = db.accommodations;
const { ValidationError } = require("sequelize"); //necessary for model validations using sequelize
const { Op } = require("sequelize");

// Creates a new booking
exports.create = async (req, res) => {
  try {
    const accommodationId = parseInt(req.params.id);
    const bookingData = {
      accommodation_id: accommodationId,
      user_id: req.body.user_id,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      persons_quantity: req.body.persons_quantity,
      rating: req.body.rating,
      status: req.body.status,
    }

    // Find the requested accommodation
    const accommodation = await accommodations.findByPk(accommodationId);
    // Find the user who requested an accommodation
    const user = await users.findByPk(req.body.user_id);

    if (!accommodation) {
      return res.status(404).json({ error: `The accommodation with ID ${accommodationId}  was not found` });
    }
    
    if (!user)
    {
      return res.status(404).json({ error: `The user ${bookingData.user_id} does not exist` });
    }
    
    if (!req.loggedUserRole == 'student' || req.loggedUserId != user.id) 
    {
      return res.status(403).json({
        success: false,
        msg: "Your credentials rights are not sufficient.",
    });
    } 
    // Create a new booking
    const newBooking = await bookings.create(bookingData);

    res.status(202).json({
      success: true,
      message: 'Your booking request was successfully sent to host',
    });
  } catch (err) {
    if (err instanceof ValidationError) {
      res.status(400).json({ success: false, message: err.errors.map((e) => e.message) });
    } else {
      res.status(500).json({
        message: err.message || 'Something went wrong. Please try again later.'
      });
    }
  }
  };
  