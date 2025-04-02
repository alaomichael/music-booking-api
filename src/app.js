const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const artistRoutes = require('./routes/artistRoutes');
const eventRoutes = require('./routes/eventRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const userRoutes = require('./routes/userRoutes');
const auth = require('./middleware/auth');

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes); // No auth for /register and /login
app.use('/api/artists', artistRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});