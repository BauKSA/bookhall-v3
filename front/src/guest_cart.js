function clear_cart(prevStorage){
    let prev = false
    
    for(let i = 0; i < prevStorage.items.length; i++){
        if(prevStorage.items[i][1] !== '='){
            prev = true
        }
    }

    if(prev){
        return []
    }else{
        return prevStorage.items
    }

}

export function add_to_guest_cart(data){
    const prevStorage = JSON.parse(localStorage.getItem('cart'))

    let add = data.new_cant - data.cant
    let id = data.id

    if(prevStorage){
        if(prevStorage.items){
            let items = clear_cart(prevStorage)
            
            while(add > 0){
                items.push(id)
                add--
            }
    
            const cart = {items: items}
    
            localStorage.setItem('cart', JSON.stringify(cart))
        }else{
            const items = []

            while(add > 0){
                items.push(id)
                add--
            }

            const cart = {items: items}

            localStorage.setItem('cart', JSON.stringify(cart))
        }
    }else{
        const items = []

        while(add > 0){
            items.push(id)
            add--
        }

        const cart = {items: items}

        localStorage.setItem('cart', JSON.stringify(cart))
    }
}

export function delete_from_guest_cart(data){
    const prevStorage = JSON.parse(localStorage.getItem('cart'))

    let del = data.cant - data.new_cant
    let id = data.id
    let items = prevStorage.items

    for(let i = 0; i < items.length; i++){
        if(items[i] === id && del > 0){
            items[i] = null
            del--
        }
    }

    items = items.filter(Boolean)

    const cart = {items: items}

    localStorage.setItem('cart', JSON.stringify(cart))

}

export function get_guest_cart(){
    const prevStorage = JSON.parse(localStorage.getItem('cart'))

    if(prevStorage){
        if(prevStorage.items){
            return prevStorage.items
        }
    }

    return []

}