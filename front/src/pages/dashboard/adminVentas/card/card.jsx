import React from "react";

import { connect } from 'react-redux'
import { entregada, despachada } from '../../../../redux/actions'

import Swal from 'sweetalert2'

import './card.css'

class Card extends React.Component{
    componentDidUpdate(prevProps){
        if(prevProps.state.status !== this.props.state.status){
            if(this.props.state.status){
                Swal.fire({
                    icon: "success",
                    title: "Venta actualizada con éxito!"
                })
                .then(()=>{
                    window.location.reload()
                })
            }
        }
    }

    getItems = () => {
        return(
            <section className="ventas-card-table">
                <table className="ventas-card-items">
                    <tbody>
                        {
                            this.props.venta.purchase.items.map((i)=>{
                                return(
                                    <tr className="ventas-card-item">
                                        <td className="ventas-card-title">{i.serie} {i.numero}</td>
                                        <td className="ventas-card-price">{i.precio}</td>
                                    </tr>
                                )
                            })
                        }
                        <tr className="ventas-card-item total">
                            <td className="ventas-card-title">Total:</td>
                            <td className="ventas-card-price">${this.props.venta.purchase.total}</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        )
    }

    handleEntrega = (e) => {
        e.target.disabled = true
        this.props.entregada(this.props.venta.id)
    }

    handleDespacho = (e) => {
        e.preventDefault()
        const seguimiento = document.getElementById("input-seguimiento").value
        if(seguimiento.length === 0){
            return Swal.fire({
                icon: "error",
                title: "Ingrese un código de seguimiento válido"
            })
        }else{
            const buttons = document.getElementsByClassName("despacho")
            for(let i = 0; i < buttons.length; i++){
                buttons[i].disabled = true
            }

            const id = this.props.venta.id
            const data = {
                id: id,
                seguimiento: seguimiento
            }

            this.props.despachada(data)
            return null

        }
    }

    render(){
        if(this.props.venta){
            if(this.props.venta.despachar){
                return(
                    <div className="ventas-card-main envio">
                        <h5 className="ventas-card-id">{this.props.venta.id}</h5>
                        <p className="ventas-card-table-title">Items</p>
                        {this.getItems()}
                        <section className="ventas-card-retira retira-table">
                            <p className="ventas-card-table-title">Envío</p>
                            <table className="ventas-card-items">
                                <tbody>
                                    <tr className="ventas-card-item">
                                        <td className="ventas-card-data retira-data">
                                            {this.props.venta.shipping.destino.calle} {this.props.venta.shipping.destino.numero} {this.props.venta.shipping.destino.piso_dpto}
                                        </td>
                                    </tr>
                                    <tr className="ventas-card-item">
                                        <td className="ventas-card-data retira-data">{this.props.venta.shipping.destino.cp}</td>
                                    </tr>
                                    <tr className="ventas-card-item">
                                        <td className="ventas-card-data retira-data">{this.props.venta.shipping.destino.provincia}</td>
                                    </tr>
                                    <tr className="ventas-card-item">
                                        <td className="ventas-card-data retira-title">Recibe</td>
                                    </tr>
                                    <tr className="ventas-card-item">
                                        <td className="ventas-card-data retira-data">{this.props.venta.shipping.cliente.nombre}</td>
                                    </tr>
                                    <tr className="ventas-card-item">
                                        <td className="ventas-card-data retira-data">{this.props.venta.shipping.cliente.dni}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                        <button className="ventas-card-retira-button" onClick={this.handleEntrega}>Entregada</button>
                        <form className="seguimiento-form" onSubmit={this.handleDespacho}>
                            <input className="seguimiento-form-input"
                            type="text"
                            id="input-seguimiento"
                            placeholder="Cod. seguimiento"
                            />
                            <button className="ventas-card-retira-button despacho" type="submit">Despachada</button>
                        </form>
                    </div>
                )
            }else{
                return(
                    <div className="ventas-card-main">
                        <h5 className="ventas-card-id">{this.props.venta.id}</h5>
                        <p className="ventas-card-table-title">Items</p>
                        {this.getItems()}
                        <section className="ventas-card-retira">
                            <p className="ventas-card-table-title">Retira</p>
                            <table className="ventas-card-items">
                                <tbody>
                                    <tr className="ventas-card-item">
                                        <td className="ventas-card-data">{this.props.venta.retira.nombre}</td>
                                    </tr>
                                    <tr className="ventas-card-item">
                                        <td className="ventas-card-data">{this.props.venta.retira.dni}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                        <button className="ventas-card-retira-button" onClick={this.handleEntrega}>Entregada</button>
                    </div>
                )
            }
        }else{
            return(
                <div className="ventas-card-main">

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
    entregada,
    despachada
}

const conexion = connect(mapStateToProps, mapDispatchToProps)
export default  conexion(Card);