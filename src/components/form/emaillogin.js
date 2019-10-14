import React, { Component } from 'react';
import '../login.css';
import * as actions from '../actions';
import { connect } from 'react-redux';
class EmailLogin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            errmsg: ''
        }
    }
    componentDidMount() {

        if (this.props.myusermodel.hasOwnProperty("emailaddress")) {
            this.handleChange(this.props.myusermodel.emailaddress)
        }
        else {
            this.handleChange("")
        }

    }

    handleChange(value) {
        value = value.trim();
        //console.log(event.target.value)
        var reg_ex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
        var test = reg_ex.test(value)
        if (!value) {
            this.props.emailAddress({ errmsg: " Email address is required. ", emailaddress: value })

        }
        else if (!test) {

            this.props.emailAddress({ errmsg: " Email Address validation fail ", emailaddress: value });
        }
        else if (value.length > 320) {
            this.props.emailAddress({ errmsg: " Length limit exceeded ", emailaddress: value });

        }
        else {
            this.props.emailAddress({ emailaddress: value });

        }
        return;
    }
    emaillogin() {
        let myjsx = [];
        let element_1 = <div className="emaillogin-label">Email Address:</div>
        myjsx.push(element_1);
        let element_2 = <div className="emaillogin-field">
    <input type="text"
    className="project-field"
    name="emailaddress"
    value={this.getvalue()}
    onChange={event=>{this.handleChange(event.target.value)}}/></div>
        myjsx.push(element_2)
        return myjsx;

    }
    getvalue() {
        if (this.props.emailaddress.hasOwnProperty("emailaddress")) {
            return (this.props.emailaddress.emailaddress);
        }
    }

    render() {

        return (this.emaillogin())
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        emailaddress: state.emailaddress

    }
}
export default connect(mapStateToProps, actions)(EmailLogin);
