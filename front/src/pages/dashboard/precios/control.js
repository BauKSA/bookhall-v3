import Swal from "sweetalert2"

function control_global(products = [], data){

    if(data.editorial === "Editorial"){
        return {code:400,message:"Elija una editorial!"}
    }else if (data.precio.length === 0 || data.nuevo.length === 0){
        return {code:400,message:"Elija un precio válido!"}
    }

    let ed = false
    let precio = false
    let c = 0
    for(let i = 0; i < products.length; i++){
        if(products[i].editorial === data.editorial){
            ed = true
            const vols = products[i].vols
            for(let j = 0; j < vols.length; j++){
                if(parseInt(vols[j].precio) === parseInt(data.precio)){
                    precio = true
                    c++
                }
            }
        }
    }

    if(ed && precio){
        return {code:200, c:c}
    }else{
        if(!ed){
            return {code:400,message:`No se encontraron tomos de la editorial ${data.editorial}`}
        }else if(!precio){
            return {code:400,message:`No se encontraron tomos a $${data.precio} de la editorial ${data.editorial}`}
        }
    }
}

function control_serie(products = [], data){

    if(data.serie === "Serie"){
        return {code:400,message:"Elija una serie!"}
    }else if (data.precio.length === 0 || data.nuevo.length === 0){
        return {code:400,message:"Elija un precio válido!"}
    }

    let serie = false
    let precio = false
    let c = 0
    for(let i = 0; i < products.length; i++){
        if(products[i].nombre === data.serie){
            serie = true
            const vols = products[i].vols
            for(let j = 0; j < vols.length; j++){
                if(parseInt(vols[j].precio) === parseInt(data.precio)){
                    precio = true
                    c++
                }
            }
        }
    }

    if(serie && precio){
        return {code:200, c:c}
    }else{
        if(!serie){
            return {code:400,message:`No se encontraron tomos de ${data.serie}`}
        }else if(!precio){
            return {code:400,message:`No se encontraron tomos a $${data.precio} de ${data.serie}`}
        }
    }
}

export function set_data(products, data, type){
    if(isNaN(data.precio)){
        data.precio = 0
    }

    if(isNaN(data.nuevo)){
        data.nuevo = 0
    }

    let control
    if(type === "global"){
        control = control_global(products, data)
    }else{
        control = control_serie(products, data)
    }

    if(control.code === 400){
        document.getElementById("modify-button").disabled = false
        return Swal.fire({
            icon: "error",
            title: control.message,
            showConfirmButton: false,
            showCancelButton: true,
            cancelButtonText: "Volver"
        })
    }else{
        return Swal.fire({
            icon: "info",
            title: `Actualizar el precio de ${control.c} tomo/s?`,
            showConfirmButton: true,
            confirmButtonText: "Continuar"
        })
    }
}