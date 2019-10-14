import React, { Component } from 'react';
import './fields.css';
import * as actions from '../actions';
import { connect } from 'react-redux';
class LastName extends Component {
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

        console.log(value)
        var reg_ex = /^[a-zA-Z\s]*$/
        var test = reg_ex.test(value);
        if (!value) {

            let obj = { lastname: value, errmsg: "Please enter last name" }
            this.props.lastName(obj);


        }
        else if (!test) {


            let obj = { lastname: value, errmsg: "Only letters for last name" }
            this.props.lastName(obj);
        }
        else if (value.length > 32) {
            let obj = { lastname: value, errmsg: "Max length for last name is 32" }
            this.props.lastName(obj);
        }
        else {

            let obj = { lastname: value }
            this.props.lastName(obj);
        }
        return;
    }
    getValue() {
        if (this.props.lastname.hasOwnProperty("lastname")) {
            return this.props.lastname.lastname;
        }
    }
    geterrormessage() {
        if (this.props.lastname.hasOwnProperty("errmsg")) {
            return <span className="register-field-err"> <br/> {this.props.lastname.errmsg} </span>
        }
    }
    render() {
        return (<div className="register-field">
       *Last Name
       <br/>
       <input type="text" name="lastname"
       onChange={event => this.handleChange(event.target.value)} 
       value={this.getValue()}
       className="project-field"/>
       </div>)
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        lastname: state.lastname
    }
}

export default connect(mapStateToProps, actions)(LastName)
