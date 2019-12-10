import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import './schedule.css';
import { ProviderEndPoint } from './actions/api'
// eslint-disable-next-line 
import { majorDownIcon, removeIcon, SaveAllProjectIcon, ClearActiveLabor, DateArrowUp, DateArrowDown, editLaborIcon, deleteLaborIcon } from './svg'
import {
    inputDateObjOutputAdjString,
    calculatetotalhours,
    inputUTCStringAddOffsetString,
    ScheduleLabor,
    makeID,
    increaseDateStringByOneMonth,
    addoneMonthDateObj,
    decreaseDateStringByOneMonth,
    subtractMonthDateObj,
    increaseDateStringByOneYear,
    addoneYearDateObj,
    decreaseDateStringByOneYear,
    subtractoneYearDateObj,
    increasedateStringbyInc,
    addincDateObj,
    subtractincDateObj,
    decreasedateStringbyInc,
    inputDateObjOutputString,
    inputTimeInDateStringforPicker,
    inputTimeDateOutputUTCString,
    inputDateTimeOutDateObj,
    inputUTCStringForLaborID,
    toggleAMTimeString,
    toggleAMDateObj,
    calchoursdateobj,
    inputUTCStringForMaterialID,
    validateLaborRate,
    inputDateObjOutputCalendarString,
    AMPMfromTimeIn,
    inputDateSecActiveIDTimein,
    trailingzero,
    check_31,
    check_30,
    check_29_feb_leapyear,
    getOffset,
    inputtimeDBoutputCalendarDaySeconds,
    inputDateObjOutputCalendarDaySeconds,
    inputDateObjandSecReturnObj,
    getFirstIsOn
}
    from './functions';

class MyScheduleLabor extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, activelaborid: '', timein: new Date(), timeout: new Date(new Date().getTime() + (1000 * 60 * 60)), description: "", laborrate: "", message: '', activetimeincalendar: false }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        if (this.props.myusermodel.hasOwnProperty("laborrate")) {
            this.setState({ laborrate: this.props.myusermodel.laborrate })
        }
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
    getextrarow() {
        if (this.state.width < 721) {
            return (<div className="labor-output-row">&nbsp; </div>)
        }
    }
    getmylabor(laborid) {

        let myproject = this.getproject();
        let labor = {};
        if (myproject.hasOwnProperty("schedulelabor")) {
            // eslint-disable-next-line
            myproject.schedulelabor.mylabor.map(mylabor => {
                if (mylabor.laborid === laborid) {

                    labor = mylabor;
                }
            })
        }
        return labor;
    }
    gettimeinmonth() {
        let month = "";
        let datein = {};
        if (this.state.activelaborid) {

            let mylabor = this.getactivelabor();
            datein = new Date(inputUTCStringAddOffsetString(mylabor.timein).replace(/-/g, '/'));
            console.log("MONTHTIMEIN", datein)
        }
        else {
            datein = this.state.timein;
        }

        month = datein.getMonth() + 1;
        if (month < 10) {
            month = `0${month}`
        }
        return `${month}/`;
    }
    gettimeoutmonth() {
        let month = "";
        let datein = {};
        if (this.state.activelaborid) {

            let mylabor = this.getactivelabor();
            datein = new Date(inputUTCStringAddOffsetString(mylabor.timeout).replace(/-/g, '/'));

        }
        else {
            datein = this.state.timeout;
        }

        month = datein.getMonth() + 1;
        if (month < 10) {
            month = `0${month}`
        }
        return `${month}/`;
    }

    gettimeinday() {
        let day = "";
        let datein = {};
        if (this.state.activelaborid) {
            let laborid = this.state.activelaborid;
            let mylabor = this.getmylabor(laborid);

            datein = new Date(inputUTCStringAddOffsetString(mylabor.timein).replace(/-/g, '/'));



        }
        else {
            datein = this.state.timein;
        }
        day = datein.getDate();
        if (day < 10) {
            day = `0${day}`
        }
        return `${day}/`;
    }
    gettimeoutday() {
        let day = "";
        let datein = {};
        if (this.state.activelaborid) {
            let laborid = this.state.activelaborid;
            let mylabor = this.getmylabor(laborid);

            datein = new Date(inputUTCStringAddOffsetString(mylabor.timeout).replace(/-/g, '/'));

        }
        else {
            datein = this.state.timeout;
        }
        day = datein.getDate();
        if (day < 10) {
            day = `0${day}`
        }
        return `${day}/`;
    }

    gettimeoutyear() {
        let year = "";
        let datein = {};
        if (this.state.activelaborid) {
            let laborid = this.state.activelaborid;
            let mylabor = this.getmylabor(laborid);

            datein = new Date(inputUTCStringAddOffsetString(mylabor.timeout).replace(/-/g, '/'));

        }
        else {
            datein = this.state.timeout;
        }
        year = datein.getFullYear();
        let century = Math.floor(year / 100) * 100;
        year = year - century;
        return year;
    }

    gettimeinyear() {
        let year = "";
        let datein = {};
        if (this.state.activelaborid) {
            let laborid = this.state.activelaborid;
            let mylabor = this.getmylabor(laborid);

            datein = new Date(inputUTCStringAddOffsetString(mylabor.timein).replace(/-/g, '/'));



        }
        else {
            datein = this.state.timein;
        }
        year = datein.getFullYear();
        let century = Math.floor(year / 100) * 100;
        year = year - century;
        return year;
    }
    gettimeinhours() {
        let hours = "";
        let datein = {};
        if (this.state.activelaborid) {
            let laborid = this.state.activelaborid;
            let mylabor = this.getmylabor(laborid);

            datein = new Date(inputUTCStringAddOffsetString(mylabor.timein).replace(/-/g, '/'));

        }
        else {
            datein = this.state.timein;
        }
        hours = datein.getHours();
        if (hours > 12) {
            hours = hours - 12;
        }
        else if (hours === 0) {
            hours = 12;
        }


        return `${hours}:`;
    }
    gettimeouthours() {
        let hours = "";
        let datein = {};
        if (this.state.activelaborid) {
            let laborid = this.state.activelaborid;
            let mylabor = this.getmylabor(laborid);

            datein = new Date(inputUTCStringAddOffsetString(mylabor.timeout).replace(/-/g, '/'));

        }
        else {
            datein = this.state.timeout;
        }
        hours = datein.getHours();
        if (hours > 12) {
            hours = hours - 12;
        }
        else if (hours === 0) {
            hours = 12;
        }

        return `${hours}:`;
    }
    gettimeinminutes() {
        let minutes = "";
        let datein = {};
        if (this.state.activelaborid) {
            let laborid = this.state.activelaborid;
            let mylabor = this.getmylabor(laborid);

            datein = new Date(inputUTCStringAddOffsetString(mylabor.timein).replace(/-/g, '/'));



        }
        else {
            datein = this.state.timein;
        }
        minutes = datein.getMinutes();
        if (minutes < 10) {
            minutes = `0${minutes}`
        }
        return minutes;
    }
    gettimeoutminutes() {
        let minutes = "";
        let datein = {};
        if (this.state.activelaborid) {
            let laborid = this.state.activelaborid;
            let mylabor = this.getmylabor(laborid);

            datein = new Date(inputUTCStringAddOffsetString(mylabor.timeout).replace(/-/g, '/'));



        }
        else {
            datein = this.state.timeout;
        }
        minutes = datein.getMinutes();
        if (minutes < 10) {
            minutes = `0${minutes}`
        }
        return minutes;
    }
    checkampmtimein(dir) {
        let validate = true;
        let timein = this.getactivelabor().timein;
        let ampm = AMPMfromTimeIn(timein)
        if (ampm === "PM" && dir === "up") {
            validate = false;
        } else if (ampm === "AM" && dir === "down") {
            validate = false;
        }
        return validate;
    }
    toggletimeinampm(dir) {

        if (this.state.activelaborid) {
            let validate = this.checkampmtimein(dir);
            if (validate) {
                let laborid = this.state.activelaborid;
                let mylabor = this.getactivelabor();
                let timein = mylabor.timein;
                timein = toggleAMTimeString(mylabor.timein)
                if (this.props.projectsprovider.hasOwnProperty("length")) {
                    let projectid = this.props.projectid.projectid;
                    // eslint-disable-next-line
                    this.props.projectsprovider.map((myproject, i) => {
                        if (myproject.projectid === projectid) {
                            if (myproject.hasOwnProperty("schedulelabor")) {
                                // eslint-disable-next-line
                                myproject.schedulelabor.mylabor.map((mylabor, j) => {
                                    if (mylabor.laborid === laborid) {
                                        this.props.projectsprovider[i].schedulelabor.mylabor[j].timein = timein;
                                        let obj = this.props.projectsprovider;
                                        this.props.projectsProvider(obj)
                                        this.setState({ render: 'render' })
                                    }
                                })
                            }
                        }
                    })
                }

            }// if validate

        }
        else {
            let datein = toggleAMDateObj(this.state.timein)
            this.setState({ timein: datein })
        }

    }
    gettimeinampm() {
        let ampm = "";
        let datein = {};
        if (this.state.activelaborid) {
            let laborid = this.state.activelaborid;
            let mylabor = this.getmylabor(laborid);

            datein = new Date(inputUTCStringAddOffsetString(mylabor.timein).replace(/-/g, '/'));

        }
        else {
            datein = this.state.timein;

        }
        let hours = datein.getHours();
        if (hours >= 12) {
            ampm = "PM"
        }
        else {
            ampm = "AM"
        }
        return ampm;
    }
    gettimeoutampm() {
        let ampm = "";
        let datein = {};
        if (this.state.activelaborid) {
            let laborid = this.state.activelaborid;
            let mylabor = this.getmylabor(laborid);

            datein = new Date(inputUTCStringAddOffsetString(mylabor.timeout).replace(/-/g, '/'));

        }
        else {
            datein = this.state.timeout;

        }
        let hours = datein.getHours();
        if (hours >= 12) {
            ampm = "PM"
        }
        else {
            ampm = "AM"
        }
        return ampm;
    }
    checkampmtimeout(dir) {
        let validate = true;
        let timeout = this.getactivelabor().timeout;
        let ampm = AMPMfromTimeIn(timeout)
        if (ampm === "PM" && dir === "up") {
            validate = false;
        } else if (ampm === "AM" && dir === "down") {
            validate = false;
        }
        return validate;
    }

    toggletimeoutampm(dir) {

        if (this.state.activelaborid) {
            let validate = this.checkampmtimeout(dir);
            if (validate) {
                let laborid = this.state.activelaborid;
                let mylabor = this.getactivelabor();
                let timeout = mylabor.timeout;
                timeout = toggleAMTimeString(mylabor.timeout)
                if (this.props.projectsprovider.hasOwnProperty("length")) {
                    let projectid = this.props.projectid.projectid;
                    // eslint-disable-next-line
                    this.props.projectsprovider.map((myproject, i) => {
                        if (myproject.projectid === projectid) {
                            if (myproject.hasOwnProperty("schedulelabor")) {
                                // eslint-disable-next-line
                                myproject.schedulelabor.mylabor.map((mylabor, j) => {
                                    if (mylabor.laborid === laborid) {
                                        this.props.projectsprovider[i].schedulelabor.mylabor[j].timeout = timeout;
                                        let obj = this.props.projectsprovider;
                                        this.props.projectsProvider(obj)
                                        this.setState({ render: 'render' })
                                    }
                                })
                            }
                        }
                    })
                }

            }// if validate

        }
        else {
            let datein = toggleAMDateObj(this.state.timeout)
            this.setState({ timeout: datein })
        }

    }
    increasetimeinbyinc(event, inc) {
        if (this.state.activelaborid) {
            let laborid = this.state.activelaborid;
            let mylabor = this.getmylabor(laborid)
            let newtimein = increasedateStringbyInc(mylabor.timein, inc);
            if (this.props.projectsprovider.hasOwnProperty("length")) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    if (myproject.projectid === projectid) {

                        if (myproject.hasOwnProperty("schedulelabor")) {
                            // eslint-disable-next-line
                            myproject.schedulelabor.mylabor.map((mylabor, j) => {
                                if (mylabor.laborid === laborid) {
                                    this.props.projectsprovider[i].schedulelabor.mylabor[j].timein = newtimein
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
            let newDate = addincDateObj(this.state.timein, inc)
            this.setState({ timein: newDate })
        }
    }
    decreasetimeinbyinc(event, inc) {
        if (this.state.activelaborid) {
            let laborid = this.state.activelaborid;
            let mylabor = this.getmylabor(laborid)
            let newtimein = decreasedateStringbyInc(mylabor.timein, inc);
            if (this.props.projectsprovider.hasOwnProperty("length")) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    if (myproject.projectid === projectid) {

                        if (myproject.hasOwnProperty("schedulelabor")) {
                            // eslint-disable-next-line
                            myproject.schedulelabor.mylabor.map((mylabor, j) => {
                                if (mylabor.laborid === laborid) {
                                    this.props.projectsprovider[i].schedulelabor.mylabor[j].timein = newtimein
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
            let newDate = subtractincDateObj(this.state.timein, inc)
            this.setState({ timein: newDate })
        }
    }
    timeinmonthup(event) {
        if (this.state.activelaborid) {
            let laborid = this.state.activelaborid;
            let mylabor = this.getmylabor(laborid)
            let newtimein = increaseDateStringByOneMonth(mylabor.timein);
            if (this.props.projectsprovider.hasOwnProperty("length")) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    if (myproject.projectid === projectid) {

                        if (myproject.hasOwnProperty("schedulelabor")) {
                            // eslint-disable-next-line
                            myproject.schedulelabor.mylabor.map((mylabor, j) => {
                                if (mylabor.laborid === laborid) {
                                    this.props.projectsprovider[i].schedulelabor.mylabor[j].timein = newtimein
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
            let newDate = addoneMonthDateObj(this.state.timein);
            this.setState({ timein: newDate })
        }
    }
    timeinmonthdown(event) {
        if (this.state.activelaborid) {
            let laborid = this.state.activelaborid;
            let mylabor = this.getmylabor(laborid)
            let newtimein = decreaseDateStringByOneMonth(mylabor.timein);
            if (this.props.projectsprovider.hasOwnProperty("length")) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    if (myproject.projectid === projectid) {

                        if (myproject.hasOwnProperty("schedulelabor")) {
                            // eslint-disable-next-line
                            myproject.schedulelabor.mylabor.map((mylabor, j) => {
                                if (mylabor.laborid === laborid) {
                                    this.props.projectsprovider[i].schedulelabor.mylabor[j].timein = newtimein
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
            let newDate = subtractMonthDateObj(this.state.timein);
            this.setState({ timein: newDate })
        }
    }
    timeinyearup(event) {
        if (this.state.activelaborid) {
            let laborid = this.state.activelaborid;
            let mylabor = this.getmylabor(laborid)
            let newtimein = increaseDateStringByOneYear(mylabor.timein);
            if (this.props.projectsprovider.hasOwnProperty("length")) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    if (myproject.projectid === projectid) {

                        if (myproject.hasOwnProperty("schedulelabor")) {
                            // eslint-disable-next-line
                            myproject.schedulelabor.mylabor.map((mylabor, j) => {
                                if (mylabor.laborid === laborid) {
                                    this.props.projectsprovider[i].schedulelabor.mylabor[j].timein = newtimein
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
            let newDate = addoneYearDateObj(this.state.timein);
            this.setState({ timein: newDate })
        }
    }

    timeinyeardown(event) {
        if (this.state.activelaborid) {
            let laborid = this.state.activelaborid;
            let mylabor = this.getmylabor(laborid)
            let newtimein = decreaseDateStringByOneYear(mylabor.timein);
            if (this.props.projectsprovider.hasOwnProperty("length")) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    if (myproject.projectid === projectid) {

                        if (myproject.hasOwnProperty("schedulelabor")) {
                            // eslint-disable-next-line
                            myproject.schedulelabor.mylabor.map((mylabor, j) => {
                                if (mylabor.laborid === laborid) {
                                    this.props.projectsprovider[i].schedulelabor.mylabor[j].timein = newtimein
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
            let newDate = subtractoneYearDateObj(this.state.timein);
            this.setState({ timein: newDate })
        }
    }

    decreasetimeoutbyinc(event, inc) {
        if (this.state.activelaborid) {
            let laborid = this.state.activelaborid;
            let mylabor = this.getmylabor(laborid)
            let newtimeout = decreasedateStringbyInc(mylabor.timeout, inc);
            if (this.props.projectsprovider.hasOwnProperty("length")) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    if (myproject.projectid === projectid) {

                        if (myproject.hasOwnProperty("schedulelabor")) {
                            // eslint-disable-next-line
                            myproject.schedulelabor.mylabor.map((mylabor, j) => {
                                if (mylabor.laborid === laborid) {
                                    this.props.projectsprovider[i].schedulelabor.mylabor[j].timeout = newtimeout
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
            let newDate = subtractincDateObj(this.state.timeout, inc)
            this.setState({ timeout: newDate })
        }
    }
    increasetimeoutbyinc(event, inc) {
        if (this.state.activelaborid) {
            let laborid = this.state.activelaborid;
            let mylabor = this.getmylabor(laborid)
            let newtimeout = increasedateStringbyInc(mylabor.timeout, inc);
            if (this.props.projectsprovider.hasOwnProperty("length")) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    if (myproject.projectid === projectid) {

                        if (myproject.hasOwnProperty("schedulelabor")) {
                            // eslint-disable-next-line
                            myproject.schedulelabor.mylabor.map((mylabor, j) => {
                                if (mylabor.laborid === laborid) {
                                    this.props.projectsprovider[i].schedulelabor.mylabor[j].timeout = newtimeout
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
            let newDate = addincDateObj(this.state.timeout, inc)
            this.setState({ timeout: newDate })
        }
    }

    timeoutyeardown(event) {
        if (this.state.activelaborid) {
            let laborid = this.state.activelaborid;
            let mylabor = this.getmylabor(laborid)
            let newtimeout = decreaseDateStringByOneYear(mylabor.timeout);
            if (this.props.projectsprovider.hasOwnProperty("length")) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    if (myproject.projectid === projectid) {

                        if (myproject.hasOwnProperty("schedulelabor")) {
                            // eslint-disable-next-line
                            myproject.schedulelabor.mylabor.map((mylabor, j) => {
                                if (mylabor.laborid === laborid) {
                                    this.props.projectsprovider[i].schedulelabor.mylabor[j].timeout = newtimeout
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
            let newDate = subtractoneYearDateObj(this.state.timeout);
            this.setState({ timeout: newDate })
        }
    }
    timeoutyearup(event) {
        if (this.state.activelaborid) {
            let laborid = this.state.activelaborid;
            let mylabor = this.getmylabor(laborid)
            let newtimeout = increaseDateStringByOneYear(mylabor.timeout);
            if (this.props.projectsprovider.hasOwnProperty("length")) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    if (myproject.projectid === projectid) {

                        if (myproject.hasOwnProperty("schedulelabor")) {
                            // eslint-disable-next-line
                            myproject.schedulelabor.mylabor.map((mylabor, j) => {
                                if (mylabor.laborid === laborid) {
                                    this.props.projectsprovider[i].schedulelabor.mylabor[j].timeout = newtimeout
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
            let newDate = addoneYearDateObj(this.state.timeout);
            this.setState({ timeout: newDate })
        }
    }
    timeoutmonthup(event) {
        if (this.state.activelaborid) {
            let laborid = this.state.activelaborid;
            let mylabor = this.getmylabor(laborid)
            let newtimeout = increaseDateStringByOneMonth(mylabor.timeout);
            if (this.props.projectsprovider.hasOwnProperty("length")) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    if (myproject.projectid === projectid) {

                        if (myproject.hasOwnProperty("schedulelabor")) {
                            // eslint-disable-next-line
                            myproject.schedulelabor.mylabor.map((mylabor, j) => {
                                if (mylabor.laborid === laborid) {
                                    this.props.projectsprovider[i].schedulelabor.mylabor[j].timeout = newtimeout
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
            let newDate = addoneMonthDateObj(this.state.timeout);
            this.setState({ timeout: newDate })
        }
    }

    timeoutmonthdown(event) {
        if (this.state.activelaborid) {
            let laborid = this.state.activelaborid;
            let mylabor = this.getmylabor(laborid)
            let newtimeout = decreaseDateStringByOneMonth(mylabor.timeout);
            if (this.props.projectsprovider.hasOwnProperty("length")) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    if (myproject.projectid === projectid) {

                        if (myproject.hasOwnProperty("schedulelabor")) {
                            // eslint-disable-next-line
                            myproject.schedulelabor.mylabor.map((mylabor, j) => {
                                if (mylabor.laborid === laborid) {
                                    this.props.projectsprovider[i].schedulelabor.mylabor[j].timeout = newtimeout
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
            let newDate = subtractMonthDateObj(this.state.timeout);
            this.setState({ timeout: newDate })
        }
    }
    gettimein() {
        let timein = "";
        if (this.state.activelaborid) {
            let laborid = this.state.activelaborid;
            let mylabor = this.getmylabor(laborid);
            timein = inputTimeInDateStringforPicker(mylabor.timein);
        }
        else {
            timein = inputDateObjOutputString(this.state.timein);
        }
        return timein;
    }
    handletimein(value) {
        if (this.state.activelaborid) {
            let laborid = this.state.activelaborid;

            let timein = inputTimeDateOutputUTCString(value);
            if (this.props.projectsprovider.hasOwnProperty("length")) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    if (myproject.projectid === projectid) {

                        if (myproject.hasOwnProperty("schedulelabor")) {
                            // eslint-disable-next-line
                            myproject.schedulelabor.mylabor.map((mylabor, j) => {
                                if (mylabor.laborid === laborid) {
                                    this.props.projectsprovider[i].schedulelabor.mylabor[j].timein = timein;
                                    let obj = this.props.projectsprovider;
                                    this.props.projectsProvider(obj);
                                    this.setState({ render: 'render' });

                                }
                            });
                        }

                    }
                });
            }
        }
        else {
            let timein = inputDateTimeOutDateObj(value);
            this.setState({ timein })
        }

    }
    gettimeout() {
        let timeout = "";
        if (this.state.activelaborid) {
            let laborid = this.state.activelaborid;
            let mylabor = this.getmylabor(laborid);
            timeout = inputTimeInDateStringforPicker(mylabor.timeout);
        }
        else {
            timeout = inputDateObjOutputString(this.state.timeout);
        }
        return timeout;
    }
    handletimeout(value) {
        if (this.state.activelaborid) {
            let laborid = this.state.activelaborid;

            let timeout = inputTimeDateOutputUTCString(value);
            if (this.props.projectsprovider.hasOwnProperty("length")) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    if (myproject.projectid === projectid) {

                        if (myproject.hasOwnProperty("schedulelabor")) {
                            // eslint-disable-next-line
                            myproject.schedulelabor.mylabor.map((mylabor, j) => {
                                if (mylabor.laborid === laborid) {
                                    this.props.projectsprovider[i].schedulelabor.mylabor[j].timeout = timeout;
                                    let obj = this.props.projectsprovider;
                                    this.props.projectsProvider(obj);
                                    this.setState({ render: 'render' });

                                }
                            });
                        }

                    }
                });
            }
        }
        else {
            let timeout = inputDateTimeOutDateObj(value);
            this.setState({ timeout })
        }

    }
    handleshowlaborid() {
        let laborid = [];
        let myproject = this.getproject();
        if (myproject.hasOwnProperty("schedulelabor")) {
            // eslint-disable-next-line
            myproject.schedulelabor.mylabor.map(mylabor => {
                laborid.push(this.showlaborid(mylabor))
            })
        }
        return laborid;
    }
    findlabor(laborid) {
        this.setState({ activelaborid: laborid, message: `Active Labor ID is ${laborid}, Update Labor ID` })

    }
    handleDelete(event, laborid) {
        if (window.confirm(`Are you sure you want to delete labor id ${laborid}`) === true) {
            if (this.props.projectsprovider.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    let projectid = this.props.projectid.projectid;
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("schedulelabor")) {
                            // eslint-disable-next-line
                            myproject.schedulelabor.mylabor.map((mylabor, j) => {
                                if (mylabor.laborid === laborid) {
                                    this.props.projectsprovider[i].schedulelabor.mylabor.splice(j, 1);
                                    let obj = this.props.projectsprovider;
                                    this.props.projectsProvider(obj);
                                    this.clearlaborid();
                                }
                            })
                        }
                    }
                })
            }

        }
    }
    getactivelaborid(laborid) {
        if (laborid === this.state.activelaborid) {
            return `activelaborid`
        } else {
            return;
        }
    }
    showlaborid(mylabor) {
        return (
            <div className="general-flex">
                <div className="flex-7" onClick={event => { this.findlabor(mylabor.laborid) }}>
                    <span className="regularFont">{mylabor.description}</span> <br />
                    <span className="regularFont">From {inputUTCStringForLaborID(mylabor.timein)} to {inputUTCStringForLaborID(mylabor.timeout)}</span><br />
                    <span className="regularFont">${Number(mylabor.laborrate).toFixed(2)}/Hr x {calculatetotalhours(mylabor.timeout, mylabor.timein)} Hrs = ${(Number(calculatetotalhours(mylabor.timeout, mylabor.timein)) * Number(mylabor.laborrate)).toFixed(2)}</span>
                </div>
                <div className="flex-1 align-contentCenter">
                    <button className="btn-removeIcon general-button" onClick={event => { this.handleDelete(event, mylabor.laborid) }}>
                        {removeIcon()}
                    </button>

                </div>

            </div>
        )

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
    getactivelabor() {
        let labor = {}
        if (this.state.activelaborid) {
            let laborid = this.state.activelaborid;
            let myproject = this.getproject();
            if (myproject.hasOwnProperty("schedulelabor")) {
                // eslint-disable-next-line
                myproject.schedulelabor.mylabor.map((mylabor, i) => {
                    if (mylabor.laborid === laborid) {
                        labor = mylabor;
                    }
                })
            }
        }
        return labor;
    }
    getactivelaborkey() {
        let key = "";
        if (this.state.activelaborid) {
            let laborid = this.state.activelaborid;
            let myproject = this.getproject();
            if (myproject.hasOwnProperty("schedulelabor")) {
                // eslint-disable-next-line
                myproject.schedulelabor.mylabor.map((mylabor, i) => {
                    if (mylabor.laborid === laborid) {
                        key = i;
                    }
                })
            }
        }
        return key;
    }
    getprojectkey() {
        let projectid = this.props.projectid.projectid;
        let key = false;
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projects.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        key = i;
                    }
                })
            }
        }
        if (!key) {
            if (this.props.projectsprovider) {
                if (this.props.projectsprovider.hasOwnProperty("length")) {
                    // eslint-disable-next-line
                    this.props.projectsprovider.map((myproject, i) => {
                        if (myproject.projectid === projectid) {
                            key = i;
                        }
                    })
                }
            }
        }

        return key;
    }
    clearlaborid() {
        let laborrate = "";
        if (this.props.myusermodel.hasOwnProperty("laborrate")) {
            laborrate = this.props.myusermodel.laborrate;
        }
        this.setState({
            activelaborid: false,
            timein: new Date(),
            timeout: new Date(new Date().getTime() + (1000 * 60 * 60)),
            laborrate,
            message: "Active Labor ID is clear, Type a Description to Create One",
            milestoneid: "",
            description: ""
        })
    }
    handleClearProject() {
        if (this.state.activelaborid) {
            let mylabor = this.getactivelabor();
            return (
                <div className="general-flex">
                    <div className="regualrFont flex-1 align-contentCenter">
                        <span className="regularFont">{`Active Labor ID is ${mylabor.description}`}</span><br />
                        <button className="general-button btn-clearlaborid" onClick={event => { this.clearlaborid(event) }}>{ClearActiveLabor()} </button>
                    </div>
                </div>
            )
        }
        else {
            return (<span>&nbsp;</span>)
        }
    }
    handledescription(description) {

        if (this.state.activelaborid) {
            let laborid = this.state.activelaborid;
            if (this.props.projectsprovider.hasOwnProperty("length")) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("schedulelabor")) {
                            // eslint-disable-next-line
                            myproject.schedulelabor.mylabor.map((mylabor, j) => {
                                if (mylabor.laborid === laborid) {
                                    this.props.projectsprovider[i].schedulelabor.mylabor[j].description = description;
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
            this.setState({ description })
            let providerid = this.props.myusermodel.providerid;
            let laborid = makeID(8)
            let milestoneid = this.state.milestoneid;
            let laborrate = this.state.laborrate;
            let timein = inputDateObjOutputAdjString(this.state.timein);
            let timeout = inputDateObjOutputAdjString(this.state.timeout);
            let proposalid = "";
            let mylabor = ScheduleLabor(providerid, description, laborid, milestoneid, laborrate, timein, timeout, proposalid)

            if (this.props.projectsprovider.hasOwnProperty("length")) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("schedulelabor")) {
                            this.props.projectsprovider[i].schedulelabor.mylabor.push(mylabor)
                            let obj = this.props.projectsprovider;
                            this.props.projectsProvider(obj)
                        }
                        else {
                            let schedulelabor = { mylabor: [mylabor] }
                            this.props.projectsprovider[i].schedulelabor = schedulelabor;
                            let obj = this.props.projectsprovider;
                            this.props.projectsProvider(obj)

                        }
                        this.setState({ message: `Active Labor ID is ${laborid}`, activelaborid: laborid })
                    }
                })
            }

        }

    }
    getdescription() {
        let description = "";
        if (this.state.activelaborid) {
            let laborid = this.state.activelaborid;
            let myproject = this.getproject();
            if (myproject.hasOwnProperty("schedulelabor")) {
                //eslint-disable-next-line
                myproject.schedulelabor.mylabor.map(mylabor => {
                    if (mylabor.laborid === laborid) {
                        description = mylabor.description;
                    }
                })
            }
        }
        else {
            description = this.state.description; // create new item and make it active
        }
        return description;
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
    getmilestone() {
        let milestoneid = "";
        if (this.state.activelaborid) {
            let laborid = this.state.activelaborid;
            let mylabor = this.getmylabor(laborid);
            milestoneid = mylabor.milestoneid;


        }
        else {
            milestoneid = this.state.milestoneid;
        }
        return milestoneid;
    }
    handlemilestone(milestoneid) {
        if (this.state.activelaborid) {
            let laborid = this.state.activelaborid;
            if (this.props.projectsprovider.hasOwnProperty("length")) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("schedulelabor")) {
                            // eslint-disable-next-line
                            myproject.schedulelabor.mylabor.map((mylabor, j) => {
                                if (mylabor.laborid === laborid) {
                                    this.props.projectsprovider[i].schedulelabor.mylabor[j].milestoneid = milestoneid;
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
            this.setState({ milestoneid })
            let providerid = this.props.myusermodel.providerid;
            let laborid = makeID(8)
            let description = this.state.description;
            let laborrate = this.state.laborrate;

            let timein = inputDateObjOutputAdjString(this.state.timein);
            let timeout = inputDateObjOutputAdjString(this.state.timeout);
            let proposalid = "";
            let mylabor = ScheduleLabor(providerid, description, laborid, milestoneid, laborrate, timein, timeout, proposalid)

            if (this.props.projectsprovider.hasOwnProperty("length")) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("schedulelabor")) {
                            this.props.projectsprovider[i].schedulelabor.mylabor.push(mylabor)
                            let obj = this.props.projectsprovider;
                            this.props.projectsProvider(obj)
                        }
                        else {
                            let schedulelabor = { mylabor: [mylabor] }
                            this.props.projectsprovider[i].schedulelabor = schedulelabor;
                            let obj = this.props.projectsprovider;
                            this.props.projectsProvider(obj)

                        }
                        this.setState({ message: `Active Labor ID is ${laborid}`, activelaborid: laborid })
                    }
                })
            }

        }
    }
    getlaborrate() {
        let laborrate = "";
        if (this.state.activelaborid) {
            let laborid = this.state.activelaborid;
            let mylabor = this.getmylabor(laborid)
            laborrate = mylabor.laborrate;
        }
        else {
            laborrate = this.state.laborrate;
        }
        return laborrate;
    }
    handlelaborrate(value) {
        if (this.state.activelaborid) {
            let laborid = this.state.activelaborid;
            if (this.props.projectsprovider.hasOwnProperty("length")) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("schedulelabor")) {
                            // eslint-disable-next-line
                            myproject.schedulelabor.mylabor.map((mylabor, j) => {
                                if (mylabor.laborid === laborid) {
                                    this.props.projectsprovider[i].schedulelabor.mylabor[j].laborrate = value;
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
            this.setState({ laborrate: value })
            let providerid = this.props.myusermodel.providerid;
            let laborid = makeID(8)
            let description = this.state.description;
            let milestoneid = this.state.milestoneid;
            let laborrate = value;
            let timein = inputDateObjOutputAdjString(this.state.timein);
            let timeout = inputDateObjOutputAdjString(this.state.timeout);
            let proposalid = "";
            let mylabor = ScheduleLabor(providerid, description, laborid, milestoneid, laborrate, timein, timeout, proposalid)

            if (this.props.projectsprovider.hasOwnProperty("length")) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("schedulelabor")) {
                            this.props.projectsprovider[i].schedulelabor.mylabor.push(mylabor)
                            let obj = this.props.projectsprovider;
                            this.props.projectsProvider(obj)
                        }
                        else {
                            let schedulelabor = { mylabor: [mylabor] }
                            this.props.projectsprovider[i].schedulelabor = schedulelabor;
                            let obj = this.props.projectsprovider;
                            this.props.projectsProvider(obj)

                        }
                        this.setState({ message: `Active Labor ID is ${laborid}`, activelaborid: laborid })
                    }
                })
            }

        }




    }
    showtotalhours() {
        let totalhours = 0;
        if (this.state.activelaborid) {
            let laborid = this.state.activelaborid;
            let mylabor = this.getmylabor(laborid);

            totalhours = calculatetotalhours(mylabor.timeout, mylabor.timein)
        }
        else {
            let datein = this.state.timein;
            let dateout = this.state.timeout;
            totalhours = (calchoursdateobj(dateout, datein)).toFixed(2)
        }
        return totalhours;
    }
    showamount() {
        let amount = 0;
        let totalhours = 0;
        let laborrate = 0;
        if (this.state.activelaborid) {
            let laborid = this.state.activelaborid;
            let mylabor = this.getmylabor(laborid);
            totalhours = calculatetotalhours(mylabor.timeout, mylabor.timein)
            amount = (Number(mylabor.laborrate) * Number(totalhours)).toFixed(2)
        }
        else {
            let datein = this.state.timein;
            let dateout = this.state.timeout;
            totalhours = (calchoursdateobj(dateout, datein)).toFixed(2)
            laborrate = this.state.laborrate;
            amount = (totalhours * laborrate).toFixed(2)
        }

        return amount;
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
                                errmsg = `${mymaterial.matieralid} is missing a milestone `

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
        let errmsg = this.validateproject();
        if (!errmsg) {
            let providerid = this.props.myusermodel.providerid;
            let projectid = this.props.projectid.projectid;
            let myproject = this.getproject()

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
                            let dateupdated = inputUTCStringForLaborID(response.dateupdated)
                            this.props.projectsProvider(obj);
                            this.setState({ message: `${response.message} Last Updated  ${dateupdated}`, activelaborid: this.searchresponseforactiveid(response) })
                        }
                    })
                }
            }
        }
        else {
            this.setState({ message: errmsg })
        }
    }
    searchresponseforactiveid(response) {
        let activelaborid = this.state.activelaborid;
        let laborid = "";
        if (this.state.activelaborid) {
            let myproject = response.projectsprovider.myproject[0];
            if (myproject.hasOwnProperty("schedulelabor")) {
                // eslint-disable-next-line
                myproject.schedulelabor.mylabor.map(mylabor => {
                    if (mylabor.laborid === activelaborid) {
                        laborid = activelaborid;
                    }
                })
            }



        }

        return laborid;
    }
    getactivemessage() {
        if (this.state.activelaborid) {
            return `The Active Labor ID is ${this.state.activelaborid}, Update Labor ID`
        }
        else {
            return "";
        }
    }
    timeinheader() {
        let mylabor = {};
        if (this.state.activelaborid) {
            mylabor = this.getactivelabor();
            return (`Time In ${inputUTCStringForLaborID(mylabor.timein)}`)
        } else {
            return (`Time In ${inputDateObjOutputCalendarString(this.state.timein)}`)
        }

    }
    showcalendartimein() {
        let datein = {};
        console.log("SHOWCALENDARTIMEIN")
        if (this.state.activelaborid) {
            let timein = this.getactivelabor().timein;
            datein = inputDateTimeOutDateObj(timein)
        } else {
            datein = this.state.timein;
        }

        return (this.showcalender(datein))
    }
    activetimeincalendar() {
        let activetimeincalendar = this.state.activetimeincalendar;
        if (activetimeincalendar) {
            activetimeincalendar = false;
        } else {
            activetimeincalendar = true;
        }
        this.setState({ activetimeincalendar })
    }
    handlecalendartimein() {
        if (this.state.activetimeincalendar) {
            return (<div className="general-flex">
                <div className="flex-1 calendar-container">
                    {this.showcalendartimein()}

                </div>
            </div>)
        } else {
            return;
        }
    }
    showtimein() {

        return (
            <div className="general-flex">
                <div className="flex-1">

                    <div className="general-flex">
                        <div className="flex-1">

                            <div className="general-flex">
                                <div className="flex-3 timedisplay-container regularFont">
                                    {this.timeinheader()}
                                </div>
                                <div className="flex-1 timedisplay-container align-contentCenter">
                                    <button className="general-button majorDownIcon" onClick={() => { this.activetimeincalendar() }}>{majorDownIcon()}</button>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="general-flex">
                        <div className="flex-1 showBorder timecell-container">

                            <div className="timecell-module showBorder align-contentCenter">
                                <button className="general-button time-button" onClick={event => { this.timeinmonthup(event) }}>{DateArrowUp()}</button>
                            </div>
                            <div className="timecell-module showBorder align-contentCenter">
                                <input type="text" className="timeinput-field align-contentCenter titleFont" value={this.gettimeinmonth()} />
                            </div>
                            <div className="timecell-module showBorder align-contentCenter">
                                <button className="general-button time-button" onClick={event => { this.timeinmonthdown(event) }}> {DateArrowDown()}</button>
                            </div>

                        </div>

                        <div className="flex-1 showBorder timecell-container align-contentCenter">
                            <div className="timecell-module showBorder">
                                <button className="general-button time-button" onClick={event => { this.increasetimeinbyinc(event, (1000 * 60 * 60 * 24)) }}>{DateArrowUp()}</button>
                            </div>
                            <div className="timecell-module showBorder align-contentCenter">
                                <input type="text" className="timeinput-field align-contentCenter titleFont" value={this.gettimeinday()} />
                            </div>
                            <div className="timecell-module showBorder align-contentCenter">
                                <button className="general-button time-button" onClick={event => { this.decreasetimeinbyinc(event, (1000 * 60 * 60 * 24)) }}> {DateArrowDown()}</button>
                            </div>

                        </div>
                        <div className="flex-1 showBorder timecell-container align-contentCenter">
                            <div className="timecell-module showBorder">
                                <button className="time-button general-button" onClick={event => { this.timeinyearup(event) }}>{DateArrowUp()}</button>
                            </div>
                            <div className="timecell-module showBorder align-contentCenter">
                                <input type="text" className="timeinput-field align-contentCenter titleFont" value={this.gettimeinyear()} />
                            </div>
                            <div className="timecell-module showBorder align-contentCenter">
                                <button className="time-button general-button" onClick={event => { this.timeinyeardown(event) }}> {DateArrowDown()}</button>
                            </div>
                        </div>

                        <div className="flex-1 showBorder timecell-container">
                            <div className="timecell-module showBorder align-contentCenter">
                                <button className="time-button general-button align-contentCenter" onClick={event => { this.increasetimeinbyinc(event, (1000 * 60 * 60)) }}>{DateArrowUp()}</button>
                            </div>
                            <div className="timecell-module showBorder align-contentCenter">
                                <input type="text" className="timeinput-field align-contentCenter titleFont" value={this.gettimeinhours()} />
                            </div>
                            <div className="timecell-module showBorder align-contentCenter">
                                <button className="time-button general-button align-contentCenter" onClick={event => { this.decreasetimeinbyinc(event, (1000 * 60 * 60)) }}> {DateArrowDown()}</button>
                            </div>
                        </div>

                        <div className="flex-1 showBorder timecell-container">
                            <div className="timecell-module showBorder align-contentCenter">
                                <button className="time-button general-button align-contentCenter" onClick={event => { this.increasetimeinbyinc(event, (1000 * 60)) }}>{DateArrowUp()}</button>
                            </div>
                            <div className="timecell-module showBorder align-contentCenter">
                                <input type="text" className="timeinput-field align-contentCenter titleFont" value={this.gettimeinminutes()} />
                            </div>
                            <div className="timecell-module showBorder align-contentCenter">
                                <button className="time-button general-button align-contentCenter" onClick={event => { this.decreasetimeinbyinc(event, (1000 * 60)) }} > {DateArrowDown()}</button>
                            </div>
                        </div>
                        <div className="flex-1 showBorder timecell-container align-contentCenter">
                            <div className="timecell-module showBorder align-contentCenter">
                                <button className="time-button general-button align-contentCenter" onClick={() => { this.toggletimeinampm("up") }}>{DateArrowUp()}</button>
                            </div>
                            <div className="timecell-module showBorder align-contentCenter">
                                <input type="text" className="timeinput-field align-contentCenter titleFont" value={this.gettimeinampm()} />
                            </div>
                            <div className="timecell-module showBorder align-contentCenter">
                                <button className="time-button general-button align-contentCenter" onClick={() => { this.toggletimeinampm("down") }}> {DateArrowDown()}</button>
                            </div>
                        </div>
                    </div>

                    {this.handlecalendartimein()}


                </div>
            </div>
        )
    }
    showcalender(datein) {

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
        return (<div className="laborcalendar-grid">
            {gridcalender}
        </div>)
    }
    showdatetimeout(dateobj, day) {

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
                className={`${this.getactivedatetimeout(dateencoded)} calendar-date`}
                onClick={event => { this.setDayTimeout(dateencoded) }}
            > {day}</div>)
        }
        return showday;
    }

    setDayTimeout(dateencoded) {
        if (this.state.activelaborid) {

            let mylabor = this.getactivelabor();
            let laborid = mylabor.laborid;
            let timeout = mylabor.timeout
            let newtimeout = inputDateSecActiveIDTimein(dateencoded, timeout)
            if (this.props.projectsprovider.hasOwnProperty("length")) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("schedulelabor")) {
                            // eslint-disable-next-line
                            myproject.schedulelabor.mylabor.map((mylabor, j) => {
                                if (mylabor.laborid === laborid) {
                                    this.props.projectsprovider[i].schedulelabor.mylabor[j].timeout = newtimeout;
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
            let timeout = inputDateObjandSecReturnObj(dateencoded, this.state.timeout);

            this.setState({ timeout, render: 'render' })
        }

    }


    getactivedatetimeout(dateencoded) {
        let activeclass = "";
        if (this.state.activelaborid) {


            let mylabor = this.getactivelabor()
            let timeout = mylabor.timeout;
            if (inputtimeDBoutputCalendarDaySeconds(timeout) === dateencoded) {
                activeclass = "active-schedule-calendar"
            }
        }
        else {
            let datein = this.state.timeout;
            if (inputDateObjOutputCalendarDaySeconds(datein) === dateencoded) {
                activeclass = "active-schedule-calendar"
            }

        }
        return activeclass;
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
        if (this.state.activelaborid) {


            let mylabor = this.getactivelabor()
            let timein = mylabor.timein;
            if (inputtimeDBoutputCalendarDaySeconds(timein) === dateencoded) {
                activeclass = "active-schedule-calendar"
            }
        }
        else {
            let datein = this.state.timein;
            if (inputDateObjOutputCalendarDaySeconds(datein) === dateencoded) {
                activeclass = "active-schedule-calendar"
            }

        }
        return activeclass;
    }
    setDay(dateencoded) {
        if (this.state.activelaborid) {

            let mylabor = this.getactivelabor();
            let laborid = mylabor.laborid;
            let timein = mylabor.timein
            let newtimein = inputDateSecActiveIDTimein(dateencoded, timein)
            if (this.props.projectsprovider.hasOwnProperty("length")) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("schedulelabor")) {
                            // eslint-disable-next-line
                            myproject.schedulelabor.mylabor.map((mylabor, j) => {
                                if (mylabor.laborid === laborid) {
                                    this.props.projectsprovider[i].schedulelabor.mylabor[j].timein = newtimein;
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
            let timein = inputDateObjandSecReturnObj(dateencoded, this.state.timein);

            this.setState({ timein, render: 'render' })
        }

    }
    // TIME OUT FUNCTIONS

    activetimeoutcalendar() {
        let activetimeoutcalendar = this.state.activetimeoutcalendar;
        if (activetimeoutcalendar) {
            activetimeoutcalendar = false;
        } else {
            activetimeoutcalendar = true;
        }
        this.setState({ activetimeoutcalendar })
    }

    timeoutheader() {
        let mylabor = {};
        if (this.state.activelaborid) {
            mylabor = this.getactivelabor();
            return (`Time Out ${inputUTCStringForLaborID(mylabor.timeout)}`)
        } else {
            return (`Time Out ${inputDateObjOutputCalendarString(this.state.timeout)}`)
        }

    }
    calendertimeout(datein) {

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
                            display = this.showdatetimeout(datein, 1);
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
                            display = this.showdatetimeout(datein, 2);
                            break;
                        case "Tues":
                            display = this.showdatetimeout(datein, 1);
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
                            display = this.showdatetimeout(datein, 3);
                            break;
                        case "Tues":
                            display = this.showdatetimeout(datein, 2);
                            break;
                        case "Weds":
                            display = this.showdatetimeout(datein, 1);
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
                            display = this.showdatetimeout(datein, 4);
                            break;
                        case "Tues":
                            display = this.showdatetimeout(datein, 3);
                            break;
                        case "Weds":
                            display = this.showdatetimeout(datein, 2);
                            break;
                        case "Thurs":
                            display = this.showdatetimeout(datein, 1);
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
                            display = this.showdatetimeout(datein, 5);
                            break;
                        case "Tues":
                            display = this.showdatetimeout(datein, 4);
                            break;
                        case "Weds":
                            display = this.showdatetimeout(datein, 3);
                            break;
                        case "Thurs":
                            display = this.showdatetimeout(datein, 2);
                            break;
                        case "Fri":
                            display = this.showdatetimeout(datein, 1);
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
                            display = this.showdatetimeout(datein, 6);
                            break;
                        case "Tues":
                            display = this.showdatetimeout(datein, 5);
                            break;
                        case "Weds":
                            display = this.showdatetimeout(datein, 4);
                            break;
                        case "Thurs":
                            display = this.showdatetimeout(datein, 3);
                            break;
                        case "Fri":
                            display = this.showdatetimeout(datein, 2);
                            break;
                        case "Sat":
                            display = this.showdatetimeout(datein, 1);
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
                            display = this.showdatetimeout(datein, i - 6);
                            break;
                        case "Tues":
                            display = this.showdatetimeout(datein, i - 7);
                            break;
                        case "Weds":
                            display = this.showdatetimeout(datein, i - 8);
                            break;
                        case "Thurs":
                            display = this.showdatetimeout(datein, i - 9);
                            break;
                        case "Fri":
                            display = this.showdatetimeout(datein, i - 10);
                            break;
                        case "Sat":
                            display = this.showdatetimeout(datein, i - 11);
                            break;
                        case "Sun":
                            display = this.showdatetimeout(datein, i - 12);
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
                            display = this.showdatetimeout(datein, check_29_feb_leapyear(datein));
                            break;
                        case "Tues":
                            display = this.showdatetimeout(datein, 28);
                            break;
                        case "Weds":
                            display = this.showdatetimeout(datein, 27);
                            break;
                        case "Thurs":
                            display = this.showdatetimeout(datein, 26);
                            break;
                        case "Fri":
                            display = this.showdatetimeout(datein, 25);
                            break;
                        case "Sat":
                            display = this.showdatetimeout(datein, 24);
                            break;
                        case "Sun":
                            display = this.showdatetimeout(datein, 23);
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
                            display = this.showdatetimeout(datein, check_30(datein));
                            break;
                        case "Tues":
                            display = this.showdatetimeout(datein, check_29_feb_leapyear(datein));
                            break;
                        case "Weds":
                            display = this.showdatetimeout(datein, 28);
                            break;
                        case "Thurs":
                            display = this.showdatetimeout(datein, 27);
                            break;
                        case "Fri":
                            display = this.showdatetimeout(datein, 26);
                            break;
                        case "Sat":
                            display = this.showdatetimeout(datein, 25);
                            break;
                        case "Sun":
                            display = this.showdatetimeout(datein, 24);
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
                            display = this.showdatetimeout(datein, check_31(datein));
                            break;
                        case "Tues":
                            display = this.showdatetimeout(datein, check_30(datein));
                            break;
                        case "Weds":
                            display = this.showdatetimeout(datein, check_29_feb_leapyear(datein))
                            break;
                        case "Thurs":
                            display = this.showdatetimeout(datein, 28);
                            break;
                        case "Fri":
                            display = this.showdatetimeout(datein, 27);
                            break;
                        case "Sat":
                            display = this.showdatetimeout(datein, 26);
                            break;
                        case "Sun":
                            display = this.showdatetimeout(datein, 25);
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
                            display = this.showdatetimeout(datein, check_31(datein));
                            break;
                        case "Weds":
                            display = this.showdatetimeout(datein, check_30(datein));
                            break;
                        case "Thurs":
                            display = this.showdatetimeout(datein, check_29_feb_leapyear(datein));
                            break;
                        case "Fri":
                            display = this.showdatetimeout(datein, 28);
                            break;
                        case "Sat":
                            display = this.showdatetimeout(datein, 27);
                            break;
                        case "Sun":
                            display = this.showdatetimeout(datein, 26);
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
                            display = this.showdatetimeout(datein, check_31(datein));
                            break;
                        case "Thurs":
                            display = this.showdatetimeout(datein, check_30(datein));
                            break;
                        case "Fri":
                            display = this.showdatetimeout(datein, check_29_feb_leapyear(datein));
                            break;
                        case "Sat":
                            display = this.showdatetimeout(datein, 28);
                            break;
                        case "Sun":
                            display = this.showdatetimeout(datein, 27);
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
                            display = this.showdatetimeout(datein, check_31(datein));
                            break;
                        case "Fri":
                            display = this.showdatetimeout(datein, check_30(datein));
                            break;
                        case "Sat":
                            display = this.showdatetimeout(datein, check_29_feb_leapyear(datein));
                            break;
                        case "Sun":
                            display = this.showdatetimeout(datein, 28);
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
                            display = this.showdatetimeout(datein, check_31(datein));
                            break;
                        case "Sat":
                            display = this.showdatetimeout(datein, check_30(datein));
                            break;
                        case "Sun":
                            display = this.showdatetimeout(datein, check_29_feb_leapyear(datein));
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
                            display = this.showdatetimeout(datein, check_31(datein));
                            break;
                        case "Sun":
                            display = this.showdatetimeout(datein, check_30(datein));
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
                            display = this.showdatetimeout(datein, check_31(datein));
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
        return (<div className="laborcalendar-grid">
            {gridcalender}
        </div>)
    }
    showcalendartimeout() {
        let datein = {};
        if (this.state.activelaborid) {
            let timeout = this.getactivelabor().timeout;
            datein = inputDateTimeOutDateObj(timeout)
        } else {
            datein = this.state.timeout;
        }

        return (this.calendertimeout(datein))
    }

    handlecalendartimeout() {
        if (this.state.activetimeoutcalendar) {
            return (<div className="general-flex">
                <div className="flex-1 calendar-container">
                    {this.showcalendartimeout()}

                </div>
            </div>)
        } else {
            return;
        }
    }
    showtimeout() {

        return (
            <div className="general-flex">
                <div className="flex-1">

                    <div className="general-flex">
                        <div className="flex-1">

                            <div className="general-flex">
                                <div className="flex-3 timedisplay-container regularFont">
                                    {this.timeoutheader()}
                                </div>
                                <div className="flex-1 timedisplay-container align-contentCenter">
                                    <button className="general-button majorDownIcon" onClick={() => { this.activetimeoutcalendar() }}>{majorDownIcon()}</button>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="general-flex">
                        <div className="flex-1 showBorder timecell-container">

                            <div className="timecell-module showBorder align-contentCenter">
                                <button className="general-button time-button" onClick={event => { this.timeoutmonthup(event) }}>{DateArrowUp()}</button>
                            </div>
                            <div className="timecell-module showBorder align-contentCenter">
                                <input type="text" className="timeinput-field align-contentCenter titleFont" value={this.gettimeoutmonth()} />
                            </div>
                            <div className="timecell-module showBorder align-contentCenter">
                                <button className="general-button time-button" onClick={event => { this.timeoutmonthdown(event) }}> {DateArrowDown()}</button>
                            </div>

                        </div>

                        <div className="flex-1 showBorder timecell-container align-contentCenter">
                            <div className="timecell-module showBorder">
                                <button className="general-button time-button" onClick={event => { this.increasetimeoutbyinc(event, (1000 * 60 * 60 * 24)) }}>{DateArrowUp()}</button>
                            </div>
                            <div className="timecell-module showBorder align-contentCenter">
                                <input type="text" className="timeinput-field align-contentCenter titleFont" value={this.gettimeoutday()} />
                            </div>
                            <div className="timecell-module showBorder align-contentCenter">
                                <button className="general-button time-button" onClick={event => { this.decreasetimeoutbyinc(event, (1000 * 60 * 60 * 24)) }}> {DateArrowDown()}</button>
                            </div>

                        </div>

                        <div className="flex-1 showBorder timecell-container align-contentCenter">
                            <div className="timecell-module showBorder">
                                <button className="time-button general-button" onClick={event => { this.timeoutyearup(event) }}>{DateArrowUp()}</button>
                            </div>
                            <div className="timecell-module showBorder align-contentCenter">
                                <input type="text" className="timeinput-field align-contentCenter titleFont" value={this.gettimeoutyear()} />
                            </div>
                            <div className="timecell-module showBorder align-contentCenter">
                                <button className="time-button general-button" onClick={event => { this.timeoutyeardown(event) }}> {DateArrowDown()}</button>
                            </div>
                        </div>

                        <div className="flex-1 showBorder timecell-container">
                            <div className="timecell-module showBorder align-contentCenter">
                                <button className="time-button general-button align-contentCenter" onClick={event => { this.increasetimeoutbyinc(event, (1000 * 60 * 60)) }}>{DateArrowUp()}</button>
                            </div>
                            <div className="timecell-module showBorder align-contentCenter">
                                <input type="text" className="timeinput-field align-contentCenter titleFont" value={this.gettimeouthours()} />
                            </div>
                            <div className="timecell-module showBorder align-contentCenter">
                                <button className="time-button general-button align-contentCenter" onClick={event => { this.decreasetimeoutbyinc(event, (1000 * 60 * 60)) }}> {DateArrowDown()}</button>
                            </div>
                        </div>

                        <div className="flex-1 showBorder timecell-container">
                            <div className="timecell-module showBorder align-contentCenter">
                                <button className="time-button general-button align-contentCenter" onClick={event => { this.increasetimeoutbyinc(event, (1000 * 60)) }}>{DateArrowUp()}</button>
                            </div>
                            <div className="timecell-module showBorder align-contentCenter">
                                <input type="text" className="timeinput-field align-contentCenter titleFont" value={this.gettimeoutminutes()} />
                            </div>
                            <div className="timecell-module showBorder align-contentCenter">
                                <button className="time-button general-button align-contentCenter" onClick={event => { this.decreasetimeoutbyinc(event, (1000 * 60)) }} > {DateArrowDown()}</button>
                            </div>
                        </div>
                        <div className="flex-1 showBorder timecell-container align-contentCenter">
                            <div className="timecell-module showBorder align-contentCenter">
                                <button className="time-button general-button align-contentCenter" onClick={() => { this.toggletimeoutampm("up") }}>{DateArrowUp()}</button>
                            </div>
                            <div className="timecell-module showBorder align-contentCenter">
                                <input type="text" className="timeinput-field align-contentCenter titleFont" value={this.gettimeoutampm()} />
                            </div>
                            <div className="timecell-module showBorder align-contentCenter">
                                <button className="time-button general-button align-contentCenter" onClick={() => { this.toggletimeoutampm("down") }}> {DateArrowDown()}</button>
                            </div>
                        </div>
                    </div>

                    {this.handlecalendartimeout()}


                </div>
            </div>
        )
    }

    handleTimes() {
        if (this.state.width > 900) {
            return (
                <div className="general-flex">
                    <div className="flex-1">
                        {this.showtimein()}
                    </div>


                    <div className="flex-1 addLeftMargin">
                        {this.showtimeout()}
                    </div>
                </div>
            )
        } else {
            return (
                <div className="general-flex">
                    <div className="flex-1 showBorder">

                        <div className="general-flex">
                            <div className="flex-1 showBorder">
                                {this.showtimein()}
                            </div>
                        </div>


                        <div className="general-flex">
                            <div className="flex-1 showBorder addLeftMargin">
                                {this.showtimeout()}
                            </div>
                        </div>

                    </div>
                </div>
            )

        }
    }
    render() {
        return (

            <div className="general-flex">
                <div className="flex-1">

                    <div className="general-flex">
                        <div className="flex-1">
                            <div className="align-contentCenter titleFont"> ProjectID {this.getproject().projectid}/{this.getproject().title}</div>
                            <div className="align-contentCenter titleFont">Schedule Labor</div>
                        </div>
                    </div>


                    {this.handleTimes()}

                    <div className="general-flex">
                        <div className="flex-1">
                            <div className="regularFont"> {this.handleClearProject()} </div>
                        </div>

                    </div>

                    <div className="general-flex">
                        <div className="flex-1">
                            <div className="regularFont">
                                Select A Milestone ID <br />
                                <select className="project-field" value={this.getmilestone()} onChange={event => { this.handlemilestone(event.target.value) }}>
                                    <option>Select A Milestone </option>
                                    {this.loadmilestones()}
                                </select>
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="regularFont"> Labor Rate <br />
                                <input type="text" className="project-field" onChange={event => { this.handlelaborrate(event.target.value) }} value={this.getlaborrate()} /></div>
                        </div>
                    </div>

                    <div className="general-flex">
                        <div className="flex-1">
                            <div className="align-contentCenter regularFont"> Total Hours <br /></div>
                        </div>
                        <div className="flex-1">
                            <div className="align-contentCenter regularFont"> Amount <br /></div>
                        </div>
                    </div>

                    <div className="general-flex">
                        <div className="flex-1">
                            <div className="regularFont">Description <br /><input type="text" className="project-field" onChange={event => { this.handledescription(event.target.value) }} value={this.getdescription()} /></div>
                        </div>

                    </div>
                    <div className="general-flex">

                        <div className="flex-1 align-contentCenter regularFont message-container">
                            {this.state.message}
                        </div>
                    </div>
                    <div className="general-flex">

                        <div className="flex-1 align-contentCenter">
                            <button className="general-button saveAllProjectsIcon" onClick={event => { this.saveallprojects() }}>{SaveAllProjectIcon()} </button>
                        </div>

                    </div>
                    <div className="general-flex">
                        <div className="flex-1">
                            {this.handleshowlaborid()}
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
        projectsprovider: state.projectsprovider,
        projectid: state.projectid
    }
}

export default connect(mapStateToProps, actions)(MyScheduleLabor)
