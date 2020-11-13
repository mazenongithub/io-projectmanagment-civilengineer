import React, { Component } from 'react';
import './projectteam.css';
import * as actions from './actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { MyStylesheet } from './styles';
import { inputUTCStringForLaborID } from './functions'
import PM from './pm';

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
        this.props.reduxNavigation({ navigation: "proposals" })
        this.props.reduxProject({ projectid: this.props.match.params.projectid })
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
        const myprovider = pm.getproviderbyid.call(this, myproposal.providerid)
        const providerid = this.props.match.params.providerid;
        const projectid = this.props.match.params.projectid;
        const proposalid = myproposal.proposalid;

       
        const handlemyprovider = () => {
            if (myprovider) {
                return (`by ${myprovider.firstname} ${myprovider.lastname}`)
            } else {
                return;
            }
        }
        const lastupdated = () => {
            if(myproposal.updated) {
                return(<span>Last Updated {inputUTCStringForLaborID(myproposal.updated)}</span>)
            } else {
                return (<span>&nbsp;</span>)
            }
        }
        const lastapproved= () => {
            if(myproposal.approved) {
                return(<span>Last Approved ${inputUTCStringForLaborID(myproposal.approved)}`</span>)
            } else {
                return (<span>&nbsp;</span>)
            }
        }

        return (<div style={{ ...styles.generalFont, ...regularFont, ...styles.generalContainer, ...styles.bottomMargin15 }}>
            <Link to={`/${providerid}/myprojects/${projectid}/proposals/${proposalid}`} style={{ ...styles.generalFont, ...regularFont, ...styles.generalLink }}> ProposalID {proposalid} {lastupdated()} {lastapproved()} {handlemyprovider()} </Link>
        </div>)
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
                                <Link style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.boldFont }} to={`/${myuser.profile}/myprojects/${project.title}/proposals`}>  /proposals </Link>
                            </div>

                    {this.showproposals()}

                    {pm.showprojectid.call(this)}

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
        project: state.project,
        allusers: state.allusers,
        allcompanys: state.allcompanys
    }
}
export default connect(mapStateToProps, actions)(Proposals)