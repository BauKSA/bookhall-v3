import React from "react";

import '../forms.css'

import { connect } from 'react-redux'
import { add_libro } from '../../../redux/actions'

import Swal from 'sweetalert2'

import Loader from '../../../components/loader/loader'

class AddLibro extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            libros: [],
            editoriales: [],
            submitted: false
        }
    }

    componentDidMount(){
        this.setState({
            libros: this.props.libros,
            editoriales: this.props.editoriales
        })
    }

    componentDidUpdate(prevProps){
        if(prevProps.libros !== this.props.libros){
            this.setState({
                libros: this.props.libros,
                editoriales: this.props.editoriales
            })
        }

        if(prevProps.state.status !== this.props.state.status && this.state.submitted){
            if(this.props.state.status){
                return Swal.fire({
                    icon: 'success',
                    title: "Serie agregada con éxito!"
                })
                .then(()=>{
                    window.location.reload()
                })
            }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()

        let nombre = document.getElementById("addlibro-serie")
        let guion = document.getElementById("addlibro-guion")
        let vol_amount = document.getElementById("addlibro-cant")
        let state = document.getElementById("addlibro-state")
        let editorial = document.getElementById("addlibro-editorial")
        let sinopsis = document.getElementById("addlibro-sinopsis")

        const inputs = document.getElementsByClassName('dash-form-input')
        for(let i = 0; i < inputs.length; i++){
            inputs[i].style.borderColor = "transparent"
        }

        if(nombre.value.length === 0){
            nombre.style.borderColor = "red"
            return Swal.fire({
                icon: 'error',
                title: 'Ingrese un nombre válido'
            })
        }

        if(guion.value.length === 0){
            guion.style.borderColor = "red"
            return Swal.fire({
                icon: 'error',
                title: 'Ingrese un autor válido'
            })
        }

        if(vol_amount.value <= 0){
            vol_amount.style.borderColor = "red"
            return Swal.fire({
                icon: 'error',
                title: 'Ingrese una cantidad de tomos válida'
            })
        }

        if(editorial.value === "Editorial"){
            editorial.style.borderColor = "red"
            return Swal.fire({
                icon: 'error',
                title: 'Ingrese una editorial válida'
            })
        }

        const serie = {
            nombre: nombre.value,
            autor: guion.value,
            vol_amount: vol_amount.value,
            editorial: editorial.value,
            sinopsis: sinopsis.value,
            state: state.value
        }

        let exist = false
        const series = this.state.libros

        for(let i = 0; i < series.length; i++){
            if(serie.nombre === series[i].nombre
                && serie.editorial === series[i].editorial){
                    exist = true
                }
        }

        if(exist){
            return Swal.fire({
                icon: 'error',
                title: `La serie ${serie.nombre} de ${serie.editorial} ya existe!`
            })
        }else{
            this.setState({
                submitted: true
            }, ()=>{
                document.getElementById('addlibro-button').disabled = true
                return this.props.add_libro(serie)
            })
        }

    }

    render(){
        if(this.state.libros.length > 0){
            return(
                <form className="dash-form-container" onSubmit={this.handleSubmit}>
                    <h3 className="dash-form-title">
                        Agregar serie
                    </h3>
                    <label htmlFor="addlibro-serie" className="dash-form-label first-label">
                        Nombre
                    </label>
                    <input
                    className="dash-form-input input-nombre"
                    id="addlibro-serie"
                    type="text"
                    />
                    <span className="dash-form-space">
                        <div className="dash-form-column">
                            <label htmlFor="addlibro-guion" className="dash-form-label">
                                Autor
                            </label>
                            <input
                            className="dash-form-input"
                            id="addlibro-guion"
                            type="text"
                            />
                            <label htmlFor="addlibro-cant" className="dash-form-label">
                                Cant. tomos
                            </label>
                            <input
                            className="dash-form-input"
                            id="addlibro-cant"
                            type="number"
                            min={0}
                            />
                            <label htmlFor="addlibro-state" className="dash-form-label">
                                Estado
                            </label>
                            <select
                            className="dash-form-input"
                            id="addlibro-state"
                            >
                                <option>
                                    Abierta
                                </option>
                                <option>
                                    Cerrada
                                </option>
                            </select>
                        </div>
                        <div className="dash-form-column">
                            <select
                            className="dash-form-input"
                            id="addlibro-editorial"
                            >
                                <option key={`-addlibro`} selected={true} disabled={true}>
                                    Editorial
                                </option>
                                {
                                    this.state.editoriales.map((e)=>{
                                        return(
                                            <option key={e.id}>
                                                {e.nombre}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                            <label htmlFor="addlibro-sinopsis" className="dash-form-label">
                                Sinopsis
                            </label>
                            <textarea
                            className="dash-form-input text-area"
                            id="addlibro-sinopsis"
                            />
                        </div>
                    </span>
                    
                    <button className="dash-form-button" id="addlibro-button" type="submit">
                        Crear
                    </button>
                </form>
            )
        }else{
            return <Loader />
        }
    }
}

function mapStateToProps(state) {
    return {
        state: state
    }
}

const mapDispatchToProps = {
    add_libro
}

const conexion = connect(mapStateToProps, mapDispatchToProps)
export default  conexion(AddLibro);