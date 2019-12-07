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
    milestoneformatdatestring,
    makeDatefromObj,
    makeDatefromTimein,
    displaydateformilestone,
    check_31,
    check_30,
    check_29_feb_leapyear,
    getFirstIsOn,
    getOffset,
    trailingzero,
    inputDateObjandSecReturnObj,
    inputDateSecDateStringOutputString,
    inputtimeDBoutputCalendarDaySeconds,
    inputDateObjOutputCalendarDaySeconds

}
    from './functions';
import { removeIcon, closeDateMenu, openDateMenu, SaveProjectManagerIcon, ClearMilestone, MilestoneDateArrowUp, MilestoneDateArrowDown, dateYearDown, dateMonthDown, dateYearUp, dateMonthUp } from './svg';
import { connect } from 'react-redux';

class MyProjectMilestones extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: '',
            message: '',
            milestone: '',
            activemilestoneid: "",
            start: new Date(),
            completion: new Date(),
            showtimein: false,
            width: '',
            height: ''
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

    handleSubmit(event) {

        let errmsg = this.geterrormessage();
        if (!errmsg) {
            let projectid = this.props.projectid.projectid
            let milestoneid = this.props.milestoneid.milestoneid;
            let milestone = this.props.milestone.milestone;
            let milestonestartdate = this.props.milestonestartdate.milestonestartdate;
            let milestoneenddate = this.props.milestoneenddate.milestoneenddate;
            let values = { milestoneid, projectid, milestone, milestonestartdate, milestoneenddate }
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

        let button = document.getElementById("btn-insertmilestoneid");
        button.classList.remove("active-button");
    }
    updateaddmousedown(event) {

        let button = document.getElementById("btn-insertmilestoneid");
        button.classList.add("active-button");
    }

    clearremovemousedown(event) {

        let button = document.getElementById("btn-clearmilestoneid");
        button.classList.remove("active-button");
    }
    clearaddmousedown(event) {

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

    showmilestone(mymilestone) {

        return (

            <div className="general-flex">
                <div className="flex-5 regularFont" onClick={event => { this.findmilestone(mymilestone.milestoneid) }}> {mymilestone.milestone} From {milestoneformatdatestring(mymilestone.start)} to {milestoneformatdatestring(mymilestone.completion)}</div>
                <div className="flex-1"> <button className="btn-removeIcon general-button" onClick={event => { this.deletemilestone(mymilestone.milestoneid) }}>
                    {removeIcon()}
                </button> </div>
            </div>
        )


    }
    showgridtimein() {

        let showgrid = [];
        if (this.state.activemilestone) {
            let mymilestone = this.getactivemilestone();

            let timein = mymilestone.start;
            let datein = new Date(`${timein.replace(/-/g, '/')} UTC`);
            showgrid.push(this.showgridcalenderstart(datein))

        }
        else {
            if (this.state.start) {

                let datein = this.state.start;

                showgrid.push(this.showgridcalenderstart(datein))
            }
        }

        return showgrid;

    }

    setDayStart(dateencoded) {

        if (this.state.activemilestoneid) {

            let mymilestone = this.getactivemilestone();
            let milestoneid = mymilestone.milestoneid;
            let timein = mymilestone.start;
            let newtimein = inputDateSecDateStringOutputString(dateencoded, timein)
            if (this.props.projects.hasOwnProperty("length")) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projects.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("projectmilestones")) {
                            // eslint-disable-next-line
                            myproject.projectmilestones.mymilestone.map((mymilestone, j) => {
                                if (mymilestone.milestoneid === milestoneid) {
                                    this.props.projects[i].projectmilestones.mymilestone[j].start = newtimein;
                                    let obj = this.props.projects;
                                    this.props.reduxProjects(obj);
                                    this.setState({ render: 'render' })
                                }
                            })
                        }
                    }
                })
            }

        }
        else {
            let datein = inputDateObjandSecReturnObj(dateencoded, this.state.start);
            this.setState({ start: datein, render: 'render' })
        }

    }
    getactivedate(dateencoded) {
        let activeclass = "";
        if (this.state.activemilestoneid) {

            let mymilestone = this.getactivemilestone();
            let timein = mymilestone.start;
            if (inputtimeDBoutputCalendarDaySeconds(timein) === dateencoded) {
                activeclass = "activemilestoneid"
            }
        }
        else {
            let datein = this.state.start;
            if (inputDateObjOutputCalendarDaySeconds(datein) === dateencoded) {
                activeclass = "activemilestoneid"
            }

        }
        return activeclass;
    }
    showdatestart(dateobj, day) {

        let showday = [];
        if (day) {
            let month = dateobj.getMonth() + 1;
            month = trailingzero(month)
            let year = dateobj.getFullYear();
            let dayzero = trailingzero(day);
            let offset = getOffset()
            let timestring = `${year}/${month}/${dayzero} 00:00:00${offset}`;

            let calendardate = new Date(timestring);

            let dateencoded = calendardate.getTime();

            showday.push(<div
                className={`calendar-date ${this.getactivedate(dateencoded)}`}
                onClick={event => { this.setDayStart(dateencoded) }}
            > {day}</div>)
        }
        return showday;
    }

    showgridcalenderstart(datein) {

        let gridcalender = [];
        if (Object.prototype.toString.call(datein) === "[object Date]") {

            let firstison = getFirstIsOn(datein);
            let days = [];
            let numberofcells = 49;
            for (let i = 1; i < numberofcells + 1; i++) {
                days.push(i);
            }
            // eslint-disable-next-line
            days.map((day, i) => {
                if (i === 0) {
                    gridcalender.push(<div className="calendar-element daydisplay">
                        Mon
                        </div>)
                }
                else if (i === 1) {
                    gridcalender.push(<div className="calendar-element daydisplay">
                        Tues
                        </div>)
                }
                else if (i === 2) {
                    gridcalender.push(<div className="calendar-element daydisplay">
                        Weds
                        </div>)
                }
                else if (i === 3) {
                    gridcalender.push(<div className="calendar-element daydisplay">
                        Thurs
                        </div>)
                }
                else if (i === 4) {
                    gridcalender.push(<div className="calendar-element daydisplay">
                        Fri
                        </div>)
                }
                else if (i === 5) {
                    gridcalender.push(<div className="calendar-element daydisplay">
                        Sat
                        </div>)
                }
                else if (i === 6) {
                    gridcalender.push(<div className="calendar-element daydisplay">
                        Sun
                        </div>)
                }
                else if (i === 7) {
                    let display = " "
                    switch (firstison) {
                        case "Mon":
                            display = this.showdatestart(datein, 1);
                            break;
                        default:
                            break;
                    }
                    gridcalender.push(<div className="calendar-element daydisplay">
                        {display}&nbsp;
                        </div>)

                }
                else if (i === 8) {
                    let display = " "
                    switch (firstison) {
                        case "Mon":
                            display = this.showdatestart(datein, 2);
                            break;
                        case "Tues":
                            display = this.showdatestart(datein, 1);
                            break;
                        default:
                            break;
                    }
                    gridcalender.push(<div className="calendar-element daydisplay">
                        {display}
                    </div>)
                }

                else if (i === 9) {
                    let display = " "
                    switch (firstison) {
                        case "Mon":
                            display = this.showdatestart(datein, 3);
                            break;
                        case "Tues":
                            display = this.showdatestart(datein, 2);
                            break;
                        case "Weds":
                            display = this.showdatestart(datein, 1);
                            break;
                        default:
                            break;
                    }
                    gridcalender.push(<div className="calendar-element daydisplay">
                        {display}
                    </div>)

                }
                else if (i === 10) {
                    let display = " "
                    switch (firstison) {
                        case "Mon":
                            display = this.showdatestart(datein, 4);
                            break;
                        case "Tues":
                            display = this.showdatestart(datein, 3);
                            break;
                        case "Weds":
                            display = this.showdatestart(datein, 2);
                            break;
                        case "Thurs":
                            display = this.showdatestart(datein, 1);
                            break;
                        default:
                            break
                    }
                    gridcalender.push(<div className="calendar-element daydisplay">
                        {display}
                    </div>)


                }
                else if (i === 11) {
                    let display = " "
                    switch (firstison) {
                        case "Mon":
                            display = this.showdatestart(datein, 5);
                            break;
                        case "Tues":
                            display = this.showdatestart(datein, 4);
                            break;
                        case "Weds":
                            display = this.showdatestart(datein, 3);
                            break;
                        case "Thurs":
                            display = this.showdatestart(datein, 2);
                            break;
                        case "Fri":
                            display = this.showdatestart(datein, 1);
                            break;
                        default:
                            break;
                    }
                    gridcalender.push(<div className="calendar-element daydisplay">
                        {display}
                    </div>)

                }
                else if (i === 12) {
                    let display = " "
                    switch (firstison) {
                        case "Mon":
                            display = this.showdatestart(datein, 6);
                            break;
                        case "Tues":
                            display = this.showdatestart(datein, 5);
                            break;
                        case "Weds":
                            display = this.showdatestart(datein, 4);
                            break;
                        case "Thurs":
                            display = this.showdatestart(datein, 3);
                            break;
                        case "Fri":
                            display = this.showdatestart(datein, 2);
                            break;
                        case "Sat":
                            display = this.showdatestart(datein, 1);
                            break;
                        default:
                            break;
                    }

                    gridcalender.push(<div className="calendar-element daydisplay">
                        {display}
                    </div>)


                }
                else if (i >= 13 && i <= 34) {
                    let display = " "
                    switch (firstison) {
                        case "Mon":
                            display = this.showdatestart(datein, i - 6);
                            break;
                        case "Tues":
                            display = this.showdatestart(datein, i - 7);
                            break;
                        case "Weds":
                            display = this.showdatestart(datein, i - 8);
                            break;
                        case "Thurs":
                            display = this.showdatestart(datein, i - 9);
                            break;
                        case "Fri":
                            display = this.showdatestart(datein, i - 10);
                            break;
                        case "Sat":
                            display = this.showdatestart(datein, i - 11);
                            break;
                        case "Sun":
                            display = this.showdatestart(datein, i - 12);
                            break;
                        default:
                            break;
                    }


                    gridcalender.push(<div className="calendar-element daydisplay">
                        {display}
                    </div>)

                }


                else if (i === 35) {
                    let display = " ";
                    switch (firstison) {
                        case "Mon":
                            display = this.showdatestart(datein, check_29_feb_leapyear(datein));
                            break;
                        case "Tues":
                            display = this.showdatestart(datein, 28);
                            break;
                        case "Weds":
                            display = this.showdatestart(datein, 27);
                            break;
                        case "Thurs":
                            display = this.showdatestart(datein, 26);
                            break;
                        case "Fri":
                            display = this.showdatestart(datein, 25);
                            break;
                        case "Sat":
                            display = this.showdatestart(datein, 24);
                            break;
                        case "Sun":
                            display = this.showdatestart(datein, 23);
                            break;
                        default:
                            break;
                    }
                    gridcalender.push(<div className="calendar-element daydisplay">
                        {display}
                    </div>)
                }
                else if (i === 36) {
                    let display = " ";
                    switch (firstison) {
                        case "Mon":
                            display = this.showdatestart(datein, check_30(datein));
                            break;
                        case "Tues":
                            display = this.showdatestart(datein, check_29_feb_leapyear(datein));
                            break;
                        case "Weds":
                            display = this.showdatestart(datein, 28);
                            break;
                        case "Thurs":
                            display = this.showdatestart(datein, 27);
                            break;
                        case "Fri":
                            display = this.showdatestart(datein, 26);
                            break;
                        case "Sat":
                            display = this.showdatestart(datein, 25);
                            break;
                        case "Sun":
                            display = this.showdatestart(datein, 24);
                            break;
                        default:
                            break;
                    }
                    gridcalender.push(<div className="calendar-element daydisplay">
                        {display}
                    </div>)
                }
                else if (i === 37) {
                    let display = " ";
                    switch (firstison) {
                        case "Mon":
                            display = this.showdatestart(datein, check_31(datein));
                            break;
                        case "Tues":
                            display = this.showdatestart(datein, check_30(datein));
                            break;
                        case "Weds":
                            display = this.showdatestart(datein, check_29_feb_leapyear(datein))
                            break;
                        case "Thurs":
                            display = this.showdatestart(datein, 28);
                            break;
                        case "Fri":
                            display = this.showdatestart(datein, 27);
                            break;
                        case "Sat":
                            display = this.showdatestart(datein, 26);
                            break;
                        case "Sun":
                            display = this.showdatestart(datein, 25);
                            break;
                        default:
                            break;
                    }
                    gridcalender.push(<div className="calendar-element daydisplay">
                        {display}
                    </div>)
                }
                else if (i === 38) {
                    let display = " ";
                    switch (firstison) {
                        case "Mon":
                            break;
                        case "Tues":
                            display = this.showdatestart(datein, check_31(datein));
                            break;
                        case "Weds":
                            display = this.showdatestart(datein, check_30(datein));
                            break;
                        case "Thurs":
                            display = this.showdatestart(datein, check_29_feb_leapyear(datein));
                            break;
                        case "Fri":
                            display = this.showdatestart(datein, 28);
                            break;
                        case "Sat":
                            display = this.showdatestart(datein, 27);
                            break;
                        case "Sun":
                            display = this.showdatestart(datein, 26);
                            break;
                        default:
                            break;
                    }
                    gridcalender.push(<div className="calendar-element daydisplay">
                        {display}
                    </div>)
                }
                else if (i === 39) {
                    let display = " ";
                    switch (firstison) {
                        case "Mon":
                            break;
                        case "Tues":
                            break;
                        case "Weds":
                            display = this.showdatestart(datein, check_31(datein));
                            break;
                        case "Thurs":
                            display = this.showdatestart(datein, check_30(datein));
                            break;
                        case "Fri":
                            display = this.showdatestart(datein, check_29_feb_leapyear(datein));
                            break;
                        case "Sat":
                            display = this.showdatestart(datein, 28);
                            break;
                        case "Sun":
                            display = this.showdatestart(datein, 27);
                            break;
                        default:
                            break;
                    }
                    gridcalender.push(<div className="calendar-element daydisplay">
                        {display}
                    </div>)
                }
                else if (i === 40) {
                    let display = " ";
                    switch (firstison) {
                        case "Mon":
                            break;
                        case "Tues":
                            break;
                        case "Weds":
                            break;
                        case "Thurs":
                            display = this.showdatestart(datein, check_31(datein));
                            break;
                        case "Fri":
                            display = this.showdatestart(datein, check_30(datein));
                            break;
                        case "Sat":
                            display = this.showdatestart(datein, check_29_feb_leapyear(datein));
                            break;
                        case "Sun":
                            display = this.showdatestart(datein, 28);
                            break;
                        default:
                            break;
                    }
                    gridcalender.push(<div className="calendar-element daydisplay">
                        {display}
                    </div>)
                }
                else if (i === 41) {
                    let display = " ";
                    switch (firstison) {
                        case "Mon":
                            break;
                        case "Tues":
                            break;
                        case "Weds":
                            break;
                        case "Thurs":
                            break;
                        case "Fri":
                            display = this.showdatestart(datein, check_31(datein));
                            break;
                        case "Sat":
                            display = this.showdatestart(datein, check_30(datein));
                            break;
                        case "Sun":
                            display = this.showdatestart(datein, check_29_feb_leapyear(datein));
                            break;
                        default:
                            break;
                    }
                    gridcalender.push(<div className="calendar-element daydisplay">
                        {display}
                    </div>)
                }
                else if (i === 42) {
                    let display = " ";
                    switch (firstison) {
                        case "Mon":
                            break;
                        case "Tues":
                            break;
                        case "Weds":
                            break;
                        case "Thurs":
                            break;
                        case "Fri":
                            break;
                        case "Sat":
                            display = this.showdatestart(datein, check_31(datein));
                            break;
                        case "Sun":
                            display = this.showdatestart(datein, check_30(datein));
                            break;
                        default:
                            break;
                    }
                    gridcalender.push(<div className="calendar-element daydisplay">
                        {display}
                    </div>)
                }
                else if (i === 43) {
                    let display = " ";
                    switch (firstison) {
                        case "Mon":
                            break;
                        case "Tues":
                            break;
                        case "Weds":
                            break;
                        case "Thurs":
                            break;
                        case "Fri":
                            break;
                        case "Sat":
                            break;
                        case "Sun":
                            display = this.showdatestart(datein, check_31(datein));
                            break;
                        default:
                            break;
                    }
                    gridcalender.push(<div className="calendar-element daydisplay">
                        {display}
                    </div>)
                }
                else {
                    gridcalender.push(<div className="calendar-element daydisplay">
                        &nbsp;
                        </div>)
                }
            })
        }
        return (<div className="calendar-grid milestonecalender">{gridcalender}</div>)
    }
    handleshowtimein() {
        let timein = [];
        if (this.state.showtimein) {
            timein.push(<div className="general-flex">
                <div className="flex-1  minheightcontainer align-contentCenter"> <button className="general-button calendar-button" onClick={event => { this.timeinyeardown(event) }}> {dateYearDown()}</button> </div>
                <div className="flex-1  minheightcontainer align-contentCenter"><button className="general-button calendar-button" onClick={event => { this.timeinmonthdown(event) }}>{dateMonthDown()} </button> </div>
                <div className="flex-2  minheightcontainer align-contentCenter regularFont">{displaydateformilestone(this.gettimein())} </div>
                <div className="flex-1  minheightcontainer align-contentCenter"><button className="general-button calendar-button" onClick={event => { this.timeinmonthup(event) }}>{dateMonthUp()}</button>  </div>
                <div className="flex-1  minheightcontainer align-contentCenter"> <button className="general-button calendar-button" onClick={event => { this.timeinyearup(event) }}>{dateYearUp()} </button> </div>
            </div>)
            timein.push(<div className="general-flex">
                <div className="flex-1">
                    {this.showgridtimein()}
                </div>
            </div>)

        }
        return timein;

    }
    toggletimein() {
        let timein = this.state.showtimein;
        if (timein) {
            timein = false;
        } else {
            timein = true;
        }
        this.setState({ showtimein: timein })
    }
    handletimeinicon() {
        if (this.state.showtimein) {
            return (closeDateMenu())
        } else {
            return (openDateMenu())
        }
    }
    showtimein() {
        return (
            <div className="general-flex">
                <div className="flex-1">

                    <div className="general-flex">
                        <div className="flex-2 regularFont">Start Date</div>
                        <div className="flex-3  minheightcontainer">
                            <input type="date"
                                className="project-field generalFont"
                                value={this.gettimein()}
                                onChange={event => { this.handletimein(event.target.value) }} /> </div>
                        <div className="flex-1  minheightcontainer align-contentCenter"><button className="general-button calendar-button" onClick={() => { this.toggletimein() }}> {this.handletimeinicon()}</button> </div>
                    </div>

                    {this.handleshowtimein()}

                </div>
            </div>

        )
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
    getactivemilestone() {
        let milestone = {};
        if (this.state.activemilestoneid) {
            let milestoneid = this.state.activemilestoneid;
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
            start = makeDatefromTimein(mymilestone.start);

        }
        else {
            start = makeDatefromObj(this.state.start);
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
    handleTimes() {

        if (this.state.width > 900) {
            return (<div className="general-flex">
                <div className="flex-1 showBorder milestone-calendar-container calendar-milestone">
                    {this.showtimein()}

                </div>
                <div className="flex-1 showBorder milestone-calendar-container calendar-milestone">

                    {this.showtimeout()}
                </div>
            </div>)

        } else {
            let times = [];
            times.push(<div className="general-flex">
                <div className="flex-1 showBorder milestone-calendar-container calendar-milestone">
                    {this.showtimein()}

                </div>
            </div>)
            times.push(<div className="general-flex">
                <div className="flex-1 showBorder milestone-calendar-container calendar-milestone">

                    {this.showtimeout()}
                </div>
            </div>
            );
            return times;
        }

    }
    render() {
        return (

            <div className="general-flex">
                <div className="flex-1">

                    <div className="general-flex">
                        <div className="flex-1 titleFont align-contentCenter">
                            <span>Project ID {this.getproject().projectid}/{this.getproject().title}</span> <br />
                            <span>Milestones</span>
                        </div>
                    </div>

                    <div className="general-flex">
                        <div className="flex-1 titleFont  milestone-flexcontainer align-contentCenter">
                            {this.handleClearMilestone()}
                        </div>
                    </div>

                    <div className="general-flex">
                        <div className="flex-1 regularFont">What is the Milestone ? </div>
                        <div className="flex-2">
                            <input type="text" className="project-field" value={this.getmilestonefield()} onChange={event => { this.handlemilestone(event.target.value) }} />
                        </div>
                    </div>






                    {this.handleTimes()}







                    <div className="general-flex">
                        <div className="flex-1">
                            <div className="general-milestone-container align-contentCenter regularFont"> {this.state.message}</div>
                            <div className="general-milestone-container align-contentCenter"> <button className="project-button" onClick={event => { this.handleSaveAllProjects(event) }}>{SaveProjectManagerIcon()} </button></div>
                        </div>
                    </div>

                    <div className="general-flex">
                        <div className="flex-1">
                            {this.getmilestoneids()}
                        </div>
                    </div>


                </div>
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
