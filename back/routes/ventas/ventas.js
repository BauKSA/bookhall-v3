const express = require('express');
const consultas = require('../../consultas');
const admin = require('../../firebase');
const db = admin.firestore();

const compra_despachada = require('../../mail_templates/compra_despachada')
const get_id = require('../functions/get_id');
const { update_stock_mangas, update_stock_comics, update_stock_libros, update_stock_cols } = require('../functions/stock');

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

router.post('/simul_venta', async(req, res, next)=>{
    let mangas = []
    let libros = []
    let comics = []
    let cols = []

    const venta = req.body
    venta.map((v)=>{
        let data = get_id(v.id)
        if(data.type === "manga"){
            let data = {
                id: v.id,
                stock: -1
            }
            return mangas.push(data)
        }else if(data.type === "comic"){
            let data = {
                id: v.id,
                stock: -1
            }
            return comics.push(data)
        }else if(data.type === "libro"){
            let data = {
                id: v.id,
                stock: -1
            }
            return libros.push(data)
        }else{
            let data = {
                id: v.id,
                stock: -1
            }
            return cols.push(data)
        }
    })

    let success = true

    try{
        if(mangas.length > 0){
            update_stock_mangas(mangas)
        }

        if(comics.length > 0){
            update_stock_comics(comics)
        }

        if(libros.length > 0){
            update_stock_libros(libros)
        }

        if(cols.length > 0){
            update_stock_cols(cols)
        }

    }catch(err){
        success = false
        err.sub = `Error al actualizar stock. File ventas.js - /simul_venta`
        err.type = `update stock - ${err.message}`
        return next(err)
    }

    return success ? res.send(true) : res.send(false)

})

module.exports = router