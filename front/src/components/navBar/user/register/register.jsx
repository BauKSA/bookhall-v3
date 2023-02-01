import React from "react";

import Swal from 'sweetalert2'

import { connect } from 'react-redux'
import { userAvailable, register } from "../../../../redux/actions";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../../firebase'
import handleErrors from "../handleErrors";

class Register extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data: null
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.state.register_status !== this.props.state.register_status){
            const button = document.getElementById("register-button")
            if(this.props.state.register_status){
                createUserWithEmailAndPassword(auth, this.state.data.email, this.state.data.pass)
                .then(async ()=>{
                    signInWithEmailAndPassword(auth, this.state.data.email, this.state.data.pass)
                    .then(() => {
                        let data = {
                            email: this.state.data.email,
                            user: this.state.data.user,
                            id: auth.currentUser.uid
                        }
                        this.props.register(data)
                        return null
                    })
                })
                .catch(async (error)=>{
                    let e = error.message.split('(')[1]
                    e = e.split(')')[0]
                    console.log(e)

                    let message = handleErrors(e);
                    if(message === e){
                        return Swal.fire({
                            icon: "error",
                            title: e,
                            text: "Si el error persiste, contactarse con con servicio técnico"
                        })
                        .then(()=>{
                            button.disabled = false;
                        })
                    }else{
                        return Swal.fire({
                            icon: "error",
                            title: message
                        })
                        .then(()=>{
                            button.disabled = false;
                        })
                    }
                })
            }else{
                button.disabled = false
                this.setState({
                    user: null
                }, ()=>{
                    return Swal.fire({
                        icon: "error",
                        title: "Nombre de usuario no disponible!"
                    })
                })
            }
        }

        if(prevProps.state.register_status !== this.props.state.register_status){
            if(this.props.state.register_status){
                return Swal.fire({
                    icon: "success",
                    title: "Cuenta creada con éxito!"
                })
                .then(()=>{
                    window.location.reload()
                })
            }
        }
    }

    handleLogin = (e) => {
        e.preventDefault()

        const button = document.getElementById("register-button")
        button.disabled = true;

        const user = document.getElementById("user-register").value
        const email = document.getElementById("email-register").value
        const pass = document.getElementById("pass-register").value

        const regexUser = /^[a-zA-Z0-9]+$/
        const regexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/

        if(!regexUser.test(user)){
            button.disabled = false
            return Swal.fire({
                icon: "error",
                title: "Nombre de usuario no válido!",
                text: "El nombre de usuario solo puede contener letras y números."
            })
        }

        if(!regexPass.test(pass)){
            button.disabled = false
            return Swal.fire({
                icon: "error",
                title: "Contraseña no válida!",
                text: "La contraseña debe tener al menos 8 digitos, una letra minúscula, una letra mayúscula y un número."
            })
        }

        this.setState({
            data: {
                email: email,
                pass: pass,
                user: user
            }
        }, ()=>{
            this.props.userAvailable(this.state.data.user)
            return Swal.fire({
                title: "Creando cuenta...",
                allowEnterKey: false,
                allowEscapeKey: false,
                allowOutsideClick: false
            })
        })

    }

    render(){
        return(
            <form className="login-main" onSubmit={this.handleLogin}>
                <input
                type="text"
                className="user-login-inpu"
                id="user-register"
                placeholder="Usuario"
                />
                <input
                type="email"
                className="user-login-inpu"
                id="email-register"
                placeholder="Email"
                />
                <input
                type="password"
                className="user-login-inpu"
                id="pass-register"
                placeholder="Contraseña"
                />
                <button type="submit" className="user-login-button" id="register-button">
                    <p className="login-button-text">
                        Registrarse
                    </p>
                </button>
            </form>
        )
    }
}

function mapStateToProps(state) {
    return {
        state: state
    }
}

const mapDispatchToProps = {
    userAvailable,
    register
}

const conexion = connect(mapStateToProps, mapDispatchToProps)
export default  conexion(Register);