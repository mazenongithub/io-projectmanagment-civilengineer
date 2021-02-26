import React, { Component } from 'react';
import * as actions from './actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { MyStylesheet } from './styles';
import { AuthorizeProposal } from './svg'
import {
    DirectCostForLabor, ProfitForLabor, DirectCostForMaterial,
    ProfitForMaterial, DirectCostForEquipment, ProfitForEquipment,
    UTCTimefromCurrentDate,
    inputUTCStringForLaborID,
    CreateBidScheduleItem, sortcode
} from './functions'
import PM from './pm';
import Spinner from './spinner'
import ProjectID from './projectid';


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
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions()
 
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });

    }

    getprofit(csiid) {
        let profit = 0;
        let directcost = 0;
        let proposal = this.getproposal()
        if (proposal) {
            if (proposal.hasOwnProperty("labor")) {
                proposal.labor.map(mylabor => {
                    if (mylabor.csiid === csiid) {
                        directcost += DirectCostForLabor(mylabor);
                        profit += ProfitForLabor(mylabor);
                    }
                })

            }

            if (proposal.hasOwnProperty("materials")) {
                proposal.materials.map(mymaterial => {
                    if (mymaterial.csiid === csiid) {
                        directcost += DirectCostForMaterial(mymaterial);
                        profit += ProfitForMaterial(mymaterial);
                    }
                })

            }

            if (proposal.hasOwnProperty("equipment")) {
                proposal.equipment.map(equipment => {
                    if (equipment.csiid === csiid) {
                        directcost += DirectCostForEquipment(equipment);
                        profit += ProfitForEquipment(equipment);

                    }

                })
            }

        }
        // eslint-disable-next-line


        if (directcost > 0) {
            return (((profit / directcost)) * 100)
        } else {
            return (0)
        }




    }


    getdirectcost(csiid) {
        const pm = new PM()
        let proposal = this.getproposal();
        let directcost = 0;
        if (proposal) {
            if (proposal.hasOwnProperty("labor")) {
                // eslint-disable-next-line
                proposal.labor.map(mylabor => {

                    if (mylabor.csiid === csiid) {

                        directcost += DirectCostForLabor(mylabor)


                    }
                })
            }

            if (proposal.hasOwnProperty("materials")) {
                // eslint-disable-next-line
                proposal.materials.map(mymaterial => {
                    if (mymaterial.csiid === csiid) {
                        directcost += DirectCostForMaterial(mymaterial)
                    }

                })
            }


            if (proposal.hasOwnProperty("equipment")) {
                // eslint-disable-next-line
                proposal.equipment.map(myequipment => {
                    if (myequipment.csiid === csiid) {
                        directcost += DirectCostForEquipment(myequipment)
                    }

                })
            }

        }

        return directcost;

    }
    getbidprice(csiid) {

        let directcost = this.getdirectcost(csiid);
        let profit = this.getprofit(csiid);

        let bidprice = directcost * (1 + (profit / 100))
        return bidprice;
    }
    getunitprice(csiid) {

        let quantity = Number(this.getquantity(csiid));
        let bidprice = Number(this.getbidprice(csiid));
        const unitprice = quantity > 0 ? bidprice / quantity : 'NA';
        return unitprice;

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
    

        const styles = MyStylesheet();
        const regularFont = pm.getRegularFont.call(this);
        const bidField = pm.getbidfield.call(this)
        const csi = pm.getcsibyid.call(this, item.csiid);
        let profit = +Number(this.getprofit(item.csiid)).toFixed(4)
        let unit = this.getunit(csi.csiid);
        let bidprice = Number(this.getbidprice(item.csiid)).toFixed(2)
        let unitprice = this.getunitprice(item.csiid) > 0 ? `$${+Number(this.getunitprice(item.csiid)).toFixed(2)}/${unit}` : 'NA'
        let directcost = Number(this.getdirectcost(item.csiid)).toFixed(2)
        let quantity = this.getquantity(item.csiid) > 0 ? this.getquantity(item.csiid) : 'NA';

        const myuser = pm.getuser.call(this)
        if (myuser) {

            const company = this.getcompany();
            if (company) {

                const project = pm.getproject.call(this)
                if (project) {
                    if (this.state.width > 1200) {
                        return (
                            <tr>
                                <td><Link style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }} to={`/${myuser.profile}/projects/${project.title}/proposals/${company.url}/csi/${csi.csiid}`}>{csi.csi}-{csi.title}</Link></td>
                                <td style={{ ...styles.alignCenter }}>
                                    {quantity}
                                </td>
                                <td style={{ ...styles.alignCenter }}>{unit}</td>
                                <td style={{ ...styles.alignCenter }}>${directcost}</td>
                                <td style={{ ...styles.alignCenter }}>{profit}</td>
                                <td style={{ ...styles.alignCenter }}>${bidprice}</td>
                                <td style={{ ...styles.alignCenter }}> {unitprice}</td>
                            </tr>)


                    } else {
                        return (
                            <div style={{ ...styles.generalFlex }} key={csi.csiid}>
                                <div style={{ ...styles.flex1 }}>
                                    <div style={{ ...styles.generalFlex }}>
                                        <div style={{ ...styles.flex2, ...regularFont, ...styles.generalFont, ...styles.showBorder }}>

                                            <Link style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }} to={`/${myuser.profile}/projects/${project.title}/proposals/${company.url}/csi/${csi.csiid}`}> Line Item <br />
                                                {csi.csi}-{csi.title} </Link>
                                        </div>
                                        <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                                            Quantity <br />
                                            {quantity}
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
                                            {profit}
                                        </div>
                                        <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                                            Bid Price <br />
                                ${bidprice}
                                        </div>
                                        <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                                            Unit Price
                                {unitprice}
                                        </div>
                                    </div>
                                </div>
                            </div>)
                    }

                }

            }

        }
    }

    getproposal() {
        let proposal = false;
        const pm = new PM();
        const company = this.getcompany()
        if (company) {
            const companyid = company.companyid;
            const project = pm.getproject.call(this);
            if (project) {

                if (project.hasOwnProperty("proposals")) {
                    // eslint-disable-next-line
                    project.proposals.map((myproposal, i) => {
                        if (myproposal.companyid === companyid) {
                            proposal = myproposal;
                        }
                    })
                }

            }

        }
        return proposal;

    }
    getproposalkey() {
        let key = false;
        const pm = new PM();
        const company = this.getcompany()
        if (company) {
            const companyid = company.companyid;
            const project = pm.getproject.call(this);
            if (project) {


                if (project.hasOwnProperty("proposals")) {
                    // eslint-disable-next-line
                    project.proposals.map((myproposal, i) => {
                        if (myproposal.companyid === companyid) {
                            key = i;
                        }
                    })
                }

            }

        }
        return key;
    }
    getscheduleitems() {

        let scheduleitems = false;
        let myproposal = this.getproposal();
        if (myproposal) {
            if (myproposal.hasOwnProperty("bidschedule")) {
                scheduleitems = myproposal.bidschedule
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
    getschedule() {
        const pm = new PM();
        const proposal = this.getproposal()
        let getitems = false
        if (proposal.hasOwnProperty("bidschedule")) {
            getitems = proposal.bidschedule;

        }
        return getitems;

    }
    getitems() {
        const pm = new PM();

        let getitems = this.getschedule();

        let csis = [];
        if (getitems) {
            // eslint-disable-next-line
            getitems.map(lineitem => {

                const csi = pm.getcsibyid.call(this, lineitem.csiid)
                let newItem = CreateBidScheduleItem(lineitem.csiid, lineitem.unit, Number(lineitem.quantity))
                if (csi) {
                    newItem.csi = csi.csi;
                }
                csis.push(newItem)

            })
        }

        csis.sort((codea, codeb) => {
            return (sortcode(codea, codeb))
        })

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
                const myproject = pm.getproject.call(this)
                if (myproject) {
                    const i = pm.getprojectkeybyid.call(this,myproject.projectid);
                    const proposal = this.getproposal()
                    if(proposal) {
                    const j = this.getproposalkey();
                    myuser.projects[i].proposals[j].approved = approved;
                    this.props.reduxUser(myuser)
                    this.setState({render:'render'})
                    pm.saveallprofile.call(this)
                    }

                }

            }
        }

    }
    getupdated() {
        const proposal = this.getproposal();
        let updated = "";
        if (proposal) {
            if (proposal.updated) {
                updated = `Last Updated ${inputUTCStringForLaborID(proposal.updated)}`;
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
                approved = `Approved ${inputUTCStringForLaborID(proposal.approved)}`;
            }
        }
        return approved;

    }
    getamount() {
        const biditems = this.getitems();
        let amount = 0;
        if (biditems.length > 0) {
            // eslint-disable-next-line
            biditems.map(item => {
                amount += this.getbidprice(item.csiid)
            })
        }

        // 
        return amount
    }

    getcompany() {
        const pm = new PM();
        let getcompany = false;
        const myuser = pm.getuser.call(this)
        if(myuser) {
            if(myuser.hasOwnProperty("companys")) 
                myuser.companys.map(company=> {
                    if(company.url === this.props.match.params.url) {
                        getcompany = company;
                    }
                })

            }
        
        return getcompany;

    }

    render() {
        const styles = MyStylesheet();
        const pm = new PM();
        const headerFont = pm.getHeaderFont.call(this)

        const projectIcon = pm.getsaveprojecticon.call(this);
        const regularFont = pm.getRegularFont.call(this)
        const myuser = pm.getuser.call(this)
        const projectid = new ProjectID();


        const csis = pm.getcsis.call(this);
        if (!csis) {
            pm.loadcsis.call(this)
        }

        const authorize = () => {
            if (!this.state.spinner) {
                return (<div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                    <button style={{ ...styles.generalButton, ...projectIcon }} onClick={() => { this.authorizeproposal() }}>{AuthorizeProposal()}</button>
                </div>)
            } else {
                return (<Spinner />)
            }
        }
     
        if (myuser) {
            const project = pm.getproject.call(this)
            const company = this.getcompany();
            if (company) {
                if (project) {

                    const proposal = pm.getproposalbyid.call(this);
                    if (proposal) {
                        const amount = Number(this.getamount()).toFixed(2)
                        return (
                            <div style={{ ...styles.generalFlex }}>
                                <div style={{ ...styles.flex1 }}>

                                    <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                        <Link style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.boldFont }} to={`/${myuser.profile}/projects/${project.title}`}>  /{project.title}  </Link>
                                    </div>

                                    <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                        <Link style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.boldFont }} to={`/${myuser.profile}/projects/${project.title}/proposals`}>  /proposals </Link>
                                    </div>

                                    <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                        <Link style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.boldFont }} to={`/${myuser.profile}/projects/${project.title}/proposals/${company.url}`}> /{company.url} </Link>
                                    </div>


                                    {pm.showbidtable.call(this)}

                                    <div style={{ ...styles.generalContainer }}>
                                        <span style={{ ...regularFont, ...styles.generalFont }}>The estimated amount is ${amount}</span>
                                    </div>

                                    <div style={{ ...styles.generalContainer, ...regularFont, ...styles.generalFont, ...styles.alignCenter }}>
                                        {this.state.message}
                                    </div>

                                    {authorize()}

                                    <div style={{ ...styles.generalContainer, ...regularFont, ...styles.generalFont, ...styles.alignCenter }}>
                                        {this.getupdated()}
                                    </div>
                                    <div style={{ ...styles.generalContainer, ...regularFont, ...styles.generalFont, ...styles.alignCenter }}>
                                        {this.getapproved()}
                                    </div>



                                    {projectid.showprojectid.call(this)}

                                </div>
                            </div>)

                    } else {
                        return (<div>Proposal Not Found</div>)
                    }

                } else {
                    return (<div>Project Not Found</div>)
                }

            } else {
                return (<div>Company Not Found</div>)
            }

        } else {
            return (<div>Please Login to View Proposal</div>)
        }



    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation,
        allusers: state.allusers,
        csis: state.csis
    }
}
export default connect(mapStateToProps, actions)(ViewProposal)


