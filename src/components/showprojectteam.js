import React, { Component } from 'react';
import './projectteam.css';
import * as actions from './actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
class ShowProjectTeam extends Component {
    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0 }
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
    showprojectteam() {
        if (this.props.projectsprovider.hasOwnProperty("length")) {
            let projectid = this.props.projectid.projectid;
            if (projectid) {
                //eslint-disable-next-line
                return this.props.projectsprovider.map(myproject => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("projectteam")) {
                            return (myproject.projectteam.myteam.map(myteam => {
                                return (this.showteam(myteam));
                            }))
                        }
                    }
                })
            }
            else {
                return (<div>&nbsp; </div>)
            }
        }
        else {
            return (<div>&nbsp; </div>)
        }

    }
    showmyteam() {
        let showmyteam = [];
        if (this.props.projectsprovider.hasOwnProperty("length")) {
            let myproject = this.getproject();
            if (myproject.hasOwnProperty("projectteam")) {
                // eslint-disable-next-line
                myproject.projectteam.myteam.map(myteam => {

                    let myprovider = this.getprovider(myteam.myprovider)

                    showmyteam.push(this.createprovider(myprovider))
                })
            }
        }
        showmyteam.push(this.getextrarows())
        return showmyteam;
    }
    getextrarows() {
        let extrarows = 0;
        let rows = [];
        if (this.props.projectsprovider.hasOwnProperty("length")) {
            let myproject = this.getproject();
            if (myproject.hasOwnProperty("projectteam")) {
                if (this.state.width > 1080) {
                    if (myproject.projectteam.myteam.length === 1) {
                        extrarows = 2;
                    }
                    else if (myproject.projectteam.myteam.length === 2) {
                        extrarows = 1;
                    }
                    else if (myproject.projectteam.myteam.length > 2) {
                        extrarows = myproject.projectteam.myteam.length % 3;
                    }

                }
                else if (this.state.width > 720) {
                    extrarows = myproject.projectteam.myteam.length % 2;
                }
            }
        }
        for (let i = 0; i < extrarows; i++) {
            rows.push(<div className="myprovider-container">&nbsp; </div>)
        }
        return rows;
    }
    getprovider(providerid) {

        let provider = {};
        if (this.props.searchproviders) {
            if (this.props.searchproviders.searchproviders) {
                // eslint-disable-next-line
                this.props.searchproviders.searchproviders.map(myprovider => {
                    if (myprovider.providerid === providerid) {
                        provider = myprovider;
                    }
                })
            }
        }
        return provider;
    }
    getproviderimage(myprovider) {
        if (myprovider.profileurl) {
            return (<img src={myprovider.profileurl} className="profile-img"  alt={`${myprovider.firstname} ${myprovider.lastname}`} />)
        }
        else {
            return (<span>&nbsp; </span>)
        }
    }
    createprovider(myprovider) {
        return (<div className="myprovider-container">
        <div className="profile-row-1a"> 
            <div className="provider-picture-container">{this.getproviderimage(myprovider)} </div> 
        </div>
        <div className="provider-link-container"> 
        <Link className="profile-link" to={`/${myprovider.providerid}`}>{myprovider.firstname} {myprovider.lastname} </Link>  {myprovider.jobtitle}
        <br/>
        {myprovider.provideraddress} {myprovider.providercity} {myprovider.providerstate} {myprovider.providerzipcode} <br/>
        <a href={`mailTo:${myprovider.emailaddress}`} className="profile-link"> { myprovider.emailaddress } </a> <br/> <a href={`tel:${myprovider.phone}`} className="profile-link">  { myprovider.phone }</a></div>
        </div>)


    }
    getprojecttitle() {
        let myproject = this.getproject();
        let title = "";
        if (myproject) {
            title = `ProjectID: ${myproject.projectid}/${myproject.title}`
        }
        return title;
    }
    getproject() {
        let project = {};
        if (this.props.projectsprovider) {
            if (this.props.projectsprovider.hasOwnProperty("length")) {

                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projectsprovider.map(myproject => {
                    if (myproject.projectid === projectid) {
                        project = myproject;
                    }
                })
            }
        }
        return project;
    }
    render() {
        return (<div className="projectteam-container">
       <div className="project-team-title"> {this.getprojecttitle()} <br/> Project Team</div>
       {this.showmyteam()}
       </div>)

    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        projectid: state.projectid,
        projectsprovider: state.projectsprovider,
        searchproviders: state.searchproviders
    }
}
export default connect(mapStateToProps, actions)(ShowProjectTeam)
