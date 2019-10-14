import React, { Component } from 'react';
import './header.css'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Logo } from './svg';

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
    showlogout() {
        var logoutURL = process.env.REACT_APP_SERVER_API + "/api/user/logout";
        if (this.props.myusermodel.hasOwnProperty("providerid")) {
            return (<a href={logoutURL}
            className="nav-link"> <span className="nav-link">Logout </span> </a>);
        }
        else if (this.props.myusermodel.hasOwnProperty("message")) {

            return (<Link  className="nav-link" to="/providers/login"><span className="nav-link"> Login  </span></Link>);

        }
        else {
            return (<div> &nbsp;</div>)
        }


    }

    handleregister() {
        if (this.props.myusermodel.hasOwnProperty("providerid")) {
            let providerid = this.props.myusermodel.providerid;
            return (<Link to={`/${providerid}/profile`} className="nav-link"> Profile </Link>);
        }
        else if (this.props.myusermodel.hasOwnProperty("message")) {

            return (<Link to="/providers/join" className="nav-link"> Register </Link>);

        }
        else {
            return (<div> &nbsp;</div>)
        }

    }

    showdashboard() {
        if (this.props.myusermodel.hasOwnProperty("providerid")) {
            let providerid = this.props.myusermodel.providerid;
            return (<Link  className="nav-link" to={`/${providerid}/myprojects`}>  Projects  </Link>);
        }
        else if (this.props.myusermodel) {
            return (<Link  className="nav-link" to="/"> Home </Link>)
        }

        else {
            return (<div> &nbsp;</div>)
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
        if (this.props.navigation) {
            let providerid = this.props.myusermodel.providerid;
            let projectid = this.props.projectid.projectid;
            let navigation = this.props.navigation.navigation
            switch (navigation) {
                case "register":
                    myjsx.push(<Link to={`/providers/register`} className="nav-link">  /register </Link>)
                    break;
                case "login":
                    myjsx.push(<Link to={`/providers/login`} className="nav-link">  /login </Link>)
                    break;
                case "join":
                    myjsx.push(<Link to={`/providers/join`} className="nav-link">  /join </Link>)
                    break;
                case "providerjoin":
                    providerid = this.props.navigation.providerid;
                    myjsx.push(<Link to={`/${providerid}`} className="nav-link">  /{providerid} </Link>)
                    myjsx.push(<Link to={`/providers/join/${providerid}`} className="nav-link">  /join </Link>)
                    break;
                case "myprojects":
                    providerid = this.props.myusermodel.providerid;
                    myjsx.push(<Link to={`/${providerid}/myprojects`} className="nav-link">  /myprojects </Link>)
                    return (myjsx);
                case "viewprofile":
                    providerid = this.props.navigation.providerid;
                    myjsx.push(<Link to={`/${providerid}`} className="nav-link">  /{providerid} </Link>)
                    return (myjsx);
                case "profile":
                    providerid = this.props.myusermodel.providerid;
                    return (<Link to={`/${providerid}/profile`} className="nav-link">  /profile </Link>)
                case "project":
                    providerid = this.props.myusermodel.providerid;
                    projectid = this.props.projectid.projectid;
                    myjsx.push(<Link to={`/${providerid}/myprojects`} className="nav-link">  /myprojects </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}`} className="nav-link">  {`/${projectid}`}  </Link>)
                    return (myjsx);
                case "milestones":
                    providerid = this.props.myusermodel.providerid;
                    projectid = this.props.projectid.projectid;
                    myjsx.push(<Link  to={`/${providerid}/myprojects`} className="nav-link">  /myprojects </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}`} className="nav-link"> {`/${projectid}`}  </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}/milestones`} className="nav-link">  {`/milestones`}  </Link>)
                    return (myjsx);
                case "projectteam":
                    providerid = this.props.myusermodel.providerid;
                    projectid = this.props.projectid.projectid;
                    myjsx.push(<Link to={`/${providerid}/myprojects`} className="nav-link">  /myprojects </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}`} className="nav-link">  {`/${projectid}`}  </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}/team`} className="nav-link">  {`/team`}  </Link>)
                    return (myjsx);
                case "schedulelabor":
                    providerid = this.props.myusermodel.providerid;
                    projectid = this.props.projectid.projectid;
                    myjsx.push(<Link  to={`/${providerid}/myprojects`} className="nav-link">  /myprojects </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}`} className="nav-link">  {`/${projectid}`}  </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}/schedulelabor`} className="nav-link">  {`/schedulelabor`}  </Link>)
                    return (myjsx);
                case "schedulematerials":
                    providerid = this.props.myusermodel.providerid;
                    projectid = this.props.projectid.projectid;
                    myjsx.push(<Link to={`/${providerid}/myprojects`} className="nav-link">  /myprojects </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}`} className="nav-link">  {`/${projectid}`}  </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}/schedulematerials`} className="nav-link">  {`/schedulematerials`}  </Link>)
                    return (myjsx);
                case "actuallabor":
                    providerid = this.props.myusermodel.providerid;
                    projectid = this.props.projectid.projectid;
                    myjsx.push(<Link to={`/${providerid}/myprojects`}  className="nav-link">  /myprojects </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}`} className="nav-link">  {`/${projectid}`}  </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}/actuallabor`} className="nav-link">  {`/actuallabor`}  </Link>)
                    return (myjsx);
                case "actualmaterials":
                    providerid = this.props.myusermodel.providerid;
                    projectid = this.props.projectid.projectid;
                    myjsx.push(<Link to={`/${providerid}/myprojects`}  className="nav-link">  /myprojects </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}`} className="nav-link">  {`/${projectid}`}  </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}/actualmaterials`} className="nav-link">  {`/actualmaterials`}  </Link>)
                    return (myjsx);
                case "proposals":

                    myjsx.push(<Link to={`/${providerid}/myprojects`}  className="nav-link">  /myprojects </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}`} className="nav-link">  {`/${projectid}`}  </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}/proposals`} className="nav-link">  {`/proposals`}  </Link>)
                    return (myjsx);
                case "invoices":

                    myjsx.push(<Link to={`/${providerid}/myprojects`}  className="nav-link">  /myprojects </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}`} className="nav-link">  {`/${projectid}`}  </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}/invoices`} className="nav-link">  {`/invoices`}  </Link>)
                    return (myjsx);
                case "viewinvoice":

                    myjsx.push(<Link to={`/${providerid}/myprojects`}  className="nav-link">  /myprojects </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}`} className="nav-link">  {`/${projectid}`}  </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}/invoices`} className="nav-link">  {`/invoices`}  </Link>)

                    return (myjsx);
                case "viewproposal":
                    providerid = this.props.myusermodel.providerid;
                    projectid = this.props.projectid.projectid;

                    myjsx.push(<Link to={`/${providerid}/myprojects`}  className="nav-link">  /myprojects </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}`} className="nav-link">  {`/${projectid}`}  </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}/proposals`} className="nav-link">  {`/proposals`}  </Link>)

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
        <li> {this.handleregister() } </li>
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
        projectid: state.projectid
    }
}

export default connect(mapStateToProps)(Header)
