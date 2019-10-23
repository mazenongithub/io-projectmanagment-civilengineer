import React, { Component } from 'react';
import { loadmyprojects, CheckProviderID, CheckCommission } from './actions/api';
import { MyUserModel, validateEmail, validateProviderID } from './functions';
import './register.css';
import { connect } from 'react-redux';
import { CompleteProfileIcon, checkClientIcon } from './svg';
import * as actions from './actions';

class ClientRegister extends Component {
    constructor(props) {
        super(props);
        this.state = { commissioncheck: false, message: "", checkproviderid: true, provideridmsg: '' }
    }
    componentDidMount() {

        let providerid = this.props.match.params.providerid;
        this.getmyprojects(providerid);



    }
    async getmyprojects(providerid) {
        let response = await loadmyprojects(providerid);
        if (response.hasOwnProperty("providerid")) {
            let myusermodel = MyUserModel(response.providerid, response.firstname, response.lastname, response.company, response.occupation, response.jobtitle, response.laborrate, response.address, response.city, response.contactstate, response.zipcode, response.emailaddress, response.phonenumber, response.profileurl, response.stripe)
            this.props.updateUserModel(myusermodel)

        }
        this.setState({ render: 'render' })
    }
    getcommissionerr() {
        let message = "";
        if (!this.state.commissioncheck) {
            message = `${this.props.myusermodel.commission} is not a valid provider`
        }
        return message;
    }
    handleSubmit(event) {
        let errmsg = "";
        errmsg = validateEmail(this.props.myusermodel.emailaddress);
        errmsg += this.getcommissionerr();
        if (errmsg) {
            event.preventDefault();
            this.setState({ message: errmsg })

        }
        return;

    }
    getproviderid() {
        let providerid = "";
        if (this.props.myusermodel) {
            providerid = this.props.myusermodel.providerid
        }
        return providerid;
    }
    handleproviderid(providerid) {
        let errmsg = validateProviderID(providerid);

        this.props.myusermodel.providerid = providerid;
        let myusermodel = this.props.myusermodel;
        this.props.updateUserModel(myusermodel);
        if (!errmsg) {
            this.setState({ provideridcheck: true, provideridmsg: '' })
        }
        else {
            this.setState({ provideridcheck: false, provideridmsg: errmsg })
        }

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
    getphone() {
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
    getprofilemessage() {
        let message = "";

        if (this.props.myusermodel.hasOwnProperty("providerid")) {

            let providerid = this.props.myusermodel.providerid;
            if (this.state.provideridcheck) {
                message = `Your Profile will be http://app.goandhireme.com/${providerid}`
            }
            else {
                message = this.state.provideridmsg;
            }
        }
        return message;
    }
    async verifyProviderID() {
        if (this.props.myusermodel) {
            let providerid = this.props.myusermodel.providerid;
            if (providerid !== this.props.match.params.providerid) {
                let errmsg = validateProviderID(providerid);
                if (errmsg) {
                    this.setState({ provideridcheck: false, provideridmsg: errmsg })
                }
                else {
                    let response = await CheckProviderID(providerid)

                    if (response.hasOwnProperty("valid")) {
                        this.setState({ provideridcheck: true, provideridmsg: '' });
                    }
                    else {
                        this.setState({ provideridcheck: false, provideridmsg: response.message });
                    }

                }

            }
        }
    }
    handleprofileicon() {
        if (this.state.provideridcheck) {
            return (<div className="profile-icon-container">{checkClientIcon()} </div>)
        }
        else {
            return;
        }

    }
    getcommission() {
        let commission = "";
        if (this.props.myusermodel) {
            commission = this.props.myusermodel.commission;
        }
        return commission;
    }
    getcommissionmessage() {
        let message = "";
        if (this.props.myusermodel) {
            if (this.props.myusermodel.commission && !this.state.commissioncheck) {
                message = `Provider ID ${this.props.myusermodel.commission} is an invalid  referal`
            }
            else if (this.props.myusermodel.commission && this.state.commissioncheck) {
                message = `Provider ID ${this.props.myusermodel.commission} is a valid  referal`
            }
            else if (!this.props.myusermodel.commission) {
                message = `Enter the ID of the Provider if you were referred`
            }
        }
        return message;

    }
    handleCommission(commission) {
        let obj = this.props.myusermodel;
        obj.commission = commission
        this.props.updateUserModel(obj);
        this.setState({ render: 'render' });
    }
    async verifyCommission() {
        let commission = this.props.myusermodel.commission;
        if (commission) {
            let response = await CheckCommission(commission);
            console.log(response)
            if (response.hasOwnProperty("valid")) {

                this.setState({ commissioncheck: true })
            }
            else {
                this.setState({ commissioncheck: false })
            }
        }
    }
    handleClientRegister() {


        let formpostURL = process.env.REACT_APP_SERVER_API + "/projectmanagement/updateclientregister";
        return (<form action={formpostURL} method="post"
            onSubmit={event => { this.handleSubmit(event) }}>
            <div className="register-container">
                <div className="register-titlerow">Complete Your Profile To Register</div>

                <div className="register-field">
                    Choose a Provider ID <br />
                    <input type="text" className="project-field" name="newproviderid" value={this.getproviderid()}
                        onChange={event => { this.handleproviderid(event.target.value) }}
                        onFocus={event => { this.verifyProviderID(event) }}
                        onBlur={event => { this.verifyProviderID(event) }} />
                </div>
                <div className="register-field">{this.handleprofileicon()}</div>

                <div className="register-spanall">
                    {this.getprofilemessage()}
                </div>


                <div className="register-field">First Name <br /><input name="firstname" type="text" value={this.getfirstname()} onChange={event => { this.handlefirstname(event.target.value) }} className="project-field" /> </div>
                <div className="register-field">Last Name <br /><input type="text" name="lastname" className="project-field" value={this.getlastname()} onChange={event => { this.handlelastname(event.target.value) }} /> </div>
                <div className="register-field">Company <br /><input type="text" name="company" className="project-field" value={this.getcompany()} onChange={event => { this.handlecompany(event.target.value) }} /> </div>
                <div className="register-field">Job Title <input type="text" name="jobtitle" className="project-field" value={this.getjobtitle()} onChange={event => { this.handlejobtitle(event.target.value) }} /> </div>
                <div className="register-field">Address<input type="text" name="address" className="project-field" value={this.getaddress()} onChange={event => { this.handleaddress(event.target.value) }} /> </div>
                <div className="register-field">City<input type="text" name="city" className="project-field" value={this.getcity()} onChange={event => { this.handlecity(event.target.value) }} /> </div>
                <div className="register-field">State<input type="text" name="sta" className="project-field" onChange={event => { this.handlestate(event.target.value) }} value={this.getstate()} /> </div>
                <div className="register-field">Zipcode<input type="text" name="zipcode" className="project-field" value={this.getzipcode()} onChange={event => { this.handlezipcode(event.target.value) }} /> </div>
                <div className="register-field">Email Address<input type="text" name="emailaddress" className="project-field" value={this.getemail()} onChange={event => { this.handleemail(event.target.value) }} /> </div>
                <div className="register-field">Phone Number<input type="text" name="phonenumber" className="project-field" value={this.getphone()} onChange={event => { this.handlephonenumber(event.target.value) }} /> </div>
                <div className="register-field">{this.getcommissionmessage()} </div>
                <div className="register-field"><input type="text" name="commission"
                    value={this.getcommission()}
                    onFocus={() => { this.verifyCommission() }}
                    onBlur={() => { this.verifyCommission() }}
                    onChange={(event) => { this.handleCommission(event.target.value) }}
                    className="project-field" /> </div>
                <div className="register-button-container">{this.state.message}</div>
                <div className="register-button-container"><button className="button-completeprofile"> {CompleteProfileIcon()} </button></div>
            </div>

        </form>)

    }
    render() { return (this.handleClientRegister()) }


}


function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel

    }
}
export default connect(mapStateToProps, actions)(ClientRegister)
