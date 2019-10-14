import React, { Component } from 'react';
import './fields.css';
import * as actions from '../actions';
import { connect } from 'react-redux';
class City extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uniquename: 'city',
            label: 'City',
            errmsg: '',
            city: this.props.myusermodel.providercity
        }
    }

    componentDidMount() {
        if (this.props.myusermodel.hasOwnProperty("providercity")) {
            this.handleChange((this.props.myusermodel.providercity))
        }
        else {
            this.handleChange("")
        }
    }

    handleChange(value) {
        console.log(value)
        let err = 0;
        if (value.length > 80) {
            err += 1;

            let obj = { city: value, err }
            this.props.reduxCity(obj);
        }
        else {

            let obj = { city: value, err }
            this.props.reduxCity(obj);
        }
        return;
    }
    getValue() {
        if (this.props.city.hasOwnProperty("city")) {
            return this.props.city.city;
        }
    }
    render() {

        return (<div className="register-field">
       City
       <br/>
       <input type="text" name="city"
       onChange={event => this.handleChange(event.target.value)} 
       value={this.getValue()}
       className="project-field"/>
       </div>)
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        city: state.city

    }
}


export default connect(mapStateToProps, actions)(City)
