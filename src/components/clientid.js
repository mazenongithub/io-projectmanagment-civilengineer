import React from 'react';
import { MyStylesheet } from './styles';
import PM from './pm';
import { GoogleSigninIcon, AppleSigninIcon } from './svg';
class ClientID {

    showclientid(type) {
        const styles = MyStylesheet();
        const pm = new PM();
        const loginButton = pm.getLoginButton.call(this);
        const regularFont = pm.getRegularFont.call(this)
        const signinmessage = () => {
            if (this.state.client && this.state.clientid) {
                return `Your Signin is secure with ${this.state.client}`
            } else {
                return `Secure your Sign in`
            }
        }

        const apple = () => {
            if(!this.state.client || !this.state.clientid) {
                return( <div style={{...styles.flex1}}>
                    <button style={{ ...styles.generalButton, ...loginButton }} onClick={() => { pm.appleSignIn.call(this, type) }}>
                        {AppleSigninIcon()}
                    </button>
                </div>
)
            }
        }
        const google = () => {
            if(!this.state.client || !this.state.clientid) {
                return( <div style={{...styles.flex1}}>
                    <button style={{ ...styles.generalButton, ...loginButton }} onClick={() => { pm.googleSignIn.call(this, type) }}>
                        {GoogleSigninIcon()}
                    </button>
                </div>)
            }
        }

        return (
            <div style={{ ...styles.generalFlex,...styles.bottomMargin15 }}>
                <div style={{...styles.flex1}}>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1,...styles.generalFont,...regularFont }}>
                            {signinmessage()}
                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>

                           {apple()}
                        </div>
                        <div style={{ ...styles.flex1 }}>
                           
                          {google()}
                       
                        </div>
                    </div>

                </div>



            </div>)
    }

}
export default ClientID;