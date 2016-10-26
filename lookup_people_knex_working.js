const settings = require("./settings_knex"); // settings.json

const knex = require('knex')({
  client: 'pg',
  connection: settings,
  pool: {},
  acquireConnectionTimeout: 10000,
  useNullAsDefault: true
});

const input = process.argv[2];


function knexConnect(knex) {
  knex.select().from('famous_people').where('last_name', input).asCallback(function (err,result){
    if (err) {
        return console.error("error running query", err);
      }
    printResults(result);
  });
}

function printResults(result) {
  let numPers = result.length;
  console.log(`Found ${numPers} person(s) by the name ${input}:`);
    for (i in result) {
      console.log(`-${i}: ${result[i].first_name} ${result[i].last_name}, born ${result[i].birthdate.toDateString()}`)
    }
}

knexConnect(knex);