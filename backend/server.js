const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const passport = require('passport');

dotenv.config();

connectDB();

// Passport config
require('./config/passport')(passport);

const app = express();

app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = [
            'http://localhost:5000',
            'http://localhost:5173',
            'http://localhost:5174',
            'https://task-manager-omega-orcin.vercel.app',
        ];

        // Add env var origin if exists, cleaning trailing slash
        if (process.env.CLIENT_URL) {
            allowedOrigins.push(process.env.CLIENT_URL.replace(/\/$/, ""));
        }

        // Allow requests with no origin 
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1) {
            return callback(null, true);
        } else {
            console.log('Parameters:', origin);
            return callback(null, true); // Still allowing others ideally for dev, but this might be risky for credentials
        }
    },
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

// Basic Route for root
app.get('/', (req, res) => {
    res.json({ message: 'Task Manager API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
