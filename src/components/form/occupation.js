import React, { Component } from 'react';
import './fields.css';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { showOccupations } from '../functions'
class Occupation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            render: ''
        }
    }

    handleChange(value) {

        this.props.reduxOccupation({ occupation: value })


    }
    getOccupationcategories() {
        let categories = showOccupations();
        if (categories.hasOwnProperty("length")) {
            // eslint-disable-next-line
            return (categories.map(mycategory => {
                return (<option value={mycategory.code}> {mycategory.code}-{mycategory.name}</option>)
            }))
        }
    }
    getValue() {
        if (this.props.occupation.hasOwnProperty("occupation")) {
            return this.props.occupation.occupation;
        }
    }
    geterrormessage() {
        if (this.props.occupation.hasOwnProperty("errormessage")) {
            return (<span className="register-field-err"><br/>{this.props.occupation.errormessage} </span>)
        }
    }
    render() {
        return (<div className="register-field">
       Occupation Category:
       <select name="occupation" className="project-field"
       value={this.getValue()}
       onChange={event=>{this.handleChange(event.target.value)}}>
       <option value=""> Select An Occupation Category</option>
       {this.getOccupationcategories()}
       </select>
       </div>)
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        occupation: state.occupation

    }
}


export default connect(mapStateToProps, actions)(Occupation)
