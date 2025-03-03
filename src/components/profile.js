import React from 'react';
import './profile.css';
import { folderIcon, scrollImageDown, purpleCheck, saveProfileIcon } from './svg'
import { MyStylesheet } from './styles'
import { UploadProfileImage, CheckEmailAddress } from './actions/api';
import { inputUTCStringForLaborID, validateProviderID, validateEmail } from './functions';
import Spinner from './spinner';
import Connecting from './connecting';
import PM from './pm'

class Profile {
  
    getHeaderFont() {
        const styles = MyStylesheet();
        if (this.state.width > 800) {
            return (styles.font40)
        }
        return (styles.font30)
    }

    getRegularFont() {
        const styles = MyStylesheet();
        if (this.state.width > 800) {
            return (styles.font30)
        }
        return (styles.font24)
    }
    getuser() {
        let user = false;
        if (this.props.myusermodel) {
            if (this.props.myusermodel.hasOwnProperty("providerid")) {
                user = this.props.myusermodel;
            }
        }
        return user;
    }
    getprofiledimensions() {
        if (this.state.width > 1200) {
            return (
                {
                    width: '392px',
                    height: '327px'
                })

        } else if (this.state.width > 800) {
            return (
                {
                    width: '285px',
                    height: '249px'
                })

        } else {
            return (
                {
                    width: '167px',
                    height: '145px'
                })
        }
    }
    getFolderSize() {
        if (this.state.width > 1200) {
            return (
                {
                    width: '142px',
                    height: '88px'
                })

        } else if (this.state.width > 800) {
            return (
                {
                    width: '93px',
                    height: '76px'
                })

        } else {
            return (
                {
                    width: '88px',
                    height: '61px'
                })
        }

    }
    getArrowHeight() {
        if (this.state.width > 800) {
            return (
                {
                    width: '55px',
                    height: '48px'
                })

        } else {
            return (
                {
                    width: '45px',
                    height: '34px'
                })
        }

    }
    getprofileurl() {
        const pm = new PM();
        const myuser = pm.getuser.call(this);
        return myuser.ProfileURL;


    }
    showprofileurl() {
        const styles = MyStylesheet();
        const pm = new PM();
        const regularFontHeight = pm.getRegularFont.call(this)
        const profile = new Profile()
        if (this.state.width > 800) {
            return (<div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFontHeight }}>
                    Profile URL <input type="text" style={{ ...styles.addLeftMargin, ...styles.regularFont, ...regularFontHeight, ...styles.generalField }}
                        value={profile.getprofileurl.call(this)}

                    />

                </div>

            </div>)

        } else {
            return (<div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFontHeight }}>
                    Profile URL <br /> <input type="text" style={{ ...styles.regularFont, ...regularFontHeight, ...styles.generalField }}
                        value={profile.getprofileurl.call(this)}
                    />
                </div>

            </div>)

        }
    }
    
  getfirstname() {
        const pm = new PM();
        let myuser = pm.getuser.call(this);
        return myuser.FirstName;
    }
    handlefirstname(firstname) {
        const pm = new PM();
        let myuser = pm.getuser.call(this);
        if (myuser) {
            myuser.FirstName = firstname;
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })
        }

    }
    getemailaddress() {
        const pm = new PM();
        let myuser = pm.getuser.call(this);
        return myuser.EmailAddress;
    }
    handleemailaddress(emailaddress) {
        const pm = new PM();
        let myuser = pm.getuser.call(this);
        const errmsg = validateEmail(emailaddress)
        
        if (myuser) {
            
            myuser.EmailAddress = emailaddress;
            if(errmsg) {
                myuser.invalidemail = emailaddress;
                this.props.reduxUser(myuser);
                this.setState({message:errmsg})
            } else {
                if(myuser.hasOwnProperty("invalidemail")) {
                    delete myuser.invalidemail;
                    this.props.reduxUser(myuser)
                    this.setState({message:''})
                }
            }
          
            this.setState({ render: 'render' })
        }

    }
    getlastname() {
        const pm = new PM();
        let myuser = pm.getuser.call(this);
        return myuser.LastName;
    }
    handlelastname(lastname) {
        const pm = new PM();
        let myuser = pm.getuser.call(this);
        if (myuser) {
            myuser.LastName = lastname;
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })
        }

    }
    getaddress() {
        const pm = new PM();
        let myuser = pm.getuser.call(this);
        return myuser.address;
    }
    handleaddress(address) {
        const pm = new PM();
        let myuser = pm.getuser.call(this);
        if (myuser) {
            myuser.address = address;
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })
        }

    }
    getcity() {
        const pm = new PM();
        let myuser = pm.getuser.call(this);
        return myuser.city;
    }
    handlecity(city) {
        const pm = new PM();
        let myuser = pm.getuser.call(this);
        if (myuser) {
            myuser.city = city;
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })
        }

    }
    getcontactstate() {
        const pm = new PM();
        let myuser = pm.getuser.call(this);
        return myuser.contactstate;
    }
    handlecontactstate(contactstate) {
        const pm = new PM();
        let myuser = pm.getuser.call(this);
        if (myuser) {
            myuser.contactstate = contactstate;
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })
        }

    }
    getzipcode() {
        const pm = new PM();
        let myuser = pm.getuser.call(this);
        return myuser.zipcode;
    }
    handlezipcode(zipcode) {
        const pm = new PM();
        let myuser = pm.getuser.call(this);
        if (myuser) {
            myuser.zipcode = zipcode;
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })
        }

    }
    getphonenumber() {
        const pm = new PM();
        let myuser = pm.getuser.call(this);
        return myuser.PhoneNumber;
    }
    handlephonenumber(phonenumber) {
        const pm = new PM();
        let myuser = pm.getuser.call(this);
        if (myuser) {
            myuser.PhoneNumber = phonenumber;
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })
        }

    }

    handleprofile(profile) {
        const pm = new PM();
        const validate = validateProviderID(profile);
        let myuser = pm.getuser.call(this);
        if (!validate) {

            if (myuser.hasOwnProperty("invalid")) {
                delete myuser.invalid;
            }
            if (myuser) {
                myuser.UserID = profile;
                this.props.reduxUser(myuser);
                this.setState({ message: '' })
            }

        } else {
            myuser.UserID = profile;
            myuser.invalid = validate;
            this.props.reduxUser(myuser);
            this.setState({ message: validate })

        }

    }

    getprofile() {
        const pm = new PM();
        let myuser = pm.getuser.call(this);
        return myuser.UserID;
    }
    async checkemailaddress() {
        const pm = new PM();
        const myuser = pm.getuser.call(this);
        const errmsg = validateEmail(myuser.EmailAddress);
       
        if (!errmsg) {
            const response = await CheckEmailAddress(myuser.EmailAddress)
            if (response.hasOwnProperty("invalid")) {
                myuser.invalidemail = `${response.invalid}`
                this.props.reduxUser(myuser)
                this.setState({ message: response.invalid })
            } else {
                delete myuser.invalidemail;
                this.props.reduxUser(myuser)
                this.setState({ render: 'render' })
            }




        } else {
            myuser.invalidemail = myuser.EmailAddress;
            this.props.reduxUser(myuser)
            this.setState({ render: 'render' })
        }

    }
    showlogininfo() {
        const pm = new PM();
        const styles = MyStylesheet();
        const regularFontHeight = pm.getRegularFont.call(this)
        const myuser = pm.getuser.call(this);
        const goIcon = pm.getGoIcon.call(this)
        const profile = new Profile();
        const emailicon = () => {
            if (!myuser.hasOwnProperty("invalidemail") && myuser.EmailAddress) {
            return (<button style={{ ...styles.generalButton, ...goIcon }}>{purpleCheck()}</button>)
            }
        }


        return (<div style={{ ...styles.generalFlex }}>
            <div style={{ ...styles.flex1 }}>


                <div style={{ ...styles.generalFlex, ...styles.addPadding }}>
                    <div style={{ ...styles.flex5, ...styles.addMargin }}>
                       <span style={{...styles.regularFont, ...regularFontHeight}}> Email</span> <br />
                        <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFontHeight }}
                            value={profile.getemailaddress.call(this)}
                            onChange={event => { profile.handleemailaddress.call(this,event.target.value) }}
                            onBlur={() => { profile.checkemailaddress.call(this) }}
                        />
                    </div>

                    <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFontHeight, ...styles.addMargin }}>
                        {emailicon()}
                    </div>
                </div>

            </div>
        </div>)

    }
    showadditional() {
        const styles = MyStylesheet();
        const pm = new PM();
        const regularFontHeight = pm.getRegularFont.call(this)
        const profile = new Profile();
        return (<div style={{ ...styles.generalFlex }}>
            <div style={{ ...styles.flex1 }}>

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFontHeight, ...styles.addMargin }}>
                        First Name <br />
                        <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFontHeight }}
                            value={profile.getfirstname.call(this)}
                            onChange={event => { profile.handlefirstname.call(this,event.target.value) }}
                        />
                    </div>
                    <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFontHeight, ...styles.addMargin }}>
                        Last Name <br />
                        <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFontHeight }}
                            value={profile.getlastname.call(this)}
                            onChange={event => { profile.handlelastname.call(this,event.target.value) }}
                        />
                    </div>
                </div>


                <div style={{ ...styles.generalFlex }}>

                    <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFontHeight, ...styles.addMargin }}>
                        Phone Number <br />
                        <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFontHeight }}
                            value={profile.getphonenumber.call(this)}
                            onChange={event => { profile.handlephonenumber.call(this,event.target.value) }}
                        />
                    </div>
                </div>

            </div>
        </div>)
    }
    showprofileimage() {
        const pm = new PM();
        const myuser = pm.getuser.call(this);
        const profileImage = pm.getprofiledimensions.call(this)
        if (myuser.ProfileURL) {
            return (<img src={myuser.ProfileURL} style={{ ...profileImage }} alt={`${myuser.FirstName} ${myuser.LastName}`} />)
        } else {
            return;
        }

    }
    async uploadprofileimage() {
        const pm = new PM();
        const myuser = pm.getuser.call(this);
        if (myuser) {
            const providerid = myuser.UserID;
            let formData = new FormData();
            let myfile = document.getElementById("profile-image");
            formData.append("profilephoto", myfile.files[0]);
            formData.append("myuser", JSON.stringify(myuser))
            try {
                let response = await UploadProfileImage(formData, providerid);
                console.log(response)
               
                if (response.hasOwnProperty("myuser")) {

                    this.props.reduxUser(response.myuser)
                }

                if (response.hasOwnProperty("message")) {
                    let lastupdated = inputUTCStringForLaborID(response.lastupdated)
                    this.setState({ message: `${response.message} Last updated ${lastupdated}` })
                }

            } catch (err) {
                alert(err)
            }
        }
    }




    showsaveprofile() {
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this);
        const saveprojecticon = pm.getsaveprojecticon.call(this);
        const styles = MyStylesheet();
        if (!this.state.spinner) {
            return (
                <div style={{ ...styles.generalContainer }}>
                    <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.generalFont, ...regularFont, ...styles.topMargin15, ...styles.bottomMargin15 }}>
                        {this.state.message}
                    </div>
    
                    <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                        <button style={{ ...styles.generalButton, ...saveprojecticon }} onClick={() => { pm.savemyprofile.call(this) }}>{saveProfileIcon()}</button>
                    </div>
                </div>)
    
        } else {
            return (<Connecting />)
        }
    }

    showProfile() {
        const pm = new PM();
        const styles = MyStylesheet();
        const headerFont = pm.getHeaderFont.call(this);
        const regularFont = pm.getRegularFont.call(this);
        const profileDimensions = pm.getprofiledimensions.call(this);
        const folderSize = pm.getFolderSize.call(this);
        const arrowHeight = pm.getArrowHeight.call(this);
        const goIcon = pm.getGoIcon.call(this);
        const myuser = pm.getuser.call(this)
        const profile = new Profile();

        const showButton = () => {

            if (!myuser.hasOwnProperty("invalid") && myuser.UserID) {
                return (<button style={{ ...styles.generalButton, ...goIcon }}>{purpleCheck()}</button>)
            } else {
                return;
            }
        }

        const showImage = () => {
            if(this.state.width>1200) {
                return( <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex2 }}>
                        <div style={{ ...styles.generalContainer, ...profileDimensions,  ...styles.marginAuto }}>
                            {profile.showprofileimage.call(this)}
                        </div>
                    </div>
                    <div style={{ ...styles.flex1,  ...styles.alignBottom, ...styles.margin10 }}>
                        <input type="file" id="profile-image" />
                        <button style={{ ...styles.generalButton, ...folderSize }} onClick={() => { profile.uploadprofileimage.call(this)}}>
                            {folderIcon()}
                        </button>
                    </div>
                </div>)
            } else {

                return( <div style={{ ...styles.generalContainer }}>
                    <div style={{ ...styles.generalContainer}}>

                        <div style={{ ...styles.generalContainer, ...profileDimensions, ...styles.showBorder, ...styles.marginAuto}}>
                            {profile.showprofileimage.call(this)}
                        </div>
                    </div>
                    <div style={{ ...styles.generalContainer, ...styles.showBorder, ...styles.alignBottom, ...styles.margin10 }}>
                        <input type="file" id="profile-image" />
                        <button style={{ ...styles.generalButton, ...folderSize }} onClick={() => { profile.uploadprofileimage.call(this)}}>
                            {folderIcon()}
                        </button>
                    </div>
                </div>)

            }
        }


        if (myuser) {
            return (<div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>


                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...headerFont, ...styles.fontBold, ...styles.alignCenter }}>
                            /<input type="text" value={myuser.UserID}
                                onChange={event => { profile.handleprofile.call(this,event.target.value) }}
                                style={{ ...styles.generalFont, ...headerFont, ...styles.fontBold }}
                            /> {showButton()}
                        </div>
                    </div>


                   {showImage()}

                    {profile.showprofileurl.call(this)}

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1}}>
                           <span style={{...regularFont, ...styles.generalFont }}> Login Info</span> <button style={{ ...styles.generalButton, ...styles.addLeftMargin, ...arrowHeight }}>
                                {scrollImageDown()}
                            </button>
                        </div>
                    </div>

                    {profile.showlogininfo.call(this)}

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFont }}>
                            Additional Info <button style={{ ...styles.generalButton, ...styles.addLeftMargin, ...arrowHeight }}>
                                {scrollImageDown()}
                            </button>
                        </div>
                    </div>

                    {profile.showadditional.call(this)}

                    {profile.showsaveprofile.call(this)}

              




                </div>
            </div>)

        } else {
            return (<div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                <span style={{ ...styles.generalFont, ...regularFont }}>Please Login to View Milestones</span>
            </div>)

        }
    }
}



export default Profile
