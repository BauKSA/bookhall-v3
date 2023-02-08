import React from "react";

import '../forms.css'

import { connect } from 'react-redux'
import { add_comic } from '../../../redux/actions'

import Swal from 'sweetalert2'

import Loader from '../../../components/loader/loader'

class AddComic extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            comics: [],
            editoriales: [],
            submitted: false
        }
    }

    componentDidMount(){
        this.setState({
            comics: this.props.comics,
            editoriales: this.props.editoriales
        })
    }

    componentDidUpdate(prevProps){
        if(prevProps.comics !== this.props.comics){
            this.setState({
                comics: this.props.comics,
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

        let nombre = document.getElementById("addcomic-serie")
        let guion = document.getElementById("addcomic-guion")
        let dibujo = document.getElementById("addcomic-dibujo")
        let color = document.getElementById("addcomic-color")
        let tintas = document.getElementById("addcomic-tintas")
        let otros = document.getElementById("addcomic-otros")
        let vol_amount = document.getElementById("addcomic-cant")
        let state = document.getElementById("addcomic-state")
        let editorial = document.getElementById("addcomic-editorial")
        let origen = document.getElementById("addcomic-editorialor")
        let sinopsis = document.getElementById("addcomic-sinopsis")

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
                title: 'Ingrese un guión válido'
            })
        }

        if(dibujo.value.length === 0){
            dibujo.style.borderColor = "red"
            return Swal.fire({
                icon: 'error',
                title: 'Ingrese un dibujo válido'
            })
        }

        if(tintas.value.length === 0){
            tintas.style.borderColor = "red"
            return Swal.fire({
                icon: 'error',
                title: 'Ingrese tintas válido'
            })
        }

        if(color.value.length === 0){
            color.style.borderColor = "red"
            return Swal.fire({
                icon: 'error',
                title: 'Ingrese un color válido'
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

        if(origen.value.length === 0){
            origen.style.borderColor = "red"
            return Swal.fire({
                icon: 'error',
                title: 'Ingrese una editorial de origen válida'
            })
        }

        const serie = {
            nombre: nombre.value,
            autores: {
                guion: guion.value,
                dibujo: dibujo.value,
                color: color.value,
                tintas: tintas.value,
                otros: otros.value
            },
            vol_amount: vol_amount.value,
            editorial: editorial.value,
            editorial_origen: origen.value,
            sinopsis: sinopsis.value,
            state: state.value
        }

        let exist = false
        const series = this.state.comics

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
                document.getElementById('addcomic-button').disabled = true
                return this.props.add_comic(serie)
            })
        }

    }

    render(){
        if(this.state.comics.length > 0){
            return(
                <form className="dash-form-container" onSubmit={this.handleSubmit}>
                    <h3 className="dash-form-title">
                        Agregar serie
                    </h3>
                    <label htmlFor="addcomic-serie" className="dash-form-label first-label">
                        Nombre
                    </label>
                    <input
                    className="dash-form-input input-nombre"
                    id="addcomic-serie"
                    type="text"
                    />
                    <span className="dash-form-space">
                        <div className="dash-form-column">
                            <label htmlFor="addcomic-guion" className="dash-form-label">
                                Guión
                            </label>
                            <input
                            className="dash-form-input"
                            id="addcomic-guion"
                            type="text"
                            />
                            <label htmlFor="addcomic-dibujo" className="dash-form-label">
                                Dibujo
                            </label>
                            <input
                            className="dash-form-input"
                            id="addcomic-dibujo"
                            type="text"
                            />
                            <label htmlFor="addcomic-color" className="dash-form-label">
                                Color
                            </label>
                            <input
                            className="dash-form-input"
                            id="addcomic-color"
                            type="text"
                            />
                            <label htmlFor="addcomic-tintas" className="dash-form-label">
                                Tintas
                            </label>
                            <input
                            className="dash-form-input"
                            id="addcomic-tintas"
                            type="text"
                            />
                            <label htmlFor="addcomic-otros" className="dash-form-label">
                                Otros autores
                            </label>
                            <input
                            className="dash-form-input"
                            id="addcomic-otros"
                            type="text"
                            placeholder="N/A"
                            />
                            <label htmlFor="addcomic-cant" className="dash-form-label">
                                Cant. tomos
                            </label>
                            <input
                            className="dash-form-input"
                            id="addcomic-cant"
                            type="number"
                            min={0}
                            />
                        </div>
                        <div className="dash-form-column">
                            <label htmlFor="addcomic-state" className="dash-form-label">
                                Estado
                            </label>
                            <select
                            className="dash-form-input"
                            id="addcomic-state"
                            >
                                <option>
                                    Abierta
                                </option>
                                <option>
                                    Cerrada
                                </option>
                            </select>
                            <br/>
                            <select
                            className="dash-form-input"
                            id="addcomic-editorial"
                            >
                                <option key={`-addcomic`} selected={true} disabled={true}>
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
                            <label htmlFor="addcomic-editorialor" className="dash-form-label">
                                Editorial de origen
                            </label>
                            <input
                            className="dash-form-input"
                            id="addcomic-editorialor"
                            type="text"
                            />
                            <label htmlFor="addcomic-sinopsis" className="dash-form-label">
                                Sinopsis
                            </label>
                            <textarea
                            className="dash-form-input text-area"
                            id="addcomic-sinopsis"
                            />
                        </div>
                    </span>
                    
                    <button className="dash-form-button" id="addcomic-button" type="submit">
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
    add_comic
}

const conexion = connect(mapStateToProps, mapDispatchToProps)
export default  conexion(AddComic);