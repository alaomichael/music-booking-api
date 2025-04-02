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
        const result = await Event.findAll();
        // console.log("Result ", result);
        // Convert ticket_price to a number for all events
        return result.map(event => ({
            ...event,
            ticket_price: parseFloat(event.ticket_price)
        }));
    }
}

module.exports = EventService;