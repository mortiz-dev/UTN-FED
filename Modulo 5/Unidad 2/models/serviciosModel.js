var pool = require('./db');

async function getServicios(){
    try {
        var query = "select * from servicios order by Id";
        var rows = await pool.query(query);
        return rows;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {getServicios};