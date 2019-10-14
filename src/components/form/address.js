import React, { Component } from 'react';
import './fields.css';
import * as actions from '../actions';
import { connect } from 'react-redux';
class Address extends Component {
    constructor(props) {
        super(props)
        this.state = {
            render: 'render'
        }
    }
    componentDidMount() {
        if (this.props.myusermodel.hasOwnProperty("provideraddress")) {
            this.handleChange(this.props.myusermodel.provideraddress)
        }
        else {
            this.handleChange("")
        }
    }
    handleChange(value) {

        console.log(value)
        let err = 0;
        if (value.length > 180) {
            err += 1;

            let obj = { address: value, errmsg: "Address field length exceeded" }
            this.props.reduxAddress(obj);
        }
        else {

            let obj = { address: value, err }
            this.props.reduxAddress(obj);
        }
        return;
    }
    getValue() {
        if (this.props.address.hasOwnProperty("address")) {
            return this.props.address.address;
        }
    }
    render() {

        return (<div className="register-field">
       Address
       <br/>
       <input type="text" name="address"
       onChange={event => this.handleChange(event.target.value)} 
       value={this.getValue()}
       className="project-field"/>
       </div>)
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        address: state.address

    }
}

export default connect(mapStateToProps, actions)(Address)
