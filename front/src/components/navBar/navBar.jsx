import React from "react";
import { Link } from 'react-router-dom';

import User from './user/user'

import { CgProfile, CgMenuRound } from 'react-icons/cg'

import './navBar.css'

import logo from '../../imgs/logo.jpg'

class NavBar extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            status: null,
            user: false,
            menu: true
        }
    }

    getProfileMobile = (e) => {
        if(e === "user"){
            if(window.screen.width <= 950){
                if(this.state.user){
                    return {"display":"flex"}
                }else{
                    return {"display":"none"}
                }
            }else{
                return {"display":"flex"}
            }
        }else{
            if(window.screen.width <= 950){
                if(this.state.menu){
                    return {"display":"flex"}
                }else{
                    return {"display":"none"}
                }
            }else{
                return {"display":"flex"}
            }
        }
    }

    getButtonMobileStyle = (e) => {
        if(e === "user"){
            if(this.state.user){
                return {"backgroundColor":"rgb(55, 130, 175)", "color":"white"}
            }else{
                return {"backgroundColor":"white", "color":"black"}
            }
        }else{
            if(this.state.menu){
                return {"backgroundColor":"rgb(55, 130, 175)", "color":"white"}
            }else{
                return {"backgroundColor":"white", "color":"black"}
            }
        }
    }

    handleMenu = (e) => {
        if(e.target.id === "user"){
            if(!this.state.user){
                this.setState({
                    user: true,
                    menu: false
                })
            }
        }else{
            if(!this.state.menu){
                this.setState({
                    menu: true,
                    user: false
                })
            }
        }
    }

    render(){
        return(
            <div className="nav-main">
                <div className="nav-column sides" id="img-logo">
                    <Link to="/">
                        <img className="logo" alt="logo-the-bookhall" src={logo} />
                    </Link>
                </div>
                <div className="nav-column center" style={this.getProfileMobile("menu")}>
                    <span className="nav-search">
                        <span className="search">
                            <input className="search-input"
                            type="text"
                            id="search"
                            />
                            <button className="search-button">
                                <p className="button-text">
                                    Buscar
                                </p>
                            </button>
                        </span>
                        <a href="/advancedsearch" className="advanced">Búsqueda avanzada</a>
                        <span className="nav">
                            <span className="nav-mobile">
                                <Link to="/mangas" className="nav-button">
                                    <p className="button-text">
                                        Mangas
                                    </p>
                                </Link>
                                <Link to="/comics" className="nav-button">
                                    <p className="button-text">
                                        Cómics
                                    </p>
                                </Link>
                            </span>
                            <span className="nav-mobile">
                                <Link to="/libros" className="nav-button">
                                    <p className="button-text">
                                        Libros
                                    </p>
                                </Link>
                                <Link to="/contacto" className="nav-button" id="contact">
                                    <p className="button-text">
                                        Contacto
                                    </p>
                                </Link>
                            </span>
                        </span>
                    </span>
                </div>
                <div className="nav-column sides" style={this.getProfileMobile("user")}>
                    <User user={this.props.user} />
                </div>
                <div className="nav-column mobile">
                    <CgMenuRound className="mobile-icon menu"
                    id="menu"
                    style={this.getButtonMobileStyle("menu")}
                    onClick={this.handleMenu} />

                    <CgProfile className="mobile-icon profile"
                    id="user"
                    style={this.getButtonMobileStyle("user")}
                    onClick={this.handleMenu} />
                </div>
            </div>
        )
    }

}

export default NavBar;