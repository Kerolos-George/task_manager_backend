const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const swaggerDocs = require('../config/swagger');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/authRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
console.log("JSON parser middleware applied"); 


swaggerDocs(app);

app.use('/api/auth', userRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
