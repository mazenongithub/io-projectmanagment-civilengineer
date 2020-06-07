
import React, { Component } from 'react';
import * as actions from './actions';
import { connect } from 'react-redux';
import { MyStylesheet } from './styles';
import { DirectCostForLabor, DirectCostForMaterial, DirectCostForEquipment, inputUTCStringForLaborID, calculatetotalhours, formatDateStringDisplay } from './functions'
import PM from './pm';


class LineItem extends Component {
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
        const csiid = this.props.match.params.csiid;
        const csi = pm.getactualcsibyid.call(this, csiid);
        this.props.reduxNavigation({ navigation: "biditem", csiid, csi: csi.csi })
        this.props.reduxProject({ projectid: this.props.match.params.projectid })


    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });

    }


    getlaboritems() {
        const pm = new PM();
        const labor = this.getlabor();
        let csiid = this.props.match.params.csiid;
        let laboritems = [];
        let items = [];
        if (labor) {
            // eslint-disable-next-line
            labor.map(item => {
                if ((item.hasOwnProperty("laborid")) && (item.csiid === csiid)) {
                    items.push(this.showlaborid(item))
                }
            })

        }


        return items;
    }
    getlabor() {
        const pm = new PM();
        const estimate = pm.getcostestimate.call(this)

        let laboritems = [];
        if (estimate) {
            // eslint-disable-next-line
            if (estimate.hasOwnProperty("labor")) {
                laboritems = estimate.labor;
            }

        }


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
        const materials = this.getmaterial();
        const csiid = this.props.match.params.csiid;
        let items = [];
        if (materials) {
            // eslint-disable-next-line
            materials.map(item => {
                if ((item.hasOwnProperty("materialid")) && item.csiid === csiid) {
                    items.push(this.showmaterialid(item))
                }
            })

        }
        return items;

    }
    getmaterial() {
        const pm = new PM();
        let materialitems = [];
        const estimate = pm.getcostestimate.call(this)
        let csiid = this.props.match.params.csiid;
        if (estimate.hasOwnProperty("materials")) {
            materialitems = estimate.materials;
        }


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
    getequipment() {
        const pm = new PM();
        const estimate = pm.getcostestimate.call(this);
        const csiid = this.props.match.params.csiid;
        let equipment = [];
        if (estimate) {
            if (estimate.hasOwnProperty("equipment")) {
                // eslint-disable-next-line
                estimate.equipment.map(item => {
                    if ((item.hasOwnProperty("equipmentid")) && item.csiid === csiid) {
                        equipment.push(item)

                    }


                })


            }
        }
            return equipment;
        }


        getequipmentitems() {

            const pm = new PM();
            const estimate = pm.getcostestimate.call(this)
            let csiid = this.props.match.params.csiid;
            let equipmentitems = [];
            if (estimate.hasOwnProperty("equipment")) {
                // eslint-disable-next-line
                estimate.equipment.map(item => {
                    if ((item.hasOwnProperty("equipmentid")) && item.csiid === csiid) {
                        equipmentitems.push(this.showequipmentid(item))
                    }
                })

            }

            return equipmentitems;

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
            const csiid = this.props.match.params.csiid;
            const csi = pm.getcsibyid.call(this, csiid)
            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...styles.generalFont, ...headerFont }}>
                                {csi.csi} - {csi.title}
                            </div>
                        </div>

                        {pm.showlinedetail.call(this)}
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
        allcompanys: state.allcompanys,
        csi: state.csi
    }
}
export default connect(mapStateToProps, actions)(LineItem)