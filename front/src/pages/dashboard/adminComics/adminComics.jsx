import React from "react";
import AddComic from "./addComic";
import AddComicVol from "./addComicVol";

import BackToDash from '../backToDash/backToDash'
import AddCol from "./addCol";
import AddColVol from "./addColVol";

class AdminComics extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            comics: [],
            cols: [],
            editoriales: [],
            user: null,
            form: "series"
        }
    }

    componentDidMount(){
        const comics = []
        const cols = []

        for(let i = 0; i < this.props.products.length; i++){
            if(this.props.products[i].type === "comic"){
                comics.push(this.props.products[i])
            }else if(this.props.products[i].type === "col"){
                cols.push(this.props.products[i])
            }
        }

        comics.sort((a, b) => a.nombre.localeCompare(b.nombre))
        cols.sort((a, b) => a.nombre.localeCompare(b.nombre))

        const editoriales = this.props.editoriales
        editoriales.sort((a, b) => a.nombre.localeCompare(b.nombre))

        this.setState({
            comics: comics,
            cols: cols,
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

            const comics = []
            const cols = []

            for(let i = 0; i < this.props.products.length; i++){
                if(this.props.products[i].type === "comic"){
                    comics.push(this.props.products[i])
                }else if(this.props.products[i].type === "col"){
                    cols.push(this.props.products[i])
                }
            }

            comics.sort((a, b) => a.nombre.localeCompare(b.nombre))
            cols.sort((a, b) => a.nombre.localeCompare(b.nombre))

            const editoriales = this.props.editoriales
            editoriales.sort((a, b) => a.nombre.localeCompare(b.nombre))

            this.setState({
                comics: comics,
                cols: cols,
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

    handleChange = (e) => {
        if(e.target.id === "series-button"){
            this.setState({
                form: "series"
            })
        }else{
            this.setState({
                form: "colecciones"
            })
        }
    }

    handleStyle = (e) => {
        if(e === this.state.form){
            return {"backgroundColor":"rgb(55, 130, 175, 0.75)"}
        }else{
            return {"backgroundColor":"rgb(55, 130, 175, 0.25)"}
        }
    }

    handleForm = (e) => {
        if(e === this.state.form){
            return {"display":"flex"}
        }else{
            return {"display":"none"}
        }
    }

    render(){
        return(
            <div className="dashboard-main-container">
                <BackToDash />
                <h1 className="dashboard-title">
                    Administrar cómics
                </h1>
                <span className="dash-button-change">
                    <button className="button-change change-left"
                    id="series-button"
                    onClick={this.handleChange}
                    style={this.handleStyle("series")}>
                        Series
                    </button>
                    <button className="button-change change-right"
                    id="colecciones-button"
                    onClick={this.handleChange}
                    style={this.handleStyle("colecciones")}>
                        Colecciones
                    </button>
                </span>
                <span className="dash-space-container" style={this.handleForm("series")}>
                    <AddComicVol comics={this.state.comics} />
                    <AddComic comics={this.state.comics} editoriales={this.state.editoriales} />
                </span>
                <span className="dash-space-container" style={this.handleForm("colecciones")}>
                    <AddColVol cols={this.state.cols} />
                    <AddCol cols={this.state.cols} editoriales={this.state.editoriales} />
                </span>
            </div>
        )
    }

}

export default AdminComics