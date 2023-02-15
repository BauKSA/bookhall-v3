import React from "react";
import AddLibro from "./addLibro";
import AddLibroVol from "./addLibroVol";

import BackToDash from '../backToDash/backToDash'
import Loader from "../../../components/loader/loader";

class AdminLibros extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            libros: [],
            editoriales: [],
            user: null,
            loading: true
        }
    }

    componentDidMount(){
        const libros = []

        for(let i = 0; i < this.props.products.length; i++){
            if(this.props.products[i].type === "libro"){
                libros.push(this.props.products[i])
            }
        }

        libros.sort((a, b) => a.nombre.localeCompare(b.nombre))
        const editoriales = this.props.editoriales
        editoriales.sort((a, b) => a.nombre.localeCompare(b.nombre))

        this.setState({
            libros: libros,
            user: this.props.user,
            editoriales: editoriales
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
        if(prevProps.products !== this.props.products){

            const libros = []

            for(let i = 0; i < this.props.products.length; i++){
                if(this.props.products[i].type === "libro"){
                    libros.push(this.props.products[i])
                }
            }

            libros.sort((a, b) => a.nombre.localeCompare(b.nombre))

            const editoriales = this.props.editoriales
            editoriales.sort((a, b) => a.nombre.localeCompare(b.nombre))

            this.setState({
                libros: libros,
                user: this.props.user,
                editoriales: editoriales
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
                        Administrar libros
                    </h1>
                    <span className="dash-space-container">
                        <AddLibroVol libros={this.state.libros} />
                        <AddLibro libros={this.state.libros} editoriales={this.state.editoriales} />
                    </span>
                </div>
            )
        }
    }

}

export default AdminLibros