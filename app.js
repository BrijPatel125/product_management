const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = app;
