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

async function deleteServicioById(Id){
    try {
        var query = "delete from servicios where Id = ?";
        var rows = await pool.query(query, [Id]);
        return rows;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {getServicios, deleteServicioById};