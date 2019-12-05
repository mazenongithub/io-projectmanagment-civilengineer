import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GoogleSigninIcon, EmailLoginSVG, AppleSigninIcon } from './svg';
import * as actions from './actions';
import './login.css';
import firebase from 'firebase'

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

    }

    async googleSignIn() {
        let provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('email');
        provider.addScope('profile');
        try {
            let result = await firebase.auth().signInWithPopup(provider)

            // The signed-in user info.
            var user = result.user;

            let emailaddress = user.providerData[0].email;
            let firstname = user.providerData[0].displayName.split(' ')[0]
            let lastname = user.providerData[0].displayName.split(' ')[1]
            let phonenumber = user.providerData[0].phoneNumber
            let profileurl = user.providerData[0].photoURL;
            let client = 'google';
            let clientid = user.providerData[0].uid;
            this.setState({ clientid, client, firstname, lastname, emailaddress, phonenumber, profileurl })
            let loginform = document.getElementById("loginform")
            loginform.submit();

            // You can also get the Apple OAuth Access and ID Tokens.
            var accessToken = result.credential.accessToken;
            var idToken = result.credential.idToken;
            console.log({ accessToken, idToken })

            // ...
        } catch (error) {
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
        }
    }
    async appleSignIn() {
        let provider = new firebase.auth.OAuthProvider('apple.com');
        provider.addScope('email');
        provider.addScope('name');
        try {
            let result = await firebase.auth().signInWithPopup(provider)

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
            this.setState({ clientid, client, firstname, lastname, emailaddress, phonenumber, profileurl })
            let loginform = document.getElementById("loginform")
            loginform.submit();


            // ...
        } catch (error) {
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
        };


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

    getLoginMessage() {
        let message;
        if (this.props.hasOwnProperty("match")) {
            if (this.props.match.hasOwnProperty("params")) {
                message = this.props.match.params.message;
            }
        }
        return message;
    }
    render() {

        let formpostURL = `${process.env.REACT_APP_SERVER_API}/projectmanagement/loginuser`;

        return (
            <div className="general-flex">
                <div className="flex-1 general-container">

                    <div className="general-flex">
                        <div className="flex-1 general-container">
                            <div className="flex-1 general-container login-aligncenter titleFont">
                                Login
            </div>
                        </div>
                    </div>

                    <div className="general-flex">
                        <div className="flex-1 general-container">

                            <div className="flex-1 general-container login-aligncenter titleFont">
                                <button className="btnclientlogin general-button" onClick={() => { this.googleSignIn() }}>
                                    {GoogleSigninIcon()}
                                </button>
                            </div>

                        </div>
                    </div>

                    <div className="general-flex">
                        <div className="flex-1 general-container">
                            <div className="flex-1 general-container login-aligncenter titleFont">
                                <button className="btnclientlogin general-button" onClick={() => { this.appleSignIn() }}>
                                    {AppleSigninIcon()}
                                </button>
                            </div>
                        </div>
                    </div>

                    <form action={formpostURL} method="post">
                        <div className="general-flex">
                            <div className="flex-1 general-container login-aligncenter regularFont">
                                Email
                    </div>
                            <div className="flex-2 general-container login-aligncenter regularFont">
                                <input type="text" name="emailaddress" className="general-field" />
                            </div>
                        </div>

                        <div className="general-flex">
                            <div className="flex-1 general-container login-aligncenter regularFont">
                                Password
                    </div>
                            <div className="flex-2 general-container login-aligncenter titleFont">
                                <input type="password" name="pass" className="general-field" />
                            </div>
                        </div>
                        <div className="general-flex">
                            <div className="flex-1 general-container login-aligncenter titleFont">
                                <button className="btnclientlogin general-button">
                                    {EmailLoginSVG()}
                                </button>
                            </div>
                        </div>
                        <div className="general-flex">
                            <div className="flex-1 general-container login-aligncenter regularFont errorFont">
                                {this.getLoginMessage()}
                            </div>
                        </div>
                    </form>

                    <form id="loginform" action={`${process.env.REACT_APP_SERVER_API}/projectmanagement/webclient/loginuser`} method="post">
                        <input type="hidden" value={this.state.clientid} name="clientid" />
                        <input type="hidden" value={this.state.client} name="client" />
                        <input type="hidden" value={this.state.firstname} name="firstname" />
                        <input type="hidden" value={this.state.lastname} name="lastname" />
                        <input type="hidden" value={this.state.emailaddress} name="emailaddress" />
                        <input type="hidden" value={this.state.phonenumber} name="phonenumber" />
                        <input type="hidden" value={this.state.profileurl} name="profileurl" />

                    </form>

                </div>
            </div>)
    }
}

function mapStateToProps(state) {
    return {
        emailaddress: state.emailaddress,
        password: state.password,
        myusermodel: state.myusermodel
    }
}
export default connect(mapStateToProps, actions)(Login)
