const express = require('express');
const admin = require('../../firebase');
const db = admin.firestore();

const router = express();

router.post('/post_serie_manga', async(req, res, next)=>{
    let serie = req.body
    serie.completa = false
    serie.vol_amount = parseInt(serie.vol_amount)
    serie.vols = []
    serie.tomos_arg = 0

    db.collection('new-mangas').add(serie)
    .then(async()=>{
        if(serie.nombre !== "SERIE DE PRUEBA"){
            const db_editoriales = db.collection('editoriales')
            await db_editoriales.get()
            .then((get_editoriales)=>{
                get_editoriales.forEach((doc)=>{
                    if(doc.data().nombre === serie.editorial){
                        let mangas = doc.data().mangas + 1
                        db.collection('editoriales').doc(doc.id).update({
                            mangas: mangas
                        })
                        .then(()=>{
                            return res.send(true)
                        })
                        .catch((err)=>{
                            err.sub = `Error al sumar manga a ${serie.editorial}. File manga.js - /post_serie_manga`
                            err.type = `actualiazr db.collection('editoriales)`
                            next(err)
                        })
                    }
                })
            })
            .catch((err)=>{
                err.sub = `Error al leer las editoriales. File manga.js - /post_serie_manga`
                err.type = `leer db.collection('editoriales')`
                next(err)
            })
        }else{
            console.log("Serie de prueba! no suma tomo...")
            return res.send(true)
        }    
    })
    .catch((err)=>{
        err.sub = `Error al guardar ${serie.nombre}. File manga.js - /post_serie_manga`
        err.type = `guardar db.collection('new-mangas)`
        next(err)
    })

})

router.post('/post_manga', async(req, res, next)=>{

})

module.exports = router