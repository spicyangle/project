const db = require("../models/index.js");
const events = db.events;
const { ValidationError } = require("sequelize"); //necessary for model validations using sequelize
const { Op } = require("sequelize");

//Finds the all events
exports.findAllEvents = async (req, res) => {
  try {

    const {date,location,price,type} = req.query;
    let where = {};

    if (date)
    {
      where.date = {
        [Op.eq]: date,
      };

    }

    if (location)
    {
      where.location = {[Op.eq] : location,};
    }

    if (price)
    {
      where.price = {[Op.lte]: price,};
    }

    if (type)
    {
      where.type = {[Op.eq]: type,};
    }

    const getFilteredEvents = await events.findAll(where);

    if (!getFilteredEvents.length)
    {
      res.status(404).json({
        message: "The requested event by chosen criteria was not found",
      });
    }


    res
      .status(200)
      .json({
        success: true,
        URL: `/events${req.url}`,
        results: getEvents,
      });
  } 
  catch (err) {
    if (err instanceof ValidationError)
      res
        .status(400)
        .json({ success: false });
        else
      res.status(500).json({
        message:
          "Some error occurred while getting the accommodations.",
      });
  }
};

// Creates a new event
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

    const newEvents = await events.create(req.body);
    res
      .status(201)
      .json({
        success: true,
        msg: "New event created",
        URL: `/events/${newEvents.event_id}`,
      });
  } catch (err) {
    if (err instanceof ValidationError)
      res
        .status(400)
        .json({ success: false, msg: err.errors.map((e) => e.message) });
    else
      res.status(500).json({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
  }
};

