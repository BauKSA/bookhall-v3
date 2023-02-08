export function control_inputs_vol(){
    const serie = document.getElementById('addcolvol-serie')
    const nombre = document.getElementById('addcolvol-nombre')
    const guion = document.getElementById('addcolvol-guion')
    const dibujo = document.getElementById('addcolvol-dibujo')
    const color = document.getElementById('addcolvol-color')
    const tintas = document.getElementById('addcolvol-tintas')
    const otros = document.getElementById('addcolvol-otros')
    const sinopsis = document.getElementById('addcolvol-sinopsis')
    const precio = document.getElementById('addcolvol-precio')
    const stock = document.getElementById('addcolvol-stock')
    const cover = document.getElementById('addcolvol-img')

    const inputs = document.getElementsByClassName('dash-form-input')
    for(let i = 0; i < inputs.length; i++){
        inputs[i].style.borderColor = "transparent"
    }

    if(serie.value === "Colección"){
        serie.style.borderColor = "red"
        const error = {
            code: 400,
            text: "Ingrese una colección válida"
        }
        
        return error
    }

    if(nombre.value.length === 0){
        nombre.style.borderColor = "red"
        const error = {
            code: 400,
            text: "Ingrese un nombre válido"
        }
        
        return error
    }

    if(guion.value.length === 0){
        guion.style.borderColor = "red"
        const error = {
            code: 400,
            text: "Ingrese un guión válido"
        }
        
        return error
    }

    if(dibujo.value.length === 0){
        dibujo.style.borderColor = "red"
        const error = {
            code: 400,
            text: "Ingrese un dibujo válido"
        }
        
        return error
    }

    if(tintas.value.length === 0){
        tintas.style.borderColor = "red"
        const error = {
            code: 400,
            text: "Ingrese unas tintas válidas"
        }
        
        return error
    }

    if(color.value.length === 0){
        color.style.borderColor = "red"
        const error = {
            code: 400,
            text: "Ingrese un color válido"
        }
        
        return error
    }

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
        nombre: nombre.value,
        precio: precio.value,
        stock: stock.value,
        autores: {
            guion: guion.value,
            dibujo: dibujo.value,
            tintas: tintas.value,
            color: color.value,
            otros: otros.value
        },
        sinopsis: sinopsis.value,
        imgURL: cover.value,
        id: null
    }

    return {
        code: 200,
        vol: vol
    }
}

export function serie_exist(vol, _cols){
    let serie_exist = false

    for(let i = 0; i < _cols.length; i++){
        if(_cols[i].nombre === vol.serie){
            serie_exist = true
            vol.id = _cols[i].id
            const vols = _cols[i].vols
            for(let j = 0; j < vols.length; j++){
                if(vols[j].nombre.toLowerCase() === vol.nombre.toLowerCase()){
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