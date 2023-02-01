import React from "react";

import './backToDash.css'

import { TiArrowBackOutline } from 'react-icons/ti'
import { Link } from 'react-router-dom'

class BackToDash extends React.Component{
    render(){
        return(
            <div className="backto-main">
                <Link to='/dashboard' className="backto-button">
                    <TiArrowBackOutline className="backto-icon" />
                </Link>
                <span className="backto-text-main">
                    <p className="backto-text">
                        Volver
                    </p>
                </span>
            </div>
        )
    }
}

export default BackToDash