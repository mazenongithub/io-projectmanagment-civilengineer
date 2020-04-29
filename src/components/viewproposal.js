import React, { Component } from 'react';
import * as actions from './actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { MyStylesheet } from './styles';
import { AuthorizeProposal } from './svg'
import {
    sorttimes,
    DirectCostForLabor, ProfitForLabor, DirectCostForMaterial,
    ProfitForMaterial, DirectCostForEquipment, ProfitForEquipment,
    UTCTimefromCurrentDate,
    UTCStringFormatDateforProposal,
    CreateBidScheduleItem
} from './functions'
import PM from './pm';


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

        this.updateWindowDimensions()
        this.props.reduxNavigation({ navigation: "viewproposal", proposalid: this.props.match.params.proposalid })
        this.props.reduxProject({ projectid: this.props.match.params.projectid })


    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });

    }
    proposalitemsbycsiid(csiid) {
        const proposalid = this.props.match.params.proposalid;
        const pm = new PM();
        let myproject = pm.getproject.call(this);
        let items = [];
        if (myproject.hasOwnProperty("schedulelabor")) {
            // eslint-disable-next-line
            myproject.schedulelabor.mylabor.map(mylabor => {
                if (mylabor.csiid === csiid && (mylabor.proposalid === proposalid)) {
                    items.push(mylabor)
                }
            })

        }
        if (myproject.hasOwnProperty("schedulematerials")) {
            // eslint-disable-next-line
            myproject.schedulematerials.mymaterial.map(mymaterial => {
                if (mymaterial.csiid === csiid && (mymaterial.proposalid === proposalid)) {
                    items.push(mymaterial)
                }
            })

        }
        if (myproject.hasOwnProperty("scheduleequipment")) {
            // eslint-disable-next-line
            myproject.scheduleequipment.myequipment.map(myequipment => {
                if (myequipment.csiid === csiid && (myequipment.proposalid === proposalid)) {
                    items.push(myequipment)
                }
            })

        }
        items.sort((a, b) => {
            return sorttimes(a.timein, b.timein)
        })
        return items;
    }
    getprofit(csiid) {
        let profit = 0;
        let directcost = 0;
        let items = this.proposalitemsbycsiid(csiid);
        // eslint-disable-next-line
        items.map(item => {
            if (item.hasOwnProperty("laborid")) {
                directcost += DirectCostForLabor(item);
                profit += ProfitForLabor(item);
            }
            if (item.hasOwnProperty("materialid")) {
                directcost += DirectCostForMaterial(item);
                profit += ProfitForMaterial(item);
            }
            if (item.hasOwnProperty("equipmentid")) {
                directcost += DirectCostForEquipment(item);
                profit += ProfitForEquipment(item);
            }

        })

        return (((profit / directcost)) * 100)

    }

    getoverhead(csiid) {
        let directcost = Number(this.getdirectcost(csiid));
        let profit = Number(this.getprofit(csiid));

        if (!profit) {
            profit = 1
        } else {
            profit = 1 + (profit / 100)
        }
        let overhead = (directcost * profit)*.029  + .029*((directcost * profit)*.029) + .029*(.029*((directcost * profit)*.029)) + .029*(+ .029*(.029*((directcost * profit)*.029))) +.029*(.029*(+ .029*(.029*((directcost * profit)*.029))))
        return overhead;
    }
    getdirectcost(csiid) {
        const pm = new PM()
        let myproject = pm.getproject.call(this)
        let proposalid = this.props.match.params.proposalid;
        let directcost = 0;
        if (myproject) {
            if (myproject.hasOwnProperty("schedulelabor")) {
                // eslint-disable-next-line
                myproject.schedulelabor.mylabor.map(mylabor => {

                    if (mylabor.csiid === csiid && (mylabor.proposalid === proposalid)) {

                        directcost += DirectCostForLabor(mylabor)


                    }
                })
            }

            if (myproject.hasOwnProperty("schedulematerials")) {
                // eslint-disable-next-line
                myproject.schedulematerials.mymaterial.map(mymaterial => {
                    if (mymaterial.csiid === csiid && (mymaterial.proposalid === proposalid)) {
                        directcost += DirectCostForMaterial(mymaterial)
                    }

                })
            }
        }

        if (myproject.hasOwnProperty("scheduleequipment")) {
            // eslint-disable-next-line
            myproject.scheduleequipment.myequipment.map(myequipment => {
                if (myequipment.csiid === csiid && (myequipment.proposalid === proposalid)) {
                    directcost += DirectCostForEquipment(myequipment)
                }

            })
        }

        return directcost;

    }
    getbidprice(csiid) {

        let directcost =this.getdirectcost(csiid);
        let profit =this.getprofit(csiid);
        let overhead = this.getoverhead();
        if (!profit) {
            profit = 1
        } else {
            profit = 1 + (profit / 100)
        }
        let bidprice = (directcost * (profit)) + overhead;
        return bidprice;
    }
    getunitprice(csiid) {

        let quantity = Number(this.getquantity(csiid));
        let bidprice = Number(this.getbidprice(csiid));

        if (quantity > 0 && bidprice > 0) {
            return (bidprice / quantity)

        } else {
            return;
        }


    }
    getunit(csiid) {

        let scheduleitem = this.getscheduleitem(csiid);

        if (scheduleitem) {

            return scheduleitem.unit;


        } else {
            return ""
        }

    }
    showbiditem(item) {
        const pm = new PM();
        let providerid = this.props.match.params.providerid;
        let projectid = this.props.match.params.projectid;
        let proposalid = this.props.match.params.proposalid;

        const styles = MyStylesheet();
        const regularFont = pm.getRegularFont.call(this);
        const bidField = pm.getbidfield.call(this)
        const csi = pm.getschedulecsibyid.call(this, item.csiid);
        let profit = () => {
            return (
                <input type="text"
                    value={Number(this.getprofit(item.csiid)).toFixed(4)}
                    onChange={event => { this.handlechangeprofit(event.target.value, item.csiid) }}
                    style={{ ...styles.generalFont, ...regularFont, ...styles.generalFont, ...bidField }}
                />)
        }
        let bidprice = Number(this.getbidprice(item.csiid)).toFixed(2);
        let unitprice = +Number(this.getunitprice(item.csiid)).toFixed(4);
        let directcost = Number(this.getdirectcost(item.csiid)).toFixed(2);

        const unit = () => {
            return (
                <div style={{ ...styles.generalContainer }}>
                    Unit <br />
                    {this.getunit(csi.csiid)}

                </div>)
        }
        const quantity = () => {
            return (<div style={{ ...styles.generalContainer }}>
                Quantity <br />
                {this.getquantity()}

            </div>)
        }

        if (this.state.width > 1200) {
            return (
                <tr>
                    <td><Link style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }} to={`/${providerid}/myprojects/${projectid}/proposals/${proposalid}/csi/${csi.csiid}`}>{csi.csi}-{csi.title}</Link></td>
                    <td style={{ ...styles.alignCenter }}>
                        {quantity()}
                    </td>
                    <td style={{ ...styles.alignCenter }}>{unit()}</td>
                    <td style={{ ...styles.alignCenter }}>{directcost}</td>
                    <td style={{ ...styles.alignCenter }}>{profit()}</td>
                    <td style={{ ...styles.alignCenter }}>{bidprice}</td>
                    <td style={{ ...styles.alignCenter }}>  {`$${unitprice}/${this.getunit(csi.csiid)}`}</td>
                </tr>)


        } else {
            return (
                <div style={{ ...styles.generalFlex }} key={csi.csiid}>
                    <div style={{ ...styles.flex1 }}>
                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex2, ...regularFont, ...styles.generalFont, ...styles.showBorder }}>

                                <Link style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }} to={`/${providerid}/myprojects/${projectid}/proposals/${proposalid}/csi/${csi.csiid}`}> Line Item <br />
                                    {csi.csi}-{csi.title} </Link>
                            </div>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                                Quantity <br />
                                {this.getquantity(csi.csiid)}
                            </div>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                                Unit <br />
                                {this.getunit(csi.csiid)}
                            </div>
                        </div>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                                Direct Cost <br />
                                ${directcost}
                            </div>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                                Profit % <br />
                                {+Number(this.getprofit(csi.csiid).toFixed(4))}
                            </div>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                                Bid Price <br />
                                ${bidprice}
                            </div>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                                Unit Price
                                {`$${unitprice}/${this.getunit(csi.csiid)}`}
                            </div>
                        </div>
                    </div>
                </div>)
        }
    }
    getproposal() {
        let proposalid = this.props.match.params.proposalid;
        let proposal = false;
        const pm = new PM();
        let myproject = pm.getproject.call(this);
        if (myproject.hasOwnProperty("proposals")) {
            // eslint-disable-next-line
            myproject.proposals.myproposal.map(myproposal => {
                if (myproposal.proposalid === proposalid) {
                    proposal = myproposal;
                }
            })
        }
        return proposal;
    }
    getproposalkey() {
        let proposalid = this.props.match.params.proposalid;
        let key = false;
        const pm = new PM();
        let myproject = pm.getproject.call(this);
        if (myproject.hasOwnProperty("proposals")) {
            // eslint-disable-next-line
            myproject.proposals.myproposal.map((myproposal, i) => {
                if (myproposal.proposalid === proposalid) {
                    key = i;
                }
            })
        }
        return key;
    }
    getscheduleitems() {

        let scheduleitems = false;
        let myproposal = this.getproposal();
        if (myproposal) {
            if (myproposal.hasOwnProperty("bidschedule")) {
                scheduleitems = myproposal.bidschedule.biditem
            }
        }
        return scheduleitems;
    }
    getscheduleitem(csiid) {

        let scheduleitems = this.getscheduleitems();

        let scheduleitem = false;
        if (scheduleitems) {
            // eslint-disable-next-line
            scheduleitems.map(item => {
                if (item.csiid === csiid) {
                    scheduleitem = item;
                }
            })
        }
        return scheduleitem;
    }
    getquantity(csiid) {

        let scheduleitem = this.getscheduleitem(csiid);

        if (scheduleitem) {
            return Number(scheduleitem.quantity);
        } else {
            return;
        }

    }
    getitems() {
        const pm = new PM();
        let proposalid = this.props.match.params.proposalid;
        let payitems = pm.getAllSchedule.call(this)

        let items = [];
        const validateNewItem = (items, item) => {
            let validate = true;
            // eslint-disable-next-line
            items.map(myitem => {
                if (myitem.csiid === item.csiid) {
                    validate = false;
                }
            })
            return validate;
        }
        // eslint-disable-next-line
        payitems.map(item => {

            if (item.hasOwnProperty("laborid")) {
                if (item.proposalid === proposalid) {
                    items.push(item)
                }

            }
            if (item.hasOwnProperty("materialid")) {
                if (item.proposalid === proposalid) {
                    items.push(item)
                }

            }
            if (item.hasOwnProperty("equipmentid")) {
                if (item.proposalid === proposalid) {
                    items.push(item)
                }

            }

        })
        let csis = [];
        if (items.length > 0) {
            // eslint-disable-next-line
            items.map(lineitem => {
                if (validateNewItem(csis, lineitem)) {

                    let newItem = CreateBidScheduleItem(lineitem.csiid, "", 0)
                    csis.push(newItem)
                }
            })
        }

        return csis;
    }
    showbiditems() {

        let biditems = this.getitems();

        let lineids = [];
        if (biditems.length > 0) {
            // eslint-disable-next-line
            biditems.map(item => {
                lineids.push(this.showbiditem(item))
            })
        }

        return lineids;
    }
    authorizeproposal() {
        const pm = new PM();
        const myuser = pm.getuser.call(this)
        if (window.confirm(`Are you Sure you Want to Authorize the Proposal?`)) {
            if (myuser) {
                let approved = UTCTimefromCurrentDate();
                const myproject = pm.getactiveproject.call(this);
                if (myproject) {
                    const i = pm.getprojectkey.call(this);
                    const j = this.getproposalkey();
                    myuser.projects.myproject[i].proposals.myproposal[j].approved = approved;
                    pm.saveallprofilebyuser.call(this, myuser)

                }

            }
        }

    }
    getupdated() {
        const proposal = this.getproposal();
        let updated = "";
        if (proposal) {
            if (proposal.updated) {
                updated = `Updated On: ${UTCStringFormatDateforProposal(proposal.updated)}`;
            }
        }
        return updated;
    }

    getapproved() {
        const proposal = this.getproposal();
        let approved = "";
        if (proposal) {

            if (proposal.approved) {
                console.log(proposal.approved)
                approved = `Approved On: ${UTCStringFormatDateforProposal(proposal.approved)}`;
            }
        }
        return approved;

    }
    render() {
        const styles = MyStylesheet();
        const projectid = this.props.match.params.projectid;
        const pm = new PM();
        const headerFont = pm.getHeaderFont.call(this)
        const proposalid = this.props.match.params.proposalid;
        const projectIcon = pm.getsaveprojecticon.call(this);
        const regularFont = pm.getRegularFont.call(this)
        return (
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...headerFont, ...styles.generalFont }}>
                            /{projectid} <br />
                            View Proposal {proposalid}
                        </div>
                    </div>
                    {pm.showbidtable.call(this)}

                    <div style={{ ...styles.generalContainer, ...regularFont, ...styles.generalFont, ...styles.alignCenter }}>
                        {this.state.message}
                    </div>

                    <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                        <button style={{ ...styles.generalButton, ...projectIcon }} onClick={() => { this.authorizeproposal() }}>{AuthorizeProposal()}</button>
                    </div>

                    <div style={{ ...styles.generalContainer, ...regularFont, ...styles.generalFont, ...styles.alignCenter }}>
                        {this.getupdated()}
                    </div>
                    <div style={{ ...styles.generalContainer, ...regularFont, ...styles.generalFont, ...styles.alignCenter }}>
                        {this.getapproved()}
                    </div>

                    {pm.showprojectid.call(this)}

                </div>
            </div>)



    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation,
        project: state.project,
        allusers: state.allusers,
        allcompanys: state.allcompanys
    }
}
export default connect(mapStateToProps, actions)(ViewProposal)


