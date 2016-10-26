const db = require("./knex"); // knex.js

const input = process.argv[2];



db.lookupPeople(input);