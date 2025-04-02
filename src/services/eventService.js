const Event = require('../models/event');

class EventService {
    static async createEvent(data) {
        // return await Event.create(data);
        const result = await Event.create(data);
        let event = result;
        // console.log("New Event: ", event);
        // Convert ticket_price to a number
        event.ticket_price = parseFloat(event.ticket_price);
        return event;
    }

    static async getEvents() {
        // return await Event.findAll();
        const result = await Event.findAll();
        // Convert ticket_price to a number for all events
        return result.rows.map(event => ({
            ...event,
            ticket_price: parseFloat(event.ticket_price)
        }));
    }
}

module.exports = EventService;