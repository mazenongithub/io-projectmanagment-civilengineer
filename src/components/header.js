import React, { Component } from 'react';
import './header.css'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Logo } from './svg';
import PM from './pm';

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
        var logoutURL = process.env.REACT_APP_SERVER_API + "/projectmanagement/user/logout";
        if (this.props.myusermodel.hasOwnProperty("providerid")) {
            return (<a href={logoutURL}
                className="nav-link"> <span className="nav-link">Logout </span> </a>);
        }
        else if (this.props.myusermodel.hasOwnProperty("message")) {

            return (<Link className="nav-link" to="/providers/login"><span className="nav-link"> Login  </span></Link>);

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

            return (<Link to="/providers/register" className="nav-link"> Register </Link>);

        }
        else {
            return (<div> &nbsp;</div>)
        }

    }

    showdashboard() {
        if (this.props.myusermodel.hasOwnProperty("providerid")) {
            let providerid = this.props.myusermodel.providerid;
            return (<Link className="nav-link" to={`/${providerid}/myprojects`}>  Projects  </Link>);
        }
        else if (this.props.myusermodel) {
            return (<Link className="nav-link" to="/"> Home </Link>)
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
        let pm = new PM();
        let navigation = pm.getnavigation.call(this);
        const myuser = pm.getuser.call(this)
        if (navigation) {
            let providerid = this.props.myusermodel.providerid;
            let navigation = this.props.navigation.navigation;
            let projectid = this.props.navigation.projectid;
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
                    providerid = myuser.providerid;
                    myjsx.push(<Link to={`/${providerid}`} className="nav-link">  /{providerid} </Link>)
                    myjsx.push(<Link to={`/providers/join/${providerid}`} className="nav-link">  /join </Link>)
                    break;
                case "myprojects":
                    providerid = myuser.providerid;
                    myjsx.push(<Link to={`/${providerid}/myprojects`} className="nav-link">  /myprojects </Link>)
                    return (myjsx);
                case "viewprofile":
                    providerid = navigation;
                    myjsx.push(<Link to={`/${providerid}`} className="nav-link">  /{providerid} </Link>)
                    return (myjsx);
                case "profile":
                    providerid = myuser.providerid;
                    return (<Link to={`/${providerid}/profile`} className="nav-link">  /profile </Link>)
                case "project":
                    providerid = myuser.providerid;

                    myjsx.push(<Link to={`/${providerid}/myprojects`} className="nav-link">  /myprojects </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}`} className="nav-link">  {`/${projectid}`}  </Link>)
                    return (myjsx);
                case "milestones":
                    providerid = myuser.providerid;

                    myjsx.push(<Link to={`/${providerid}/myprojects`} className="nav-link">  /myprojects </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}`} className="nav-link"> {`/${projectid}`}  </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}/milestones`} className="nav-link">  {`/milestones`}  </Link>)
                    return (myjsx);
                case "projectteam":
                    providerid = myuser.providerid;

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
                case "viewinvoice":

                    myjsx.push(<Link to={`/${providerid}/myprojects`} className="nav-link">  /myprojects </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}`} className="nav-link">  {`/${projectid}`}  </Link>)
                    myjsx.push(<Link to={`/${providerid}/myprojects/${projectid}/invoices`} className="nav-link">  {`/invoices`}  </Link>)

                    return (myjsx);
                case "viewproposal":
                    providerid = this.props.myusermodel.providerid;


                    myjsx.push(<Link to={`/${providerid}/myprojects`} className="nav-link">  /myprojects </Link>)
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
        allusers: state.allusers
    }
}

export default connect(mapStateToProps)(Header)
