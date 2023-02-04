import React from "react";

import './home.css'

import Banners from './banners/banners'
import News from "./news/news";
import Bestsellers from "./bestsellers/bestsellers";

class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            news: [],
            others: [],
            bs: []
        }
    }

    getNews = () => {
        const news = []
        const products = this.props.products

        for(let i = 0; i < products.length; i++){
            const vols = products[i].vols
            vols.map((v)=>{
                if(v.novedad && v.stock > 0){
                    let vol = v
                    vol.descuento = products[i].descuento
                    vol.serie = products[i].nombre
                    return news.push(vol)
                }else{
                    return null
                }
            })
        }

        news.sort((a, b)=>{
            return b.ventas - a.ventas
        })

        this.setState({
            news: news
        }, ()=>{
            return null
        })
    }

    getBs = () => {
        const products = this.props.products
        let bs_obj = {
            mangas: [],
            comics: [],
            col: [],
            libros: []
        }

        for(let i = 0; i < products.length; i++){
            if(products[i].vols.length > 0){

                if(products[i].type === "col"){
                    let vols = products[i].vols
                    for(let j = 0; j < vols.length; j++){
                        let serie = {
                            nombre: vols[j].nombre,
                            prom_ventas: vols[j].ventas,
                            img: vols[j].imgURL,
                            sinopsis: vols[j].sinopsis,
                            url: `/products/${vols[j].id}`
                        }

                        bs_obj.col.push(serie)

                    }
                }else{
                    let serie = {
                        nombre: products[i].nombre,
                        prom_ventas: 0,
                        img: products[i].vols[0].imgURL,
                        sinopsis: products[i].sinopsis
                    }
        
                    let ventas = 0
                    let vols = products[i].vols
                    for(let j = 0; j < vols.length; j++){
                        ventas += vols[j].ventas
                    }
        
                    ventas = ventas/vols.length
                    serie.prom_ventas = ventas
        
                    if(products[i].type === "manga"){
                        if(products[i].nombre !== "JUJUTSU KAISEN FANBOOK OFICIAL"){
                            serie.url = `/mangas/${products[i].id}`
                            bs_obj.mangas.push(serie)
                        }
                    }else if(products[i].type === "comic"){
                        if(products[i].nombre !== "THE AMAZING SPIDER-MAN OMNIBUS"){
                            serie.url = `/comics/${products[i].id}`
                            bs_obj.comics.push(serie)
                        }
                    }else{
                        serie.url = `/libros/${products[i].id}`
                        bs_obj.libros.push(serie)
                    }
                }
            }

        }

        bs_obj.mangas.sort((a, b)=>{
            return b.prom_ventas - a.prom_ventas
        })

        bs_obj.comics.sort((a, b)=>{
            return b.prom_ventas - a.prom_ventas
        })

        bs_obj.col.sort((a, b)=>{
            return b.prom_ventas - a.prom_ventas
        })

        bs_obj.libros.sort((a, b)=>{
            return b.prom_ventas - a.prom_ventas
        })

        const bs = [bs_obj.mangas[0], bs_obj.comics[0], bs_obj.col[0], bs_obj.libros[0]]

        this.setState({
            bs: bs
        })

    }

    componentDidMount(){
        this.getNews()
        this.getBs()
    }

    componentDidUpdate(prevProps){
        if(prevProps !== this.props){
            this.getNews()
            this.getBs()
        }
    }

    render(){
        return(
            <div className="menu-main">
                <div className="banner-container">
                    <Banners />
                </div>
                <div className="news-container">
                    <div className="news-title-main">
                        <span className="news-bar izq" />
                        <span className="news-title-container">
                            <h1 className="news-title">
                                NOVEDADES
                            </h1>
                        </span>
                        <span className="news-bar der" />
                    </div>
                    <div className="news-grid">
                        {
                            this.state.news.map((n)=>{
                                return <News vol={n} key={n.id} />
                            })
                        }
                    </div>
                </div>
                <div className="bs-container">
                    <Bestsellers series={this.state.bs} />
                </div>
            </div>
        )
    }
}

export default Home