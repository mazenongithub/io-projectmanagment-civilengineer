import React, { Component } from 'react';
import './fields.css';
import * as actions from '../actions';
import { connect } from 'react-redux';

class Phone extends Component {
    constructor(props) {
        super(props)
        this.state = {
            render: ''
        }

    }
    componentDidReceiveProps() {
        if (this.props.myusermodel.phone) {
            this.handleChange(this.props.myusermodel.phone);
        }
        else {

            this.handleChange("");
        }

    }

    handleChange(value) {
        value = value.trim();

        var reg_ex = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/
        var test = reg_ex.test(value);
        if (!value) {
            let obj = { phone: value, errmsg: " Phone Number is required" }
            this.props.reduxPhone(obj);
        }
        else if (!test) {
            let obj = { phone: value, errmsg: " No match for phone number" }
            this.props.reduxPhone(obj);
        }
        else if (value.length > 19) {
            let obj = { phone: value, errmsg: " Max length is 19" }
            this.props.reduxPhone(obj);
        }
        else {

            let obj = { phone: value }
            this.props.reduxPhone(obj);
        }
        return;
    }
    getValue() {
        if (this.props.phone.hasOwnProperty("phone")) {
            return this.props.phone.phone;
        }
    }
    render() {

        return (<div className="register-field">
       *Phone
       <br/>
       <input type="text" name="phone"
       onChange={event => this.handleChange(event.target.value)} 
       value={this.getValue()}
       className="project-field"/>
       </div>)
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        phone: state.phone

    }
}

export default connect(mapStateToProps, actions)(Phone);
