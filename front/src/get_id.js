export default function get_id(id){
    
    const type = id.split("t=")[1].split("&id=")[0]
    const serie = id.split("&id=")[1].split("&vol=")[0]
    const vol = id.split("&vol=")[1].split("&s=")[0]
    let special = id.split("&s=")[1]
    if(special === "true"){
        special = true
    }else{
        special = false
    }

    return{
        type: type,
        serie: serie,
        vol: vol,
        special: special
    }
}