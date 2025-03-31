const EventService = require('../services/eventService');

exports.createEvent = async (req, res) => {
    try {
        const event = await EventService.createEvent(req.body);
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create event' });
    }
};

exports.getEvents = async (req, res) => {
    try {
        const events = await EventService.getEvents();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve events' });
    }
};