import React, { Component } from 'react';
import './fields.css';
import * as actions from '../actions';
import { connect } from 'react-redux';
class Company extends Component {
    constructor(props) {
        super(props)
        this.state = {
            render:''
        }
    }
    componentDidMount() {
        if (this.props.myusermodel.hasOwnProperty("company")) {
            this.handleChange(this.props.myusermodel.company);
        }
        else {
            this.handleChange("");
            }
        }

        handleChange(value) {

            console.log(value)
            let err = 0;
            if (value.length > 80) {
                err += 1;
                
                let obj = { company: value, err }
                this.props.reduxCompany(obj);
            }
            else {
              
                let obj = { company: value, err }
                this.props.reduxCompany(obj);
            }
            return;
        }
 getValue() {
     if(this.props.company.hasOwnProperty("company")) {
         return this.props.company.company; 
     }
 }
        render() {
       
            return (<div className="register-field">
       Company
       <br/>
       <input type="text" name="company"
       onChange={event => this.handleChange(event.target.value)} 
       value={this.getValue()}
       className="project-field"/>
       </div>)
        }
    }

    function mapStateToProps(state) {
        return {
            myusermodel: state.myusermodel,
            company:state.company

        }
    }
    export default connect(mapStateToProps, actions)(Company)
