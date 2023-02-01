import React from "react";
import get_id from "../../get_id";
import Card from "./card/card";

import { connect } from 'react-redux'
import { addItem, deleteItem } from "../../redux/actions";

import './cart.css'
import { get_guest_cart } from "../../guest_cart";

class Cart extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            user: null,
            items: [],
            total: 0
        }
    }

    getItems = () => {
        let cart
        let products = this.props.products
        let cart_items = []
        let total = 0

        if(this.state.user){
            cart = this.state.user.cart
        }else{
            cart = get_guest_cart()
        }

        cart.map((id)=>{
            const data = get_id(id)

            for(let i = 0; i < products.length; i++){
                if(products[i].id === data.serie){
                    let vols = products[i].vols
                    for(let j = 0; j < vols.length; j++){
                        if(vols[j].id === id){
                            let item = vols[j]
                            item.descuento = products[i].descuento
                            item.serie = products[i].nombre

                            let precio = parseInt(item.precio)
                            precio = precio - (precio * item.descuento / 100)

                            total += precio

                            let exist = false
                            
                            for(let k = 0; k < cart_items.length; k++){
                                if(cart_items[k].id === item.id){
                                    cart_items[k].cant++
                                    exist = true
                                }
                            }

                            if(!exist){
                                item.cant = 1
                                cart_items.push(item)
                            }
                        }
                    }
                }
            }

            return this.setState({
                items: cart_items,
                total: total
            })

        })
    }

    componentDidMount(){
        this.setState({
            user: this.props.user
        }, ()=>{
            this.getItems()
        })
    }

    componentDidUpdate(prevProps){
        if(prevProps.user !== this.props.user){
            this.setState({
                user: this.props.user
            }, ()=>{
                this.getItems()
            })
        }

        if(prevProps.state.status !== this.props.state.status){
            if(this.props.state.status){
                return window.location.reload()
            }
        }
    }

    deleteItem = (e) => {
        e.target.disabled = true
        
        const cart = this.state.items
        const id = e.target.parentElement.id
        let cant = 0;

        for(let i = 0; i < cart.length; i++){
            if(cart[i].id === id){
                cant = cart[i].cant
            }
        }

        const data = {
            cant: cant,
            new_cant: 0,
            id: id,
            user: this.state.user
        }

        this.props.deleteItem(data)
    }

    changeCant = (e) => {
        e.target.disabled = true

        const cart = this.state.items
        const id = e.target.parentElement.id
        let cant = 0;

        for(let i = 0; i < cart.length; i++){
            if(cart[i].id === id){
                cant = cart[i].cant
            }
        }

        if(parseInt(e.target.value) > cant){
            const data = {
                cant: cant,
                new_cant: parseInt(e.target.value),
                id: id,
                user: this.state.user
            }

            this.props.addItem(data)
        }else if(parseInt(e.target.value) < cant){
            const data = {
                cant: cant,
                new_cant: parseInt(e.target.value),
                id: id,
                user: this.state.user
            }

            this.props.deleteItem(data)
        }

    }

    render(){
        if(this.state.items.length === 0){
            return(
                <div className="cart-main-container">
                    <h1 className="cart-title">
                        Mi carrito
                    </h1>
                    <div className="cart-card-container">
                        <p className="cart-empty">
                            Tu carrito está vacío!
                        </p>
                    </div>
                </div>
            )
        }else{
            return(
                <div className="cart-main-container">
                    <h1 className="cart-title">
                        Mi carrito
                    </h1>
                    <div className="cart-card-container">
                        {
                            this.state.items.map((i)=>{
    
                                const stock = []
    
                                for(let j = i.stock; j > 0; j--){
                                    stock.push(j)
                                }
    
                                return(
                                    <div className="cart--container">
                                        <Card vol={i} key={i.id} />
                                        <span className="cart-actions">
                                            <span className="cart-inputs" id={i.id}>
                                                <label className="cart-cant-label" htmlFor="item-cant">
                                                    Cant.
                                                </label>
                                                <select className="cart-cant-select" id="item-cant" onChange={this.changeCant}>
                                                    {
                                                        stock.map((c)=>{
                                                            if(c === i.cant){
                                                                return <option selected={true} key={Math.random()}>{c}</option>
                                                            }else{
                                                                return <option key={Math.random()}>{c}</option>
                                                            }
                                                        })
                                                    }
                                                </select>
                                                <button onClick={this.deleteItem} className="cart-delete-button">
                                                    Eliminar
                                                </button>
                                                <p className="cart-item-total">
                                                    ${i.precio * i.cant - (i.precio * i.cant * i.descuento / 100)}
                                                </p>
                                            </span>
                                        </span>
                                    </div>
                                )
                            })
                        }
                        <div className="cart-total-container">
                            <span className="cart-total-actions">
                                <p className="cart-total-total">
                                    Total
                                </p>
                                <span className="cart-total">
                                    <p className="cart-total-p">
                                        ${this.state.total}
                                    </p>
                                </span>
                                <button className="to-payment">
                                    <p className="to-payment-p">
                                        Proceder al pago
                                    </p>
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            )
        }
    }

}

function mapStateToProps(state) {
    return {
        state: state
    }
}

const mapDispatchToProps = {
    addItem,
    deleteItem
}

const conexion = connect(mapStateToProps, mapDispatchToProps)
export default  conexion(Cart);