const admin = require('../../firebase');
const db = admin.firestore();

async function update_editorial(editorial, type){
    const db_editoriales = db.collection('editoriales')
    await db_editoriales.get()
    .then((get_editoriales)=>{
        get_editoriales.forEach((doc)=>{
            if(doc.data().nombre === editorial){

                let count = 0

                switch(type){
                    case "mangas":
                        count = doc.data().mangas
                        count++
                        db.collection('editoriales').doc(doc.id).update({
                            mangas: count
                        })
                        .then(()=>{
                            return null
                        })
                        .catch((err)=>{
                            err.sub = `Error al actualizar (${type}) db editoriales. File update_editorial.js`
                            err.type = `actualizar db.collection('editoriales')`
                            throw new Error(err)
                        })
                        break;
                    case "comics":
                        count = doc.data().comics
                        count++
                        db.collection('editoriales').doc(doc.id).update({
                            comics: count
                        })
                        .then(()=>{
                            return null
                        })
                        .catch((err)=>{
                            err.sub = `Error al actualizar (${type}) db editoriales. File update_editorial.js`
                            err.type = `actualizar db.collection('editoriales')`
                            throw new Error(err)
                        })
                        break;
                    case "libros":
                        count = doc.data().libros
                        count++
                        db.collection('editoriales').doc(doc.id).update({
                            libros: count
                        })
                        .then(()=>{
                            return null
                        })
                        .catch((err)=>{
                            err.sub = `Error al actualizar (${type}) db editoriales. File update_editorial.js`
                            err.type = `actualizar db.collection('editoriales')`
                            throw new Error(err)
                        })
                        break;
                    default:
                        return null

                }
            }
        })
    })
    .catch((err)=>{
        err.sub = `Error al leer db editoriales. File update_editorial.js`
        err.type = `leer db.collection('editoriales')`
        throw new Error(err)
    })
}

module.exports = update_editorial