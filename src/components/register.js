import React, { Component } from 'react';
import './register.css';
import './svg/svg.css';
import * as actions from './actions';
import {RegisterNowIcon } from './svg'
import { connect } from 'react-redux';
import 'firebase/auth';
import Profile from './profile';
import ProviderID from './providerid';
import EmailAddress from './emailaddress';
import ClientID from './clientid';
import PM from './pm';
//import Profile from './profile';
import { MyStylesheet } from './styles'
class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profilecheck: false,
            client: '',
            clientid: '',
            firstname: '',
            lastname: '',
            emailaddress: '',
            profileurl: '',
            phonenumber: '',
            emailaddresscheck: false,
            profile: '',
            password: '',
            passwordcheck: false,
            register:true,
            login:false
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

    render() {
        const pm = new PM();
        const styles = MyStylesheet();
        const headerFont = pm.getHeaderFont.call(this);
        const regularFont = pm.getRegularFont.call(this);
        const registerIcon =pm.getsaveprojecticon.call(this);
        const clientid = new ClientID();
        const providerid = new ProviderID();
        const emailaddress = new EmailAddress();
    
        const RegisterNow = () => {
            if(this.state.clientid && this.state.client && this.state.profile && this.state.profilecheck && this.state.emailaddress && this.state.emailaddresscheck) {
                return (<div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                    <button style={{ ...styles.generalButton, ...registerIcon }} onClick={() => { pm.clientlogin.call(this) }}>{RegisterNowIcon()}</button>
                </div>)
            } else if(this.state.profile && this.state.profilecheck && this.state.emailaddress && this.state.emailaddresscheck && this.state.password && this.state.passwordcheck) {
                return (<div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                    <button style={{ ...styles.generalButton, ...registerIcon }} onClick={() => { pm.clientlogin.call(this)  }}>{RegisterNowIcon()}</button>
                </div>) 
            } else {
                return(<span>&nbsp;</span>)
            }
        }
    
        const Register = () => {
            return (<div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...headerFont, ...styles.alignCenter }}>
                            Register
                        </div>
                    </div>

                    {clientid.showclientid.call(this)}
                    {providerid.showproviderid.call(this)}
                    {emailaddress.showemailaddress.call(this)}
           
                    {RegisterNow()}

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
