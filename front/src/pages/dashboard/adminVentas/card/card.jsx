import React from "react";

import { connect } from 'react-redux'
import { entregada } from '../../../../redux/actions'

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

    handleClick = (e) => {
        e.target.disabled = true
        this.props.entregada(this.props.venta.id)
    }

    render(){
        if(this.props.venta){

            if(this.props.venta.despachar){
                return(
                    <div className="ventas-card-main">
                        {this.props.venta.id}
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
                        <button className="ventas-card-retira-button" onClick={this.handleClick}>Entregada</button>
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
    entregada
}

const conexion = connect(mapStateToProps, mapDispatchToProps)
export default  conexion(Card);