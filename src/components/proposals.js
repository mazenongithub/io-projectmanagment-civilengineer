import React, { Component } from 'react';
import './projectteam.css';
import * as actions from './actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { MyStylesheet } from './styles';
import { inputUTCStringForLaborID } from './functions'
import PM from './pm';
import ProjectID from './projectid';

class Proposals extends Component {
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

    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }
    showproposal(myproposal) {
        const styles = MyStylesheet();
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this)
        const company = pm.getcompanybyid.call(this,myproposal.companyid)
       
        const proposalid = myproposal.proposalid;

        const lastupdated = myproposal.updated ? <span>Last Updated {inputUTCStringForLaborID(myproposal.updated)}</span> : <span>&nbsp;</span>
       
        const lastapproved= () => {
            if(myproposal.approved) {
                return(<span>Last Approved ${inputUTCStringForLaborID(myproposal.approved)}`</span>)
            } else {
                return (<span>&nbsp;</span>)
            }
        }

        const myuser = pm.getuser.call(this)
        if(myuser) {
            const project = pm.getproject.call(this)

        return (<div style={{ ...styles.generalFont, ...regularFont, ...styles.generalContainer, ...styles.bottomMargin15 }}>
           <span style={{...regularFont, ...styles.generalFont}}> </span><Link to={`/${myuser.profile}/projects/${project.title}/proposals/${company.url}`} style={{ ...styles.generalFont, ...regularFont, ...styles.generalLink }}> Proposal By:{company.company} {lastupdated} {lastapproved()} </Link>
        </div>)

        }
    }
    showproposals() {
        let pm = new PM();
        let myproposals = pm.getproposals.call(this);
        let proposals = [];
        if (myproposals) {
            // eslint-disable-next-line
            myproposals.map(myproposal => {

                proposals.push(this.showproposal(myproposal))
            
            })

        }
        return proposals;
    }
    render() {
        const styles = MyStylesheet();
     
        const pm = new PM();
        const headerFont = pm.getHeaderFont.call(this)
        const myuser = pm.getuser.call(this)
        const projectid = new ProjectID();
        if(myuser) {
            const project = pm.getproject.call(this)
            if(project) {
        return (
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>

                            <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                <Link style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.boldFont }} to={`/${myuser.profile}/projects/${project.title}`}>  /{project.title}  </Link>
                            </div>

                            <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                <Link style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.boldFont }} to={`/${myuser.profile}/projects/${project.title}/proposals`}>  /proposals </Link>
                            </div>

                    {this.showproposals()}

                    {projectid.showprojectid.call(this)}

                </div>
            </div>)

        } else {
            return(<div>Project Not Found</div>)
        }

        } else {
            return(<div>Please Login to View Proposals</div>)
        }

    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation,
        csis: state.csis,
        allusers: state.allusers
    }
}
export default connect(mapStateToProps, actions)(Proposals)