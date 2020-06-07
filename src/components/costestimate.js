import React, { Component } from 'react';
import { MyStylesheet } from './styles'
import PM from './pm'
import { connect } from 'react-redux';
import * as actions from './actions';
import { DirectCostForLabor, DirectCostForMaterial, DirectCostForEquipment, ProfitForEquipment, ProfitForMaterial, ProfitForLabor, CreateBidItem, isNumeric} from './functions'
import {Link} from 'react-router-dom'

class CostEstimate extends Component {

    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0 }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }
    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.props.reduxProject({ title: this.props.match.params.projectid })
        this.updateWindowDimensions();

    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    getprofit(csiid) {
        const pm = new PM()
        const project = pm.getprojectbytitle.call(this, this.props.match.params.projectid)
        let directcost = 0;
        let profit = 0;
        if (project) {
            
            if (project.hasOwnProperty("costestimate")) {

                if (project.costestimate.hasOwnProperty("labor")) {
                    // eslint-disable-next-line
                    project.costestimate.labor.map(labor => {
                        if (labor.csiid === csiid) {
                            directcost += DirectCostForLabor(labor);
                            profit += ProfitForLabor(labor)
                           
                        }

                    })

                }

                if (project.costestimate.hasOwnProperty("materials")) {
                    // eslint-disable-next-line
                    project.costestimate.materials.map(material => {
                        if (material.csiid === csiid) {
                            directcost += DirectCostForMaterial(material);
                            profit += ProfitForMaterial(material)
                        }

                    })

                }

                if (project.costestimate.hasOwnProperty("equipment")) {
                    // eslint-disable-next-line
                    project.costestimate.equipment.map(equipment => {
                        if (equipment.csiid === csiid) {
                            directcost += DirectCostForEquipment(equipment);
                            profit += ProfitForEquipment(equipment)
                        }

                    })

                }






            }

        }
 
        if (profit && directcost > 0) {
       
            return +Number((profit / directcost) * 100).toFixed(4)
        } else {
            return 0;
        }

    }

    getdirectcost(csiid) {
        const pm = new PM();
        let project = pm.getprojectbytitle.call(this, this.props.match.params.projectid);
        let directcost = 0;
        if (project) {

            if (project.hasOwnProperty("costestimate")) {

                if (project.costestimate.hasOwnProperty("labor")) {
                    // eslint-disable-next-line
                    project.costestimate.labor.map(mylabor => {
                        if (mylabor.csiid === csiid) {
                            directcost += DirectCostForLabor(mylabor)

                        }
                    })
                }

                if (project.costestimate.hasOwnProperty("materials")) {
                    // eslint-disable-next-line
                    project.costestimate.materials.map(mymaterial => {
                        if (mymaterial.csiid === csiid) {
                            directcost += DirectCostForMaterial(mymaterial)
                        }

                    })
                }

                if (project.costestimate.hasOwnProperty("equipment")) {
                    // eslint-disable-next-line
                    project.costestimate.equipment.map(myequipment => {
                        if (myequipment.csiid === csiid) {
                            directcost += DirectCostForEquipment(myequipment)
                        }

                    })
                }

            }
        }

        return directcost;

    }
    getbiditems() {
        const pm = new PM();
        const myuser = pm.getuser.call(this);
        const validatecsis = (csis, csiid) => {
            let validate = true;
            // eslint-disable-next-line
            csis.map(csi => {
                if (csi.csiid === csiid) {
                    validate = false;
                }
            })
            return validate;

        }
        let csis = [];
        if (myuser) {
            const project = pm.getprojectbytitle.call(this, this.props.match.params.projectid);
     
            if (project) {
                if (project.hasOwnProperty("costestimate")) {
                    if (project.costestimate.hasOwnProperty("labor")) {
                        // eslint-disable-next-line
                        project.costestimate.labor.map(labor => {
                            if (validatecsis(csis, labor.csiid)) {
                                csis.push({ csiid: labor.csiid })
                            }
                        })

                    }

                    if (project.costestimate.hasOwnProperty("materials")) {
                        // eslint-disable-next-line
                        project.costestimate.materials.map(material => {
                            if (validatecsis(csis, material.csiid)) {
                                csis.push({ csiid: material.csiid })
                            }
                        })

                    }

                    if (project.costestimate.hasOwnProperty("equipment")) {
                        // eslint-disable-next-line
                        project.costestimate.equipment.map(equipment => {
                            if (validatecsis(csis, equipment.csiid)) {
                                csis.push({ csiid: equipment.csiid })
                            }
                        })

                    }


                }
            }
        }
        return csis;

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

        let directcost = Number(this.getdirectcost(csiid));
        let profit = Number(this.getprofit(csiid));
        let overhead = this.getoverhead(csiid)
        let myoverhead = this.getmyoverhead(csiid)
   
        if (!profit) {
            profit = 1
        } else {
            profit = 1 + (profit / 100)
        }
        let bidprice = ((directcost * profit) + myoverhead) + overhead;
        return bidprice;
    }

 

    showbiditem(biditem) {
      
        const styles = MyStylesheet();
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this)
        const csi = pm.getcsibyid.call(this, biditem.csiid);
        const project = pm.getprojectbytitle.call(this, this.props.match.params.projectid);
        const directcost = Number(this.getdirectcost(biditem.csiid)).toFixed(2)
        const profit = +Number(this.getprofit(biditem.csiid)).toFixed(4);
        const bidprice = Number(this.getbidprice(biditem.csiid)).toFixed(2);
      
        const myuser = pm.getuser.call(this)
        if(myuser) {
        if (project) {
            const bidschedule = pm.getcsibyid.call(this, biditem.csiid);
         
            const quantity = bidschedule.quantity;
            const unit = bidschedule.unit;
            const unitprice = () => {
                if(biditem.csiid && quantity) {
                    return( Number(this.getbidprice(biditem.csiid) / quantity).toFixed(2))
                } else {
                    return(0)
                }

            }

            if (this.state.width > 800) {
                return (
                    <div style={{ ...styles.generalFlex }} key={biditem.csiid}>
                        <div style={{ ...styles.flex2, ...styles.showBorder, ...styles.alignCenter }}>
                            <span style={{ ...styles.generalFont, ...regularFont, ...styles.generalLink }}><Link style={{...styles.generalFont,...regularFont,...styles.generalLink}} to={`/${myuser.profile}/myprojects/${project.title}/costestimate/${csi.csiid}`}>{csi.csi}-{csi.title}</Link></span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                            <span style={{ ...styles.generalFont, ...regularFont,  ...styles.alignCenter }}>{quantity}</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                            <span style={{ ...styles.generalFont, ...regularFont,  ...styles.alignCenter }}>{unit} </span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>${directcost}</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                            <span style={{ ...styles.generalFont, ...regularFont,  ...styles.alignCenter }}>{profit}</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>${bidprice}</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>${unitprice()}</span>
                        </div>
                    </div>)

            } else {

                return (
                    <div style={{ ...styles.generalFlex }} key={biditem.csiid}>
                        <div style={{ ...styles.flex1 }}>

                            <div style={{ ...styles.generalFlex }}>
                                <div style={{ ...styles.flex2, ...styles.showBorder, ...styles.alignCenter }}>
                                    <span style={{ ...styles.generalFont, ...regularFont }}><Link style={{...styles.generalFont,...regularFont,...styles.generalLink}} to={`/${myuser.profile}/myprojects/${project.title}/costestimate/${csi.csiid}`}>{csi.csi}-{csi.title}</Link></span>
                                </div>
                                <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                                <span style={{ ...styles.generalFont, ...regularFont,  ...styles.alignCenter }}>{quantity}</span>

                                </div>
                                <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                                <span style={{ ...styles.generalFont, ...regularFont,  ...styles.alignCenter }}>{unit} </span>
                                </div>

                            </div>


                            <div style={{ ...styles.generalFlex }}>
                                <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                                    <span style={{ ...styles.generalFont, ...regularFont }}>${directcost}</span>
                                </div>
                                <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>

                                <span style={{ ...styles.generalFont, ...regularFont,  ...styles.alignCenter }}>{profit}</span>
                                </div>
                                <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                                    <span style={{ ...styles.generalFont, ...regularFont }}>${bidprice}</span>
                                </div>
                                <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                                    <span style={{ ...styles.generalFont, ...regularFont }}>${unitprice()}</span>
                                </div>

                            </div>


                        </div>

                    </div>
                )

            }

        }
    }
    }

    showbiditems() {

        const biditems = this.getbiditems();
     
        let items = [];
        if (biditems) {
            // eslint-disable-next-line
            biditems.map(biditem => {
                items.push(this.showbiditem(biditem))

            })
        }
        return items;

    }

    render() {
        const pm = new PM();
        const styles = MyStylesheet();
        const headerFont = pm.getHeaderFont.call(this)
        const regularFont = pm.getRegularFont.call(this)

        const titlerow = () => {
            if (this.state.width > 800) {
                return (
                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex2, ...styles.showBorder, ...styles.alignCenter }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>Line Item</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>Quantity</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>Unit</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>Direct Cost</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>Profit %</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>Bid Price</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>Unit Price</span>
                        </div>
                    </div>)

            } else {
                return (
                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>

                            <div style={{ ...styles.generalFlex }}>
                                <div style={{ ...styles.flex2, ...styles.showBorder, ...styles.alignCenter }}>
                                    <span style={{ ...styles.generalFont, ...regularFont }}>Line Item</span>
                                </div>
                                <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                                    <span style={{ ...styles.generalFont, ...regularFont }}>Quantity</span>

                                </div>
                                <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                                    <span style={{ ...styles.generalFont, ...regularFont }}>Unit</span>
                                </div>

                            </div>


                            <div style={{ ...styles.generalFlex }}>
                                <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                                    <span style={{ ...styles.generalFont, ...regularFont }}>Direct Cost</span>
                                </div>
                                <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>

                                    <span style={{ ...styles.generalFont, ...regularFont }}>Profit %</span>
                                </div>
                                <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                                    <span style={{ ...styles.generalFont, ...regularFont }}>Bid Price</span>
                                </div>
                                <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                                    <span style={{ ...styles.generalFont, ...regularFont }}>Unit Price</span>
                                </div>

                            </div>

                


                        </div>

                    </div>
                )

            }
        }

        return (
            <div style={{ ...styles.generalFont }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                            <div style={{...styles.generalContainer }}> <span style={{...headerFont, ...styles.boldFont, ...styles.headerFamily}}> Engineer Estimate </span> </div>
                            <div style={{...styles.generalContainer }}> <span style={{...headerFont, ...styles.boldFont, ...styles.headerFamily}}> {this.props.match.params.projectid} </span> </div>
                        </div>
                    </div>

                    {titlerow()}

                    {this.showbiditems()}



                </div>
            </div>)
    }

}
function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        allusers: state.allusers,
        allcompanys: state.allcompanys,
        project: state.project
    }
}

export default connect(mapStateToProps, actions)(CostEstimate);