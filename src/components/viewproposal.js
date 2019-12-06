import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import './invoices.css';
import { loadmyprojects, SaveAllProjects } from './actions/api';
import {
    MyUserModel,
    sorttimes,
    inputUTCStringForLaborID,
    calculatetotalhours,
    inputUTCStringForMaterialIDWithTime,
    UTCTimefromCurrentDate,
    UTCStringFormatDateforProposal
}
    from './functions';
import { AuthorizeProposal } from './svg';

class ViewProposal extends Component {
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
        this.props.reduxNavigation({ navigation: "proposals" })
        window.addEventListener('resize', this.updateWindowDimensions);
        if (!this.props.projects.hasOwnProperty("length") && !this.props.projectsprovider.hasOwnProperty("length")) {
            let providerid = this.props.match.params.providerid;
            this.getmyprojects(providerid);
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
            let myusermodel = MyUserModel(response.providerid, response.firstname, response.lastname, response.company, response.occupation, response.jobtitle, response.laborrate, response.provideraddress, response.providercity, response.providerstate, response.providerzipcode, response.emailaddress, response.phone, response.profileurl)
            this.props.updateUserModel(myusermodel)

        }
        this.setState({ render: 'render' })
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
    showproposalrows() {
        let proposalid = this.props.match.params.proposalid;
        let myproject = this.getproject();
        let items = [];
        let proposal = [];
        if (myproject.hasOwnProperty("schedulelabor")) {
            // eslint-disable-next-line
            myproject.schedulelabor.mylabor.map(mylabor => {
                items.push(mylabor)
            })
        }
        if (myproject.hasOwnProperty("schedulematerials")) {
            // eslint-disable-next-line
            myproject.schedulematerials.mymaterial.map(mymaterial => {
                items.push(mymaterial);
            })
        }
        items.sort((a, b) => {
            return sorttimes(a.timein, b.timein)
        })
        // eslint-disable-next-line
        items.map(item => {
            if (item.proposalid === proposalid) {
                if (item.hasOwnProperty("laborid")) {
                    proposal.push(this.showlaborid(item))
                }
                else if (item.hasOwnProperty("materialid")) {
                    proposal.push(this.showmaterialid(item))
                }
            }
        })

        return proposal;

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
    getproposalamount() {
        let amount = 0;

        let proposalid = this.props.match.params.proposalid;
        let myproject = this.getproject();
        if (myproject.hasOwnProperty("schedulelabor")) {
            // eslint-disable-next-line
            myproject.schedulelabor.mylabor.map(mylabor => {
                if (mylabor.proposalid === proposalid) {
                    amount += Number(calculatetotalhours(mylabor.timeout, mylabor.timein)) * Number(mylabor.laborrate)
                }

            })
        }

        if (myproject.hasOwnProperty("schedulematerials")) {
            // eslint-disable-next-line
            myproject.schedulematerials.mymaterial.map(mymaterial => {
                if (mymaterial.proposalid === proposalid) {
                    amount += Number(mymaterial.quantity) * Number(mymaterial.unitcost)
                }
            })
        }

        return (amount)
    }
    updateauthorization(event) {
        let authorized = UTCTimefromCurrentDate();
        if (this.props.projects.hasOwnProperty("length")) {
            let projectid = this.props.match.params.projectid;
            let proposalid = this.props.match.params.proposalid;
            // eslint-disable-next-line
            this.props.projects.map((myproject, i) => {
                if (myproject.projectid === projectid) {
                    if (myproject.hasOwnProperty("proposals")) {
                        // eslint-disable-next-line
                        myproject.proposals.myproposal.map((myproposal, j) => {
                            if (myproposal.proposalid === proposalid) {
                                this.props.projects[i].proposals.myproposal[j].approved = authorized;
                                this.handleSaveAllProjects();

                                //let obj = this.props.projects;
                                //this.props.reduxProjects(obj);
                                //this.setState({ render: 'render' })
                            }
                        })
                    }
                }
            })
        }
    }
    getupdated() {
        let servicetype = this.getservicetype();
        let updated = "";
        if (servicetype === "manager") {
            let myproject = this.getproject();

            let proposalid = this.props.match.params.proposalid;
            if (myproject.hasOwnProperty("proposals")) {
                // eslint-disable-next-line
                myproject.proposals.myproposal.map(myproposal => {
                    if (myproposal.proposalid === proposalid) {
                        if (myproposal.updated) {
                            updated = UTCStringFormatDateforProposal(myproposal.updated)
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

            let proposalid = this.props.match.params.proposalid;
            if (myproject.hasOwnProperty("proposals")) {
                // eslint-disable-next-line
                myproject.proposals.myproposal.map(myproposal => {
                    if (myproposal.proposalid === proposalid) {
                        if (myproposal.approved) {
                            authorized = UTCStringFormatDateforProposal(myproposal.approved)
                        }

                    }
                })
            }
        }
        if (authorized) {
            return `Last Approved ${authorized}`
        }
        return authorized;
    }
    showauthorizebutton() {
        let authorizedbutton = [];
        let servicetype = this.getservicetype();
        if (servicetype === "manager") {
            authorizedbutton.push(<div className="show-invoice-title"><button className="main-button" onClick={event => { this.updateauthorization(event) }}>{AuthorizeProposal()} </button> </div>)
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
    async handleSaveAllProjects() {
        let providerid = this.props.myusermodel.providerid;
        let projectid = this.props.projectid.projectid;
        let myproject = this.getproject();
        let myusermodel = this.props.myusermodel;
        let values = { projectid, providerid, myusermodel, myproject }
        let response = await SaveAllProjects(values)
        console.log(response);
        if (response.hasOwnProperty("providerid")) {
            let myusermodel = MyUserModel(response.providerid, response.firstname, response.lastname, response.company, response.occupation, response.jobtitle, response.laborrate, response.address, response.city, response.contactstate, response.zipcode, response.emailaddress, response.phonenumber, response.profileurl, response.stripe)
            this.props.updateUserModel(myusermodel)
        }
        if (response.hasOwnProperty("projectsmanaging")) {
            this.props.reduxProjects(response.projectsmanaging.myproject)
        }
        if (response.hasOwnProperty("message")) {
            this.setState({ proposalmessage: `${response.message} Last Updated  ${inputUTCStringForLaborID(response.dateupdated)}` })
        }

    }
    render() {
        return (
            (
                <div className="show-invoice-container">
                    <div className="show-invoice-title">{this.showtitle()} <br /> Proposal ID {this.props.match.params.proposalid}</div>
                    <div className="materials-main">{this.showproposalrows()}</div>
                    <div className="invoice-amount-container">The total amount of the proposal is ${this.getproposalamount().toFixed(2)} </div>
                    {this.showauthorizebutton()}
                </div>))

    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        projectid: state.projectid,
        projects: state.projects,
        projectsprovider: state.projectsprovider
    }
}

export default connect(mapStateToProps, actions)(ViewProposal)
