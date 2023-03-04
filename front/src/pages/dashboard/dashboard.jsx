import React from "react";

import { Link } from 'react-router-dom';

import Loader from "../../components/loader/loader";

import './dashboard.css'

class Dashboard extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            user: {},
            products: [],
            loading: true
        }
    }

    componentDidMount(){
        this.setState({
            user: this.props.user,
            products: this.props.products
        })
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps !== this.props){
            this.setState({
                user: this.props.user,
                products: this.props.products
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

    render(){
        if(this.state.loading){
            return <Loader />
        }else{
            return(
                <div className="dashboard-main-container">
                    <h1 className="dashboard-title">
                        Panel de administrador
                    </h1>
                    <span className="dash-space-main">
                        <span className="dash-space">
                            <h2 className="dash-space-title">
                                Productos
                            </h2>
                            <span className="dash-space-actions">
                                <Link to="/admineditoriales" className="dash-space-link">
                                    <button className="dash-space-button">
                                        <p className="dash-space-button-p">
                                            Editoriales
                                        </p>
                                    </button>
                                </Link>
                                <Link to="/adminmangas" className="dash-space-link">
                                    <button className="dash-space-button">
                                        <p className="dash-space-button-p">
                                            Mangas
                                        </p>
                                    </button>
                                </Link>
                                <Link to="/admincomics" className="dash-space-link">
                                    <button className="dash-space-button">
                                        <p className="dash-space-button-p">
                                            Cómics
                                        </p>
                                    </button>
                                </Link>
                                <Link to="/adminlibros" className="dash-space-link">
                                    <button className="dash-space-button">
                                        <p className="dash-space-button-p">
                                            Libros
                                        </p>
                                    </button>
                                </Link>
                                <Link to="/adminfiguras" className="dash-space-link">
                                    <button className="dash-space-button">
                                        <p className="dash-space-button-p">
                                            Figuras
                                        </p>
                                    </button>
                                </Link>
                            </span>
                        </span>
                        <span className="dash-space">
                            <h2 className="dash-space-title">
                                Ventas / Stock
                            </h2>
                            <span className="dash-space-actions">
                                <Link to="/adminstock" className="dash-space-link">
                                    <button className="dash-space-button">
                                        <p className="dash-space-button-p">
                                            Administrar stock
                                        </p>
                                    </button>
                                </Link>
                                <Link to="/adminventas" className="dash-space-link">
                                    <button className="dash-space-button">
                                        <p className="dash-space-button-p">
                                            Administrar ventas
                                        </p>
                                    </button>
                                </Link>
                                <Link to="/simulventa" className="dash-space-link">
                                    <button className="dash-space-button">
                                        <p className="dash-space-button-p">
                                            Crear venta
                                        </p>
                                    </button>
                                </Link>
                            </span>
                        </span>
                        <span className="dash-space">
                            <h2 className="dash-space-title">
                                Precios
                            </h2>
                            <span className="dash-space-actions">
                                <Link to="/adminstock" className="dash-space-link">
                                    <button className="dash-space-button">
                                        <p className="dash-space-button-p">
                                            Modificar precios
                                        </p>
                                    </button>
                                </Link>
                                <Link to="/adminventas" className="dash-space-link">
                                    <button className="dash-space-button">
                                        <p className="dash-space-button-p">
                                            Modificar descuentos
                                        </p>
                                    </button>
                                </Link>
                            </span>
                        </span>
                    </span>
                </div>
            )
        }
    }
}

export default Dashboard