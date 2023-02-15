import axios from 'axios'
import { add_to_guest_cart, delete_from_guest_cart } from '../../guest_cart'

import tokens from '../../variables'

export const PRODUCTS = "PRODUCTS"
export const USER = "USER"
export const STATUS = "STATUS"
export const REGISTER = "REGISTER"
export const EDITORIALES = "EDITORIALES"
export const VENTAS = "VENTAS"

export function getProducts(){
    return function(dispatch){
        axios.get(`${tokens.server}/get_products`)
        .then((response)=>{
            dispatch({
                type: PRODUCTS,
                payload: response.data
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }
}

export function get_editoriales(){
    return function(dispatch){
        axios.get(`${tokens.server}/get_editoriales`)
        .then((response)=>{
            dispatch({
                type: EDITORIALES,
                payload: response.data
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }
}

/* USER */

export function getUser(id){
    return function(dispatch){
        axios.get(`${tokens.server}/get_user/${id}`)
        .then((response)=>{
            dispatch({
                type: USER,
                payload: response.data
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }
}

export function userAvailable(user){
    return function(dispatch){
        axios.get(`${tokens.server}/user_available/${user}`)
        .then((response)=>{
            dispatch({
                type: STATUS,
                payload: response.data
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }
}

export function register(data){
    return function(dispatch){
        axios.post(`${tokens.server}/register_user`, data)
        .then((response)=>{
            dispatch({
                type: REGISTER,
                payload: response.data
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }
}

/* CART */
export function addItem(data){
    return function(dispatch){
        if(data.user){
            axios.post(`${tokens.server}/add_item`, data)
            .then((response)=>{
                dispatch({
                    type: STATUS,
                    payload: response.data
                })
            })
            .catch((error)=>{
                console.log(error)
            })
        }else{
            add_to_guest_cart(data)
            dispatch({
                type: STATUS,
                payload: true
            })
        }
    }
}

export function deleteItem(data){
    return function(dispatch){
        if(data.user){
            axios.post(`${tokens.server}/delete_item`, data)
            .then((response)=>{
                dispatch({
                    type: STATUS,
                    payload: response.data
                })
            })
            .catch((error)=>{
                console.log(error)
            })
        }else{
            delete_from_guest_cart(data)
            dispatch({
                type: STATUS,
                payload: true
            })
        }
    }
}

/* ADMIN */
    /* MANGAS */
export function add_manga(data){
    return function(dispatch){
        axios.post(`${tokens.server}/post_serie_manga`, data)
        .then((response)=>{
            dispatch({
                type: STATUS,
                payload: response.data
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }
}

export function add_manga_vol(data){
    return function(dispatch){
        axios.post(`${tokens.server}/post_vol_manga`, data)
        .then((response)=>{
            dispatch({
                type: STATUS,
                payload: response.data
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }
}

    /* CÓMICS */
export function add_comic(data){
    return function(dispatch){
        axios.post(`${tokens.server}/post_serie_comic`, data)
        .then((response)=>{
            dispatch({
                type: STATUS,
                payload: response.data
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }
}

export function add_comic_vol(data){
    return function(dispatch){
        axios.post(`${tokens.server}/post_vol_comic`, data)
        .then((response)=>{
            dispatch({
                type: STATUS,
                payload: response.data
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }
}

    /* COLECCIONES */
export function add_col(data){
    return function(dispatch){
        axios.post(`${tokens.server}/post_serie_col`, data)
        .then((response)=>{
            dispatch({
                type: STATUS,
                payload: response.data
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }
}

export function add_col_vol(data){
    return function(dispatch){
        axios.post(`${tokens.server}/post_vol_col`, data)
        .then((response)=>{
            dispatch({
                type: STATUS,
                payload: response.data
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }
}

    /* LIBROS */
export function add_libro(data){
    return function(dispatch){
        axios.post(`${tokens.server}/post_serie_libro`, data)
        .then((response)=>{
            dispatch({
                type: STATUS,
                payload: response.data
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }
}

export function add_libro_vol(data){
    return function(dispatch){
        axios.post(`${tokens.server}/post_vol_libro`, data)
        .then((response)=>{
            dispatch({
                type: STATUS,
                payload: response.data
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }
}

/* STOCK */
export function change_stock(data){
    return function(dispatch){
        axios.post(`${tokens.server}/change_stock`, data)
        .then((response)=>{
            dispatch({
                type: STATUS,
                payload: response.data
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }
}

/* VENTAS */
export function get_ventas(){
    return function(dispatch){
        axios.get(`${tokens.server}/get_ventas`)
        .then((response)=>{
            dispatch({
                type: VENTAS,
                payload: response.data
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }
}

export function entregada(id){
    return function(dispatch){
        axios.get(`${tokens.server}/entregada/${id}`)
        .then((response)=>{
            dispatch({
                type: STATUS,
                payload: response.data
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }
}