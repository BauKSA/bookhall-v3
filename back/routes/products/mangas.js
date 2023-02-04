const express = require('express');
const admin = require('../../firebase');
const db = admin.firestore();

const set_news = require('../functions/set_news');
const update_editorial = require('../functions/update_editorial');
const notifications = require("../functions/notifications")

const router = express();

router.post('/post_serie_manga', async(req, res, next)=>{
    let serie = req.body
    serie.completa = false
    serie.vol_amount = parseInt(serie.vol_amount)
    serie.vols = []
    serie.tomos_arg = 0

    db.collection('new-mangas').add(serie)
    .then(async()=>{
        return res.send(true)
    }) 

})

router.post('/post_vol_manga', async(req, res, next)=>{
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
    vol.comment = vol.special
    if(vol.special !== ""){
        vol.special = true
        vol.id = `t=manga&id=${vol.id}&vol=${vol.numero}&s=true`
    }else{
        vol.special = false
        vol.id = `t=manga&id=${vol.id}&vol=${vol.numero}&s=false`
    }

    const date = new Date()
    vol.createdAt = date.toJSON()

    await set_news(vol.createdAt)
    .then(async()=>{
        const db_mangas = db.collection('new-mangas')
        await db_mangas.get()
        .then((get_mangas)=>{
            get_mangas.forEach((doc)=>{
                if(doc.id === serie_id){
                    let vols = doc.data().vols
                    editorial = doc.data().editorial
                    serie = doc.data().nombre
                    vols.push(vol)

                    db.collection('new-mangas').doc(doc.id).update({
                        vols: vols
                    })
                    .then(async()=>{
                        await update_editorial(editorial, "mangas")
                        .then(async()=>{
                            let data = {}
                            data.url = `https://thebookhall.com.ar/product/${vol.id}`
                            data.imgURL = vol.imgURL
                            data.id = serie_id
                            if(vol.special){
                                data.title = `${serie} #${vol.numero} - ${vol.comment}`
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
                        err.sub = `Error al guardar manga ${vol.serie} ${vol.numero} ${vol.comment}. File manga.js - /post_vol_manga`
                        err.type = `actualizar db.collection('new-mangas')`
                        next(err)
                    })
                }

            })
        })
        .catch((err)=>{
            err.sub = `Error al acceder a new-mangas. File manga.js - /post_vol_manga`
            err.type = `leer db.collection('new-mangas')`
            next(err)
        })
    })

})

module.exports = router