var express = require('express');
var router = express.Router();
var serviciosModel = require('./../../models/serviciosModel');

router.get('/', function(req, res, next) {
    res.render('admin/novedades',{
        layout: 'admin/layout',
        usuario: req.session.nombre,
    });
});

router.get('/servicios', async function(req, res, next) {
    var servicios = await serviciosModel.getServicios();
    res.render('admin/novedades',{
        layout: 'admin/layout',
        usuario: req.session.nombre,
        servicios
    });
});

module.exports = router;