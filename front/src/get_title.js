import get_id from "./get_id"

export default function get_title(vol){
    const data = get_id(vol.id)

    switch(data.type){
        case "manga":
            if(data.special){
                return `${vol.serie} #${data.vol} - ${vol.comment}`
            }else{
                if(vol.unico){
                    return `${vol.serie}`
                }else{
                    return `${vol.serie} #${data.vol}`
                }
            }
        case "comic":
            if(vol.subtitulo){
                return `${vol.serie} #${data.vol} - ${vol.subtitulo}`
            }else{
                if(vol.unico){
                    return `${vol.serie}`
                }else{
                    return `${vol.serie} #${data.vol}`
                }
            }
        case "col":
            return `${vol.serie} ${data.vol}`
        case "libro":
            if(vol.subtitulo){
                if(vol.unico){
                    return `${vol.serie} - ${vol.subtitulo}`
                }else{
                    return `${vol.serie} #${data.vol} - ${vol.subtitulo}`
                }
            }else{
                if(vol.unico){
                    return `${vol.serie}`
                }else{
                    return `${vol.serie} #${data.vol}`
                }
            }
        default:
            return "Sin título"
    }
}