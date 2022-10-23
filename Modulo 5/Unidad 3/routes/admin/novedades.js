var express = require('express');
var router = express.Router();
var serviciosModel = require('./../../models/serviciosModel');
var util = require('util');
var cloudinary = require('cloudinary').v2;

const uploader = util.promisify(cloudinary.uploader.upload);

router.get('/', async function(req, res, next) {
    var servicios = await serviciosModel.getServicios();

    servicios = servicios.map(servicio => {
        if(servicio.img_id){
            const imagen = cloudinary.image(servicio.img_id, {
                width: 100,
                height: 100,
                crop: "fill"
            });
            return {...servicio, imagen};
        }
        else {
            return {...servicio, imagen: ''};
        }
    });

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
            imagen = req.files.imagen;
            img_id = (await uploader(imagen.tempFilePath)).public_id;
        }
        if (req.body.TituloServicio != "" && req.body.DescripcionServicio != "") {
            await serviciosModel.insertServicio({...req.body, img_id});
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