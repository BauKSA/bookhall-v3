const express = require('express');
const consultas = require('../../consultas');
const admin = require('../../firebase');
const db = admin.firestore();
const compra_despachada = require('../../mail_templates/compra_despachada')

const router = express();

router.get('/get_ventas', async(req, res, next)=>{

    const ventas = []

    const db_ventas = db.collection('ventas')
    await db_ventas.get()
    .then((get_ventas)=>{
        get_ventas.forEach((doc)=>{
            let venta = doc.data()
            venta.id = doc.id
            ventas.push(venta)
        })

        return res.send(ventas)
    })
    .catch((err)=>{
        err.sub = `Error al leer ventas. File ventas.js - /get_ventas`
        err.type = `leer db.collection('ventas')`
        next(err)
    })
})

router.get('/entregada/:id', async(req, res, next)=>{
    const id = req.params.id
    db.collection('ventas').doc(id).delete()
    .then(()=>{
        return res.send(true)
    })
    .catch((err)=>{
        err.sub = `Error al borrar ventas. File ventas.js - /entregada`
        err.type = `delete db.collection('ventas')`
        next(err)
    })
})

router.get('/despachada/:id/:seg', async(req, res, next)=>{
    const id = req.params.id
    const seg = req.params.seg
    await db.collection('ventas').get()
    .then((get_ventas)=>{
        get_ventas.forEach((doc)=>{
            if(doc.id === id){
                let shipping = doc.data().shipping
                shipping.despachada = true
                shipping.seguimiento = seg
                db.collection('ventas').doc(doc.id).update({
                    shipping: shipping
                })
                .then(()=>{
                    const mail = doc.data().shipping.cliente.email
                    const data = {
                        id: id,
                        seg: seg
                    }

                    var transporter = nodemailer.createTransport({
                        host: 'smtp.gmail.com',
                        port: 465,
                        secure: true, // use SSL
                        auth: {
                            user: consultas.mail,
                            pass: consultas.pass
                        }
                    })

                    var mailOptions = {
                        from: `Actualización sobre su pedido <${consultas.mail}>`, // sender address (who sends)
                        to: mail, // list of receivers (who receives)
                        subject: `Compra despachada!`, // Subject line
                        html: compra_despachada(data)
                    };
        
                    transporter.sendMail(mailOptions, function(error, info){
                        if(error){
                            console.log(error);
                        }
                        console.log("Enviamos el mail")
                    })

                    return res.send(true)

                })
            }
        })
    })
    .catch((err)=>{
        err.sub = `Error al borrar ventas. File ventas.js - /entregada`
        err.type = `delete db.collection('ventas')`
        next(err)
    })
})

module.exports = router