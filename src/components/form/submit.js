import React, { Component } from 'react';
import './fields.css';

class Submit extends Component {


    render() {

        return (<div>            
       <div className="field-container">
       <div className="field-element">
       &nbsp;
       </div>
       <div className="field-element">
       <input type="submit" value="Submit" />
       </div>
       <div className="field-element">
       &nbsp;
       </div>
       </div> 
       </div>)
    }
}


export default Submit;
