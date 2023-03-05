import React from "react";

import { connect } from 'react-redux'
import { getProducts, getUser, get_editoriales, get_ventas } from "./redux/actions";

import Loader from './components/loader/loader'

import "./mainComponent.css"
import NavBar from "./components/navBar/navBar";
import PageComponent from "./pages/PageComponent";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

class MainComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            user: null,
            loading: true,
            products: [],
            editoriales: [],
            ventas: []
        }
    }

    componentDidMount(){
        this.props.getProducts()
    }

    componentDidUpdate(prevProps){
        if(prevProps.state.products !== this.props.state.products){
            let products = this.props.state.products
            products = products.sort((a, b) => a.nombre.localeCompare(b.nombre))
            this.setState({
                products: products
            }, ()=>{
                this.props.get_editoriales()
            })
        }

        if(prevProps.state.user !== this.props.state.user){
            this.setState({
                user: this.props.state.user
            })
        }

        if(prevProps.state.editoriales !== this.props.state.editoriales){
            let editoriales = this.props.state.editoriales
            editoriales = editoriales.sort((a, b) => a.nombre.localeCompare(b.nombre))
            this.setState({
                editoriales: editoriales
            }, ()=>{
                this.props.get_ventas()
            })
        }

        if(prevProps.state.ventas !== this.props.state.ventas){
            this.setState({
                ventas: this.props.state.ventas
            }, ()=>{
                this.setState({
                    loading: false
                })
            })
        }

    }

    render(){

        onAuthStateChanged(auth, ()=>{
            if(auth.currentUser){
                if(this.state.user){
                    if(this.state.user.id !== auth.currentUser.uid){
                        this.props.getUser(auth.currentUser.uid)
                    }
                }else{
                    this.props.getUser(auth.currentUser.uid)
                }
            }else{
                if(this.state.user){
                    this.setState({
                        user: null
                    })
                }
            }
        })

        if(this.state.loading){
            return <Loader />
        }else{
            return (
                <div className="mainComponent">
                    <NavBar user={this.state.user} />

                    <PageComponent
                    editoriales={this.state.editoriales}
                    user={this.state.user}
                    products={this.state.products}
                    ventas={this.state.ventas} />
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
    getProducts,
    getUser,
    get_editoriales,
    get_ventas
}

const conexion = connect(mapStateToProps, mapDispatchToProps)
export default  conexion(MainComponent);