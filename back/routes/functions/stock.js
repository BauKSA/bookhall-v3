const admin = require('../../firebase');
const db = admin.firestore();

async function update_stock_mangas(ids){
    const db_mangas = db.collection('new-mangas')
    const get_mangas = await db_mangas.get()
    get_mangas.forEach(async(doc)=>{
        let vols = doc.data().vols
        let change = false
        for(let i = 0; i < vols.length; i++){
            for(let j = 0; j < ids.length; j++){
                if(vols[i].id === ids[j].id){
                    vols[i].stock += ids[j].stock
                    if(vols[i].stock < 0) vols[i].stock = 0
                    let ventas = ids[j].stock
                    if(ventas < 0){
                        ventas *= -1
                        vols[i].ventas += ventas
                    }
                    change = true
                }
            }
        }
        if(change){
            await db_mangas.doc(doc.id).update({
                vols: vols
            })
            .catch((err)=>{
                throw new Error(err)
            })
        }
    })
}

async function update_stock_comics(ids){
    const db_comics = db.collection('new-comics')
    const get_comics = await db_comics.get()
    get_comics.forEach(async(doc)=>{
        let vols = doc.data().vols
        let change = false
        for(let i = 0; i < vols.length; i++){
            for(let j = 0; j < ids.length; j++){
                if(vols[i].id === ids[j].id){
                    vols[i].stock += ids[j].stock
                    if(vols[i].stock < 0) vols[i].stock = 0
                    let ventas = ids[j].stock
                    if(ventas < 0){
                        ventas *= -1
                        vols[i].ventas += ventas
                    }
                    change = true
                }
            }
        }
        if(change){
            await db_comics.doc(doc.id).update({
                vols: vols
            })
            .catch((err)=>{
                throw new Error(err)
            })
            
        }
    })
}

async function update_stock_cols(ids){
    const db_col = db.collection('new-colecciones')
    const get_col = await db_col.get()
    get_col.forEach(async(doc)=>{
        let vols = doc.data().vols
        let change = false
        for(let i = 0; i < vols.length; i++){
            for(let j = 0; j < ids.length; j++){
                if(vols[i].id === ids[j].id){
                    vols[i].stock += ids[j].stock
                    if(vols[i].stock < 0) vols[i].stock = 0
                    let ventas = ids[j].stock
                    if(ventas < 0){
                        ventas *= -1
                        vols[i].ventas += ventas
                    }
                    change = true
                }
            }
        }
        if(change){
            await db_col.doc(doc.id).update({
                vols: vols
            })
            .catch((err)=>{
                throw new Error(err)
            })
            
        }
    })
}

async function update_stock_libros(ids){
    const db_libros = db.collection('new-libros')
    const get_libros = await db_libros.get()
    get_libros.forEach(async(doc)=>{
        let vols = doc.data().vols
        let change = false
        for(let i = 0; i < vols.length; i++){
            for(let j = 0; j < ids.length; j++){
                if(vols[i].id === ids[j].id){
                    vols[i].stock += ids[j].stock
                    if(vols[i].stock < 0) vols[i].stock = 0
                    let ventas = ids[j].stock
                    if(ventas < 0){
                        ventas *= -1
                        vols[i].ventas += ventas
                    }
                    change = true
                }
            }
        }
        if(change){
            await db_libros.doc(doc.id).update({
                vols: vols
            })
            .catch((err)=>{
                throw new Error(err)
            })
            
        }
    })
}

module.exports = {
    update_stock_mangas: update_stock_mangas,
    update_stock_comics: update_stock_comics,
    update_stock_libros: update_stock_libros,
    update_stock_cols: update_stock_cols
}