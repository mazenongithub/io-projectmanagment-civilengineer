import React, { Component } from 'react';
import './invoices.css'
import * as actions from './actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {UTCStringFormatDateforProposal} from './functions';

class ShowInvoices extends Component {


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
    getprojecttitle() {
        let projecttitle = "";

        if (this.props.projects.hasOwnProperty("length")) {
            let projectid = this.props.projectid.projectid;
            console.log(projectid)
            // eslint-disable-next-line
            this.props.projects.map(myproject => {
                if (myproject.projectid === projectid) {
                    projecttitle = `${myproject.projectid}/${myproject.title}`
                }
            })
        }
        return projecttitle;
    }
    showinvoices() {
        let myproject = this.getproject();
        let invoices = [];
        if (myproject.hasOwnProperty("invoices")) {
            // eslint-disable-next-line
            myproject.invoices.myinvoice.map(myinvoice => {
                invoices.push(this.showmyinvoice(myinvoice))
            })
        }
        return invoices;
    }
    showmyinvoice(myinvoice) {
        let providerid = this.props.myusermodel.providerid;
        let projectid = this.props.projectid.projectid;
         let updateinfo = "";
        if (myinvoice.updated) {
            updateinfo = `Updated ${UTCStringFormatDateforProposal(myinvoice.updated)}`
        }
          
        return (<div className="showproposal-container"><Link className="basic-link-regular" to={`/${providerid}/myprojects/${projectid}/invoices/${myinvoice.invoiceid}`}> Invoice ID {myinvoice.invoiceid} {updateinfo}</Link> </div>)
    }
    render() {
        return (<div className="show-invoice-containerr">
	             <div className="show-invoice-title"> {this.getprojecttitle()} <br/>View Invoices</div>
	             {this.showinvoices()}
	             </div>)}
	             }
	             
	             function mapStateToProps(state) {
	                 return {
	                     myusermodel: state.myusermodel,
	                     projectid: state.projectid,
	                     projects: state.projects,
	                     providerid: state.providerid,
	                     role: state.role
	                 }
	             }
	             export default connect(mapStateToProps, actions)(ShowInvoices)
	             