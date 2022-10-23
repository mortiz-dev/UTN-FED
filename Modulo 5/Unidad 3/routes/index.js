var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var serviciosModel = require('./../models/serviciosModel');
var empresasModel = require('./../models/empresasAsociadasModel');
var cloudinary = require('cloudinary').v2;

/* GET home page. */
router.get('/', async function(req, res, next) {
  servicios = await serviciosModel.getServicios();
  servicios = servicios.splice(0,5);

  servicios = servicios.map(servicio => {
    if(servicio.img_id){
        const imagen = cloudinary.image(servicio.img_id, {
            width: 200,
            height: 200,
            crop: "fill"
        });
        return {...servicio, imagen};
    }
    else {
        return {...servicio, imagen: ''};
    }
});


  empresas = await empresasModel.getempresasAsociadass();
  res.render('index', {servicios, empresas});
});

router.post('/', async(req, res, next) => {
  var email = req.body.email;
  var mensaje = req.body.mensaje;

  var obj = {
    to: 'miguel_ortiz22@hotmail.com',
    subject: 'Mensaje de contacto',
    html: email + 'se contacto a traves de la pagina web con el siguiente mensaje: ' + mensaje
  }

  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })

  var info = await transport.sendMail(obj);

  res.render('index', { message: 'Mensaje enviado correctamente'});
})

module.exports = router;

