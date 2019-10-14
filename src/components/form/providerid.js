import React, { Component } from 'react';
import './fields.css';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { validateProviderID } from '../functions';
import { CheckProviderID } from '../actions/api';

class ProviderID extends Component {
    constructor(props) {
        super(props)
        this.state = {
            render: ''
        }
    }


    componentDidMount() {
        this.handleChange("")
    }

    handleChange(value) {
        const reg_ex = /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/
        const test = reg_ex.test(value);
        console.log(value)
        if (!value) {
            this.props.providerID({ providerid: value, errmsg: " ProviderID is required " })
        }
        else if (value.length >= 30) {
            this.props.providerID({ providerid: value, errmsg: " ProviderID should be less than 30 characters " })
        }
        else if (!test) {
            this.props.providerID({ providerid: value, errmsg: " Invalid Character in user name " })
        }
        else {

            this.props.providerID({ providerid: value })
        }
        return;
    }

    getValue() {
        if (this.props.providerid.hasOwnProperty("providerid")) {
            return this.props.providerid.providerid;
        }
    }
    geterrormessage() {
        if (this.props.providerid.hasOwnProperty("errmsg")) {
            return <span className="register-field-err"> <br/> {this.props.providerid.errmsg} </span>
        }
    }
    async handleInput(providerid) {
        if (!validateProviderID(providerid)) {
            if (providerid) {
                let response = await CheckProviderID(providerid)
                console.log(response)
                if (response.hasOwnProperty("message")) {
                    this.props.providerID({ providerid, errmsg: response.message })
                }
            }
        }

    }
    render() {
        return (<div className="register-field">
       ProviderID
       <br/>
       <input type="text" name="newproviderid"
       onInput={event=>{this.handleInput(event.target.value)}}
       onChange={event => this.handleChange(event.target.value)} 
       value={this.getValue()}
       className="project-field"/>
       </div>)
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        providerid: state.providerid
    }
}

export default connect(mapStateToProps, actions)(ProviderID)
