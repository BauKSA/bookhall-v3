import React from "react";

import '../forms.css'

import { connect } from 'react-redux'
import { add_col_vol } from '../../../redux/actions'

import { storage } from '../../../firebase';
import { ref, uploadBytesResumable, getDownloadURL  } from "firebase/storage";

import Loader from '../../../components/loader/loader'

import Swal from 'sweetalert2'
import { control_inputs_vol, serie_exist } from "./adminFuncCol";

class AddColVol extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            cols: [],
            actual_vols: [],
            img: "https://firebasestorage.googleapis.com/v0/b/proyecto-comiqueria.appspot.com/o/covers%2Fno-cover.jpg?alt=media&token=badf49a6-465c-414a-8443-814e52583cab",
            submitted: false
        }
    }

    componentDidMount(){
        this.setState({
            cols: this.props.cols
        })
    }

    componentDidUpdate(prevProps){
        if(prevProps.cols !== this.props.cols){
            this.setState({
                cols: this.props.cols
            })
        }

        if(prevProps.state.status !== this.props.state.status && this.state.submitted){
            if(this.props.state.status){
                return Swal.fire({
                    icon: 'success',
                    title: "Tomo agregado con éxito!"
                })
                .then(()=>{
                    window.location.reload()
                })
            }
        }
    }

    handleChange = (e) => {
        const name = e.target.value
        for(let i = 0; i < this.state.cols.length; i++){
            if(this.state.cols[i].nombre === name){
                return this.setState({
                    actual_vols: this.state.cols[i].vols
                })
            }
        }
    }

    handleUpload = (e) => {
        var file = e.target.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            this.setState({
                img: reader.result
            })
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        }
    }

    handleUpdate = (e) => {
        e.preventDefault()

        let errors = control_inputs_vol()

        if(errors.code !== 200){
            return Swal.fire({
                icon: "error",
                title: errors.text
            })
        }else{
            let vol = errors.vol

            const exist = serie_exist(vol, this.state.cols)

            if(exist.code !== 200){
                if(exist.exist === "vol"){
                    return Swal.fire({
                        icon: "error",
                        title: `${vol.serie} vol ${vol.numero} ya existe!`
                    })
                }else if(exist.exist === "vol"){
                    return Swal.fire({
                        icon: "error",
                        title: `La colección ${vol.serie} no existe!`
                    })
                }
            }else{
                const cover = document.getElementById('addcolvol-img').files[0]
                const storageRef = ref(storage, `/covers/${cover.name}`);
                const task = uploadBytesResumable(storageRef, cover);

                task.on(
                    "state_changed",
                    (snapshot)=>{
                        console.log(snapshot)
                    },
                    (error) => {
                        console.log(error.message);
                    },
                    () => {
                        getDownloadURL(task.snapshot.ref).then((downloadURL)=>{
                            this.setState({
                                submitted: true
                            }, ()=>{
                                document.getElementById('addcolvol-button').disabled = true
                                vol.imgURL = downloadURL
                                return this.props.add_col_vol(vol)
                            })
                        })
                    }
                )
            }
        }
    }

    render(){
        if(this.state.cols.length > 0){
            return(
                <form className="dash-form-container" onSubmit={this.handleUpdate}>
                    <h3 className="dash-form-title">
                        Agregar tomo
                    </h3>
                    <select
                    className="dash-form-input input-nombre"
                    id="addcolvol-serie"
                    /*onChange={this.handleChange}*/>
                        <option key={`-addcolvol`} selected={true} disabled={true}>
                            Colección
                        </option>
                        {
                            this.state.cols.map((s)=>{
                                return(
                                    <option key={`${s.id}-addcolvol`}>
                                        {s.nombre}
                                    </option>
                                )
                            })
                        }
                    </select>
                    <label htmlFor="addcolvol-nombre" className="dash-form-label">
                        Nombre
                    </label>
                    <input
                    className="dash-form-input input-nombre"
                    id="addcolvol-nombre"
                    type="text"
                    />
                    <span className="dash-form-space">
                        <div className="dash-form-column">
                            <label htmlFor="addcolvol-guion" className="dash-form-label">
                                Guión
                            </label>
                            <input
                            className="dash-form-input"
                            id="addcolvol-guion"
                            type="text"
                            />
                            <label htmlFor="addcolvol-dibujo" className="dash-form-label">
                                Dibujo
                            </label>
                            <input
                            className="dash-form-input"
                            id="addcolvol-dibujo"
                            type="text"
                            />
                            <label htmlFor="addcolvol-color" className="dash-form-label">
                                Color
                            </label>
                            <input
                            className="dash-form-input"
                            id="addcolvol-color"
                            type="text"
                            />
                            <label htmlFor="addcolvol-tintas" className="dash-form-label">
                                Tintas
                            </label>
                            <input
                            className="dash-form-input"
                            id="addcolvol-tintas"
                            type="text"
                            />
                            <label htmlFor="addcolvol-otros" className="dash-form-label">
                                Otros autores
                            </label>
                            <input
                            className="dash-form-input"
                            id="addcolvol-otros"
                            type="text"
                            placeholder="N/A"
                            />
                            <label htmlFor="addcolvol-sinopsis" className="dash-form-label">
                                Sinopsis
                            </label>
                            <textarea
                            className="dash-form-input text-area"
                            id="addcolvol-sinopsis"
                            />
                        </div>
                        <div className="dash-form-column">
                            <label htmlFor="addcolvol-stock" className="dash-form-label">
                                Stock
                            </label>
                            <input
                            className="dash-form-input"
                            id="addcolvol-stock"
                            type="number"
                            placeholder="0"
                            min={0}
                            />
                            <label htmlFor="addcolvol-precio" className="dash-form-label">
                                Precio
                            </label>
                            <input
                            className="dash-form-input"
                            id="addcolvol-precio"
                            type="number"
                            min={0}
                            />
                            <br/>
                            <img className="dash-form-img"
                            id="addcolvol-img-src"
                            src={this.state.img}
                            alt="cover"/>
                            <label htmlFor="addcolvol-img" className="dash-form-label cover">
                                Cover
                            </label>
                            <input
                            className="dash-form-input"
                            id="addcolvol-img"
                            type="file"
                            onChange={this.handleUpload}
                            />
                        </div>
                    </span>
                    <button className="dash-form-button" type="submit" id="addcolvol-button">
                        Crear
                    </button>
                    {
                        /*
                        <span className="other-vols">
                            {
                                this.state.actual_vols.map((v)=>{
                                    return <img
                                    className="other-vols-img"
                                    alt="cover"
                                    key={v.id}
                                    src={v.imgURL} />
                                })
                            }
                        </span>
                        */
                    }
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
    add_col_vol
}

const conexion = connect(mapStateToProps, mapDispatchToProps)
export default  conexion(AddColVol);