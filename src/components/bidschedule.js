import React, { Component } from 'react';
import * as actions from './actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { MyStylesheet } from './styles';
import { sorttimes, DirectCostForLabor, ProfitForLabor, DirectCostForMaterial, ProfitForMaterial, DirectCostForEquipment, ProfitForEquipment, CreateBidScheduleItem, isNumeric, sortcode } from './functions'
import PM from './pm';
import ProjectID from './projectid';


class ViewBidSchedule extends Component {
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
        const pm = new PM();
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions()
        const csis = pm.getcsis.call(this);
        if (!csis) {
            pm.loadcsis.call(this)
        }


    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });

    }
    itemsbycsiid(csiid) {

        const pm = new PM();
        let schedule = pm.getAllSchedule.call(this)
        let items = [];
        if (schedule) {

            schedule.map(item => {
                if (item.csiid === csiid) {
                    items.push(item)
                }

            })

        }
        return items;


    }
    getprofit(csiid) {


        let profit = 0;
        let directcost = 0;
        let items = this.itemsbycsiid(csiid);
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
        let overhead = (directcost * profit) * .029 + .029 * ((directcost * profit) * .029) + .029 * (.029 * ((directcost * profit) * .029)) + .029 * (+ .029 * (.029 * ((directcost * profit) * .029))) + .029 * (.029 * (+ .029 * (.029 * ((directcost * profit) * .029))))
        return overhead;
    }
    getdirectcost(csiid) {
        const pm = new PM()
        let proposals = pm.getproposals.call(this)
        let directcost = 0;
        if (proposals) {

            proposals.map(proposal => {


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


            })

        }


        return directcost;

    }
    gettotalamount() {
        const items = this.getitems();
        let amount = 0;
        if (items) {
            items.map(item => {
                amount += this.getbidprice(item.csiid);
            })
        }
        return amount;

    }
    getbidprice(csiid) {

        let directcost = Number(this.getdirectcost(csiid));
        let profit = Number(this.getprofit(csiid));


        if (!profit) {
            profit = 1
        } else {
            profit = 1 + (profit / 100)
        }
        let bidprice = (directcost * profit)
        return bidprice;
    }
    getunitprice(csiid) {

        let quantity = Number(this.getquantity(csiid));
        let bidprice = Number(this.getbidprice(csiid));

        if (quantity > 0) {
            return (bidprice / quantity)

        } else {
            return `NA`
        }


    }
    handlequantity(csiid, quantity) {
        const pm = new PM();
        if (isNumeric(quantity)) {
            const myuser = pm.getuser.call(this)
            if (myuser) {
                const myproject = pm.getproject.call(this);
                if (myproject) {
                    const i = pm.getprojectkeybyid.call(this, myproject.projectid);
                    const scheduleitems = pm.getbidschedule.call(this)
                    if (scheduleitems) {

                        const scheduleitem = pm.getbidschedulebyid.call(this, csiid)
                        if (scheduleitem) {
                            const j = pm.getbidschedulekeybyid.call(this, csiid)
                            myuser.projects[i].bidschedule[j].quantity = quantity;
                            this.props.reduxUser(myuser);
                            this.setState({ render: 'render' })

                        } else {
                            let newItem = { csiid, quantity, unit: '' }
                            myuser.projects[i].bidschedule.push(newItem)
                            this.props.reduxUser(myuser);
                            this.setState({ render: 'render' })
                        }

                    } else {
                        let newItem = { csiid, quantity, unit: '' }
                        myuser.projects[i].bidschedule = [newItem]
                        this.props.reduxUser(myuser);
                        this.setState({ render: 'render' })
                    }




                }
            }

        } else {
            alert(`${quantity} should be numeric `)
        }

    }

    handleunit(csiid, unit) {
        const pm = new PM();
        const myuser = pm.getuser.call(this)
        if (myuser) {
            const myproject = pm.getproject.call(this);
            if (myproject) {
                const i = pm.getprojectkeybyid.call(this, myproject.projectid);
                const scheduleitems = pm.getbidschedule.call(this)
                if (scheduleitems) {

                    const scheduleitem = pm.getbidschedulebyid.call(this, csiid)
                    if (scheduleitem) {
                        const j = pm.getbidschedulekeybyid.call(this, csiid)
                        myuser.projects[i].bidschedule[j].unit = unit
                        this.props.reduxUser(myuser);
                        this.setState({ render: 'render' })
                    } else {

                        let newItem = { csiid, quantity: '', unit }
                        myuser.projects[i].bidschedule.push(newItem)
                        this.props.reduxUser(myuser);
                        this.setState({ render: 'render' })

                    }

                } else {
                    let newItem = { csiid, quantity: '', unit }
                    myuser.projects[i].bidschedule = [newItem]
                    this.props.reduxUser(myuser);
                    this.setState({ render: 'render' })

                }

            }
        }


    }
    getunit(csiid) {
        let unit = "";
        const pm = new PM();
        const item = pm.getbidschedulebyid.call(this, csiid);
        if (item) {
            unit = item.unit
        }

        return unit;

    }
    showbiditem(item) {

        const pm = new PM();
     
        const styles = MyStylesheet();
        const regularFont = pm.getRegularFont.call(this);
        
        let profit = () => {
            return (
                Number(this.getprofit(item.csiid))
            )
        }
        let bidprice = Number(this.getbidprice(item.csiid))
        let unitprice = this.getunitprice(item.csiid) > 0 ? `${Number(this.getunitprice(item.csiid)).toFixed(2)}` : this.getunitprice(item.csiid)
        let directcost = Number(this.getdirectcost(item.csiid))

        const unit = () => {
            return (
                <div style={{ ...styles.generalContainer }}>
                 
                    <input type="text"
                        style={{ ...regularFont, ...styles.generalFont, ...styles.minWidth90, ...styles.alignCenter }}
                        value={this.getunit(item.csiid)}
                        onChange={event => { this.handleunit(item.csiid, event.target.value) }} />
                </div>)
        }
        const quantity = () => {
            return (<div style={{ ...styles.generalContainer }}>
              
                <input type="text"
                    style={{ ...regularFont, ...styles.generalFont, ...styles.minWidth90, ...styles.alignCenter }}
                    value={this.getquantity(item.csiid)} onChange={event => { this.handlequantity(item.csiid, event.target.value) }} />

            </div>)
        }

        const myuser = pm.getuser.call(this)
        if(myuser) {

            const project = pm.getproject.call(this)
            if(project) {

                const csi = pm.getcsibyid.call(this, item.csiid);
                if(csi) {

        if (this.state.width > 1200) {
            return (
                <tr key={`item${item.csiid}`}>
                    <td><Link style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }} to={`/${myuser.profile}/projects/${project.title}/bidschedule/csi/${csi.csiid}`}>{csi.csi}-{csi.title}</Link></td>
                    <td style={{ ...styles.alignCenter }}>
                        {quantity()}
                    </td>
                    <td style={{ ...styles.alignCenter }}>{unit()}</td>
                    <td style={{ ...styles.alignCenter }}>${Number(directcost).toFixed(2)}</td>
                    <td style={{ ...styles.alignCenter }}>{+Number(profit()).toFixed(4)}</td>
                    <td style={{ ...styles.alignCenter }}>${Number(bidprice).toFixed(2)}</td>
                    <td style={{ ...styles.alignCenter }}>  {`$${unitprice}/${this.getunit(csi.csiid)}`}</td>
                </tr>)


        } else {
            return (
                <div style={{ ...styles.generalFlex }} key={`item${item.csiid}`}>
                    <div style={{ ...styles.flex1 }}>
                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex2, ...regularFont, ...styles.generalFont, ...styles.showBorder }}>
                                <Link style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }} to={`/${myuser.profile}/projects/${project.title}/bidschedule/csi/${csi.csiid}`}> Line Item <br />
                                    {csi.csi}-{csi.title} </Link>
                            </div>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                            Quantity <br />   {quantity()}

                            </div>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                            Unit <br /> {unit()}
                            </div>
                        </div>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                                Direct Cost <br />
                                ${Number(directcost).toFixed(2)}
                            </div>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                                Overhead And Profit % <br />
                                {+Number(this.getprofit(csi.csiid).toFixed(4))}
                            </div>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                                Bid Price <br />
                                ${Number(bidprice).toFixed(2)}
                            </div>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                                Unit Price
                                {unitprice}/${this.getunit(csi.csiid)}
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
    getscheduleitems() {
        const pm = new PM();
        let scheduleitems = []
        let proposals = pm.getproposals.call(this)
        if (proposals) {
            // eslint-disable-next-line
            proposals.map(myproposal => {
                if (myproposal.hasOwnProperty("bidschedule")) {
                    // eslint-disable-next-line
                    myproposal.bidschedule.biditem.map(item => {
                        scheduleitems.push(item)
                    })

                }

            })
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
        let quantity = "";

        const pm = new PM();
        const item = pm.getbidschedulebyid.call(this, csiid);
        if (item) {
            quantity = item.quantity;
        }
        return quantity;
    }
    getitems() {
        const pm = new PM();
        let items = pm.getAllSchedule.call(this)


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

        let csis = [];
        if (items) {
            // eslint-disable-next-line
            items.map(lineitem => {
                if (validateNewItem(csis, lineitem)) {
                    const csi = pm.getcsibyid.call(this, lineitem.csiid)
                    let newItem = CreateBidScheduleItem(lineitem.csiid, "", 0)
                    newItem.csi = csi.csi
                    csis.push(newItem)
                }
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

    render() {
        const styles = MyStylesheet();
        const pm = new PM();
        const headerFont = pm.getHeaderFont.call(this)
        const myuser = pm.getuser.call(this)
        const regularFont = pm.getRegularFont.call(this)
        const amount = Number(this.gettotalamount()).toFixed(2);
        
        const projectid = new ProjectID();
       

        if (myuser) {
            const project = pm.getproject.call(this)
            if (project) {
                return (
                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1 }}>

                        

                            <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                <Link style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.boldFont }} to={`/${myuser.profile}/projects/${project.title}`}>  /{project.title}  </Link>
                            </div>

                            <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                <Link style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.boldFont }} to={`/${myuser.profile}/projects/${project.title}/bidschedule`}>  /bidschedule </Link>
                            </div>
                            {pm.showbidtable.call(this)}

                            <div style={{...styles.generalContainer}}>
                                <span style={{...styles.generalFont,...regularFont}}>The Project Schedule Amount is ${amount}</span>
                            </div>

                            {pm.showsaveproject.call(this)}
                            {projectid.showprojectid.call(this)}

                            
                        </div>
                    </div>)

            } else {
                return (<div>Project Not Found</div>)
            }

        } else {
            return (<div>Please Login to View Bid Schedule</div>)
        }



    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation,
        project: state.project,
        allusers: state.allusers,
        allcompanys: state.allcompanys,
        csis: state.csis
    }
}
export default connect(mapStateToProps, actions)(ViewBidSchedule)
