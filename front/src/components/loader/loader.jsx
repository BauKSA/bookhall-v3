import React from "react";

import "./loader.css";

class Loader extends React.Component{
    render(){
        return(
            <div className="loader-container">
                <span className="loader" />
            </div>
        )
    }
}

export default Loader;