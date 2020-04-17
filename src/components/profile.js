import React, { Component } from 'react';
import { connect } from 'react-redux';
import './profile.css';
//import { getstatelist } from './functions'
//import { UploadProfileImage } from './actions/api';
import { folderIcon, scrollImageDown, purpleCheck } from './svg'
import * as actions from './actions';
import { MyStylesheet } from './styles'
import { UploadProfileImage } from './actions/api';
import { returnCompanyList, inputUTCStringForLaborID, validateProviderID } from './functions';
import { CheckProfile } from './actions/api'
import PM from './pm'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, message: '' }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }
    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }
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
        return myuser.profileurl;


    }
    showprofileurl() {
        const styles = MyStylesheet();
        const regularFontHeight = this.getRegularFont();
        if (this.state.width > 800) {
            return (<div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFontHeight }}>
                    Profile URL <input type="text" style={{ ...styles.addLeftMargin, ...styles.regularFont, ...regularFontHeight, ...styles.generalField }}
                        value={this.getprofileurl()}

                    />

                </div>

            </div>)

        } else {
            return (<div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFontHeight }}>
                    Profile URL <br /> <input type="text" style={{ ...styles.regularFont, ...regularFontHeight, ...styles.generalField }}
                        value={this.getprofileurl()}
                    />
                </div>

            </div>)

        }
    }
    getclientmessage() {
        let user = this.getuser();
        if (user) {
            return `Your Profile is connected with ${user.client}`
        } else {
            return;
        }
    }
    getfirstname() {
        const pm = new PM();
        let myuser = pm.getuser.call(this);
        return myuser.firstname;
    }
    handlefirstname(firstname) {
        const pm = new PM();
        let myuser = pm.getuser.call(this);
        if (myuser) {
            myuser.firstname = firstname;
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })
        }

    }
    getemailaddress() {
        const pm = new PM();
        let myuser = pm.getuser.call(this);
        return myuser.emailaddress;
    }
    handleemailaddress(emailaddress) {
        const pm = new PM();
        let myuser = pm.getuser.call(this);
        if (myuser) {
            myuser.emailaddress = emailaddress;
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })
        }

    }
    getlastname() {
        const pm = new PM();
        let myuser = pm.getuser.call(this);
        return myuser.lastname;
    }
    handlelastname(lastname) {
        const pm = new PM();
        let myuser = pm.getuser.call(this);
        if (myuser) {
            myuser.lastname = lastname;
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
        return myuser.phonenumber;
    }
    handlephonenumber(phonenumber) {
        const pm = new PM();
        let myuser = pm.getuser.call(this);
        if (myuser) {
            myuser.phonenumber = phonenumber;
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
                myuser.profile = profile;
                this.props.reduxUser(myuser);
                this.setState({ message: '' })
            }

        } else {
            myuser.profile = profile;
            myuser.invalid = validate;
            this.props.reduxUser(myuser);
            this.setState({ message: validate })

        }

    }

    getprofile() {
        const pm = new PM();
        let myuser = pm.getuser.call(this);
        return myuser.profile;
    }
    showlogininfo() {
        const styles = MyStylesheet();
        const regularFontHeight = this.getRegularFont();
        return (<div style={{ ...styles.generalFlex }}>
            <div style={{ ...styles.flex1 }}>

              
                <div style={{ ...styles.generalFlex, ...styles.addPadding }}>
                    <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFontHeight, ...styles.addMargin }}>
                        Email <br />
                        <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFontHeight }}
                            value={this.getemailaddress()}
                            onChange={event => { this.handleemailaddress(event.target.value) }}
                        />
                    </div>
                </div>

            </div>
        </div>)

    }
    showadditional() {
        const styles = MyStylesheet();
        const regularFontHeight = this.getRegularFont();
        return (<div style={{ ...styles.generalFlex }}>
            <div style={{ ...styles.flex1 }}>

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFontHeight, ...styles.addMargin }}>
                        First Name <br />
                        <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFontHeight }}
                            value={this.getfirstname()}
                            onChange={event => { this.handlefirstname(event.target.value) }}
                        />
                    </div>
                    <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFontHeight, ...styles.addMargin }}>
                        Last Name <br />
                        <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFontHeight }}
                            value={this.getlastname()}
                            onChange={event => { this.handlelastname(event.target.value) }}
                        />
                    </div>
                </div>


                <div style={{ ...styles.generalFlex }}>

                    <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFontHeight, ...styles.addMargin }}>
                        Phone Number <br />
                        <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFontHeight }}
                            value={this.getphonenumber()}
                            onChange={event => { this.handlephonenumber(event.target.value) }}
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
        if (myuser.profileurl) {
            return (<img src={myuser.profileurl} style={{ ...profileImage }} alt={`${myuser.firstname} ${myuser.lastname}`} />)
        } else {
            return;
        }

    }
    async uploadprofileimage() {
        const pm = new PM();
        const myuser = pm.getuser.call(this);
        if (myuser) {
            const providerid = myuser.providerid;
            const values = { providerid: myuser.providerid, client: myuser.client, clientid: myuser.clientid, firstname: myuser.firstname, lastname: myuser.lastname, emailaddress: myuser.emailaddress, phonenumber: myuser.phonenumber, profileurl: myuser.profileurl }
            let formData = new FormData();
            let myfile = document.getElementById("profile-image");
            formData.append("profilephoto", myfile.files[0]);
            formData.append("myuser", JSON.stringify(values))
            try {
                let response = await UploadProfileImage(formData, providerid);
                console.log(response)
                if (response.hasOwnProperty("allusers")) {
                    let companys = returnCompanyList(response.allusers);
                    this.props.reduxAllCompanys(companys)
                    this.props.reduxAllUsers(response.allusers);

                }
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
    async checkprofile(profile) {
        const pm = new PM();
        const myuser = pm.getuser.call(this);

        if (myuser) {
            let validate = validateProviderID(profile)
            if (profile && !validate) {
                try {
                    let response = await CheckProfile(profile);
                    console.log(response)
                    if (response.hasOwnProperty("invalid")) {
                        myuser.invalid = response.invalid;
                        this.props.reduxUser(myuser);
                        this.setState({ message: response.message })
                    } else if (response.hasOwnProperty("valid")) {

                        if (myuser.hasOwnProperty("invalid")) {
                            delete myuser.invalid;
                            this.setState({ message: '' })
                        }
                    }
                } catch (err) {
                    alert(err)
                }
            }

        }
    }
    render() {
        const pm = new PM();
        const styles = MyStylesheet();
        const headerFont = pm.getHeaderFont.call(this);
        const regularFont = pm.getRegularFont.call(this);
        let myuser = pm.getuser.call(this)
        const profileDimensions = pm.getprofiledimensions.call(this);
        const folderSize = pm.getFolderSize.call(this);
        const arrowHeight = pm.getArrowHeight.call(this);
        const goIcon = pm.getGoIcon.call(this)

        const showButton = () => {

            if (!myuser.hasOwnProperty("invalid") && myuser.profile) {
                return (<button style={{ ...styles.generalButton, ...goIcon }}>{purpleCheck()}</button>)
            } else {
                return;
            }
        }

        return (<div style={{ ...styles.generalFlex }}>
            <div style={{ ...styles.flex1 }}>

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.generalFont, ...headerFont, ...styles.fontBold, ...styles.alignCenter }}>
                        /<input type="text" value={myuser.profile}
                            onChange={event => { this.handleprofile(event.target.value) }}
                            style={{ ...styles.generalFont, ...headerFont, ...styles.fontBold }}
                            onBlur={event => { this.checkprofile(event.target.value) }}
                        /> {showButton()}
                    </div>
                </div>


                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex2 }}>
                        <div style={{ ...styles.generalContainer, ...profileDimensions, ...styles.showBorder, ...styles.margin10, ...styles.alignRight }}>
                            {this.showprofileimage()}
                        </div>
                    </div>
                    <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignBottom, ...styles.margin10 }}>
                        <input type="file" id="profile-image" />
                        <button style={{ ...styles.generalButton, ...folderSize }} onClick={() => { this.uploadprofileimage() }}>
                            {folderIcon()}
                        </button>
                    </div>
                </div>

                {this.showprofileurl()}

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFont }}>
                        Login Info <button style={{ ...styles.generalButton, ...styles.addLeftMargin, ...arrowHeight }}>
                            {scrollImageDown()}
                        </button>
                    </div>
                </div>

                {this.showlogininfo()}

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFont }}>
                        Additional Info <button style={{ ...styles.generalButton, ...styles.addLeftMargin, ...arrowHeight }}>
                            {scrollImageDown()}
                        </button>
                    </div>
                </div>

                {this.showadditional()}

                {pm.showsaveproject.call(this)}


            </div>
        </div>)
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        projects: state.projects,
        projectsprovider: state.projectsprovider,
        projectid: state.projectid,
        searchproviders: state.searchproviders
    }
}

export default connect(mapStateToProps, actions)(Profile)
