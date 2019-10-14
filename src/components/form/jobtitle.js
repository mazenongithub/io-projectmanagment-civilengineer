import React, { Component } from 'react';
import './fields.css';
import * as actions from '../actions';
import { connect } from 'react-redux';
class JobTitle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            render: ''
        }
    }
    componentDidMount() {
        if (this.props.myusermodel.hasOwnProperty("jobtitle")) {
            this.handleChange(this.props.myusermodel.jobtitle)
        }
        else {
            this.handleChange("")
        }
    }
    handleChange(value) {

        let err = 0;
        if (value.length > 80) {
            err += 1;

            let obj = { jobtitle: value, err }
            this.props.jobTitle(obj)
        }
        else {

            let obj = { jobtitle: value, err }
            this.props.jobTitle(obj)
        }
        return;
    }
    getValue() {
        if (this.props.jobtitle.hasOwnProperty("jobtitle")) {
            return (this.props.jobtitle.jobtitle)
        }
    }
    render() {
        return (<div className="register-field">
       Job Title
       <br/>
       <input type="text" name="jobtitle"
       onChange={event => this.handleChange(event.target.value)} 
       value={this.getValue()}
       className="project-field"/>
       </div>)
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        jobtitle: state.jobtitle

    }
}

export default connect(mapStateToProps, actions)(JobTitle)
