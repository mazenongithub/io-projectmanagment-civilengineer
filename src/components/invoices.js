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

        
        const handlemyprovider = () => {
            if (myprovider) {
                return (`by ${myprovider.firstname} ${myprovider.lastname}`)
            } else {
                return (<span>&nbsp;</span>)
            }
        }
            const lastupdated = () => {
                if(myinvoice.updated) {
                    return(<span>Last Updated {inputUTCStringForLaborID(myinvoice.updated)}</span>)
                } else {
                    return (<span>&nbsp;</span>)
                }
            }
            const lastapproved= () => {
                if(myinvoice.approved) {
                    return(<span>Last Approved ${inputUTCStringForLaborID(myinvoice.approved)}`</span>)
                } else {
                    return (<span>&nbsp;</span>)
                }
            }

        
        return (<div style={{ ...styles.generalFont, ...regularFont, ...styles.generalContainer, ...styles.bottomMargin15 }}>
            <Link to={`/${providerid}/myprojects/${projectid}/invoices/${invoiceid}`} style={{ ...styles.generalFont, ...regularFont, ...styles.generalLink }}> InvoiceID {invoiceid} {lastupdated()} {lastapproved()} {handlemyprovider()} </Link>
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
        const myuser = pm.getuser.call(this)
        if(myuser) {
            const project = pm.getproject.call(this)
            if(project) {
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
                    {this.showinvoices()}

                    {pm.showprojectid.call(this)}

                </div>
            </div>)

        } else {
            return(<div>Project Not Found</div>)
        }

        } else {
            return(<div>Please Login to View Invoices</div>)
        }

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