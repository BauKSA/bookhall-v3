const express = require('express');
const admin = require('../../firebase');
const db = admin.firestore();

const set_news = require('../functions/set_news');
const update_editorial = require('../functions/update_editorial');
const notifications = require("../functions/notifications")

const router = express();

router.post('/post_serie_libro', async(req, res, next)=>{
    let serie = req.body
    serie.completa = false
    serie.vol_amount = parseInt(serie.vol_amount)
    serie.vols = []
    serie.tomos_arg = 0

    db.collection('new-libros').add(serie)
    .then(async()=>{
        return res.send(true)
    }) 

})

router.post('/post_vol_libro', async(req, res, next)=>{
    let vol = req.body
    const serie_id = vol.id
    let editorial = null
    let serie = null
    
    vol.ventas = 0
    vol.numero = parseInt(vol.numero)
    if(vol.stock === ""){
        vol.stock = 0
    }else{
        vol.stock = parseInt(vol.stock)
    }
    vol.precio = parseInt(vol.precio)
    vol.id = `t=libro&id=${vol.id}&vol=${vol.numero}&s=false`

    const date = new Date()
    vol.createdAt = date.toJSON()

    await set_news(vol.createdAt, false)
    .then(async()=>{
        const db_libros = db.collection('new-libros')
        await db_libros.get()
        .then((get_libros)=>{
            get_libros.forEach((doc)=>{
                if(doc.id === serie_id){
                    let vols = doc.data().vols
                    editorial = doc.data().editorial
                    serie = doc.data().nombre
                    vols.push(vol)

                    db.collection('new-libros').doc(doc.id).update({
                        vols: vols
                    })
                    .then(async()=>{
                        await update_editorial(editorial, "libros")
                        .then(async()=>{
                            let data = {}
                            data.url = `https://thebookhall.com.ar/product/${vol.id}`
                            data.imgURL = vol.imgURL
                            data.id = serie_id
                            if(vol.subtitulo){
                                data.title = `${serie} #${vol.numero} - ${vol.subtitulo}`
                            }else{
                                data.title = `${serie} #${vol.numero}`
                            }

                            await notifications.new_vol(data)
                            .then(()=>{
                                return res.send(true)
                            })
                        })
                        .catch((err)=>{
                            next(err)
                        })
                    })
                    .catch((err)=>{
                        err.sub = `Error al guardar libro ${vol.serie} ${vol.numero} ${vol.comment}. File libro.js - /post_vol_libro`
                        err.type = `actualizar db.collection('new-libros')`
                        next(err)
                    })
                }

            })
        })
        .catch((err)=>{
            err.sub = `Error al acceder a new-libros. File libro.js - /post_vol_libro`
            err.type = `leer db.collection('new-libros')`
            next(err)
        })
    })

})

module.exports = router