const http = require('node:http')
const app = require('./app')
const { connection } = require('./utils')

const server = http.createServer(app)

server.listen(8090, () => {
    connection.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to MySQL:', err);
            return;
        }
        console.log('Connected to MySQL database');
        connection.release();

    });
    console.log(`${process.env.NODE_ENV} server started at 8090`)
})
