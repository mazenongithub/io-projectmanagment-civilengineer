import React from 'react';
import './register.css';
import './svg/svg.css';
import 'firebase/auth';
import Profile from './profile';
import ProviderID from './providerid';
import ClientID from './clientid';
import PM from './pm';
//import Profile from './profile';
import { MyStylesheet } from './styles'
class Register {


    showRegister() {
        const pm = new PM();
        const styles = MyStylesheet();
        const headerFont = pm.getHeaderFont.call(this);
        const regularFont = pm.getRegularFont.call(this);
        const clientid = new ClientID();
        const providerid = new ProviderID();
        const profile = new Profile();

        const showclientid = () => {

            if(this.state.profilecheck && this.state.profile) {
                return(clientid.showclientid.call(this, 'register'))
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

                   
                    {providerid.showproviderid.call(this)}

                    {showclientid()}
              

                    <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.alignCenter }}>
                        {this.state.message}
                    </div>

                </div>
            </div>)
        }
        const myuser = pm.getuser.call(this)
        if (myuser) {
            return (profile.showProfile.call(this))
        } else {
            return (Register())
        }


    }
}


export default Register;
