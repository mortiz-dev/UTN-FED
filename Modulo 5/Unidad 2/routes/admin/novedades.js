var express = require('express');
var router = express.Router();
var serviciosModel = require('./../../models/serviciosModel');

router.get('/', async function(req, res, next) {
    var servicios = await serviciosModel.getServicios();
    res.render('admin/novedades',{
        layout: 'admin/layout',
        usuario: req.session.nombre,
        servicios
    });
});

router.get('/eliminar/:Id', async(req, res, next) => {
    var Id = req.params.Id;
    await serviciosModel.deleteServicioById(Id);
    res.redirect('/admin/novedades');
});

module.exports = router;