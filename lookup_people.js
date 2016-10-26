const pg = require("pg");
const settings = require("./settings"); // settings.json
const input = process.argv[2];

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }

  client.query(`SELECT * FROM famous_people WHERE last_name = $1;`,[input], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }

    let numPers = result.rows.length;
    console.log(result.rows);
    console.log(`Found ${numPers} person(s) by the name ${input}:`);
    for (i in result.rows) {
      console.log(`-${i}: ${result.rows[i].first_name} ${result.rows[i].last_name}, born ${result.rows[i].birthdate}`)
    }

    client.end();
  });
});