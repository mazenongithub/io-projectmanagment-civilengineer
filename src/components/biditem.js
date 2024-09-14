
import React, { Component } from 'react';
import * as actions from './actions';
import { connect } from 'react-redux';
import { MyStylesheet } from './styles';
import { DirectCostForLabor, DirectCostForMaterial, DirectCostForEquipment, inputUTCStringForLaborID, calculatetotalhours, formatDateStringDisplay } from './functions'
import PM from './pm';
import ProjectID from './projectid'



class BidItem extends Component {
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
        const actual = pm.getActual.call(this)
    
        let csiid = this.props.csiid;
        let laboritems = [];
        let items = [];
        // eslint-disable-next-line
        actual.map(item => {
            if ((item.hasOwnProperty("laborid")) && (item.csiid === csiid)) {
                laboritems.push(item)
            }
        })

     

        if (laboritems.length > 0) {
            // eslint-disable-next-line
            laboritems.map(mylabor => {
            
                items.push(pm.showlaborid.call(this,mylabor))
            })

        }
        return items;
    }
    getlabor() {
        const pm = new PM();
        const actual = pm.getActual.call(this)
        
        let csiid = this.props.csiid;
        let laboritems = [];

        // eslint-disable-next-line
        actual.map(item => {
            if ((item.hasOwnProperty("laborid")) && (item.csiid === csiid)) {
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
        const actual = pm.getActual.call(this)
        let csiid = this.props.csiid;
        let laboritems = [];
        let items = [];
        // eslint-disable-next-line
        actual.map(item => {
            if ((item.hasOwnProperty("materialid")) && item.csiid === csiid) {
                laboritems.push(item)
            }
        })

        if (laboritems.length > 0) {
            // eslint-disable-next-line
            laboritems.map(mymaterial => {
                items.push(pm.showmaterialid.call(this,mymaterial))
            })

        }
        return items;

    }
    getmaterial() {
        const pm = new PM();
        const actual = pm.getActual.call(this)
        let csiid = this.props.csiid;
        let materialitems = [];
        // eslint-disable-next-line
        actual.map(item => {
            if ((item.hasOwnProperty("materialid")) && item.csiid === csiid) {
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
        const actual = pm.getActual.call(this)
        let csiid = this.props.csiid;

        let laboritems = [];
        let items = [];
        // eslint-disable-next-line
        actual.map(item => {
            if ((item.hasOwnProperty("equipmentid")) && item.csiid === csiid) {
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
        const actual = pm.getActual.call(this)
        let csiid = this.props.csiid;
        let laboritems = [];
        // eslint-disable-next-line
        actual.map(item => {
            if ((item.hasOwnProperty("equipmentid")) && item.csiid === csiid) {
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

        const myequipment = pm.getcompanyequipmentbyid.call(this,this.props.company_id,equipment.myequipmentid)

        const amount = Number(calculatetotalhours(equipment.timeout, equipment.timein) * (Number(equipment.equipmentrate))).toFixed(2)
        return (<div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }} key={equipment.equipmentid}>
            {myequipment.equipment} From: {inputUTCStringForLaborID(equipment.timein)} to {inputUTCStringForLaborID(equipment.timeout)} ${equipment.equipmentrate} x ${calculatetotalhours(equipment.timeout, equipment.timein)} = ${amount}

        </div>)
    }


    render() {
        const pm = new PM();
        const styles = MyStylesheet();
        const headerFont = pm.getHeaderFont.call(this)
        const projectid = new ProjectID();
        const myuser = pm.getuser.call(this)
        const regularFont = pm.getRegularFont.call(this)
        if (myuser) {

            const project = pm.getproject.call(this)
            if(project) {

            const csi = pm.getcsibyid.call(this,this.props.csiid);

            if(csi) {
            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>


           
                        <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                            <a style={{ ...styles.generalFont, ...headerFont, ...styles.generala, ...styles.boldFont }}>  /{csi.csi} {csi.title} </a>
                        </div>

                        {pm.showlinedetail.call(this)}
                     

                    </div>
                </div>)

            } else {
                return (
                    <div style={{ ...styles.generalContainer }}>
                        <span style={{ ...styles.generalFont, ...regularFont }}>
                           Spec Not Found
                        </span>
                    </div>
                    )

            }

            } else {
                return (
                    <div style={{ ...styles.generalContainer }}>
                        <span style={{ ...styles.generalFont, ...regularFont }}>
                            Project Not Found
                        </span>
                    </div>
                    )

            }

        } else {
            return (
                <div style={{ ...styles.generalContainer }}>
                    <span style={{ ...styles.generalFont, ...regularFont }}>
                        Please Login to View Bid Schedule
                    </span>
                </div>
                )
        }

    }

}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation,
        csis: state.csis,
        allusers: state.allusers,
        projectsockets: state.projectsockets,
        myprojects: state.myprojects,
        projects: state.projects,
        allcompanys: state.allcompanys
    }
}
export default connect(mapStateToProps, actions)(BidItem)