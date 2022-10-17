var pool = require('./db');

async function getempresasAsociadass(){
    try {
        var query = "select * from empresaasociada";
        var rows = await pool.query(query);
        return rows;
    }
    catch (error) {
        console.log(error);
    }
}

async function deleteempresasAsociadasById(Id){
    try {
        var query = "delete from empresaasociada where Id = ?";
        var rows = await pool.query(query, [Id]);
        return rows;
    }
    catch (error) {
        console.log(error);
    }
}

async function insertempresasAsociadas(empresasAsociadas){
    try {
        var query = "insert into empresaasociada set ?";
        var rows = await pool.query(query, [empresasAsociadas]);
        return rows;
    }
    catch (error) {
        console.log(error);
    }
}

async function getempresasAsociadasById(Id){
    try {
        var query = "select * from empresaasociada where Id = ?";
        var rows = await pool.query(query, [Id]);
        return rows[0];
    }
    catch (error) {
        console.log(error);
    }
}

async function updateempresasAsociadasById(Id, empresasAsociadas){
    try {
        var query = "update empresaasociada set ? where Id = ?";
        var rows = await pool.query(query, [empresasAsociadas, Id]);
        return rows;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {getempresasAsociadass, deleteempresasAsociadasById, insertempresasAsociadas, getempresasAsociadasById
    , updateempresasAsociadasById};