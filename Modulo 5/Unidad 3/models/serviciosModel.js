var pool = require('./db');

async function getServicios(){
    try {
        var query = "select * from servicios";
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

async function insertServicio(servicio){
    try {
        var query = "insert into servicios set ?";
        var rows = await pool.query(query, [servicio]);
        return rows;
    }
    catch (error) {
        console.log(error);
    }
}

async function getServicioById(Id){
    try {
        var query = "select * from servicios where Id = ?";
        var rows = await pool.query(query, [Id]);
        return rows[0];
    }
    catch (error) {
        console.log(error);
    }
}

async function updateServicioById(Id, servicio){
    try {
        var query = "update servicios set ? where Id = ?";
        var rows = await pool.query(query, [servicio, Id]);
        return rows;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {getServicios, deleteServicioById, insertServicio, getServicioById
    , updateServicioById};