import React, { Component } from 'react';
import './register.css';
import './svg/svg.css';
import * as actions from './actions';
import { purpleCheck, RegisterNowIcon, GoogleSigninIcon, AppleSigninIcon } from './svg'
import { connect } from 'react-redux';
import { validateProviderID, validateEmail, returnCompanyList, validatePassword } from './functions';
import firebase from 'firebase/app';
import { RegisterUser } from './actions/api';
import 'firebase/auth';
import Profile from './profile';

import PM from './pm';
//import Profile from './profile';
import { MyStylesheet } from './styles'
class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            provideridcheck: true,
            client: '',
            clientid: '',
            firstname: '',
            lastname: '',
            emailaddress: '',
            profileurl: '',
            phonenumber: '',
            emailcheck: true,
            providerid: '',
            pass: '',
            passwordcheck: false
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        this.props.reduxNavigation({ navigation: "register" })
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }
    handleproviderid(providerid) {
        this.setState({ providerid })
        const errmsg = validateProviderID(providerid);
        if (errmsg) {
            this.setState({ provideridcheck: false, message: errmsg })
        } else {
            this.setState({ provideridcheck: true, message: "" })
        }
    }
    showcreateprovider() {
        const styles = MyStylesheet();
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this);
        const goIcon = pm.getGoIcon.call(this)
        const showButton = () => {
            if (this.state.providerid && this.state.provideridcheck) {
                return (<button style={{ ...styles.generalButton, ...goIcon }}>{purpleCheck()}</button>)
            } else {
                return;
            }
        }
        const content = () => {
            if (this.state.width > 800) {
                return (

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex2, ...styles.generalFont, ...regularFont }}>
                            Create A Provider ID
                         </div>
                        <div style={{ ...styles.flex3 }}>
                            <input type="text" style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }}
                                value={this.state.providerid}
                                onChange={event => { this.handleproviderid(event.target.value) }}
                                onBlur={event => { pm.checkproviderid.call(this, event.target.value) }}
                            />
                        </div>
                        <div style={{ ...styles.flex1 }}>
                            {showButton()}
                        </div>
                    </div>)

            } else {

                return (

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>

                            <div style={{ ...styles.generalFlex }}>
                                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                    Create A Provider ID
                                </div>
                            </div>

                            <div style={{ ...styles.generalFlex }}>
                                <div style={{ ...styles.flex2 }}>
                                    <input type="text" style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }}
                                        value={this.state.providerid}
                                        onChange={event => { this.setState({ providerid: event.target.value }) }}
                                        onBlur={event => { pm.checkproviderid.call(this, event.target.value) }}
                                    />
                                </div>
                                <div style={{ ...styles.flex1 }}>
                                    {showButton()}
                                </div>
                            </div>

                        </div>
                    </div>)

            }

        }

        const ProviderMessage = () => {

            if (this.state.providerid && this.state.provideridcheck) {
                return (<div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
                    Your profile will be hosted at {process.env.REACT_APP_CLIENT_API}/{this.state.providerid}
                </div>)
            }

        }

        return (
            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1 }}>


                    {content()}
                    {ProviderMessage()}




                </div>
            </div>
        )

    }
    handleemailaddress(emailaddress) {
        this.setState({ emailaddress })
        let errmsg = validateEmail(emailaddress)
        if (errmsg) {
            this.setState({ emailcheck: false, message: errmsg })
        } else {
            this.setState({ emailcheck: true, message: "" })
        }

    }

    showemailaddress() {
        const styles = MyStylesheet();
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this);
        const goIcon = pm.getGoIcon.call(this)

        const showButton = () => {
            if (this.state.emailaddress && this.state.emailcheck) {
                return (<button style={{ ...styles.generalButton, ...goIcon }}>{purpleCheck()}</button>)
            } else {
                return;
            }
        }

        if (this.state.width > 800) {
            return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex2, ...styles.generalFont, ...regularFont }}>
                    Email Address
                </div>
                <div style={{ ...styles.flex3 }}>
                    <input type="text" style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }}
                        value={this.state.emailaddress}
                        onChange={event => { this.handleemailaddress(event.target.value) }}
                        onBlur={event => { pm.checkemailaddress.call(this, event.target.value) }}
                    />
                </div>
                <div style={{ ...styles.flex1 }}>
                    {showButton()}
                </div>
            </div>)
        } else {
            return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                            Email Address
                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex2 }}>
                            <input type="text" style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }}
                                value={this.state.emailaddress}
                                onChange={event => { this.handleemailaddress(event.target.value) }}
                                onBlur={event => { pm.checkemailaddress.call(this, event.target.value) }}
                            />
                        </div>
                        <div style={{ ...styles.flex1 }}>
                            {showButton()}
                        </div>
                    </div>

                </div>
            </div>)
        }
    }

    handlepassword(pass) {
        this.setState({ pass })
        let errmsg = validatePassword(pass);

        if (!errmsg) {
            this.setState({ passwordcheck: true, message: '' })
        } else {
            this.setState({ passwordcheck: false, message: errmsg })
        }
    }
    showpassword() {
        const styles = MyStylesheet();
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this);
        const goIcon = pm.getGoIcon.call(this)

        const showButton = () => {
            if (this.state.pass && this.state.passwordcheck) {
                return (<button style={{ ...styles.generalButton, ...goIcon }}>{purpleCheck()}</button>)
            } else {
                return;
            }
        }
        if (this.state.emailaddress || (this.state.clientid && this.state.client)) {
            if (this.state.width > 800) {
                return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex2, ...styles.generalFont, ...regularFont }}>
                        Password
                </div>
                    <div style={{ ...styles.flex3 }}>
                        <input type="password" style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }}
                            value={this.state.pass}
                            onChange={event => { this.handlepassword(event.target.value) }}

                        />
                    </div>
                    <div style={{ ...styles.flex1 }}>
                        {showButton()}
                    </div>
                </div>)
            } else {
                return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                Password
                        </div>
                        </div>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex2 }}>
                                <input type="Password" style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }}
                                    value={this.state.pass}
                                    onChange={event => { this.handlepassword(event.target.value) }}

                                />
                            </div>
                            <div style={{ ...styles.flex1 }}>
                                {showButton()}
                            </div>
                        </div>

                    </div>
                </div>)
            }
        } else {
            return;
        }
    }
    validateprovider() {

        let errmsg = false;

        if (!this.state.emailcheck) {
            errmsg += validateEmail(this.state.emailaddress)
            errmsg += this.state.message;
        }

        if (!this.state.provideridcheck) {
            errmsg += validateProviderID(this.state.providerid);
            errmsg += this.state.message;
        }

        if (!this.state.client || !this.state.clientid) {
            errmsg += `Missing Client ID`
        }

        if (!this.state.passwordcheck) {
            errmsg += validatePassword(this.state.pass);
        }

        return errmsg;
    }
    async registernewuser() {
        try {
            let client = this.state.client;
            let clientid = this.state.clientid;
            let firstname = this.state.firstname;
            let lastname = this.state.lastname;
            let emailaddress = this.state.emailaddress;
            let profileurl = this.state.profileurl;
            let phonenumber = this.state.phonumber;
            let providerid = this.state.providerid;
            let pass = this.state.pass;
            let values = { client, clientid, firstname, lastname, emailaddress, profileurl, phonenumber, providerid, pass }

            let response = await RegisterUser(values);
            console.log(response)
            if (response.hasOwnProperty("allusers")) {
                let companys = returnCompanyList(response.allusers);
                this.props.reduxAllCompanys(companys)
                this.props.reduxAllUsers(response.allusers);
                delete response.allusers;

            }
            if (response.hasOwnProperty("providerid")) {
                console.log(response)
                this.props.reduxUser(response)
            }
        } catch (err) {
            alert(err)
        }

    }
    showregisternow() {
        const pm = new PM();
        const styles = MyStylesheet();
        const registerIcon = pm.getsaveprojecticon.call(this);
        const validate = this.validateprovider();


        if (!validate) {
            return (<div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                <button style={{ ...styles.generalButton, ...registerIcon }} onClick={() => { this.registernewuser() }}>{RegisterNowIcon()}</button>
            </div>)
        } else {
            return;
        }
    }

    async googleSignIn() {


        try {


            let provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('email');
            provider.addScope('profile');
            let result = await firebase.auth().signInWithPopup(provider)
            var user = result.user;
            let client = 'google';
            let clientid = user.providerData[0].uid;
            let firstname = '';
            if (user.providerData[0].displayName) {
                firstname = user.providerData[0].displayName.split(' ')[0]
            }

            let lastname = '';
            if (user.providerData[0].displayName) {
                lastname = user.providerData[0].displayName.split(' ')[1]
            }
            let emailaddress = user.providerData[0].email;
            let profileurl = user.providerData[0].photoURL;
            let phonenumber = user.phoneNumber;
            this.setState({ client, clientid, firstname, lastname, emailaddress, profileurl, phonenumber })




        } catch (error) {
            alert(error)
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

            let client = 'apple';
            let clientid = user.providerData[0].uid;
            let firstname = '';
            if (user.providerData[0].displayName) {
                firstname = user.providerData[0].displayName.split(' ')[0]
            }

            let lastname = '';
            if (user.providerData[0].displayName) {
                lastname = user.providerData[0].displayName.split(' ')[1]
            }
            let emailaddress = user.providerData[0].email;
            let profileurl = user.providerData[0].photoURL;
            let phonenumber = user.phoneNumber;
            this.setState({ client, clientid, firstname, lastname, emailaddress, profileurl, phonenumber })



        } catch (error) {

            alert(error.message);

        }


    }

    signinIcons() {
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this)
        const styles = MyStylesheet();
        const buttonWidth = pm.getsaveprojecticon.call(this)
        const registerIcons = () => {
            if (this.state.width > 800) {
                return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                        Secure your Sign in
                </div>
                    <div style={{ ...styles.flex1 }}>
                        <button style={{ ...styles.generalButton, ...buttonWidth }} onClick={() => { this.googleSignIn() }}>{GoogleSigninIcon()}</button>
                    </div>
                    <div style={{ ...styles.flex1 }}>
                        <button style={{ ...styles.generalButton, ...buttonWidth }} onClick={() => { this.appleSignIn() }}>{AppleSigninIcon()}</button>
                    </div>
                </div>)
            } else {
                return (
                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1 }}>

                            <div style={{ ...styles.generalFlex }}>
                                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                    Secure your Sign in
                                </div>
                            </div>

                            <div style={{ ...styles.generalFlex }}>
                                <div style={{ ...styles.flex1 }}>
                                    <button style={{ ...styles.generalButton, ...buttonWidth }} onClick={() => { this.googleSignIn() }}>{GoogleSigninIcon()}</button>
                                </div>
                                <div style={{ ...styles.flex1 }}>
                                    <button style={{ ...styles.generalButton, ...buttonWidth }} onClick={() => { this.appleSignIn() }}>{AppleSigninIcon()}</button>
                                </div>
                            </div>
                        </div>
                    </div>)

            }
        }
        const confirmed = () => {
            return (<div style={{ ...styles.generalContainer, ...regularFont, ...styles.generalFont }}>
                Your Signin is secure with {this.state.client}
            </div>)
        }


        if (this.state.client && this.state.clientid) {
            return (confirmed())
        } else {
            return (registerIcons())
        }
    }
    render() {
        const pm = new PM();
        const styles = MyStylesheet();
        const headerFont = pm.getHeaderFont.call(this);
        const regularFont = pm.getRegularFont.call(this);
        const Register = () => {
            return (<div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...headerFont, ...styles.alignCenter }}>
                            Register
                        </div>
                    </div>

                    {this.signinIcons()}

                    {this.showcreateprovider()}

                    {this.showemailaddress()}

                    {this.showpassword()}

                    {this.showregisternow()}

                    <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.alignCenter }}>
                        {this.state.message}
                    </div>


                </div>
            </div>)
        }
        const myuser = pm.getuser.call(this)
        if (myuser) {
            return (<Profile />)
        } else {
            return (Register())
        }


    }
}
function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation,
        project: state.project,
        allusers: state.allusers,
        allcompanys: state.allcompanys
    }
}

export default connect(mapStateToProps, actions)(Register);
