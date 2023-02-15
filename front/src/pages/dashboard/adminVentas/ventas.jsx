import React from 'react'
import Card from './card/card'

class Ventas extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            ventas: [],
            despachar: [],
            retirar: [],
            despachadas: [],
            products: [],
            selected: "retirar"
        }
    }

    setVentas = () => {
        const ventas = this.state.ventas
        const despachar = []
        const retirar = []
        const despachadas = []

        for(let i = 0; i < ventas.length; i++){
            if(ventas[i].shipping){
                if(!ventas[i].shipping.despachada){
                    despachar.push(ventas[i])
                }else{
                    despachadas.push(ventas[i])
                }
            }else if(ventas[i].retira){
                retirar.push(ventas[i])
            }
        }

        this.setState({
            despachar: despachar,
            despachadas: despachadas,
            retirar: retirar
        })
    }

    configState = () => {
        this.setState({
            ventas: this.props.ventas,
            products: this.props.products
        })
    }

    componentDidMount(){
        this.configState()
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps !== this.props){
            this.configState()
        }

        if(prevState.ventas !== this.state.ventas && this.state.ventas){
            this.setVentas()
        }
    }

    getStyle = (e) => {
        if(e === this.state.selected){
            return {"background-color":"rgb(55, 130, 175)"}
        }else{
            return {"background-color":"white"}
        }
    }

    changeSelected = (e) => {
        this.setState({
            selected: e.target.id
        })
    }

    getVentas = () => {
        if(this.state.selected === "retirar"){
            return(
                <section className='ventas-grid'>
                    {
                        this.state.retirar.map((v)=>{
                            let venta = v
                            venta.retirar = true
                            return <Card venta={venta} />
                        })
                    }
                </section>
            )
        }else{
            return(
                <section className='ventas-grid'>
                    {
                        this.state.despachar.map((v)=>{
                            let venta = v
                            venta.despachar = true
                            return <Card venta={venta} />
                        })
                    }
                </section>
            )
        }
    }

    render(){
        return(
            <div className='ventas-main-container'>
                <h3 className='ventas-title'>Ventas</h3>
                <span className='ventas-buttons'>
                    <button className='ventas-button'
                    id="retirar"
                    style={this.getStyle("retirar")}
                    onClick={this.changeSelected}>
                        Ventas por retirar
                    </button>
                    <button className='ventas-button'
                    id="despachar"
                    style={this.getStyle("despachar")}
                    onClick={this.changeSelected}>
                        Ventas por despachar
                    </button>
                </span>
                {this.getVentas()}
            </div>
        )
    }
}

export default Ventas