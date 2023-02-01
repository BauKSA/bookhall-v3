import React from "react";
import AddManga from "./addManga";
import AddMangaVol from "./addMangaVol";

import BackToDash from '../backToDash/backToDash'

class AdminMangas extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            mangas: [],
            editoriales: [],
            user: null
        }
    }

    componentDidMount(){
        const mangas = []

        for(let i = 0; i < this.props.products.length; i++){
            if(this.props.products[i].type === "manga"){
                mangas.push(this.props.products[i])
            }
        }

        mangas.sort((a, b) => a.nombre.localeCompare(b.nombre))
        const editoriales = this.props.editoriales
        editoriales.sort((a, b) => a.nombre.localeCompare(b.nombre))

        this.setState({
            mangas: mangas,
            user: this.props.user,
            editoriales: editoriales
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

    componentDidUpdate(prevProps){
        if(prevProps.products !== this.props.products){

            const mangas = []

            for(let i = 0; i < this.props.products.length; i++){
                if(this.props.products[i].type === "manga"){
                    mangas.push(this.props.products[i])
                }
            }

            mangas.sort((a, b) => a.nombre.localeCompare(b.nombre))

            const editoriales = this.props.editoriales
            editoriales.sort((a, b) => a.nombre.localeCompare(b.nombre))

            this.setState({
                mangas: mangas,
                user: this.props.user,
                editoriales: editoriales
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
    }

    render(){
        return(
            <div className="dashboard-main-container">
                <BackToDash />
                <h1 className="dashboard-title">
                    Administrar mangas
                </h1>
                <span className="dash-space-container">
                    <AddMangaVol mangas={this.state.mangas} />
                    <AddManga mangas={this.state.mangas} editoriales={this.state.editoriales} />
                </span>
            </div>
        )
    }

}

export default AdminMangas