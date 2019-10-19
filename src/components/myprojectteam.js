import React, { Component } from 'react';
import './projectteam.css';
import * as actions from './actions';
import { capitalizeFirst, TeamMember, MyUserModel} from './functions'
import { SaveAllProjects } from './actions/api';
import { addProviderIcon, DeleteTeamIcon, SaveProjectManagerIcon, defaultProfilePhoto } from './svg'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

//import { Link } from 'react-router-dom';
//import Role from './form/role';
class MyProjectTeam extends Component {

    constructor(props) {
        super(props);
        this.state = {
            render: '',
            width: 0,
            height: 0,
            activeprovider: '',
            search: '',
            role: '',
            message: '',
            providermessage: 'Add your team - Enter your search by name to find a member to add to your project',
            teammessage: ' Your Project Team. Tap to Edit Project Role '
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

    getproject() {
        let project = {};
        if (this.props.projects.hasOwnProperty("length")) {
            let projectid = this.props.projectid.projectid;
            // eslint-disable-next-line
            this.props.projects.map(myproject => {
                if (myproject.projectid === projectid) {
                    project = myproject;
                }
            })
        }
        return project;
    }
    getprojecttitle() {
        let myproject = this.getproject();
        let projecttitle = `${myproject.projectid}/${myproject.title}`
        return projecttitle;
    }
    handleSearch(search) {
        this.setState({ search })
    }
    showsearchresults() {
        let searchresults = [];
        let search = [];
        if (this.props.searchproviders.hasOwnProperty("searchproviders")) {
            let search = this.state.search;
            if (search) {
                // eslint-disable-next-line
                this.props.searchproviders.searchproviders.map(myprovider => {

                    if (capitalizeFirst(myprovider.firstname).indexOf(capitalizeFirst(search)) !== -1) {
                        searchresults.push(myprovider)

                    }
                    else if (capitalizeFirst(myprovider.lastname).indexOf(capitalizeFirst(search)) !== -1) {

                        searchresults.push(myprovider)

                    }

                })

            }
        }
        if (searchresults.length > 0) {
            // eslint-disable-next-line
            searchresults.map(myprovider => {
                if (this.state.width > 720) {
                    search.push(this.largesearchprovider(myprovider))
                }
                else {
                    search.push(this.smallsearchprovider(myprovider))
                }

            })


        }
        else {
            return (<div className="project-team-general">No Search Providers Found </div>)
        }
        return search;
    }
    largesearchprovider(myprovider) {
        let largesearchprovider = [];
        let profileurl = myprovider.profileurl;
        if (profileurl) {
            largesearchprovider.push(<div className="largesearch-a"> <img alt={`${myprovider.firstname} ${myprovider.lastname}`} src={profileurl} className="profile-icon" /></div>)
        }
        else {
            largesearchprovider.push(<div className="largesearch-a">&nbsp;</div>)
        }

        largesearchprovider.push(<div className="largesearch-b"> 
         <Link to={`/${myprovider.providerid}`} className="profile-link">{myprovider.firstname} {myprovider.lastname}</Link> {myprovider.jobtitle}
        <br/>
        {myprovider.provideraddress}, {myprovider.providercity} {myprovider.providerstate} {myprovider.providerzipcode}<br/>
        <a href={`mailTo:${myprovider.emailaddress}`} class="profile-link">  { myprovider.emailaddress } </a> <br/> 
        <a href={`tel:${myprovider.phone}`} className="profile-link">  { myprovider.phone }</a>
        </div>)
        largesearchprovider.push(<div className="largesearch-a"> <button className="button-addprovider" onClick={event=>{this.addteammember(myprovider.providerid)}}>{addProviderIcon()} </button></div>)
        return largesearchprovider;
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
    addteammember(myprovider) {
        let role = "";
        let teammember = TeamMember(myprovider, role);
        if (this.props.projects.hasOwnProperty("length")) {
            let projectid = this.props.projectid.projectid;
            // eslint-disable-next-line
            this.props.projects.map((myproject, i) => {
                if (myproject.projectid === projectid) {
                    if (myproject.hasOwnProperty("projectteam")) {
                        this.props.projects[i].projectteam.myteam.push(teammember)
                        let obj = this.props.projects;
                        this.props.reduxProjects(obj);
                        this.setState({ activeprovider: myprovider, teammessage: `The Provider ${myprovider} was added to the project. ${myprovider} is now active` })
                    }
                    else {
                        let myteam = [];
                        myteam.push(teammember);
                        let projectteam = { myteam }

                        this.props.projects[i].projectteam = projectteam;
                        let obj = this.props.projects;
                        this.props.reduxProjects(obj);
                        this.setState({ activeprovider: myprovider, teammessage: `The Provider ${myprovider} was added to the project. ${myprovider} is now active` })
                    }
                }
            })
        }
    }
    smallsearchprovider(myprovider) {
        let smallsearchprovider = [];
        let profile = [];
        let profileurl = myprovider.profileurl;
        if (profileurl) {
            profile.push(<img alt={`${myprovider.firstname} ${myprovider.lastname}`} src={profileurl} className="profile-icon" />)
        }
        else {
            profile.push(<span>&nbsp; </span>)
        }
        smallsearchprovider.push(<div className="smallsearch"> &nbsp;
            <div className="smallpicture-container"> {profile}</div>
            <div className="small-profile">
        <Link to={`/${myprovider.providerid}`} className="profile-link">{myprovider.firstname} {myprovider.lastname} </Link> {myprovider.jobtitle}
        <br/>
        {myprovider.provideraddress}, {myprovider.providercity} {myprovider.providerstate} {myprovider.providerzipcode}<br/>
       <a href={`mailTo:${myprovider.emailaddress}`} className="profile-link"> { myprovider.emailaddress } </a><br/> <a href={`tel:${myprovider.phone}`} className="profile-link">{ myprovider.phone } </a>
         </div>
         <div className="small-profile"><button className="button-addprovider" onClick={event=>{this.addteammember(myprovider.providerid)}}>{addProviderIcon()} </button> </div>
        </div>)

        return smallsearchprovider;
    }
    showmyteam() {
        let showmyteam = [];
        if (this.props.projects.hasOwnProperty("length")) {
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
        if (this.props.projects.hasOwnProperty("length")) {
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
    makeprovideractive(providerid) {
        this.setState({ activeprovider: providerid, teammessage: `Your Active Provider is ${providerid}` })
    }
    removeprovider(myprovider) {
        if (window.confirm(`Are you sure you want to delete ${myprovider} from the project ?`)) {
            if (this.props.projects.hasOwnProperty("length")) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projects.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("projectteam")) {
                            // eslint-disable-next-line
                            myproject.projectteam.myteam.map((myteam, j) => {
                                if (myteam.myprovider === myprovider) {
                                    this.props.projects[i].projectteam.myteam.splice(j, 1);
                                    let obj = this.props.projects;
                                    this.props.reduxProjects(obj);
                                    this.setState({ activeprovider: "", teammessage: `${myprovider} removed from the project` })
                                }
                            })
                        }
                    }
                })
            }
        }
    }
    getproviderimage(myprovider) {
        if (myprovider.profileurl) {
            return (<img src={myprovider.profileurl} className="profile-img"  alt={`${myprovider.firstname} ${myprovider.lastname}`} />)
        }
        else {
            return (<div className="profile-img">{defaultProfilePhoto()}</div>)
        }
    }
    createprovider(myprovider) {
        return (<div className="myprovider-container">
        <div className="profile-row-1a"> 
            <div className="provider-picture-container" onClick={event=>{this.makeprovideractive(myprovider.providerid)}}>{this.getproviderimage(myprovider)} </div> 
        </div>
       <div className="profile-row-1b">
            <div className="remove-provider-container"><button className="remove-provider-icon" onClick={event=>{this.removeprovider(myprovider.providerid)}}> {DeleteTeamIcon()}</button> </div>
       </div>
        <div className="provider-link-container"> 
        <Link to={`/${myprovider.providerid}`} className="profile-link">{myprovider.firstname} {myprovider.lastname} </Link> {myprovider.jobtitle}
        <br/>
        {myprovider.provideraddress} {myprovider.providercity} {myprovider.providerstate} {myprovider.providerzipcode} <br/>
        <a href={`mailTo:${myprovider.emailaddress}`} className="profile-link">{ myprovider.emailaddress } </a> <br/> <a href={`tel:${myprovider.phone}`} className="profile-link"> { myprovider.phone } </a></div>
        </div>)


    }
    getrole() {
        let role = "";
        if (this.state.activeprovider) {
            if (this.props.projects.hasOwnProperty("length")) {
                let providerid = this.state.activeprovider;
                let myproject = this.getproject();
                if (myproject.hasOwnProperty("projectteam")) {
                    // eslint-disable-next-line
                    myproject.projectteam.myteam.map((myteam, i) => {
                        if (myteam.myprovider === providerid) {
                            role = myteam.role;
                        }
                    })
                }
            }
        }
        return role;
    }

    handlerole(role) {

        if (this.state.activeprovider) {
            if (this.props.projects.hasOwnProperty("length")) {
                let providerid = this.state.activeprovider;
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projects.map((myproject, i) => {

                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("projectteam")) {
                            // eslint-disable-next-line
                            myproject.projectteam.myteam.map((myteam, j) => {
                                if (myteam.myprovider === providerid) {
                                    this.props.projects[i].projectteam.myteam[j].role = role;
                                    let obj = this.props.projects;
                                    this.props.reduxProjects(obj)
                                    this.setState({ render: 'render' });
                                }

                            })

                        }

                    }
                })
            }
        }

    }
    showrole() {
        let role = [];
        if (this.state.activeprovider) {
            let providerid = this.state.activeprovider;
            let myprovider = this.getprovider(providerid)
            role.push(<div className="project-team-general">Assign {myprovider.firstname} {myprovider.lastname} a role on the Project </div>)
            role.push(<div className="project-team-general"> <input type="text" className="project-field" value={this.getrole()} onChange={event=>{this.handlerole(event.target.value)}} /> </div>)

        }
        return role;
    }
    async handleSaveAllProjects() {
        let providerid = this.props.myusermodel.providerid;
        let projectid = this.props.projectid.projectid;
        let myproject = this.getproject();
        let myusermodel = this.props.myusermodel;
        let values = { projectid, providerid, myusermodel, myproject }

        let response = await SaveAllProjects(values)
        console.log(response)
        if (response.hasOwnProperty("providerid")) {
            let myusermodel = MyUserModel(response.providerid, response.firstname, response.lastname, response.company, response.occupation, response.jobtitle, response.laborrate, response.emailaddress, response.phone, response.profileurl)
            this.props.updateUserModel(myusermodel)
        }
        if (response.hasOwnProperty("projectsmanaging")) {
            this.props.reduxProjects(response.projectsmanaging.myproject)
        }
        if (response.hasOwnProperty("message")) {
            this.setState({ message: response.message, activeprovider: this.searchactiveprovider(response) })
        }

    }
    searchactiveprovider(response) {
        let myprovider = "";
        let activeprovider = this.state.activeprovider
        if (activeprovider) {
            if (response.hasOwnProperty("projectsmanaging")) {
                let myproject = response.projectsmanaging.myproject[0];
                if (myproject.hasOwnProperty("projectteam")) {
                    // eslint-disable-next-line
                    myproject.projectteam.myteam.map(myteam => {
                        if (myteam.myprovider === activeprovider) {
                            myprovider = activeprovider;
                        }
                    })
                }
            }
            return myprovider;
        }

    }
    render() {
        return (<div className="projectteam-container">
       <div className="project-team-title"> {this.getprojecttitle()} <br/> Project Team</div>
       <div className="project-team-general"> {this.state.providermessage}</div>
       <div className="project-team-general"> 
            <input type="text" className="project-field" onChange={event=>{this.handleSearch(event.target.value)}} value={this.state.search}/>
        </div>
        {this.showsearchresults()}
        <div className="project-team-general"> {this.state.teammessage}</div>
        {this.showmyteam()}
        {this.showrole()}
        <div className="project-team-title"><button className="save-manager-icon" onClick={event=>{this.handleSaveAllProjects(event)}}>{SaveProjectManagerIcon()} </button> </div>
       
         <div className="project-team-general"> {this.state.message}</div>
        </div>)
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        projectid: state.projectid,
        projects: state.projects,
        myprovider: state.myprovider,
        searchproviders: state.searchproviders
    }
}
export default connect(mapStateToProps, actions)(MyProjectTeam)
