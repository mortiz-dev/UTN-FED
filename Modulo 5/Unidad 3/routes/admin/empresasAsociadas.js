var express = require('express');
var router = express.Router();
var empresasModel = require('./../../models/empresasAsociadasModel');

router.get('/', async function(req, res, next) {
    var empresas = await empresasModel.getempresasAsociadass();
    res.render('admin/EmpresasAsociadas/empresasIndex',{
        layout: 'admin/layout',
        usuario: req.session.nombre,
        empresas
    });
});

router.get('/eliminar/:Id', async(req, res, next) => {
    var Id = req.params.Id;
    await empresasModel.deleteempresasAsociadasById(Id);
    res.redirect('admin/EmpresasAsociadas/empresasIndex');
});

router.get('/agregar', (req, res, next) => {
    res.render('admin/EmpresasAsociadas/agregarEmpresa',{
        layout: 'admin/layout',
    });
});

router.post('/agregar', async(req, res, next) => {
    try{
        if (req.body.NombreEmpresa == "" || req.body.DescripcionEmpresa == "" || req.body.ImagenEmpresa == "") {
            res.render('admin/EmpresasAsocias/agregarEmpresa',{
                layout: 'admin/layout',
                error: true,
                mensaje: 'Todos los campos son obligatorios'
            });
        }
        else {
            var empresa = {
                NombreEmpresa: req.body.NombreEmpresa,
                DescripcionEmpresa: req.body.DescripcionEmpresa,
                ImagenEmpresa: req.body.ImagenEmpresa
            }
            await empresasModel.insertempresasAsociadas(empresa);
            res.redirect('admin/EmpresasAsocidas/empresasIndex');
        }
    }
    catch (error) {
        console.log(error);
        res.render('admin/EmpresasAsocias/agregarEmpresa',{
            layout: 'admin/layout',
            error: true,
            mensaje: 'Ocurrió un error'
            });
    }
});

router.get('/modificar/:Id', async(req, res, next) => {
    let Id = req.params.Id;
    let empresa = await empresasModel.getServicioById(Id);
    res.render('admin/EmpresasAsociadas/editarEmpresa',{
        layout: 'admin/layout',
        empresa
    });
});

router.post('/modificar', async(req, res, next) => {
    try{
        var Id = req.body.Id;
        var empresa = {
            NombreEmpresa: req.body.NombreEmpresa,
            DescripcionEmpresa: req.body.DescripcionEmpresa,
            ImagenEmpresa: req.body.ImagenEmpresa
        }
        await empresasModel.updateServicioById(Id, empresa);
        res.redirect('admin/EmpresasAsociadas/empresasIndex');
    }
    catch (error) {
        console.log(error);
        res.render('admin/EmpresasAsociadas/editarEmpresa',{
            layout: 'admin/layout',
            error: true,
            mensaje: 'Ocurrió un error'
            });
    }
});

module.exports = router;