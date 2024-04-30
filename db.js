const { Pool } = require('pg');
const connectionOptions = {
    user: 'avnadmin',
    host: 'post-tropical-alexandre-12345.a.aivencloud.com',
    database: 'defaultdb',
    password: 'AVNS_OtvJABv3Vzkb1MxEwDS',
    port: 17703,
    ssl: {
        rejectUnauthorized: false,
    },
};

const pool = new Pool(connectionOptions);

module.exports = pool;
