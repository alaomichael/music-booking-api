const Event = require('../models/event');

class EventService {
    static async createEvent(data) {
        return await Event.create(data);
    }

    static async getEvents() {
        return await Event.findAll();
    }
}

module.exports = EventService;