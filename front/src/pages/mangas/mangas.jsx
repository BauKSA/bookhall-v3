import React from "react";

import Bestsellers from "../../components/bestsellers/bestsellers";
import Recos from "../../components/recos/recos";

import '../productsStyle.css'

class Mangas extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            mangas: [],
            series: [],
            editoriales: [],
            bestsellers: [],
            recos: []
        }
    }

    componentDidMount(){
        const products = this.props.products

        const series = []
        const mangas = []
        const bs = []
        const recos = []


        /*GET MANGAS*/
        products.map((p)=>{
            if(p.type === "manga"){
                series.push(p)
                const vols = p.vols

                for(let i = 0; i < vols.length; i++){
                    let manga = vols[i]
                    manga.serie = p.nombre
                    manga.descuento = p.descuento

                    mangas.push(manga)
                }

                return null
            }else{
                return null
            }
        })

        
        mangas.sort((a, b)=>{
            return b.ventas - a.ventas
        })

        /*GET BS*/
        const width = window.innerWidth
        let cant = Math.floor(width / 160)
        if(cant > 5){
            cant = 5
        }

        for(let i = 0; i < mangas.length; i++){
            if(cant > 0 && mangas[i].stock > 0){
                cant--
                bs.push(mangas[i])
            }
        }

        /*GET RECOS*/
        let cant_recos = 3

        for(let i = 0; i < series.length; i++){
            if(parseInt(series[i].vol_amount) === 1
            && series[i].state === "Cerrada"
            && series[i].vols.length > 0){
                let vol = series[i].vols[0]
                vol.serie = series[i].nombre
                vol.descuento = series[i].descuento
                vol.unico = true
                vol.sinopsis = series[i].sinopsis
                vol.editorial = series[i].editorial

                recos.push(vol)
            }
        }

        recos.sort((a, b)=>{
            return b.ventas - a.ventas
        })

        const recos_filtered = []

        for(let i = 0; i < recos.length; i++){
            if(cant_recos > 0 && recos[i].stock > 0){
                cant_recos--
                recos_filtered.push(recos[i])
            }
        }

        const recos_obj = {
            vols: recos_filtered,
            title: "Tomos únicos"
        }

        
        this.setState({
            mangas: mangas,
            bestsellers: bs,
            recos: recos_obj
        })

    }

    render(){
        return(
            <div className="products-main-container">
                <Bestsellers products={this.state.bestsellers} />
                <Recos recos={this.state.recos} />
            </div>
        )
    }

}

export default Mangas