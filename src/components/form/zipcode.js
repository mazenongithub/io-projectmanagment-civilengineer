import React, { Component } from 'react';
import './fields.css';
import * as actions from '../actions';
import { connect } from 'react-redux';
class Zipcode extends Component {
    constructor(props) {
        super(props)
        this.state = {
            render: ''
        }
    }
    componentDidMount() {
        if (this.props.myusermodel.zipcode) {
            this.handleChange(this.props.myusermodel.zipcode);
        }
        else {
            this.handleChange("");
        }
    }

    handleChange(val) {

        var reg_ex = /^\d{5}(?:[-\s]\d{4})?$/
        var test = reg_ex.test(val);
        if (!val) {
            let values = { zipcode: val, errmsg: "Zipcode is required " }
            this.props.reduxZipcode(values);
        }
        else if (!test) {

            let values = { zipcode: val, errmsg: "No match for zipcode" }
            this.props.reduxZipcode(values);
        }

        else {
            let values = { zipcode: val }
            this.props.reduxZipcode(values);
        }
        return;
    }
    getValue() {
        if (this.props.zipcode.hasOwnProperty("zipcode")) {
            return this.props.zipcode.zipcode;
        }
    }
    render() {

        return (<div className="register-field">
       Zipcode
       <br/>
       <input type="text" name="zipcode"
       onChange={event => this.handleChange(event.target.value)} 
       value={this.getValue()}
       className="project-field"/>
       </div>)
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        zipcode: state.zipcode

    }
}


export default connect(mapStateToProps, actions)(Zipcode)
