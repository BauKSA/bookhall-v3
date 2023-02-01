import React from "react";
import get_title from "../../get_title";

class Card extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        console.log("VOLUME: ", this.props.vol)
    }

    render(){
        return(
            <div className="card-main-container">
                {/*get_title(this.props.vol.id)*/}
            </div>
        )
    }
}

export default Card