import React from "react";

import '../forms.css'

import { connect } from 'react-redux'
import { add_manga } from '../../../redux/actions'

import Swal from 'sweetalert2'

import Loader from '../../../components/loader/loader'

class AddManga extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            mangas: [],
            editoriales: [],
            submitted: false
        }
    }

    componentDidMount(){
        this.setState({
            mangas: this.props.mangas,
            editoriales: this.props.editoriales
        })
    }

    componentDidUpdate(prevProps){
        if(prevProps.mangas !== this.props.mangas){
            this.setState({
                mangas: this.props.mangas,
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

        let nombre = document.getElementById("addmanga-serie")
        let guion = document.getElementById("addmanga-guion")
        let dibujo = document.getElementById("addmanga-dibujo")
        let vol_amount = document.getElementById("addmanga-cant")
        let state = document.getElementById("addmanga-state")
        let editorial = document.getElementById("addmanga-editorial")
        let sinopsis = document.getElementById("addmanga-sinopsis")

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
            guion: guion.value,
            dibujo: dibujo.value,
            vol_amount: vol_amount.value,
            editorial: editorial.value,
            sinopsis: sinopsis.value,
            state: state.value
        }

        let exist = false
        const series = this.state.mangas

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
                document.getElementById('addmanga-button').disabled = true
                return this.props.add_manga(serie)
            })
        }

    }

    render(){
        if(this.state.mangas.length > 0){
            return(
                <form className="dash-form-container" onSubmit={this.handleSubmit}>
                    <h3 className="dash-form-title">
                        Agregar serie
                    </h3>
                    <label htmlFor="addmanga-serie" className="dash-form-label first-label">
                        Nombre
                    </label>
                    <input
                    className="dash-form-input input-nombre"
                    id="addmanga-serie"
                    type="text"
                    />
                    <span className="dash-form-space">
                        <div className="dash-form-column">
                            <label htmlFor="addmanga-guion" className="dash-form-label">
                                Guión
                            </label>
                            <input
                            className="dash-form-input"
                            id="addmanga-guion"
                            type="text"
                            />
                            <label htmlFor="addmanga-dibujo" className="dash-form-label">
                                Dibujo
                            </label>
                            <input
                            className="dash-form-input"
                            id="addmanga-dibujo"
                            type="text"
                            />
                            <label htmlFor="addmanga-cant" className="dash-form-label">
                                Cant. tomos
                            </label>
                            <input
                            className="dash-form-input"
                            id="addmanga-cant"
                            type="number"
                            min={0}
                            />
                            <label htmlFor="addmanga-state" className="dash-form-label">
                                Estado
                            </label>
                            <select
                            className="dash-form-input"
                            id="addmanga-state"
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
                            id="addmanga-editorial"
                            >
                                <option key={`-addmanga`} selected={true} disabled={true}>
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
                            <label htmlFor="addmanga-sinopsis" className="dash-form-label">
                                Sinopsis
                            </label>
                            <textarea
                            className="dash-form-input text-area"
                            id="addmanga-sinopsis"
                            />
                        </div>
                    </span>
                    
                    <button className="dash-form-button" id="addmanga-button" type="submit">
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
    add_manga
}

const conexion = connect(mapStateToProps, mapDispatchToProps)
export default  conexion(AddManga);