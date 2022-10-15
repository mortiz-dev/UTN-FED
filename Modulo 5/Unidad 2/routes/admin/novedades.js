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

router.get('/agregar', (req, res, next) => {
    res.render('admin/agregar',{
        layout: 'admin/layout',
    });
});

router.post('/agregar', async(req, res, next) => {
    try{
        if (req.body.TituloServicio == "" || req.body.DescripcionServicio == "" || req.body.ImagenServicio == "") {
            res.render('admin/agregar',{
                layout: 'admin/layout',
                error: true,
                mensaje: 'Todos los campos son obligatorios'
            });
        }
        else {
            var servicio = {
                TituloServicio: req.body.TituloServicio,
                DescripcionServicio: req.body.DescripcionServicio,
                ImagenServicio: req.body.ImagenServicio
            }
            await serviciosModel.insertServicio(servicio);
            res.redirect('/admin/novedades');
        }
    }
    catch (error) {
        console.log(error);
        res.render('admin/agregarNovedad',{
            layout: 'admin/layout',
            error: true,
            mensaje: 'Ocurrió un error'
            });
    }
});

module.exports = router;