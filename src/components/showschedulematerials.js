import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import './invoices.css';
import {
    inputUTCStringForMaterialIDWithTime
}
from './functions'
class ShowScheduleMaterials extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0
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

    showmaterialrows() {
        let materialrows = [];
        let myproject = this.getproject();
        if (myproject.hasOwnProperty("schedulematerials")) {
            // eslint-disable-next-line
            myproject.schedulematerials.mymaterial.map(mymaterial => {
                materialrows.push(this.showrowmaterial(mymaterial))
            })
        }
        return materialrows;
    }

    showrowmaterial(mymaterial) {
        let material = [];
        if (this.state.width > 1080) {
            material.push(<div className="invoice-row-large-a">{inputUTCStringForMaterialIDWithTime(mymaterial.timein)} </div>)
            material.push(<div className="invoice-row-large-b">{mymaterial.description} </div>)
            material.push(<div className="invoice-row-large-a">{mymaterial.quantity} @ ${mymaterial.unitcost}/{mymaterial.unit} = ${(mymaterial.quantity*mymaterial.unitcost).toFixed(2)} </div>)
        }
        else {
            material.push(<div className="invoice-row-small-a">{inputUTCStringForMaterialIDWithTime(mymaterial.timein)} </div>)
            material.push(<div className="invoice-row-small-a">{mymaterial.quantity} @  ${mymaterial.unitcost}/{mymaterial.unit} = ${(mymaterial.quantity*mymaterial.unitcost).toFixed(2)} </div>)
            material.push(<div className="invoice-row-small-b">{mymaterial.description} </div>)
        }
        return material;

    }

    showtotalamount() {
        let totalamount = 0;
        if (this.props.projects.hasOwnProperty("length")) {
            if (this.props.projectid.projectid) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projects.map(myproject => {
                    if (myproject.projectid === projectid) {

                        if (myproject.hasOwnProperty("schedulematerials")) {
                            // eslint-disable-next-line
                            myproject.schedulematerials.mymaterial.map(mymaterial => {
                                //let authorized = this.checkauthorized(projectid, mymaterial.proposalid);
                                //if (authorized) {
                                totalamount = totalamount + Number(mymaterial.amount);
                                //}

                            })
                        }
                    } //project found
                }) //map all projects
            } //projectid
        } //check length

        return totalamount;
    }
    showtitle() {
        let title = "";
        let myproject = this.getproject();
        title = `${myproject.projectid}/${myproject.title}`
        return title;
    }
    getproject() {
        let project = {};

        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projects.map(myproject => {
                    if (myproject.projectid === projectid) {
                        project = myproject;
                    }
                })
            }
        }
        return project;
    }
    gettotalamount() {
        let myproject = this.getproject();
        let totalamount = 0;
        if (myproject.hasOwnProperty("schedulematerials")) {
            // eslint-disable-next-line
            myproject.schedulematerials.mymaterial.map(mymaterial => {
                totalamount += Number(mymaterial.quantity) * Number(mymaterial.unitcost);
            })
        }
        return totalamount;
    }
    render() {

        return (

            <div className="show-invoice-container">
        <div className="show-invoice-title">{this.showtitle()} <br/> Schedule Materials</div>
        {this.showmaterialrows()}
        <div className="invoice-amount-container">The Total Schedule Materials is ${this.gettotalamount().toFixed(2)} </div>
        </div>)

    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        projectid: state.projectid,
        projects: state.projects
    }
}

export default connect(mapStateToProps, actions)(ShowScheduleMaterials)
