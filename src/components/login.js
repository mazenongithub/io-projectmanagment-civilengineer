import React, { Component } from 'react';
import EmailLogin from './form/emaillogin';
import LoginPassword from './form/loginpassword';
import { connect } from 'react-redux';
import { GoogleLogin, EmailLoginSVG, yahooIcon } from './svg';
import * as actions from './actions';
import './login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            windowWidth: 0
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    componentDidMount() {
     
        window.addEventListener('resize', this.updateWindowDimensions);
        this.props.reduxNavigation({ navigation: "login" })
        let windowwidth = window.innerWidth;
        let message = ""
        if (this.props.hasOwnProperty("match")) {
            if (this.props.match.hasOwnProperty("params")) {
                if (this.props.match.params.hasOwnProperty("message")) {


                    message = this.props.match.params.message




                }
            }
        }
        this.setState({ message, windowwidth })
    }
    updateWindowDimensions() {
        let windowwidth = window.innerWidth;
        this.setState({ windowwidth })
    }
    handleSubmit(event) {
        if (this.props.emailaddress.hasOwnProperty("errmsg") || this.props.password.hasOwnProperty("errmsg")) {
            event.preventDefault();
            let message = "";
            if (this.props.emailaddress.hasOwnProperty("errmsg")) {
                message += this.props.emailaddress.errmsg
            }
            if (this.props.password.hasOwnProperty("errmsg")) {
                message += ` ${this.props.password.errmsg}`
            }
            this.setState({ message })
        }
        return

    }
    showextrarow() {
        if (this.state.windowwidth > 720 && this.state.windowwidth < 1080) {

            return (<div className="login-buttonrow">
        &nbsp; </div>)
        }
    }
    showmessagerow() {

    }
    render() {

        let formpostURL = `${process.env.REACT_APP_SERVER_API}/api/loginuser`;
        const googleredirect = `${process.env.REACT_APP_SERVER_API}/oauth20/google/login`;
        //const facebookredirect = `${process.env.REACT_APP_SERVER_API}/oauth20/facebook/login`
        //const linkedinredirect = `${process.env.REACT_APP_SERVER_API}/oauth20/linkedin/login`
        const yahooredirect = `${process.env.REACT_APP_SERVER_API}/oauth20/yahoo/login`;
        const yahooscope = `https://api.login.yahoo.com/oauth2/request_auth?redirect_uri=${yahooredirect}&prompt=consent&response_type=code&client_id=${process.env.REACT_APP_YAHOOID}`
        const googlescope = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${googleredirect}&prompt=consent&response_type=code&client_id=${process.env.REACT_APP_GOOGLEID}&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fplus.login+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fplus.login+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fplus.me+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fplus.login+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fplus.me+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fplus.me+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&access_type=offline`
        //const facebookscope = `https://www.facebook.com/dialog/oauth?client_id=${process.env.REACT_APP_FACEBOOK_APPID}&redirect_uri=${encodeURIComponent(facebookredirect)}`;
        //const linkedinscope = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.REACT_APP_LINKEDIN_CLIENTID}&redirect_uri=${encodeURIComponent(linkedinredirect)}&state=linkedin&scope=${encodeURIComponent("r_basicprofile r_emailaddress")}`
        return (

            <form method="post" action={formpostURL} onSubmit={event => this.handleSubmit(event) }>    
        <div className="login-container">
        <div className="login-titlerow">Login </div>
        <div className="login-buttonrow">
            <div className="btnlogin">
                 <a href={yahooscope} className="dontunderlinelink">
                    {yahooIcon()}
                </a>
            </div>
        </div>
        <div className="login-buttonrow">
        <div className="btnlogin">
        <a href={googlescope} className="dontunderlinelink">
                    {GoogleLogin()}
                </a>
        </div>
        </div>
        <div className="login-buttonrow">
            <div className="btnlogin">
                &nbsp;
            </div>
        </div>
        {this.showextrarow()}
        <div className="invalid-logindisplay">{this.state.message} </div>
        <EmailLogin/>
        <LoginPassword/>
        <div className="login-buttoncontainer">
        <button id="btnemaillogin">{EmailLoginSVG()}
        </button> </div>
        </div>
        </form>)
    }
}

function mapStateToProps(state) {
    return {
        emailaddress: state.emailaddress,
        password: state.password
    }
}
export default connect(mapStateToProps, actions)(Login)
