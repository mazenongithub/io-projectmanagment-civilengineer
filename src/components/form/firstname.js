import React, { Component } from 'react';
import '../register.css';
import * as actions from '../actions';
import { connect } from 'react-redux';
class FirstName extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uniquename: 'firstname',
            label: 'First Name',
            errmsg: '',
            firstname: this.props.myusermodel.firstname
        }
    }
componentDidMount(){
    this.handleChange("")
}

    handleChange(value) {

        var reg_ex = /^[a-zA-Z\s]*$/
        var test = reg_ex.test(value)
        if (!value) {

            let obj = { firstname: value,  errmsg: "Please enter first name" }
            this.props.firstName(obj);

        }
        else if (!test) {

            let obj = { firstname: value, errmsg: "Only letters for first name" }
            this.props.firstName(obj);

        }
        else if (value.length > 32) {

            let obj = { firstname: value,  errmsg: "The max length is 32" }
            this.props.firstName(obj);

        }
        else {
            let obj = { firstname: value, err: 0 }
            this.props.firstName(obj);

        }

    }

    getValue() {
        if (this.props.firstname.hasOwnProperty("firstname")) {
            return this.props.firstname.firstname;
        }
    }
    geterrormessage() {
        if (this.props.firstname.hasOwnProperty("errmsg")) {
            return <span className="register-field-err"> <br/> {this.props.firstname.errmsg} </span>
        }
    }
    render() {

        return (<div className="register-field">
       *First Name
       <br/>
       <input type="text" name="firstname"
       onChange={event => this.handleChange(event.target.value)} 
       value={this.getValue()}
       className="project-field"/>
       </div>)
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        firstname: state.firstname

    }
}

export default connect(mapStateToProps, actions)(FirstName)
