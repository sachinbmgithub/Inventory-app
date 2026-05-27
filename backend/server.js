const express = require("express");
const cors = require("cors");
const itemRoutes = require("./routes/itemRoutes");
const app = express();

// MIDDLEWARE

app.use(cors());

app.use(express.json());

// ROUTES
app.use("/items", itemRoutes);


// SERVER
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});