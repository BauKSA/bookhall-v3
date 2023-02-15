import React from "react";
import BackToDash from "../backToDash/backToDash";
import Ventas from "./ventas";

import Loader from '../../../components/loader/loader'

import './ventas.css'

class AdminVentas extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            user: null,
            loading: true
        }
    }

    componentDidMount(){
        this.setState({
            user: this.props.user
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

    componentDidUpdate(prevProps, prevState){
        if(prevProps !== this.props){
            this.setState({
                user: this.props.user
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
                    <BackToDash />
                    <h1 className="dashboard-title">
                        Administrar ventas
                    </h1>
                    <Ventas
                        products={this.props.products}
                        ventas={this.props.ventas}/>
                </div>
            )
        }
    }
}

export default AdminVentas