import React, { Component } from 'react';
import '../login.css';
import * as actions from '../actions';
import { connect } from 'react-redux';
class LoginPassword extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '' }

    }
    componentDidMount() {
        this.handleChange("");
    }
    handleChange(value) {
    
        if (value.length < 6) {
            this.props.reduxpassword({ errmsg: " Password has a min of 6 char ", password: value });
         }
        else if (value.length > 32) {
        this.props.reduxpassword({ errmsg: " Password has a max of 32 char  ", password: value });
          
        }
        else {

              this.props.reduxpassword({ password: value });
        }
        return;
    }
    showloginpassword() {
        let myjsx = [];
        let element_1 = <div className="emaillogin-label">Password</div>
        myjsx.push(element_1);
        let element_2 = <div className="emaillogin-field">
    <input type="password"
    className="project-field"
    name="pass"
    onChange={event=>{this.handleChange(event.target.value)}}/></div>
        myjsx.push(element_2)
        return myjsx;
    }

    render() {
        return (this.showloginpassword())
    }
}

export default connect(null, actions)(LoginPassword);
