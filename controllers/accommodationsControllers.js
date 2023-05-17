const db = require("../models/index.js");
const accommodations = db.accommodations;
const { ValidationError } = require("sequelize"); //necessary for model validations using sequelize
const { Op } = require("sequelize");


// Finds all accommodations by criteria
exports.findAllAccommodations = async (req, res) => {
  try {
  let where = {};
    const {
      area,
      price_min,
      price_max,
      persons_quantity,
      beds_quantity,
      rating,
      room_type,
      minimum_stay_days,
    } = req.query;
    // const availability =req.query;

    if (area) {
      //Filters by the area
      where.area = {
        [Op.eq]: area,
      };
    }
    
    if (price_min) {
      //Filters by minimal price
      where.price = {
        [Op.gte]: price_min,
      };
      if (price_max) {
        //Filters by maximum price
        where.price = {
          [Op.gte]: price_min,
          [Op.lte]: price_max
        };
      };
    }
  
    if (price_max && !price_min) {
      //Filters by maximum price
      where.price = {
        [Op.lte]: price_max,
      };
    }

    if (persons_quantity) {
      //Filters by max number of persons in accommodation
      where.persons_quantity = {
        [Op.eq]: persons_quantity,
      };
    }

    if (beds_quantity) {
      //Filters by number of beds
      where.beds_quantity = {
        [Op.eq]: beds_quantity,
      };
    }
    
    if (rating) {
      //filters by rating
      where.rating = {
        [Op.eq]: rating,
      };
    }

    if (room_type) {
      //filters by room_type
      where.room_type = {
        [Op.eq]: room_type,
      };
    }

    if (minimum_stay_days) {
      //Filters by Minimum days of staying
      where.minimum_stay_days = {
        [Op.eq]: minimum_stay_days,
      };
    }

    const getFilteredAccommodations = await accommodations.findAll({ where });
    console.log(`Here works `);


    if (!getFilteredAccommodations.length) {
      return res.status(404).json({
        success: false, message: "The requested accommodation by chosen criteria was not found",
      });
    }

    return res.status(200).json({
      success: true,
      results: getFilteredAccommodations,
    });
  } catch (err) {
    if (err instanceof ValidationError)
      res.status(400).json({ success: false });
    else
      res.status(500).json({
        message: err || "Some error occurred while getting the accommodations.",
      });
  }
};

// Creates a new accommmodation
exports.create = async (req, res) => {
  try {
    if (
      req.loggedUserRole !== "facilitator" &&
      req.loggedUserId !== req.body.id
    ) {
      return res.status(403).json({
        success: false,
        msg: "Your credentials rights are not sufficient.",
      });
    }
    
    await accommodations.create(req.body);
    res.status(202).json({
      success: true,
      msg: "Your new accommodation request was successfully sent to administrator",
    });
  } catch (err) {
    if (err instanceof ValidationError)
      res
        .status(400)
        .json({ success: false, msg: err.errors.map((e) => e.message) });
    else
      res.status(500).json({
        message:
          err.message ||
          "Some error occurred while creating the accommodation.",
      });
  }
};
