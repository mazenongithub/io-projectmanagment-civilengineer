
import React, { Component } from 'react';
import * as actions from './actions';
import { connect } from 'react-redux';
import { MyStylesheet } from './styles';
import { DirectCostForLabor, DirectCostForMaterial, DirectCostForEquipment, inputUTCStringForLaborID, calculatetotalhours, formatDateStringDisplay } from './functions'
import PM from './pm';
import {Link} from 'react-router-dom'


class ProposalBidItem extends Component {
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


    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });

    }


    getlaboritems() {
        const pm = new PM();
        const schedule = pm.getAllSchedule.call(this)
        let csiid = this.props.match.params.csiid;
        let proposalid = this.props.match.params.proposalid;
        let laboritems = [];
        let items = [];
        // eslint-disable-next-line
        schedule.map(item => {
            if ((item.hasOwnProperty("laborid")) && (item.csiid === csiid) && (item.proposalid === proposalid)) {
                laboritems.push(item)
            }
        })

        if (laboritems.length > 0) {
            // eslint-disable-next-line
            laboritems.map(mylabor => {
                items.push(this.showlaborid(mylabor))
            })

        }
        return items;
    }
    getlabor() {
        const pm = new PM();
        const schedule = pm.getAllSchedule.call(this)
        let csiid = this.props.match.params.csiid;
        let proposalid = this.props.match.params.proposalid;
        let laboritems = [];
        // eslint-disable-next-line
        schedule.map(item => {
            if ((item.hasOwnProperty("laborid")) && (item.csiid === csiid) && (item.proposalid === proposalid)) {
                laboritems.push(item)
            }
        })


        return laboritems;
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
    getmaterialitems() {
        const pm = new PM();
        const schedule = pm.getAllSchedule.call(this)
        let csiid = this.props.match.params.csiid;
        let proposalid = this.props.match.params.proposalid;
        let laboritems = [];
        let items = [];
        // eslint-disable-next-line
        schedule.map(item => {
            if ((item.hasOwnProperty("materialid")) && item.csiid === csiid && (item.proposalid === proposalid)) {
                laboritems.push(item)
            }
        })

        if (laboritems.length > 0) {
            // eslint-disable-next-line
            laboritems.map(mymaterial => {
                items.push(this.showmaterialid(mymaterial))
            })

        }
        return items;

    }
    getmaterial() {
        const pm = new PM();
        const schedule = pm.getAllSchedule.call(this)
        let csiid = this.props.match.params.csiid;
        let proposalid = this.props.match.params.proposalid;
        let materialitems = [];
        // eslint-disable-next-line
        schedule.map(item => {
            if ((item.hasOwnProperty("materialid")) && item.csiid === csiid && (item.proposalid === proposalid)) {
                materialitems.push(item)
            }
        })


        return materialitems;

    }
    getmaterialtotal() {
        let items = this.getmaterial();
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

        const pm = new PM();
        const schedule = pm.getAllSchedule.call(this)
        let csiid = this.props.match.params.csiid;
        let proposalid = this.props.match.params.proposalid;
        let laboritems = [];
        let items = [];
        // eslint-disable-next-line
        schedule.map(item => {
            if ((item.hasOwnProperty("equipmentid")) && item.csiid === csiid && (item.proposalid === proposalid)) {
                laboritems.push(item)
            }
        })

        if (laboritems.length > 0) {
            // eslint-disable-next-line
            laboritems.map(myequipment => {
                items.push(this.showequipmentid(myequipment))
            })

        }
        return items;

    }
    getequipment() {

        const pm = new PM();
        const schedule = pm.getAllSchedule.call(this)
        let csiid = this.props.match.params.csiid;
        let proposalid = this.props.match.params.proposalid;
        let laboritems = [];
        // eslint-disable-next-line
        schedule.map(item => {
            if ((item.hasOwnProperty("equipmentid")) && item.csiid === csiid && (item.proposalid === proposalid)) {
                laboritems.push(item)
            }
        })

        return laboritems;

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
    getremoveicon() {
        if (this.state.width > 800) {
            return ({ width: '47px', height: '47px' })
        } else {
            return ({ width: '36px', height: '36px' })
        }
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

        const csis = pm.getcsis.call(this)
        if (!csis) {
            pm.loadcsis.call(this)
        }

        const myuser = pm.getuser.call(this)
        if(myuser) {
            const project = pm.getproject.call(this)
            if(project) {
                const proposal = pm.getproposalbyid.call(this,this.props.match.params.proposalid)
                if(proposal) {

                    const csi = pm.getcsibyid.call(this,this.props.match.params.csiid)
                    if(csi) {

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
                                <Link style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.boldFont }} to={`/${myuser.profile}/myprojects/${project.title}/proposals`}>  /proposals </Link>
                            </div>

                            <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                <Link style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.boldFont }} to={`/${myuser.profile}/myprojects/${project.title}/proposals/${proposal.proposalid}`}> /{proposal.proposalid} </Link>
                            </div>
                            <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                <Link style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.boldFont }} to={`/${myuser.profile}/myprojects/${project.title}/proposals/${proposal.proposalid}/csi/${csi.csi}`}> /{csi.csi} - {csi.title} </Link>
                            </div>

                    {pm.showlinedetail.call(this)}
                    {pm.showprojectid.call(this)}


                </div>
            </div>)

        } else {
            return(<div>Spec Not Found </div>)
        }

        } else {
            return(<div>Proposal Not Found </div>)
        }

        } else {
            return(<div>Project Not Found </div>)
        }


        } else {
            return(<div>Please Login to View Proposal Line Item</div>)
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
export default connect(mapStateToProps, actions)(ProposalBidItem)