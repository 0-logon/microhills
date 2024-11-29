const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

const startServer = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('Database synced!');
        app.listen(process.env.port || 3000, () => {
            console.log(`Server running on port ${process.env.PORT || 3000}`);
        });
    } catch (error) {
        console.error('Error starting the server: ', error);
    }
}
startServer();