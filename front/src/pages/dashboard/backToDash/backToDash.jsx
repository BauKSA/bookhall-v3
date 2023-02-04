import React from "react";

import './backToDash.css'

import { IoArrowBackCircleSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'

class BackToDash extends React.Component{
    render(){
        return(
            <div className="backto-main">
                <Link to='/dashboard' className="backto-button">
                    <IoArrowBackCircleSharp className="backto-icon" />
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