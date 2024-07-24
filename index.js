const mongoose = require("mongoose");

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

// Create a Schema object
const UserSchema = new mongoose.Schema({
  myName: { type: String },
  mySID: { type: String },
});

// Create a Model object
const Student = mongoose.model("s24students", UserSchema);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/form.html");
});

app.post("/", async (req, res) => {
  // get the data from the form
  const uri = req.body.myuri;
  if (!uri) {
    res.status(403)
    res.send(`<h1>Bad Request, Please enter a valid URI</h1>`);
    return;
  }
  // connect to the database and log the connection
  try {
    await mongoose
    .connect(uri,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("MongoDB connected...")
  } catch (error) {
    console.log(error)
  }

  // add the data to the database
  const user = new Student({
    myName: "Tamoor Haider Aslam",
    mySID:  "300367290"
  });

  try {
    const newUser = await user.save();
    // send a response to the user
    res.send(`<h1>Document ${newUser} Added</h1>`);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
  
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
