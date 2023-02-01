import React from "react";

import get_title from '../../get_title'
import Card from "../card/card";

import './recos.css'

class Recos extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            recos: {}
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.recos !== this.props.recos){
            this.setState({
                recos: this.props.recos
            }, ()=>{
                console.log(this.state.recos)
            })
        }
    }

    getRecos = () => {
        if(this.state.recos.vols){
            return(
                <div className="recos-card-main">
                    {
                        this.state.recos.vols.map((v)=>{
                            return <Card vol={v} />
                        })
                    }    
                </div>
            )
        }
    }

    render(){
        return(
            <div className="recos-main-container">
                <h1 className="recos-title">
                    {this.state.recos.title}
                </h1>
                {this.getRecos()}
            </div>
        )
    }

}

export default Recos