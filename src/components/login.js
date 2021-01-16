import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import './login.css';
import Profile from './profile';
import PM from './pm'
import { MyStylesheet } from './styles';
import ClientID from './clientid';


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
            register: false,
            spinner:false
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
     
        const headerFont = pm.getHeaderFont.call(this);
        const regularFont = pm.getRegularFont.call(this);


        const Login = () => {

            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...styles.alignCenter, ...headerFont }}>
                                Login
                    </div>
                        </div>

                        {clientid.showclientid.call(this, "login")}


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
