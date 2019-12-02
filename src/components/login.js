import React, { Component } from 'react';
import EmailLogin from './form/emaillogin';
import LoginPassword from './form/loginpassword';
import { connect } from 'react-redux';
import { GoogleLogin, EmailLoginSVG, AppleSigninIcon } from './svg';
import * as actions from './actions';
import './login.css';
import firebase from 'firebase'
import { firebaseconfig } from './firebase'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            windowWidth: 0,
            client: '',
            clientid: '',
            firstname: '',
            lastname: '',
            emailaddress: '',
            profileurl: '',
            phonenumber: ''
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
        this.initializeFirebase()
    }
    initializeFirebase() {
        const configs = firebaseconfig()
        firebase.initializeApp(configs);

    }
    googleSignIn() {
        let provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('email');
        provider.addScope('profile');
        firebase
            .auth()
            .signInWithPopup(provider)
            .then(function (result) {
                // The signed-in user info.
                var user = result.user;

                let emailaddress = user.providerData[0].email;
                let firstname = user.providerData[0].displayName.split(' ')[0]
                let lastname = user.providerData[0].displayName.split(' ')[1]
                let phonenumber = user.providerData[0].phoneNumber
                let profileurl = user.providerData[0].photoURL;
                let client = 'google';
                let clientid = user.providerData[0].uid;
                document.getElementById("form-clientid").value = clientid;
                document.getElementById("form-client").value = client;
                document.getElementById("form-firstname").value = firstname;
                document.getElementById("form-lastname").value = lastname;
                document.getElementById("form-emailaddress").value = emailaddress;
                document.getElementById("form-phonenumber").value = phonenumber;
                document.getElementById("form-profileurl").value = profileurl;

                let loginform = document.getElementById("loginform")
                loginform.submit();
                // You can also get the Apple OAuth Access and ID Tokens.
                var accessToken = result.credential.accessToken;
                var idToken = result.credential.idToken;
                console.log({ accessToken, idToken })

                // ...
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                console.log(errorCode)
                var errorMessage = error.message;
                console.log(errorMessage)
                // The email of the user's account used.
                var email = error.email;
                console.log(email)
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                console.log(credential)

                // ...
            });
    }
    appleSignIn() {
        let provider = new firebase.auth.OAuthProvider('apple.com');
        provider.addScope('email');
        provider.addScope('name');
        firebase
            .auth()
            .signInWithPopup(provider)
            .then(function (result) {
                // The signed-in user info.
                var user = result.user;
                console.log(user)
                let emailaddress = user.providerData[0].email;
                let firstname = "";
                let lastname = "";
                if (user.providerData[0].displayName) {
                    firstname = user.providerData[0].displayName.split(' ')[0]
                    lastname = user.providerData[0].displayName.split(' ')[1]
                } else {
                    firstname = "";
                    lastname = "";
                }
                let phonenumber = user.providerData[0].phoneNumber
                let profileurl = user.providerData[0].photoURL;
                let client = 'apple';
                let clientid = user.providerData[0].uid;
                document.getElementById("form-clientid").value = clientid;
                document.getElementById("form-client").value = client;
                document.getElementById("form-firstname").value = firstname;
                document.getElementById("form-lastname").value = lastname;
                document.getElementById("form-emailaddress").value = emailaddress;
                document.getElementById("form-phonenumber").value = phonenumber;
                document.getElementById("form-profileurl").value = profileurl;

                let loginform = document.getElementById("loginform")
                loginform.submit();
                var accessToken = result.credential.accessToken;
                var idToken = result.credential.idToken;
                console.log({ accessToken, idToken })

                // ...
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                console.log(errorCode)
                var errorMessage = error.message;
                console.log(errorMessage)
                // The email of the user's account used.
                var email = error.email;
                console.log(email)
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                console.log(credential)

                // ...
            });


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

        let formpostURL = `${process.env.REACT_APP_SERVER_API}/projectmanagement/loginuser`;
        //const googleredirect = `${process.env.REACT_APP_SERVER_API}/projectmanagement/oauth20/google/login`;
        //const facebookredirect = `${process.env.REACT_APP_SERVER_API}/oauth20/facebook/login`
        //const linkedinredirect = `${process.env.REACT_APP_SERVER_API}/oauth20/linkedin/login`
        //const yahooredirect = `${process.env.REACT_APP_SERVER_API}/projectmanagement/oauth20/yahoo/login`;
        //const yahooscope = `https://api.login.yahoo.com/oauth2/request_auth?redirect_uri=${yahooredirect}&prompt=consent&response_type=code&client_id=${process.env.REACT_APP_YAHOOID}`
        //const googlescope = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${googleredirect}&prompt=consent&response_type=code&client_id=${process.env.REACT_APP_GOOGLEID}&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fplus.login+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fplus.login+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fplus.me+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fplus.login+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fplus.me+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fplus.me+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&access_type=offline`
        //const facebookscope = `https://www.facebook.com/dialog/oauth?client_id=${process.env.REACT_APP_FACEBOOK_APPID}&redirect_uri=${encodeURIComponent(facebookredirect)}`;
        //const linkedinscope = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.REACT_APP_LINKEDIN_CLIENTID}&redirect_uri=${encodeURIComponent(linkedinredirect)}&state=linkedin&scope=${encodeURIComponent("r_basicprofile r_emailaddress")}`
        return (
            <div>
                <form method="post" action={formpostURL} onSubmit={event => this.handleSubmit(event)}>
                    <div className="login-container">
                        <div className="login-titlerow">Login </div>
                        <div className="login-buttonrow">
                            <div className="btnlogin">

                                <button type="button" onClick={event => { this.appleSignIn(event) }} className="loginButton btntypical">
                                    {AppleSigninIcon()}
                                </button>

                            </div>
                        </div>
                        <div className="login-buttonrow">
                            <div className="btnlogin">
                                <button type="button" onClick={event => { this.googleSignIn(event) }} className="loginButton btntypical">
                                    {GoogleLogin()}
                                </button>
                            </div>
                        </div>
                        <div className="login-buttonrow">
                            <div className="btnlogin">
                                &nbsp;
            </div>
                        </div>
                        {this.showextrarow()}
                        <div className="invalid-logindisplay">{this.state.message} </div>
                        <EmailLogin />
                        <LoginPassword />
                        <div className="login-buttoncontainer">
                            <button id="btnemaillogin">{EmailLoginSVG()}
                            </button> </div>

                    </div>
                </form>

                <form id="loginform" action={`${process.env.REACT_APP_SERVER_API}/projectmanagement/webclient/loginuser`} method="post">
                    <input type="hidden" id='form-clientid' name="clientid" />
                    <input type="hidden" id='form-client' name="client" />
                    <input type="hidden" id='form-firstname' name="firstname" />
                    <input type="hidden" id='form-lastname' name="lastname" />
                    <input type="hidden" id='form-emailaddress' name="emailaddress" />
                    <input type="hidden" id='form-phonenumber' name="phonenumber" />
                    <input type="hidden" id='form-profileurl' name="profileurl" />

                </form>
            </div>)
    }
}

function mapStateToProps(state) {
    return {
        emailaddress: state.emailaddress,
        password: state.password
    }
}
export default connect(mapStateToProps, actions)(Login)
