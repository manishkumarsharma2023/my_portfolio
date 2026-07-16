require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Contact Model
const Contact = mongoose.model("Contact", {
  name: String,
  email: String,
  message: String,
});

// Home Route
app.get("/", (req, res) => {
  res.send("Portfolio Backend Running");
});

// Contact Route
app.post("/contact", async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.message) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }
    try {
    const contact = new Contact({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });

    await contact.save();

    res.json({
      message: "Message Saved Successfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Error Saving Message",
    });
  }
});
app.get("/contacts", async (req, res) => {

    const contacts = await Contact.find();

    res.json(contacts);

});
app.listen(3000, () => {
  console.log("Server running on port 3000");
});