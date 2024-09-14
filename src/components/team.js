import React, { Component } from 'react';
import * as actions from './actions';
import { connect } from 'react-redux';
import { MyStylesheet } from './styles';
import PM from './pm';
import { TeamMember } from './functions';
import { removeIconSmall, defaultProfilePhoto } from './svg'
import { a } from 'react-router-dom'
import ProjectID from './projectid';


class Team extends Component {

    constructor(props) {
        super(props);
        this.state = {
            render: '',
            width: 0,
            height: 0,
            activeuser: '',
            activeengineer: '',
            search: '',
            message: '',
            role: '',
            spinner: false
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        const pm = new PM();
        const allusers = pm.getallusers.call(this)


    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });

    }



    showsearchresults() {
        const pm = new PM();
        const allusers = pm.getallusers.call(this);
        let results = [];
        let search = "";
        if (this.state.search) {
            search = this.state.search;
            if (allusers) {
                // eslint-disable-next-line
                allusers.map(myuser => {

                    if (myuser.FirstName.toLowerCase().startsWith(search.toLowerCase()) || myuser.LastName.toLowerCase().startsWith(search.toLowerCase())) {
                        results.push(this.showsearchid(myuser))
                    }

                })

            }

        }
        return results;

    }

    showdesignresults() {
        const pm = new PM();
        const allusers = pm.getallusers.call(this);
        let results = [];
        let search = "";
        if (this.state.design) {
            search = this.state.design
            if (allusers) {
                // eslint-disable-next-line
                allusers.map(myuser => {

                    if (myuser.FirstName.toLowerCase().startsWith(search.toLowerCase()) || myuser.LastName.toLowerCase().startsWith(search.toLowerCase())) {
                        results.push(this.showdesignsearchid(myuser))
                    }

                })

            }

        }
        return results;

    }
    validateengineer(User_ID) {
        let validate = true;
        const pm = new PM();
        const myteam = pm.getengineering.call(this);
        if (myteam) {
            // eslint-disable-next-line
            myteam.map(myteam => {
                if (myteam.User_ID === User_ID) {
                    validate = false;
                }
            })
        }
        return validate;
    }
    validateprovider(User_ID) {
        let validate = true;
        const pm = new PM();
        const myteam = pm.getteam.call(this);
        if (myteam) {
            // eslint-disable-next-line
            myteam.map(myteam => {
                if (myteam.User_ID === User_ID) {
                    validate = false;
                }
            })
        }
        return validate;
    }
    addDesignTeam(User_ID) {

        const pm = new PM();
       const projects = pm.getProjects.call(this)

        if(projects) {

            const myproject = pm.getproject.call(this);
            if (myproject) {
                const i = pm.getprojectkeytitle.call(this, this.props.match.params.projectid);
                if (this.validateengineer(User_ID)) {
                    const myengineers = pm.getengineering.call(this);
                    const role = this.state.role;
                    let newteam = TeamMember(User_ID, role)
                    if (myengineers) {

                        projects.myproject[i].engineering.push(newteam)

                    } else {
                        let engineering = [newteam]
                        projects.myproject[i].engineering = engineering;
                    }
                    this.props.reduxProjects(projects);
                    this.setState({ activeengineer: User_ID })
                }

            }

        }
    }
    addteam(myuser) {


       const pm = new PM();
       const projects = pm.getProjects.call(this)
        if(projects) {
            const project = pm.getproject.call(this)
            if (project) {
                const i = pm.getProjectKeyByID.call(this, project.project_id);
               
                let validate = this.validateprovider(myuser.User_ID);

                if (validate) {

                    const myteam = pm.getteam.call(this);
                    
                    const role = ""
                    let newteam = TeamMember(myuser.User_ID, role)

                    if (myteam) {

                        projects[i].team.push(newteam)

                    } else {
                        
                        projects[i].team = [newteam]
                    }
                    this.props.reduxProjects(projects);
                    this.setState({ activeuser: myuser.User_ID })
                }

            }

        }
    }
    showdesignsearchid(myuser) {
        const pm = new PM();
        const styles = MyStylesheet();
        const regularFont = pm.getRegularFont.call(this)

        const SearchPhoto = () => {
            if (myuser.profileurl) {
                return (<img src={myuser.profileurl} alt={`${myuser.FirstName} ${myuser.LastName}`} style={{ ...styles.searchphoto }} />)
            } else {
                return (defaultProfilePhoto())
            }
        }
        const location = () => {
            let address = "";
            let city = "";
            let contactstate = "";
            let zipcode = "";
            if (myuser.hasOwnProperty("company")) {
                address = myuser.address;
                city = myuser.city;
                contactstate = myuser.contactstate;
                zipcode = myuser.zipcode;
                return (<div style={{ ...styles.generalContainer }}>
                    {address} {city} {contactstate} {zipcode}
                </div>)
            }
        }
        if (this.state.width > 800) {
            return (
                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }} onClick={() => this.addDesignTeam(myuser.User_ID)}>
                    <div style={{ ...styles.flex1 }}>
                        <div style={{ ...styles.generalContainer, ...styles.searchphoto, ...styles.showBorder }}>
                            {SearchPhoto()}
                        </div>
                    </div>
                    <div style={{ ...styles.flex5, ...styles.generalFont, ...regularFont }}>
                        {myuser.FirstName} {myuser.LastName}
                        {location()}
                    </div>
                </div>
            )
        } else {

            return (
                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }} onClick={() => this.addteam(myuser)}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalContainer, ...styles.searchphoto, ...styles.showBorder }}>
                            {SearchPhoto()}
                        </div>

                    </div>
                    <div style={{ ...styles.flex3, ...styles.generalFont, ...regularFont }}>
                        {myuser.FirstName} {myuser.LastName}{location()}
                    </div>
                </div>
            )
        }

    }
    showsearchid(myuser) {
        const pm = new PM();
        const styles = MyStylesheet();
        const regularFont = pm.getRegularFont.call(this)

        const SearchPhoto = () => {
            if (myuser.profileurl) {
                return (<img src={myuser.profileurl} alt={`${myuser.FirstName} ${myuser.LastName}`} style={{ ...styles.searchphoto }} />)
            } else {
                return (defaultProfilePhoto())

            }
        }
        const location = () => {
            let address = "";
            let city = "";
            let contactstate = "";
            let zipcode = "";
            if (myuser.hasOwnProperty("company")) {
                address = myuser.address;
                city = myuser.city;
                contactstate = myuser.contactstate;
                zipcode = myuser.zipcode;
                return (<div style={{ ...styles.generalContainer }}>
                    {address} {city} {contactstate} {zipcode}
                </div>)
            }
        }
        if (this.state.width > 800) {
            return (
                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }} onClick={() => this.addteam(myuser)}>
                    <div style={{ ...styles.flex1 }}>
                        <div style={{ ...styles.generalContainer, ...styles.searchphoto, ...styles.showBorder }}>
                            {SearchPhoto()}
                        </div>
                    </div>
                    <div style={{ ...styles.flex5, ...styles.generalFont, ...regularFont }}>
                        {myuser.FirstName} {myuser.LastName}
                        {location()}
                    </div>
                </div>
            )
        } else {

            return (
                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }} onClick={() => this.addteam(myuser)}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalContainer, ...styles.searchphoto, ...styles.showBorder }}>
                            {SearchPhoto()}
                        </div>

                    </div>
                    <div style={{ ...styles.flex3, ...styles.generalFont, ...regularFont }}>
                        {myuser.FirstName} {myuser.LastName}{location()}
                    </div>
                </div>
            )
        }

    }
    showdesignteamids() {
        const pm = new PM();
        const myproject = pm.getproject.call(this);

        let myproviders = [];
        if (myproject.hasOwnProperty("engineering")) {
            // eslint-disable-next-line
            myproject.engineering.map(myteam => {

                let myuser = pm.getproviderbyid.call(this, myteam.User_ID)


                myproviders.push(this.showengineer(myuser))


            })
        }
        return myproviders;
    }
    getTeam() {
        const pm = new PM();
        const project = pm.getproject.call(this)
        let team = false;
        if (project) {
            if (project.hasOwnProperty("team")) {
                team = project.team;
            }
        }
        return team;
    }
    showteamids() {

        const team = this.getTeam();
        let myproviders = []
        if (team) {
             // eslint-disable-next-line
            team.map(getteam => {

                myproviders.push(this.showprovider(getteam))
            })


        }


        return myproviders;
    }

    getactiveuser() {
        const pm = new PM();
        let provider = false;
        if (this.state.activeuser) {
            const User_ID = this.state.activeuser;
            const myproject = pm.getproject.call(this);

            if (myproject.hasOwnProperty("team")) {
                // eslint-disable-next-line
                myproject.team.myteam.map(myteam => {
                    if (myteam.User_ID === User_ID) {
                        provider = myteam;
                    }
                })
            }
        }
        return provider;
    }

    getactiveuserkey() {
        const pm = new PM();
        let key = false;
        if (this.state.activeuser) {
            const User_ID = this.state.activeuser;
            const myproject = pm.getproject.call(this);
            if (myproject.hasOwnProperty("team")) {
                // eslint-disable-next-line
                myproject.team.myteam.map((myteam, i) => {
                    if (myteam.User_ID === User_ID) {
                        key = i;
                    }
                })
            }
        }
        return key;

    }
    removeengineer(User_ID) {
        const pm = new PM();
        const engineer = pm.getproviderbyid.call(this, User_ID)
 
        if (window.confirm(`Are you sure you want to remove ${engineer.FirstName} ${engineer.LastName} ?`)) {
           const projects = pm.getProjects.call(this)
            if(projects) {
                const project = pm.getproject.call(this)
                if (project) {
                    const projectid = project.projectid;
                    const i = pm.getProjectKeyByID.call(this, projectid);
                    const engineer = pm.getengineerbyid.call(this, User_ID)
                    if (engineer) {
                        const j = pm.getengineerkeybyid.call(this, User_ID);
                        projects.myproject[i].engineering.splice(j, 1);
                        this.props.reduxProjects(projects)
                        this.setState({ render: 'render' })

                    }

                }
            }
        }
    }
    handleengineerrole(role) {
        const pm = new PM();
       const projects = pm.getProjects.call(this);
        if(projects) {
            const project = pm.getproject.call(this)
            if (project) {
                const projectid = project.projectid;
                const i = pm.getProjectKeyByID.call(this, projectid);
                if (this.state.activeengineer) {
                    const engineer = pm.getengineerbyid.call(this, this.state.activeengineer)
                    if (engineer) {
                        const j = pm.getengineerkeybyid.call(this, this.state.activeengineer);
                        projects.myproject[i].engineering[j].Role = role;
                        this.props.reduxProjects(projects);
                        this.setState({ render: 'render' })
                    }

                }

            }
        }
    }
    getengineeringrole() {
        const pm = new PM();
        const myproject = pm.getproject.call(this)
        if (myproject) {

            if (this.state.activeengineer) {

                const myengineer = pm.getengineerbyid.call(this, this.state.activeengineer)
                return myengineer.Role

            } else {
                return this.state.engineerrole;
            }


        }

    }

    getrole() {
        const pm = new PM();
        let role = "";
        if (this.state.activeuser) {

            const myprovider = pm.getteambyid.call(this, this.state.activeuser)
            if (myprovider) {
                role = myprovider.Role;
            }
        }
        return role;

    }

    handlerole(role) {
        const pm = new PM();
       const projects = pm.getProjects.call(this);
        if(projects) {
            const project = pm.getproject.call(this)
            if (project) {
           

                const i = pm.getProjectKeyByID.call(this, project.project_id)


                if (this.state.activeuser) {
                    const team = pm.getteambyid.call(this, this.state.activeuser)
                    if (team) {

                        const j = pm.getteamkeybyid.call(this, this.state.activeuser)
                        projects[i].team[j].Role = role;
                        this.props.reduxProjects(projects);
                        this.setState({ render: 'render' })

                    }

                }


            }

        }

    }
    makeprovideractive(User_ID) {
        if (this.state.activeuser === User_ID) {
            this.setState({ activeuser: false, role: '' })
        } else {
            this.setState({ activeuser: User_ID, role: '' })
        }
    }
    removeprovider(myuser) {
        const pm = new PM();
        
        const projects = pm.getProjects.call(this)

        if(projects) {
            
            const myprovider = pm.getuserbyid.call(this,myuser.User_ID)
            if (window.confirm(`Are you sure you want to delete ${myprovider.UserID} from the team?`)) {
                const project = pm.getproject.call(this);
                if(project) {
                    const i = pm.getProjectKeyByID.call(this,project.project_id)
              
                    const team = pm.getteambyid.call(this,myuser.User_ID)
                    if(team) {
                        const j = pm.getteamkeybyid.call(this,myuser.User_ID)
                        projects[i].team.splice(j, 1);
                        this.props.reduxProjects(projects);
                        this.setState({ activeuser: false })
                    }

                }
               
               

            }

        }
    }

    makeengineeractive(engineerid) {
        if (this.state.activeengineer === engineerid) {
            this.setState({ activeengineer: false })
        } else {
            this.setState({ activeengineer: engineerid })
        }
    }
    showengineer(myuser) {

        const styles = MyStylesheet();
        const pm = new PM();
        let regularFont = pm.getRegularFont.call(this);
        const teamProfile = pm.getteamprofile.call(this);
        const removeIcon = pm.getremoveicon.call(this);
        const company = () => {
            if (myuser.hasOwnProperty("company")) {
                return myuser.company;
            } else {
                return;
            }
        }
        const location = () => {
            if (myuser.hasOwnProperty("company")) {
                return (`${myuser.Address} ${myuser.City} ${myuser.ContactState} ${myuser.Zipcode}  `)
            } else {
                return;
            }
        }
        const ProfileImage = () => {

            if (myuser.profileurl) {

                return (<img src={myuser.profileurl} alt={`${myuser.FirstName} ${myuser.LastName}`} style={{ ...teamProfile }} />)
            } else {
                return (defaultProfilePhoto())
            }
        }
        const Role = () => {
            if (this.state.activeengineer === myuser.User_ID) {
                return (<div style={{ ...styles.generalContainer }}>
                    <div style={{ ...styles.generalFont, ...regularFont, ...styles.alignCenter }}>
                        {myuser.FirstName} {myuser.LastName}'s Role on the Project
                    </div>
                    <div style={{ ...styles.generalFont, ...regularFont, ...styles.alignCenter }}>
                        <textarea style={{ ...styles.generalField, ...regularFont, ...styles.generalFont }}
                            value={this.getengineeringrole()}
                            onChange={event => { this.handleengineerrole(event.target.value) }}></textarea>
                    </div>
                </div>)
            }
        }

        return (<div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.showBorder }}>
            <div style={{ ...styles.generalContainer, ...styles.textAlignRight }}>
                <button style={{ ...styles.generalButton, ...removeIcon }} onClick={() => { this.removeengineer(myuser.User_ID) }}>{removeIconSmall()}</button>
            </div>

            <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                <div style={{ ...styles.showBorder, ...teamProfile, ...styles.marginAuto }} onClick={() => { this.makeengineeractive(myuser.User_ID) }}>
                    {ProfileImage()}
                </div>
            </div>

            <div style={{ ...styles.generalContainer, ...styles.alignCenter }} onClick={() => { this.makeengineeractive(myuser.User_ID) }}>
                {myuser.FirstName} {myuser.LastName}
            </div>
            <div style={{ ...styles.generalContainer, ...styles.alignCenter }} onClick={() => { this.makeengineeractive(myuser.User_ID) }}>
                {company()} {location()}
            </div>

            {Role()}


        </div>)
    }

    showprovider(myteam) {

        const styles = MyStylesheet();
        const pm = new PM();
        let regularFont = pm.getRegularFont.call(this);
        const teamProfile = pm.getteamprofile.call(this);
        const removeIcon = pm.getremoveicon.call(this);
        const myuser = pm.getuserbyid.call(this,myteam.User_ID)
        const company = () => {
            if (myuser.hasOwnProperty("company")) {
                return myuser.company;
            } else {
                return;
            }
        }
        const location = () => {
            if (myuser.hasOwnProperty("company")) {
                return (`${myuser.Address} ${myuser.City} ${myuser.ContactState} ${myuser.Zipcode}  `)
            } else {
                return;
            }
        }
        const ProfileImage = () => {

            if (myuser.profileurl) {

                return (<img src={myuser.ProfileURL} alt={`${myuser.FirstName} ${myuser.LastName}`} style={{ ...teamProfile }} />)
            } else {
                return (defaultProfilePhoto())
            }
        }
        const Role = () => {
            if (this.state.activeuser === myuser.User_ID) {
                return (<div style={{ ...styles.generalContainer }}>
                    <div style={{ ...styles.generalFont, ...regularFont, ...styles.alignCenter }}>
                        {myuser.FirstName} {myuser.LastName}'s Role on the Project
                    </div>
                    <div style={{ ...styles.generalFont, ...regularFont, ...styles.alignCenter }}>
                        <textarea style={{ ...styles.generalField, ...regularFont, ...styles.generalFont }}
                            value={this.getrole()}
                            onChange={event => { this.handlerole(event.target.value) }}></textarea>
                    </div>
                </div>)
            }
        }

        const projects = pm.getProjects.call(this)
        if(projects) {

            return (<div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.showBorder }} key={myuser.profile}>

                <div style={{ ...styles.generalContainer, ...styles.textAlignRight }}>
                    <button style={{ ...styles.generalButton, ...removeIcon }} onClick={() => { this.removeprovider(myuser) }}>{removeIconSmall()}</button>
                </div>

                <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                    <div style={{ ...styles.showBorder, ...teamProfile, ...styles.marginAuto, ...styles.bottomMargin15 }} onClick={() => { this.makeprovideractive(myuser.User_ID) }}>
                        {ProfileImage()}
                    </div>
                </div>

                <div style={{ ...styles.generalContainer, ...styles.alignCenter }} onClick={() => { this.makeprovideractive(myuser.UserID) }}>
                    {myuser.FirstName} {myuser.LastName}
                </div>
                <div style={{ ...styles.generalContainer, ...styles.alignCenter }} onClick={() => { this.makeprovideractive(myuser.UserID) }}>
                    {company()} {location()}
                </div>

                {Role()}


            </div>)

        }
    }
    teamtitle() {
        const pm = new PM();
        
        const myproject = pm.getproject.call(this);
        const styles = MyStylesheet();
        const regularFont = pm.getRegularFont.call(this)
        if (myproject.hasOwnProperty("team")) {
            return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont }}>
                    Project Team - Touch Their Picture Icon to Define their Role
            </div>
            </div>)
        } else {
            return;
        }
    }
    render() {
        const styles = MyStylesheet();
        const pm = new PM();
        const headerFont = pm.getHeaderFont.call(this);
        const regularFont = pm.getRegularFont.call(this);
        const getColumns = pm.getcolumns.call(this);
       const projects = pm.getProjects.call(this)
        const projectid = new ProjectID();

        if(projects) {


            const project = pm.getproject.call(this)

            if (project) {


                return (
                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>




                            <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                <a style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.boldFont }} 
                                >  /team  </a>
                            </div>

                            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                <div style={{ ...styles.flex1 }}>
                                    <span style={{ ...headerFont, ...styles.generalFont }}>Construction Team</span>
                                </div>
                            </div>

                            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont }}>
                                    Construction Search  <br />
                                    <input type="text"
                                        value={this.state.search}
                                        onChange={event => { this.setState({ search: event.target.value }) }}
                                        style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }} />
                                </div>
                            </div>
                            {this.showsearchresults()}



                            {this.teamtitle()}


                            <div style={{ ...styles.generalGrid, ...getColumns }}>
                                {this.showteamids()}
                            </div>


                      

                        </div>
                    </div>
                )

            } else {
                return (<div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                    <span style={{ ...styles.generalFont, ...regularFont }}>Project Not Found</span>
                </div>)

            }

        } else {
            return (<div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                <span style={{ ...styles.generalFont, ...regularFont }}>Please Login to View Team</span>
            </div>)
        }

    }

}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation,
        projects: state.projects,
        myprojects:state.myprojects,
        allusers: state.allusers,
        allcompanys: state.allcompanys
    }
}
export default connect(mapStateToProps, actions)(Team)
