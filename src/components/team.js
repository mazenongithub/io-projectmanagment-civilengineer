import React, { Component } from 'react';
import './projectteam.css';
import * as actions from './actions';
import { connect } from 'react-redux';
//import { Link } from 'react-router-dom';
import { MyStylesheet } from './styles';
import PM from './pm';
//import { Link } from 'react-router-dom';
import { TeamMember } from './functions';

class Team extends Component {

    constructor(props) {
        super(props);
        this.state = {
            render: '',
            width: 0,
            height: 0,
            activeprovider: '',
            search: '',
            message: '',
            role: ''
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
    addteam(providerid) {
        console.log(providerid)
        const pm = new PM();
        const myuser = pm.getuser.call(this)
        if (myuser) {
            let validate = this.validateprovider(providerid);
            if (validate) {
                const myteam = pm.getprojectteam.call(this);
                const role = this.state.role;
                let newteam = TeamMember(providerid, role)
                const i = pm.getprojectkey.call(this);
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
    showsearchid(myuser) {
        const pm = new PM();
        const styles = MyStylesheet();
        const regularFont = pm.getRegularFont.call(this)
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
                            &nbsp;
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
                            &nbsp;
                        </div>

                    </div>
                    <div style={{ ...styles.flex3, ...styles.generalFont, ...regularFont }}>
                        {myuser.firstname} {myuser.lastname}{location()}
                    </div>
                </div>
            )
        }

    }
    showteamids() {
        const pm = new PM();
        const myproject = pm.getproject.call(this);

        let myproviders = [];
        if (myproject.hasOwnProperty("projectteam")) {
            // eslint-disable-next-line
            myproject.projectteam.myteam.map(myteam => {
                console.log(myteam)
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
            const myproject = pm.getproject.call(this);

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
            const myproject = pm.getproject.call(this);
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
                const i = pm.getprojectkey.call(this)
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
    showprovider(myuser) {

        const styles = MyStylesheet();
        const pm = new PM();
        let regularFont = pm.getRegularFont.call(this);
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
        const teamProfile = pm.getteamprofile.call(this)
        return (<div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.showBorder }}>
            <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                {myuser.firstname} {myuser.lastname}
            </div>
            <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                {company()} {location()}
            </div>
            <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                <div style={{ ...styles.showBorder, ...teamProfile, ...styles.marginAuto }} onClick={() => { this.makeprovideractive(myuser.providerid) }}>

                </div>
            </div>

            {Role()}


        </div>)
    }
    projectteamtitle() {
        const pm = new PM();
        const myproject = pm.getproject.call(this);
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
        const getColumns = pm.getcolumns.call(this)

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
                        <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont }}>
                            Search By Name <br />
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


                </div>
            </div>
        )

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
