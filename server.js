const express = require("express");
const http = require("http");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const { swaggerSpec } = require("./helpers/swaggerConnection");

const { dbConnect } = require("./config/db.config");

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Auth API
app.use("/api/v1/auth",require("./routes/auth/authRoutes"));

// Admin API
app.use("/api/admin",require("./routes/admin/userRoutes"));
app.use("/api/admin",require("./routes/admin/categoryRoutes"));
app.use("/api/admin",require("./routes/admin/venueRoutes"));
app.use("/api/admin",require("./routes/admin/eventRoutes"));
app.use("/api/admin",require("./routes/admin/couponRoutes"));
app.use("/api/admin",require("./routes/admin/bookingRoutes"));

// Organizer API
app.use("/api/organizer",require("./routes/organizer/eventRoutes"));

// User API
app.use("/api/v1/user",require("./routes/user/userRoutes"));
app.use("/api/v1/user",require("./routes/user/categoryRoutes"));
app.use("/api/v1/user",require("./routes/user/venueRoutes"));
app.use("/api/v1/user",require("./routes/user/eventRoutes"));
app.use("/api/v1/user",require("./routes/user/couponRoutes"));
app.use("/api/v1/user",require("./routes/user/bookingRoutes"));

global.clientConnection = dbConnect();

const server = http.createServer(app);

server.listen(process.env.PORT, process.env.HOST,() => {
    console.log(`Listening on http://${process.env.HOST}:${process.env.PORT}`);
});

module.exports = app;
