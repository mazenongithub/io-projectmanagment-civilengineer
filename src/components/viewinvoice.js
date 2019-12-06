import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import './invoices.css';
import { loadmyprojects, LoadMyProviders, handleStripePayment } from './actions/api';
import StripeCheckout from 'react-stripe-checkout';
import {
    MyUserModel,
    sorttimes,
    inputUTCStringForLaborID,
    calculatetotalhours,
    inputUTCStringForMaterialIDWithTime,
    UTCStringFormatDateforProposal
}
    from './functions';
//import { AuthorizeProposal } from './svg';

class ViewInvoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: '',
            width: 0,
            height: 0,
            message: ""
        }

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    }
    componentDidMount() {
        let projectid = this.props.match.params.projectid;
        this.props.ProjectID({ projectid });
        this.props.reduxNavigation({ navigation: "invoices" })
        window.addEventListener('resize', this.updateWindowDimensions);
        if (!this.props.projects.hasOwnProperty("length") && !this.props.projectsprovider.hasOwnProperty("length")) {
            let providerid = this.props.match.params.providerid;
            this.getmyprojects(providerid);
        }
        if (!this.props.searchproviders.hasOwnProperty("searchproviders")) {
            this.loadmysearchproviders()
        }
        this.updateWindowDimensions()
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });

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
    async loadmysearchproviders() {
        let response = await LoadMyProviders();
        console.log(response)
        let myprovider = response.searchproviders.myprovider
        this.props.searchProviders({ searchproviders: myprovider })
    }
    getproject() {
        let projectid = this.props.match.params.projectid;
        let servicetype = this.getservicetype();
        let project = false;
        if (servicetype === "manager") {
            // eslint-disable-next-line
            this.props.projects.map(myproject => {
                if (myproject.projectid === projectid) {
                    project = myproject;
                }
            })
        }
        else if (servicetype === "provider") {
            // eslint-disable-next-line
            this.props.projectsprovider.map(myproject => {
                if (myproject.projectid === projectid) {
                    project = myproject;
                }
            })
        }
        return project;
    }
    getservicetype() {
        let servicetype = false;
        if (this.props.projects || this.props.projectsprovider) {
            let projectid = this.props.match.params.projectid;

            if (this.props.projects.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projects.map(myproject => {
                    if (myproject.projectid === projectid) {
                        servicetype = "manager"
                    }
                })

            }
            if (!servicetype) {

                if (this.props.projectsprovider.hasOwnProperty("length")) {
                    // eslint-disable-next-line
                    this.props.projectsprovider.map(myproject => {
                        if (myproject.projectid === projectid) {
                            servicetype = "provider"
                        }
                    })
                }
            }
        }
        return servicetype;
    }
    showtitle() {
        let myproject = this.getproject();
        return `ProjectID ${myproject.projectid}/${myproject.title}`
    }
    showinvoicerows() {
        let myproject = this.getproject();
        let items = [];
        let invoice = [];
        let invoiceid = this.props.match.params.invoiceid;
        if (myproject.hasOwnProperty("actuallabor")) {
            // eslint-disable-next-line
            myproject.actuallabor.mylabor.map(mylabor => {
                items.push(mylabor)
            })
        }
        if (myproject.hasOwnProperty("actualmaterials")) {
            // eslint-disable-next-line
            myproject.actualmaterials.mymaterial.map(mymaterial => {
                items.push(mymaterial);
            })
        }
        items.sort((a, b) => {
            return sorttimes(a.timein, b.timein)
        })
        // eslint-disable-next-line
        items.map(item => {
            if (item.invoiceid === invoiceid) {
                if (item.hasOwnProperty("laborid")) {
                    invoice.push(this.showlaborid(item))
                }
                else if (item.hasOwnProperty("materialid")) {
                    invoice.push(this.showmaterialid(item))
                }
            }
        })

        return invoice;

    }
    showmaterialid(mymaterial) {
        return (<div className="general-flex">
            <div className="flex-7">

                <span className="regularFont">{inputUTCStringForMaterialIDWithTime(mymaterial.timein)}</span><br />
                <span className="regularFont">{mymaterial.description}</span><br />
                <span className="regularFont">{mymaterial.quantity} {mymaterial.unit} ${mymaterial.unitcost} = ${(mymaterial.quantity * mymaterial.unitcost).toFixed(2)}</span>

            </div>

        </div>)
    }
    showlaborid(mylabor) {
        return (
            <div className="general-flex">
                <div className="flex-1">
                    <span className="regularFont">{mylabor.description}</span> <br />
                    <span className="regularFont">From {inputUTCStringForLaborID(mylabor.timein)} to {inputUTCStringForLaborID(mylabor.timeout)}</span><br />
                    <span className="regularFont">${Number(mylabor.laborrate).toFixed(2)}/Hr x {calculatetotalhours(mylabor.timeout, mylabor.timein)} Hrs = ${(Number(calculatetotalhours(mylabor.timeout, mylabor.timein)) * Number(mylabor.laborrate)).toFixed(2)}</span>
                </div>

            </div>
        )

    }
    getinvoiceamount() {
        let amount = 0;

        let invoiceid = this.props.match.params.invoiceid;
        let myproject = this.getproject();
        if (myproject.hasOwnProperty("actuallabor")) {
            // eslint-disable-next-line
            myproject.actuallabor.mylabor.map(mylabor => {
                if (mylabor.invoiceid === invoiceid) {
                    amount += Number(calculatetotalhours(mylabor.timeout, mylabor.timein)) * Number(mylabor.laborrate)
                }

            })
        }

        if (myproject.hasOwnProperty("actualmaterials")) {
            // eslint-disable-next-line
            myproject.actualmaterials.mymaterial.map(mymaterial => {
                if (mymaterial.invoiceid === invoiceid) {
                    amount += Number(mymaterial.quantity) * Number(mymaterial.unitcost)
                }
            })
        }

        return (amount)
    }
    getupdated() {
        let servicetype = this.getservicetype();
        let updated = "";
        if (servicetype === "manager") {
            let myproject = this.getproject();

            let invoiceid = this.props.match.params.invoiceid;
            if (myproject.hasOwnProperty("invoices")) {
                // eslint-disable-next-line
                myproject.invoices.myinvoice.map(myinvoice => {
                    if (myinvoice.invoiceid === invoiceid) {
                        if (myinvoice.updated) {
                            updated = UTCStringFormatDateforProposal(myinvoice.updated)
                        }

                    }
                })
            }
        }
        if (updated) {
            return `Last Updated ${updated}`
        }
        return updated;
    }

    getauthorized() {
        let servicetype = this.getservicetype();
        let authorized = "";
        if (servicetype === "manager") {
            let myproject = this.getproject();

            let invoiceid = this.props.match.params.invoiceid;
            if (myproject.hasOwnProperty("invoices")) {
                // eslint-disable-next-line
                myproject.invoices.myinvoice.map(myinvoice => {
                    if (myinvoice.invoiceid === invoiceid) {
                        if (myinvoice.approved) {
                            authorized = UTCStringFormatDateforProposal(myinvoice.approved)
                        }

                    }
                })
            }
        }
        if (authorized) {
            return `Paid on ${authorized}`
        }
        return authorized;
    }
    getprovideridfrominvoiceid(invoiceid) {
        let servicetype = this.getservicetype();
        let obj = [];
        let providerid = "";
        if (servicetype === "manager") {
            obj = this.props.projects;
        }
        else if (servicetype === "provider") {
            obj = this.props.projectsprovider;
        }
        if (obj.length > 0) {
            let projectid = this.props.match.params.projectid;
            // eslint-disable-next-line
            obj.map(myproject => {
                if (myproject.projectid === projectid) {

                    if (myproject.hasOwnProperty("invoices")) {
                        // eslint-disable-next-line
                        myproject.invoices.myinvoice.map(myinvoice => {
                            if (myinvoice.invoiceid === invoiceid) {
                                providerid = myinvoice.providerid;
                            }
                        })
                    }
                }
            })
        }
        return providerid;
    }
    getproviderfromid(providerid) {
        let provider = {};
        if (this.props.searchproviders) {
            if (this.props.searchproviders.hasOwnProperty("searchproviders")) {

                // eslint-disable-next-line
                this.props.searchproviders.searchproviders.map(myprovider => {
                    if (myprovider.providerid === providerid) {
                        provider = myprovider;
                    }
                })
            }
        }
        return provider;
    }
    getlinktopay() {
        let stripeform = [];

        let servicetype = this.getservicetype();
        if (servicetype === "manager") {
            let invoiceid = this.props.match.params.invoiceid;
            let providerid = this.getprovideridfrominvoiceid(invoiceid);
            console.log(providerid)
            let myprovider = this.getproviderfromid(providerid);
            console.log(myprovider)
            if (myprovider.stripe) {

                stripeform.push(this.stripeform())
            }

        }
        return stripeform;
    }
    async processStripe(token) {
        let providerid = this.props.match.params.providerid;
        let projectid = this.props.match.params.projectid;
        let invoiceid = this.props.match.params.invoiceid;
        let amount = Math.round(this.getinvoiceamount() * 100);

        let values = { providerid, projectid, token, invoiceid, amount }
        let response = await handleStripePayment(values);
        if (response.hasOwnProperty("projectsmanaging")) {
            this.props.reduxProjects(response.projectsmanaging.myproject)
        }
        if (response.hasOwnProperty("message")) {
            this.setState({ message: `${response.message} Last Updated  ${inputUTCStringForLaborID(response.dateupdated)}` })
        }

    }
    stripeform() {
        let invoiceid = this.props.match.params.invoiceid;
        let amount = Math.round(this.getinvoiceamount() * 100)

        return (
            <StripeCheckout
                name="goandhireme"
                description={`Payment on Invoice ID ${invoiceid}`}
                amount={amount}
                token={token => this.processStripe(token)}
                stripeKey={process.env.REACT_APP_STRIPE_PUBLIC}
            />
        )

    }
    showauthorizebutton() {
        let authorizedbutton = [];
        let servicetype = this.getservicetype();
        if (servicetype === "manager") {
            authorizedbutton.push(<div className="show-invoice-title">{this.getlinktopay()}</div>)
            authorizedbutton.push(<div className="invoice-amount-container"> {this.state.message} </div>)
            authorizedbutton.push(<div className="invoice-amount-container"> {this.getupdated()}</div>);
            authorizedbutton.push(<div className="invoice-amount-container"> {this.getauthorized()}</div>);

        }
        else if (servicetype === "provider") {
            authorizedbutton.push(<div className="invoice-amount-container"> {this.state.message} </div>)
            authorizedbutton.push(<div className="invoice-amount-container"> {this.getupdated()}</div>);
            authorizedbutton.push(<div className="invoice-amount-container"> {this.getauthorized()}</div>);
        }
        return authorizedbutton;

    }
    render() {
        return (
            (
                <div className="show-invoice-container">
                    <div className="show-invoice-title">{this.showtitle()} <br /> Invoice ID {this.props.match.params.invoiceid}</div>
                    <div className="materials-main">{this.showinvoicerows()}</div>
                    <div className="invoice-amount-container">The total amount of the invoice is ${this.getinvoiceamount().toFixed(2)} </div>
                    {this.showauthorizebutton()}
                </div>))

    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        projectid: state.projectid,
        projects: state.projects,
        projectsprovider: state.projectsprovider,
        searchproviders: state.searchproviders
    }
}

export default connect(mapStateToProps, actions)(ViewInvoice)
