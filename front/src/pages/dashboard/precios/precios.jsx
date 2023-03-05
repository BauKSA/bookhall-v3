import React from "react";
import Loader from "../../../components/loader/loader";

import { connect } from 'react-redux'
import { change_price } from '../../../redux/actions'

import { set_data } from "./control";

import Swal from 'sweetalert2'
import get_id from "../../../get_id";

class Precios extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            user: null,
            products: [],
            editoriales: [],
            vols: [],
            oldPrice: null,
            id: null,
            type: "Global por editorial",
            loading: true
        }
    }

    componentDidMount(){
        this.props.state.status = null

        this.setState({
            user: this.props.user,
            products: this.props.products,
            editoriales: this.props.editoriales
        }, ()=>{
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
                products: this.props.products,
                editoriales: this.props.editoriales
            }, ()=>{
                if(!this.state.user){
                    window.location.href = '/'
                }else{
                    if(!this.state.user.admin){
                        window.location.href = '/'
                    }
                }
            })
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

        if(prevProps.state.status !== this.props.state.status && this.props.state.status){
            Swal.fire({
                icon: "success",
                title: "Precios actualizados con éxito!"
            })
            .then(()=>{
                window.location.reload()
            })
        }

    }

    getStyle = (e) => {
        if(e === this.state.type){
            return {"display":"flex"}
        }else{
            return {"display":"none"}
        }
    }

    selectType = (e) => {
        this.setState({
            type: e.target.value
        })
    }

    handleUpdate = (e) => {
        e.preventDefault()
        document.getElementById("modify-button").disabled = true

        const type = document.getElementById("modify-type").value
        if(type === "Global por editorial"){
            let data = {
                editorial: document.getElementById('modify-editorial').value,
                precio: parseInt(document.getElementById('modify-global-precio').value),
                nuevo: parseInt(document.getElementById('modify-global-precio-nuevo').value)
            }

            set_data(this.state.products, data, "global")
            .then((res)=>{
                if(res.isConfirmed){
                    this.props.change_price("global", data)
                }else{
                    document.getElementById("modify-button").disabled = false
                    return null
                }
            })
        }else if(type === "Por serie"){
            let data = {
                serie: document.getElementById('modify-serie').value,
                precio: parseInt(document.getElementById('modify-serie-precio').value),
                nuevo: parseInt(document.getElementById('modify-serie-precio-nuevo').value),
                type: ""
            }

            for(let i = 0; i < this.state.products.length; i++){
                if(this.state.products[i].nombre === data.serie){
                    const vols = this.state.products[i].vols
                    for(let j = 0; j < vols.length; j++){
                        data.type = get_id(vols[j].id).type
                    }
                }
            }

            set_data(this.state.products, data, "serie")
            .then((res)=>{
                if(res.isConfirmed){
                    this.props.change_price("serie", data)
                }else{
                    document.getElementById("modify-button").disabled = false
                    return null
                }
            })
        }else if(type === "Por tomo"){
            let data = {
                serie: document.getElementById('modify-tomo').value,
                vol: document.getElementById('modify-tomo-vol').value,
                nuevo: parseInt(document.getElementById('modify-tomo-precio-nuevo').value),
                type: ""
            }

            if(data.vol === "Tomo"){
                document.getElementById("modify-button").disabled = false
                return Swal.fire({
                    icon: "error",
                    title: "Seleccione un tomo válido!"
                })
            }

            let type = get_id(this.state.id).type
            data.type = type

            Swal.fire({
                icon: "info",
                title: `Modificar el precio de ${data.serie} ${data.vol} ($${this.state.oldPrice} -> $${data.nuevo})?`,
                showConfirmButton: true,
                confirmButtonText: "Confirmar"
            })
            .then((res)=>{
                if(res.isConfirmed){
                    this.props.change_price("tomo", data)
                }else{
                    document.getElementById("modify-button").disabled = false
                    return null
                }
            })

        }

    }

    getVols = (e) => {
        const serie = e.target.value
        const products = this.state.products
        for(let i = 0; i < products.length; i++){
            if(products[i].nombre === serie){
                return this.setState({
                    vols: products[i].vols
                })
            }
        }
    }

    getOldPrice = (e) => {
        const tomo = e.target.value
        console.log(tomo)
        const vols = this.state.vols
        for(let i = 0; i < vols.length; i++){
            let nombre = `${vols[i].numero}`
            if(vols[i].subtitulo){
                nombre = `${vols[i].numero} ${vols[i].subtitulo}`
            }else if(vols[i].special){
                nombre = `${vols[i].numero} ${vols[i].comment}`
            }else if(vols[i].nombre){
                nombre = `${vols[i].nombre}`
            }

            if(nombre === tomo){
                return this.setState({
                    oldPrice: vols[i].precio,
                    id: vols[i].id
                })
            }

        }
    }

    render(){
        if(this.state.loading){
            return <Loader />
        }else{
            return(
                <div style={
                    {"display":"flex",
                    "flexDirection":"column",
                    "alignItems":"center",
                    "justifyContent":"center",
                    "marginTop":"25px"}
                }>
                    <form className="dash-form-container" onSubmit={this.handleUpdate}>
                        <h3 className="dash-form-title">
                            Modificar precios
                        </h3>
                        <select
                        className="dash-form-input"
                        id="modify-type"
                        onChange={this.selectType}>
                            <option key={`global-modifyprecio`} selected={true}>
                                Global por editorial
                            </option>
                            <option key={`serie-modifyprecio`}>
                                Por serie
                            </option>
                            <option key={`tomo-modifyprecio`}>
                                Por tomo
                            </option>
                        </select>
                        <span className="dash-form-space" style={this.getStyle("Global por editorial")}>
                            <div className="dash-form-column">
                                <select
                                className="dash-form-input input-nombre"
                                id="modify-editorial">
                                    <option key={`-serie`} selected={true} disabled={true}>
                                        Editorial
                                    </option>
                                    {
                                        this.state.editoriales.map((e)=>{
                                            return <option key={e.id}>{e.nombre}</option>
                                        })
                                    }
                                </select>
                                <br/>
                                <label htmlFor="modify-global-precio" className="dash-form-label">
                                    Precio actual
                                </label>
                                <input
                                className="dash-form-input"
                                id="modify-global-precio"
                                type="number"
                                min={0}
                                />
                                <label htmlFor="modify-global-precio-nuevo" className="dash-form-label">
                                    Precio nuevo
                                </label>
                                <input
                                className="dash-form-input"
                                id="modify-global-precio-nuevo"
                                type="number"
                                min={0}
                                />
                            </div>
                        </span>
                        <span className="dash-form-space" style={this.getStyle("Por serie")}>
                            <div className="dash-form-column">
                                <select
                                className="dash-form-input input-nombre"
                                id="modify-serie">
                                    <option key={`-serie`} selected={true} disabled={true}>
                                        Serie
                                    </option>
                                    {
                                        this.state.products.map((p)=>{
                                            return <option key={p.id}>{p.nombre}</option>
                                        })
                                    }
                                </select>
                                <br/>
                                <label htmlFor="modify-global-precio" className="dash-form-label">
                                    Precio actual
                                </label>
                                <input
                                className="dash-form-input"
                                id="modify-serie-precio"
                                type="number"
                                min={0}
                                />
                                <label htmlFor="modify-global-precio-nuevo" className="dash-form-label">
                                    Precio nuevo
                                </label>
                                <input
                                className="dash-form-input"
                                id="modify-serie-precio-nuevo"
                                type="number"
                                min={0}
                                />
                            </div>
                        </span>
                        <span className="dash-form-space" style={this.getStyle("Por tomo")}>
                            <div className="dash-form-column">
                                <select
                                className="dash-form-input input-nombre"
                                id="modify-tomo"
                                onChange={this.getVols}>
                                    <option key={`-serie-tomo`} selected={true} disabled={true}>
                                        Serie
                                    </option>
                                    {
                                        this.state.products.map((p)=>{
                                            return <option key={`${p.id}-tomo`}>{p.nombre}</option>
                                        })
                                    }
                                </select>
                                <br />
                                <select
                                className="dash-form-input input-nombre"
                                id="modify-tomo-vol"
                                onChange={this.getOldPrice}>
                                    <option key={`-tomo`} selected={true} disabled={true}>
                                        Tomo
                                    </option>
                                    {
                                        this.state.vols.map((v)=>{
                                            return <option key={`${v.id}`}>
                                                {v.numero}
                                                {v.comment}
                                                {v.subtitulo}
                                                {v.nombre}
                                            </option>
                                        })
                                    }
                                </select>
                                <br/>
                                <p className="dash-form-label"
                                style={
                                    {
                                        "backgroundColor":"rgba(0, 0, 0,0.25)",
                                        "alignSelf":"center",
                                        "padding":"5px",
                                        "borderRadius":"5px",
                                        "paddingLeft":"15px",
                                        "paddingRight":"15px"
                                    }
                                }>
                                    Precio actual: ${this.state.oldPrice}
                                </p>
                                <label htmlFor="modify-tomo-precio-nuevo" className="dash-form-label">
                                    Precio nuevo
                                </label>
                                <input
                                className="dash-form-input"
                                id="modify-tomo-precio-nuevo"
                                type="number"
                                min={0}
                                />
                            </div>
                        </span>
                        <button className="dash-form-button" type="submit" id="modify-button">
                            Modificar
                        </button>
                    </form>
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
    change_price
}

const conexion = connect(mapStateToProps, mapDispatchToProps)
export default  conexion(Precios);