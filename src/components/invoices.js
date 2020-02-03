import React, { Component } from 'react';
import './projectteam.css';
import * as actions from './actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { MyStylesheet } from './styles';
import { inputUTCStringForLaborID } from './functions'
import PM from './pm';

class Invoices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: '',
            width: 0,
            height: 0
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        this.props.reduxNavigation({ navigation: "invoices" })
        this.props.reduxProject({ projectid: this.props.match.params.projectid })
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }
    showinvoice(myinvoice) {
        const styles = MyStylesheet();
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this)
        const myprovider = pm.getproviderbyid.call(this, myinvoice.providerid)
        const providerid = this.props.match.params.providerid;
        const projectid = this.props.match.params.projectid;
        const invoiceid = myinvoice.invoiceid;

        const company = () => {
            if (myprovider.hasOwnProperty("company")) {
                return myprovider.company.company;
            } else {
                return;
            }
        }
        const handlemyprovider = () => {
            if (myprovider) {
                return (`by ${myprovider.firstname} ${myprovider.lastname} ${company()}`)
            } else {
                return;
            }
        }

        return (<div style={{ ...styles.generalFont, ...regularFont, ...styles.generalContainer, ...styles.bottomMargin15 }}>
            <Link to={`/${providerid}/myprojects/${projectid}/invoices/${invoiceid}`} style={{ ...styles.generalFont, ...regularFont, ...styles.generalLink }}> InvoiceID {invoiceid} {handlemyprovider()} Last Updated {inputUTCStringForLaborID(myinvoice.updated)} Last Approved {inputUTCStringForLaborID(myinvoice.approved)}</Link>
        </div>)
    }
    showinvoices() {
        let pm = new PM();
        let myinvoices = pm.getinvoices.call(this);
        let invoices = [];
        if (myinvoices) {
            // eslint-disable-next-line
            myinvoices.map(myinvoice => {
                invoices.push(this.showinvoice(myinvoice))
            })

        }
        return invoices;
    }
    render() {
        const styles = MyStylesheet();
        const projectid = this.props.match.params.projectid;
        const pm = new PM();
        const headerFont = pm.getHeaderFont.call(this)
        return (
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...headerFont, ...styles.generalFont }}>
                            /{projectid} <br />
                            Invoices
                        </div>
                    </div>

                    {this.showinvoices()}

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
        allcompanys: state.allcompanys
    }
}
export default connect(mapStateToProps, actions)(Invoices)