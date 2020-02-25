const { Client } = require('pg');
const client = new Client({
    connectionString: "postgresql://localhost:5432/aai"
});
client.connect();
module.exports = {client};
