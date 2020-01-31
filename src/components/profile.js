import React, { Component } from 'react';
import { connect } from 'react-redux';
import './profile.css';
import { MyUserModel, getstatelist } from './functions'
import { UploadProfileImage } from './actions/api'
import { newStripeConnectIcon, uploadnewProfilePictureIcon, UpdatePasswordIcon, defaultProfilePhoto } from './svg';
import * as actions from './actions';
import PM from './pm'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "Press Save to Update Password",
            windowwidth: 0,
            stripe: '',
            view: '',
            passwordmessage: ''
        }

    }

    componentDidMount() {

        this.props.reduxNavigation({ navigation: "profile" })

    }


    handleSubmit(event) {
        event.preventDefault();
        let errormessage = this.geterrormessages();
        if (!errormessage) {
            let emailaddress = this.props.myusermodel.emailaddress;
            let firstname = this.props.myusermodel.firstname;
            let lastname = this.props.myusermodel.lastname;
            let occupation = this.props.myusermodel.occupation;
            let jobtitle = this.props.myusermodel.jobtitle;
            let laborrate = this.props.myusermodel.laborrate;
            let company = this.props.myusermodel.company;
            let address = this.props.myusermodel.address;
            let city = this.props.myusermodel.city;
            let sta = this.props.myusermodel.contactstate;
            let zipcode = this.props.myusermodel.zipcode
            let phonenumber = this.props.myusermodel.phonenumber;
            let profileurl = this.props.myusermodel.profileurl;
            let values = { emailaddress, firstname, lastname, occupation, jobtitle, laborrate, company, address, city, sta, zipcode, phonenumber, profileurl }
            console.log(values)
            this.props.updateUser(values);

        }
        else {
            this.props.myusermodel.message = errormessage;

            this.setState({ render: 'render' })
        }
    }

    getemptycontainer() {
        let width = window.innerWidth;
        if (width < 1081) {
            return (<div className="profile-element-b-field">&nbsp; </div>)
        }
    }
    showstripe() {
        if (this.props.myusermodel) {
            if (this.props.myusermodel.stripe) {
                return (<div className="profile-element-b-field">Your Profile is accepting payments through Stripe </div>)

            }
            else {
                let stripe_redirect = `${process.env.REACT_APP_SERVER_API}/projectmanagement/stripe/updatepaymentid`
                stripe_redirect = encodeURIComponent(stripe_redirect);
                //redirect_uri=http://webdevbootcamp-mazenoncloud9.c9users.io:8081/projectmanagement/stripe/updatepaymentid&response_type=code&client_id=ca_ETdAZ69zcymVDO45aRGOnspAT9xHuv43&scope=read_write
                const stripe = `https://connect.stripe.com/oauth/authorize?response_type=code&redirect_uri=${stripe_redirect}&client_id=${process.env.REACT_APP_STRIPE_CONNECT}&state=${this.props.myusermodel.providerid}&stripe_user[business_type]=company&scope=read_write`
                //https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_EWyUHyjDxSqZWHmDdvqSeRmdeQXH6fjN&scope=read_write
                return (<div className="profile-element-b-field"><a href={stripe}><button className="btnstripeconnect">{newStripeConnectIcon()} </button> </a></div>)
            }

        }
        else {
            return (<div className="profile-element-b-field">&nbsp; </div>)
        }


    }
    getprofileimage() {
        const pm = new PM();
        const myuser = pm.getuser.call(this)

        if (myuser) {
            return <img src={myuser.profileurl}
                alt={`${myuser.firstname} ${myuser.lastanem}`}
                className="profile-img" />
        }
        else {
            return (defaultProfilePhoto())
        }
    }



    async uploadprofileimage(event) {
        let formData = new FormData();
        let providerid = this.props.match.params.providerid;
        let myfile = document.getElementById("uploadprofileimage");
        // HTML file input, chosen by user
        formData.append("profilephoto", myfile.files[0]);
        let response = await UploadProfileImage(formData, providerid);
        console.log(response)

        if (response.hasOwnProperty("providerid")) {

            let myusermodel = MyUserModel(response.providerid, response.firstname, response.lastname, response.company, response.occupation, response.jobtitle, response.laborrate, response.address, response.city, response.contactstate, response.zipcode, response.emailaddress, response.phonenumber, response.profileurl, response.stripe)
            this.props.updateUserModel(myusermodel)

        }
        this.updateState();
    }
    updateState() {
        this.setState({ render: 'render' })
    }
    getfirstname() {
        let firstname = "";
        const pm = new PM();
        const myuser = pm.getuser.call(this);
        if (myuser) {
            firstname = myuser.firstname;
        };
        return firstname;
    }
    handlefirstname(firstname) {
        const pm = new PM();
        const myuser = pm.getuser.call(this);
        if (myuser) {
            myuser.firstname = firstname;
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' });
        }

    }
    getlastname() {
        const pm = new PM();
        let lastname = "";
        const myuser = pm.getuser.call(this);
        if (myuser) {
            lastname = myuser.lastname;
        }
        return lastname
    }
    handlelastname(lastname) {
        this.props.myusermodel.lastname = lastname;
        let myusermodel = this.props.myusermodel;
        this.props.updateUserModel(myusermodel);
        this.setState({ render: 'render' });
    }



    getaddress() {
        const pm = new PM();
        const myuser = pm.getuser.call(this);
        let address = "";
        if (myuser) {
            address = myuser.address;
        }

        return address;
    }
    handleaddress(address) {
        const pm = new PM();
        let myuser = pm.getuser.call(this);
        if (myuser) {
            myuser.address = address;
            this.props.reduxUser(myuser)
            this.setState({ render: 'render' });
        }

    }
    getcity() {
        const pm = new PM();
        const myuser = pm.getuser.call(this);
        let city = "";
        if (myuser) {
            city = myuser.city;
        }

        return city;
    }
    handlecity(city) {
        const pm = new PM();
        let myuser = pm.getuser.call(this);
        if (myuser) {
            myuser.city = city;
            this.props.reduxUser(myuser)
            this.setState({ render: 'render' });
        }

    }
    getcontactstate() {
        const pm = new PM();
        const myuser = pm.getuser.call(this);
        let contactstate = "";
        if (myuser) {
            contactstate = myuser.contactstate;
        }

        return contactstate;
    }
    handlecontactstate(contactstate) {
        const pm = new PM();
        let myuser = pm.getuser.call(this);
        if (myuser) {
            myuser.contactstate = contactstate;
            this.props.reduxUser(myuser)
            this.setState({ render: 'render' });
        }

    }
    getzipcode() {
        const pm = new PM();
        const myuser = pm.getuser.call(this);
        let zipcode = "";
        if (myuser) {
            zipcode = myuser.zipcode;
        }

        return zipcode;
    }
    handlezipcode(zipcode) {
        const pm = new PM();
        let myuser = pm.getuser.call(this);
        if (myuser) {
            myuser.zipcode = zipcode;
            this.props.reduxUser(myuser)
            this.setState({ render: 'render' });
        }

    }

    getemailaddress() {
        const pm = new PM();
        const myuser = pm.getuser.call(this);
        let emailaddress = "";
        if (myuser) {
            emailaddress = myuser.emailaddress;
        }

        return emailaddress;
    }
    handleemailaddress(emailaddress) {
        const pm = new PM();
        let myuser = pm.getuser.call(this);
        if (myuser) {
            myuser.emailaddress = emailaddress;
            this.props.reduxUser(myuser)
            this.setState({ render: 'render' });
        }

    }
    getphonenumber() {
        const pm = new PM();
        const myuser = pm.getuser.call(this);
        let phonenumber = "";
        if (myuser) {
            phonenumber = myuser.phonenumber;
        }

        return phonenumber;
    }
    handlephonenumber(phonenumber) {
        const pm = new PM();
        let myuser = pm.getuser.call(this);
        if (myuser) {
            myuser.phonenumber = phonenumber;
            this.props.reduxUser(myuser)
            this.setState({ render: 'render' });
        }

    }
    getprofileurl() {
        const pm = new PM();
        const myuser = pm.getuser.call(this);
        let profileurl = "";
        if (myuser) {
            profileurl = myuser.profileurl;
        }

        return profileurl;
    }
    handleprofileurl(profileurl) {
        const pm = new PM();
        let myuser = pm.getuser.call(this);
        if (myuser) {
            myuser.profileurl = profileurl;
            this.props.reduxUser(myuser)
            this.setState({ render: 'render' });
        }

    }

    loadstates() {
        let states = getstatelist();
        let mystates = [<option value=""> Select A State </option>]
        if (states.hasOwnProperty("length")) {
            // eslint-disable-next-line
            states.map(mystate => {
                mystates.push(<option value={mystate.abbreviation}>{mystate.name} </option>)
            })
        }
        return mystates;
    }


    showmyprofile() {
        let myprofile = [];
        myprofile.push(<div className="profile-titlerow"> Update Profile Information </div>)

        myprofile.push(<div className="profile-element-b-field-half">
            First Name <br /><input type="text" className="project-field" value={this.getfirstname()} onChange={event => { this.handlefirstname(event.target.value) }} />
        </div>)
        myprofile.push(<div className="profile-element-b-field-half">
            Last Name <br /> <input type="text" className="project-field" value={this.getlastname()} onChange={event => { this.handlelastname(event.target.value) }} />
        </div>)

        myprofile.push(<div className="profile-element-b-field-half">
            Address <br />   <input type="text" className="project-field" value={this.getaddress()} onChange={event => { this.handleaddress(event.target.value) }} />
        </div>)
        myprofile.push(<div className="profile-element-b-field-half">
            City <br />  <input type="text" className="project-field" value={this.getcity()} onChange={event => { this.handlecity(event.target.value) }} />
        </div>)
        myprofile.push(<div className="profile-element-b-field-half">
            State <br /><select className="project-field" onChange={event => { this.handlecontactstate(event.target.value) }} value={this.getcontactstate()}> {this.loadstates()} </select>
        </div>)
        myprofile.push(<div className="profile-element-b-field-half">
            Zipcode <br /> <input type="text" className="project-field" value={this.getzipcode()} onChange={event => { this.handlezipcode(event.target.value) }} />
        </div>)
        myprofile.push(<div className="profile-element-b-field-half">
            Email Address <br />  <input type="text" className="project-field" value={this.getemailaddress()} onChange={event => { this.handleemailaddress(event.target.value) }} />
        </div>)
        myprofile.push(<div className="profile-element-b-field-half">
            Phone Number <input type="text" className="project-field" value={this.getphonenumber()} onChange={event => { this.handlephonenumber(event.target.value) }} />
        </div>)


        return myprofile;
    }
    updatemypassword() {
        let updatemypassword = [];
        updatemypassword.push(<div className="profile-titlerow"> Update User Access </div>)
        updatemypassword.push(<div className="profile-element-b-field-half">
            <input type="password" className="project-field" id="userupdatepassword" />
        </div>)
        updatemypassword.push(<div className="profile-element-b-field-half">
            <button onClick={event => { this.updatepassword(event) }} className="btn-updatepassword">
                {UpdatePasswordIcon()}
            </button>
        </div>)
        updatemypassword.push(<div className="profile-element-b-field">
            {this.state.passwordmessage}
        </div>)
        return updatemypassword;

    }
    getprofileimageurl() {
        let profileurl = "";
        if (this.props.myusermodel) {
            if (this.props.myusermodel.hasOwnProperty("profileurl")) {
                profileurl = this.props.myusermodel.profileurl;
            }
        }
        return profileurl;
    }
    showuploadprofileform() {
        let profileform = [];
        profileform.push(<div className="profile-titlerow"> Manage Your Profile Image  </div>)
        profileform.push(<div className="profile-element-b-field-half">
            <input type="file" name="profileimage" id="uploadprofileimage" className="project-field" /></div>)
        profileform.push(<div className="profile-element-b-field-half">
            <button className="uploadprofileimage"
                onClick={event => { this.uploadprofileimage(event) }}>
                {uploadnewProfilePictureIcon()}
            </button>
        </div>);
        profileform.push(<div className="profile-element-b-field"> Your current image is found at {this.getprofileimageurl()} </div>)
        return profileform;
    }

    getmyprofileurl() {
        return (<div className="profile-element-b-field-half">
            Profile URL <input type="text" className="project-field" value={this.getprofileurl()} onChange={event => { this.handleprofileurl(event.target.value) }} />
        </div>)
    }
    showmenus() {
        let showmenu = [];
        let menus = [{ id: "myprofile", title: 'My Profile' },
        { id: "picture", title: 'Profile Picture' },
        { id: "loginpassword", title: 'Login Password' }

        ]
        // eslint-disable-next-line
        menus.map(menu => {
            showmenu.push(<div className="showprofilemenu-container" id={menu.id} key={menu.id} onClick={event => { this.setState({ view: menu.id }) }}><span className="profile-menu-font"> {menu.title} </span></div>)
        })


        return showmenu;
    }


    handleview() {
        let view = this.state.view;
        let myview = [];
        switch (view) {
            case "myprofile":
                return (this.showmyprofile())
            case "picture":
                return (this.showuploadprofileform());
            case "loginpassword":
                return (this.updatemypassword())
            default:
                return myview;
        }
    }
    handleProfile() {
        if (this.props.myusermodel) {
            if (this.props.myusermodel.hasOwnProperty("providerid")) {
                let providerid = this.props.myusermodel.providerid
                return (
                    <div className="myprofile-container">
                        <div className="profile-titlerow">Your profile can be view at {process.env.REACT_APP_CLIENT_API}/{providerid}  </div>
                        <div className="profile-main"> <div className="profilepicture-container">{this.getprofileimage()} </div> </div>
                        <div className="profile-main">Select From the Following </div>
                        {this.showmenus()}
                        {this.handleview()}
                    </div>

                )
            } else {
                return (<div>&nbsp; </div>)
            }

        }
        else {
            return (<div>&nbsp; </div>)
        }
    }
    render() {

        return (this.handleProfile())
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
