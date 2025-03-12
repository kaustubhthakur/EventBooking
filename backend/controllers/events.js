const Event = require('../models/Event')
const createEvent = async(req,res)=>{
    try {
        const newevent = new Event(req.body);
        const saveevent = await newevent.save();
        res.status(201).json(saveevent);
    } catch (error) {
        console.error(error);
    }
}
const getEvents = async(req,res)=>{
    try {
        const events = await Event.find()
        res.status(201).json(events);
    } catch (error) {
        console.error(error)

    }
}
const deleteEvent = async(req,res)=>{
    try {
await Event.findByIdAndDelete(req.params.id);
res.status(201).json({message:"event has been deleted..."})
    } catch (error) {
        console.error(error);
    }
}

module.exports = {getEvents,createEvent,deleteEvent}