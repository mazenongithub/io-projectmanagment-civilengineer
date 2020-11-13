import React, { Component } from 'react';
import * as actions from './actions';
import { connect } from 'react-redux';
import StartDate from './start';
import CompletionDate from './completion'
import { MyStylesheet } from './styles';
import { MyMilestone, milestoneformatdatestring, returnCompanyList } from './functions';
import PM from './pm';
import MakeID from './makeids'
import CriticalPath from './criticalpath'
import { removeIconSmall } from './svg';
import { LoadAllUsers } from './actions/api';
import {Link} from 'react-router-dom';


class Milestones extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: '',
            message: '',
            milestone: '',
            activemilestoneid: "",
            width: '',
            height: '',
            startcalender: true,
            completioncalender: true,
            startdateday: '',
            startdatemonth: '',
            startdateyear: '',
            completiondateday: '',
            completiondatemonth: '',
            completiondateyear: ''

        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    componentDidMount() {
        this.updateWindowDimensions();
        this.props.reduxProject({ projectid: this.props.match.params.projectid })
        this.props.reduxNavigation({ navigation: "milestones" })
        window.addEventListener('resize', this.updateWindowDimensions);
        this.reset()



    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });

    }
    reset() {
        this.startdatedefault();
        this.completiondatedefault();
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

    completiondatedefault() {
        const completiondatemonth = () => {
            let month = new Date().getMonth() + 1;
            if (month < 10) {
                month = `0${month}`
            }
            return month;
        }
        const completiondateday = () => {
            let day = new Date().getDate();
            if (day < 10) {
                day = `0${day}`
            }
            return day;
        }
        const completiondateyear = () => {
            let year = new Date().getFullYear();

            return year;
        }
        this.setState({ completiondateyear: completiondateyear(), completiondatemonth: completiondatemonth(), completiondateday: completiondateday() })
    }

    startdatedefault() {
        const startdatemonth = () => {
            let month = new Date().getMonth() + 1;
            if (month < 10) {
                month = `0${month}`
            }
            return month;
        }
        const startdateday = () => {
            let day = new Date().getDate();
            if (day < 10) {
                day = `0${day}`
            }
            return day;
        }
        const startdateyear = () => {
            let year = new Date().getFullYear();

            return year;
        }
        this.setState({ startdateyear: startdateyear(), startdatemonth: startdatemonth(), startdateday: startdateday() })
    }

    getactivemilestonekey() {
        let key = false;
        if (this.state.activemilestoneid) {
            let milestoneid = this.state.activemilestoneid;
            const pm = new PM();
            const myproject = pm.getprojectbytitle.call(this, this.props.match.params.projectid)
            if (myproject.hasOwnProperty("projectmilestones")) {
                // eslint-disable-next-line
                myproject.projectmilestones.mymilestone.map((mymilestone, i) => {
                    if (mymilestone.milestoneid === milestoneid) {
                        key = i;
                    }

                })
            }
        }
        return key;
    }
    getactivemilestone() {
        let milestone = false;
        if (this.state.activemilestoneid) {
            let milestoneid = this.state.activemilestoneid;
            const pm = new PM();
            const myproject = pm.getprojectbytitle.call(this, this.props.match.params.projectid)
            if (myproject.hasOwnProperty("projectmilestones")) {
                // eslint-disable-next-line
                myproject.projectmilestones.mymilestone.map((mymilestone) => {
                    if (mymilestone.milestoneid === milestoneid) {
                        milestone = mymilestone;
                    }

                })
            }
        }
        return milestone;

    }

    handlemilestone(milestone) {
        let pm = new PM();
        const makeID = new MakeID();
        let myuser = pm.getuser.call(this);
        if (myuser) {
            let myproject = pm.getproject.call(this)
            let i = pm.getprojectkeytitle.call(this, this.props.match.params.projectid)
            if (this.state.activemilestoneid) {

                let j = this.getactivemilestonekey();
                myuser.projects.myproject[i].projectmilestones.mymilestone[j].milestone = milestone;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })

            } else {
                let milestoneid = makeID.milestoneid.call(this)
                const startyear = this.state.startdateyear;
                const startday = this.state.startdateday;
                const startmonth = this.state.startdatemonth;
                const start = `${startyear}-${startmonth}-${startday}`
                const completionyear = this.state.completiondateyear;
                const completionday = this.state.completiondateday;
                const completionmonth = this.state.completiondatemonth;
                const completion = `${completionyear}-${completionmonth}-${completionday}`
                let mymilestone = MyMilestone(milestoneid, milestone, start, completion)

                if (myproject.hasOwnProperty("projectmilestones")) {
                    myuser.projects.myproject[i].projectmilestones.mymilestone.push(mymilestone);

                } else {
                    let projectmilestones = { mymilestone: [mymilestone] }
                    myuser.projects.myproject[i].projectmilestones = projectmilestones;
                }
                this.props.reduxUser(myuser);
                this.setState({ activemilestoneid: milestoneid, milestone: '' })

            }

        }

    }
    getmilestone() {

        let milestone = "";
        if (this.state.activemilestoneid) {

            const mymilestone = this.getactivemilestone();
            milestone = mymilestone.milestone;

        }
        return milestone;
    }
    handleTimes() {
        // const pm = new PM();
        const start = new StartDate();
        const completion = new CompletionDate();
        const styles = MyStylesheet();
        if (this.state.width > 1200) {
            return (
                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1 }}>
                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...styles.addMargin }}>
                                {start.showstartdate.call(this)}
                            </div>
                            <div style={{ ...styles.flex1, ...styles.addMargin }}>
                                {completion.showcompletiondate.call(this)}
                            </div>
                        </div>
                    </div>
                </div>)

        } else {
            return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1 }}>
                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>
                            {start.showstartdate.call(this)}
                        </div>
                    </div>
                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1 }}>
                            {completion.showcompletiondate.call(this)}
                        </div>
                    </div>
                </div>
            </div>)

        }

    }
    loadmilestoneids() {
        const pm = new PM();
        const myproject = pm.getprojectbytitle.call(this, this.props.match.params.projectid);
        let ids = [];
        if (myproject) {

            if (myproject.hasOwnProperty("projectmilestones")) {
                // eslint-disable-next-line
                myproject.projectmilestones.mymilestone.map(mymilestone => {
                    ids.push(this.showmilestone(mymilestone))
                })

            }

        }
        return ids;
    }
    makemilestoneactive(milestoneid) {
        const pm = new PM();
        if (this.state.activemilestoneid === milestoneid) {
            this.setState({ activemilestoneid: false })
            this.reset();
        } else {
            const milestone = pm.getmilestonebyid.call(this, milestoneid)
            let startdateyear = "";
            let startdatemonth = "";
            let startdateday = "";
            let completiondateyear = "";
            let completiondatemonth = "";
            let completiondateday = "";
            if (milestone) {
                startdateyear = milestone.start.substring(0, 4)
                startdatemonth = milestone.start.substring(5, 7);
                startdateday = milestone.start.substring(8, 10);
                completiondateyear = milestone.completion.substring(0, 4)
                completiondatemonth = milestone.completion.substring(5, 7);
                completiondateday = milestone.completion.substring(8, 10);
            }
            this.setState({ activemilestoneid: milestoneid, startdateday, startdatemonth, startdateyear, completiondateday, completiondateyear, completiondatemonth })
        }
    }
    removemilestone(milestone) {
        const pm = new PM();
        const myuser = pm.getuser.call(this);
        if (myuser) {

            if (window.confirm(`Are you sure you want to delete milestone ${milestone.milestone}?`)) {
                const project = pm.getprojectbytitle.call(this, this.props.match.params.projectid)
                if (project) {
                    const i = pm.getprojectkeytitle.call(this, this.props.match.params.projectid)
                    const checkmilestone = pm.getmilestonebyid.call(this, milestone.milestoneid)
                    if (checkmilestone) {

                        const j = pm.getmilestonekeybyid.call(this, milestone.milestoneid);
                        myuser.projects.myproject[i].projectmilestones.mymilestone.splice(j, 1);
                        // eslint-disable-next-line
                        myuser.projects.myproject[i].projectmilestones.mymilestone.map(mymilestone=> {
                           
                            if(mymilestone.hasOwnProperty("predessors")) {
                                
                                // eslint-disable-next-line
                                mymilestone.predessors.map(predessor=> {
                                    if(predessor.predessor === milestone.milestoneid) {
                                        const k = pm.getmilestonekeybyid.call(this, mymilestone.milestoneid);
                                        const l = pm.getpredessorkeybyid.call(this, mymilestone, predessor.predessor);
                                        myuser.projects.myproject[i].projectmilestones.mymilestone[k].predessors.splice(l,1)
                                    }
                                })
                            }
                        })
                        
                        this.props.reduxUser(myuser)
                        this.setState({ activemilestoneid: false })

                    }

                }

            }
        }

    }
    showmilestone(mymilestone) {
        const styles = MyStylesheet();
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this);
        const removeIcon = pm.getremoveicon.call(this)
        const activebackground = (milestoneid) => {
            if (milestoneid === this.state.activemilestoneid) {
                return ({ backgroundColor: '#89F786' })
            } else {
                return;
            }
        }
        return (
            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15, ...activebackground(mymilestone.milestoneid) }} key={mymilestone.milestoneid}>
                <div style={{ ...styles.flex5, ...styles.generalFont, ...regularFont }} onClick={() => { this.makemilestoneactive(mymilestone.milestoneid) }}>
                    {mymilestone.milestone} From {milestoneformatdatestring(mymilestone.start)} to {milestoneformatdatestring(mymilestone.completion)}


                </div>
                <div style={{ ...styles.flex1 }}>
                    <button style={{ ...styles.generalButton, ...removeIcon, ...styles.alignRight }} onClick={() => { this.removemilestone(mymilestone) }}>{removeIconSmall()}</button>
                </div>
            </div>
        )
    }

    render() {
        const pm = new PM();
        const styles = MyStylesheet();
        const regularFont = pm.getRegularFont.call(this);
        const headerFont = pm.getHeaderFont.call(this);
      
        const criticalpath = new CriticalPath();
        const myuser = pm.getuser.call(this)
        if (myuser) {
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
                                <Link style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.boldFont }} to={`/${myuser.profile}/myprojects/${project.title}/milestones`}>  /milestones </Link>
                            </div>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                Milestone
                            <input type="text" style={{ ...regularFont, ...styles.generalFont, ...styles.generalField }}
                                    value={this.getmilestone()}
                                    onChange={event => { this.handlemilestone(event.target.value) }} />
                            </div>
                        </div>

                        {this.handleTimes()}

                        {pm.showsaveproject.call(this)}

                        {this.loadmilestoneids()}

                        {criticalpath.showpath.call(this)}

                        {pm.showprojectid.call(this)}


                    </div>
                </div>

            )

            } else {
                return (<div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                    <span style={{ ...styles.generalFont, ...regularFont }}>Project Not Found </span>
                </div>)

            }

        } else {
            return (<div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                <span style={{ ...styles.generalFont, ...regularFont }}>Please Login to View Milestones</span>
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
    }
}

export default connect(mapStateToProps, actions)(Milestones)