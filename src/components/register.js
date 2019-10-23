import React, { Component } from 'react';
import './register.css';
import './svg/svg.css';
import * as actions from './actions';
import { RegisterWithEmail, checkClientIcon } from './svg'
import { connect } from 'react-redux';
import { showOccupations, UsStates, validateProviderID, validateName, validateEmail, validatePhoneNumber, validateZipcode, validatePassword } from './functions';
import { CheckProviderID, CheckCommission } from './actions/api'

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            provideridcheck: false,
            commissioncheck: false,
            provideridmsg: '',
            providerid: '',
            firstname: '',
            lastname: '',
            occupation: '',
            jobtitle: '',
            address: '',
            city: '',
            contactstate: '',
            zipcode: '',
            emailaddress: '',
            phonenumber: '',
            password: '',
            commissionmessage: 'Enter the Provider ID if you were referred by another Service Provider ?'
        }

    }

    componentDidMount() {
        this.props.reduxNavigation({ navigation: "register" })
    }
    getcommissionmessage() {
        if (this.state.commission && !this.state.commissioncheck) {
            return `Referred Provider ID is invalid `
        }
        else {
            return ``
        }
    }
    handleSubmit(event) {
        let errmsg = "";
        errmsg += validateEmail(this.state.emailaddress);
        errmsg += validatePhoneNumber(this.state.phonenumber);
        errmsg += validateZipcode(this.state.zipcode);
        errmsg += this.state.provideridmsg;
        errmsg += validatePassword(this.state.password);
        errmsg += validateName(this.state.firstname);
        errmsg += validateName(this.state.lastname)
        errmsg += this.getcommissionmessage()
        if (errmsg) {
            event.preventDefault();
            this.setState({ message: errmsg })
        }




    }
    getOccupationcategories() {
        let categories = showOccupations();
        if (categories.hasOwnProperty("length")) {
            // eslint-disable-next-line
            return (categories.map(mycategory => {
                return (<option value={mycategory.code}> {mycategory.code}-{mycategory.name}</option>)
            }))
        }
    }

    showstates() {
        const MyStates = UsStates();
        return MyStates.map((state) => {
            return (<option value={state.abbreviation} key={state.abbreviation}>{state.name} </option>)
        })

    }
    handleprofileicon() {
        if (this.state.provideridcheck) {
            return (<div className="profile-icon-container">{checkClientIcon()} </div>)
        }
        else {
            return;
        }

    }
    getprovideridmessage() {
        let message = "";
        if (this.state.provideridcheck) {
            message = `Your Profile will appear as ${process.env.REACT_APP_CLIENT_API}/${this.state.providerid}`

        }
        else {
            message = this.state.provideridmsg;
        }
        return message;
    }
    async verifyCommission() {
        let commission = this.state.commission;
        if (commission) {
            let response = await CheckCommission(commission);
            console.log(response)
            if (response.hasOwnProperty("valid")) {

                this.setState({ commissioncheck: true, commissionmessage: `${commission} is a valid ProviderID for referal` })
            }
            else {
                this.setState({ commissioncheck: false, commissionmessage: 'Enter the Provider ID if you were referred by another Service Provider ?' })
            }
        }
    }
    async verifyProviderID() {
        let providerid = this.state.providerid;

        let errmsg = validateProviderID(providerid);
        if (errmsg) {
            this.setState({ provideridcheck: false, provideridmsg: errmsg })
        }
        else {
            let response = await CheckProviderID(providerid)
            console.log(response)
            if (response.hasOwnProperty("valid")) {
                this.setState({ providerid, provideridcheck: true });
            }
            else {
                this.setState({ providerid, provideridcheck: false, provideridmsg: response.message });
            }

        }


    }
    handleProviderID(providerid) {

        let errmsg = validateProviderID(providerid);
        if (errmsg) {
            this.setState({ providerid, provideridcheck: false, provideridmsg: errmsg })
        }
        else {
            this.setState({ providerid, provideridcheck: true, provideridmsg: '' })
        }

    }
    handleform() {
        let form = [];
        if (this.state.provideridcheck) {
            form.push(<div className="register-field">  *First Name <br />
                <input type="text" name="firstname"
                    onChange={event => { this.setState({ firstname: event.target.value }) }}
                    value={this.state.firstname}
                    className="project-field" />
            </div>)
            form.push(<div className="register-field"> *Last Name  <br />
                <input type="text" name="lastname"
                    onChange={event => { this.setState({ lastname: event.target.value }) }}
                    value={this.state.lastname}
                    className="project-field" />
            </div>)
            form.push(<div className="register-field"> Occupation Category <br />
                <select name="occupation" className="project-field"
                    value={this.state.occupation}
                    onChange={event => { this.setState({ occupation: event.target.value }) }}>
                    <option value=""> Select An Occupation Category</option>
                    {this.getOccupationcategories()}
                </select>
            </div>)
            form.push(<div className="register-field"> Job Title  <br />
                <input type="text" name="jobtitle"
                    onChange={event => this.setState({ jobtitle: event.target.value })}
                    value={this.state.jobtitle}
                    className="project-field" />
            </div>)
            form.push(<div className="register-field"> Company <br />
                <input type="text" name="company"
                    onChange={event => { this.setState({ company: event.target.value }) }}
                    value={this.state.company}
                    className="project-field" />
            </div>)
            form.push(<div className="register-field"> Address <br />
                <input type="text" name="address" onChange={event => { this.setState({ address: event.target.value }) }}
                    value={this.state.address} className="project-field" />
            </div>)
            form.push(<div className="register-field"> City <br />
                <input type="text" name="city" onChange={event => { this.setState({ city: event.target.value }) }}
                    value={this.state.city} className="project-field" />
            </div>)
            form.push(<div className="register-field">State  <br />
                <select onChange={event => { this.setState({ contactstate: event.target.value }) }}
                    value={this.state.contactstate}
                    className="project-field"
                    name="contactstate">
                    <option value=""> Select State </option>
                    {this.showstates()}
                </select>
            </div>)
            form.push(<div className="register-field"> Zipcode <br />
                <input type="text" name="zipcode" onChange={event => { this.setState({ zipcode: event.target.value }) }}
                    value={this.state.zipcode} className="project-field" />
            </div>)
            form.push(<div className="register-field"> *Phone  <br />
                <input type="text" name="phonenumber" onChange={event => { this.setState({ phonenumber: event.target.value }) }}
                    value={this.state.phonenumber} className="project-field" />
            </div>)
            form.push(<div className="register-field"> *Email Address  <br />
                <input type="text" name="emailaddress" onChange={event => { this.setState({ emailaddress: event.target.value }) }}
                    value={this.state.emailaddress} className="project-field" />

            </div>)
            form.push(<div className="register-field"> *Password <br />
                <input type="password" name="password" onChange={event => { this.setState({ password: event.target.value }) }}
                    value={this.state.password} className="project-field" />
            </div>)

            form.push(<div className="register-field"> {this.state.commissionmessage} </div>)
            form.push(<div className="register-field"> <input type="text" name="commission"
                value={this.state.commission}
                onFocus={() => { this.verifyCommission() }}
                onBlur={() => { this.verifyCommission() }}
                onChange={(event) => { this.setState({ commission: event.target.value }) }}
                className="project-field" />  </div>)

            form.push(<div className="register-buttoncontainer-1">
                <button id="btnregisteremail">
                    {RegisterWithEmail()}
                </button>
            </div>)
        }
        return form;
    }
    render() {
        let formpostURL = process.env.REACT_APP_SERVER_API + "/projectmanagement/registernewuser";
        return (<form action={formpostURL} method="post"
            onSubmit={event => { this.handleSubmit(event) }}>
            <div className="register-container">
                <div className="register-titlerow">Register By Email </div>
                <div className="register-spanall register-errmessage">{this.state.message} </div>
                <div className="register-field"> ProviderID <br />
                    <input type="text" className="project-field"
                        name="providerid"
                        value={this.state.providerid}
                        onChange={event => { this.handleProviderID(event.target.value) }}
                        onFocus={event => { this.verifyProviderID(event) }}
                        onBlur={event => { this.verifyProviderID(event) }}
                    />

                </div>
                <div className="register-field">
                    {this.handleprofileicon()}
                </div>
                <div className="register-spanall">   {this.getprovideridmessage()} </div>

                {this.handleform()}
            </div>
        </form>)
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        emailaddress: state.emailaddress,
        password: state.password,
        firstname: state.firstname,
        lastname: state.lastname,
        occupation: state.occupation,
        jobtitle: state.jobtitle,
        company: state.company,
        address: state.address,
        city: state.city,
        sta: state.sta,
        phone: state.phone,
        zipcode: state.zipcode,
        providerid: state.providerid

    }
}
export default connect(mapStateToProps, actions)(Register)
