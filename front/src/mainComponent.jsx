import React from "react";

import { connect } from 'react-redux'
import { getProducts, getUser, get_editoriales } from "./redux/actions";

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
            editoriales: []
        }
    }

    componentDidMount(){
        this.props.getProducts()
    }

    componentDidUpdate(prevProps){
        if(prevProps.state.products !== this.props.state.products){
            this.setState({
                products: this.props.state.products
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
            this.setState({
                editoriales: this.props.state.editoriales
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
                    products={this.state.products} />
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
    get_editoriales
}

const conexion = connect(mapStateToProps, mapDispatchToProps)
export default  conexion(MainComponent);