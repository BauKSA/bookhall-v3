import React from "react";

import './adminStock.css'
import Stock from "./stock";

class AdminStock extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            products: {
                comics: [],
                mangas: [],
                colecciones: [],
                libros: []
            }
        }
    }

    get_products = () => {
        const products = {
            comics: [],
            mangas: [],
            colecciones: [],
            libros: []
        }
        
        const _products = this.props.products
        _products.map((p)=>{
            let vols
            switch(p.type){
                case "libro": 
                    vols = p.vols
                    for(let i = 0; i < vols.length; i++){
                        let _p = vols[i]
                        _p.serie = p.nombre
                        products.libros.push(_p)
                    }
                    return null
                case "comic":
                    vols = p.vols
                    for(let i = 0; i < vols.length; i++){
                        let _p = vols[i]
                        _p.serie = p.nombre
                        products.comics.push(_p)
                    }
                    return null
                case "manga":
                    vols = p.vols
                    for(let i = 0; i < vols.length; i++){
                        let _p = vols[i]
                        _p.serie = p.nombre
                        products.mangas.push(_p)
                    }
                    return null
                default:
                    vols = p.vols
                    for(let i = 0; i < vols.length; i++){
                        let _p = vols[i]
                        _p.serie = p.nombre
                        products.colecciones.push(_p)
                    }
                    return null
            }
        })

        products.mangas.sort((a, b) => a.serie.localeCompare(b.serie))
        products.comics.sort((a, b) => a.serie.localeCompare(b.serie))
        products.colecciones.sort((a, b) => a.serie.localeCompare(b.serie))
        products.libros.sort((a, b) => a.serie.localeCompare(b.serie))
        

        this.setState({
            products: products
        })
    }

    componentDidMount(){
        this.get_products()
    }

    componentDidUpdate(prevProps){
        if(prevProps.products !== this.props.products){
            this.get_products()
        }
    }

    render(){
        return(
            <div className="adminstock-main">
                <Stock products={this.state.products} />
            </div>
        )
    }

}

export default AdminStock