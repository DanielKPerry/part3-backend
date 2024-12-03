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

const generateId = () => {
  return Math.floor(Math.random() * 999999999999);
};

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  id: Math.floor(Math.random() * 999999999999),
  name: process.argv[2],
  number: process.argv[3],
});

if (process.argv.length < 4) {
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((person) => console.log(person.name, person.number));
    mongoose.connection.close();
  });
  //process.exit(1);
} else {
  person.save().then((result) => {
    console.log("person saved!");
    console.log(process.argv);
    mongoose.connection.close();
  });
}

module.exports = mongoose.model("Person", personSchema);
