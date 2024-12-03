const mongoose = require("mongoose");

const password = process.argv[2];

const url = process.env.MONGODB_URI;

console.log("connecting to", url);

mongoose.set("strictQuery", false);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });
const personSchema = new mongoose.Schema({
  id: String,
  name: String,
  number: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject.id.toString();
    delete returnedObject.id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
