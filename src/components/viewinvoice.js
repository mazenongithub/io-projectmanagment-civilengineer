import React, { Component } from 'react';
import * as actions from './actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { MyStylesheet } from './styles';
import { sorttimes, DirectCostForLabor, ProfitForLabor, DirectCostForMaterial, ProfitForMaterial, DirectCostForEquipment, ProfitForEquipment, CreateBidScheduleItem, UTCStringFormatDateforProposal, returnCompanyList, calculatetotalhours, createTransfer, getMyCurrentTime, makeID, sortcode } from './functions'
import PM from './pm'
import { SettleInvoice, LoadAllUsers } from './actions/api';
import Spinner from './spinner'



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
        const pm = new PM();
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions()
        this.props.reduxNavigation({ navigation: "viewinvoice", invoiceid: this.props.match.params.invoiceid })
        this.props.reduxProject({ projectid: this.props.match.params.projectid })
        const allusers = pm.getallusers.call(this)
        if (!allusers) {
            this.loadallusers()
        }

    }
    async loadallusers() {
        try {
            let response = await LoadAllUsers();
            console.log(response)
            if (response.hasOwnProperty("allusers")) {
                let companys = returnCompanyList(response.allusers);
                this.props.reduxAllCompanys(companys)
                this.props.reduxAllUsers(response.allusers);
            }
        } catch (err) {
            alert(err)
        }

    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });

    }
    getinvoiceitems() {
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


    getamount() {

        const biditems = this.getitems();
        let amount = 0;
        if (biditems.length > 0) {
            // eslint-disable-next-line
            biditems.map(item => {
                amount += this.getbidprice(item.csiid)
            })
        }


        return amount;


    }
    showbiditem(item) {

        const pm = new PM();
        const styles = MyStylesheet();
        const regularFont = pm.getRegularFont.call(this);
        const csi = pm.getcsibyid.call(this, item.csiid);

        let bidprice = this.getbidprice(item.csiid)
        let unitprice = this.getunitprice(item.csiid) > 0 ? (this.getunitprice(item.csiid)):0
        let directcost = Number(this.getdirectcost(item.csiid))
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
                    <td style={{ ...styles.alignCenter }}>${Number(directcost).toFixed(2)}</td>
                    <td style={{ ...styles.alignCenter }}>{+Number(profit()).toFixed(4)}</td>
                    <td style={{ ...styles.alignCenter }}>{Number(bidprice).toFixed(2)}</td>
                    <td style={{ ...styles.alignCenter }}> {`$${Number(unitprice).toFixed(2)}/${this.getunit(csi.csiid)}`}</td>
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
                                ${Number(directcost).toFixed(2)}
                            </div>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                                Profit % <br />
                                {Number(profit().toFixed(4))}
                            </div>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                                Bid Price <br />
                                ${Number(bidprice).toFixed(2)}
                            </div>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                                Unit Price
                                {`$${Number(unitprice).toFixed(2)}/${this.getunit(csi.csiid)}`}
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
        if (myproject) {
            const projectid = myproject.projectid;
            const invoices = pm.getinvoices.call(this, projectid)
            if (invoices) {
                // eslint-disable-next-line
                invoices.map(invoice => {
                    if (invoice.hasOwnProperty("transfers")) {
                        // eslint-disable-next-line
                        invoice.transfers.map(transfer => {
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
            if (transfers) {
                // eslint-disable-next-line
                transfers.map(transfer => {
                    total += Number(transfer.amount)
                })

            }
            return total;
        }

        const amount = Number(this.getamountowed()).toFixed(2);

        if (chargetotal - transfertotal() >= amount && amount > 0) {
            validate.validate = true;

        } else {
            validate.message = `Invalid Transactions project balance is ${chargetotal - transfertotal()} and invoice amount is ${amount}`
        }
        return validate;


    }



    gettransfertotal() {
        const pm = new PM();
        const items = this.getinvoiceitems();

        let amount = 0;
        if (items) {
            // eslint-disable-next-line
            items.map(item => {

                if (item.hasOwnProperty("laborid")) {

                    amount += pm.sumOfTransfersByLaborID.call(this, item.laborid)

                } else if (item.hasOwnProperty("equipmentid")) {
                    amount += pm.sumOfTransfersByEquipmentID.call(this, item.equipmentid)

                } else if (item.hasOwnProperty("materialid")) {
                    amount += pm.sumOfTransfersByMaterialID.call(this, item.materialid)

                }


            })

        }


        return amount;

    }
    getchargestotal() {
        const pm = new PM();
        const project = pm.getprojectbytitle.call(this, this.props.match.params.projectid);
        let total = 0;
        if (project) {
            const projectid = project.projectid;
            const charges = pm.getchargesbyprojectid.call(this, projectid);
            if (charges) {
                // eslint-disable-next-line
                charges.map(charge => {
                    total += Number(charge.amount);
                })

            }



        }

        return total;
    }




    createLaborTransfers(providerid, amount) {
        const pm = new PM();
        const benefits = pm.getemployeebenefitsbyid.call(this, providerid);
        let totalbenefits = 0;
        let scheduletransfers = [];
        const amountratio = (benefit, totalbenefit) => {
            return (benefit / totalbenefit)
        }
        if (benefits) {
            // eslint-disable-next-line
            benefits.map(benefit => {
                totalbenefits += Number(benefit.amount)
            })
            // eslint-disable-next-line
            benefits.map(benefit => {

                amount = amount * amountratio(Number(benefit.amount), totalbenefits)
                let destination = benefit.accountid;
                let created = getMyCurrentTime()
                let transferid = makeID(16)
                let transfer = createTransfer(transferid, created, amount, destination);
                scheduletransfers.push(transfer)



            })

        }

        return scheduletransfers;

    }


    settleInvoice() {
        const pm = new PM();
        const myuser = pm.getuser.call(this)

        if (myuser) {

            const myproject = pm.getproject.call(this)
            if (myproject) {
                const i = pm.getprojectkeybyid.call(this, myproject.projectid)
                const invoice = pm.getinvoicebyid.call(this, this.props.match.params.invoiceid)
                if (invoice) {

                    const items = this.getinvoiceitems();
                    if (items) {
                        // eslint-disable-next-line
                        items.map(item => {

                            if (item.hasOwnProperty("laborid")) {
                                let amount = (calculatetotalhours(item.timeout, item.timein) * item.laborrate * (1 + (Number(item.profit) / 100))) - pm.sumOfTransfersByLaborID.call(this,item.laborid)
                                if(amount > 0) {
                                const transfers = this.createLaborTransfers(item.providerid, amount);
                                const mylabor = pm.getactullaborbyid.call(this, myproject.projectid, item.laborid)
                                if (mylabor) {
                                    const j = pm.getactullaborkeybyid.call(this, myproject.projectid, item.laborid)
                                    myuser.projects.myproject[i].actuallabor.mylabor[j].scheduletransfers = [...myuser.projects.myproject[i].actuallabor.mylabor[j].scheduletransfers, ...transfers]

                                }

                            }
                            }

                            if (item.hasOwnProperty("materialid")) {
                                let amount = (Number(item.quantity) * Number(item.unitcost) * (1 + (Number(item.profit) / 100)))  - pm.sumOfTransfersByMaterialID.call(this,item.materialid)
                                let created = getMyCurrentTime()
                                if(amount > 0) {
                                let transfer = createTransfer(makeID(16), created, amount, item.accountid)
                                const mymaterial = pm.getactulmaterialsbyid.call(this, myproject.projectid, item.materialid)
                                if (mymaterial) {
                                    const l = pm.getactualmaterialskeybyid.call(this, myproject.projectid, item.materialid)
                                    myuser.projects.myproject[i].actualmaterials.mymaterial[l].scheduletransfers.push(transfer)
                                }

                            }

                            }

                            if (item.hasOwnProperty("equipmentid")) {
                                let amount = (calculatetotalhours(item.timeout, item.timein) * item.equipmentrate * (1 + (Number(item.profit) / 100))) - pm.sumOfTransfersByEquipmentID.call(this,item.equipmentid)
                                let created = getMyCurrentTime()
                                if(amount > 0) {
                                let transfer = createTransfer(makeID(16), created, amount, item.accountid)
                                const myequiupment = pm.getactulequipmentbyid.call(this, myproject.projectid, item.equipmentid)
                                if (myequiupment) {
                                    const m = pm.getactulequipmentkeybyid.call(this, myproject.projectid, item.equipmentid)
                                    myuser.projects.myproject[i].actualequipment.myequipment[m].scheduletransfers.push(transfer)
                                }

                            }
                            }


                        })

                        this.props.reduxUser(myuser)
                        this.setState({ render: 'render' })


                    }



                }

            }

        }





    }

    getlaboritems() {
        const items = this.getinvoiceitems();
        let myitems = [];
        if (items) {
            // eslint-disable-next-line
            items.map(item => {

                if (item.hasOwnProperty("laborid")) {
                    myitems.push(item)
                }
            })
        }
        return myitems;

    }

    getmaterialitems() {
        const items = this.getinvoiceitems();
        let myitems = [];
        if (items) {
            // eslint-disable-next-line
            items.map(item => {
                if (item.hasOwnProperty("materialid")) {
                    myitems.push(item)
                }

            })
        }
        return myitems;

    }
    getequipmentitems() {
        const items = this.getinvoiceitems();
        let myitems = [];

        if (items) {
            // eslint-disable-next-line
            items.map(item => {
                if (item.hasOwnProperty("equipmentid")) {
                    myitems.push(item)
                }

            })
        }
        return myitems;

    }

    getSettledInvoice() {
        let getinvoice = {};
        const pm = new PM();
        const invoice = pm.getinvoicebyid.call(this, this.props.match.params.invoiceid)
        getinvoice.invoiceid = invoice.invoiceid;
        getinvoice.approved = invoice.approved;
        const labor = this.getlaboritems();
        const materials = this.getmaterialitems();
        const equipment = this.getequipmentitems();

        getinvoice.labor = labor;
        getinvoice.materials = materials;
        getinvoice.equipment = equipment;
        return getinvoice;

    }

    validateBalanceAvailable() {
        const pm = new PM();
        let validate = false;
        const project = pm.getproject.call(this)
        if(project) {
            const projectid = project.projectid;
            const sumofcharges = pm.sumOfChargesByProjectID.call(this,projectid)
            const sumofpayments = pm.sumOfPaymentsByProjectID.call(this,projectid)
            const balanceavail = sumofcharges - sumofpayments;
            const transfers = this.gettransfertotal();
            // const settlementtotal = this.getsettlementtotal()
            const amount = Number(this.getamount())
            const amountowed = amount - transfers;
            
            
            
            if(balanceavail>amountowed && amountowed > 0) {
                validate = true;
            }

        }
        return validate;
    }

    async invoicesettlement() {
        const pm = new PM();
        const myproject = pm.getproject.call(this);
        const viewinvoice = new ViewInvoice();
        const validate = this.validateBalanceAvailable();
        if(validate) {

        if (myproject) {

            try {

                viewinvoice.settleInvoice.call(this)
                this.setState({ spinner: true })
                const invoice = this.getSettledInvoice()
                let values = { invoice }
                let response = await SettleInvoice(values)
                console.log(response)
                this.setState({ spinner: false })
                if (response.hasOwnProperty("message")) {
                    this.setState({ message: response.message })
                }
            } catch (err) {
                this.setState({ spinner: false })
                alert(err)
            }


        }

    } else {
        const sumofcharges = pm.sumOfChargesByProjectID.call(this,myproject.projectid)
        const sumofpayments = pm.sumOfPaymentsByProjectID.call(this,myproject.projectid)
        const balanceavail = sumofcharges - sumofpayments;
        const transfers = this.gettransfertotal();
        // const settlementtotal = this.getsettlementtotal()
        const amount = this.getamount()
        const amountowed = amount - transfers;

       let message = `You currently do not have balance to settle invoice You have $${Number(balanceavail).toFixed(2)} and you owe $${Number(amountowed).toFixed(2)}`;
       this.setState({message})
    }

    }








    balanaceSummary() {
        const pm = new PM();
        const styles = MyStylesheet();
        const headerFont = pm.getHeaderFont.call(this);
        const regularFont = pm.getRegularFont.call(this)
        const amount = this.getamount();
        const sumoftransfers = this.gettransfertotal();
        // const settlementtotal = this.getsettlementtotal()
        const amountowed = amount - sumoftransfers;
        return (<div style={{ ...styles.generalFlex }}>
            <div style={{ ...styles.flex1 }}>

                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1, ...headerFont, ...styles.underline }}>
                        Balance Summary
                </div>
                </div>

                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1 }}>
                        <span style={{ ...styles.generalFont, ...regularFont }}> Calculated Invoice Amount is ${Number(amount).toFixed(2)} Total amount of Transfers received for items on this invoice is ${Number(sumoftransfers).toFixed(2)}. The amount owed is ${Number(amountowed).toFixed(2)} </span>
                    </div>
                </div>

            </div>
        </div>)

    }




    render() {
        const styles = MyStylesheet();
        const pm = new PM();
        const headerFont = pm.getHeaderFont.call(this)
        const invoiceid = this.props.match.params.invoiceid;
        const regularFont = pm.getRegularFont.call(this)

        // const charges = this.getchargestotal();
        const transfers = this.gettransfertotal();
        // const settlementtotal = this.getsettlementtotal()
        const amount = Number(this.getamount() / 100)
        const amountowed = amount - transfers;


        const settlement = () => {

            if (amountowed) {
                if (!this.state.spinner) {
                    return (
                        <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                            <button className="addStroke" style={{ ...styles.boldFont, ...styles.settlementButton, ...headerFont, ...styles.marginAuto }} onClick={() => { this.invoicesettlement() }}>Settle Invoice</button>
                        </div>)

                } else {
                    return (<Spinner />)
                }
            }
        }

        const myuser = pm.getuser.call(this)
        const csis = pm.getcsis.call(this);
        if (!csis) {
            pm.loadcsis.call(this)
        }
        if (myuser) {
            const project = pm.getproject.call(this)
            if (project) {

                const invoice = pm.getinvoicebyid.call(this, invoiceid)
                if (invoice) {

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
                    return (<div>Invoice Not found</div>)
                }

            } else {
                return (<div>Project Not Found</div>)
            }

        } else {
            return (<div>Please Login to View Invoice</div>)
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
export default connect(mapStateToProps, actions)(ViewInvoice)


