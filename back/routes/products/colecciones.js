const express = require('express');
const admin = require('../../firebase');
const db = admin.firestore();

const set_news = require('../functions/set_news');
const update_editorial = require('../functions/update_editorial');
const notifications = require("../functions/notifications")

const router = express();

router.post('/post_serie_col', async(req, res, next)=>{
    let serie = req.body
    serie.vols = []
    serie.tomos = 0

    db.collection('new-colecciones').add(serie)
    .then(async()=>{
        return res.send(true)
    })
    .catch((err)=>{
        err.sub = `Error al postear colección. File colecciones.js - /post_serie_col`
        err.type = `postear a db.collection('new-colecciones')`
        next(err)
    })

})

router.post('/post_vol_col', async(req, res, next)=>{
    let vol = req.body
    const serie_id = vol.id
    let editorial = null
    let serie = null
    
    vol.ventas = 0
    if(vol.stock === ""){
        vol.stock = 0
    }else{
        vol.stock = parseInt(vol.stock)
    }
    vol.precio = parseInt(vol.precio)
    vol.id = `t=col&id=${vol.id}&vol=${vol.nombre}&s=false`

    const date = new Date()
    vol.createdAt = date.toJSON()

    await set_news(vol.createdAt, false)
    .then(async()=>{
        const db_cols = db.collection('new-colecciones')
        await db_cols.get()
        .then((get_cols)=>{
            get_cols.forEach((doc)=>{
                if(doc.id === serie_id){
                    let vols = doc.data().vols
                    editorial = doc.data().editorial
                    serie = doc.data().nombre
                    vols.push(vol)

                    db.collection('new-colecciones').doc(doc.id).update({
                        vols: vols
                    })
                    .then(async()=>{
                        await update_editorial(editorial, "comics")
                        .then(async()=>{
                            let data = {}
                            data.url = `https://thebookhall.com.ar/product/${vol.id}`
                            data.imgURL = vol.imgURL
                            data.id = serie_id
                            data.title = `${vol.nombre} (${serie})`

                            await notifications.new_vol(data)
                            .then(()=>{
                                return res.send(true)
                            })
                        })
                    })
                }

            })
        })
        .catch((err)=>{
            err.sub = `Error al postear a new-colecciones. File colecciones.js - /post_vol_col`
            err.type = `postear a new-colecciones`
            next(err)
        })
    })

})

module.exports = router