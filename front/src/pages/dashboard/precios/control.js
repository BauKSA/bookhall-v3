export function control_global(products = [], data){

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