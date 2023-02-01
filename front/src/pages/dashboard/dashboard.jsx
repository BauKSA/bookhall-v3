import React from "react";

import { Link } from 'react-router-dom'; 

import './dashboard.css'

class Dashboard extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            user: {},
            products: []
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps !== this.props){
            this.setState({
                user: this.props.user,
                products: this.props.products
            }, ()=>{
                if(!this.state.user){
                    window.location.href = '/'
                }else{
                    if(!this.state.user.admin){
                        window.location.href = '/'
                    }
                }
            })
        }
    }

    render(){
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
                        </span>
                    </span>
                </span>
            </div>
        )
    }
}

export default Dashboard