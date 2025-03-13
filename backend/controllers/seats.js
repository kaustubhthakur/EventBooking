const Seat = require('../models/Seat')
const Event = require('../models/Event')

const createSeat = async (req, res, next) => {
    const eventId = req.params.id;
    const newSeat = new Seat(req.body);

    try {
        const savedSeat = await newSeat.save();
        try {
            await Event.findByIdAndUpdate(eventId, {
                $push: { seats: savedSeat._id },
            });
        } catch (err) {
            next(err);
        }
        res.status(200).json(savedSeat);
    } catch (err) {
        next(err);
    }
};

const updateSeat = async (req, res, next) => {
    try {
        const updatedSeat = await Seat.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedSeat);
    } catch (err) {
        next(err);
    }
};

const updateSeatAvailability = async (req, res, next) => {
    try {
        const updatedSeat = await Seat.findByIdAndUpdate(
            req.params.id,
            { isBooked: req.body.isBooked },
            { new: true }
        );
        res.status(200).json({
            success: true,
            message: "Seat booking status has been updated.",
            seat: updatedSeat
        });
    } catch (err) {
        next(err);
    }
};

const deleteSeat = async (req, res, next) => {
    const eventId = req.params.eventid;
    try {
        await Seat.findByIdAndDelete(req.params.id);
        try {
            await Event.findByIdAndUpdate(eventId, {
                $pull: { seats: req.params.id },
            });
        } catch (err) {
            next(err);
        }
        res.status(200).json("Seat has been deleted.");
    } catch (err) {
        next(err);
    }
};

const getSeat = async (req, res, next) => {
    try {
        const seat = await Seat.findById(req.params.id);
        res.status(200).json(seat);
    } catch (err) {
        next(err);
    }
};

const getSeats = async (req, res, next) => {
    try {
        const seats = await Seat.find();
        res.status(200).json(seats);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createSeat,
    updateSeat,
    updateSeatAvailability,
    deleteSeat,
    getSeat,
    getSeats
};