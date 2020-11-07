import React, { Component } from 'react';
import * as actions from './actions';
import { connect } from 'react-redux';
//import { Link } from 'react-router-dom';
import { MyStylesheet } from './styles';
import PM from './pm';
//import { Link } from 'react-router-dom';
import { TeamMember, returnCompanyList } from './functions';
import { removeIconSmall, defaultProfilePhoto } from './svg'
import {LoadAllUsers} from './actions/api'


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
            role: ''
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        this.props.reduxNavigation({ navigation: "team" })
        this.props.reduxProject({ projectid: this.props.match.params.projectid })
        const pm  = new PM();
        const allusers = pm.getallusers.call(this)
        if(!allusers) {
        this.loadallusers()
        }

    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });

    }

    async loadallusers() {
        try {
            let response = await LoadAllUsers();
            console.log(response)
            if (response.hasOwnProperty("allusers")) {
                let companys = returnCompanyList(response.allusers);
                this.props.reduxAllCompanys(companys)
                this.props.reduxAllUsers(response.allusers);
            }
        } catch (err) {
            alert(err)
        }

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
        const myteam = pm.getprojectteam.call(this);
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
            let validate = this.validateprovider(providerid);
            if (validate) {
                const myteam = pm.getprojectteam.call(this);
                const role = this.state.role;
                let newteam = TeamMember(providerid, role)
                const i = pm.getprojectkeytitle.call(this, this.props.match.params.projectid);
                if (myteam) {

                    myuser.projects.myproject[i].projectteam.myteam.push(newteam)

                } else {
                    let projectteam = { myteam: [newteam] }
                    myuser.projects.myproject[i].projectteam = projectteam;
                }
                this.props.reduxUser(myuser);
                this.setState({ activeprovider: providerid })
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
                address = myuser.company.address;
                city = myuser.company.city;
                contactstate = myuser.company.contactstate;
                zipcode = myuser.company.zipcode;
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
                address = myuser.company.address;
                city = myuser.company.city;
                contactstate = myuser.company.contactstate;
                zipcode = myuser.company.zipcode;
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
    showteamids() {
        const pm = new PM();
        const myproject = pm.getprojectbytitle.call(this, this.props.match.params.projectid);

        let myproviders = [];
        if (myproject.hasOwnProperty("projectteam")) {
            // eslint-disable-next-line
            myproject.projectteam.myteam.map(myteam => {

                let myuser = pm.getproviderbyid.call(this, myteam.providerid)

                console.log(myuser)
                myproviders.push(this.showprovider(myuser))


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
        const engineer = pm.getproviderbyid.call(this,providerid)
        console.log(engineer)
        if(window.confirm(`Are you sure you want to remove ${engineer.firstname} ${engineer.lastname} ?`)) {
           const myuser = pm.getuser.call(this)
            if(myuser) {
                const project = pm.getproject.call(this)
                if(project) {
                    const projectid = project.projectid;
                    const i = pm.getprojectkeybyid.call(this,projectid);
                    const engineer = pm.getengineerbyid.call(this,providerid) 
                    if(engineer) {
                    const j = pm.getengineerkeybyid.call(this,providerid);
                    myuser.projects.myproject[i].engineering.splice(j,1);
                    this.props.reduxUser(myuser)
                    this.setState({render:'render'})

                    }

                }
            }
        }
    }
    handleengineerrole(role) {
        const pm = new PM();
        const myuser = pm.getuser.call(this);
        if(myuser) {
            const project = pm.getproject.call(this)
            if(project) {
                const projectid = project.projectid;
                const i = pm.getprojectkeybyid.call(this,projectid);
                if(this.state.activeengineer) {
                    const engineer = pm.getengineerbyid.call(this,this.state.activeengineer) 
                    if(engineer) {
                    const j = pm.getengineerkeybyid.call(this,this.state.activeengineer);
                    myuser.projects.myproject[i].engineering[j].role = role;
                    this.props.reduxUser(myuser);
                    this.setState({render:'render'})
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
        const myprovider = this.getactiveprovider();
        if (myprovider) {
            return (myprovider.role)
        } else {
            return;
        }

    }
    handlerole(role) {
        const pm = new PM();
        const myuser = pm.getuser.call(this);
        if (myuser) {
            if (this.state.activeprovider) {
                const i = pm.getprojectkeytitle.call(this, this.props.match.params.projectid)
                const j = this.getactiveproviderkey();
                myuser.projects.myproject[i].projectteam.myteam[j].role = role;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })

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
        const myuser = pm.getuser.call(this);
        if (myuser) {

            if (window.confirm(`Are you sure you want to delete Provider ${myteam.providerid}?`)) {

                const i = pm.getprojectkeytitle.call(this, this.props.match.params.projectid);
                const j = pm.getproviderkeybyid.call(this, myteam.providerid);
                myuser.projects.myproject[i].projectteam.myteam.splice(j, 1);
                this.props.reduxUser(myuser);
                this.setState({ activeprovider: false })

            }

        }
    }

    makeengineeractive(engineerid) {
        if(this.state.activeengineer === engineerid) {
            this.setState({activeengineer:false})
        } else {
            this.setState({activeengineer:engineerid})
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
                return myuser.company.company;
            } else {
                return;
            }
        }
        const location = () => {
            if (myuser.hasOwnProperty("company")) {
                return (`${myuser.company.address} ${myuser.company.city} ${myuser.company.contactstate} ${myuser.company.zipcode}  `)
            } else {
                return;
            }
        }
        const ProfileImage = () => {

            if (myuser.profileurl) {

                return (<img src={myuser.profileurl} alt={`${myuser.firstname} ${myuser.lastname}`} style={{ ...teamProfile }} />)
            } else {
               return(defaultProfilePhoto())
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
    showprovider(myuser) {

        const styles = MyStylesheet();
        const pm = new PM();
        let regularFont = pm.getRegularFont.call(this);
        const teamProfile = pm.getteamprofile.call(this);
        const removeIcon = pm.getremoveicon.call(this);
        const company = () => {
            if (myuser.hasOwnProperty("company")) {
                return myuser.company.company;
            } else {
                return;
            }
        }
        const location = () => {
            if (myuser.hasOwnProperty("company")) {
                return (`${myuser.company.address} ${myuser.company.city} ${myuser.company.contactstate} ${myuser.company.zipcode}  `)
            } else {
                return;
            }
        }
        const ProfileImage = () => {

            if (myuser.profileurl) {

                return (<img src={myuser.profileurl} alt={`${myuser.firstname} ${myuser.lastname}`} style={{ ...teamProfile }} />)
            } else {
                return(defaultProfilePhoto())
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

        return (<div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.showBorder }}>
            
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
        const projectid = this.props.match.params.projectid;
        const regularFont = pm.getRegularFont.call(this);
        const getColumns = pm.getcolumns.call(this);
        const myuser = pm.getuser.call(this)

        if(myuser) {

            

        return (
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...headerFont, ...styles.generalFont, ...styles.alignCenter }}>
                            /{projectid} <br />
                            Project Team
                        </div>
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

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1 }}>
                            <span style={{ ...headerFont, ...styles.generalFont }}>Design Team</span>
                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont }}>
                            Design Search <br />
                            <input type="text"
                                value={this.state.design}
                                onChange={event => { this.setState({ design: event.target.value }) }}
                                style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }} />
                        </div>
                    </div>

                    {this.showdesignresults()}

   
                    <div style={{ ...styles.generalGrid, ...getColumns }}>
                        {this.showdesignteamids()}
                    </div>

                    {pm.showsaveproject.call(this)}

                    {pm.showprojectid.call(this)}

                </div>
            </div>
        )

        } else {
            return(<div style={{...styles.generalContainer, ...styles.alignCenter}}>
                <span style={{...styles.generalFont,...regularFont}}>Please Login to View Team</span>
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
