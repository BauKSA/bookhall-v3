import React from "react";

import './card.css'

class Card extends React.Component{
    constructor(props){
        super(props)
    }

    //rgb(55, 130, 175)

    getTitle = () => {
        return(
            <span className="cart-card-title">
                {`${this.props.vol.serie} ${this.props.vol.numero}`}
            </span>
        )
    }

    getPrice = () => {
        if(this.props.vol.descuento){
            return(
                <div className="cart-card-price-container">
                    <p className="cart-card-price cart-card-old">
                        ${this.props.vol.precio}
                    </p>
                    <p className="cart-card-price">
                        ${parseInt(this.props.vol.precio) - (parseInt(this.props.vol.precio) * parseInt(this.props.vol.descuento) / 100)}
                    </p>
                </div>
            )
        }else{

        }
    }

    render(){
        return(
            <div className="cart-card-main">
                <img className="card-cart-img" src={this.props.vol.imgURL} alt="cover" />
                <div className="card-cart-info">
                    {this.getTitle()}
                    {this.getPrice()}
                </div>
            </div>
        )
    }

}

export default Card