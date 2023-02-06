import React from "react";

import '../forms.css'

import { connect } from 'react-redux'
import { add_libro_vol } from '../../../redux/actions'

import { storage } from '../../../firebase';
import { ref, uploadBytesResumable, getDownloadURL  } from "firebase/storage";

import Loader from '../../../components/loader/loader'

import Swal from 'sweetalert2'
import { control_inputs_vol, serie_exist } from "./adminFunc";

class AddLibroVol extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            libros: [],
            actual_vols: [],
            img: "https://firebasestorage.googleapis.com/v0/b/proyecto-comiqueria.appspot.com/o/covers%2Fno-cover.jpg?alt=media&token=badf49a6-465c-414a-8443-814e52583cab",
            submitted: false
        }
    }

    componentDidMount(){
        this.setState({
            libros: this.props.libros
        })
    }

    componentDidUpdate(prevProps){
        if(prevProps.libros !== this.props.libros){
            this.setState({
                libros: this.props.libros
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
        for(let i = 0; i < this.state.libros.length; i++){
            if(this.state.libros[i].nombre === name){
                return this.setState({
                    actual_vols: this.state.libros[i].vols
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

            const exist = serie_exist(vol, this.state.libros)

            if(exist.code !== 200){
                if(exist.exist === "vol"){
                    return Swal.fire({
                        icon: "error",
                        title: `${vol.serie} vol ${vol.numero} ${vol.subtitulo} ya existe!`
                    })
                }else if(exist.exist === "vol"){
                    return Swal.fire({
                        icon: "error",
                        title: `La serie ${vol.serie} no existe!`
                    })
                }
            }else{
                const cover = document.getElementById('addlibrovol-img').files[0]
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
                                document.getElementById('addlibrovol-button').disabled = true
                                vol.imgURL = downloadURL
                                return this.props.add_libro_vol(vol)
                            })
                        })
                    }
                )
            }
        }
    }

    render(){
        if(this.state.libros.length > 0){
            return(
                <form className="dash-form-container" onSubmit={this.handleUpdate}>
                    <h3 className="dash-form-title">
                        Agregar tomo
                    </h3>
                    <select
                    className="dash-form-input input-nombre"
                    id="addlibrovol-serie"
                    /*onChange={this.handleChange}*/>
                        <option key={`-addlibro`} selected={true} disabled={true}>
                            Serie
                        </option>
                        {
                            this.state.libros.map((s)=>{
                                return(
                                    <option key={`${s.id}-addlibro`}>
                                        {s.nombre}
                                    </option>
                                )
                            })
                        }
                    </select>
                    <span className="dash-form-space">
                        <div className="dash-form-column">
                            <label htmlFor="addlibrovol-numero" className="dash-form-label first-label">
                                Número
                            </label>
                            <input
                            className="dash-form-input"
                            id="addlibrovol-numero"
                            type="number"
                            min={0}
                            />
                            <label htmlFor="addlibrovol-subtitulo" className="dash-form-label">
                                Subtitulo
                            </label>
                            <input
                            className="dash-form-input"
                            id="addlibrovol-subtitulo"
                            type="text"
                            />
                            <label htmlFor="addlibrovol-stock" className="dash-form-label">
                                Stock
                            </label>
                            <input
                            className="dash-form-input"
                            id="addlibrovol-stock"
                            type="number"
                            placeholder="0"
                            min={0}
                            />
                            <label htmlFor="addlibrovol-precio" className="dash-form-label">
                                Precio
                            </label>
                            <input
                            className="dash-form-input"
                            id="addlibrovol-precio"
                            type="number"
                            min={0}
                            />
                        </div>
                        <div className="dash-form-column">
                            <img className="dash-form-img"
                            id="addlibrovol-img-src"
                            src={this.state.img}
                            alt="cover"/>
                            <label htmlFor="addlibrovol-img" className="dash-form-label cover">
                                Cover
                            </label>
                            <input
                            className="dash-form-input"
                            id="addlibrovol-img"
                            type="file"
                            onChange={this.handleUpload}
                            />
                        </div>
                    </span>
                    <button className="dash-form-button" type="submit" id="addlibrovol-button">
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
    add_libro_vol
}

const conexion = connect(mapStateToProps, mapDispatchToProps)
export default  conexion(AddLibroVol);