import React, { Component } from 'react';
import './milestones.css';
import * as actions from './actions';
import { SaveAllProjects } from './actions/api';
import {
    MyMilestone,
    inputDateObjOutput,
    inputdatestringOutPutDateObj,
    inputdatestringOutputMonth,
    inputdatestringOutputDate,
    inputdatestringOutputYear,
    inputdateobjOutputYear,
    addoneMonthDateObj,
    addOneMonthtoDateString,
    subtractOneMonthtoDateString,
    subtractMonthDateObj,
    datestringDayUp,
    addincDateObj,
    datestringDayDown,
    subtractincDateObj,
    increasedatestringOneYear,
    addoneYearDateObj,
    decreasedatestringOneYear,
    subtractoneYearDateObj,
    inputDateObjDateStringNoOffset,
    MyUserModel,
    makeID,
    inputUTCStringForLaborID,
    inputUTCStringForMaterialID
}
    from './functions';
import { ClearMilestone, SaveProjectManagerIcon, MilestoneDateArrowUp, MilestoneDateArrowDown, deleteMilestoneIcon, editMilestoneIcon } from './svg';
import { connect } from 'react-redux';

class MyProjectMilestones extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: '',
            message: 'Press ClearID to Clear Milestone ID before entering new',
            milestone: '',
            activemilestoneid: "",
            start: new Date(),
            completion: new Date()
        }
    }

    handleSubmit(event) {
        console.log(event.target.name)
        let errmsg = this.geterrormessage();
        if (!errmsg) {
            let projectid = this.props.projectid.projectid
            let milestoneid = this.props.milestoneid.milestoneid;
            let milestone = this.props.milestone.milestone;
            let milestonestartdate = this.props.milestonestartdate.milestonestartdate;
            let milestoneenddate = this.props.milestoneenddate.milestoneenddate;
            let values = { milestoneid, projectid, milestone, milestonestartdate, milestoneenddate }
            console.log(values)
            this.insertmilestone(values)
        }
        else {
            this.setState({ message: errmsg })
        }
    }
    geterrormessage() {
        let message = "";
        if (this.props.milestone.hasOwnProperty("errmsg")) {
            message += this.props.milestone.errmsg;
        }
        if (!this.props.projectid.hasOwnProperty("projectid")) {
            message += " Project ID not found"
        }
        else if (!this.props.projectid.projectid) {
            message += " You need a project id to insert a milestone"
        }
        return message;
    }

    gettitlerow() {
        let myjsx = ""
        if (this.props.projects.hasOwnProperty("length")) {
            let projectid = this.props.projectid.projectid;
            // eslint-disable-next-line
            this.props.projects.map(myproject => {
                if (myproject.projectid === projectid) {
                    myjsx = `Project ID ${myproject.projectid}/${myproject.title}`
                }
            })
        }
        return myjsx
    }
    updateState() {
        this.setState({ render: 'render' })
    }
    getmessage() {
        if (this.props.milestoneid.hasOwnProperty("message")) {
            return this.props.milestoneid.message;
        }
    }

    updateremovemousedown(event) {
        console.log(event.target.name)
        let button = document.getElementById("btn-insertmilestoneid");
        button.classList.remove("active-button");
    }
    updateaddmousedown(event) {
        console.log(event.target.name)
        let button = document.getElementById("btn-insertmilestoneid");
        button.classList.add("active-button");
    }

    clearremovemousedown(event) {
        console.log(event.target.name)
        let button = document.getElementById("btn-clearmilestoneid");
        button.classList.remove("active-button");
    }
    clearaddmousedown(event) {
        console.log(event.target.name)
        let button = document.getElementById("btn-clearmilestoneid");
        button.classList.add("active-button");
    }
    getprojectitle() {
        let title = "";
        if (this.props.projects.hasOwnProperty("length")) {
            let projectid = this.props.projectid.projectid
            // eslint-disable-next-line
            this.props.projects.map(myproject => {
                if (myproject.projectid === projectid) {
                    title = `ProjectID ${myproject.projectid}/${myproject.title}`;
                }
            })
        }
        return title;
    }
    clearmilestoneid() {
        this.setState({ activemilestoneid: "", milestone: "", message: "MilestoneID is clear, Type a milestone to create" })
    }
    handleClearMilestone() {
        if (this.state.activemilestoneid) {
            return (<button className="milestone-button" onClick={event => { this.clearmilestoneid() }}>{ClearMilestone()} </button>)
        }
        else {
            return (<span>&nbsp; </span>)
        }
    }
    milestonemessage() {
        if (this.state.activemilestoneid) {
            return (`Update Active Milestone ID ${this.state.activemilestoneid}`)
        }
        else {
            return (`Type a Milestone to Begin`)
        }
    }
    getmilestonefield() {
        let milestone;
        if (this.state.activemilestoneid) {
            let milestoneid = this.state.activemilestoneid;
            let projectid = this.props.projectid.projectid;
            if (this.props.projects.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projects.map(myproject => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("projectmilestones")) {
                            // eslint-disable-next-line
                            myproject.projectmilestones.mymilestone.map(mymilestone => {
                                if (mymilestone.milestoneid === milestoneid) {
                                    milestone = mymilestone.milestone;
                                }
                            })
                        }
                    }
                })
            }

        }
        else {
            milestone = this.state.milestone;
        }
        return milestone;
    }
    handlemilestone(milestone) {
        if (this.state.activemilestoneid) {
            let milestoneid = this.state.activemilestoneid;
            let projectid = this.props.projectid.projectid;
            if (this.props.projects.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projects.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("projectmilestones")) {
                            // eslint-disable-next-line
                            myproject.projectmilestones.mymilestone.map((mymilestone, j) => {
                                if (mymilestone.milestoneid === milestoneid) {
                                    this.props.projects[i].projectmilestones.mymilestone[j].milestone = milestone
                                    let obj = this.props.projects;
                                    this.props.reduxProjects(obj)
                                    this.setState({ render: 'render' })

                                }
                            })
                        }
                    }
                })
            }

        }
        else {

            this.setState({ milestone })
            let milestoneid = makeID(6)
            let projectid = this.props.projectid.projectid;
            let start = inputDateObjDateStringNoOffset(this.state.start)
            let completion = inputDateObjDateStringNoOffset(this.state.completion)
            let mymilestone = MyMilestone(milestoneid, milestone, projectid, start, completion)
            if (this.props.projects.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projects.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("projectmilestones")) {
                            this.props.projects[i].projectmilestones.mymilestone.push(mymilestone)
                            this.setState({ activemilestoneid: milestoneid, message: `Active Milestone ID is ${milestoneid}` })
                        }
                        else {
                            let projectmilestones = { mymilestone: [mymilestone] }
                            this.props.projects[i].projectmilestones = projectmilestones;
                            let obj = this.props.projects;
                            this.props.reduxProjects(obj)
                            this.setState({ activemilestoneid: milestoneid, message: `Active Milestone ID is ${milestoneid}` })
                        }
                    }
                })
            }


        }

    }
    async handleSaveAllProjects() {
        let providerid = this.props.myusermodel.providerid;
        let projectid = this.props.projectid.projectid;
        let myproject = this.getproject();
        let myusermodel = this.props.myusermodel;
        let values = { projectid, providerid, myusermodel, myproject }
        let response = await SaveAllProjects(values)
        if (response.hasOwnProperty("providerid")) {
            let myusermodel = MyUserModel(response.providerid, response.firstname, response.lastname, response.company, response.occupation, response.jobtitle, response.laborrate, response.provideraddress, response.providercity, response.providerstate, response.providerzipcode, response.emailaddress, response.phone, response.profileurl)
            this.props.updateUserModel(myusermodel)
        }
        if (response.hasOwnProperty("projectsmanaging")) {
            this.props.reduxProjects(response.projectsmanaging.myproject)
        }
        if (response.hasOwnProperty("message")) {
            this.setState({ message: `${response.message} Last Updated  ${inputUTCStringForLaborID(response.dateupdated)}`, activemilestoneid: this.searchactivemilestoneid(response) })
        }

    }
    searchactivemilestoneid(response) {
        let activemilestoneid = this.state.activemilestoneid;
        let milestoneid = "";
        if (activemilestoneid) {
            let myproject = response.projectsmanaging.myproject[0];
            if (myproject.hasOwnProperty("projectmilestones")) {
                // eslint-disable-next-line
                myproject.projectmilestones.mymilestone.map(mymilestone => {
                    if (mymilestone.milestoneid === activemilestoneid) {
                        milestoneid = activemilestoneid;
                    }
                })
            }
        }
        return milestoneid;
    }
    getmilestoneids() {
        let milestoneids = [];
        if (this.props.projects.hasOwnProperty("length")) {
            let projectid = this.props.projectid.projectid;
            // eslint-disable-next-line
            this.props.projects.map(myproject => {
                if (myproject.projectid === projectid) {
                    if (myproject.hasOwnProperty("projectmilestones")) {
                        // eslint-disable-next-line
                        myproject.projectmilestones.mymilestone.map(mymilestone => {
                            milestoneids.push(this.showmilestone(mymilestone))
                        })
                    }

                }
            })
        }
        return milestoneids;
    }
    deletemilestone(milestoneid) {
        if (window.confirm(`Are you sure you want to delete MilestoneID ${milestoneid}?`)) {
            if (this.props.projects.hasOwnProperty("length")) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projects.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("projectmilestones")) {
                            // eslint-disable-next-line
                            myproject.projectmilestones.mymilestone.map((mymilestone, j) => {
                                if (mymilestone.milestoneid === milestoneid) {
                                    this.props.projects[i].projectmilestones.mymilestone.splice(j, 1);
                                    let obj = this.props.projects;
                                    this.props.reduxProjects(obj)
                                    this.setState({ message: `MilestoneID ${milestoneid} removed, Press Save All Projects to Save Changes. MilestoneID is clear. Type to Create one`, activemilestoneid: '' })
                                }
                            })
                        }
                    }
                })
            }
        }
    }
    findmilestone(milestoneid) {
        console.log(milestoneid)
        if (this.props.projects.hasOwnProperty("length")) {
            // eslint-disable-next-line
            this.props.projects.map(myproject => {
                let projectid = this.props.projectid.projectid;
                if (myproject.projectid === projectid) {
                    if (myproject.hasOwnProperty("projectmilestones")) {
                        // eslint-disable-next-line
                        myproject.projectmilestones.mymilestone.map(mymilestone => {
                            if (mymilestone.milestoneid === milestoneid) {
                                this.setState({ activemilestoneid: mymilestone.milestoneid, message: `Active MilestoneID is ${milestoneid}` })
                            }
                        })
                    }
                }
            })
        }
    }
    getactivemilestone(milestoneid) {
        if (this.state.activemilestoneid === milestoneid) {
            return (`activemilestoneid`)
        } else {
            return;
        }
    }
    showmilestone(mymilestone) {
        let milestone = [];
        milestone.push(<div className={`milestoneid-milestone ${this.getactivemilestone(mymilestone.milestoneid)}`}>MilestoneID: {mymilestone.milestoneid} Title: {mymilestone.milestone} <br />
            From {inputUTCStringForMaterialID(mymilestone.start)} to {inputUTCStringForMaterialID(mymilestone.completion)}</div>)
        milestone.push(<div className="milestoneid-date">  <button className="delete-milestone"
            onClick={event => { this.findmilestone(mymilestone.milestoneid) }}>
            {editMilestoneIcon()}</button></div>)
        milestone.push(<div className="milestoneid-date milestone-align-right">  <button className="delete-milestone"
            onClick={event => { this.deletemilestone(mymilestone.milestoneid) }}>
            {deleteMilestoneIcon()}</button></div>)
        return milestone;
    }

    showtimein() {
        return (<div className="labortime-container">

            <div className="labortime-label">Month </div>
            <div className="labortime-label">Day</div>
            <div className="labortime-label">Year </div>
            <div className="labortime-element">
                <input type="text" className="project-field time-field" value={this.gettimeinmonth()} />
            </div>
            <div className="labortime-element">
                <div className="timebutton-container"><button className="time-button" onClick={event => { this.timeinmonthup(event) }}>{MilestoneDateArrowUp()}</button></div>
                <div className="timebutton-container"><button className="time-button" onClick={event => { this.timeinmonthdown(event) }}> {MilestoneDateArrowDown()}</button></div>
            </div>
            <div className="labortime-element">
                <input type="text" className="project-field time-field" value={this.gettimeinday()} /></div>
            <div className="labortime-element">
                <div className="timebutton-container"><button className="time-button" onClick={event => { this.timeindayup(event) }}>{MilestoneDateArrowUp()}</button></div>
                <div className="timebutton-container"><button className="time-button" onClick={event => { this.timeindaydown(event) }}> {MilestoneDateArrowDown()}</button></div>
            </div>
            <div className="labortime-element"> <input type="text" className="project-field time-field" value={this.gettimeinyear()} /></div>
            <div className="labortime-element">
                <div className="timebutton-container"><button className="time-button" onClick={event => { this.timeinyearup(event) }}>{MilestoneDateArrowUp()}</button></div>
                <div className="timebutton-container"><button className="time-button" onClick={event => { this.timeinyeardown(event) }}> {MilestoneDateArrowDown()}</button></div>
            </div>

        </div>)
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
    getmilestone(milestoneid) {
        let milestone = {};
        if (this.props.projects.hasOwnProperty("length")) {
            let myproject = this.getproject();
            if (myproject.hasOwnProperty("projectmilestones")) {
                // eslint-disable-next-line
                myproject.projectmilestones.mymilestone.map(mymilestone => {

                    if (mymilestone.milestoneid === milestoneid) {
                        milestone = mymilestone;
                    }
                })
            }

        }
        return milestone;
    }
    gettimein() {
        let start = "";
        if (this.state.activemilestoneid) {
            let milestoneid = this.state.activemilestoneid;
            let mymilestone = this.getmilestone(milestoneid);
            start = mymilestone.start;

        }
        else {
            start = inputDateObjOutput(this.state.start);
        }

        return start;
    }
    gettimeinday() {
        let day = "";
        if (this.state.activemilestoneid) {
            let milestoneid = this.state.activemilestoneid;
            let mymilestone = this.getmilestone(milestoneid);
            day = inputdatestringOutputDate(mymilestone.start);

        }
        else {
            day = this.state.start.getDate()
        }
        return day;
    }
    handletimein(value) {
        if (this.state.activemilestoneid) {
            let milestoneid = this.state.activemilestoneid;
            if (this.props.projects.hasOwnProperty("length")) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projects.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("projectmilestones")) {
                            // eslint-disable-next-line
                            myproject.projectmilestones.mymilestone.map((mymilestone, j) => {
                                if (mymilestone.milestoneid === milestoneid) {
                                    this.props.projects[i].projectmilestones.mymilestone[j].start = value;
                                    let obj = this.props.projects;
                                    this.props.reduxProjects(obj)
                                    this.setState({ render: 'render' })
                                }
                            })
                        }
                    }
                })
            }
        }
        else {
            let start = inputdatestringOutPutDateObj(value);
            this.setState({ start })
        }
    }
    gettimeinmonth() {
        let month = "";
        if (this.state.activemilestoneid) {
            let milestoneid = this.state.activemilestoneid;
            let mymilestone = this.getmilestone(milestoneid);
            month = inputdatestringOutputMonth(mymilestone.start);

        }
        else {
            month = this.state.start.getMonth() + 1;
        }
        return month;

    }
    timeinmonthup(event) {
        if (this.state.activemilestoneid) {
            let milestoneid = this.state.activemilestoneid;
            if (this.props.projects) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projects.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("projectmilestones")) {
                            // eslint-disable-next-line
                            myproject.projectmilestones.mymilestone.map((mymilestone, j) => {
                                if (mymilestone.milestoneid === milestoneid) {
                                    let start = addOneMonthtoDateString(mymilestone.start)
                                    this.props.projects[i].projectmilestones.mymilestone[j].start = start;
                                    let obj = this.props.projects;
                                    this.props.reduxProjects(obj)
                                    this.setState({ render: 'render' })
                                }


                            })

                        }
                    }

                })
            }
        }
        else {
            let newDate = addoneMonthDateObj(this.state.start);
            console.log(newDate)
            this.setState({ start: newDate })
        }
    }
    timeinmonthdown() {
        if (this.state.activemilestoneid) {
            let milestoneid = this.state.activemilestoneid;
            if (this.props.projects) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projects.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("projectmilestones")) {
                            // eslint-disable-next-line
                            myproject.projectmilestones.mymilestone.map((mymilestone, j) => {
                                if (mymilestone.milestoneid === milestoneid) {
                                    let start = subtractOneMonthtoDateString(mymilestone.start)
                                    this.props.projects[i].projectmilestones.mymilestone[j].start = start;
                                    let obj = this.props.projects;
                                    this.props.reduxProjects(obj)
                                    this.setState({ render: 'render' })
                                }


                            })

                        }
                    }

                })
            }
        }
        else {
            let newDate = subtractMonthDateObj(this.state.start);

            this.setState({ start: newDate })
        }

    }
    timeindayup(event) {
        if (this.state.activemilestoneid) {
            let milestoneid = this.state.activemilestoneid;
            if (this.props.projects) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projects.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("projectmilestones")) {
                            // eslint-disable-next-line
                            myproject.projectmilestones.mymilestone.map((mymilestone, j) => {
                                if (mymilestone.milestoneid === milestoneid) {
                                    let start = datestringDayUp(mymilestone.start)
                                    console.log(start)
                                    this.props.projects[i].projectmilestones.mymilestone[j].start = start;
                                    let obj = this.props.projects;
                                    this.props.reduxProjects(obj)
                                    this.setState({ render: 'render' })
                                }


                            })

                        }
                    }

                })
            }
        }
        else {
            let inc = (1000 * 60 * 60 * 24)
            let newDate = addincDateObj(this.state.start, inc)
            this.setState({ start: newDate })
        }

    }
    timeindaydown() {
        if (this.state.activemilestoneid) {
            let milestoneid = this.state.activemilestoneid;
            if (this.props.projects) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projects.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("projectmilestones")) {
                            // eslint-disable-next-line
                            myproject.projectmilestones.mymilestone.map((mymilestone, j) => {
                                if (mymilestone.milestoneid === milestoneid) {
                                    let start = datestringDayDown(mymilestone.start)
                                    console.log(start)
                                    this.props.projects[i].projectmilestones.mymilestone[j].start = start;
                                    let obj = this.props.projects;
                                    this.props.reduxProjects(obj)
                                    this.setState({ render: 'render' })
                                }


                            })

                        }
                    }

                })
            }
        }
        else {
            let inc = (1000 * 60 * 60 * 24)
            let newDate = subtractincDateObj(this.state.start, inc)
            this.setState({ start: newDate })
        }


    }
    gettimeinyear() {
        let year = "";
        if (this.state.activemilestoneid) {
            let milestoneid = this.state.activemilestoneid;
            let mymilestone = this.getmilestone(milestoneid);
            year = inputdatestringOutputYear(mymilestone.start);

        }
        else {
            year = inputdateobjOutputYear(this.state.start)
        }
        return year;

    }
    timeinyearup(event) {
        if (this.state.activemilestoneid) {
            let milestoneid = this.state.activemilestoneid;
            if (this.props.projects) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projects.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("projectmilestones")) {
                            // eslint-disable-next-line
                            myproject.projectmilestones.mymilestone.map((mymilestone, j) => {
                                if (mymilestone.milestoneid === milestoneid) {
                                    let start = increasedatestringOneYear(mymilestone.start)
                                    this.props.projects[i].projectmilestones.mymilestone[j].start = start;
                                    let obj = this.props.projects;
                                    this.props.reduxProjects(obj)
                                    this.setState({ render: 'render' })
                                }


                            })

                        }
                    }

                })
            }
        }
        else {
            let newDate = addoneYearDateObj(this.state.start);
            this.setState({ start: newDate })
        }


    }
    timeinyeardown() {
        if (this.state.activemilestoneid) {
            let milestoneid = this.state.activemilestoneid;
            if (this.props.projects) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projects.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("projectmilestones")) {
                            // eslint-disable-next-line
                            myproject.projectmilestones.mymilestone.map((mymilestone, j) => {
                                if (mymilestone.milestoneid === milestoneid) {
                                    let start = decreasedatestringOneYear(mymilestone.start)
                                    this.props.projects[i].projectmilestones.mymilestone[j].start = start;
                                    let obj = this.props.projects;
                                    this.props.reduxProjects(obj)
                                    this.setState({ render: 'render' })
                                }


                            })

                        }
                    }

                })
            }
        }
        else {
            let newDate = subtractoneYearDateObj(this.state.start);
            this.setState({ start: newDate })
        }
    }
    showtimeout() {
        return (<div className="labortime-container">

            <div className="labortime-label">Mon </div>
            <div className="labortime-label">Day </div>
            <div className="labortime-label">Year </div>
            <div className="labortime-element">
                <input type="text" className="project-field time-field" value={this.gettimeoutmonth()} />
            </div>
            <div className="labortime-element">
                <div className="timebutton-container"><button className="time-button" onClick={event => { this.timeoutmonthup(event) }}>{MilestoneDateArrowUp()}</button></div>
                <div className="timebutton-container"><button className="time-button" onClick={event => { this.timeoutmonthdown(event) }}> {MilestoneDateArrowDown()}</button></div>
            </div>
            <div className="labortime-element">
                <input type="text" className="project-field time-field" value={this.gettimeoutday()} /></div>
            <div className="labortime-element">
                <div className="timebutton-container"><button className="time-button" onClick={event => { this.timeoutdayup(event) }}>{MilestoneDateArrowUp()}</button></div>
                <div className="timebutton-container"><button className="time-button" onClick={event => { this.timeoutdaydown(event, (1000 * 60 * 60 * 24)) }}> {MilestoneDateArrowDown()}</button></div>
            </div>
            <div className="labortime-element"> <input type="text" className="project-field time-field" value={this.gettimeoutyear()} /></div>

            <div className="labortime-element">
                <div className="timebutton-container"><button className="time-button" onClick={event => { this.timeoutyearup(event) }}>{MilestoneDateArrowUp()}</button></div>
                <div className="timebutton-container"><button className="time-button" onClick={event => { this.timeoutyeardown(event) }}> {MilestoneDateArrowDown()}</button></div>
            </div>
        </div>)
    }
    gettimeout() {
        let completion = "";
        if (this.state.activemilestoneid) {
            let milestoneid = this.state.activemilestoneid;
            let mymilestone = this.getmilestone(milestoneid);
            completion = mymilestone.completion;

        }
        else {
            completion = inputDateObjOutput(this.state.completion);
        }

        return completion;
    }
    gettimeoutday() {
        let day = "";
        if (this.state.activemilestoneid) {
            let milestoneid = this.state.activemilestoneid;
            let mymilestone = this.getmilestone(milestoneid);
            day = inputdatestringOutputDate(mymilestone.completion);

        }
        else {
            day = this.state.completion.getDate()
        }
        return day;

    }
    handletimeout(value) {
        if (this.state.activemilestoneid) {
            let milestoneid = this.state.activemilestoneid;
            if (this.props.projects.hasOwnProperty("length")) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projects.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("projectmilestones")) {
                            // eslint-disable-next-line
                            myproject.projectmilestones.mymilestone.map((mymilestone, j) => {
                                if (mymilestone.milestoneid === milestoneid) {
                                    this.props.projects[i].projectmilestones.mymilestone[j].completion = value;
                                    let obj = this.props.projects;
                                    this.props.reduxProjects(obj)
                                    this.setState({ render: 'render' })
                                }
                            })
                        }
                    }
                })
            }
        }
        else {
            let completion = inputdatestringOutPutDateObj(value);
            this.setState({ completion })
        }
    }
    gettimeoutmonth() {
        let month = "";
        if (this.state.activemilestoneid) {
            let milestoneid = this.state.activemilestoneid;
            let mymilestone = this.getmilestone(milestoneid);
            month = inputdatestringOutputMonth(mymilestone.completion);

        }
        else {
            month = this.state.completion.getMonth() + 1;
        }
        return month;
    }
    timeoutmonthup() {
        if (this.state.activemilestoneid) {
            let milestoneid = this.state.activemilestoneid;
            if (this.props.projects) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projects.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("projectmilestones")) {
                            // eslint-disable-next-line
                            myproject.projectmilestones.mymilestone.map((mymilestone, j) => {
                                if (mymilestone.milestoneid === milestoneid) {
                                    let completion = addOneMonthtoDateString(mymilestone.completion)
                                    this.props.projects[i].projectmilestones.mymilestone[j].completion = completion;
                                    let obj = this.props.projects;
                                    this.props.reduxProjects(obj)
                                    this.setState({ render: 'render' })
                                }


                            })

                        }
                    }

                })
            }
        }
        else {
            let newDate = addoneMonthDateObj(this.state.completion);
            console.log(newDate)
            this.setState({ completion: newDate })
        }
    }
    timeoutmonthdown() {
        if (this.state.activemilestoneid) {
            let milestoneid = this.state.activemilestoneid;
            if (this.props.projects) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projects.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("projectmilestones")) {
                            // eslint-disable-next-line
                            myproject.projectmilestones.mymilestone.map((mymilestone, j) => {
                                if (mymilestone.milestoneid === milestoneid) {
                                    let completion = subtractOneMonthtoDateString(mymilestone.completion)
                                    this.props.projects[i].projectmilestones.mymilestone[j].completion = completion;
                                    let obj = this.props.projects;
                                    this.props.reduxProjects(obj)
                                    this.setState({ render: 'render' })
                                }


                            })

                        }
                    }

                })
            }
        }
        else {
            let newDate = subtractMonthDateObj(this.state.completion);
            this.setState({ completion: newDate })
        }

    }
    timeoutdayup() {
        if (this.state.activemilestoneid) {
            let milestoneid = this.state.activemilestoneid;
            if (this.props.projects) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projects.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("projectmilestones")) {
                            // eslint-disable-next-line
                            myproject.projectmilestones.mymilestone.map((mymilestone, j) => {
                                if (mymilestone.milestoneid === milestoneid) {
                                    let completion = datestringDayUp(mymilestone.completion)
                                    this.props.projects[i].projectmilestones.mymilestone[j].completion = completion
                                    let obj = this.props.projects;
                                    this.props.reduxProjects(obj)
                                    this.setState({ render: 'render' })
                                }


                            })

                        }
                    }

                })
            }
        }
        else {
            let inc = (1000 * 60 * 60 * 24)
            let newDate = addincDateObj(this.state.completion, inc)
            this.setState({ completion: newDate })
        }

    }
    timeoutdaydown() {
        if (this.state.activemilestoneid) {
            let milestoneid = this.state.activemilestoneid;
            if (this.props.projects) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projects.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("projectmilestones")) {
                            // eslint-disable-next-line
                            myproject.projectmilestones.mymilestone.map((mymilestone, j) => {
                                if (mymilestone.milestoneid === milestoneid) {
                                    let completion = datestringDayDown(mymilestone.completion)
                                    this.props.projects[i].projectmilestones.mymilestone[j].completion = completion
                                    let obj = this.props.projects;
                                    this.props.reduxProjects(obj)
                                    this.setState({ render: 'render' })
                                }


                            })

                        }
                    }

                })
            }
        }
        else {
            let inc = (1000 * 60 * 60 * 24)
            let newDate = subtractincDateObj(this.state.completion, inc)
            this.setState({ completion: newDate })
        }

    }
    gettimeoutyear() {
        let year = "";
        if (this.state.activemilestoneid) {
            let milestoneid = this.state.activemilestoneid;
            let mymilestone = this.getmilestone(milestoneid);
            year = inputdatestringOutputYear(mymilestone.completion);

        }
        else {
            year = inputdateobjOutputYear(this.state.completion)
        }
        return year;
    }
    timeoutyearup() {
        if (this.state.activemilestoneid) {
            let milestoneid = this.state.activemilestoneid;
            if (this.props.projects) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projects.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("projectmilestones")) {
                            // eslint-disable-next-line
                            myproject.projectmilestones.mymilestone.map((mymilestone, j) => {
                                if (mymilestone.milestoneid === milestoneid) {
                                    let completion = increasedatestringOneYear(mymilestone.completion)
                                    this.props.projects[i].projectmilestones.mymilestone[j].completion = completion;
                                    let obj = this.props.projects;
                                    this.props.reduxProjects(obj)
                                    this.setState({ render: 'render' })
                                }


                            })

                        }
                    }

                })
            }
        }
        else {
            let newDate = addoneYearDateObj(this.state.completion);
            this.setState({ completion: newDate })
        }
    }
    timeoutyeardown() {
        if (this.state.activemilestoneid) {
            let milestoneid = this.state.activemilestoneid;
            if (this.props.projects) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projects.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("projectmilestones")) {
                            // eslint-disable-next-line
                            myproject.projectmilestones.mymilestone.map((mymilestone, j) => {
                                if (mymilestone.milestoneid === milestoneid) {
                                    let completion = decreasedatestringOneYear(mymilestone.completion)
                                    this.props.projects[i].projectmilestones.mymilestone[j].completion = completion;
                                    let obj = this.props.projects;
                                    this.props.reduxProjects(obj)
                                    this.setState({ render: 'render' })
                                }


                            })

                        }
                    }

                })
            }
        }
        else {
            let newDate = subtractoneYearDateObj(this.state.completion);
            this.setState({ completion: newDate })
        }

    }
    render() {
        return (

            <div className="mymilestone-container">
                <div className="milestone-titlerow">{this.getprojectitle()} <br />Project Milestones</div>
                <div className="milestone-element-1 titlerow">{this.handleClearMilestone()}</div>
                <div className="milestone-element-1"> {this.milestonemessage()}</div>
                <div className="milestone-element-2a"> What is the Milestone Called?</div>
                <div className="milestone-element-2b"> <input type="text" className="project-field" value={this.getmilestonefield()} onChange={event => { this.handlemilestone(event.target.value) }} /></div>
                <div className="milestone-element-1"> Enter and Start and End Date for the Milestone</div>
                <div className="milestone-element-3"> {this.showtimein()}</div>
                <div className="milestone-element-3"> {this.showtimeout()}</div>
                <div className="milestone-element-1 titlerow">{this.state.message} </div>
                <div className="milestone-element-1 titlerow"> <button className="project-button" onClick={event => { this.handleSaveAllProjects(event) }}>{SaveProjectManagerIcon()} </button> </div>
                {this.getmilestoneids()}
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        projectid: state.projectid,
        projects: state.projects,
        projectsprovider: state.projectsprovider,
        milestoneid: state.milestoneid,
        milestone: state.milestone,
        milestonestartdate: state.milestonestartdate,
        milestoneenddate: state.milestoneenddate
    }
}
export default connect(mapStateToProps, actions)(MyProjectMilestones)
