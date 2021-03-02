import React, { Component } from 'react';
import * as actions from './actions';
import { connect } from 'react-redux';
import { MyStylesheet } from './styles';
import PM from './pm';
import { TeamMember } from './functions';
import { removeIconSmall, defaultProfilePhoto } from './svg'
import { Link } from 'react-router-dom'
import ProjectID from './projectid';


class Team extends Component {

    constructor(props) {
        super(props);
        this.state = {
            render: '',
            width: 0,
            height: 0,
            activeprovider: '',
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
        console.log(allusers)
        if (!allusers) {
            pm.loadallusers.call(this)
        }

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

                    if (myuser.firstname.toLowerCase().startsWith(search.toLowerCase()) || myuser.lastname.toLowerCase().startsWith(search.toLowerCase())) {
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

                    if (myuser.firstname.toLowerCase().startsWith(search.toLowerCase()) || myuser.lastname.toLowerCase().startsWith(search.toLowerCase())) {
                        results.push(this.showdesignsearchid(myuser))
                    }

                })

            }

        }
        return results;

    }
    validateengineer(providerid) {
        let validate = true;
        const pm = new PM();
        const myteam = pm.getengineering.call(this);
        if (myteam) {
            // eslint-disable-next-line
            myteam.map(myteam => {
                if (myteam.providerid === providerid) {
                    validate = false;
                }
            })
        }
        return validate;
    }
    validateprovider(providerid) {
        let validate = true;
        const pm = new PM();
        const myteam = pm.getteam.call(this);
        if (myteam) {
            // eslint-disable-next-line
            myteam.map(myteam => {
                if (myteam.providerid === providerid) {
                    validate = false;
                }
            })
        }
        return validate;
    }
    addDesignTeam(providerid) {

        const pm = new PM();
        const myuser = pm.getuser.call(this)

        if (myuser) {

            const myproject = pm.getproject.call(this);
            if (myproject) {
                const i = pm.getprojectkeytitle.call(this, this.props.match.params.projectid);
                if (this.validateengineer(providerid)) {
                    const myengineers = pm.getengineering.call(this);
                    const role = this.state.role;
                    let newteam = TeamMember(providerid, role)
                    if (myengineers) {

                        myuser.projects.myproject[i].engineering.push(newteam)

                    } else {
                        let engineering = [newteam]
                        myuser.projects.myproject[i].engineering = engineering;
                    }
                    this.props.reduxUser(myuser);
                    this.setState({ activeengineer: providerid })
                }

            }

        }
    }
    addteam(providerid) {

        const pm = new PM();
        const myuser = pm.getuser.call(this)
        if (myuser) {
            const project = pm.getproject.call(this)
            if (project) {
                const i = pm.getprojectkeybyid.call(this, project.projectid);
               
                let validate = this.validateprovider(providerid);

                if (validate) {

                    const myteam = pm.getteam.call(this);
                    
                    const role = ""
                    let newteam = TeamMember(providerid, role)

                    if (myteam) {

                        myuser.projects[i].team.push(newteam)

                    } else {
                        
                        myuser.projects[i].team = [newteam]
                    }
                    this.props.reduxUser(myuser);
                    this.setState({ activeprovider: providerid })
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
                return (<img src={myuser.profileurl} alt={`${myuser.firstname} ${myuser.lastname}`} style={{ ...styles.searchphoto }} />)
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
                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }} onClick={() => this.addDesignTeam(myuser.providerid)}>
                    <div style={{ ...styles.flex1 }}>
                        <div style={{ ...styles.generalContainer, ...styles.searchphoto, ...styles.showBorder }}>
                            {SearchPhoto()}
                        </div>
                    </div>
                    <div style={{ ...styles.flex5, ...styles.generalFont, ...regularFont }}>
                        {myuser.firstname} {myuser.lastname}
                        {location()}
                    </div>
                </div>
            )
        } else {

            return (
                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }} onClick={() => this.addteam(myuser.providerid)}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalContainer, ...styles.searchphoto, ...styles.showBorder }}>
                            {SearchPhoto()}
                        </div>

                    </div>
                    <div style={{ ...styles.flex3, ...styles.generalFont, ...regularFont }}>
                        {myuser.firstname} {myuser.lastname}{location()}
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
                return (<img src={myuser.profileurl} alt={`${myuser.firstname} ${myuser.lastname}`} style={{ ...styles.searchphoto }} />)
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
                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }} onClick={() => this.addteam(myuser.providerid)}>
                    <div style={{ ...styles.flex1 }}>
                        <div style={{ ...styles.generalContainer, ...styles.searchphoto, ...styles.showBorder }}>
                            {SearchPhoto()}
                        </div>
                    </div>
                    <div style={{ ...styles.flex5, ...styles.generalFont, ...regularFont }}>
                        {myuser.firstname} {myuser.lastname}
                        {location()}
                    </div>
                </div>
            )
        } else {

            return (
                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }} onClick={() => this.addteam(myuser.providerid)}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalContainer, ...styles.searchphoto, ...styles.showBorder }}>
                            {SearchPhoto()}
                        </div>

                    </div>
                    <div style={{ ...styles.flex3, ...styles.generalFont, ...regularFont }}>
                        {myuser.firstname} {myuser.lastname}{location()}
                    </div>
                </div>
            )
        }

    }
    showdesignteamids() {
        const pm = new PM();
        const myproject = pm.getprojectbytitle.call(this, this.props.match.params.projectid);

        let myproviders = [];
        if (myproject.hasOwnProperty("engineering")) {
            // eslint-disable-next-line
            myproject.engineering.map(myteam => {

                let myuser = pm.getproviderbyid.call(this, myteam.providerid)


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

                myproviders.push(this.showprovider(getteam.providerid))
            })


        }


        return myproviders;
    }

    getactiveprovider() {
        const pm = new PM();
        let provider = false;
        if (this.state.activeprovider) {
            const providerid = this.state.activeprovider;
            const myproject = pm.getprojectbytitle.call(this, this.props.match.params.projectid);

            if (myproject.hasOwnProperty("projectteam")) {
                // eslint-disable-next-line
                myproject.projectteam.myteam.map(myteam => {
                    if (myteam.providerid === providerid) {
                        provider = myteam;
                    }
                })
            }
        }
        return provider;
    }

    getactiveproviderkey() {
        const pm = new PM();
        let key = false;
        if (this.state.activeprovider) {
            const providerid = this.state.activeprovider;
            const myproject = pm.getprojectbytitle.call(this, this.props.match.params.projectid);
            if (myproject.hasOwnProperty("projectteam")) {
                // eslint-disable-next-line
                myproject.projectteam.myteam.map((myteam, i) => {
                    if (myteam.providerid === providerid) {
                        key = i;
                    }
                })
            }
        }
        return key;

    }
    removeengineer(providerid) {
        const pm = new PM();
        const engineer = pm.getproviderbyid.call(this, providerid)
        console.log(engineer)
        if (window.confirm(`Are you sure you want to remove ${engineer.firstname} ${engineer.lastname} ?`)) {
            const myuser = pm.getuser.call(this)
            if (myuser) {
                const project = pm.getproject.call(this)
                if (project) {
                    const projectid = project.projectid;
                    const i = pm.getprojectkeybyid.call(this, projectid);
                    const engineer = pm.getengineerbyid.call(this, providerid)
                    if (engineer) {
                        const j = pm.getengineerkeybyid.call(this, providerid);
                        myuser.projects.myproject[i].engineering.splice(j, 1);
                        this.props.reduxUser(myuser)
                        this.setState({ render: 'render' })

                    }

                }
            }
        }
    }
    handleengineerrole(role) {
        const pm = new PM();
        const myuser = pm.getuser.call(this);
        if (myuser) {
            const project = pm.getproject.call(this)
            if (project) {
                const projectid = project.projectid;
                const i = pm.getprojectkeybyid.call(this, projectid);
                if (this.state.activeengineer) {
                    const engineer = pm.getengineerbyid.call(this, this.state.activeengineer)
                    if (engineer) {
                        const j = pm.getengineerkeybyid.call(this, this.state.activeengineer);
                        myuser.projects.myproject[i].engineering[j].role = role;
                        this.props.reduxUser(myuser);
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
                return myengineer.role

            } else {
                return this.state.engineerrole;
            }


        }

    }

    getrole() {
        const pm = new PM();
        let role = "";
        if (this.state.activeprovider) {

            const myprovider = pm.getteambyid.call(this, this.state.activeprovider)
            if (myprovider) {
                role = myprovider.role;
            }
        }
        return role;

    }

    handlerole(role) {
        const pm = new PM();
        const myuser = pm.getuser.call(this);
        if (myuser) {
            const project = pm.getproject.call(this)
            if (project) {

                const i = pm.getprojectkeybyid.call(this, project.projectid)


                if (this.state.activeprovider) {
                    const team = pm.getteambyid.call(this, this.state.activeprovider)
                    if (team) {

                        const j = pm.getteamkeybyid.call(this, this.state.activeprovider)
                        myuser.projects[i].team[j].role = role;
                        this.props.reduxUser(myuser);
                        this.setState({ render: 'render' })

                    }

                }


            }

        }

    }
    makeprovideractive(providerid) {
        if (this.state.activeprovider === providerid) {
            this.setState({ activeprovider: false, role: '' })
        } else {
            this.setState({ activeprovider: providerid, role: '' })
        }
    }
    removeprovider(myteam) {
        const pm = new PM();
        

        const myuser = pm.getuser.call(this)
        if (myuser) {
            
            const myprovider = pm.getuserbyid.call(this,myteam.providerid)
            if (window.confirm(`Are you sure you want to delete ${myprovider.profile} from the team?`)) {
                const project = pm.getproject.call(this);
                if(project) {
                    const i = pm.getprojectkeybyid.call(this,project.projectid)
                    const team = pm.getteambyid.call(this,myteam.providerid)
                    if(team) {
                        const j = pm.getteamkeybyid.call(this,myteam.providerid)
                        myuser.projects[i].team.splice(j, 1);
                        this.props.reduxUser(myuser);
                        this.setState({ activeprovider: false })
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
                return (`${myuser.address} ${myuser.city} ${myuser.contactstate} ${myuser.zipcode}  `)
            } else {
                return;
            }
        }
        const ProfileImage = () => {

            if (myuser.profileurl) {

                return (<img src={myuser.profileurl} alt={`${myuser.firstname} ${myuser.lastname}`} style={{ ...teamProfile }} />)
            } else {
                return (defaultProfilePhoto())
            }
        }
        const Role = () => {
            if (this.state.activeengineer === myuser.providerid) {
                return (<div style={{ ...styles.generalContainer }}>
                    <div style={{ ...styles.generalFont, ...regularFont, ...styles.alignCenter }}>
                        {myuser.firstname} {myuser.lastname}'s Role on the Project
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
                <button style={{ ...styles.generalButton, ...removeIcon }} onClick={() => { this.removeengineer(myuser.providerid) }}>{removeIconSmall()}</button>
            </div>

            <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                <div style={{ ...styles.showBorder, ...teamProfile, ...styles.marginAuto }} onClick={() => { this.makeengineeractive(myuser.providerid) }}>
                    {ProfileImage()}
                </div>
            </div>

            <div style={{ ...styles.generalContainer, ...styles.alignCenter }} onClick={() => { this.makeengineeractive(myuser.providerid) }}>
                {myuser.firstname} {myuser.lastname}
            </div>
            <div style={{ ...styles.generalContainer, ...styles.alignCenter }} onClick={() => { this.makeengineeractive(myuser.providerid) }}>
                {company()} {location()}
            </div>

            {Role()}


        </div>)
    }
    showprovider(providerid) {

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
                return (`${myuser.address} ${myuser.city} ${myuser.contactstate} ${myuser.zipcode}  `)
            } else {
                return;
            }
        }
        const ProfileImage = () => {

            if (myuser.profileurl) {

                return (<img src={myuser.profileurl} alt={`${myuser.firstname} ${myuser.lastname}`} style={{ ...teamProfile }} />)
            } else {
                return (defaultProfilePhoto())
            }
        }
        const Role = () => {
            if (this.state.activeprovider === myuser.providerid) {
                return (<div style={{ ...styles.generalContainer }}>
                    <div style={{ ...styles.generalFont, ...regularFont, ...styles.alignCenter }}>
                        {myuser.firstname} {myuser.lastname}'s Role on the Project
                    </div>
                    <div style={{ ...styles.generalFont, ...regularFont, ...styles.alignCenter }}>
                        <textarea style={{ ...styles.generalField, ...regularFont, ...styles.generalFont }}
                            value={this.getrole()}
                            onChange={event => { this.handlerole(event.target.value) }}></textarea>
                    </div>
                </div>)
            }
        }

        const myuser = pm.getuserbyid.call(this, providerid)
        if (myuser) {

            return (<div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.showBorder }} key={myuser.profile}>

                <div style={{ ...styles.generalContainer, ...styles.textAlignRight }}>
                    <button style={{ ...styles.generalButton, ...removeIcon }} onClick={() => { this.removeprovider(myuser) }}>{removeIconSmall()}</button>
                </div>

                <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                    <div style={{ ...styles.showBorder, ...teamProfile, ...styles.marginAuto, ...styles.bottomMargin15 }} onClick={() => { this.makeprovideractive(myuser.providerid) }}>
                        {ProfileImage()}
                    </div>
                </div>

                <div style={{ ...styles.generalContainer, ...styles.alignCenter }} onClick={() => { this.makeprovideractive(myuser.providerid) }}>
                    {myuser.firstname} {myuser.lastname}
                </div>
                <div style={{ ...styles.generalContainer, ...styles.alignCenter }} onClick={() => { this.makeprovideractive(myuser.providerid) }}>
                    {company()} {location()}
                </div>

                {Role()}


            </div>)

        }
    }
    projectteamtitle() {
        const pm = new PM();
        const myproject = pm.getprojectbytitle.call(this, this.props.match.params.projectid);
        const styles = MyStylesheet();
        const regularFont = pm.getRegularFont.call(this)
        if (myproject.hasOwnProperty("projectteam")) {
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
        const myuser = pm.getuser.call(this)
        const projectid = new ProjectID();

        if (myuser) {


            const project = pm.getproject.call(this)

            if (project) {


                return (
                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>



                            <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                <Link style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.boldFont }} to={`/${myuser.profile}/projects/${project.title}`}>  /{project.title}  </Link>
                            </div>

                            <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                <Link style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.boldFont }} to={`/${myuser.profile}/projects/${project.title}/team`}>  /team  </Link>
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



                            {this.projectteamtitle()}


                            <div style={{ ...styles.generalGrid, ...getColumns }}>
                                {this.showteamids()}
                            </div>


                            {pm.showsaveproject.call(this)}

                            {projectid.showprojectid.call(this)}

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
        project: state.project,
        allusers: state.allusers,
        allcompanys: state.allcompanys
    }
}
export default connect(mapStateToProps, actions)(Team)
