const express = require('express');
const admin = require('../../firebase');
const db = admin.firestore();

const set_news = require('../functions/set_news');
const update_editorial = require('../functions/update_editorial');
const notifications = require("../functions/notifications")

const router = express();

router.post('/post_serie_comic', async(req, res, next)=>{
    let serie = req.body
    serie.completa = false
    serie.vol_amount = parseInt(serie.vol_amount)
    serie.vols = []
    serie.tomos_arg = 0

    db.collection('new-comics').add(serie)
    .then(async()=>{
        return res.send(true)
    }) 

})

router.post('/post_vol_comic', async(req, res, next)=>{
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
    vol.subtitulo = vol.subtitulo
    vol.id = `t=comic&id=${vol.id}&vol=${vol.numero}&s=false`

    const date = new Date()
    vol.createdAt = date.toJSON()

    await set_news(vol.createdAt, false)
    .then(async()=>{
        const db_comics = db.collection('new-comics')
        await db_comics.get()
        .then((get_comics)=>{
            get_comics.forEach((doc)=>{
                if(doc.id === serie_id){
                    let vols = doc.data().vols
                    editorial = doc.data().editorial
                    serie = doc.data().nombre
                    vols.push(vol)

                    db.collection('new-comics').doc(doc.id).update({
                        vols: vols
                    })
                    .then(async()=>{
                        await update_editorial(editorial, "comics")
                        .then(async()=>{
                            let data = {}
                            data.url = `https://thebookhall.com.ar/product/${vol.id}`
                            data.imgURL = vol.imgURL
                            data.id = serie_id
                            if(vol.special){
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
                        err.sub = `Error al guardar comic ${vol.serie} ${vol.numero} ${vol.comment}. File comic.js - /post_vol_comic`
                        err.type = `actualizar db.collection('new-comics')`
                        next(err)
                    })
                }

            })
        })
        .catch((err)=>{
            err.sub = `Error al acceder a new-comics. File comic.js - /post_vol_comic`
            err.type = `leer db.collection('new-comics')`
            next(err)
        })
    })

})

module.exports = router