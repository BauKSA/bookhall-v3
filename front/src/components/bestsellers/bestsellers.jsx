import React from "react";

import './bestsellers.css'
import Card from "./card/card";

class Bestsellers extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            bs: []
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.products !== this.props.products){
            this.setState({
                bs: this.props.products
            })
        }
    }

    render(){
        return(
            <div className="bestsellers-main-container">
                <h1 className="bestsellers-title">
                    Los más vendidos
                </h1>
                <div className="bestsellers-grid" id="bs-grid">
                    {
                        this.state.bs.map((bs)=>{
                            return <Card vol={bs} />
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Bestsellers