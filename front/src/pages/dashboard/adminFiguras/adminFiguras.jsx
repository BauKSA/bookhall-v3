import React from "react";

import { connect } from 'react-redux'
import { add_figura } from '../../../redux/actions/index'

import { storage } from '../../../firebase';
import { ref, uploadBytesResumable, getDownloadURL  } from "firebase/storage";

import Swal from 'sweetalert2'

import BackToDash from '../backToDash/backToDash'
import Loader from "../../../components/loader/loader";

class AdminFiguras extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            user: null,
            loading: true,
            img: "https://firebasestorage.googleapis.com/v0/b/proyecto-comiqueria.appspot.com/o/covers%2Fno-cover.jpg?alt=media&token=badf49a6-465c-414a-8443-814e52583cab"
        }
    }

    componentDidMount(){
        this.setState({
            user: this.props.user
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
        if(prevProps.user !== this.props.user){
            this.setState({
                user: this.props.user
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

    handleSubmit = (e) => {
        e.preventDefault()
        const name = document.getElementById("addfigura-nombre")
        const price = document.getElementById("addfigura-precio")
        const stock = document.getElementById("addfigura-stock")
        const tags = document.getElementById("addfigura-tags")
        const _cover = document.getElementById('addfigura-img')

        name.style.borderColor = "transparent"
        price.style.borderColor = "transparent"
        stock.style.borderColor = "transparent"

        if(name.value.length <= 0){
            name.style.borderColor = "red"
            return Swal.fire({
                icon: "error",
                title: "Ingrese un nombre válido!"
            })
        }

        if(price.value.length <= 0){
            price.style.borderColor = "red"
            return Swal.fire({
                icon: "error",
                title: "Ingrese un precio válido!"
            })
        }

        if(!_cover.value){
            return Swal.fire({
                icon: "error",
                title: "Ingrese una imagen válida!"
            })
        }

        if(tags.value.length <= 0){
            Swal.fire({
                icon: "warning",
                title: "Desea continuar sin agregar tags?",
                text: "Esto podría hacer que la figura sea más difícil de encontrar.",
                showConfirmButton: true,
                confirmButtonText: "Continuar",
                showDenyButton: true,
                denyButtonText: "Vovler"
            })
            .then((res)=>{
                if(res.isConfirmed){
                    return null
                }
            })
        }

        const cover = document.getElementById('addfigura-img').files[0]
        const storageRef = ref(storage, `/figuras/${cover.name}`);
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

                        const data = {
                            name: name.value,
                            price: parseInt(price.value),
                            stock: parseInt(stock.value),
                            tags: tags.value,
                            img: downloadURL
                        }

                        //document.getElementById('addfigura-button').disabled = true
                        return this.props.add_figura(data)
                    })
                })
            }
        )

    }

    render(){
        if(this.state.loading){
            return <Loader />
        }else{
            return(
                <div className="dashboard-main-container">
                    <BackToDash />
                    <h1 className="dashboard-title">
                        Administrar figuras
                    </h1>
                    <span className="dash-space-container one-column">
                        <form className="dash-form-container" onSubmit={this.handleSubmit}>
                            <h3 className="dash-form-title">
                                Agregar figura
                            </h3>
                            <label htmlFor="addfigura-nombre" className="dash-form-label first-label">
                                Nombre
                            </label>
                            <input
                            className="dash-form-input input-nombre"
                            id="addfigura-nombre"
                            type="text"
                            />
                            <span className="dash-form-space">
                                <div className="dash-form-column">
                                    <label htmlFor="addfigura-precio" className="dash-form-label first-label">
                                        Precio
                                    </label>
                                    <input
                                    className="dash-form-input"
                                    type="number"
                                    min={0}
                                    id="addfigura-precio" />
                                    <br/>
                                    <label htmlFor="addfigura-tags" className="dash-form-label first-label">
                                        Tags
                                    </label>
                                    <textarea
                                    className="dash-form-input area"
                                    id="addfigura-tags"
                                    placeholder="Agregar tags separados por ','"
                                    />
                                </div>
                                <div className="dash-form-column">
                                    <label htmlFor="addfigura-stock" className="dash-form-label first-label">
                                        Stock
                                    </label>
                                    <input
                                    className="dash-form-input"
                                    type="number"
                                    min={0}
                                    id="addfigura-stock"
                                    placeholder="0"/>
                                    <br/>
                                    <img className="dash-form-img"
                                    id="addfigura-img-src"
                                    src={this.state.img}
                                    alt="cover"/>
                                    <label htmlFor="addfigura-img" className="dash-form-label cover">
                                        Cover
                                    </label>
                                    <input
                                    className="dash-form-input"
                                    id="addfigura-img"
                                    type="file"
                                    onChange={this.handleUpload}
                                    />
                                </div>
                            </span>
                            
                            <button className="dash-form-button" id="addfigura-button" type="submit">
                                Crear
                            </button>
                        </form>
                    </span>
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
    add_figura
}

const conexion = connect(mapStateToProps, mapDispatchToProps)
export default  conexion(AdminFiguras);