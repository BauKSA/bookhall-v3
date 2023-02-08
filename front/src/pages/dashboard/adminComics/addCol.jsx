import React from "react";

import '../forms.css'

import { connect } from 'react-redux'
import { add_col } from '../../../redux/actions'

import Swal from 'sweetalert2'

import Loader from '../../../components/loader/loader'

class AddCol extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            cols: [],
            editoriales: [],
            submitted: false
        }
    }

    componentDidMount(){
        this.setState({
            cols: this.props.cols,
            editoriales: this.props.editoriales
        })
    }

    componentDidUpdate(prevProps){
        if(prevProps.cols !== this.props.cols){
            this.setState({
                cols: this.props.cols,
                editoriales: this.props.editoriales
            })
        }

        if(prevProps.state.status !== this.props.state.status && this.state.submitted){
            if(this.props.state.status){
                return Swal.fire({
                    icon: 'success',
                    title: "Colección agregada con éxito!"
                })
                .then(()=>{
                    window.location.reload()
                })
            }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()

        let nombre = document.getElementById("addcol-serie")
        let editorial = document.getElementById("addcol-editorial")
        let origen = document.getElementById("addcol-editorialor")

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
            editorial: editorial.value,
            editorial_origen: origen.value,
        }

        let exist = false
        const series = this.state.cols

        for(let i = 0; i < series.length; i++){
            if(serie.nombre === series[i].nombre
                && serie.editorial === series[i].editorial){
                    exist = true
                }
        }

        if(exist){
            return Swal.fire({
                icon: 'error',
                title: `La colección ${serie.nombre} de ${serie.editorial} ya existe!`
            })
        }else{
            this.setState({
                submitted: true
            }, ()=>{
                document.getElementById('addcol-button').disabled = true
                return this.props.add_col(serie)
            })
        }

    }

    render(){
        if(this.state.cols.length > 0){
            return(
                <form className="dash-form-container" onSubmit={this.handleSubmit}>
                    <h3 className="dash-form-title">
                        Agregar colección
                    </h3>
                    <label htmlFor="addcol-serie" className="dash-form-label first-label">
                        Nombre
                    </label>
                    <input
                    className="dash-form-input input-nombre"
                    id="addcol-serie"
                    type="text"
                    />
                    <span className="dash-form-space">
                        <div className="dash-form-column">
                            <select
                            className="dash-form-input"
                            id="addcol-editorial"
                            >
                                <option key={`-addcol`} selected={true} disabled={true}>
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
                            <label htmlFor="addcol-editorialor" className="dash-form-label">
                                Editorial de origen
                            </label>
                            <input
                            className="dash-form-input"
                            id="addcol-editorialor"
                            type="text"
                            />
                        </div>
                    </span>
                    
                    <button className="dash-form-button" id="addcol-button" type="submit">
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
    add_col
}

const conexion = connect(mapStateToProps, mapDispatchToProps)
export default  conexion(AddCol);