import React from "react";

import Swal from 'sweetalert2'

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../../firebase'
import handleErrors from "../handleErrors";

class Login extends React.Component{

    handleLogin = (e) => {
        e.preventDefault()

        const button = document.getElementById("login-button")
        button.disabled = true;

        const email = document.getElementById("email-login").value
        const pass = document.getElementById("pass-login").value

        signInWithEmailAndPassword(auth, email, pass)
        .then(()=>{
            return Swal.fire({
                icon: "success",
                title: "Sesión iniciada con éxito!"
            })
            .then(()=>{
                button.disabled = false;
            })
        })
        .catch((error)=>{
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

    }

    render(){
        return(
            <form className="login-main" onSubmit={this.handleLogin}>
                <input
                type="email"
                className="user-login-inpu"
                id="email-login"
                placeholder="Email"
                />
                <input
                type="password"
                className="user-login-inpu"
                id="pass-login"
                placeholder="Contraseña"
                />
                <button type="submit" className="user-login-button" id="login-button">
                    <p className="login-button-text">
                        Ingresar
                    </p>
                </button>
            </form>
        )
    }
}

export default Login;