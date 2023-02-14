const express = require('express');
const admin = require('../../firebase');
const db = admin.firestore();

const router = express();

router.post('/change_stock', async(req, res, next)=>{
    const data = req.body

    if(data.type !== "Figuras"){
        let _db = db.collection(`new-${data.type.toLowerCase()}`)
        await _db.get()
        .then((resp)=>{
            resp.forEach((doc)=>{
                if(doc.data().nombre === data.serie){
                    let vols = doc.data().vols
                    let change = false
                    for(let i = 0; i < vols.length; i++){
                        let tomo

                        if(vols[i].numero){
                            tomo = `${vols[i].numero}`
                        }

                        if(vols[i].special){
                            tomo = `${vols[i].numero} - ${vols[i].comment}`
                        }

                        if(vols[i].subtitulo){
                            tomo = `${vols[i].numero} - ${vols[i].subtitulo}`
                        }

                        if(vols[i].nombre){
                            tomo = vols[i].nombre
                        }

                        if(tomo === data.tomo){
                            vols[i].stock = parseInt(vols[i].stock) + parseInt(data.stock)
                            change = true
                        }

                    }

                    if(change){
                        _db.doc(doc.id).update({
                            vols: vols
                        })
                        .then(()=>{
                            return res.send(true)
                        })
                        .catch((err)=>{
                            err.sub = `Error al actualizar stock. File stock.js - /change_stock`
                            err.type = `actualizar db.collection('new-${data.type.toLowerCase()}')`
                            next(err)
                        })
                    }
                }
            })
        })
    }


})

module.exports = router