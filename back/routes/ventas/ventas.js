const express = require('express');
const admin = require('../../firebase');
const db = admin.firestore();

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

module.exports = router