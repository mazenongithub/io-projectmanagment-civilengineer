import React, { Component } from 'react';
import './fields.css';
import * as actions from '../actions';
import { connect } from 'react-redux';
class Password extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uniquename: 'pass',
            label: 'Password',
            errmsg: '',
            password: ''
        }
    }
    componentDidMount() {
        this.validatenamefield("");
    }
    validatenamefield(value) {

        if (value.length < 6) {

            this.props.reduxpassword({ errmsg: " Password has a min of 6 char ", password: value });

        }
        else if (value.length > 32) {

            this.props.reduxpassword({ errmsg: " Password has a max of 32 char  ", password: value });

        }
        else {

            this.props.reduxpassword({ password: value });
        }
        this.setState({ render: 'render' })
        return;
    }

    render() {
        const me = this.state;
        return (<div>            
       <div className="field-container">
       <div className="field-element">
       {me.label}
       </div>
       <div className="field-element">
       <input type="password" id={me.uniquename} name={me.uniquename} 
       onChange={event => this.validatenamefield(event.target.value)} value={this.props.password.password}/>
       </div>
       <div className="field-element">
       {this.props.password.errmsg}
       </div>
       </div> 
       </div>)
    }
}

function mapStateToProps(state) {
    return {
        password: state.password
    }
}
export default connect(mapStateToProps, actions)(Password);
