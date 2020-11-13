import React, { Component } from 'react';
import * as actions from './actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { MyStylesheet } from './styles';
import { sorttimes, DirectCostForLabor, ProfitForLabor, DirectCostForMaterial, ProfitForMaterial, DirectCostForEquipment, ProfitForEquipment, CreateBidScheduleItem, UTCStringFormatDateforProposal, inputUTCStringForLaborID } from './functions'
import PM from './pm'
import { SettleInvoice } from './actions/api';



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
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions()
        this.props.reduxNavigation({ navigation: "viewinvoice", invoiceid: this.props.match.params.invoiceid })
        this.props.reduxProject({ projectid: this.props.match.params.projectid })


    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });

    }
    getinvoiceitemsbyid(csiid) {
        const invoiceid = this.props.match.params.invoiceid;
        const pm = new PM();
        let myproject = pm.getproject.call(this);
        let items = [];
        if (myproject.hasOwnProperty("actuallabor")) {
            // eslint-disable-next-line
            myproject.actuallabor.mylabor.map(mylabor => {
                if (mylabor.invoiceid === invoiceid) {
                    items.push(mylabor)
                }
            })

        }
        if (myproject.hasOwnProperty("actualmaterials")) {
            // eslint-disable-next-line
            myproject.actualmaterials.mymaterial.map(mymaterial => {
                if (mymaterial.invoiceid === invoiceid) {
                    items.push(mymaterial)
                }
            })

        }
        if (myproject.hasOwnProperty("actualequipment")) {
            // eslint-disable-next-line
            myproject.actualequipment.myequipment.map(myequipment => {
                if (myequipment.invoiceid === invoiceid) {
                    items.push(myequipment)
                }
            })

        }
        items.sort((a, b) => {
            return sorttimes(a.timein, b.timein)
        })
        return items;
    }
    invoiceitemsbycsiid(csiid) {
        const invoiceid = this.props.match.params.invoiceid;
        const pm = new PM();
        let myproject = pm.getproject.call(this);
        let items = [];
        if (myproject.hasOwnProperty("actuallabor")) {
            // eslint-disable-next-line
            myproject.actuallabor.mylabor.map(mylabor => {
                if (mylabor.csiid === csiid && (mylabor.invoiceid === invoiceid)) {
                    items.push(mylabor)
                }
            })

        }
        if (myproject.hasOwnProperty("actualmaterials")) {
            // eslint-disable-next-line
            myproject.actualmaterials.mymaterial.map(mymaterial => {
                if (mymaterial.csiid === csiid && (mymaterial.invoiceid === invoiceid)) {
                    items.push(mymaterial)
                }
            })

        }
        if (myproject.hasOwnProperty("actualequipment")) {
            // eslint-disable-next-line
            myproject.actualequipment.myequipment.map(myequipment => {
                if (myequipment.csiid === csiid && (myequipment.invoiceid === invoiceid)) {
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
        let items = this.invoiceitemsbycsiid(csiid);
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
    getdirectcost(csiid) {
        const pm = new PM()
        let myproject = pm.getproject.call(this)
        let invoiceid = this.props.match.params.invoiceid;
        let directcost = 0;
        if (myproject) {
            if (myproject.hasOwnProperty("actuallabor")) {
                // eslint-disable-next-line
                myproject.actuallabor.mylabor.map(mylabor => {

                    if (mylabor.csiid === csiid && (mylabor.invoiceid === invoiceid)) {

                        directcost += DirectCostForLabor(mylabor)


                    }
                })
            }

            if (myproject.hasOwnProperty("actualmaterials")) {
                // eslint-disable-next-line
                myproject.actualmaterials.mymaterial.map(mymaterial => {
                    if (mymaterial.csiid === csiid && (mymaterial.invoiceid === invoiceid)) {
                        directcost += DirectCostForMaterial(mymaterial)

                    }

                })
            }
        }

        if (myproject.hasOwnProperty("actualequipment")) {
            // eslint-disable-next-line
            myproject.actualequipment.myequipment.map(myequipment => {
                if (myequipment.csiid === csiid && (myequipment.invoiceid === invoiceid)) {
                    directcost += DirectCostForEquipment(myequipment)

                }

            })
        }

        return directcost;

    }
    getmyoverhead(csiid) {

        let directcost = this.getdirectcost(csiid);
        let profit = this.getprofit(csiid);
        let myoverhead = .03 * (directcost * 1 + (profit / 100));
        return myoverhead;
    }
    getoverhead(csiid) {

        let directcost = this.getdirectcost(csiid);
        let profit = this.getprofit(csiid)
        let myoverhead = this.getmyoverhead(csiid);

        if (!profit) {
            profit = 1
        } else {
            profit = 1 + (profit / 100)
        }
        let overhead = ((directcost * profit) + myoverhead) * .029 + .029 * (((directcost * profit) + myoverhead) * .029) + .029 * (.029 * (((directcost * profit) + myoverhead) * .029)) + .029 * (+ .029 * (.029 * (((directcost * profit) + myoverhead) * .029))) + .029 * (.029 * (+ .029 * (.029 * (((directcost * profit) + myoverhead) * .029))))
        return overhead;
    }
    getbidprice(csiid) {

        let directcost = this.getdirectcost(csiid);
        let profit = this.getprofit(csiid);


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

        if (quantity > 0 && bidprice > 0) {
            return (bidprice / quantity)

        } else {
            return;
        }


    }
    invoicesummary() {
        const pm = new PM();
        const styles = MyStylesheet();
        const headerFont = pm.getHeaderFont.call(this)
        const regularFont = pm.getRegularFont.call(this)
        let amount = Number(this.getamount() / 100)
        amount = amount.toFixed(2)

        const summary = () => {

            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>
                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                Please Pay the Amount of ${amount}
                            </div>

                        </div>
                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1, ...styles.alignCenter }}>

                            </div>
                        </div>
                    </div>
                </div>

            )

        }



        return (
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>
                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...headerFont, ...styles.generalFont }}>
                            <u>Invoice Summary </u>
                        </div>
                    </div>
                    {summary()}
                </div>
            </div>)

    }

    showsummary() {
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this)
        const headerFont = pm.getHeaderFont.call(this)
        const styles = MyStylesheet();
        const biditems = this.getitems();
        let amount = 0;
        if (biditems.length > 0) {
            // eslint-disable-next-line
            biditems.map(item => {
                amount += this.getbidprice(item.csiid)
            })
        }
        if (amount > 0) {

            return (
                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...headerFont, ...styles.generalFont }}>
                                <u>Invoice {this.props.match.params.invoiceid} Total</u>
                            </div>
                        </div>


                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont }}>
                                Please Pay the Amount of ${Number(amount).toFixed(2)}
                            </div>
                        </div>

                    </div>
                </div>
            )
        }
    }

    getamountowed() {
        const invoiceitems = this.getinvoiceitemsbyid();
        let owed = 0;
        if (invoiceitems) {
            // eslint-disable-next-line
            invoiceitems.map(item => {


                if (item.hasOwnProperty("laborid")) {

                    if (!item.settlementid) {

                        owed += DirectCostForLabor(item)
                        owed += ProfitForLabor(item)


                    }


                } else if (item.hasOwnProperty("materialid")) {


                    if (!item.settlementid) {


                        owed += DirectCostForMaterial(item);
                        owed += ProfitForMaterial(item)
                    }


                } else if (item.hasOwnProperty("equipmentid")) {
                    if (!item.settlementid) {


                        owed += DirectCostForEquipment(item)
                        owed += ProfitForEquipment(item)
                    }

                }

            })



        }
        return owed;

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


        return Math.round((amount * 100))


    }
    showbiditem(item) {

        const pm = new PM();
        const styles = MyStylesheet();
        const regularFont = pm.getRegularFont.call(this);
        const csi = pm.getactualcsibyid.call(this, item.csiid);

        let bidprice = this.getbidprice(item.csiid).toFixed(2);
        let unitprice = +Number(this.getunitprice(item.csiid)).toFixed(4);
        let directcost = Number(this.getdirectcost(item.csiid)).toFixed(2);
        let providerid = this.props.match.params.providerid;

        let projectid = this.props.match.params.projectid;
        let invoiceid = this.props.match.params.invoiceid;
        let profit = () => {
            return (
                this.getprofit(item.csiid)
            )
        }
        const quantity = () => {
            return (<div style={{ ...styles.generalContainer }}>
                Quantity <br />
                {this.getquantity(csi.csiid)}

            </div>)
        }
        const unit = () => {
            return (
                <div style={{ ...styles.generalContainer }}>
                    Unit <br />
                    {this.getunit(csi.csiid)}
                </div>)
        }
        if (this.state.width > 1200) {
            return (
                <tr>
                    <td> <Link style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }} to={`/${providerid}/myprojects/${projectid}/invoices/${invoiceid}/csi/${csi.csiid}`}> Line Item <br />
                        {csi.csi}-{csi.title} </Link></td>
                    <td style={{ ...styles.alignCenter }}>
                        {quantity()}
                    </td>
                    <td style={{ ...styles.alignCenter }}>{unit()}</td>
                    <td style={{ ...styles.alignCenter }}>{directcost}</td>
                    <td style={{ ...styles.alignCenter }}>{profit()}</td>
                    <td style={{ ...styles.alignCenter }}>{bidprice}</td>
                    <td style={{ ...styles.alignCenter }}> {`$${unitprice}/${this.getunit(csi.csiid)}`}</td>
                </tr>)



        } else {
            return (
                <div style={{ ...styles.generalFlex }} key={item.csiid}>
                    <div style={{ ...styles.flex1 }}>
                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex2, ...regularFont, ...styles.generalFont, ...styles.showBorder }}>
                                <Link style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }} to={`/${providerid}/myprojects/${projectid}/invoices/${invoiceid}/csi/${csi.csiid}`}> Line Item <br />
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
                                {profit()}
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

    getapproved() {
        const pm = new PM();

        const invoice = pm.getinvoicebyid.call(this, this.props.match.params.invoiceid)
        let approved = "";
        if (invoice) {

            if (invoice.approved) {

                approved = `Stripe Payment Captured On: ${UTCStringFormatDateforProposal(invoice.approved)}`;
            }
        }
        return approved;

    }





    getinvoice() {
        let invoiceid = this.props.match.params.invoiceid;
        let invoice = false;
        const pm = new PM();
        let myproject = pm.getproject.call(this);
        if (myproject.hasOwnProperty("invoices")) {
            // eslint-disable-next-line
            myproject.invoices.myinvoice.map(myinvoice => {
                if (myinvoice.invoiceid === invoiceid) {
                    invoice = myinvoice;
                }
            })
        }
        return invoice;
    }
    getactualitems() {

        let actualitems = false;
        let myinvoice = this.getinvoice();
        if (myinvoice) {
            if (myinvoice.hasOwnProperty("bid")) {
                actualitems = myinvoice.bid.biditem
            }
        }
        return actualitems;
    }
    getactualitem(csiid) {

        let actualitems = this.getactualitems();

        let actualitem = false;
        if (actualitems) {
            // eslint-disable-next-line
            actualitems.map(item => {
                if (item.csiid === csiid) {
                    actualitem = item;
                }
            })
        }
        return actualitem;
    }
    getquantity(csiid) {

        let actualitem = this.getactualitem(csiid);

        if (actualitem) {
            return Number(actualitem.quantity);
        } else {
            return;
        }

    }
    getitems() {
        const pm = new PM();
        let invoiceid = this.props.match.params.invoiceid;
        let payitems = pm.getAllActual.call(this)

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
                if (item.invoiceid === invoiceid) {
                    items.push(item)
                }

            }
            if (item.hasOwnProperty("materialid")) {
                if (item.invoiceid === invoiceid) {
                    items.push(item)
                }

            }
            if (item.hasOwnProperty("equipmentid")) {
                if (item.invoiceid === invoiceid) {
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
    getunit(csiid) {

        let scheduleitem = this.getactualitem(csiid);

        if (scheduleitem) {

            return scheduleitem.unit;


        } else {
            return ""
        }

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


    transfersbyproject() {
        const pm = new PM();
        const myproject = pm.getproject.call(this)
        let mytransfers = [];
        if(myproject) {
            const projectid = myproject.projectid;
            const invoices = pm.getinvoices.call(this,projectid)
            if(invoices) {
                // eslint-disable-next-line
                invoices.map(invoice=> {
                    if(invoice.hasOwnProperty("transfers")) {
                        // eslint-disable-next-line
                        invoice.transfers.map(transfer=> {
                            mytransfers.push(transfer)
                        })
                    }
                })
                
            }
        }
        return mytransfers;
    }
    

    validateInvoicePayment() {
        const chargetotal = this.getchargestotal();
        const transfers = this.transfersbyproject();
        let validate = {};
        validate.validate = false;
        const transfertotal = () => {
            let total = 0;
            if(transfers) {
                // eslint-disable-next-line
                transfers.map(transfer=> {
                    total+=Number(transfer.amount)
                })

            }
            return total;
        }
     
        const amount = Number(this.getamountowed()).toFixed(2);
        console.log(chargetotal,transfertotal(),amount);
        if(  chargetotal - transfertotal()  >= amount  && amount > 0) {
            validate.validate = true;

        } else {
            validate.message = `Invalid Transactions project balance is ${chargetotal - transfertotal()} and invoice amount is ${amount}`
        }
        return validate;


    }
    
    getsettlementtotal() {
        const pm = new PM();
        const settlements = pm.getsettlementsbyinvoiceid.call(this, this.props.match.params.invoiceid)
        let total = 0;
        if (settlements) {
            // eslint-disable-next-line
            settlements.map(settlement => {
                total += Number(settlement.amount)
            })
        }
        return total;


    }

    gettransfertotal() {
        const pm = new PM();
        const transfers = pm.gettransfersbyinvoiceid.call(this, this.props.match.params.invoiceid)
        let total = 0;
        if (transfers) {
            // eslint-disable-next-line
            transfers.map(transfer => {
                total += Number(transfer.amount)
            })
        }
        return total;


    }
    getchargestotal() {
        const pm = new PM();
        const project = pm.getprojectbytitle.call(this, this.props.match.params.projectid);
        let total = 0;
        if (project) {
            const projectid = project.projectid;
            const charges = pm.getchargesbyprojectid.call(this, projectid);
            if(charges) {
            // eslint-disable-next-line
            charges.map(charge => {
                total += Number(charge.amount);
            })

        }



        }
      
        return total;
    }
    async invoicesettlement() {
        const pm = new PM();
        const myuser = pm.getuser.call(this)
        const validate = this.validateInvoicePayment()
        if (window.confirm(`Are you sure you want to settle this invoice ?`)) {
            if(validate.validate) {
            const myproject = pm.getproject.call(this);
            if (myproject) {

                const projectid = myproject.projectid;
                const i = pm.getprojectkeybyid.call(this, projectid);
                const invoiceid = this.props.match.params.invoiceid;
                const amount = Number(Math.round(this.getamountowed()*100))
                const values = { invoiceid, amount }
                try{
                let response = await SettleInvoice(values)
                console.log(response)
                if (response.hasOwnProperty("settlements")) {

                    const myinvoice = pm.getinvoicebyid.call(this, this.props.match.params.invoiceid);
                    if (myinvoice) {
                        const j = pm.getinvoicekeybyid.call(this, this.props.match.params.invoiceid);
                        myuser.projects.myproject[i].invoices.myinvoice[j].settlements = response.settlements;
                        this.props.reduxUser(myuser)
                    }


                    if (response.hasOwnProperty("labor")) {
                        // eslint-disable-next-line
                        response.labor.map(labor => {
                            const laborid = labor.laborid;
                            const mylabor = pm.getactullaborbyid.call(this, projectid, laborid);
                            if (mylabor) {
                                const k = pm.getactullaborkeybyid.call(this, projectid, laborid);
                                myuser.projects.myproject[i].actuallabor.mylabor[k].settlementid = labor.settlementid;
                            }
                        })
                    }

                    if (response.hasOwnProperty("materials")) {
                        // eslint-disable-next-line
                        response.materials.map(material => {
                            const materialid = material.materialid;
                            const mymaterial = pm.getactulmaterialsbyid.call(this, projectid, materialid);
                            console.log(mymaterial)
                            if (mymaterial) {
                                const l = pm.getactualmaterialskeybyid.call(this, projectid, materialid);
                                console.log(l,mymaterial)
                                myuser.projects.myproject[i].actualmaterials.mymaterial[l].settlementid = material.settlementid;
                            }
                        })
                    }

                    if (response.hasOwnProperty("equipment")) {
                        // eslint-disable-next-line
                        response.equipment.map(equipment => {
                            const equipmentid = equipment.equipmentid;
                            const myequipment = pm.getactulequipmentbyid.call(this, projectid, equipmentid);
                            if (myequipment) {
                                const m = pm.getactulequipmentkeybyid.call(this, projectid, equipmentid);
                                myuser.projects.myproject[i].actualequipment.myequipment[m].settlementid = equipment.settlementid;
                            }
                        })
                    }

                    this.props.reduxUser(myuser)
                    this.setState({render:'render'})



                }

            } catch(err) {
                alert(err)
            }




            }



        } else {

            this.setState({message:validate.message})
        }



        }
    }

    showsettlement(settlement) {
        const pm = new PM();
        const styles = MyStylesheet();
        const regularFont = pm.getRegularFont.call(this)
        const settled = inputUTCStringForLaborID(settlement.settled);
        //const account = pm.getaccountbydestination.call(this, transfer.destination)
        return (<div style={{ ...regularFont, ...styles.generalFont }}>
            Invoice Settled on {settled} for the Amount ${settlement.amount}
        </div>)
    }

    showtransfer(transfer) {
        const pm = new PM();
        const styles = MyStylesheet();
        const regularFont = pm.getRegularFont.call(this)
        const created = inputUTCStringForLaborID(transfer.created);
        //const account = pm.getaccountbydestination.call(this, transfer.destination)
        return (<div style={{ ...regularFont, ...styles.generalFont }}>
            Transfer Created {created} for the Amount ${transfer.amount}
        </div>)
    }

    settlementSummary() {
        const pm = new PM()
        const styles = MyStylesheet();
        const settlements = pm.getsettlementsbyinvoiceid.call(this, this.props.match.params.invoiceid)
        const headerFont = pm.getHeaderFont.call(this)
        const regularFont = pm.getRegularFont.call(this)
        const sumofsettlement = () => {
            let sum = 0;

            if (settlements) {
                // eslint-disable-next-line
                settlements.map(settlement => {
                    sum += Number(settlement.amount)
                })
            }
            return sum;
        }
        let settlementids = [];
        const jsx = (settlementids) => {
            return (<div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...headerFont, ...styles.underline }}>
                            Settlement Summary
                </div>
                    </div>

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1 }}>
                            {settlementids}
                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...regularFont }}>
                            Sum of Settlements  ${Number(sumofsettlement()).toFixed(2)}
                        </div>
                    </div>


                </div>
            </div>)
        }



        if (settlements) {
            // eslint-disable-next-line
            settlements.map(settlement => {
                settlementids.push(this.showsettlement(settlement))

            })
        }
        return (jsx(settlementids))
    }

    balanaceSummary() {
        const pm = new PM();
        const styles = MyStylesheet();
        const debt = `$${Number(this.getamountowed()).toFixed(2)}`;
        const headerFont = pm.getHeaderFont.call(this);
        const regularFont = pm.getRegularFont.call(this)
        return (<div style={{ ...styles.generalFlex }}>
            <div style={{ ...styles.flex1 }}>

                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1, ...headerFont, ...styles.underline }}>
                        Balance Summary
                </div>
                </div>

                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1 }}>
                        <span style={{ ...styles.generalFont, ...regularFont }}> Payment Due {debt} </span>
                    </div>
                </div>

            </div>
        </div>)

    }

    transferSummary() {
        const pm = new PM()
        const styles = MyStylesheet();
        
       
        const headerFont = pm.getHeaderFont.call(this)
        const regularFont = pm.getRegularFont.call(this)
    

        const myproject = pm.getproject.call(this);
        if(myproject) {
            const projectid = myproject.projectid;
        const transfers = pm.gettransfersbyprojectid.call(this,projectid);
        const sumoftransfers = () => {
            let sum = 0;

            if (transfers) {
                // eslint-disable-next-line
                transfers.map(transfer => {
                    sum += Number(transfer.amount)
                })
            }
            return sum;
        }
        let transferids = [];
        const jsx = (transferids) => {
            return (<div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...headerFont, ...styles.underline }}>
                            Transfer Summary
                </div>
                    </div>

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1 }}>
                            {transferids}
                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...regularFont }}>
                            Sum of Transfers  ${Number(sumoftransfers()).toFixed(2)}
                        </div>
                    </div>


                </div>
            </div>)
        }

        if (transfers) {
            // eslint-disable-next-line
            transfers.map(transfer => {
                transferids.push(this.showtransfer(transfer))

            })
        }
        return (jsx(transferids))
    }
     
    }
   

    render() {
        const styles = MyStylesheet();
        const pm = new PM();
        const headerFont = pm.getHeaderFont.call(this)
        const invoiceid = this.props.match.params.invoiceid;
        const regularFont = pm.getRegularFont.call(this)
        const amountowed = this.getamountowed();
        // const charges = this.getchargestotal();
        // const transfers = this.gettransfertotal();
        // const settlementtotal = this.getsettlementtotal()
        // const amount = Number(this.getamount() / 100).toFixed(2);
   


        const settlement = () => {
        
            if (amountowed) {
                return (
                    <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                        <button className="addStroke" style={{ ...styles.boldFont, ...styles.settlementButton, ...headerFont, ...styles.marginAuto }} onClick={() => { this.invoicesettlement() }}>Settle Invoice</button>
                    </div>)
            }
        }

        const myuser = pm.getuser.call(this)
        if(myuser) {
            const project = pm.getproject.call(this)
            if(project) {

                const invoice = pm.getinvoicebyid.call(this,invoiceid)
                if(invoice) {

        return (
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>

                <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                <Link to={`/${myuser.profile}/profile`} className="nav-link" style={{ ...headerFont, ...styles.generalLink, ...styles.boldFont, ...styles.generalFont }}>  /{myuser.profile} </Link>
                            </div>

                            <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                <Link style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.boldFont }} to={`/${myuser.profile}/myprojects`}>  /myprojects  </Link>
                            </div>

                            <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                <Link style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.boldFont }} to={`/${myuser.profile}/myprojects/${project.title}`}>  /{project.title}  </Link>
                            </div>

                            <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                <Link style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.boldFont }} to={`/${myuser.profile}/myprojects/${project.title}/invoices`}>  /invoices </Link>
                            </div>

                            <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                <Link style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.boldFont }} to={`/${myuser.profile}/myprojects/${project.title}/invoices/${invoice.invoiceid}`}> /{invoice.invoiceid} </Link>
                            </div>

                        

                    {pm.showbidtable.call(this)}

                    <div style={{ ...styles.generalFlex, ...styles.topMargin15, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...regularFont, ...styles.generalFont }}>
                            {this.getapproved()}
                        </div>
                    </div>

                    {this.showsummary()}

                    {this.transferSummary()}

                    {this.settlementSummary()}

                    {this.balanaceSummary()}

                    {settlement()}

                    <div style={{ ...styles.generalFlex, ...styles.topMargin15, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                            <span style={{ ...regularFont, ...styles.generalFont }}>{this.state.message}</span>
                        </div>
                    </div>

                    {pm.showprojectid.call(this)}

                </div>
            </div>)

        } else {
            return(<div>Invoice Not found</div>)
        }

        } else {
            return(<div>Project Not Found</div>)
        }

        } else {
            return(<div>Please Login to View Invoice</div>)
        }



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
export default connect(mapStateToProps, actions)(ViewInvoice)


