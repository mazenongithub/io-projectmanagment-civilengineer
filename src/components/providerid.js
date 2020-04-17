import React from 'react';
import { MyStylesheet } from './styles';
import PM from './pm';
import { purpleCheck } from './svg';
import { validateProviderID } from './functions'
import { CheckProfile } from './actions/api'

class ProviderID {
    handleprofile(profile) {
        profile = profile.toLowerCase();
        const errmsg = validateProviderID(profile);
        if (errmsg) {
            this.setState({ profile, profilecheck: false, message: errmsg })
        } else {
            this.setState({ profile, profilecheck: true, message: "" })
        }
    }

    async verifyProfile() {
        console.log("VERIFY PROFILE", this.state.profile)
        if (this.state.profilecheck) {
            let profile = this.state.profile;
            try {
                let response = await CheckProfile(profile)
                console.log(response)
                if (response.hasOwnProperty("valid")) {
                    this.setState({ profilecheck: true });
                }
                else {
                    this.setState({ profilecheck: false, message: response.message });
                }

            } catch (err) {

                alert(err)
            }

        }


    }

    showproviderid() {
        const styles = MyStylesheet();
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this);
        const goIcon = pm.getGoIcon.call(this);
        const providerid = new ProviderID();
        const goCheck = () => {
            if (this.state.profile && this.state.profilecheck) {
                return (<button style={{ ...styles.generalButton, ...goIcon }}>{purpleCheck()}</button>)
            } else {
                return (<span>&nbsp;</span>)
            }
        }

        if (this.state.width > 800) {
            return (
                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex2, ...styles.generalFont, ...regularFont }}>
                        Create A ProviderID
                    </div>
                    <div style={{ ...styles.flex3 }}>
                        <input type="text"
                            value={this.state.profile}
                            onBlur={() => { providerid.verifyProfile.call(this) }}
                            onChange={event => { providerid.handleprofile.call(this, event.target.value) }}
                            style={{ ...styles.generalFont, ...styles.generalField, ...regularFont }} />
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
                                Create A ProviderID
                            </div>
                        </div>
                        <div style={{ ...styles.generalFlex }}>

                            <div style={{ ...styles.flex2 }}>
                                <input type="text" style={{ ...styles.generalFont, ...styles.generalField, ...regularFont }}
                                    value={this.state.profile}
                                    onBlur={() => { providerid.verifyProfile.call(this) }}
                                    onChange={event => { providerid.handleprofile.call(this, event.target.value) }} />
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
export default ProviderID;