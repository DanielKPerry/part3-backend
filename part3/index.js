const express = require("express");
const app = express();
const morgan = require("morgan");
const Person = require("./models/person");

app.use(express.json());

morgan.token("type", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      tokens["type"](req, res),
    ].join(" ");
  })
);

/*let data = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
  {
    id: 5,
    name: "Daniel Perry",
    number: "123456789",
  },
];
*/

app.get("/info", (request, response) => {
  response.send(
    `<p>
      Phonebook has info for ${data.length} people <br/>
      ${Date(Date.now())}
    </p>`
  );
});

app.get("/api/people", (request, response) => {
  Person.find({}).then((people) => {
    response.json(people);
  });
});

app.get("/api/people/:id", (request, response) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      response.status(400).send({ error: "malformatted id" });
    });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  data = data.filter((person) => person.id !== id);

  response.status(204).end();
});

const generateId = () => {
  return Math.floor(Math.random() * 999999999999);
};

app.post("/api/people/", (request, response) => {
  const body = request.body;
  /*if (body.name === undefined) {
    return response.status(400).json({
      error: "name is missing",
    });
  } else if (body.number === undefined) {
    return response.status(400).json({
      error: "number is missing",
    });
  } else if (data.filter((person) => person.name === body.name).length !== 0) {
    return response.status(409).json({
      error: "name must be unique",
    });
  }*/
  const person = new Person({
    id: Math.floor(Math.random() * 999999999999),
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });

  //data = data.concat(person);
  //response.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
