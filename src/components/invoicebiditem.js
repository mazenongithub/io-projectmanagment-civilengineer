
import React, { Component } from 'react';
import * as actions from './actions';
import { connect } from 'react-redux';
import { MyStylesheet } from './styles';
import { DirectCostForLabor, DirectCostForMaterial, DirectCostForEquipment, inputUTCStringForLaborID, calculatetotalhours, formatDateStringDisplay } from './functions'
import PM from './pm';
import { Link } from 'react-router-dom'
import ProjectID from './projectid'


class InvoiceBidItem extends Component {
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

    getlaboritems() {
        const pm = new PM();
        let items = [];
        let laboritems = this.getlabor();
        if (laboritems) {
            // eslint-disable-next-line
            laboritems.map(mylabor => {

                items.push(pm.showlaborid.call(this,mylabor))
            })

        }


        return items;
    }
    getlabor() {
        const pm = new PM();
        const invoice = pm.getinvoice.call(this)
        let labor = false;
        let getlabor = [];
        let csiid = this.props.match.params.csiid;
        if (invoice) {
            if (invoice.hasOwnProperty("labor")) {
                invoice.labor.map(labor => {
                    if (labor.csiid === csiid) {
                        getlabor.push(labor)
                    }

                })


            }

        }
        // eslint-disable-next-line
        return getlabor;
    }
    getlabortotal() {
        let items = this.getlabor();
        let cost = 0;
        if (items.length > 0) {
            // eslint-disable-next-line
            items.map(item => {
                cost += DirectCostForLabor(item)
            })
        }
        return cost;
    }

    getmaterials() {

        const pm = new PM();
        const invoice = pm.getinvoice.call(this)
        let csiid = this.props.match.params.csiid;
        let materialitems = [];

        if (invoice) {
            if (invoice.hasOwnProperty("materials")) {
                // eslint-disable-next-line
                invoice.materials.map(item => {
                    if (item.csiid === csiid) {
                        materialitems.push(item)
                    }
                })

            }
        }
        return materialitems;

    }


    getmaterialitems() {
        const pm = new PM();
        const materials = this.getmaterials();
        let items = [];

        if (materials) {
            // eslint-disable-next-line
            materials.map(mymaterial => {
                items.push(pm.showmaterialid.call(this,mymaterial))
            })


        }


        return items;

    }

    getmaterialtotal() {
        let items = this.getmaterials();
        let cost = 0;
        if (items.length > 0) {
            // eslint-disable-next-line
            items.map(item => {
                cost += DirectCostForMaterial(item)
            })
        }
        return cost;
    }
    getequipmentitems() {

        const equipment = this.getequipment()
        let items = [];
        if (equipment) {
            // eslint-disable-next-line
            equipment.map(myequipment => {
                items.push(this.showequipmentid(myequipment))
            })

        }
        return items;

    }
    getequipment() {

        const pm = new PM();
        let csiid = this.props.match.params.csiid;
        let getequipment = [];
        const invoice = pm.getinvoice.call(this)
        if (invoice) {
            if (invoice.hasOwnProperty("equipment")) {
                // eslint-disable-next-line
                invoice.equipment.map(item => {
                    if (item.csiid === csiid) {
                        getequipment.push(item)
                    }
                })

            }


        }

        return getequipment;

    }
    getequipmenttotal() {
        let items = this.getequipment();
        let cost = 0;
        if (items.length > 0) {
            // eslint-disable-next-line
            items.map(item => {
                cost += DirectCostForEquipment(item)
            })
        }
        return (cost)
    }
 
    getitemtotal() {
        let labortotal = this.getlabortotal();
        let materialtotal = this.getmaterialtotal();
        let equipmenttotal = this.getequipmenttotal();
        let total = labortotal + materialtotal + equipmenttotal;
        return total;
    }
    showlaborid(mylabor) {
        const styles = MyStylesheet();
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this)


        let hourlyrate = mylabor.laborrate;

        return (<div key={mylabor.laborid} style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>

            {mylabor.firstname} {mylabor.lastname} {mylabor.description}
            From {inputUTCStringForLaborID(mylabor.timein)} to {inputUTCStringForLaborID(mylabor.timeout)}
            ${Number(hourlyrate).toFixed(2)}/Hr x {calculatetotalhours(mylabor.timeout, mylabor.timein)} Hrs = ${(Number(calculatetotalhours(mylabor.timeout, mylabor.timein)) * Number(hourlyrate)).toFixed(2)}

        </div>)
    }

    showmaterialid(mymaterial) {
        console.log(mymaterial)
        const styles = MyStylesheet();
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this);

        return (<div style={{ ...styles.generalContainer, ...regularFont, ...styles.generalFont }} key={mymaterial.materialid}>
            {mymaterial.material}        {formatDateStringDisplay(mymaterial.timein)} {mymaterial.quantity}  x ${mymaterial.unitcost}/{mymaterial.unit} = ${(mymaterial.quantity * mymaterial.unitcost).toFixed(2)}
        </div>)
    }

    showequipmentid(equipment) {
        const styles = MyStylesheet();
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this);
        const amount = Number(calculatetotalhours(equipment.timeout, equipment.timein) * (Number(equipment.equipmentrate))).toFixed(2)
        return (<div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }} key={equipment.equipmentid}>
            {equipment.equipment} From: {inputUTCStringForLaborID(equipment.timein)} to {inputUTCStringForLaborID(equipment.timeout)} ${equipment.equipmentrate} x ${calculatetotalhours(equipment.timeout, equipment.timein)} = ${amount}

        </div>)
    }


    render() {
        const pm = new PM();
        const styles = MyStylesheet();
        const headerFont = pm.getHeaderFont.call(this)
        const projectid = new ProjectID();

        const csis = pm.getcsis.call(this)
        if (!csis) {
            pm.loadcsis.call(this)
        }

        const myuser = pm.getuser.call(this)
        if (myuser) {
            const company = pm.getcompany.call(this)
            if (company) {
                const project = pm.getproject.call(this)
                if (project) {
                    const invoice = pm.getinvoice.call(this)
                    if (invoice) {

                        const csi = pm.getcsibyid.call(this, this.props.match.params.csiid)
                        if (csi) {

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
                                        <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                            <Link style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.boldFont }} to={`/${myuser.profile}/projects/${project.title}/invoices/${company.url}/csi/${csi.csi}`}> /{csi.csi} - {csi.title} </Link>
                                        </div>

                                        {pm.showlinedetail.call(this)}

                                        {projectid.showprojectid.call(this)}

                                    </div>
                                </div>)

                        } else {
                            return (<div>Spec Not Found </div>)
                        }

                    } else {
                        return (<div>Invoice Not Found </div>)
                    }



                } else {
                    return (<div>Project Not Found </div>)
                }

            } else {
                return (<div>Company Not Found</div>)
            }


        } else {
            return (<div>Please Login to View Invoice Line Item</div>)
        }

    }

}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation,
        csis: state.csis,
        allusers:state.allusers
    }
}
export default connect(mapStateToProps, actions)(InvoiceBidItem)


