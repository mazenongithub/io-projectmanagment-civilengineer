import React, { Component } from 'react';
import * as actions from './actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { MyStylesheet } from './styles';
import {
    DirectCostForLabor, ProfitForLabor, DirectCostForMaterial,
    ProfitForMaterial, DirectCostForEquipment, ProfitForEquipment,
    UTCStringFormatDateforProposal,
    CreateBidScheduleItem, sortcode, calculatetotalhours, UTCTimefromCurrentDate, createTransfer, isEmpty
} from './functions'
import PM from './pm';
import Spinner from './spinner'
import ProjectID from './projectid';
import MakeID from './makeids'
import { SettleInvoice } from './actions/api';


class ViewInvoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: '',
            width: 0,
            height: 0,
            message: "",
            spinner: false
        }

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    }
    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions()
        const pm = new PM();
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

    getprofit(csiid) {
        let profit = 0;
        let directcost = 0;
        let invoice = this.getinvoice()
        if (invoice) {
            if (invoice.hasOwnProperty("labor")) {
                // eslint-disable-next-line
                invoice.labor.map(mylabor => {
                    if (mylabor.csiid === csiid) {
                        directcost += DirectCostForLabor(mylabor);
                        profit += ProfitForLabor(mylabor);
                    }
                })

            }

            if (invoice.hasOwnProperty("materials")) {
                // eslint-disable-next-line
                invoice.materials.map(mymaterial => {
                    if (mymaterial.csiid === csiid) {
                        directcost += DirectCostForMaterial(mymaterial);
                        profit += ProfitForMaterial(mymaterial);
                    }
                })

            }

            if (invoice.hasOwnProperty("equipment")) {
                // eslint-disable-next-line
                invoice.equipment.map(equipment => {
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

        let invoice = this.getinvoice();
        let directcost = 0;
        if (invoice) {
            if (invoice.hasOwnProperty("labor")) {
                // eslint-disable-next-line
                invoice.labor.map(mylabor => {

                    if (mylabor.csiid === csiid) {

                        directcost += DirectCostForLabor(mylabor)


                    }
                })
            }

            if (invoice.hasOwnProperty("materials")) {
                // eslint-disable-next-line
                invoice.materials.map(mymaterial => {
                    if (mymaterial.csiid === csiid) {
                        directcost += DirectCostForMaterial(mymaterial)
                    }

                })
            }


            if (invoice.hasOwnProperty("equipment")) {
                // eslint-disable-next-line
                invoice.equipment.map(myequipment => {
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
                            <tr key={item.csiid}>
                                <td><Link style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }} to={`/${myuser.profile}/projects/${project.title}/invoices/${company.url}/csi/${csi.csiid}`}>{csi.csi}-{csi.title}</Link></td>
                                <td style={{ ...styles.alignCenter }}>
                                    {quantity}
                                </td>
                                <td style={{ ...styles.alignCenter }}>{unit}</td>
                                <td style={{ ...styles.alignCenter }}>${directcost}</td>
                                <td style={{ ...styles.alignCenter }}>{profit}</td>
                                <td style={{ ...styles.alignCenter }}>${bidprice}</td>
                                <td style={{ ...styles.alignCenter }}>  {unitprice}</td>
                            </tr>)


                    } else {
                        return (
                            <div style={{ ...styles.generalFlex }} key={item.csiid}>
                                <div style={{ ...styles.flex1 }}>
                                    <div style={{ ...styles.generalFlex }}>
                                        <div style={{ ...styles.flex2, ...regularFont, ...styles.generalFont, ...styles.showBorder }}>

                                            <Link style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }} to={`/${myuser.profile}/projects/${project.title}/invoices/${company.url}/csi/${csi.csiid}`}> Line Item <br />
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

    getinvoice() {
        let invoice = false;
        const pm = new PM();
        const company = this.getcompany()
        if (company) {
            const companyid = company.companyid;
            const project = pm.getproject.call(this);
            if (project) {

                if (project.hasOwnProperty("invoices")) {
                    // eslint-disable-next-line
                    project.invoices.map((myinvoice, i) => {
                        if (myinvoice.companyid === companyid) {
                            invoice = myinvoice;
                        }
                    })
                }

            }

        }
        return invoice;

    }
    getinvoicekey() {
        let key = false;
        const pm = new PM();
        const company = this.getcompany()
        if (company) {
            const companyid = company.companyid;
            const project = pm.getproject.call(this);
            if (project) {


                if (project.hasOwnProperty("invoices")) {
                    // eslint-disable-next-line
                    project.invoices.map((myinvoice, i) => {
                        if (myinvoice.companyid === companyid) {
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
        let myinvoice = this.getinvoice();
        if (myinvoice) {
            if (myinvoice.hasOwnProperty("bid")) {
                scheduleitems = myinvoice.bid
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

        const invoice = this.getinvoice()
        let getitems = false
        if (invoice.hasOwnProperty("bid")) {
            getitems = invoice.bid;

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

    getupdated() {
        const invoice = this.getinvoice();
        let updated = "";
        if (invoice) {
            if (invoice.updated) {
                updated = `Last Updated ${UTCStringFormatDateforProposal(invoice.updated)}`;
            }
        }
        return updated;
    }

    getapproved() {
        const invoice = this.getinvoice();
        let approved = "";
        if (invoice) {

            if (invoice.approved) {

                approved = `Approved ${UTCStringFormatDateforProposal(invoice.approved)}`;
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
        if (myuser) {
            if (myuser.hasOwnProperty("companys")) {
                // eslint-disable-next-line
                myuser.companys.map(company => {
                    if (company.url === this.props.match.params.url) {
                        getcompany = company;
                    }
                })

            }

        }

        return getcompany;

    }

    settleEquipmentID(myuser, equipment, settlement, avail, i, j, k) {

        const makeid = new MakeID();
        const pm = new PM();
        const transferid = makeid.transferid.call(this)
        const created = UTCTimefromCurrentDate();
        const amount = settlement;
      
      
        const company = this.getcompany();
        if(company) {
            const myequipment = pm.getcompanyequipmentbyid.call(this, equipment.myequipmentid)
        let destination = "";
        if (myequipment) {
            destination = myequipment.accountid;
        }

        const transfer = createTransfer(transferid, created, amount, destination)

        let scheduletransfers = pm.getTransfersByEquipmentID.call(this, company.companyid, equipment.equipmentid)
        if (scheduletransfers) {
         scheduletransfers.push(transfer)

        } else {

         scheduletransfers = [transfer]

        }

     myuser.projects[i].invoices[j].equipment[k].scheduletransfers = scheduletransfers;
     

    }
    return myuser;   

    }


    settleMaterialID(myuser, material, settlement, avail, i, j, k) {
        const makeid = new MakeID();
        const pm = new PM();
        const transferid = makeid.transferid.call(this)
        const created = UTCTimefromCurrentDate();
        const amount = settlement;
        
        const company = this.getcompany();
        if (company) {
            const mymaterial = pm.getcompanymaterialsbyid.call(this, material.mymaterialid)
            let destination = "";
            if (mymaterial) {
                destination = mymaterial.accountid;
            }
            const transfer = createTransfer(transferid, created, amount, destination)

            let scheduletransfers = pm.getTransfersByMaterialID.call(this,company.companyid, material.materialid)
            if (scheduletransfers) {
                scheduletransfers.push(transfer)

            } else {

                scheduletransfers = [transfer]

            }

            myuser.projects[i].invoices[j].materials[k].scheduletransfers = scheduletransfers;

        }
        return myuser;

    }

    settleLaborID(myuser, labor, settlement, avail, i, j, k) {
       
        const pm = new PM();
        const makeid = new MakeID();
        const company = this.getcompany();
        if (company) {
            const accounts = pm.getemployeeaccountratio.call(this, company.companyid, labor.providerid)

            if (accounts) {
                // eslint-disable-next-line
                accounts.map(account => {

                    const transferid = makeid.transferid.call(this)
                    const created = UTCTimefromCurrentDate();
                    const amount = settlement * account.ratio;
                    const destination = account.accountid;
            
                    const transfer = createTransfer(transferid, created, amount, destination)
                    
             
                    let scheduletransfers = pm.getTransfersByLaborID.call(this,company.companyid, labor.laborid)
                   
                    if (scheduletransfers) {
                        scheduletransfers.push(transfer)


                    } else {
                         scheduletransfers = [transfer]

                    }
                  myuser.projects[i].invoices[j].labor[k].scheduletransfers = scheduletransfers;


                })





            }
        }
        return myuser;

    }

    async saveInvoice(myuser) {
        const pm = new PM();
        const project = pm.getproject.call(this)
        const getuser = pm.getuser.call(this)

        if (getuser) {
            if (project) {
                const i = pm.getprojectkeybyid.call(this, project.projectid);

                const getInvoice = (myuser) => {

                    const company = this.getcompany();
                    let getinvoice = false;

                    if (myuser.hasOwnProperty("projects")) {
                        // eslint-disable-next-line
                        myuser.projects.map(getproject => {
                            if (getproject.projectid === project.projectid) {
                                if (getproject.hasOwnProperty("invoices")) {
                                    // eslint-disable-next-line
                                    getproject.invoices.map(invoice => {
                                        if (invoice.companyid === company.companyid) {
                                            getinvoice = invoice;

                                        }
                                    })


                                }

                            }

                        })
                    }
                    return getinvoice;

                }



                const getinvoice = this.getinvoice();

                if (getinvoice) {
                    const j = pm.getinvoicekeybyid.call(this, getinvoice.companyid)

                    const invoice = getInvoice(myuser)

                    try {
                       this.setState({ spinner: true })
                        let response = await SettleInvoice({ invoice })

                        this.setState({ spinner: false })
                        console.log(response)
                        if (response.hasOwnProperty("invoice")) {
                            getuser.projects[i].invoices[j] = response.invoice;
                            this.props.reduxUser(getuser)
                        }
                        let message = "";

                        if (response.hasOwnProperty("message")) {
                            message = response.message

                        }
                        this.setState({ message })




                    } catch (err) {
                
                        this.setState({ spinner: false })
                        alert(err)

                    }


                }


            }


        }




    }



    invoicesettlement() {

        const pm = new PM();
        let myuser = pm.getuser.call(this)
       
        const company = this.getcompany();
     
        let totalsettlement = 0;
        const transferstotal = this.gettransfertotal();
       
      

        if (myuser) {

            if (company) {

                const project = pm.getproject.call(this)
                if (project) {
                    const sumcharges = pm.sumOfChargesByProjectID.call(this, project.projectid)
                    let avail = sumcharges - transferstotal;

                   
                    const i = pm.getprojectkeybyid.call(this, project.projectid)
                   
                    const invoice = this.getinvoice();

                    if (invoice) {


                        const j = pm.getinvoicekeybyid.call(this, company.companyid)

                        if (invoice.hasOwnProperty("labor")) {
                            // eslint-disable-next-line
                            invoice.labor.map((labor, k) => {

                                let transferamount = 0;
                                const amount = calculatetotalhours(labor.timeout, labor.timein) * Number(labor.laborrate) * (1 + (Number(labor.profit) / 100))
                                const transfers = pm.getTransfersByLaborID.call(this, company.companyid, labor.laborid)

                                if (transfers) {

                                    transferamount = pm.sumOfTransfersByLaborID.call(this, company.companyid, labor.laborid)


                                }

                                let settlement = 0;

                                if (Number(Number(transferamount).toFixed(2)) < Number(Number(amount).toFixed(2))) {

                                    settlement = amount - transferamount;
                                    totalsettlement += settlement;
                                    console.log(this.getinvoice())
                                     myuser = this.settleLaborID(myuser, labor, settlement, avail, i, j, k)
                                     avail = avail - settlement;

                                }

                            })
                        }

                        if (invoice.hasOwnProperty("materials")) {
                            let transfersamount = 0;
                            // eslint-disable-next-line
                            invoice.materials.map((material, k) => {
                                transfersamount = pm.sumOfTransfersByMaterialID.call(this, company.companyid, material.materialid);
                                let amount = Number(material.quantity) * Number(material.unitcost) * (1 + (Number(material.profit) / 100))
                                let settlement = 0;

                                if (Number(Number(transfersamount).toFixed(2)) < Number(Number(amount).toFixed(2))) {
                                    settlement = amount - transfersamount;
                                    totalsettlement += settlement;
                                    myuser = this.settleMaterialID(myuser, material, settlement, avail, i, j, k)
                                    avail = avail - settlement;


                                }

                            })

                        }

                        if (invoice.hasOwnProperty("equipment")) {
                            let transfersamount = 0;
                            // eslint-disable-next-line
                            invoice.equipment.map((equipment, k) => {
                                transfersamount = pm.sumOfTransfersByEquipmentID.call(this, company.companyid, equipment.equipmentid);
                                const amount = calculatetotalhours(equipment.timeout, equipment.timein) * Number(equipment.equipmentrate) * (1 + (Number(equipment.profit) / 100))



                                let settlement = 0;

                                if (Number(Number(transfersamount).toFixed(2)) < Number(Number(amount).toFixed(2))) {
                                    settlement = amount - transfersamount;
                                    totalsettlement += settlement;
                                    myuser = this.settleEquipmentID(myuser, equipment, settlement, avail, i, j, k)
                                    avail = avail - settlement;


                                }

                            })

                        }






                        myuser.projects[i].invoices[j].approved = UTCTimefromCurrentDate();
                        myuser.projects[i].invoices[j].projectid = project.projectid;
                        if (avail > 0  && totalsettlement > 0) {

                            if(window.confirm(`Are you sure you want to settle Invoice? This will attempt to transfer $${Number(totalsettlement).toFixed(2)}`)) {
                        
                            this.saveInvoice(myuser)

                            }
                        
                        } else {
                            if (totalsettlement <= 0) {
                                alert(`There is nothing to settle on this invoice!`)
                            } else if (avail < 0) {
                                alert(`You dont have available ${avail}. You tried to settle the invoice for ${totalsettlement}. Please add more money to the project`)
                            }
                        }


                    }



                }


            }

        }

    }

    gettransfers() {
        const invoice = this.getinvoice();
        let transfers = [];
        if (invoice.hasOwnProperty("labor")) {
            // eslint-disable-next-line
            invoice.labor.map(labor => {
                if (labor.hasOwnProperty("scheduletransfers")) {

                    transfers = [...transfers, ...labor.scheduletransfers];
                }
            })
        }

        if (invoice.hasOwnProperty("materials")) {
            // eslint-disable-next-line
            invoice.materials.map(material => {
                if (material.hasOwnProperty("scheduletransfers")) {
                    transfers = [...transfers, ...material.scheduletransfers]
                }
            })

        }

        if (invoice.hasOwnProperty("equipment")) {
            // eslint-disable-next-line
            invoice.equipment.map(equipment => {
                transfers = [...transfers, ...equipment.scheduletransfers]
            })


        }
        return transfers;
    }

    getCharges() {
        const pm = new PM();
        const project = pm.getproject.call(this)
        let charges = false;
        if (project) {
            charges = pm.getchargesbyprojectid.call(this, project.projectid);

        }
        return charges;

    }

    getChargesTotal() {
        const charges = this.getCharges();
        let amount = 0;
        if (charges) {
            // eslint-disable-next-line
            charges.map(charge => {
                amount += Number(charge.amount)

            })
        }
        return amount;
    }

    gettransfertotal() {
        const transfers = this.gettransfers();
        let amount = 0;
        if (transfers) {
            // eslint-disable-next-line
            transfers.map(transfer => {
                amount += Number(transfer.amount)
            })
        }
        return amount;
    }



    render() {
        const styles = MyStylesheet();
        const pm = new PM();
        const headerFont = pm.getHeaderFont.call(this)
        const regularFont = pm.getRegularFont.call(this)
        const transferstotal = this.gettransfertotal();
        const amount = this.getamount();
        const amountowed = amount - transferstotal;

        const projectid = new ProjectID();
      
        const settlement = () => {


            if (!this.state.spinner) {

                return (
                    <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }} >
                        <button className="addStroke" 
                        style={{ ...styles.boldFont, ...styles.settlementButton, ...headerFont, ...styles.marginAuto }} 
                        onClick={()=>{this.invoicesettlement() }}>Settle Invoice</button>
                    </div>)

            } else {
                return (<Spinner />)
            }

        }




        const myuser = pm.getuser.call(this)
       
        if (myuser) {
            const project = pm.getproject.call(this)
            const company = this.getcompany();
            if (company) {
                if (project) {

                    const sumcharges = pm.sumOfChargesByProjectID.call(this, project.projectid)

                
                    const invoice = this.getinvoice();
                    if (invoice) {
                     
                       
                        const amount = Number(this.getamount()).toFixed(2)

                        return (
                            <div style={{ ...styles.generalFlex }}>
                                <div style={{ ...styles.flex1 }}>

                                    <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                        <Link style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.boldFont }} to={`/${myuser.profile}/projects/${project.title}`}>  /{project.title}  </Link>
                                    </div>

                                    <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                        <Link style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.boldFont }} to={`/${myuser.profile}/projects/${project.title}/invoices`}>  /invoices </Link>
                                    </div>

                                    <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                        <Link style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.boldFont }} to={`/${myuser.profile}/projects/${project.title}/invoices/${company.url}`}> /{company.url} </Link>
                                    </div>


                                    {pm.showbidtable.call(this)}

                                    <div style={{ ...styles.generalContainer }}>
                                        <span style={{ ...regularFont, ...styles.generalFont }}>Invoice Total: ${Number(amount).toFixed(2)}.
                                         You have posted ${Number(sumcharges).toFixed(2)} in Charges of which ${Number(transferstotal).toFixed(2)} has been transferred.
                                         The Current Settlement Amount  is ${Number(amountowed).toFixed(2)}
                                          </span>
                                    </div>

                                    <div style={{ ...styles.generalContainer, ...regularFont, ...styles.generalFont, ...styles.alignCenter }}>
                                        {this.state.message}
                                    </div>

                                    {settlement()}


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
                        return (<div>Invoice Not Found</div>)
                    }

                } else {
                    return (<div>Project Not Found</div>)
                }

            } else {
                return (<div>Company Not Found</div>)
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
        allusers: state.allusers,
        csis: state.csis
    }
}
export default connect(mapStateToProps, actions)(ViewInvoice)