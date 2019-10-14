import React, { Component } from 'react';
import './fields.css';
import * as actions from '../actions';
import { connect } from 'react-redux';
class LaborRate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uniquename: 'laborrate',
            label: 'Labor Rate',
            laborrate: this.props.myusermodel.laborrate
        }
    }

    validatenamefield(value) {
        let reg_ex = /^\d+(\.\d{1,2})?$/
        var test = reg_ex.test(value)
        let errmsg = ""
        let obj = {};
        if (!value) {
            errmsg = "Labor Rate is required "
            obj = { errmsg, laborrate: value }

        }
        else if (!test) {
        errmsg = "Labor rate match not found "
            obj = { errmsg, laborrate: value }
        }
        else {
          
            obj = {laborrate: value }
        }

        this.props.laborRate(obj)
    }

    componentDidMount() {
        if (this.props.myusermodel.hasOwnProperty("laborrate")) {

            this.validatenamefield(this.props.myusermodel.laborrate)
        }
        else {
            this.validatenamefield("")
        }

    }



    render() {
        const me = this.state;
        return (<div>            
       <div className="labor-rate-container">
       <div className="labor-rate-element-1">
       {me.label}
       </div>
       <div className="labor-rate-element-2">
       <input type="text" id={me.uniquename} 
       name={me.uniquename} onChange={event => this.validatenamefield(event.target.value)} 
       value={this.props.laborrate.laborrate} />
       </div>
       <div className="labor-rate-element-3">
       {this.props.laborrate.errmsg}
       </div>
       </div> 
       </div>)
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        laborrate: state.laborrate

    }
}

export default connect(mapStateToProps, actions)(LaborRate)
