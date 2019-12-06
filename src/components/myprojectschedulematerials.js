import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ProviderEndPoint } from './actions/api'
import {
    check_30,
    check_31,
    check_29_feb_leapyear,
    getFirstIsOn,
    formatDateforCalendarDisplay,
    trailingzero,
    inputUTCStringForLaborID,
    ScheduleMaterial,
    makeID,
    inputDateObjOutputAdjString,
    makeDatefromTimein,
    makeDatefromObj,
    adjustdatefromcalendar,
    inputDatePickerOutputDateObj,
    inputtimeDBoutputCalendarDaySeconds,
    inputDateObjOutputCalendarDaySeconds,
    inputDateSecActiveIDTimein,
    inputDateObjandSecReturnObj,
    increaseDateStringByOneMonth,
    increaseDateStringByOneYear,
    decreaseDateStringByOneMonth,
    decreaseDateStringByOneYear,
    addoneYearDateObj,
    addoneMonthDateObj,
    subtractMonthDateObj,
    subtractoneYearDateObj,
    inputUTCStringForMaterialID,
    inputUTCStringForMaterialIDWithTime,
    validateLaborRate,
    getOffset
}
    from './functions';
import {
    openDateMenu,
    closeDateMenu,
    dateYearUp,
    dateYearDown,
    dateMonthDown,
    dateMonthUp,
    SaveAllProjectIcon,
    ClearMaterialID,
    removeIcon
}
    from './svg';
import './materials.css';
import * as actions from './actions';

class MyProjectScheduleMaterials extends Component {

    constructor(props) {
        super(props);
        this.state = {
            render: '',
            message: '',
            datein: new Date(),
            showcalendar: false,
            width: 0,
            height: 0,
            activematerialid: "",
            quantity: 0,
            unit: "",
            unitcost: 0,
            milestoneid: "",
            description: ""

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
    getprojectitle() {
        let projecttitle = "";
        if (this.props.projectsprovider.hasOwnProperty("length")) {
            let projectid = this.props.projectid.projectid;
            // eslint-disable-next-line
            this.props.projectsprovider.map(myproject => {
                if (myproject.projectid === projectid) {
                    projecttitle = `ProjectID ${myproject.projectid}/${myproject.title} `
                }
            })
        }
        return projecttitle;
    }
    showCalender() {
        this.setState({ showcalendar: true })
    }
    handleChange(value) {

        if (this.state.activematerialid) {

            let materialid = this.state.activematerialid;
            let mymaterial = this.findmymaterial(materialid)
            let timein = mymaterial.timein;
            let newtimein = adjustdatefromcalendar(timein, value)
            if (this.props.projectsprovider.hasOwnProperty("length")) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("schedulematerials")) {
                            // eslint-disable-next-line
                            myproject.schedulematerials.mymaterial.map((mymaterial, j) => {
                                if (mymaterial.materialid === materialid) {

                                    this.props.projectsprovider[i].schedulematerials.mymaterial[j].timein = newtimein;
                                    let obj = this.props.projectsprovider;
                                    this.props.projectsProvider(obj)
                                    this.setState({ render: 'render' })
                                }
                            })
                        }
                    }
                })
            }
        }
        else {

            this.setState({ datein: inputDatePickerOutputDateObj(value) })
        }

    }
    hideCalendar() {
        this.setState({ showcalendar: false })

    }
    yeardown() {
        if (this.state.activematerialid) {
            let materialid = this.state.activematerialid;
            let mymaterial = this.findmymaterial(materialid);
            let timein = mymaterial.timein;
            let newtime = decreaseDateStringByOneYear(timein);
            if (this.props.projectsprovider.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    let projectid = this.props.projectid.projectid;
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("schedulematerials")) {
                            // eslint-disable-next-line
                            myproject.schedulematerials.mymaterial.map((mymaterial, j) => {
                                if (mymaterial.materialid === materialid) {
                                    this.props.projectsprovider[i].schedulematerials.mymaterial[j].timein = newtime;
                                    let obj = this.props.projectsprovider;
                                    this.props.projectsProvider(obj);
                                    this.setState({ render: 'render' })
                                }
                            })
                        }
                    }
                })
            }
        }
        else {
            let newDate = subtractoneYearDateObj(this.state.datein);
            this.setState({ datein: newDate })
        }
    }
    yearup() {
        if (this.state.activematerialid) {
            let materialid = this.state.activematerialid;
            let mymaterial = this.findmymaterial(materialid);
            let timein = mymaterial.timein;
            let newtime = increaseDateStringByOneYear(timein);
            if (this.props.projectsprovider.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    let projectid = this.props.projectid.projectid;
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("schedulematerials")) {
                            // eslint-disable-next-line
                            myproject.schedulematerials.mymaterial.map((mymaterial, j) => {
                                if (mymaterial.materialid === materialid) {
                                    this.props.projectsprovider[i].schedulematerials.mymaterial[j].timein = newtime;
                                    let obj = this.props.projectsprovider;
                                    this.props.projectsProvider(obj);
                                    this.setState({ render: 'render' })
                                }
                            })
                        }
                    }
                })
            }
        }
        else {
            let newDate = addoneYearDateObj(this.state.datein);
            this.setState({ datein: newDate })
        }

    }
    increasemonth(event) {
        if (this.state.activematerialid) {
            let materialid = this.state.activematerialid;
            let mymaterial = this.findmymaterial(materialid);
            let timein = mymaterial.timein;
            let newtime = increaseDateStringByOneMonth(timein);
            if (this.props.projectsprovider.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    let projectid = this.props.projectid.projectid;
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("schedulematerials")) {
                            // eslint-disable-next-line
                            myproject.schedulematerials.mymaterial.map((mymaterial, j) => {
                                if (mymaterial.materialid === materialid) {
                                    this.props.projectsprovider[i].schedulematerials.mymaterial[j].timein = newtime;
                                    let obj = this.props.projectsprovider;
                                    this.props.projectsProvider(obj);
                                    this.setState({ render: 'render' })
                                }
                            })
                        }
                    }
                })
            }
        }
        else {
            let newDate = addoneMonthDateObj(this.state.datein);
            this.setState({ datein: newDate })
        }

    }
    decreasemonth() {
        if (this.state.activematerialid) {
            let materialid = this.state.activematerialid;
            let mymaterial = this.findmymaterial(materialid);
            let timein = mymaterial.timein;
            let newtime = decreaseDateStringByOneMonth(timein);
            if (this.props.projectsprovider.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    let projectid = this.props.projectid.projectid;
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("schedulematerials")) {
                            // eslint-disable-next-line
                            myproject.schedulematerials.mymaterial.map((mymaterial, j) => {
                                if (mymaterial.materialid === materialid) {
                                    this.props.projectsprovider[i].schedulematerials.mymaterial[j].timein = newtime;
                                    let obj = this.props.projectsprovider;
                                    this.props.projectsProvider(obj);
                                    this.setState({ render: 'render' })
                                }
                            })
                        }
                    }
                })
            }
        }
        else {
            let newDate = subtractMonthDateObj(this.state.datein);
            this.setState({ datein: newDate })
        }
    }
    showdate(dateobj, day) {

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
                className={`${this.getactivedate(dateencoded)} calendar-date`}
                onClick={event => { this.setDay(dateencoded) }}
            > {day}</div>)
        }
        return showday;
    }
    getactivedate(dateencoded) {
        let activeclass = "";
        if (this.state.activematerialid) {

            let materialid = this.state.activematerialid;
            let mymaterial = this.findmymaterial(materialid);
            let timein = mymaterial.timein;
            if (inputtimeDBoutputCalendarDaySeconds(timein) === dateencoded) {
                activeclass = "active-schedule-calendar"
            }
        }
        else {
            let datein = this.state.datein;
            if (inputDateObjOutputCalendarDaySeconds(datein) === dateencoded) {
                activeclass = "active-schedule-calendar"
            }

        }
        return activeclass;
    }
    setDay(dateencoded) {

        if (this.state.activematerialid) {
            let materialid = this.state.activematerialid;
            let mymaterial = this.findmymaterial(materialid)
            let timein = mymaterial.timein;
            let newtimein = inputDateSecActiveIDTimein(dateencoded, timein)
            if (this.props.projectsprovider.hasOwnProperty("length")) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("schedulematerials")) {
                            // eslint-disable-next-line
                            myproject.schedulematerials.mymaterial.map((mymaterial, j) => {
                                if (mymaterial.materialid === materialid) {
                                    this.props.projectsprovider[i].schedulematerials.mymaterial[j].timein = newtimein;
                                    let obj = this.props.projectsprovider;
                                    this.props.projectsProvider(obj);
                                    this.setState({ render: 'render' })
                                }
                            })
                        }
                    }
                })
            }

        }
        else {
            let datein = inputDateObjandSecReturnObj(dateencoded, this.state.datein);
            this.setState({ datein, render: 'render' })
        }

    }
    hideclasscalendar() {
        if (!this.state.showcalendar) {
            return ("calendar-hidden")
        }
    }
    showclasscalendar() {
        if (this.state.showcalendar) {
            return ("calendar-hidden")
        }
    }
    DateIn() {
        return (<div className="datein-container">
            <div className="datein-element-1a">
                Enter Date <br /> <input type="date"
                    value={this.getvalue()}
                    className="project-field titleFont general-Font"
                    onChange={event => { this.handleChange(event.target.value) }} />
            </div>
            <div className="datein-element-1b">
                <button className={`datebutton  ${this.showclasscalendar()}`}
                    onClick={event => { this.showCalender(event) }}
                    id="btn-opendatemenu">
                    {openDateMenu()}
                </button>
                <button className={`datebutton ${this.hideclasscalendar()}`} id="btn-closedatemenu"
                    onClick={event => { this.hideCalendar(event) }}>
                    {closeDateMenu()}
                </button>
            </div>
            <div className={`material-buttonrow ${this.hideclasscalendar()}`}><button className="datebutton"
                onClick={event => { this.yeardown(event) }}> {dateYearDown()}</button></div>
            <div className={`material-buttonrow ${this.hideclasscalendar()}`}>
                <button className="datebutton"
                    onClick={event => { this.decreasemonth(event) }}>{dateMonthDown()} </button> </div>
            <div className={`material-buttonrow ${this.hideclasscalendar()} displaydate`}>{this.showdateforcalendar()} </div>
            <div className={`material-buttonrow ${this.hideclasscalendar()}`}
                onClick={event => { this.increasemonth(event) }}><button className="datebutton">{dateMonthUp()}</button> </div>
            <div className={`material-buttonrow ${this.hideclasscalendar()}`}>
                <button className="datebutton"
                    onClick={event => { this.yearup(event) }}>{dateYearUp()} </button> </div>

            <div className={`dateincalendar-container ${this.hideclasscalendar()}`}>
                <div className="calendar-grid">
                    {this.showgrid()}
                </div>
            </div>
        </div>)
    }

    showgridcalender(datein) {

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
                            display = this.showdate(datein, 1);
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
                            display = this.showdate(datein, 2);
                            break;
                        case "Tues":
                            display = this.showdate(datein, 1);
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
                            display = this.showdate(datein, 3);
                            break;
                        case "Tues":
                            display = this.showdate(datein, 2);
                            break;
                        case "Weds":
                            display = this.showdate(datein, 1);
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
                            display = this.showdate(datein, 4);
                            break;
                        case "Tues":
                            display = this.showdate(datein, 3);
                            break;
                        case "Weds":
                            display = this.showdate(datein, 2);
                            break;
                        case "Thurs":
                            display = this.showdate(datein, 1);
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
                            display = this.showdate(datein, 5);
                            break;
                        case "Tues":
                            display = this.showdate(datein, 4);
                            break;
                        case "Weds":
                            display = this.showdate(datein, 3);
                            break;
                        case "Thurs":
                            display = this.showdate(datein, 2);
                            break;
                        case "Fri":
                            display = this.showdate(datein, 1);
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
                            display = this.showdate(datein, 6);
                            break;
                        case "Tues":
                            display = this.showdate(datein, 5);
                            break;
                        case "Weds":
                            display = this.showdate(datein, 4);
                            break;
                        case "Thurs":
                            display = this.showdate(datein, 3);
                            break;
                        case "Fri":
                            display = this.showdate(datein, 2);
                            break;
                        case "Sat":
                            display = this.showdate(datein, 1);
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
                            display = this.showdate(datein, i - 6);
                            break;
                        case "Tues":
                            display = this.showdate(datein, i - 7);
                            break;
                        case "Weds":
                            display = this.showdate(datein, i - 8);
                            break;
                        case "Thurs":
                            display = this.showdate(datein, i - 9);
                            break;
                        case "Fri":
                            display = this.showdate(datein, i - 10);
                            break;
                        case "Sat":
                            display = this.showdate(datein, i - 11);
                            break;
                        case "Sun":
                            display = this.showdate(datein, i - 12);
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
                            display = this.showdate(datein, check_29_feb_leapyear(datein));
                            break;
                        case "Tues":
                            display = this.showdate(datein, 28);
                            break;
                        case "Weds":
                            display = this.showdate(datein, 27);
                            break;
                        case "Thurs":
                            display = this.showdate(datein, 26);
                            break;
                        case "Fri":
                            display = this.showdate(datein, 25);
                            break;
                        case "Sat":
                            display = this.showdate(datein, 24);
                            break;
                        case "Sun":
                            display = this.showdate(datein, 23);
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
                            display = this.showdate(datein, check_30(datein));
                            break;
                        case "Tues":
                            display = this.showdate(datein, check_29_feb_leapyear(datein));
                            break;
                        case "Weds":
                            display = this.showdate(datein, 28);
                            break;
                        case "Thurs":
                            display = this.showdate(datein, 27);
                            break;
                        case "Fri":
                            display = this.showdate(datein, 26);
                            break;
                        case "Sat":
                            display = this.showdate(datein, 25);
                            break;
                        case "Sun":
                            display = this.showdate(datein, 24);
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
                            display = this.showdate(datein, check_31(datein));
                            break;
                        case "Tues":
                            display = this.showdate(datein, check_30(datein));
                            break;
                        case "Weds":
                            display = this.showdate(datein, check_29_feb_leapyear(datein))
                            break;
                        case "Thurs":
                            display = this.showdate(datein, 28);
                            break;
                        case "Fri":
                            display = this.showdate(datein, 27);
                            break;
                        case "Sat":
                            display = this.showdate(datein, 26);
                            break;
                        case "Sun":
                            display = this.showdate(datein, 25);
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
                            display = this.showdate(datein, check_31(datein));
                            break;
                        case "Weds":
                            display = this.showdate(datein, check_30(datein));
                            break;
                        case "Thurs":
                            display = this.showdate(datein, check_29_feb_leapyear(datein));
                            break;
                        case "Fri":
                            display = this.showdate(datein, 28);
                            break;
                        case "Sat":
                            display = this.showdate(datein, 27);
                            break;
                        case "Sun":
                            display = this.showdate(datein, 26);
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
                            display = this.showdate(datein, check_31(datein));
                            break;
                        case "Thurs":
                            display = this.showdate(datein, check_30(datein));
                            break;
                        case "Fri":
                            display = this.showdate(datein, check_29_feb_leapyear(datein));
                            break;
                        case "Sat":
                            display = this.showdate(datein, 28);
                            break;
                        case "Sun":
                            display = this.showdate(datein, 27);
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
                            display = this.showdate(datein, check_31(datein));
                            break;
                        case "Fri":
                            display = this.showdate(datein, check_30(datein));
                            break;
                        case "Sat":
                            display = this.showdate(datein, check_29_feb_leapyear(datein));
                            break;
                        case "Sun":
                            display = this.showdate(datein, 28);
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
                            display = this.showdate(datein, check_31(datein));
                            break;
                        case "Sat":
                            display = this.showdate(datein, check_30(datein));
                            break;
                        case "Sun":
                            display = this.showdate(datein, check_29_feb_leapyear(datein));
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
                            display = this.showdate(datein, check_31(datein));
                            break;
                        case "Sun":
                            display = this.showdate(datein, check_30(datein));
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
                            display = this.showdate(datein, check_31(datein));
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
        return gridcalender;
    }
    showgrid() {

        let showgrid = [];
        if (this.state.activematerialid) {
            let materialid = this.state.activematerialid;
            let mymaterial = this.findmymaterial(materialid);
            let timein = mymaterial.timein;
            let datein = new Date(`${timein.replace(/-/g, '/')} UTC`);
            showgrid.push(this.showgridcalender(datein))

        }
        else {
            if (this.state.datein) {

                let datein = this.state.datein;

                showgrid.push(this.showgridcalender(datein))
            }
        }

        return showgrid;
    }
    getvalue() {
        let value = "";
        if (this.state.activematerialid) {
            let materialid = this.state.activematerialid;
            let mymaterial = this.findmymaterial(materialid)
            let timein = mymaterial.timein;
            value = makeDatefromTimein(timein)
        }
        else {
            value = makeDatefromObj(this.state.datein)

        }
        return value;

    }
    showdateforcalendar() {
        if (this.state.activematerialid) {
            let materialid = this.state.activematerialid;
            let mymaterial = this.findmymaterial(materialid);
            let timein = mymaterial.timein;
            let datein = new Date(`${timein.replace(/-/g, '/')}-00:00`);
            return (formatDateforCalendarDisplay(datein))
        }
        else

            return (formatDateforCalendarDisplay(this.state.datein))


    }
    getmilestone() {
        let milestoneid = "";
        if (this.state.activematerialid) {
            let materialid = this.state.activematerialid;
            let mymaterial = this.findmymaterial(materialid);
            milestoneid = mymaterial.milestoneid;
        }
        else {
            milestoneid = this.state.milestoneid;
        }
        return milestoneid;

    }
    handlemilestone(value) {
        if (this.state.activematerialid) {
            let materialid = this.state.activematerialid;
            if (this.props.projectsprovider.hasOwnProperty("length")) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("schedulematerials")) {
                            // eslint-disable-next-line
                            myproject.schedulematerials.mymaterial.map((mymaterial, j) => {

                                if (mymaterial.materialid === materialid) {
                                    this.props.projectsprovider[i].schedulematerials.mymaterial[j].milestoneid = value;
                                    let obj = this.props.projectsprovider;
                                    this.props.projectsProvider(obj)
                                    this.setState({ render: 'render' })
                                }
                            })
                        }
                    }
                })
            }

        }
        else {
            let materialid = makeID(8);
            let providerid = this.props.myusermodel.providerid;
            let projectid = this.props.projectid.projectid;
            let datein = inputDateObjOutputAdjString(this.state.datein);
            let quantity = this.state.quantity;
            let unit = this.state.unit;
            let unitcost = this.state.unitcost;
            let description = this.state.description;
            let milestoneid = value;
            let proposalid = this.state.proposalid;
            let mymaterial = ScheduleMaterial(materialid, providerid, projectid, datein, quantity, unit, unitcost, description, milestoneid, proposalid)

            if (this.props.projectsprovider.hasOwnProperty("length")) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("schedulematerials")) {
                            this.props.projectsprovider[i].schedulematerials.mymaterial.push(mymaterial)
                            let obj = this.props.projectsprovider;
                            this.props.projectsProvider(obj)
                            this.setState({ activematerialid: materialid, message: `Active Material ID is ${materialid}, You are in Edit Mode` })
                        }
                        else {
                            let material = [];
                            material.push(mymaterial)
                            let schedulematerials = { mymaterial: material }
                            this.props.projectsprovider[i].schedulematerials = schedulematerials;
                            let obj = this.props.projectsprovider;
                            this.props.projectsProvider(obj)
                            this.setState({ activematerialid: materialid, message: `Active Material ID is ${materialid}, You are in Edit Mode` })
                        }
                    }
                })
            }


        }



    }

    getproject() {
        let project = {};
        if (this.props.projectsprovider.hasOwnProperty("length")) {
            let projectid = this.props.projectid.projectid;
            // eslint-disable-next-line
            this.props.projectsprovider.map(myproject => {
                if (myproject.projectid === projectid) {
                    project = myproject;
                }
            })
        }
        return project;
    }
    loadmilestones() {
        let myproject = this.getproject();
        let milestone = [];
        if (myproject.hasOwnProperty("projectmilestones")) {
            // eslint-disable-next-line
            myproject.projectmilestones.mymilestone.map(mymilestone => {
                milestone.push(<option value={mymilestone.milestoneid}>{mymilestone.milestone} {inputUTCStringForMaterialID(mymilestone.start)} to {inputUTCStringForMaterialID(mymilestone.completion)} </option>)
            })
        }
        return milestone;
    }
    handledescription(value) {
        if (this.state.activematerialid) {
            let materialid = this.state.activematerialid;
            if (this.props.projectsprovider.hasOwnProperty("length")) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("schedulematerials")) {
                            // eslint-disable-next-line
                            myproject.schedulematerials.mymaterial.map((mymaterial, j) => {

                                if (mymaterial.materialid === materialid) {
                                    this.props.projectsprovider[i].schedulematerials.mymaterial[j].description = value;
                                    let obj = this.props.projectsprovider;
                                    this.props.projectsProvider(obj)
                                    this.setState({ render: 'render' })
                                }
                            })
                        }
                    }
                })
            }

        }
        else {
            let materialid = makeID(8);
            let providerid = this.props.myusermodel.providerid;
            let projectid = this.props.projectid.projectid;
            let datein = inputDateObjOutputAdjString(this.state.datein);
            let quantity = this.state.quantity;
            let unit = this.state.unit;
            let unitcost = this.state.unitcost;
            let description = value;
            let milestoneid = this.state.milestoneid;
            let proposalid = this.state.proposalid;
            let mymaterial = ScheduleMaterial(materialid, providerid, projectid, datein, quantity, unit, unitcost, description, milestoneid, proposalid)

            if (this.props.projectsprovider.hasOwnProperty("length")) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("schedulematerials")) {
                            this.props.projectsprovider[i].schedulematerials.mymaterial.push(mymaterial)
                            let obj = this.props.projectsprovider;
                            this.props.projectsProvider(obj)
                            this.setState({ activematerialid: materialid, message: `Active Material ID is ${materialid}, You are in Edit Mode` })
                        }
                        else {
                            let material = [];
                            material.push(mymaterial)
                            let schedulematerials = { mymaterial: material }
                            this.props.projectsprovider[i].schedulematerials = schedulematerials;
                            let obj = this.props.projectsprovider;
                            this.props.projectsProvider(obj)
                            this.setState({ activematerialid: materialid, message: `Active Material ID is ${materialid}, You are in Edit Mode` })
                        }
                    }
                })
            }


        }

    }
    getdescription() {
        let description = "";
        if (this.state.activematerialid) {
            let materialid = this.state.activematerialid;
            let mymaterial = this.findmymaterial(materialid)
            description = mymaterial.description;
        }
        else {
            description = this.state.description;
        }
        return description;
    }
    handlequantity(value) {
        if (this.state.activematerialid) {
            let materialid = this.state.activematerialid;
            if (this.props.projectsprovider.hasOwnProperty("length")) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("schedulematerials")) {
                            // eslint-disable-next-line
                            myproject.schedulematerials.mymaterial.map((mymaterial, j) => {

                                if (mymaterial.materialid === materialid) {
                                    this.props.projectsprovider[i].schedulematerials.mymaterial[j].quantity = value;
                                    let obj = this.props.projectsprovider;
                                    this.props.projectsProvider(obj)
                                    this.setState({ render: 'render' })
                                }
                            })
                        }
                    }
                })
            }

        }
        else {
            let materialid = makeID(8);
            let providerid = this.props.myusermodel.providerid;
            let projectid = this.props.projectid.projectid;
            let datein = inputDateObjOutputAdjString(this.state.datein);
            let quantity = value
            let unit = this.state.unit;
            let unitcost = this.state.unitcost;
            let description = this.state.description;
            let milestoneid = this.state.milestoneid;
            let proposalid = this.state.proposalid;
            let mymaterial = ScheduleMaterial(materialid, providerid, projectid, datein, quantity, unit, unitcost, description, milestoneid, proposalid)

            if (this.props.projectsprovider.hasOwnProperty("length")) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("schedulematerials")) {
                            this.props.projectsprovider[i].schedulematerials.mymaterial.push(mymaterial)
                            let obj = this.props.projectsprovider;
                            this.props.projectsProvider(obj)
                            this.setState({ activematerialid: materialid, message: `Active Material ID is ${materialid}, You are in Edit Mode` })
                        }
                        else {
                            let material = [];
                            material.push(mymaterial)
                            let schedulematerials = { mymaterial: material }
                            this.props.projectsprovider[i].schedulematerials = schedulematerials;
                            let obj = this.props.projectsprovider;
                            this.props.projectsProvider(obj)
                            this.setState({ activematerialid: materialid, message: `Active Material ID is ${materialid}, You are in Edit Mode` })
                        }
                    }
                })
            }


        }
    }
    getquantity() {
        let quantity = "";
        if (this.state.activematerialid) {
            let materialid = this.state.activematerialid;
            let mymaterial = this.findmymaterial(materialid)
            quantity = mymaterial.quantity;
        }
        else {
            quantity = this.state.quantity;
        }
        return quantity;

    }
    getunit() {
        let unit = "";
        if (this.state.activematerialid) {
            let materialid = this.state.activematerialid;
            let mymaterial = this.findmymaterial(materialid)
            unit = mymaterial.unit;
        }
        else {
            unit = this.state.unit;
        }
        return unit;
    }
    handleunit(value) {
        if (this.state.activematerialid) {
            let materialid = this.state.activematerialid;
            if (this.props.projectsprovider.hasOwnProperty("length")) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("schedulematerials")) {
                            // eslint-disable-next-line
                            myproject.schedulematerials.mymaterial.map((mymaterial, j) => {

                                if (mymaterial.materialid === materialid) {
                                    this.props.projectsprovider[i].schedulematerials.mymaterial[j].unit = value;
                                    let obj = this.props.projectsprovider;
                                    this.props.projectsProvider(obj)
                                    this.setState({ render: 'render' })
                                }
                            })
                        }
                    }
                })
            }

        }
        else {
            let materialid = makeID(8);
            let providerid = this.props.myusermodel.providerid;
            let projectid = this.props.projectid.projectid;
            let datein = inputDateObjOutputAdjString(this.state.datein);
            let quantity = this.state.quantity;
            let unit = value;
            let unitcost = this.state.unitcost;
            let description = this.state.description;
            let milestoneid = this.state.milestoneid;
            let proposalid = this.state.proposalid;
            let mymaterial = ScheduleMaterial(materialid, providerid, projectid, datein, quantity, unit, unitcost, description, milestoneid, proposalid)

            if (this.props.projectsprovider.hasOwnProperty("length")) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("schedulematerials")) {
                            this.props.projectsprovider[i].schedulematerials.mymaterial.push(mymaterial)
                            let obj = this.props.projectsprovider;
                            this.props.projectsProvider(obj)
                            this.setState({ activematerialid: materialid, message: `Active Material ID is ${materialid}, You are in Edit Mode` })
                        }
                        else {
                            let material = [];
                            material.push(mymaterial)
                            let schedulematerials = { mymaterial: material }
                            this.props.projectsprovider[i].schedulematerials = schedulematerials;
                            let obj = this.props.projectsprovider;
                            this.props.projectsProvider(obj)
                            this.setState({ activematerialid: materialid, message: `Active Material ID is ${materialid}, You are in Edit Mode` })
                        }
                    }
                })
            }


        }
    }
    getunitcost() {
        let unitcost = "";
        if (this.state.activematerialid) {
            let materialid = this.state.activematerialid;
            let mymaterial = this.findmymaterial(materialid)
            unitcost = mymaterial.unitcost;
        }
        else {
            unitcost = this.state.unitcost;
        }
        return unitcost;
    }
    handleunitcost(value) {
        if (this.state.activematerialid) {
            let materialid = this.state.activematerialid;
            if (this.props.projectsprovider.hasOwnProperty("length")) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("schedulematerials")) {
                            // eslint-disable-next-line
                            myproject.schedulematerials.mymaterial.map((mymaterial, j) => {

                                if (mymaterial.materialid === materialid) {
                                    this.props.projectsprovider[i].schedulematerials.mymaterial[j].unitcost = value;
                                    let obj = this.props.projectsprovider;
                                    this.props.projectsProvider(obj)
                                    this.setState({ render: 'render' })
                                }
                            })
                        }
                    }
                })
            }

        }
        else {
            let materialid = makeID(8);
            let providerid = this.props.myusermodel.providerid;
            let projectid = this.props.projectid.projectid;
            let datein = inputDateObjOutputAdjString(this.state.datein);
            let quantity = this.state.quantity;
            let unit = this.state.unit;
            let unitcost = value;
            let description = this.state.description;
            let milestoneid = this.state.milestoneid;
            let proposalid = this.state.proposalid;
            let mymaterial = ScheduleMaterial(materialid, providerid, projectid, datein, quantity, unit, unitcost, description, milestoneid, proposalid)

            if (this.props.projectsprovider.hasOwnProperty("length")) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("schedulematerials")) {
                            this.props.projectsprovider[i].schedulematerials.mymaterial.push(mymaterial)
                            let obj = this.props.projectsprovider;
                            this.props.projectsProvider(obj)
                            this.setState({ activematerialid: materialid, message: `Active Material ID is ${materialid}, You are in Edit Mode` })
                        }
                        else {
                            let material = [];
                            material.push(mymaterial)
                            let schedulematerials = { mymaterial: material }
                            this.props.projectsprovider[i].schedulematerials = schedulematerials;
                            let obj = this.props.projectsprovider;
                            this.props.projectsProvider(obj)
                            this.setState({ activematerialid: materialid, message: `Active Material ID is ${materialid}, You are in Edit Mode` })
                        }
                    }
                })
            }


        }
    }
    getamount() {
        let amount = 0;
        if (this.state.activematerialid) {
            let materialid = this.state.activematerialid;
            let mymaterial = this.findmymaterial(materialid)
            amount = Number(Number(mymaterial.quantity) * Number(mymaterial.unitcost)).toFixed(2)
        }
        else {
            amount = Number(Number(this.state.quantity) * Number(this.state.unitcost)).toFixed(2)
        }
        return amount;
    }
    handleshowmaterialids() {
        let materialids = [];
        let myproject = this.getproject();
        if (myproject.hasOwnProperty("schedulematerials")) {
            // eslint-disable-next-line
            myproject.schedulematerials.mymaterial.map(mymaterial => {
                materialids.push(this.showmaterialid(mymaterial))
            })
        }
        return materialids;

    }
    findmymaterial(materialid) {
        let material = {};
        let myproject = this.getproject();
        if (myproject.hasOwnProperty("schedulematerials")) {
            // eslint-disable-next-line
            myproject.schedulematerials.mymaterial.map(mymaterial => {
                if (mymaterial.materialid === materialid) {
                    material = mymaterial;
                }
            })
        }
        return material;
    }
    findmaterial(materialid) {
        this.setState({ activematerialid: materialid })

    }
    deleteMaterial(event, materialid) {
        if (window.confirm(`Are you sure you want to material id ${materialid}`) === true) {
            if (this.props.projectsprovider.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    let projectid = this.props.projectid.projectid;
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("schedulematerials")) {
                            // eslint-disable-next-line
                            myproject.schedulematerials.mymaterial.map((mymaterial, j) => {
                                if (mymaterial.materialid === materialid) {
                                    this.props.projectsprovider[i].schedulematerials.mymaterial.splice(j, 1);
                                    let obj = this.props.projectsprovider;
                                    this.props.projectsProvider(obj);
                                    this.clearmaterialid()
                                }
                            })
                        }
                    }
                })
            }

        }
    }
    getactivematerialid(materialid) {
        if (this.state.activematerialid === materialid) {
            return `activematerialid`
        }
    }
    showmaterialid(mymaterial) {
        return (<div className="general-flex">
            <div className="flex-7" onClick={() => { this.findmaterial(mymaterial.materialid) }}>

                <span className="regularFont">{inputUTCStringForMaterialIDWithTime(mymaterial.timein)}</span><br />
                <span className="regularFont">{mymaterial.description}</span><br />
                <span className="regularFont">{mymaterial.quantity} {mymaterial.unit} ${mymaterial.unitcost} = ${(mymaterial.quantity * mymaterial.unitcost).toFixed(2)}</span>

            </div>
            <div className="flex-1">
                <button className="btn-removeIcon general-button" onClick={event => { this.deleteMaterial(event, mymaterial.materialid) }}>
                    {removeIcon()}
                </button>
            </div>
        </div>)
    }
    getactivematerial() {
        let material = {};
        if (this.state.activematerialid) {
            let myproject = this.getproject();
            let materialid = this.state.activematerialid;
            if (myproject.hasOwnProperty("schedulematerials")) {
                // eslint-disable-next-line
                myproject.schedulematerials.mymaterial.map(mymaterial => {
                    if (mymaterial.materialid === materialid) {
                        material = mymaterial;
                    }
                })
            }
        }
        return material;
    }
    handleClearProject() {
        if (this.state.activematerialid) {
            let mymaterial = this.getactivematerial();

            return (
                <div className="general-flex">
                    <div className="flex-1">

                        <div className="general-flex">
                            <div className="flex-1 align-contentCenter">
                                <button className="general-button btn-clearmaterialid" onClick={event => { this.clearmaterialid(event) }}>{ClearMaterialID()} </button>
                            </div>
                        </div>

                        <div className="general-flex">
                            <div className="flex-1 regularFont align-contentCenter">
                                {`Active Materal is ${mymaterial.description}`}
                            </div>
                        </div>

                    </div>
                </div>)
        }
        else {
            return (<span>&nbsp;</span>)
        }
    }
    clearmaterialid() {
        this.setState({
            activematerialid: "",
            message: "",
            datein: new Date(),
            quantity: 0,
            unit: "",
            unitcost: 0,
            milestoneid: "",
            description: ""
        })
    }
    validateproject() {
        let errmsg = "";
        if (this.props.projectsprovider) {
            let projectid = this.props.projectid.projectid;
            // eslint-disable-next-line
            this.props.projectsprovider.map(myproject => {
                if (myproject.projectid === projectid) {
                    if (myproject.hasOwnProperty("schedulelabor")) {
                        // eslint-disable-next-line
                        myproject.schedulelabor.mylabor.map(mylabor => {
                            if (!mylabor.milestoneid) {
                                errmsg = `${mylabor.laborid} is missing a milestone `
                            }
                            errmsg += `${validateLaborRate(mylabor.laborrate)}`
                        })
                    }

                    if (myproject.hasOwnProperty("schedulematerials")) {
                        // eslint-disable-next-line
                        myproject.schedulematerials.mymaterial.map(mymaterial => {
                            if (!mymaterial.milestoneid) {
                                errmsg = `${mymaterial.materialid} is missing a milestone `
                            }
                            errmsg += `${validateLaborRate(mymaterial.unitcost)}`
                            errmsg += `${validateLaborRate(mymaterial.quantity)}`
                        })
                    }


                }
            })
        }

        return errmsg;

    }
    async saveallprojects() {
        let providerid = this.props.myusermodel.providerid;
        let projectid = this.props.projectid.projectid;
        let myproject = this.getproject();
        let validateproject = this.validateproject();
        if (!validateproject) {
            let values = { providerid, projectid, myproject }
            let response = await ProviderEndPoint(values);
            console.log(response)
            if (response.hasOwnProperty("projectsprovider")) {
                let updatedproject = response.projectsprovider.myproject[0];
                if (this.props.projectsprovider.hasOwnProperty("length")) {
                    // eslint-disable-next-line
                    this.props.projectsprovider.map((myproject, i) => {
                        if (myproject.projectid === projectid) {
                            this.props.projectsprovider[i] = updatedproject;
                            let obj = this.props.projectsprovider;
                            this.props.projectsProvider(obj)
                            let dateupdated = inputUTCStringForLaborID(response.dateupdated)
                            this.setState({ message: `${response.message} Last Updated ${dateupdated}`, activematerialid: this.searchforactivematerialid(response) })
                        }
                    })
                }
            }
        }
        else {
            this.setState({ message: validateproject })
        }

    }
    searchforactivematerialid(response) {
        let activematerialid = this.state.activematerialid;
        let materialid = "";
        if (activematerialid) {
            let myproject = response.projectsprovider.myproject[0];
            if (myproject.hasOwnProperty("schedulematerials")) {
                // eslint-disable-next-line
                myproject.schedulematerials.mymaterial.map(mymaterial => {
                    if (mymaterial.materialid === activematerialid) {
                        materialid = activematerialid;
                    }
                })
            }
        }

        return materialid;
    }
    getactivemessage() {
        if (this.state.activematerialid) {
            return `The Active Material ID is ${this.state.activematerialid}, update the material`
        }
        else {
            return "";
        }
    }
    render() {
        return (
            <div className="material-container">
                <div className="material-titlerow"> {this.getprojectitle()}<br />Schedule Materials</div>
                <div className="materials-main">{this.handleClearProject()}</div>

                <div className="materials-main">{this.DateIn()} </div>
                <div className="materials-main">
                    <div className="regularFont">Milestone ID</div>
                    <select className="project-field" value={this.getmilestone()} onChange={event => { this.handlemilestone(event.target.value) }}>
                        <option>Select A Milestone </option>
                        {this.loadmilestones()}
                    </select>
                </div>
                <div className="materials-main">
                    Description <br />
                    <input type="text" className="project-field"
                        onChange={event => { this.handledescription(event.target.value) }}
                        value={this.getdescription()} />
                </div>
                <div className="material-element">
                    <input type="text" className="project-field project-field-numeric"
                        onChange={event => { this.handlequantity(event.target.value) }}
                        value={this.getquantity()} /><br /> Quantity
            </div>
                <div className="material-element">
                    <input type="text" className="project-field project-field-numeric"
                        onChange={event => { this.handleunit(event.target.value) }}
                        value={this.getunit()} /><br /> Per Unit  </div>
                <div className="material-element"><input type="text" className="project-field project-field-numeric"
                    onChange={event => { this.handleunitcost(event.target.value) }}
                    value={this.getunitcost()} /><br /> Unit Cost</div>
                <div className="material-element">
                    {this.getamount()}<br />
                    Amount</div>
                <div className="materials-main">{this.state.message} &nbsp; </div>
                <div className="material-titlerow"><button className="general-button saveAllProjectsIcon" onClick={event => { this.saveallprojects() }}>{SaveAllProjectIcon()} </button> </div>
                <div className="materials-main"> {this.handleshowmaterialids()}</div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        projectid: state.projectid,
        projectsprovider: state.projectsprovider
    }
}

export default connect(mapStateToProps, actions)(MyProjectScheduleMaterials)
