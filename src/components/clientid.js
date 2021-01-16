import React from 'react';
import { MyStylesheet } from './styles';
import PM from './pm';
import { GoogleSigninIcon, AppleSigninIcon } from './svg';
import Spinner from './spinner'
class ClientID {

    showclientid(type) {
        const styles = MyStylesheet();
        const pm = new PM();

        const regularFont = pm.getRegularFont.call(this)
        const applewidth = () => {
            if (this.state.width > 1200) {
                return ({ width: '436px' })

            } else if (this.state.width > 600) {

                return ({ width: '351px' })

            } else {
                return ({ width: '296px' })

            }
        }
        const googlewidth = () => {
            if (this.state.width > 1200) {
                return ({ width: '469px' })

            } else if (this.state.width > 600) {

                return ({ width: '351px' })

            } else {
                return ({ width: '296px' })

            }
        }
        const signinmessage = () => {
            if (this.state.client && this.state.clientid) {
                return `Your Client is ${this.state.client}`
            } else {
                return `Choose Your Client`
            }
        }

        const apple = () => {
            if (!this.state.client || !this.state.clientid) {
                return (
                    <button style={{ ...styles.generalButton, ...applewidth() }} onClick={() => { pm.appleSignIn.call(this, type) }}>
                        {AppleSigninIcon()}
                    </button>
                )
            }
        }
        const google = () => {
            if (!this.state.client || !this.state.clientid) {
                return (
                    <button style={{ ...styles.generalButton, ...googlewidth() }} onClick={() => { pm.googleSignIn.call(this, type) }}>
                        {GoogleSigninIcon()}
                    </button>
                )
            }
        }

        const layout = () => {
            if (this.state.width > 1200) {
                return (<div style={{ ...styles.generalFlex,...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1, ...styles.alignCenter }}>

                        {apple()}
                    </div>
                    <div style={{ ...styles.flex1, ...styles.alignCenter }}>

                        {google()}

                    </div>
                </div>)
            } else {
                return (
                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>
                            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                                    {apple()}
                                </div>
                            </div>
                            <div style={{ ...styles.generalFlex,...styles.bottomMargin15 }}>
                                <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                                    {google()}
                                </div>
                            </div>
                        </div>
                    </div>

                )
            }
        }

        if(!this.state.spinner) {

        return (
            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                            {signinmessage()}
                        </div>
                    </div>

                    {layout()}

                </div>



            </div>)

        } else {
            return <Spinner/>
        }
    }

}
export default ClientID;