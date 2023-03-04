import React from "react";
import Loader from "../../../components/loader/loader";

import { connect } from 'react-redux'
import { change_price } from '../../../redux/actions'

import { control_global } from "./control";

import Swal from 'sweetalert2'

class Precios extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            user: null,
            products: [],
            editoriales: [],
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

            if(isNaN(data.precio)){
                data.precio = 0
            }

            if(isNaN(data.nuevo)){
                data.nuevo = 0
            }

            let control = control_global(this.state.products, data)
            if(control.code === 400){
                document.getElementById("modify-button").disabled = false
                return Swal.fire({
                    icon: "error",
                    title: control.message
                })
            }else{
                Swal.fire({
                    icon: "info",
                    title: `Actualizar el precio de ${control.c} tomos?`,
                    showConfirmButton: true,
                    confirmButtonText: "Continuar"
                })
                .then((res)=>{
                    if(res.isConfirmed){
                        this.props.change_price("global", data)
                    }else{
                        document.getElementById("modify-button").disabled = false
                        return null
                    }
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
                                className="dash-form-input"
                                id="modify-serie">
                                    <option key={`-serie`} selected={true} disabled={true}>
                                        Serie
                                    </option>
                                </select>
                            </div>
                        </span>
                        <span className="dash-form-space" style={this.getStyle("Por tomo")}>
                            <div className="dash-form-column">
                                <select
                                className="dash-form-input"
                                id="modify-serie">
                                    <option key={`-serie`} selected={true} disabled={true}>
                                        Serie
                                    </option>
                                </select>
                                <br />
                                <select
                                className="dash-form-input"
                                id="modify-serie">
                                    <option key={`-serie`} selected={true} disabled={true}>
                                        Tomo
                                    </option>
                                </select>
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