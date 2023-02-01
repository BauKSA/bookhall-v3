import React from "react";

import './home.css'

import Banners from './banners/banners'
import News from "./news/news";

class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            news: [],
            others: []
        }
    }

    componentDidMount(){
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

        this.setState({
            news: news
        })

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
                                return <News vol={n} key={n.imgURL} />
                            })
                        }
                    </div>
                </div>
                <div className="other-container">

                </div>
            </div>
        )
    }
}

export default Home