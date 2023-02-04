import React from "react";

import '../forms.css'

import { connect } from 'react-redux'
import { add_manga_vol } from '../../../redux/actions'

import { storage } from '../../../firebase';
import { ref, uploadBytesResumable, getDownloadURL  } from "firebase/storage";

import Loader from '../../../components/loader/loader'

import Swal from 'sweetalert2'
import { control_inputs_vol, serie_exist } from "./adminFunc";

class AddMangaVol extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            mangas: [],
            actual_vols: [],
            img: "https://firebasestorage.googleapis.com/v0/b/proyecto-comiqueria.appspot.com/o/covers%2Fno-cover.jpg?alt=media&token=badf49a6-465c-414a-8443-814e52583cab",
            submitted: false
        }
    }

    componentDidMount(){
        this.setState({
            mangas: this.props.mangas
        })
    }

    componentDidUpdate(prevProps){
        if(prevProps.mangas !== this.props.mangas){
            this.setState({
                mangas: this.props.mangas
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
        for(let i = 0; i < this.state.mangas.length; i++){
            if(this.state.mangas[i].nombre === name){
                return this.setState({
                    actual_vols: this.state.mangas[i].vols
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

            const exist = serie_exist(vol, this.state.mangas)

            if(exist.code !== 200){
                if(exist.exist === "vol"){
                    return Swal.fire({
                        icon: "error",
                        title: `${vol.serie} vol ${vol.numero} ${vol.special} ya existe!`
                    })
                }else if(exist.exist === "vol"){
                    return Swal.fire({
                        icon: "error",
                        title: `La serie ${vol.serie} no existe!`
                    })
                }
            }else{
                const cover = document.getElementById('addmangavol-img').files[0]
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
                                document.getElementById('addmangavol-button').disabled = true
                                vol.imgURL = downloadURL
                                return this.props.add_manga_vol(vol)
                            })
                        })
                    }
                )
            }
        }
    }

    render(){
        if(this.state.mangas.length > 0){
            return(
                <form className="dash-form-container" onSubmit={this.handleUpdate}>
                    <h3 className="dash-form-title">
                        Agregar tomo
                    </h3>
                    <select
                    className="dash-form-input input-nombre"
                    id="addmangavol-serie"
                    /*onChange={this.handleChange}*/>
                        <option key={`-addmanga`} selected={true} disabled={true}>
                            Serie
                        </option>
                        {
                            this.state.mangas.map((s)=>{
                                return(
                                    <option key={`${s.id}-addmanga`}>
                                        {s.nombre}
                                    </option>
                                )
                            })
                        }
                    </select>
                    <span className="dash-form-space">
                        <div className="dash-form-column">
                            <label htmlFor="addmangavol-numero" className="dash-form-label first-label">
                                Número
                            </label>
                            <input
                            className="dash-form-input"
                            id="addmangavol-numero"
                            type="number"
                            min={0}
                            />
                            <label htmlFor="addmangavol-stock" className="dash-form-label">
                                Stock
                            </label>
                            <input
                            className="dash-form-input"
                            id="addmangavol-stock"
                            type="number"
                            placeholder="0"
                            min={0}
                            />
                            <label htmlFor="addmangavol-precio" className="dash-form-label">
                                Precio
                            </label>
                            <input
                            className="dash-form-input"
                            id="addmangavol-precio"
                            type="number"
                            min={0}
                            />
                            <label htmlFor="addmangavol-special" className="dash-form-label">
                                Ed. especial
                            </label>
                            <input
                            className="dash-form-input"
                            id="addmangavol-special"
                            type="text"
                            placeholder="En blanco p/ ed. regulares"
                            />
                        </div>
                        <div className="dash-form-column">
                            <img className="dash-form-img"
                            id="addmangavol-img-src"
                            src={this.state.img}
                            alt="cover"/>
                            <label htmlFor="addmangavol-img" className="dash-form-label cover">
                                Cover
                            </label>
                            <input
                            className="dash-form-input"
                            id="addmangavol-img"
                            type="file"
                            onChange={this.handleUpload}
                            />
                        </div>
                    </span>
                    <button className="dash-form-button" type="submit" id="addmangavol-button">
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
    add_manga_vol
}

const conexion = connect(mapStateToProps, mapDispatchToProps)
export default  conexion(AddMangaVol);