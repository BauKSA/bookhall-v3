const express = require('express');
const admin = require('../../firebase');
const db = admin.firestore();

const router = express();

router.get('/get_products', async(req, res, next)=>{

    const editoriales = []
    const db_editoriales = db.collection('editoriales')
    await db_editoriales.get()
    .then((get_editoriales)=>{
        get_editoriales.forEach((doc)=>{
            const editorial = {
                nombre: doc.data().nombre,
                descuento: doc.data().descuento
            }

            editoriales.push(editorial)
        })
    }) 

    const products = []

    const db_mangas = db.collection('new-mangas')
    await db_mangas.get()
    .then((get_mangas)=>{
        get_mangas.forEach((doc)=>{
            let serie = doc.data()
            serie.descuento = 0
            serie.id = doc.id
            serie.type = "manga"
            for(let i = 0; i < editoriales.length; i++){
                if(editoriales[i].nombre === serie.editorial){
                    serie.descuento = editoriales[i].descuento
                }
            }

            if(parseInt(serie.vol_amount) === 1 && parseInt(serie.tomos_arg) === 1){
                serie.vols[0].unico = true
            }

            /* ONLY ID */
            let push = true
            const vols = doc.data().vols
            for(let i = 0; i < vols.length; i++){
                if(!vols[i].id){
                    push = false
                }
            }
            
            if(push){
                products.push(serie)
            }

        })
    })

    const db_comics = db.collection('new-comics')
    await db_comics.get()
    .then((get_comics)=>{
        get_comics.forEach((doc)=>{
            let serie = doc.data()
            serie.descuento = 0
            serie.id = doc.id
            serie.type = "comic"
            for(let i = 0; i < editoriales.length; i++){
                if(editoriales[i].nombre === serie.editorial){
                    serie.descuento = editoriales[i].descuento
                }
            }

            if(parseInt(serie.vol_amount) === 1 && parseInt(serie.tomos_arg) === 1){
                serie.vols[0].unico = true
            }

            /* ONLY ID */
            let push = true
            const vols = doc.data().vols
            for(let i = 0; i < vols.length; i++){
                if(!vols[i].id){
                    push = false
                }
            }
            
            if(push){
                products.push(serie)
            }
        })
    })

    const db_col = db.collection('new-colecciones')
    await db_col.get()
    .then((get_comics)=>{
        get_comics.forEach((doc)=>{
            let serie = doc.data()
            serie.descuento = 0
            serie.id = doc.id
            serie.type = "col"
            for(let i = 0; i < editoriales.length; i++){
                if(editoriales[i].nombre === serie.editorial){
                    serie.descuento = editoriales[i].descuento
                }
            }

            /* ONLY ID */
            let push = true
            const vols = doc.data().vols
            for(let i = 0; i < vols.length; i++){
                if(!vols[i].id){
                    push = false
                }
            }
            
            if(push){
                products.push(serie)
            }
        })
    })

    const db_libros = db.collection('new-libros')
    await db_libros.get()
    .then((get_libros)=>{
        get_libros.forEach((doc)=>{
            let serie = doc.data()
            serie.descuento = 0
            serie.id = doc.id
            serie.type = "libro"
            for(let i = 0; i < editoriales.length; i++){
                if(editoriales[i].nombre === serie.editorial){
                    serie.descuento = editoriales[i].descuento
                }
            }

            if(parseInt(serie.vol_amount) === 1 && parseInt(serie.tomos_arg) === 1){
                serie.vols[0].unico = true
            }

            /* ONLY ID */
            let push = true
            const vols = doc.data().vols
            for(let i = 0; i < vols.length; i++){
                if(!vols[i].id){
                    push = false
                }
            }
            
            if(push){
                products.push(serie)
            }
        })
    })
    .catch((err)=>{
        err.sub = `Error al traer productos. File products.js - /get_products`
        err.type = `traer productos.`
        next(err)
    })

    return res.send(products)

})

router.get('/get_editoriales', async(req, res, next)=>{

    const editoriales = []

    const db_editoriales = db.collection('editoriales')
    await db_editoriales.get()
    .then((get_editoriales)=>{
        get_editoriales.forEach((doc)=>{
            let editorial = doc.data()
            editorial.id = doc.id
            editoriales.push(editorial)
        })

        return res.send(editoriales)

    })
    .catch((err)=>{
        err.sub = `Error al traer editoriales. File products.js - /get_editoriales`
        err.type = `leer db.collection('editoriales').`
        next(err)
    })
})

router.get('/add_id', async(req, res, next)=>{

    const db_mangas = db.collection('new-mangas')
    await db_mangas.get()
    .then((get_mangas)=>{
        get_mangas.forEach((doc)=>{
            let vols = doc.data().vols
            for(let i = 0; i < vols.length; i++){
                if(vols[i].hardcover){
                    let id = `t=manga&id=${doc.id}&vol=${vols[i].numero}&s=true`
                    vols[i].id = id
                }else{
                    let id = `t=manga&id=${doc.id}&vol=${vols[i].numero}&s=false`
                    vols[i].id = id
                }
            }

            db.collection('new-mangas').doc(doc.id).update({
                vols: vols
            })
            .then((response)=>{
            })
            .catch((error)=>{
                console.log(error)
            })
        })
        
        return res.send("success")
    })
    .catch((error)=>{
        next(error)
    })

})

router.get('/set_date', async(req, res, next)=>{

    const db_mangas = db.collection('new-colecciones')
    await db_mangas.get()
    .then((get_mangas)=>{
        get_mangas.forEach((doc)=>{
            let vols = doc.data().vols
            for(let i = 0; i < vols.length; i++){
                const arr_date = vols[i].createdAt.split('/')
                const _vol_date = [arr_date[1], arr_date[0], arr_date[2]].join('/')
                vols[i].createdAt = _vol_date
            }

            db.collection('new-colecciones').doc(doc.id).update({
                vols: vols
            })
            .then((response)=>{
            })
            .catch((error)=>{
                console.log(error)
            })
        })
        
        return res.send("success")
    })
    .catch((error)=>{
        next(error)
    })

})

router.get('/set_news', async(req, res, next)=>{

    const db_mangas = db.collection('new-mangas')
    await db_mangas.get()
    .then((get_mangas)=>{
        get_mangas.forEach((doc)=>{
            let vols = doc.data().vols
            let change = false
            for(let i = 0; i < vols.length; i++){
                if(vols[i].createdAt !== "1/27/2023"){
                    vols[i].novedad = false
                    change = true
                }
            }
            if(change){
                db.collection('new-mangas').doc(doc.id).update({
                    vols: vols
                })
            }
        })
        
        return res.send("success")
    })
})


module.exports = router;