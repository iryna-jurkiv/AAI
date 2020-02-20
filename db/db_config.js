const { Client } = require('pg');
// const db = process.env.NODE_ENV === "test" ? "aai_test" : "aai";



if (process.env.NODE_ENV === "test") {
  client = new Client({
    connectionString: `postgresql://localhost:5432/aai_test`
  });

} else {
  client = new Client({
    connectionString: `postgresql://localhost:5432/aai`
  });
}



client.connect();

module.exports = {client};
