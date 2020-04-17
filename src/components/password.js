import React from 'react';
import { MyStylesheet } from './styles';
import PM from './pm';
import { purpleCheck } from './svg';
import { validatePassword } from './functions';

class Password {
    handlePassword(text) {
        let validate = validatePassword(text);
        if (!validate.validate) {

            this.setState({ passwordcheck: false, password: text, message: validate.message })
        } else {
            this.setState({ password: text, message: "", passwordcheck: true })
        }



    }

    showpassword() {
        const styles = MyStylesheet();
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this);
        const goIcon = pm.getGoIcon.call(this);
        const password = new Password();
        const goCheck = () => {
            if (this.state.password && this.state.passwordcheck) {
                return (<button style={{ ...styles.generalButton, ...goIcon }}>{purpleCheck()}</button>)
            } else {
                return (<span>&nbsp;</span>)
            }
        }

        if (this.state.width > 800) {
            return (
                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex2, ...styles.generalFont, ...regularFont }}>
                        Password
                    </div>
                    <div style={{ ...styles.flex3 }}>
                        <input type="password" style={{ ...styles.generalFont, ...styles.generalField, ...regularFont }}
                            onChange={event => { password.handlePassword.call(this, event.target.value) }}
                            value={this.state.password} />
                    </div>
                    <div style={{ ...styles.flex1 }}>
                        {goCheck()}
                    </div>

                </div>
            )

        } else {

            return (

                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                Password
                            </div>
                        </div>
                        <div style={{ ...styles.generalFlex }}>

                            <div style={{ ...styles.flex2 }}>
                                <input type="password" style={{ ...styles.generalFont, ...styles.generalField, ...regularFont }}
                                    onChange={event => { password.handlePassword.call(this, event.target.value) }}
                                    value={this.state.password}
                                />
                            </div>
                            <div style={{ ...styles.flex1 }}>
                                {goCheck()}
                            </div>
                        </div>
                    </div>

                </div>
            )

        }

    }


}
export default Password;