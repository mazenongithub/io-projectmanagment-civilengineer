import React, { Component } from 'react';
import { connect } from 'react-redux';
import './profile.css';
import { MyUserModel, showOccupations, getstatelist, inputUTCStringForLaborID, validateLaborRate } from './functions'
import { UpdateUserPassword, UploadProfileImage, loadmyprojects, GoandHireMe, LoadMyProviders } from './actions/api'
import { saveAllProfileIcon, newStripeConnectIcon, uploadnewProfilePictureIcon, UpdatePasswordIcon, defaultProfilePhoto } from './svg';
import * as actions from './actions';
import { Link } from 'react-router-dom';

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
    getproviderid() {
        let providerid = "";
        if (this.props.hasOwnProperty("match")) {
            if (this.props.match.hasOwnProperty("params")) {
                providerid = this.props.match.params.providerid;
            }
        }
        else if (this.props.myusermodel) {
            providerid = this.props.myusermodel.providerid;
        }
        return providerid;
    }
    componentDidMount() {

        this.props.reduxNavigation({ navigation: "profile" })
        if (!this.props.projects.hasOwnProperty("length") && !this.props.projectsprovider.hasOwnProperty("length")) {
            let providerid = this.getproviderid()
            this.getmyprojects(providerid);
        }

        if (!this.props.searchproviders.hasOwnProperty("searchproviders")) {
            this.loadmysearchproviders()
        }


    }
    async loadmysearchproviders() {
        let response = await LoadMyProviders();
        console.log(response)
        let myprovider = response.searchproviders.myprovider
        this.props.searchProviders({ searchproviders: myprovider })
    }

    async getmyprojects(providerid) {
        let response = await loadmyprojects(providerid);
        console.log(response)

        if (response.hasOwnProperty("projectsprovider")) {
            // eslint-disable-next-line
            this.props.projectsProvider(response.projectsprovider.myproject)
        }
        if (response.hasOwnProperty("projectsmanaging")) {
            this.props.reduxProjects(response.projectsmanaging.myproject)
        }

        if (response.hasOwnProperty("providerid")) {

            let myusermodel = MyUserModel(response.providerid, response.firstname, response.lastname, response.company, response.occupation, response.jobtitle, response.laborrate, response.address, response.city, response.contactstate, response.zipcode, response.emailaddress, response.phonenumber, response.profileurl, response.stripe)
            this.props.updateUserModel(myusermodel)

        }
        this.setState({ render: 'render' })
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
    geterrormessages() {
        let message = "";
        if (this.props.firstname.hasOwnProperty("errmsg")) {
            message += ` ${this.props.firstname.errmsg}`;
        }
        if (this.props.lastname.hasOwnProperty("errmsg")) {
            message += ` ${this.props.lastname.errmsg}`;
        }
        if (this.props.emailaddress.hasOwnProperty("errmsg")) {
            message += ` ${this.props.emailaddress.errmsg}`;
        }

        if (this.props.phonenumber.hasOwnProperty("errmsg")) {
            message += ` ${this.props.phonenumber.errmsg}`;
        }

        if (this.props.zipcode.hasOwnProperty("errmsg")) {
            message += ` ${this.props.zipcode.errmsg}`;
        }
        if (this.props.profileurl.hasOwnProperty("errmsg")) {
            message += ` ${this.props.profileurl.errmsg}`;
        }
        if (this.props.laborrate.hasOwnProperty("errmsg")) {
            message += ` ${this.props.laborrate.errmsg}`;
        }
        return message;
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
        if (this.props.myusermodel.hasOwnProperty("profileurl")) {
            if (this.props.myusermodel.profileurl) {
                return <img src={this.props.myusermodel.profileurl} 
                alt={`${this.props.myusermodel.firstname} ${this.props.myusermodel.lastanem}`} 
                className="profile-img" />
            }
            else {
                return (defaultProfilePhoto())
            }
        }
    }
    getmessage() {
        if (this.props.myusermodel.hasOwnProperty("message")) {
            return this.props.myusermodel.message;
        }
    }
    async updatepassword() {

        let userupdatedpassword = document.getElementById("userupdatepassword").value;
        let providerid = this.props.match.params.providerid
        let values = { password: userupdatedpassword, providerid }

        let response = await UpdateUserPassword(values);
        if (response.hasOwnProperty("providerid")) {

            let myusermodel = MyUserModel(response.providerid, response.firstname, response.lastname, response.company, response.occupation, response.jobtitle, response.laborrate, response.address, response.city, response.contactstate, response.zipcode, response.emailaddress, response.phonenumber, response.profileurl, response.stripe)
            this.props.updateUserModel(myusermodel)

        }
        if (response.hasOwnProperty("message")) {
            this.setState({ passwordmessage: `${response.message} Last Updated ${inputUTCStringForLaborID(response.dateupdated)}` })
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
        if (this.props.myusermodel) {
            firstname = this.props.myusermodel.firstname
        }
        return firstname;
    }
    handlefirstname(firstname) {
        this.props.myusermodel.firstname = firstname;
        let myusermodel = this.props.myusermodel;
        this.props.updateUserModel(myusermodel);
        this.setState({ render: 'render' });
    }
    getlastname() {
        let lastname = "";
        if (this.props.myusermodel) {
            lastname = this.props.myusermodel.lastname
        }
        return lastname
    }
    handlelastname(lastname) {
        this.props.myusermodel.lastname = lastname;
        let myusermodel = this.props.myusermodel;
        this.props.updateUserModel(myusermodel);
        this.setState({ render: 'render' });
    }
    getlaborrate() {
        let laborrate = "";
        if (this.props.myusermodel) {
            laborrate = this.props.myusermodel.laborrate
        }
        return laborrate;
    }
    handlelaborrate(laborrate) {
        this.props.myusermodel.laborrate = laborrate;
        let myusermodel = this.props.myusermodel;
        this.props.updateUserModel(myusermodel);
        this.setState({ render: 'render' });
    }
    getoccupation() {
        let occupation = "";
        if (this.props.myusermodel) {
            occupation = this.props.myusermodel.occupation
        }
        return occupation;
    }
    handleoccupation(occupation) {
        this.props.myusermodel.occupation = occupation;
        let myusermodel = this.props.myusermodel;
        this.props.updateUserModel(myusermodel);
        this.setState({ render: 'render' });
    }
    getjobtitle() {
        let jobtitle = "";
        if (this.props.myusermodel) {
            jobtitle = this.props.myusermodel.jobtitle
        }
        return jobtitle;

    }
    handlejobtitle(jobtitle) {
        this.props.myusermodel.jobtitle = jobtitle;
        let myusermodel = this.props.myusermodel;
        this.props.updateUserModel(myusermodel);
        this.setState({ render: 'render' });
    }
    getcompany() {
        let company = "";
        if (this.props.myusermodel) {
            company = this.props.myusermodel.company
        }
        return company;


    }
    handlecompany(company) {
        this.props.myusermodel.company = company;
        let myusermodel = this.props.myusermodel;
        this.props.updateUserModel(myusermodel);
        this.setState({ render: 'render' });
    }
    getaddress() {
        let address = "";
        if (this.props.myusermodel) {
            address = this.props.myusermodel.address;
        }
        return address;


    }
    handleaddress(address) {
        this.props.myusermodel.address = address;
        let myusermodel = this.props.myusermodel;
        this.props.updateUserModel(myusermodel);
        this.setState({ render: 'render' });
    }
    getcity() {
        let city = "";
        if (this.props.myusermodel) {
            city = this.props.myusermodel.city;
        }
        return city;
    }
    handlecity(city) {
        this.props.myusermodel.city = city;
        let myusermodel = this.props.myusermodel;
        this.props.updateUserModel(myusermodel);
        this.setState({ render: 'render' });
    }
    getstate() {
        let contactstate = "";
        if (this.props.myusermodel) {
            contactstate = this.props.myusermodel.contactstate;
        }
        return contactstate;
    }
    handlestate(contactstate) {
        this.props.myusermodel.contactstate = contactstate;
        let myusermodel = this.props.myusermodel;
        this.props.updateUserModel(myusermodel);
        this.setState({ render: 'render' });
    }
    getzipcode() {
        let zipcode = "";
        if (this.props.myusermodel) {
            zipcode = this.props.myusermodel.zipcode;
        }

        return zipcode;

    }
    handlezipcode(zipcode) {
        this.props.myusermodel.zipcode = zipcode;
        let myusermodel = this.props.myusermodel;
        this.props.updateUserModel(myusermodel);
        this.setState({ render: 'render' });
    }
    getemail() {
        let emailaddress = "";
        if (this.props.myusermodel) {
            emailaddress = this.props.myusermodel.emailaddress;
        }
        return emailaddress;

    }
    handleemail(emailaddress) {
        this.props.myusermodel.emailaddress = emailaddress;
        let myusermodel = this.props.myusermodel;
        this.props.updateUserModel(myusermodel);
        this.setState({ render: 'render' });
    }
    getphonenumber() {
        let phonenumber = "";
        if (this.props.myusermodel) {
            phonenumber = this.props.myusermodel.phonenumber
        }
        return phonenumber;
    }
    handlephonenumber(phonenumber) {
        this.props.myusermodel.phonenumber = phonenumber;
        let myusermodel = this.props.myusermodel;
        this.props.updateUserModel(myusermodel);
        this.setState({ render: 'render' });
    }
    getprofileurl() {
        let profileurl = "";
        if (this.props.myusermodel) {
            profileurl = this.props.myusermodel.profileurl
        }
        return profileurl;

    }
    handleprofileurl(profileurl) {
        this.props.myusermodel.profileurl = profileurl;
        let myusermodel = this.props.myusermodel;
        this.props.updateUserModel(myusermodel);
        this.setState({ render: 'render' });
    }
    loadoccupations() {
        let occupation = [];
        let occupations = showOccupations();
        if (occupations.hasOwnProperty("length")) {
            // eslint-disable-next-line
            occupations.map(occ => {
                occupation.push(<option value={occ.code} key={occ.code}>{occ.name} </option>)
            })
            return occupation;
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
    validateProjectProvider() {
        let errmsg = "";

        if (this.props.projectsprovider) {
            if (this.props.projectsprovider.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projectsprovider.map(myproject => {

                    if (myproject.hasOwnProperty("actuallabor")) {
                        // eslint-disable-next-line
                        myproject.actuallabor.mylabor.map(mylabor => {
                            if (!mylabor.milestoneid) {
                                errmsg = `${mylabor.laborid} is missing a milestone `
                            }
                            console.log(mylabor.laborrate)
                            errmsg += `${validateLaborRate(mylabor.laborrate)}`
                            console.log(errmsg)
                        })
                    }

                    if (myproject.hasOwnProperty("actualmaterials")) {
                        // eslint-disable-next-line
                        myproject.actualmaterials.mymaterial.map(mymaterial => {
                            if (!mymaterial.milestoneid) {
                                errmsg += `${mymaterial.materialid} is missing a milestone `

                            }
                            errmsg += `${validateLaborRate(mymaterial.unitcost)}`
                            errmsg += `${validateLaborRate(mymaterial.quantity)}`
                        })
                    }

                    if (myproject.hasOwnProperty("schedulelabor")) {
                        console.log("checking schedulelabor")
                        // eslint-disable-next-line
                        myproject.schedulelabor.mylabor.map(mylabor => {
                            if (!mylabor.milestoneid) {

                                errmsg += `${mylabor.laborid} is missing a milestone `
                                console.log(errmsg)
                            }

                            errmsg += `${validateLaborRate(mylabor.laborrate)}`

                        })
                    }

                    if (myproject.hasOwnProperty("schedulematerials")) {
                        // eslint-disable-next-line
                        myproject.schedulematerials.mymaterial.map(mymaterial => {
                            if (!mymaterial.milestoneid) {
                                errmsg += `${mymaterial.materialid} is missing a milestone `

                            }
                            errmsg += `${validateLaborRate(mymaterial.unitcost)}`
                            errmsg += `${validateLaborRate(mymaterial.quantity)}`
                        })
                    }


                })
            }
        }
        return errmsg;
    }
    async handleSaveAllProjects(event) {
        console.log(event)
        let providerid = this.props.myusermodel.providerid;
        let myusermodel = this.props.myusermodel;
        let projects = this.props.projects;
        let projectsprovider = this.props.projectsprovider;
        let values = { providerid, myusermodel, projects, projectsprovider }
        let errmsg = this.validateProjectProvider();

        if (!errmsg) {
            let response = await GoandHireMe(values)
            console.log(response)
            if (response.hasOwnProperty("projectsprovider")) {
                // eslint-disable-next-line
                this.props.projectsProvider(response.projectsprovider.myproject)
            }
            if (response.hasOwnProperty("projectsmanaging")) {
                this.props.reduxProjects(response.projectsmanaging.myproject)
            }

            if (response.hasOwnProperty("providerid")) {

                let myusermodel = MyUserModel(response.providerid, response.firstname, response.lastname, response.company, response.occupation, response.jobtitle, response.laborrate, response.address, response.city, response.contactstate, response.zipcode, response.emailaddress, response.phonenumber, response.profileurl, response.stripe)
                console.log(myusermodel)
                this.props.updateUserModel(myusermodel)

            }
            if (response.hasOwnProperty("message")) {
                this.setState({ message: `${response.message} Last Updated ${inputUTCStringForLaborID(response.dateupdated)}` })
            }
        }
        else {
            this.setState({ message: errmsg })
        }

    }
    showmyprofile() {
        let myprofile = [];
        myprofile.push(<div className="profile-titlerow"> Update Profile Information </div>)

        myprofile.push(<div className="profile-element-b-field-half">
                First Name <br/><input type="text" className="project-field" value={this.getfirstname()} onChange={event=>{this.handlefirstname(event.target.value)}}/> 
            </div>)
        myprofile.push(<div className="profile-element-b-field-half">
              Last Name <br/> <input type="text" className="project-field" value={this.getlastname()} onChange={event=>{this.handlelastname(event.target.value)}}/> 
            </div>)
        myprofile.push(<div className="profile-element-b-field-half">
              Labor Rate <br/>   <input type="text" className="project-field" value={this.getlaborrate()} onChange={event=>{this.handlelaborrate(event.target.value)}}/> 
            </div>)
        myprofile.push(<div className="profile-element-b-field-half">
             Occupation <br/> <select className="project-field" value={this.getoccupation()} onChange={event=>{this.handleoccupation(event.target.value)}}> {this.loadoccupations() }</select>
            </div>)
        myprofile.push(<div className="profile-element-b-field-half">
             Job Title <br/>  <input type="text" className="project-field" value={this.getjobtitle()} onChange={event=>{this.handlejobtitle(event.target.value)}}/> 
            
            </div>)
        myprofile.push(<div className="profile-element-b-field-half">
            
            Company <br/>   <input type="text" className="project-field" value={this.getcompany()} onChange={event=>{this.handlecompany(event.target.value)}}/> 
            
            </div>)
        myprofile.push(<div className="profile-element-b-field-half">
            Address <br/>   <input type="text" className="project-field" value={this.getaddress()} onChange={event=>{this.handleaddress(event.target.value)}}/> 
            </div>)
        myprofile.push(<div className="profile-element-b-field-half">
            City <br/>  <input type="text" className="project-field" value={this.getcity()} onChange={event=>{this.handlecity(event.target.value)}}/> 
            </div>)
        myprofile.push(<div className="profile-element-b-field-half">
            State <br/><select className="project-field" onChange={event=>{this.handlestate(event.target.value)}} value={this.getstate()}> {this.loadstates()} </select>
            </div>)
        myprofile.push(<div className="profile-element-b-field-half">
             Zipcode <br/> <input type="text" className="project-field" value={this.getzipcode()} onChange={event=>{this.handlezipcode(event.target.value)}}/> 
            </div>)
        myprofile.push(<div className="profile-element-b-field-half">
              Email Address <br/>  <input type="text" className="project-field" value={this.getemail()} onChange={event=>{this.handleemail(event.target.value)}}/> 
            </div>)
        myprofile.push(<div className="profile-element-b-field-half">
             Phone Number <input type="text" className="project-field" value={this.getphonenumber()} onChange={event=>{this.handlephonenumber(event.target.value)}}/> 
            </div>)

        myprofile.push(<div className="profile-element-b-field">
            <button onClick={event=>{this.handleSaveAllProjects(event)}} className="btn-saveprofile">
            {saveAllProfileIcon()}   </button>
            </div>)

        myprofile.push(<div className="profile-element-b-field">{this.state.message} </div>)
        return myprofile;
    }
    updatemypassword() {
        let updatemypassword = [];
        updatemypassword.push(<div className="profile-titlerow"> Update User Access </div>)
        updatemypassword.push(<div className="profile-element-b-field-half">
        <input type="password" className="project-field" id="userupdatepassword"/>
        </div>)
        updatemypassword.push(<div className="profile-element-b-field-half">
        <button onClick={event=>{this.updatepassword(event)}} className="btn-updatepassword"> 
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
        <input type="file" name="profileimage" id="uploadprofileimage"  className="project-field"/></div>)
        profileform.push(<div className="profile-element-b-field-half"> 
            <button className="uploadprofileimage"
            onClick={event=>{this.uploadprofileimage(event)}}> 
            {uploadnewProfilePictureIcon()}
            </button>
            </div>);
        profileform.push(<div className="profile-element-b-field"> Your current image is found at {this.getprofileimageurl()} </div>)
        return profileform;
    }

    getmyprofileurl() {
        return (<div className="profile-element-b-field-half">
             Profile URL <input type="text" className="project-field" value={this.getprofileurl()} onChange={event=>{this.handleprofileurl(event.target.value)}}/> 
            </div>)
    }
    showmenus() {
        let showmenu = [];
        let menus = [{ id: "myprofile", title: 'My Profile' },
            { id: "picture", title: 'Profile Picture' },
            { id: "loginpassword", title: 'Login Password' },
            { id: "payment", title: 'Payment Profile' },
            { id: "mynetwork", title: 'My Network' },

        ]
        // eslint-disable-next-line
        menus.map(menu => {
            showmenu.push(<div className="showprofilemenu-container" id={menu.id} key={menu.id} onClick={event=>{this.setState({view:menu.id})}}><span className="profile-menu-font"> {menu.title} </span></div>)
        })


        return showmenu;

    }
    handleshownetwork() {
        let shownetwork = [];

        shownetwork.push(this.shownetwork())
        return shownetwork
    }
    shownetwork() {
        let mynetwork = [];
        let network = [];
        if (this.props.searchproviders) {
            if (this.props.searchproviders.hasOwnProperty("searchproviders")) {
                let providerid = this.props.match.params.providerid;
                // eslint-disable-next-line
                this.props.searchproviders.searchproviders.map(myprovider => {
                    if (myprovider.commission === providerid) {
                        mynetwork.push(myprovider)
                    }
                })
            }
        }

        if (mynetwork.length > 0) {
            network.push(<div className="profile-main"> Your Currently have {mynetwork.length} member(s) in your network: </div>)
            // eslint-disable-next-line
            mynetwork.map(myprovider => {
                network.push(this.showprovider(myprovider))
            })
        }
        return network;
    }
    showprovider(myprovider) {
        return (<div className="profile-main"><Link to={`/${myprovider.providerid}`} className="profile-link"> {myprovider.firstname} {myprovider.lastname}</Link> </div>)
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
            case "payment":
                return (this.showstripe())
            case "mynetwork":
                return (this.handleshownetwork())
            default:
                return myview;
        }
    }
    handleProfile() {
        if (this.props.myusermodel) {
            return (
                <div className="myprofile-container">
              <div className="profile-titlerow">Your profile can be view at http://app.goandhireme.com/{this.props.match.params.providerid}  </div>
              <div className="profile-main"> <div className="profilepicture-container">{this.getprofileimage()} </div> </div>
             <div className="profile-main">Select From the Following </div>
             {this.showmenus()}
             {this.handleview()}
            </div>

            )
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
