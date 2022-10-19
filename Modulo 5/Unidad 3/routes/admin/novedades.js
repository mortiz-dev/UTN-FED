var express = require('express');
var router = express.Router();
var serviciosModel = require('./../../models/serviciosModel');
var util = require('util');
var cloudinary = require('cloudinary').v2;

const uploader = util.promisify(cloudinary.uploader.upload);

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
    try {
        var img_id = '';
        if (req.files && Object.keys(req.files).length > 0){
            imagen = req.files.ImagenServicio;
            img_id = (await uploader(imagen.tempFilePath)).public_id;
        }
        if (req.body.TituloServicio != "" && req.body.DescripcionServicio != "" && req.body.PrecioServicio != "") {
            await serviciosModel.insertServicio(req.body, img_id);
            res.redirect('/admin/novedades');
        }
    /*try{
        var img_id = '';
        if (req.files && Object.keys(req.files).length > 0) {
            imagen = req.files.imagen;
            img_id = (await uploader(imagen.tempFilePath)).public_id;
        }
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
                ImagenServicio: img_id
            }
            await serviciosModel.insertServicio(servicio);
            res.redirect('/admin/novedades');
        }*/
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

router.get('/modificar/:Id', async(req, res, next) => {
    let Id = req.params.Id;
    let servicio = await serviciosModel.getServicioById(Id);
    res.render('admin/modificarServicio',{
        layout: 'admin/layout',
        servicio
    });
});

router.post('/modificar', async(req, res, next) => {
    try{
        var Id = req.body.Id;
        var servicio = {
            TituloServicio: req.body.TituloServicio,
            DescripcionServicio: req.body.DescripcionServicio,
            ImagenServicio: req.body.ImagenServicio
        }
        await serviciosModel.updateServicioById(Id, servicio);
        res.redirect('/admin/novedades');
    }
    catch (error) {
        console.log(error);
        res.render('admin/modificarServicio',{
            layout: 'admin/layout',
            error: true,
            mensaje: 'Ocurrió un error'
            });
    }
});

module.exports = router;