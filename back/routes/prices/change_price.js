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

    if(editorial.comics > 0){
        const db_comics = db.collection('new-comics')
        await db_comics.get()
        .then((get_comics)=>{
            get_comics.forEach(async(doc)=>{
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
                        await db_comics.doc(doc.id).update({
                            vols: vols
                        })
                        .catch((err)=>{
                            err.sub = `Error al actualizar precios. File change_price.js - /change_price_global`
                            err.type = `update db.collection('new-comics')`
                            next(err)
                        })
                    }
                }
            })
        })

        const db_col = db.collection('new-colecciones')
        await db_col.get()
        .then((get_comics)=>{
            get_comics.forEach(async(doc)=>{
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
                        await db_comics.doc(doc.id).update({
                            vols: vols
                        })
                        .catch((err)=>{
                            err.sub = `Error al actualizar precios. File change_price.js - /change_price_global`
                            err.type = `update db.collection('new-colecciones')`
                            next(err)
                        })
                    }
                }
            })
        })

    }

    if(editorial.libros > 0){
        const db_libros = db.collection('new-libros')
        await db_libros.get()
        .then((get_libros)=>{
            get_libros.forEach(async(doc)=>{
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
                        await db_libros.doc(doc.id).update({
                            vols: vols
                        })
                        .catch((err)=>{
                            err.sub = `Error al actualizar precios. File change_price.js - /change_price_global`
                            err.type = `update db.collection('new-libros')`
                            next(err)
                        })
                    }
                }
            })
        })
    }

    return res.send(true)

})

router.post('/change_price_serie', async(req, res, next)=>{
    const data = req.body
    let _db
    switch(data.type){
        case "manga":
            _db = db.collection('new-mangas')
            break

        case "comic":
            _db = db.collection('new-comics')
            break

        case "col":
            _db = db.collection('new-colecciones')
            break

        case "libro":
            _db = db.collection('new-libros')
            break

        default:
            return res.send(false)
    }

    await _db.get()
    .then((get_vols)=>{
        get_vols.forEach(async(doc)=>{
            if(doc.data().nombre === data.serie){
                let change = false
                let vols = doc.data().vols
                for(let i = 0; i < vols.length; i ++){
                    if(vols[i].precio === data.precio){
                        change = true
                        vols[i].precio = data.nuevo
                    }
                }

                if(change){
                    await _db.doc(doc.id).update({
                        vols: vols
                    })
                    .catch((err)=>{
                        err.sub = `Error al actualizar precios. File change_price.js - /change_price_serie`
                        err.type = `update db.collection('new-mangas')`
                        next(err)
                    })
                }
            }
        })
    })

    return res.send(true)

})

router.post('/change_price_tomo', async(req, res, next)=>{
    const data = req.body
    let _db
    switch(data.type){
        case "manga":
            _db = db.collection('new-mangas')
            break

        case "comic":
            _db = db.collection('new-comics')
            break

        case "col":
            _db = db.collection('new-colecciones')
            break

        case "libro":
            _db = db.collection('new-libros')
            break

        default:
            return res.send(false)
    }

    await _db.get()
    .then((get_vols)=>{
        get_vols.forEach(async(doc)=>{
            if(doc.data().nombre === data.serie){
                let change = false
                let vols = doc.data().vols
                for(let i = 0; i < vols.length; i ++){
                    let nombre = `${vols[i].numero}`
                    if(vols[i].special){
                        nombre = `${vols[i].numero} ${vols[i].comment}`
                    }else if(vols[i].subtitulo && vols[i].subtitulo !== ""){
                        nombre = `${vols[i].numero} ${vols[i].subtitulo}`
                    }else if(vols[i].nombre){
                        nombre = `${vols[i].nombre}`
                    }

                    if(nombre === data.vol){
                        vols[i].precio = data.nuevo
                        change = true
                    }

                }

                if(change){
                    await _db.doc(doc.id).update({
                        vols: vols
                    })
                    .catch((err)=>{
                        err.sub = `Error al actualizar precios. File change_price.js - /change_price_serie`
                        err.type = `update db.collection('new-mangas')`
                        next(err)
                    })
                }
            }
        })
    })

    return res.send(true)
})

module.exports = router