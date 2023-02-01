import React from "react";

import "./banners.css";

import Banner1 from "../../../imgs/thumbnail_BannerWeb02.png";
import Banner2 from "../../../imgs/BannerWeb01.png";

class Banners extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            id: ["visible", "oculto"],
            time: 7500
        }
    }

    componentDidMount(){
        this.loop()
    }

    loop = () => {
        setTimeout(() => {
            this.slide();
            this.loop();
        }, this.state.time);
    }

    slide = () => {

        let time = 950;

        let oculto = document.getElementById("oculto");
        let visible = document.getElementById("visible");

        if(this.state.id[0] === "visible"){
            this.setState({
                id: ["oculto", "visible"]
            }, ()=>{
                visible.animate([
                    { transform: 'translatex(-100%)'},
                    { transform: 'translatex(0%)'}
                ], {
                    duration: time,
                    iterations: 1
                })
        
                oculto.animate([
                    { transform: 'translatex(0%)'},
                    { transform: 'translatex(100%)'}
                ], {
                    duration: time,
                    iterations: 1
                })
            })
        }else{
            this.setState({
                id: ["visible", "oculto"]
            }, ()=>{
                visible.animate([
                    { transform: 'translatex(-100%)'},
                    { transform: 'translatex(0%)'}
                ], {
                    duration: time,
                    iterations: 1
                })
        
                oculto.animate([
                    { transform: 'translatex(0%)'},
                    { transform: 'translatex(100%)'}
                ], {
                    duration: time,
                    iterations: 1
                })
            })
        }

        
        
    }


    render(){
        return(
            <div className="banners-main-container">
                <div className="banner-1-container" id={this.state.id[0]}>
                    <img src={Banner1} alt="Banner01" className="banner" />
                </div>
                <div className="banner-2-container" id={this.state.id[1]}>
                    <img src={Banner2} alt="Banner02" className="banner" />
                </div>
            </div>
        )
    }
}

export default Banners;