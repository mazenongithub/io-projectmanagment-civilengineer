import React, { Component } from 'react';
import '../register.css';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { CheckEmailAddress } from '../actions/api';
import { validateEmail } from '../functions';
class EmailAddress extends Component {
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
        value = value.trim();
        //console.log(event.target.value)
        var reg_ex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
        var test = reg_ex.test(value)

        if (!value) {
            this.props.emailAddress({ errmsg: " Email address is required ", emailaddress: value })

        }
        else if (!test) {

            this.props.emailAddress({ errmsg: " Email Address register invalid ", emailaddress: value });

        }
        else if (value.length > 320) {

            this.props.emailAddress({ errmsg: " Field length for email has been exceeded  ", emailaddress: value });

        }
        else {

            this.props.emailAddress({ emailaddress: value });
        }
        return;
    }
    getValue() {
        if (this.props.emailaddress.hasOwnProperty("emailaddress")) {
            return this.props.emailaddress.emailaddress;
        }
    }
    geterrmsg() {
        if (this.props.emailaddress.hasOwnProperty("errmsg")) {
            return (<span className="register-field-err"><br/> {this.props.emailaddress.errmsg} </span>)
        }
    }
    async handleInput(emailaddress) {
        if (!validateEmail(emailaddress)) {
            let response = await CheckEmailAddress(emailaddress);
            console.log(response)
            if (response.hasOwnProperty("invalid")) {
                this.props.emailAddress({ emailaddress, errmsg: response.message })
            }
        }
    }
    render() {

        return (<div className="register-field">
       *Email Address
       <br/>
       <input type="text" name="emailaddress"
       onInput={event=> {this.handleInput(event.target.value)}}
       onChange={event => this.handleChange(event.target.value)} 
       value={this.getValue()}
       className="project-field"/>
       
       </div>)
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        emailaddress: state.emailaddress

    }
}
export default connect(mapStateToProps, actions)(EmailAddress);
