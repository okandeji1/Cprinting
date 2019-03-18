const mysql = require('mysql')
const con = {}
con.db = {
    local: {
        host: '127.0.0.1',
        user: 'root',
        password: 'special',
        database: 'cprinting'
    },
    live: {
        'host': 'address',
        user: 'user',
        password: 'something',
        database: 'cprinting'
    }
}
con.keepalive = () => {
    con.realConnect = mysql.createConnection((process.env.NODE_ENV === 'dev' ? con.db.local : con.db.live))
    con.realConnect.on('error', (err) => {
        console.log('The connection to the database was lost on error');
        con.realConnect.connect();
    })
    con.realConnect.connect((err) => {
        if (err) throw err;
        console.log('database connected')
    })
}
con.keepalive();
module.exports = con;