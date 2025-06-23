const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.listen(port, () => console.log(`port initialized at ${port}...`));

mongoose
  .connect(
    "mongodb+srv://suprabhakumari2020:suprabha2020@basics.nttqyal.mongodb.net/?retryWrites=true&w=majority&appName=Basics"
  )
  .then(() => console.log("connected to database..."))
  .catch((err) => console.log(err));

const { Schema, model } = mongoose;

const CustomerDataSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});
const Customer = model("customer", CustomerDataSchema);

app.post("/sign-up", async (req, res) => {
  const { email, password } = req.body;
  try {
    const customerExists = await Customer.findOne({ email, email });
    if (customerExists) res.status(409).send("User already exists, Sign in!");
    const customer = Customer.create({ email, password });
    res.status(201).send(`Customer created: ${customer}`);
    console.log("done creating...");
  } catch (err) {
    res.status(500).send("Currently we are facing server issues...");
    console.log(err);
  }
});

app.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;
  try {
    const isCustomer = await Customer.findOne({ email, password });
    if (!isCustomer) res.status(401).send("Incorrect email or password!");
    res.status(200).json(isCustomer);
    console.log("signed-in...");
  } catch (err) {
    res.status("500").send("Currently we are facing server issues...");
    console.log(err);
  }
});
app.use((error, req, res, next) => res.send("Something went wrong!"));
