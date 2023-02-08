export function control_inputs_vol(){
    const serie = document.getElementById('addlibrovol-serie')
        const numero = document.getElementById('addlibrovol-numero')
        const stock = document.getElementById('addlibrovol-stock')
        const precio = document.getElementById('addlibrovol-precio')
        const cover = document.getElementById('addlibrovol-img')
        const subtitulo = document.getElementById('addlibrovol-subtitulo')

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
            precio: precio.value,
            stock: stock.value,
            subtitulo: subtitulo.value,
            imgURL: cover.value,
            id: null
        }

        return {
            code: 200,
            vol: vol
        }
}

export function serie_exist(vol, _libros){
    let serie_exist = false

    for(let i = 0; i < _libros.length; i++){
        if(_libros[i].nombre === vol.serie){
            serie_exist = true
            vol.id = _libros[i].id
            const vols = _libros[i].vols
            for(let j = 0; j < vols.length; j++){
                if(parseInt(vols[j]).numero === parseInt(vol.numero)
                && vols[j].subtitulo.toLowerCase() === vol.subtitulo.toLowerCase()){
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