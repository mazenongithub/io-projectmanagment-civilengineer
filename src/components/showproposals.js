import React, { Component } from 'react';
import './invoices.css'
import * as actions from './actions';
import { connect } from 'react-redux';
import { UTCStringFormatDateforProposal } from './functions';
import { Link } from 'react-router-dom';

class ShowProposals extends Component {


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
    showproposals() {
        let myproject = this.getproject();
        let proposals = [];
        if (myproject.hasOwnProperty("proposals")) {
            // eslint-disable-next-line
            myproject.proposals.myproposal.map(myproposal => {
                proposals.push(this.showmyproposal(myproposal))
            })
        }
        return proposals;
    }
    showmyproposal(myproposal) {
        let providerid = this.props.myusermodel.providerid;
        let projectid = this.props.projectid.projectid;
        let updateinfo = "";
        if (myproposal.updated) {
            updateinfo = `Updated ${UTCStringFormatDateforProposal(myproposal.updated)}`
        }
        return (<div className="showproposal-container"><Link className="basic-link-regular" to={`/${providerid}/myprojects/${projectid}/proposals/${myproposal.proposalid}`}> Proposal ID {myproposal.proposalid} {updateinfo} </Link> </div>)
    }
    render() {
        return (<div className="show-invoice-containerr">
	             <div className="show-invoice-title"> {this.getprojecttitle()} <br/>View Proposals</div>
	             {this.showproposals()}
	             </div>)

    }
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
export default connect(mapStateToProps, actions)(ShowProposals)
