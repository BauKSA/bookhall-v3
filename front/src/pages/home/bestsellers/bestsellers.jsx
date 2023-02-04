import React from "react";

import './bestsellers.css'

import { BsStars, BsStar } from 'react-icons/bs'

import { Link } from 'react-router-dom'

class Bestsellers extends React.Component{

    render(){
        return(
            <div className="home-bs-container">
                <span className="home-bs-title-container">
                    <BsStars className="home-bs-icon" />
                    <h1 className="home-bs-title">
                        Los más vendidos
                    </h1>
                </span>
                {
                    this.props.series.map((s)=>{
                        return(
                            <div className="home-bs-card-main">
                                <img className="home-bs-img" alt="cover" src={s.img} />
                                <div className="home-bs-info">
                                    <h3 className="home-bs-card-title">
                                        <BsStar className="home-bs-card-icon" />
                                        {s.nombre}
                                    </h3>
                                    <span className="home-bs-sinopsis-main">
                                        <p className="home-bs-sinopsis">
                                            {s.sinopsis}
                                        </p>
                                        <Link to={s.url} className="home-bs-button">
                                            Ver más
                                        </Link>
                                    </span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default Bestsellers