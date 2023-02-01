import React from "react";

import { Link } from 'react-router-dom'

import './card.css'

class Card extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <Link to={`/product/${this.props.vol.id}`} className="bs-card-main">
                <img src={this.props.vol.imgURL} className="bs-card-img" alt="cover" />
            </Link>
        )
    }
}

export default Card