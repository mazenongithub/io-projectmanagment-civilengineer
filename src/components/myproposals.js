import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { ProviderEndPoint, InsertProposal } from './actions/api'
import './proposals.css';
import {
    sorttimes,
    inputUTCStringForLaborID,
    calculatetotalhours,
    validateLaborRate,
    inputUTCStringForMaterialIDWithTime,
    UTCTimefromCurrentDate,
    UTCStringFormatDateforProposal

}
    from './functions';
import './createinvoice.css';
import {
    createProposalIcon,
    clearProposalIDIcon,
    removeIcon,
    SaveAllProjectIcon
}
    from './svg';


class MyProposals extends Component {

    constructor(props) {
        super(props)
        this.state = {
            render: '',
            proposalidmsg: 'Proposal ID is clear, Click to Create A New Proposal',
            message: "",
            activeproposalid: "",
            width: "",
            height: ""
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);

    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });

    }

    loadproposalids() {
        let proposalids = []
        if (this.props.projectsprovider.hasOwnProperty("length")) {
            let projectid = this.props.projectid.projectid;
            // eslint-disable-next-line
            this.props.projectsprovider.map(myproject => {
                if (myproject.projectid === projectid) {
                    if (myproject.hasOwnProperty("proposals")) {
                        // eslint-disable-next-line
                        myproject.proposals.myproposal.map(myproposal => {

                            proposalids.push(this.showproposalid(myproposal))
                        })
                    }
                }
            })
        }
        return proposalids;
    }
    showproposalicon(proposalid) {

        return (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 599 115"><defs><style></style></defs>
            <title>proposalid</title>
            <g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1">
                <rect className="proposalid-1" x="8.5" y="0.5" width="590" height="114" rx="8.69" />
                <text className="proposalid-2" transform="translate(129.72 65.7)"><tspan className="proposalid-3">
                    Pr</tspan><tspan className="proposalid-4" x="39.12" y="0">oposalID</tspan>
                    <tspan x="200.72" y="0">{proposalid} </tspan></text></g></g></svg>)
    }
    findproposal(proposalid) {
        if (this.state.activeproposalid === proposalid) {
            this.setState({ activeproposalid: "" })
        } else {
            this.setState({ activeproposalid: proposalid })
        }


    }
    deleteProposal(proposalid) {
        if (window.confirm(`Are you sure you want to delete Proposal ID ${proposalid}?`)) {
            if (this.props.projectsprovider.hasOwnProperty("length")) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("schedulelabor")) {
                            // eslint-disable-next-line
                            myproject.schedulelabor.mylabor.map((mylabor, j) => {
                                if (mylabor.proposalid === proposalid) {
                                    this.props.projectsprovider[i].schedulelabor.mylabor[j].proposalid = "";
                                }


                            })
                        }

                        if (myproject.hasOwnProperty("schedulematerials")) {
                            // eslint-disable-next-line
                            myproject.schedulematerials.mymaterial.map((mymaterial, j) => {
                                if (mymaterial.proposalid === proposalid) {
                                    this.props.projectsprovider[i].schedulematerials.mymaterial[j].proposalid = "";
                                }


                            })

                        }

                        if (myproject.hasOwnProperty("proposals")) {
                            // eslint-disable-next-line
                            myproject.proposals.myproposal.map((myproposal, j) => {
                                if (myproposal.proposalid === proposalid) {
                                    this.props.projectsprovider[i].proposals.myproposal.splice(j, 1)
                                }
                            })
                        }
                    }
                })

                let obj = this.props.projectsprovider;
                this.props.projectsProvider(obj);
                this.setState({ activeproposalid: "" })
            }
        }
    }
    getactiveproposalmessage(proposalid) {
        if (this.state.activeproposalid) {
            if (this.state.activeproposalid === proposalid) {
                return (` is Active`)
            }
        }
    }
    getdeactivate(proposalid) {
        if (this.state.activeproposalid) {
            if (this.state.activeproposalid === proposalid) {
                return (<div className="general-flex">
                    <div className="flex-1">

                    </div>

                </div>)
            }
        }
    }
    getactiveproposalcontainer(proposalid) {

        let proposal = "";
        if (this.state.activeproposalid === proposalid) {
            proposal = `activeproposal-container`
        } else {
            proposal = `inactiveproposal`
        }

        return proposal;
    }
    showproposalid(myproposal) {

        return (<div className="general-flex addBottomMargin">
            <div className={`flex-2 regularFont proposalid-container ${this.getactiveproposalcontainer(myproposal.proposalid)}`} onClick={() => { this.findproposal(myproposal.proposalid) }}>Proposal ID {myproposal.proposalid} {this.getactiveproposalmessage(myproposal.proposalid)}</div>
            <div className="flex-1 regularFont alignTop addLeftMargin align-contentCenter"> <button className="general-button remove-item" onClick={event => { this.deleteProposal(myproposal.proposalid) }}>{removeIcon()}</button><br />remove</div>
        </div>)
    }
    getproject() {
        let project = {};
        if (this.props.projectsprovider.hasOwnProperty("length")) {
            let projectid = this.props.projectid.projectid;
            // eslint-disable-next-line
            this.props.projectsprovider.map(myproject => {
                if (myproject.projectid === projectid) {
                    project = myproject;
                }
            })
        }
        return project;
    }
    getactiveproposal() {
        let proposal = {};
        if (this.state.activeproposalid) {
            let proposalid = this.state.activeproposalid;
            let myproject = this.getproject();
            if (myproject.hasOwnProperty("proposals")) {
                // eslint-disable-next-line
                myproject.proposals.mypropsal.map(myproposal => {
                    if (myproposal.proposalid === proposalid) {
                        proposal = myproposal;
                    }
                })
            }
        }
        return proposal;
    }
    getprojecttitle() {
        let title = "";
        if (this.props.projectsprovider.hasOwnProperty("length")) {
            let myproject = this.getproject()
            title = `${myproject.projectid}/${myproject.title}`
        }

        return title;
    }
    clearproposalid(event) {
        this.setState({
            activeproposalid: "",
            proposalidmsg: 'Proposal ID is clear, Click to Create A New Proposal',
            message: ''
        })
    }
    validateproject() {
        let errmsg = "";
        if (this.props.projectsprovider) {
            let projectid = this.props.projectid.projectid;
            // eslint-disable-next-line
            this.props.projectsprovider.map(myproject => {
                if (myproject.projectid === projectid) {
                    if (myproject.hasOwnProperty("schedulelabor")) {
                        // eslint-disable-next-line
                        myproject.schedulelabor.mylabor.map(mylabor => {
                            if (!mylabor.milestoneid) {
                                errmsg = `${mylabor.laborid} is missing a milestone `
                            }
                            errmsg += `${validateLaborRate(mylabor.laborrate)}`
                        })
                    }

                    if (myproject.hasOwnProperty("schedulematerials")) {
                        // eslint-disable-next-line
                        myproject.schedulematerials.mymaterial.map(mymaterial => {
                            if (!mymaterial.milestoneid) {
                                errmsg = `${mymaterial.materialid} is missing a milestone `

                            }
                            errmsg += `${validateLaborRate(mymaterial.unitcost)}`
                            errmsg += `${validateLaborRate(mymaterial.quantity)}`
                        })
                    }


                }
            })
        }

        return errmsg;

    }
    async createnewproposal() {
        let errmsg = this.validateproject();
        if (!errmsg) {
            let providerid = this.props.myusermodel.providerid;
            let projectid = this.props.projectid.projectid;
            let myproject = this.getproject();
            let values = { providerid, projectid, myproject }
            let response = await InsertProposal(values);
            console.log(response);
            if (response.hasOwnProperty("projectsprovider")) {
                let updatedproject = response.projectsprovider.myproject[0];
                if (this.props.projectsprovider.hasOwnProperty("length")) {
                    // eslint-disable-next-line
                    this.props.projectsprovider.map((myproject, i) => {
                        if (myproject.projectid === projectid) {
                            this.props.projectsprovider[i] = updatedproject;
                            let obj = this.props.projectsprovider;
                            let dateupdated = inputUTCStringForLaborID(response.dateupdated)
                            this.props.projectsProvider(obj);
                            this.setState({ activeproposalid: response.insertproposal, proposalidmsg: `Active Proposal ID is ${response.insertproposal}, Select Items to Add to the Proposal `, message: `Last Updated ${response.message} ${dateupdated}` })
                        }
                    })
                }
            }
        }
        else {
            this.setState({ message: errmsg })
        }

    }
    handletopIcon() {
        if (this.state.activeproposalid) {
            return (<button className="proposals-button" onClick={event => { this.clearproposalid(event) }}>{clearProposalIDIcon()}</button>)
        }
        else {
            return (<button className="proposals-button" onClick={event => { this.createnewproposal() }}>{createProposalIcon()}</button>)
        }
    }
    getproposalamount() {
        let amount = 0;
        if (this.state.activeproposalid) {
            let proposalid = this.state.activeproposalid;
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
        }
        return (`$${amount.toFixed(2)}`)
    }
    loadproposalitems() {
        let items = [];
        let proposal = [];

        if (this.state.activeproposalid) {
            proposal.push(<div className="proposal-main-row addBottomMargin">Viewing All Proposed Schedule, Add the Item to the Proposal {this.state.activeproposalid}</div>)
            if (this.props.projectsprovider.hasOwnProperty("length")) {
                let myproject = this.getproject();
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
            }
            items.sort((a, b) => {
                return sorttimes(a.timein, b.timein)
            })
            // eslint-disable-next-line
            items.map(item => {
                if (item.hasOwnProperty("laborid")) {
                    proposal.push(this.showlaborid(item))
                }
                else if (item.hasOwnProperty("materialid")) {
                    proposal.push(this.showmaterialid(item))
                }
            })
            proposal.push(<div className="proposal-title-row addBottomMargin"> The Total Amount for Proposal {this.state.activeproposalid} is {this.getproposalamount()}</div>)

        }
        return proposal;
    }
    findmymaterial(materialid) {

        let material = {};
        let myproject = this.getproject();
        if (myproject.hasOwnProperty("schedulematerials")) {
            // eslint-disable-next-line
            myproject.schedulematerials.mymaterial.map(mymaterial => {
                if (mymaterial.materialid === materialid) {
                    material = mymaterial;
                }
            })
        }
        return material;

    }
    getmylabor(laborid) {

        let myproject = this.getproject();
        let labor = {};
        if (myproject.hasOwnProperty("schedulelabor")) {
            // eslint-disable-next-line
            myproject.schedulelabor.mylabor.map(mylabor => {
                if (mylabor.laborid === laborid) {

                    labor = mylabor;
                }
            })
        }
        return labor;
    }
    handlematerialicon(materialid) {
        if (this.state.activeproposalid) {
            let proposalid = this.state.activeproposalid;
            let mymaterial = this.findmymaterial(materialid)
            if (mymaterial.proposalid === proposalid) {
                return (<button className="remove-item general-button" onClick={event => { this.removematerial(materialid) }}>
                    {removeIcon()}
                </button>)
            }
            else {
                return (<span>&nbsp;</span>)
            }
        }

    }
    addlabor(laborid) {
        if (this.state.activeproposalid) {
            let proposalid = this.state.activeproposalid;
            // eslint-disable-next-line
            this.props.projectsprovider.map((myproject, i) => {
                let projectid = this.props.projectid.projectid;
                if (myproject.projectid === projectid) {
                    if (myproject.hasOwnProperty("schedulelabor")) {
                        // eslint-disable-next-line
                        myproject.schedulelabor.mylabor.map((mylabor, j) => {
                            if (mylabor.laborid === laborid) {
                                this.props.projectsprovider[i].schedulelabor.mylabor[j].proposalid = proposalid;
                                this.updatetime(proposalid)
                                let obj = this.props.projectsprovider;
                                this.props.projectsProvider(obj)
                                this.setState({ render: 'render' })
                            }
                        })
                    }
                }
            })
        }
    }


    removelabor(laborid) {
        if (this.state.activeproposalid) {
            let proposalid = this.state.activeproposalid;
            // eslint-disable-next-line
            this.props.projectsprovider.map((myproject, i) => {
                let projectid = this.props.projectid.projectid;
                if (myproject.projectid === projectid) {
                    if (myproject.hasOwnProperty("schedulelabor")) {
                        // eslint-disable-next-line
                        myproject.schedulelabor.mylabor.map((mylabor, j) => {
                            if (mylabor.laborid === laborid) {
                                this.props.projectsprovider[i].schedulelabor.mylabor[j].proposalid = "";
                                this.updatetime(proposalid)
                                let obj = this.props.projectsprovider;
                                this.props.projectsProvider(obj)
                                this.setState({ render: 'render' })
                            }
                        })
                    }
                }
            })
        }
    }
    addmaterial(materialid) {
        if (this.state.activeproposalid) {
            let proposalid = this.state.activeproposalid;
            // eslint-disable-next-line
            this.props.projectsprovider.map((myproject, i) => {
                let projectid = this.props.projectid.projectid;
                if (myproject.projectid === projectid) {
                    if (myproject.hasOwnProperty("schedulematerials")) {
                        // eslint-disable-next-line
                        myproject.schedulematerials.mymaterial.map((mymaterial, j) => {
                            if (mymaterial.materialid === materialid) {
                                this.props.projectsprovider[i].schedulematerials.mymaterial[j].proposalid = proposalid;
                                this.updatetime(proposalid)
                                let obj = this.props.projectsprovider;
                                this.props.projectsProvider(obj)
                                this.setState({ render: 'render' })
                            }
                        })
                    }
                }
            })
        }
    }
    updatetime(proposalid) {
        if (this.props.projectsprovider.hasOwnProperty("length")) {
            let projectid = this.props.projectid.projectid;
            // eslint-disable-next-line
            this.props.projectsprovider.map((myproject, i) => {
                if (myproject.projectid === projectid) {
                    if (myproject.hasOwnProperty("proposals")) {
                        // eslint-disable-next-line
                        myproject.proposals.myproposal.map((myproposal, j) => {
                            if (myproposal.proposalid === proposalid) {

                                this.props.projectsprovider[i].proposals.myproposal[j].updated = UTCTimefromCurrentDate();
                            }
                        })
                    }
                }
            })
        }
    }

    removematerial(materialid) {

        if (this.state.activeproposalid) {
            let proposalid = this.state.activeproposalid;
            // eslint-disable-next-line
            this.props.projectsprovider.map((myproject, i) => {
                let projectid = this.props.projectid.projectid;
                if (myproject.projectid === projectid) {
                    if (myproject.hasOwnProperty("schedulematerials")) {
                        // eslint-disable-next-line
                        myproject.schedulematerials.mymaterial.map((mymaterial, j) => {
                            if (mymaterial.materialid === materialid) {
                                this.props.projectsprovider[i].schedulematerials.mymaterial[j].proposalid = "";
                                this.updatetime(proposalid)
                                let obj = this.props.projectsprovider;
                                this.props.projectsProvider(obj)
                                this.setState({ render: 'render' })
                            }
                        })
                    }
                }
            })
        }
    }

    handlelaboricon(laborid) {
        if (this.state.activeproposalid) {
            let proposalid = this.state.activeproposalid;
            let mylabor = this.getmylabor(laborid)
            if (mylabor.proposalid === proposalid) {
                return (<button className="remove-item general-button" onClick={event => { this.removelabor(mylabor.laborid) }}>
                    {removeIcon()}
                </button>)
            }
            else {
                return (<span>&nbsp;</span>)
            }
        }

    }
    showlaborid(mylabor) {

        return (
            <div className="general-flex addBottomMargin">
                <div className="flex-7" onClick={event => { this.addlabor(mylabor.laborid) }}>
                    <span className="regularFont">{mylabor.description}</span> <br />
                    <span className="regularFont">From {inputUTCStringForLaborID(mylabor.timein)} to {inputUTCStringForLaborID(mylabor.timeout)}</span><br />
                    <span className="regularFont">${Number(mylabor.laborrate).toFixed(2)}/Hr x {calculatetotalhours(mylabor.timeout, mylabor.timein)} Hrs = ${(Number(calculatetotalhours(mylabor.timeout, mylabor.timein)) * Number(mylabor.laborrate)).toFixed(2)}</span>
                </div>
                <div className="flex-1 align-contentCenter">
                    {this.handlelaboricon(mylabor.laborid)}

                </div>

            </div>
        )

    }
    showmaterialid(mymaterial) {
        return (<div className="general-flex addBottomMargin">
            <div className="flex-7" ame="laborid-icon" onClick={event => { this.addmaterial(mymaterial.materialid) }}>

                <span className="regularFont">{inputUTCStringForMaterialIDWithTime(mymaterial.timein)}</span><br />
                <span className="regularFont">{mymaterial.description}</span><br />
                <span className="regularFont">{mymaterial.quantity} {mymaterial.unit} ${mymaterial.unitcost} = ${(mymaterial.quantity * mymaterial.unitcost).toFixed(2)}</span>

            </div>
            <div className="flex-1 align-contentCenter">
                {this.handlematerialicon(mymaterial.materialid)}
            </div>
        </div>)
    }
    async saveallprojects() {
        let providerid = this.props.myusermodel.providerid;
        let projectid = this.props.projectid.projectid;
        let myproject = this.getproject();

        let values = { providerid, projectid, myproject }

        let response = await ProviderEndPoint(values);
        console.log(response)
        if (response.hasOwnProperty("projectsprovider")) {
            let updatedproject = response.projectsprovider.myproject[0];
            if (this.props.projectsprovider.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        this.props.projectsprovider[i] = updatedproject;
                        let obj = this.props.projectsprovider;
                        this.props.projectsProvider(obj);
                        let dateupdated = inputUTCStringForLaborID(response.dateupdated)
                        this.setState({ message: `${response.message} Last Updated ${dateupdated}`, activeproposalid: this.searchresponseforactiveid(response) })


                    }
                })
            }
        }

    }
    searchresponseforactiveid(response) {
        let activeproposalid = this.state.activeproposalid;
        let proposalid = "";
        if (activeproposalid) {
            let myproject = response.projectsprovider.myproject[0];
            if (myproject.hasOwnProperty("proposals")) {
                // eslint-disable-next-line
                myproject.proposals.myproposal.map(myproposal => {
                    if (myproposal.proposalid === activeproposalid) {
                        proposalid = activeproposalid;
                    }
                })
            }
        }
        return proposalid;
    }
    getupdated() {
        let updated = "";
        if (this.state.activeproposalid) {
            let proposalid = this.state.activeproposalid;
            let myproject = this.getproject();
            if (myproject.hasOwnProperty("proposals")) {
                // eslint-disable-next-line
                myproject.proposals.myproposal.map(myproposal => {
                    if (myproposal.proposalid === proposalid) {
                        if (myproposal.updated) {
                            updated = UTCStringFormatDateforProposal(myproposal.updated);
                        }
                    }
                })
            }
        }
        if (updated) {
            updated = `Proposal Last Updated ${updated}`
        }

        return updated;
    }
    getapproved() {
        let approved = "";
        if (this.state.activeproposalid) {
            let proposalid = this.state.activeproposalid;
            let myproject = this.getproject();
            if (myproject.hasOwnProperty("proposals")) {
                // eslint-disable-next-line
                myproject.proposals.myproposal.map(myproposal => {
                    if (myproposal.proposalid === proposalid) {
                        if (myproposal.updated) {
                            approved = UTCStringFormatDateforProposal(myproposal.approved);
                        }
                    }
                })
            }
        }
        if (approved) {
            approved = `Approved ${approved}`
        }
        return approved;
    }
    render() {
        //PROPOSAL 
        return (
            <div className="general-flex">
                <div className="flex-1">

                    <div className="general-flex">
                        <div className="flex-1 titleFont align-contentCenter addBottomMargin">
                            ProjectID {this.getproject().projectid}/{this.getproject().title} <br />
                            Proposals
                        </div>
                    </div>

                    <div className="general-flex addBottomMargin">
                        <div className="flex-2 regularFont">
                            To Create A Proposal First Create an ID Then Add the Scheduled Items.
                        </div>
                        <div className="flex-1 addLeftMargin">
                            <button className="general-button create-proposal" onClick={event => { this.createnewproposal() }}>{createProposalIcon()}</button>
                        </div>
                    </div>

                    {this.loadproposalids()}


                    {this.loadproposalitems()}

                    <div className="general-flex addBottomMargin">
                        <div className="flex-1 align-contentCenter">
                            <div className="regularFont align-contentCenter addBottomMargin minHeight">{this.state.message}</div>
                            <button className="general-button saveAllProjectsIcon" onClick={event => { this.saveallprojects() }}>{SaveAllProjectIcon()} </button>
                        </div>
                    </div>

                    <div className="general-flex addBottomMargin">
                        <div className="flex-1 regularFont align-contentCenter">
                            {this.getupdated()}
                        </div>
                    </div>


                </div>

            </div>)
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        projectid: state.projectid,
        projectsprovider: state.projectsprovider,
        proposalid: state.proposalid
    }
}
export default connect(mapStateToProps, actions)(MyProposals)
