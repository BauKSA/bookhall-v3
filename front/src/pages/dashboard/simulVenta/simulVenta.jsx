import React from "react";

import { connect } from 'react-redux'
import { simul_venta } from '../../../redux/actions'

import get_title from '../../../get_title'

import Loader from "../../../components/loader/loader";
import BackToDash from "../backToDash/backToDash";

import Swal from 'sweetalert2'

import '../forms.css'
import './simulVenta.css'

class SimulVenta extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            user: null,
            loading: true,
            products: [],
            tomos: [],
            venta: [],
            total: {
                total: 0,
                desc: 0
            }
        }
    }

    componentDidMount(){
        this.setState({
            user: this.props.user,
            products: this.props.products
        }, ()=>{
            this.state.products.sort((a, b) => a.nombre.localeCompare(b.nombre))
            if(!this.state.user){
                window.location.hash = '/'
            }else{
                if(!this.state.user.admin){
                    window.location.hash = '/'
                }
            }
        })
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps !== this.props){
            this.setState({
                user: this.props.user,
                products: this.props.products
            }, ()=>{
                this.state.products.sort((a, b) => a.nombre.localeCompare(b.nombre))
                if(!this.state.user){
                    window.location.href = '/'
                }else{
                    if(!this.state.user.admin){
                        window.location.href = '/'
                    }
                }
            })
        }

        if(prevProps.state.status !== this.props.state.status){
            if(this.props.state.status){
                Swal.fire({
                    icon: "success",
                    title: "Venta creada con éxito!"
                })
                .then(()=>{
                    window.location.reload()
                })
            }
        }

        if(prevState.user !== this.state.user){
            if(this.state.user){
                if(this.state.user.admin){
                    this.setState({
                        loading: false
                    })
                }
            }
        }
    }

    addItem = () => {
        console.log("Entramos")
        const serie = document.getElementById('simulventa-serie').value
        const tomo = document.getElementById('simulventa-tomo').value
        const products = this.state.products
        let total = this.state.total

        for(let i = 0; i < products.length; i++){
            if(products[i].nombre === serie){
                const vols = products[i].vols
                for(let j = 0; j < vols.length; j++){
                    let _tomo = `${vols[j].numero}`

                    if(vols[j].comment){
                        _tomo = `${vols[j].numero} ${vols[j].comment}`
                    }

                    if(vols[j].subtitulo){
                        _tomo = `${vols[j].numero} ${vols[j].subtitulo}`
                    }

                    if(vols[j].nombre){
                        _tomo = `${vols[j].nombre}`
                    }

                    if(_tomo === tomo){
                        let vol = vols[j]
                        vol.serie = products[i].nombre
                        const data = {
                            id: vols[j].id,
                            titulo: get_title(vol),
                            precio: parseInt(vol.precio),
                            desc: vol.precio - (vol.precio * products[i].descuento / 100)
                        }

                        const venta = this.state.venta
                        venta.push(data)
                        total.desc += data.desc
                        total.total += data.precio
                        this.setState({
                            venta: venta,
                            total: total
                        }, ()=>{
                            console.log(this.state.venta)
                        })

                    }
                }
            }
        }

        this.setState({
            tomos: []
        }, ()=>{
            document.getElementById('simulventa-serie').value = "Serie"
            document.getElementById('simulventa-tomo').value = "Tomo"
        })

    }

    handleChange = (e) => {
        const serie = e.target.value
        const products = this.state.products
        for(let i = 0; i < products.length; i++){
            if(products[i].nombre === serie){
                return this.setState({
                    tomos: products[i].vols
                })
            }
        }
    }

    handleUpdate = (e) => {
        e.preventDefault()
        this.props.simul_venta(this.state.venta)
        document.getElementById("simul-add-item").disabled = true
        document.getElementById("simul-create").disabled = true
    }

    render(){
        if(this.state.loading){
            return <Loader />
        }else{
            return(
                <div className="dashboard-main-container">
                    <BackToDash />
                    <h1 className="dashboard-title">
                        Crear venta
                    </h1>
                    <form className="dash-form-container" onSubmit={this.handleUpdate}>
                        <span className="dash-form-space">
                            <div className="dash-form-column">
                                <select
                                className="dash-form-input input-nombre"
                                id="simulventa-serie"
                                onChange={this.handleChange}
                                >
                                    <option key={`-simulventa`} selected={true} disabled={true}>
                                        Serie
                                    </option>
                                    {
                                        this.state.products.map((p)=>{
                                            return(
                                                <option key={`${p.id}-simulventa`}>
                                                    {p.nombre}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                                <br/>
                                <select
                                className="dash-form-input input-nombre"
                                id="simulventa-tomo"
                                >
                                    <option key={`-simulventa-tomo`} selected={true} disabled={true}>
                                        Tomo
                                    </option>
                                    {
                                        this.state.tomos.map((p)=>{
                                            return(
                                                <option key={`${p.id}-simulventa`}>
                                                    {p.nombre} {p.numero} {p.comment} {p.subtitulo}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </span>
                        <button className="dash-form-button add-item" id="simul-add-item" type="button" onClick={this.addItem}>
                            Añadir item
                        </button>
                        <button className="dash-form-button" type="submit" id="simul-create">
                            Crear venta
                        </button>
                    </form>
                    <section className="ticket-container">
                        <h3 className="ticket-title">
                            Ticket
                        </h3>
                        <table className="ticket-table">
                            <thead>
                                <tr className="ticket-items">
                                    <th className="ticket-item-title">
                                        Item
                                    </th>
                                    <th className="ticket-item-title">
                                        Precio
                                    </th>
                                    <th className="ticket-item-title">
                                        C/ desc.
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.venta.map((v)=>{
                                        return(
                                            <tr className="ticket-items">
                                                <td className="ticket-item-title">{v.titulo}</td>
                                                <td className="ticket-item-price">{v.precio}</td>
                                                <td className="ticket-item-desc">{v.desc}</td>
                                            </tr>
                                        )
                                    })
                                }
                                <tr className="ticket-items-total">
                                    <td className="ticket-item-title">Total</td>
                                    <td className="ticket-item-price">{this.state.total.total}</td>
                                    <td className="ticket-item-desc">{this.state.total.desc}</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
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
    simul_venta
}

const conexion = connect(mapStateToProps, mapDispatchToProps)
export default  conexion(SimulVenta);