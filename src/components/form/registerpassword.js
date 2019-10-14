import React, { Component } from 'react';
import './fields.css';
import * as actions from '../actions';
import { connect } from 'react-redux';
class RegisterPassword extends Component {
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
        if (!value) {
            this.props.reduxpassword({ errmsg: " Please enter a password ", password: value });
        }
        else if (value.length < 6) {

            this.props.reduxpassword({ errmsg: " Password has a min of 6 char ", password: value });

        }
        else {

            this.props.reduxpassword({ password: value });
        }
        return;
    }
    getValue() {
        if (this.props.password.hasOwnProperty("password")) {
            return this.props.password.password;
        }
    }
    geterrmsg() {
        if (this.props.password.hasOwnProperty("errmsg")) {
            return (<span className="register-field-err"><br/> {this.props.password.errmsg} </span>)
        }
    }
    render() {

        return (<div className="register-field">
       *Password
       <br/>
       <input type="password" name="pass"
       onChange={event => this.handleChange(event.target.value)} 
       value={this.getValue()}
       className="project-field"/>
       {this.geterrmsg()}
       </div>)
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        password: state.password

    }
}
export default connect(mapStateToProps, actions)(RegisterPassword);
