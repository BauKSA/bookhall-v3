import React from "react";
import { Link } from 'react-router-dom';

import { connect } from 'react-redux'
import { addItem } from '../../../redux/actions'

import { auth } from '../../../firebase'

import { IoCartSharp } from 'react-icons/io5'

import Swal from 'sweetalert2'

import get_title from "../../../get_title";

import './news.css'

class News extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            vol: {}
        }
    }

    componentDidMount(){
        this.setState({
            vol: this.props.vol
        })
    }

    componentDidUpdate(prevProps){
        if(prevProps.state.status !== this.props.state.status){
            if(this.props.state.status){
                Swal.fire({
                    icon: "success",
                    title: `Agregado correctamente!`
                })
                .then(()=>{
                    return window.location.reload()
                })
            }
        }
    }

    getTitle = () => {
        return get_title(this.props.vol)
    }

    getPrice = () => {
        if(this.state.vol.descuento){
            return(
                <span className="news-price-main desc">
                    <span className="news-price-container">
                        <p className="news-old-price">${this.state.vol.precio}</p>
                        <p className="news-price">
                            ${parseInt(this.state.vol.precio) - (parseInt(this.state.vol.precio) * parseInt(this.state.vol.descuento) /100)}
                        </p>
                    </span>
                    <IoCartSharp className="news-cart-icon" onClick={this.addToCart} />
                </span>
            )
        }
    }

    addToCart = (e) => {

        e.target.disabled = true
        let user = null

        if(auth.currentUser){
            user = {
                id: auth.currentUser.uid,
                email: auth.currentUser.email
            }
        }

        const data = {
            cant: 0,
            new_cant: 1,
            id: this.state.vol.id,
            user: user
        }
        
        this.props.addItem(data)
    }

    render(){
        if(!this.state.vol){
            return null
        }else{
            return(
                <div className="news-main">
                    <Link to={this.state.vol.id} className="news-img">
                        <img src={this.state.vol.imgURL} className="news-img" alt={"Novedades"} />
                    </Link>
                    <span className="news-info">
                        <span className="news-card-title-container">
                            <p className="news-card-title">
                                {this.getTitle()}
                            </p>
                        </span>
                        {this.getPrice()}
                    </span>
                </div>
            )
        }
    }

}

function mapStateToProps(state) {
    return {
        state: state
    }
}

const mapDispatchToProps = {
    addItem
}

const conexion = connect(mapStateToProps, mapDispatchToProps)
export default  conexion(News);