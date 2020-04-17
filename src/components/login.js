import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginNowIcon } from './svg';
import * as actions from './actions';
import './login.css';
import Profile from './profile';
import PM from './pm'
import { MyStylesheet } from './styles';
import ClientID from './clientid';
import EmailAddress from './emailaddress';
import Password from './password';



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
            phonenumber: '',
            password: '',
            width: '',
            height: '',
            login: true,
            register: false
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.props.reduxNavigation({ navigation: "login" })
        this.updateWindowDimensions();
    }


    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
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




    render() {
        let pm = new PM();
        let myuser = pm.getuser.call(this);
        const styles = MyStylesheet();
        const clientid = new ClientID();
        const emailaddress = new EmailAddress();
        const password = new Password();
        const headerFont = pm.getHeaderFont.call(this);
        const regularFont = pm.getRegularFont.call(this);
        const showpassword = () => {
            if (!this.state.client && !this.state.clientid) {
                return (password.showpassword.call(this))
            } else {
                return (<span>&nbsp;</span>)
            }
        }
        const loginNow = () => {

            const pm = new PM();
            const styles = MyStylesheet();
            const projectIcon = pm.getsaveprojecticon.call(this)
            if (this.state.client && this.state.clientid && this.state.emailaddress) {
                return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1, ...styles.generalFont, ...styles.alignCenter }}>
                        <button style={{ ...styles.generalButton, ...projectIcon }} onClick={() => { pm.clientlogin.call(this) }}>
                            {loginNowIcon()}
                        </button>
                    </div>
                </div>)
            } else if (this.state.emailaddress && this.state.password) {
                return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1, ...styles.generalFont, ...styles.alignCenter }}>
                        <button style={{ ...styles.generalButton, ...projectIcon }} onClick={() => { pm.clientlogin.call(this) }}>
                            {loginNowIcon()}
                        </button>
                    </div>
                </div>)
            } else {
                return (<span>&nbsp;</span>)
            }
        }

        const Login = () => {

            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...styles.alignCenter, ...headerFont }}>
                                Login
                    </div>
                        </div>

                        {clientid.showclientid.call(this)}

                        {emailaddress.showemailaddress.call(this)}

                        {showpassword()}

                        {loginNow()}


                        <div style={{ ...styles.generalFlex,...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1, ...styles.alignCenter, ...regularFont }}>
                                {this.state.message}
                            </div>
                        </div>

                    </div>
                </div>
            )
        }
        if (myuser) {
            return (<Profile />)
        } else {
            return (Login())
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

export default connect(mapStateToProps, actions)(Login);
