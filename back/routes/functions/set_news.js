const admin = require('../../firebase');
const db = admin.firestore();

async function set_news(_date, n){

    if(!n){
        return null
    }

    const date = new Date(_date)

    const _response = []

    const db_mangas = db.collection('new-mangas')
    await db_mangas.get()
    .then((get_mangas)=>{
        get_mangas.forEach((doc)=>{
            const vols = doc.data().vols
            for(let i = 0; i < vols.length; i++){
                if(vols[i].novedad){
                    const vol_date = new Date(vols[i].createdAt)
                    if(vol_date.getFullYear() < date.getFullYear()){
                        _response.push(`${doc.data().nombre} - ${vols[i].numero}`)
                    }else if(vol_date.getMonth() < date.getMonth()){
                        _response.push(`${doc.data().nombre} - ${vols[i].numero}`)
                    }else if(vol_date.getDate() < date.getDate()){
                        _response.push(`${doc.data().nombre} - ${vols[i].numero}`)
                    }
                }
            }
        })
    })

    const db_figuras = db.collection('figuras')
    await db_figuras.get()
    .then((get_figuras)=>{
        get_figuras.forEach((doc)=>{
            if(doc.data().novedad){
                const fig_date = new Date(doc.data().createdAt)
                    if(fig_date.getFullYear() < date.getFullYear()){
                        _response.push(`${doc.data().nombre}`)
                    }else if(fig_date.getMonth() < date.getMonth()){
                        _response.push(`${doc.data().nombre}`)
                    }else if(fig_date.getDate() < date.getDate()){
                        _response.push(`${doc.data().nombre}`)
                    }
            }
        })
    })

    console.log(_response)
    return _response

}

module.exports = set_news