const db = require("./knex"); // knex.js

const firstName = process.argv[2];
const lastName = process.argv[3];
const birthDate = process.argv[4];


db.addPerson(firstName, lastName, birthDate);