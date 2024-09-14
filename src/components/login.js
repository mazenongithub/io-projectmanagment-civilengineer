import React from 'react';
import './login.css';
import Profile from './profile';
import PM from './pm'
import { MyStylesheet } from './styles';
import ClientID from './clientid';


class Login  {

   



    showLogin() {
        let pm = new PM();
        let myuser = pm.getuser.call(this);
        const styles = MyStylesheet();
        const clientid = new ClientID();
        const headerFont = pm.getHeaderFont.call(this);
        const regularFont = pm.getRegularFont.call(this);
        const profile = new Profile();
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
        if (myuser.hasOwnProperty("User_ID")) {
            return (profile.showProfile.call(this))
        } else {
            return (Login())
        }



    }
}



export default Login;
