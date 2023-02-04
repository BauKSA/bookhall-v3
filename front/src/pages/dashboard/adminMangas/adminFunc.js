export function control_inputs_vol(){
    const serie = document.getElementById('addmangavol-serie')
        const numero = document.getElementById('addmangavol-numero')
        const stock = document.getElementById('addmangavol-stock')
        const precio = document.getElementById('addmangavol-precio')
        const cover = document.getElementById('addmangavol-img')
        const special = document.getElementById('addmangavol-special')

        const inputs = document.getElementsByClassName('dash-form-input')
        for(let i = 0; i < inputs.length; i++){
            inputs[i].style.borderColor = "transparent"
        }

        if(serie.value === "Serie"){
            serie.style.borderColor = "red"
            const error = {
                code: 400,
                text: "Ingrese una serie válida"
            }
            
            return error
        }

        if(numero.value <= 0){
            numero.style.borderColor = "red"
            const error = {
                code: 400,
                text: "Ingrese un número válido"
            }
            
            return error
        }

        console.log(stock.value)

        if(stock.value < 0){
            stock.style.borderColor = "red"
            const error = {
                code: 400,
                text: "Ingrese un stock válido"
            }
            
            return error
        }

        if(precio.value <= 0){
            precio.style.borderColor = "red"
            const error = {
                code: 400,
                text: "Ingrese un precio válido"
            }
            
            return error
        }

        if(!cover.value){
            cover.style.borderColor = "red"
            const error = {
                code: 400,
                text: "Ingrese una portada válida"
            }
            
            return error
        }

        let vol = {
            serie: serie.value,
            numero: numero.value,
            precio: numero.value,
            stock: stock.value,
            special: special.value,
            imgURL: cover.value,
            id: null
        }

        return {
            code: 200,
            vol: vol
        }
}

export function serie_exist(vol, _mangas){
    let serie_exist = false

    for(let i = 0; i < _mangas.length; i++){
        if(_mangas[i].nombre === vol.serie){
            serie_exist = true
            vol.id = _mangas[i].id
            const vols = _mangas[i].vols
            for(let j = 0; j < vols.length; j++){
                if(parseInt(vols[j]).numero === parseInt(vol.numero)
                && vols[j].comment.toLowerCase() === vol.special.toLowerCase()){
                    return {
                        code: 400,
                        exist: "tomo"
                    }
                }
            }
        }
    }

    if(!serie_exist){
        return {
            code: 400,
            exist: "serie"
        }
    }else{
        return {
            code: 200
        }
    }
}