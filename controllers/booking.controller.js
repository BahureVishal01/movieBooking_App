const Booking = require("../models/booking.model");
const User = require("../models/user.model");
const constants = require("../utils/constants");

/**
 * Get the list of all the bookings.
 * ADMIN user should get the list of all the bookings
 * CUstomer user should get the list of all his/her bookings
 */
exports.getAllBookings = async (req, res) => {

    const user = await User.findOne({
        userId: req.userId
    })

    const queryObj = {};
    if (user.userType == constants.userTypes.admin) {
    } else {
        queryObj._id = user._id
    }

    const bookings = await Booking.find(queryObj);

    res.status(200).send(bookings);

}

/**
 * Get a booking based on the booking id
 */

exports.getBookingOnId = async (req, res) => {
    try {
        const bookings = await Booking.findOne({ _id: req.params.id });
        res.status(200).send(bookings);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            message: "Internal error while searching for the booking"
        })
    }

}


/**
 * Create a booking
 */
exports.createBooking = async (req, res) => {

    const user = await User.findOne({
        userId: req.userId
    })
    var bookingObject = {
        theatreId: req.body.theatreId,
        movieId: req.body.movieId,
        userId: user._id,
        timing: req.body.timing,
        noOfSeats: req.body.noOfSeats,
        totalCost: (req.body.noOfSeats * constants.ticketPrice)
    }
    try {
        const booking = await Booking.create(bookingObject);
        res.status(201).send(booking);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Internal error while creating the booking"
        })
    }

}

/**
 * Update the booking
 */
exports.updateBooking = async (req, res) => {

    const booking = await Booking.findOne({
        _id: req.params.id
    })
    booking.theatreId = req.body.theatreId != undefined ? req.body.theatreId : booking.theatreId;
    booking.movieId = req.body.movieId != undefined ? req.body.movieId : booking.movieId;
    booking.userId = req.body.userId != undefined ? req.body.userId : booking.userId;
    booking.timing = req.body.timing != undefined ? req.body.timing : booking.timing;
    booking.noOfSeats = req.body.noOfSeats != undefined ? req.body.noOfSeats : booking.noOfSeats;
    booking.totalCost = booking.noOfSeats * constants.ticketPrice;
    booking.status = req.body.status != undefined ? req.body.status : booking.status;

    try {
        const updatedBooking = await booking.save();
        res.status(201).send(updatedBooking);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Internal error while updating the booking"
        })
    }

}


