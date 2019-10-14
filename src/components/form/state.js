import React, { Component } from 'react';
import './fields.css';
import USstates from './statearray';
import * as actions from '../actions';
import { connect } from 'react-redux';
class STA extends Component {
    constructor(props) {
        super(props)
        this.state = {
            render: ''
        }
    }
    componentDidMount() {
        if (this.props.myusermodel.hasOwnProperty("providerstate")) {
            this.handleChange(this.props.myusermodel.providerstate)
        }
        else {

            this.handleChange("")
        }
    }

    handleChange(value) {
        let obj = { sta: value, err: 0 };
        this.props.reduxState(obj);
    }

    showstates() {
        return USstates.map((state) => {
            return (<option value={state.abbreviation} key={state.abbreviation}>{state.name} </option>)
        })

    }


    getValue() {
        if (this.props.sta.hasOwnProperty("sta")) {
            return this.props.sta.sta;
        }
    }
    render() {

        return (<div className="register-field">
       State
       <br/>
       <select onChange={event => this.handleChange(event.target.value)} 
       value={this.getValue()}
       className="project-field"
       name="sta">
       <option value=""> Select State </option>
       {this.showstates()}
       </select>
       </div>)
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        sta: state.sta

    }
}


export default connect(mapStateToProps, actions)(STA)
