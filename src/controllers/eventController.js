const EventService = require('../services/eventService');

exports.createEvent = async (req, res) => {
    // try {
        // const event = await EventService.createEvent(req.body);
        // res.status(201).json(event);
        const payload = req.body;
        // const { ticket_price } = payload;
        try {
            // Validate ticket_price as a number
            if (typeof payload.ticket_price !== 'number' || payload.ticket_price < 0) {
                return res.status(400).json({ error: 'Ticket price must be a non-negative number' });
            }
            const event = await EventService.createEvent(payload);
            return res.status(201).json(event);
    } catch (error) {
        console.log("Error ", error)
        res.status(500).json({ error: 'Failed to create event' });
    }
};

exports.getEvents = async (req, res) => {
    try {
        const events = await EventService.getEvents();
        res.status(200).json(events);
    } catch (error) {
        console.log("Error ", error)
        res.status(500).json({ error: 'Failed to retrieve events' });
    }
};