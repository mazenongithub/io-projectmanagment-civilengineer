import React from 'react'
import PM from './pm';
import { MyStylesheet } from './styles'
import { plusIcon, minusIcon, updatePasswordIcon } from './svg';
import {validatePassword,inputUTCStringForLaborID} from './functions';
import {UpdateUserPassword} from './actions/api';

class UpdatePassword {
    async updateuserpassword() {
        const pm = new PM();
        const myuser = pm.getuser.call(this)
        const providerid = myuser.providerid;
        const password = this.state.password;
        const values = {providerid,password}
        try {
            let response = await UpdateUserPassword(values);
            console.log(response)
            let message = '';
            if(response.hasOwnProperty("message")) {
                message+=response.message;
            }
            message+= inputUTCStringForLaborID(response.lastupdated);
            this.setState({message})
        } catch(err) {
            alert(err)
        }
    }

    handlepassword(text) {
        let validate = validatePassword(text);
        if (!validate.validate) {

            this.setState({ passwordcheck: false, password: text, message: validate.message })
        } else {
            this.setState({ password: text, message: "", passwordcheck: true })
        }

    }

    showupdatepassword() {
        const styles = MyStylesheet();
        const pm = new PM();
        const plusicon = pm.getplusicon.call(this);
        const minusicon = pm.getminusicon.call(this);
        const regularFont = pm.getRegularFont.call(this);
        const updatepasswordicon = pm.getupdatepassword.call(this);
        const updatepassword = new UpdatePassword();
        const savepassword = () => {
            if(this.state.showpassword && this.state.password && this.state.passwordcheck) {
                return( <div style={{ ...styles.generalFlex,...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                       <button style={{...styles.generalButton,...updatepasswordicon}} onClick={()=>{updatepassword.updateuserpassword.call(this)}}>{updatePasswordIcon()}</button>
                    </div>
                </div>)
            } else {
                return(<span>&nbsp;</span>)
            }
        }
        const password = () => {
            if(this.state.showpassword) {
                return( <div style={{ ...styles.generalFlex,...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1 }}>
                        <input type="password" value={this.state.password} 
                        onChange={event=>{updatepassword.handlepassword.call(this,event.target.value)}} 
                        style={{...styles.generalField,...styles.generalFont, ...regularFont}} />
                    </div>
                </div>)
            } else {
                return(<span>&nbsp;</span>)
            }
        }
        const buttonIcon = () => {
            if (this.state.showpassword) {
                return (<button style={{ ...styles.generalButton, ...minusicon }} onClick={()=>{this.setState({showpassword:false})}}>{minusIcon()}</button>)
            } else {
                return (<button style={{ ...styles.generalButton, ...plusicon }} onClick={()=>{this.setState({showpassword:true})}}>{plusIcon()}</button>)
            }
        }
        return (
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex,...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1 }}>
                            {buttonIcon()} <span style={{ ...styles.generalFont, ...regularFont }}> Update Password</span>
                        </div>
                    </div>

                   {password()}

                   {savepassword()}

                </div>
            </div>
        )
    }

}
export default UpdatePassword;