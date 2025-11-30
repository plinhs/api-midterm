require('dotenv').config();
const express = require('express');
const app = express();
const swaggerDocs = require('./config/swagger');
const cors = require('cors');
app.use(cors());


app.use(express.json());

app.use('/api/v1/mobile', require('./routes/mobileRoutes'));
app.use('/api/v1/bank', require('./routes/bankRoutes'));
app.use('/api/v1/web', require('./routes/websiteRoutes'));
app.use('/api/v1/admin', require('./routes/adminRoutes'));

swaggerDocs(app);

app.get('/', (req, res) => {
    res.send("Mobile Billing API is running...");
});

app.get("/debug-env", (req, res) => {
    res.json({
        JWT_SECRET: process.env.JWT_SECRET,
        jwt_secret: process.env.jwt_secret,
        keys: Object.keys(process.env)
    });
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
