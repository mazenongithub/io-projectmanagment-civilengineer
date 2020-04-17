import React from 'react';
import { MyStylesheet } from './styles';
import PM from './pm';
import { GoogleSigninIcon, AppleSigninIcon } from './svg';
class ClientID {

    showclientid() {
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
        if (this.state.width > 800) {

            return (
                <div style={{ ...styles.generalFlex,...styles.bottomMargin15 }}>

                    <div style={{...styles.flex1, ...regularFont, ...styles.generalFont}}>
                        {signinmessage()}
                    </div>

                    <div style={{...styles.flex1}}>
                        <button style={{ ...styles.generalButton, ...loginButton }} onClick={() => { pm.googleSignIn.call(this) }}>
                            {GoogleSigninIcon()}
                        </button>
                    </div>

                    <div style={{...styles.flex1}}>
                        <button style={{ ...styles.generalButton, ...loginButton }} onClick={() => { pm.appleSignIn.call(this) }}>
                            {AppleSigninIcon()}
                        </button>
                    </div>

                </div>)

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

                            <button style={{ ...styles.generalButton, ...loginButton }} onClick={() => { pm.googleSignIn.call(this) }}>
                                {GoogleSigninIcon()}
                            </button>
                        </div>
                        <div style={{ ...styles.flex1 }}>
                            <button style={{ ...styles.generalButton, ...loginButton }} onClick={() => { pm.appleSignIn.call(this) }}>
                                {AppleSigninIcon()}
                            </button>
                        </div>
                    </div>

                </div>



            </div>)
    }

}
export default ClientID;