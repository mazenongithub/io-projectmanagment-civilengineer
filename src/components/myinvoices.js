import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { ProviderEndPoint, InsertInvoice } from './actions/api'
import './invoices.css';
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
    createInvoiceIcon,
    removeIcon,
    SaveAllProjectIcon
}
    from './svg';


class MyInvoices extends Component {

    constructor(props) {
        super(props)
        this.state = {
            render: '',
            invoiceidmsg: 'Invoice ID is clear, Click to Create A New Invoice',
            message: "",
            activeinvoiceid: "",
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

    loadinvoiceids() {
        let invoiceids = []
        if (this.props.projectsprovider.hasOwnProperty("length")) {
            let projectid = this.props.projectid.projectid;
            // eslint-disable-next-line
            this.props.projectsprovider.map(myproject => {
                if (myproject.projectid === projectid) {
                    if (myproject.hasOwnProperty("invoices")) {
                        // eslint-disable-next-line
                        myproject.invoices.myinvoice.map(myinvoice => {

                            invoiceids.push(this.showinvoiceid(myinvoice))
                        })
                    }
                }
            })
        }
        return invoiceids;
    }

    findinvoice(invoiceid) {
        if (this.state.activeinvoiceid === invoiceid) {
            this.setState({ activeinvoiceid: "" })
        } else {
            this.setState({ activeinvoiceid: invoiceid })
        }


    }
    deleteInvoice(invoiceid) {
        if (window.confirm(`Are you sure you want to delete Invoice ID ${invoiceid}?`)) {
            if (this.props.projectsprovider.hasOwnProperty("length")) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("actuallabor")) {
                            // eslint-disable-next-line
                            myproject.actuallabor.mylabor.map((mylabor, j) => {
                                if (mylabor.invoiceid === invoiceid) {
                                    this.props.projectsprovider[i].actuallabor.mylabor[j].invoiceid = "";
                                }


                            })
                        }

                        if (myproject.hasOwnProperty("actualmaterials")) {
                            // eslint-disable-next-line
                            myproject.actualmaterials.mymaterial.map((mymaterial, j) => {
                                if (mymaterial.invoiceid === invoiceid) {
                                    this.props.projectsprovider[i].actualmaterials.mymaterial[j].invoiceid = "";
                                }


                            })

                        }

                        if (myproject.hasOwnProperty("invoices")) {
                            // eslint-disable-next-line
                            myproject.invoices.myinvoice.map((myinvoice, j) => {
                                if (myinvoice.invoiceid === invoiceid) {
                                    this.props.projectsprovider[i].invoices.myinvoice.splice(j, 1)
                                }
                            })
                        }
                    }
                })

                let obj = this.props.projectsprovider;
                this.props.projectsProvider(obj);
                this.setState({ activeinvoiceid: "" })
            }
        }
    }
    getactiveinvoicemessage(invoiceid) {
        if (this.state.activeinvoiceid) {
            if (this.state.activeinvoiceid === invoiceid) {
                return (` is Active`)
            }
        }
    }
    getdeactivate(invoiceid) {
        if (this.state.activeinvoiceid) {
            if (this.state.activeinvoiceid === invoiceid) {
                return (<div className="general-flex">
                    <div className="flex-1">

                    </div>

                </div>)
            }
        }
    }
    getactiveinvoicecontainer(invoiceid) {

        let invoice = "";
        if (this.state.activeinvoiceid === invoiceid) {
            invoice = `activeinvoice-container`
        } else {
            invoice = `inactiveinvoice`
        }

        return invoice;
    }
    showinvoiceid(myinvoice) {

        return (<div className="general-flex addBottomMargin">
            <div className={`flex-2 regularFont invoiceid-container ${this.getactiveinvoicecontainer(myinvoice.invoiceid)}`} onClick={() => { this.findinvoice(myinvoice.invoiceid) }}>Invoice ID {myinvoice.invoiceid} {this.getactiveinvoicemessage(myinvoice.invoiceid)}</div>
            <div className="flex-1 regularFont alignTop addLeftMargin align-contentCenter"> <button className="general-button remove-item" onClick={event => { this.deleteInvoice(myinvoice.invoiceid) }}>{removeIcon()}</button><br />remove</div>
        </div>)
    }
    getproject() {
        let project = {};
        let projectid = "";
        if (this.props.projectsprovider) {
            if (this.props.projectsprovider.hasOwnProperty("length")) {

                projectid = this.props.projectid.projectid;


                // eslint-disable-next-line
                this.props.projectsprovider.map(myproject => {
                    if (myproject.projectid === projectid) {
                        project = myproject;
                    }
                })
            }
        }

        return project;
    }
    getactiveinvoice() {
        let invoice = {};
        if (this.state.activeinvoiceid) {
            let invoiceid = this.state.activeinvoiceid;
            let myproject = this.getproject();
            if (myproject.hasOwnProperty("invoices")) {
                // eslint-disable-next-line
                myproject.invoices.mypropsal.map(myinvoice => {
                    if (myinvoice.invoiceid === invoiceid) {
                        invoice = myinvoice;
                    }
                })
            }
        }
        return invoice;
    }
    getprojecttitle() {
        let title = "";
        if (this.props.projectsprovider.hasOwnProperty("length")) {
            let myproject = this.getproject()
            title = `${myproject.projectid}/${myproject.title}`
        }

        return title;
    }
    clearinvoiceid(event) {
        this.setState({
            activeinvoiceid: "",
            invoiceidmsg: 'Invoice ID is clear, Click to Create A New Invoice',
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
    async createnewinvoice() {
        let errmsg = this.validateproject();
        if (!errmsg) {
            let providerid = this.props.myusermodel.providerid;
            let projectid = this.props.projectid.projectid;
            let myproject = this.getproject();
            let values = { providerid, projectid, myproject }
            let response = await InsertInvoice(values);
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
                            this.setState({ activeinvoiceid: response.insertinvoice, message: `${response.message} Last Updated ${dateupdated}` })
                        }
                    })
                }
            }
        }
        else {
            this.setState({ message: errmsg })
        }

    }

    getinvoiceamount() {
        let amount = 0;
        if (this.state.activeinvoiceid) {
            let invoiceid = this.state.activeinvoiceid;
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
        }
        return (`$${amount.toFixed(2)}`)
    }
    loadinvoiceitems() {
        let items = [];
        let invoice = [];
        let myproject = this.getproject();

        if (this.state.activeinvoiceid) {

            invoice.push(<div className="proposal-main-row addBottomMargin">Viewing All Actual Costs, Add the Item to the Invoice {this.state.activeinvoiceid}</div>)
            if (this.props.projectsprovider.hasOwnProperty("length")) {



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
            }
            items.sort((a, b) => {
                return sorttimes(a.timein, b.timein)
            })
            // eslint-disable-next-line
            items.map(item => {
                if (item.hasOwnProperty("laborid")) {
                    invoice.push(this.showlaborid(item))
                }
                else if (item.hasOwnProperty("materialid")) {
                    invoice.push(this.showmaterialid(item))
                }
            })
            invoice.push(<div className="proposal-title-row addBottomMargin"> The Total Amount for Invoice {this.state.activeinvoiceid} is {this.getinvoiceamount()}</div>)

        }
        return invoice;
    }
    findmymaterial(materialid) {

        let material = {};
        let myproject = this.getproject();
        if (myproject.hasOwnProperty("actualmaterials")) {
            // eslint-disable-next-line
            myproject.actualmaterials.mymaterial.map(mymaterial => {
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
        if (myproject.hasOwnProperty("actuallabor")) {
            // eslint-disable-next-line
            myproject.actuallabor.mylabor.map(mylabor => {
                if (mylabor.laborid === laborid) {

                    labor = mylabor;
                }
            })
        }
        return labor;
    }
    handlematerialicon(materialid) {
        if (this.state.activeinvoiceid) {
            let invoiceid = this.state.activeinvoiceid;
            let mymaterial = this.findmymaterial(materialid)
            if (mymaterial.invoiceid === invoiceid) {
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
        if (this.state.activeinvoiceid) {
            let invoiceid = this.state.activeinvoiceid;
            // eslint-disable-next-line
            this.props.projectsprovider.map((myproject, i) => {
                let projectid = this.props.projectid.projectid;
                if (myproject.projectid === projectid) {
                    if (myproject.hasOwnProperty("actuallabor")) {
                        // eslint-disable-next-line
                        myproject.actuallabor.mylabor.map((mylabor, j) => {
                            if (mylabor.laborid === laborid) {
                                this.props.projectsprovider[i].actuallabor.mylabor[j].invoiceid = invoiceid;
                                this.updatetime(invoiceid)
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
        if (this.state.activeinvoiceid) {
            let invoiceid = this.state.activeinvoiceid;
            // eslint-disable-next-line
            this.props.projectsprovider.map((myproject, i) => {
                let projectid = this.props.projectid.projectid;
                if (myproject.projectid === projectid) {
                    if (myproject.hasOwnProperty("actuallabor")) {
                        // eslint-disable-next-line
                        myproject.actuallabor.mylabor.map((mylabor, j) => {
                            if (mylabor.laborid === laborid) {
                                this.props.projectsprovider[i].actuallabor.mylabor[j].invoiceid = "";
                                this.updatetime(invoiceid)
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
        if (this.state.activeinvoiceid) {
            let invoiceid = this.state.activeinvoiceid;
            // eslint-disable-next-line
            this.props.projectsprovider.map((myproject, i) => {
                let projectid = this.props.projectid.projectid;
                if (myproject.projectid === projectid) {
                    if (myproject.hasOwnProperty("actualmaterials")) {
                        // eslint-disable-next-line
                        myproject.actualmaterials.mymaterial.map((mymaterial, j) => {
                            if (mymaterial.materialid === materialid) {
                                this.props.projectsprovider[i].actualmaterials.mymaterial[j].invoiceid = invoiceid;
                                this.updatetime(invoiceid)
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
    updatetime(invoiceid) {
        if (this.props.projectsprovider.hasOwnProperty("length")) {
            let projectid = this.props.projectid.projectid;
            // eslint-disable-next-line
            this.props.projectsprovider.map((myproject, i) => {
                if (myproject.projectid === projectid) {
                    if (myproject.hasOwnProperty("invoices")) {
                        // eslint-disable-next-line
                        myproject.invoices.myinvoice.map((myinvoice, j) => {
                            if (myinvoice.invoiceid === invoiceid) {

                                this.props.projectsprovider[i].invoices.myinvoice[j].updated = UTCTimefromCurrentDate();
                            }
                        })
                    }
                }
            })
        }
    }

    removematerial(materialid) {

        if (this.state.activeinvoiceid) {
            let invoiceid = this.state.activeinvoiceid;
            // eslint-disable-next-line
            this.props.projectsprovider.map((myproject, i) => {
                let projectid = this.props.projectid.projectid;
                if (myproject.projectid === projectid) {
                    if (myproject.hasOwnProperty("actualmaterials")) {
                        // eslint-disable-next-line
                        myproject.actualmaterials.mymaterial.map((mymaterial, j) => {
                            if (mymaterial.materialid === materialid) {
                                this.props.projectsprovider[i].actualmaterials.mymaterial[j].invoiceid = "";
                                this.updatetime(invoiceid)
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
        if (this.state.activeinvoiceid) {
            let invoiceid = this.state.activeinvoiceid;
            let mylabor = this.getmylabor(laborid)
            if (mylabor.invoiceid === invoiceid) {
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
                        this.setState({ message: `${response.message} Last Updated ${dateupdated}`, activeinvoiceid: this.searchresponseforactiveid(response) })


                    }
                })
            }
        }

    }
    searchresponseforactiveid(response) {
        let activeinvoiceid = this.state.activeinvoiceid;
        let invoiceid = "";
        if (activeinvoiceid) {
            let myproject = response.projectsprovider.myproject[0];
            if (myproject.hasOwnProperty("invoices")) {
                // eslint-disable-next-line
                myproject.invoices.myinvoice.map(myinvoice => {
                    if (myinvoice.invoiceid === activeinvoiceid) {
                        invoiceid = activeinvoiceid;
                    }
                })
            }
        }
        return invoiceid;
    }
    getupdated() {
        let updated = "";
        if (this.state.activeinvoiceid) {
            let invoiceid = this.state.activeinvoiceid;
            let myproject = this.getproject();
            if (myproject.hasOwnProperty("invoices")) {
                // eslint-disable-next-line
                myproject.invoices.myinvoice.map(myinvoice => {
                    if (myinvoice.invoiceid === invoiceid) {
                        if (myinvoice.updated) {

                            updated = UTCStringFormatDateforProposal(myinvoice.updated);
                        }
                    }
                })
            }
        }
        if (updated) {
            updated = `Invoice Last Updated ${updated}`
        }

        return updated;
    }
    getapproved() {
        let approved = "";
        if (this.state.activeinvoiceid) {
            let invoiceid = this.state.activeinvoiceid;
            let myproject = this.getproject();
            if (myproject.hasOwnProperty("invoices")) {
                // eslint-disable-next-line
                myproject.invoices.myinvoice.map(myinvoice => {
                    if (myinvoice.invoiceid === invoiceid) {
                        if (myinvoice.updated) {
                            approved = UTCStringFormatDateforProposal(myinvoice.approved);
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
                            Invoices
                        </div>
                    </div>

                    <div className="general-flex addBottomMargin">
                        <div className="flex-2 regularFont">
                            To Create A Invoice First Create an ID Then Add the Scheduled Items.
                        </div>
                        <div className="flex-1 addLeftMargin">
                            <button className="general-button create-proposal" onClick={event => { this.createnewinvoice() }}>{createInvoiceIcon()}</button>
                        </div>
                    </div>

                    {this.loadinvoiceids()}


                    {this.loadinvoiceitems()}

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
        projectsprovider: state.projectsprovider
    }
}
export default connect(mapStateToProps, actions)(MyInvoices)
