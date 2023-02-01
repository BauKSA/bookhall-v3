import React from "react";
import { Link } from 'react-router-dom';

import './user.css'

import { AiFillCloseCircle } from 'react-icons/ai'

import { IoCartSharp } from 'react-icons/io5'
import Login from "./login/login";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../firebase";

import Swal from "sweetalert2";
import Register from "./register/register";
import { get_guest_cart } from "../../../guest_cart";

class User extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            user: null,
            loginModule: false,
            registerModule: false
        }
    }

    componentDidMount(){
        if(this.props.user){
            this.setState({
                user: this.props.user
            })
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.user !== this.props.user){
            this.setState({
                user: this.props.user
            })
        }
    }

    openLogin = () => {
        if(!this.state.loginModule){
            this.setState({
                loginModule: true,
                registerModule: false
            })
        }
    }

    openRegister = () => {
        if(!this.state.registerModule){
            this.setState({
                loginModule: false,
                registerModule: true
            })
        }
    }

    closeModule = () => {
        this.setState({
            loginModule: false,
            registerModule: false
        })
    }

    moduleStyle = (e) => {
        if(e === "login"){
            if(this.state.loginModule){
                return {"display":"flex"}
            }else{
                return {"display":"none"}
            }
        }else{
            if(this.state.registerModule){
                return {"display":"flex"}
            }else{
                return {"display":"none"}
            }
        }
    }

    handleLogOut = () => {
        signOut(auth)
        .then(()=>{
            Swal.fire({
                title: "Sesión cerrada con éxito."
            })
        })
    }

    getCartLength = () => {
        const cart = get_guest_cart()
        return cart.length
    }

    isAdmin = () => {
        if(this.state.user.admin){
            return(
                <Link to="/dashboard">
                    <button className="user-button login">
                        <p className="button-text">
                            Dashboard
                        </p>
                    </button>
                </Link>
            )
        }
    }

    render(){

        onAuthStateChanged(auth, ()=>{
            if(auth.currentUser){
                if(this.state.loginModule || this.state.registerModule){
                    this.setState({
                        loginModule: false,
                        registerModule: false
                    })
                }
            }
        })

        if(this.state.user){
            return(
                <div className="user-main is-user">
                    <span className="user-actions">
                        <Link to="/profile">
                            <button className="user-button login">
                                <p className="button-text">
                                    Mi perfil
                                </p>
                            </button>
                        </Link>
                        {this.isAdmin()}
                        <Link to="/cart" className="cart-container">
                            <p className="cart-number">
                                {this.state.user.cart.length}
                            </p>
                            <IoCartSharp className="cart" />
                        </Link>
                    </span>
                    <button className="user-button logout" onClick={this.handleLogOut}>
                        <p className="button-text">
                            Cerrar sesión
                        </p>
                    </button>
                </div>
            )
        }else{
            return(
                <div className="user-main">
                    <span className="login-module" style={this.moduleStyle("login")}>
                        <span className="close-module-container">
                            <button className="close-module" onClick={this.closeModule}>
                                <AiFillCloseCircle className="close-icon" />
                            </button>
                        </span>
                        <Login />
                    </span>
                    <span className="login-module register-module" style={this.moduleStyle("register")}>
                        <span className="close-module-container">
                            <button className="close-module" onClick={this.closeModule}>
                                <AiFillCloseCircle className="close-icon" />
                            </button>
                        </span>
                        <Register />
                    </span>
                    <span className="user-actions">
                        <button className="user-button login" onClick={this.openLogin}>
                            <p className="button-text">
                                Iniciar sesión
                            </p>
                        </button>
                        <button className="user-button register" onClick={this.openRegister}>
                            <p className="button-text">
                                Registrarse
                            </p>
                        </button>
                    </span>
                    <Link to="/cart" className="cart-container">
                        <p className="cart-number">
                            {this.getCartLength()}
                        </p>
                        <IoCartSharp className="cart" />
                    </Link>
                </div>
            )
        }
    }
}

export default User;