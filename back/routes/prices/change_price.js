const express = require('express');
const admin = require('../../firebase');
const db = admin.firestore();

const router = express();

router.post('/change_price_global', async(req, res, next)=>{
    const data = req.body
    let editorial = {}
    const db_editoriales = db.collection('editoriales')
    await db_editoriales.get()
    .then((get_editoriales)=>{
        get_editoriales.forEach((doc)=>{
            if(doc.data().nombre === data.editorial){
                editorial = doc.data()
            }
        })
    })

    if(editorial.mangas > 0){
        const db_mangas = db.collection('new-mangas')
        await db_mangas.get()
        .then((get_mangas)=>{
            get_mangas.forEach(async(doc)=>{
                if(doc.data().editorial === editorial.nombre){
                    let vols = doc.data().vols
                    let changes = false
                    for(let i = 0; i < vols.length; i++){
                        if(parseInt(vols[i].precio) === parseInt(data.precio)){
                            vols[i].precio = data.nuevo
                            changes = true
                        }
                    }

                    if(changes){
                        await db_mangas.doc(doc.id).update({
                            vols: vols
                        })
                        .catch((err)=>{
                            err.sub = `Error al actualizar precios. File change_price.js - /change_price_global`
                            err.type = `update db.collection('new-mangas')`
                            next(err)
                        })
                    }
                }
            })
        })
    }

    return res.send(true)

})


module.exports = router