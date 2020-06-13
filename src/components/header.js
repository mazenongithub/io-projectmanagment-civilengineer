import React, { Component } from 'react';
import './header.css'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Logo } from './svg';
import PM from './pm';
import { LogoutUser } from './actions/api';
import { MyStylesheet } from './styles';
import * as actions from './actions';

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            widthofwindow: 0
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ widthofwindow: window.innerWidth });
    }
    async logoutuser() {
        const pm = new PM();
        const myuser = pm.getuser.call(this)
        if(myuser) {

       const providerid = myuser.providerid;
        try {
            let response = await LogoutUser(providerid);
            if (response.hasOwnProperty("message")) {
                this.props.reduxUser(response)
            }
        } catch (err) {
            alert(err)
        }
    }
    }
    showlogout() {
        const pm = new PM();
        const myuser = pm.getuser.call(this);
        const headerFont = pm.getHeaderFont.call(this)
        const styles = MyStylesheet();
        if (myuser) {
            return (<div className="linkhover" style={{ ...headerFont, ...styles.generalFont }} onClick={() => { this.logoutuser() }}> Logout </div>);
        }
        else {

            return (<Link className="nav-link" to="/providers/login"><span className="nav-link"> Login  </span></Link>);

        }


    }

    handleregister() {
        const pm = new PM();
        const myuser = pm.getuser.call(this)
        if (myuser) {
            const providerid = myuser.profile;
            return (<Link to={`/${providerid}/profile`} className="nav-link"> Profile </Link>);
        }
        else {

            return (<Link to="/providers/register" className="nav-link"> Register </Link>);

        }


    }

    showdashboard() {
        const pm = new PM();
        const myuser = pm.getuser.call(this);
        if (myuser) {
            let providerid = myuser.profile;
            return (<Link className="nav-link" to={`/${providerid}/myprojects`}>  Projects  </Link>);
        }
        else {
            return (<Link className="nav-link" to="/"> Home </Link>)
        }



    }
    getextradiv() {
        let widthofwindow = this.state.widthofwindow;
        if (widthofwindow < 721) {
            return (<div className="navigation-blank">&nbsp;</div>)
        }
    }
    navigationmenu() {
        let myjsx = [];
        let pm = new PM();
        let navigation = pm.getnavigation.call(this);
        const myuser = pm.getuser.call(this)
        let providerid = "";
        if (myuser) {
            providerid = myuser.profile;
        }
        if (navigation) {

            let navigation = this.props.navigation.navigation;
            let projectid = pm.getactiveprojectid.call(this)
            let proposalid = this.props.navigation.proposalid;
            let invoiceid = this.props.navigation.invoiceid;
            let csi = this.props.navigation.csi;
            let csiid = this.props.navigation.csiid;
            switch (navigation) {
                case "register":
                    myjsx.push(<Link to={`/providers/register`} className="nav-link">  /register </Link>)
                    break;
                case "login":
                    myjsx.push(<Link to={`/providers/login`} className="nav-link">  /login </Link>)
                    break;
                case "myprojects":
                    myjsx.push(<Link to={`/${providerid}/myprojects`} className="nav-link">  /myprojects </Link>)
                    return (myjsx);
                case "viewprofile":
                    providerid = this.props.navigation.providerid;
                    myjsx.push(<Link to={`/${providerid}`} className="nav-link">  /{providerid} </Link>)
                    return (myjsx);
                case "profile":
                    return (<Link to={`/${providerid}/profile`} className="nav-link">  /profile </Link>)
                case "project":
                    myjsx.push(<Link to={`/${providerid}/myprojects`} className="nav-link">  /myprojects </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}`} className="nav-link">  {`/${projectid}`}  </Link>)
                    return (myjsx);
                case "milestones":
                    myjsx.push(<Link to={`/${providerid}/myprojects`} className="nav-link">  /myprojects </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}`} className="nav-link"> {`/${projectid}`}  </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}/milestones`} className="nav-link">  {`/milestones`}  </Link>)
                    return (myjsx);
                    case "charges":
                        providerid = myuser.profile;
                        myjsx.push(<Link to={`/${providerid}/myprojects`} className="nav-link">  /myprojects </Link>)
                        myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}`} className="nav-link">  {`/${projectid}`}  </Link>)
                        myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}/charges`} className="nav-link">  {`/charges`}  </Link>)
                        return (myjsx);
                case "team":
                    providerid = myuser.profile;
                    myjsx.push(<Link to={`/${providerid}/myprojects`} className="nav-link">  /myprojects </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}`} className="nav-link">  {`/${projectid}`}  </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}/team`} className="nav-link">  {`/team`}  </Link>)
                    return (myjsx);
                case "proposals":
                    myjsx.push(<Link to={`/${providerid}/myprojects`} className="nav-link">  /myprojects </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}`} className="nav-link">  {`/${projectid}`}  </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}/proposals`} className="nav-link">  {`/proposals`}  </Link>)
                    return (myjsx);
                case "invoices":
                    myjsx.push(<Link to={`/${providerid}/myprojects`} className="nav-link">  /myprojects </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}`} className="nav-link">  {`/${projectid}`}  </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}/invoices`} className="nav-link">  {`/invoices`}  </Link>)
                    return (myjsx);
                case "bid":
                    myjsx.push(<Link to={`/${providerid}/myprojects`} className="nav-link">  /myprojects </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}`} className="nav-link">  {`/${projectid}`}  </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}/bid`} className="nav-link">  {`/bid`}  </Link>)
                    return (myjsx);
                case "biditem":
                    myjsx.push(<Link to={`/${providerid}/myprojects`} className="nav-link">  /myprojects </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}`} className="nav-link">  {`/${projectid}`}  </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}/bid`} className="nav-link">  {`/bid`}  </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}/bid/csi/${csiid}`} className="nav-link">  {`/${csi}`} </Link>)
                    return (myjsx);
                case "bidschedule":
                    myjsx.push(<Link to={`/${providerid}/myprojects`} className="nav-link">  /myprojects </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}`} className="nav-link">  {`/${projectid}`}  </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}/bidschedule`} className="nav-link">  {`/bidschedule`}  </Link>)
                    return (myjsx);
                case "bidscheduleitem":
                    myjsx.push(<Link to={`/${providerid}/myprojects`} className="nav-link">  /myprojects </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}`} className="nav-link">  {`/${projectid}`}  </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}/bidschedule`} className="nav-link">  {`/bidschedule`}  </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}/bidschedule/csi/${csiid}`} className="nav-link">  {`/${csi}`} </Link>)
                    return (myjsx);
                case "viewinvoice":
                    myjsx.push(<Link to={`/${providerid}/myprojects`} className="nav-link">  /myprojects </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}`} className="nav-link">  {`/${projectid}`}  </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}/invoices`} className="nav-link">  {`/invoices`}  </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}/invoices/${invoiceid}`} className="nav-link">  {`/${invoiceid}`}  </Link>)
                    return (myjsx);
                case "viewproposal":
                    myjsx.push(<Link to={`/${providerid}/myprojects`} className="nav-link">  /myprojects </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}`} className="nav-link">  {`/${projectid}`}  </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}/proposals`} className="nav-link">  {`/proposals`}  </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}/proposals/${proposalid}`} className="nav-link">  {`/${proposalid}`}  </Link>)
                    return (myjsx);
                default:

                    myjsx.push(<div>It's project management online </div>)
                    break
            }
        }

        return myjsx;

    }

    render() {

        return (<div className="navigation-container">
            <div className="navigation-element-1">
                <div className="navigation-logo-container">{Logo()}</div>
            </div>
            {this.getextradiv()}
            <div className="navigation-element-2">
                <ul className="navigation-liststyle">
                    <li> {this.handleregister()} </li>
                    <li>{this.showdashboard()}</li>
                    <li>{this.showlogout()}</li>
                </ul>
            </div>
            <div className="navigation-element-3">{this.navigationmenu()}
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

export default connect(mapStateToProps, actions)(Header)
