import React, { Component } from 'react';
import * as actions from './actions';
import { connect } from 'react-redux';
import Start from './start';
import Completion from './completion'
import { MyStylesheet } from './styles';
import { makeID, makeDatefromObj, MyMilestone, milestoneformatdatestring } from './functions';
import PM from './pm';
import { removeIconSmall } from './svg';

class Milestones extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: '',
            message: '',
            milestone: '',
            activemilestoneid: "",
            datein: new Date(),
            completion: new Date(),
            showtimein: false,
            width: '',
            height: '',
            startcalender: 'open',
            completioncalender: 'open'
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        this.props.reduxNavigation({ navigation: "milestones" })
        this.props.reduxProject({ projectid: this.props.match.params.projectid })

    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });

    }

    getactivemilestonekey() {
        let key = false;
        if (this.state.activemilestoneid) {
            let milestoneid = this.state.activemilestoneid;
            const pm = new PM();
            const myproject = pm.getproject.call(this)
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
            const myproject = pm.getproject.call(this)
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
        let myuser = pm.getuser.call(this);
        if (myuser) {
            let myproject = pm.getproject.call(this)
            let i = pm.getprojectkey.call(this);
            if (this.state.activemilestoneid) {

                let j = this.getactivemilestonekey();
                myuser.projects.myproject[i].projectmilestones.mymilestone[j].milestone = milestone;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })

            } else {
                let milestoneid = makeID(16)
                let start = makeDatefromObj(this.state.datein);
                let completion = makeDatefromObj(this.state.completion);
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
        const start = new Start();
        const completion = new Completion();
        const styles = MyStylesheet();
        if (this.state.width > 1200) {
            return (
                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1 }}>
                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1 }}>
                                {start.showdatein.call(this)}
                            </div>
                            <div style={{ ...styles.flex1 }}>
                                {completion.showdatein.call(this)}
                            </div>
                        </div>
                    </div>
                </div>)

        } else {
            return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1 }}>
                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>
                            {start.showdatein.call(this)}
                        </div>
                    </div>
                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1 }}>
                            {completion.showdatein.call(this)}
                        </div>
                    </div>
                </div>
            </div>)

        }

    }
    loadmilestoneids() {
        const pm = new PM();
        const myproject = pm.getproject.call(this);
        let ids = [];
        if (myproject) {
            // eslint-disable-next-line
            myproject.projectmilestones.mymilestone.map(mymilestone => {
                ids.push(this.showmilestone(mymilestone))
            })
        }
        return ids;
    }
    makemilestoneactive(milestoneid) {
        if (this.state.activemilestoneid === milestoneid) {
            this.setState({ activemilestoneid: false })
        } else {
            this.setState({ activemilestoneid: milestoneid })
        }
    }
    removemilestone(milestone) {
        const pm = new PM();
        const myuser = pm.getuser.call(this);
        if (myuser) {

            if (window.confirm(`Are you sure you want to delete milestone ${milestone.milestone}?`)) {
                const i = pm.getactiveprojectkey.call(this);
                const j = pm.getmilestonekeybyid.call(this, milestone.milestoneid);
                myuser.projects.myproject[i].projectmilestones.mymilestone.splice(j, 1);
                this.props.reduxUser(myuser)
                this.setState({ activemilestoneid: false })

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
        const myproject = pm.getproject.call(this)
        return (
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.generalFont, ...headerFont }}>
                            /{myproject.projectid} <br />
                            Project Milestones
                        </div>
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

                    {pm.showprojectid.call(this)}


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
    }
}

export default connect(mapStateToProps, actions)(Milestones)