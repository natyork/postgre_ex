const settings = require("./settings_knex"); // settings.json

var knex = require('knex')({
  client: 'pg',
  connection: settings,
  pool: {},
  acquireConnectionTimeout: 10000,
  useNullAsDefault: true
});

const firstName = process.argv[2];
const lastName = process.argv[3];
const birthDate = process.argv[4];




function addPerson() {
  knex.insert({first_name: firstName, last_name: lastName, birthdate: birthDate}).into('famous_people').asCallback(function(err,result) {
     if (err) {
        return console.error("error running query", err);
      }
      console.log('done');
  });
}

addPerson();
