import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import './schedule.css';
import { ProviderEndPoint } from './actions/api'
// eslint-disable-next-line 
import { SaveProjectIcon, ClearActiveLabor, DateArrowUp, DateArrowDown, editLaborIcon, deleteLaborIcon } from './svg'
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
    validateLaborRate
}
    from './functions';

class MyScheduleLabor extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, activelaborid: '', timein: new Date(), timeout: new Date(new Date().getTime() + (1000 * 60 * 60)), description: "", laborrate: "", message: 'Active Labor ID is clear, Type a Description to Create One' }
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
            let laborid = this.state.activelaborid;
            let mylabor = this.getmylabor(laborid);
            datein = new Date(inputUTCStringAddOffsetString(mylabor.timein).replace(/-/g, '/'));
        }
        else {
            datein = this.state.timein;
        }

        month = datein.getMonth() + 1;
        return month;
    }
    gettimeoutmonth() {
        let month = "";
        let dateout = {};
        if (this.state.activelaborid) {
            let laborid = this.state.activelaborid;
            let mylabor = this.getmylabor(laborid);
            dateout = new Date(inputUTCStringAddOffsetString(mylabor.timeout).replace(/-/g, '/'));


        }
        else {
            dateout = this.state.timeout;
        }
        month = dateout.getMonth() + 1;
        return month;
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
        return day;
    }
    gettimeoutday() {
        let day = "";
        let dateout = {};
        if (this.state.activelaborid) {
            let laborid = this.state.activelaborid;
            let mylabor = this.getmylabor(laborid);
            dateout = new Date(inputUTCStringAddOffsetString(mylabor.timeout).replace(/-/g, '/'));



        }
        else {
            dateout = this.state.timeout;
        }
        day = dateout.getDate();
        return day;
    }
    gettimeoutyear() {
        let year = "";
        let dateout = {};
        if (this.state.activelaborid) {
            let laborid = this.state.activelaborid;
            let mylabor = this.getmylabor(laborid);
            dateout = new Date(inputUTCStringAddOffsetString(mylabor.timeout).replace(/-/g, '/'));



        }
        else {
            dateout = this.state.timeout;
        }
        year = dateout.getFullYear();
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
        return hours;
    }
    gettimeouthours() {
        let hours = "";
        let dateout = {};
        if (this.state.activelaborid) {
            let laborid = this.state.activelaborid;
            let mylabor = this.getmylabor(laborid);

            dateout = new Date(inputUTCStringAddOffsetString(mylabor.timeout).replace(/-/g, '/'));




        }
        else {
            dateout = this.state.timeout;

        }
        hours = dateout.getHours();
        if (hours > 12) {
            hours = hours - 12;
        }
        else if (hours === 0) {
            hours = 12;
        }
        return hours;

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
        return minutes;
    }
    gettimeoutminutes() {
        let minutes = "";
        let dateout = {};
        if (this.state.activelaborid) {
            let laborid = this.state.activelaborid;
            let mylabor = this.getmylabor(laborid);

            dateout = new Date(inputUTCStringAddOffsetString(mylabor.timeout).replace(/-/g, '/'));

        }
        else {
            dateout = this.state.timeout;
        }
        minutes = dateout.getMinutes();
        return minutes;

    }
    toggletimeinampm(event) {

        if (this.state.activelaborid) {
            let laborid = this.state.activelaborid;
            let mylabor = this.getmylabor(laborid);
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
        let dateout = {};
        if (this.state.activelaborid) {
            let laborid = this.state.activelaborid;
            let mylabor = this.getmylabor(laborid);
            dateout = new Date(inputUTCStringAddOffsetString(mylabor.timeout).replace(/-/g, '/'));

        }
        else {
            dateout = this.state.timeout;
        }
        let hours = dateout.getHours();
        if (hours >= 12) {
            ampm = "PM"
        }
        else {
            ampm = "AM"
        }
        return ampm;
    }
    toggletimeoutampm(event) {

        if (this.state.activelaborid) {
            let laborid = this.state.activelaborid;
            let mylabor = this.getmylabor(laborid);
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



        }
        else {
            let dateout = toggleAMDateObj(this.state.timeout)
            this.setState({ timeout: dateout })
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
            this.setState({ timeout: newDate });
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
        let laborid = [];
        if (this.state.width > 1080) {
            laborid.push(<div className={`schedulelaborid-row-1a ${this.getactivelaborid(mylabor.laborid)}`}>From {inputUTCStringForLaborID(mylabor.timein)} to {inputUTCStringForLaborID(mylabor.timeout)}  </div>)
            laborid.push(<div className={`schedulelaborid-row-1a ${this.getactivelaborid(mylabor.laborid)}`}>${Number(mylabor.laborrate).toFixed(2)}/Hr x {calculatetotalhours(mylabor.timeout, mylabor.timein)} Hrs = ${(Number(calculatetotalhours(mylabor.timeout, mylabor.timein)) * Number(mylabor.laborrate)).toFixed(2)}</div>)
            laborid.push(<div className="schedulelaborid-row-1b"><button className="laborid-icon" onClick={event => { this.handleDelete(event, mylabor.laborid) }}>{deleteLaborIcon()} </button> </div>)
            laborid.push(<div className={`schedulelaborid-row-2 ${this.getactivelaborid(mylabor.laborid)}`}>{mylabor.description} </div>)
            laborid.push(<div className="schedulelaborid-row-3"><button className="laborid-icon" onClick={event => { this.findlabor(mylabor.laborid) }}>{editLaborIcon()}</button> </div>)
        }
        else {
            laborid.push(<div className={`schedulelaborid-small-1 ${this.getactivelaborid(mylabor.laborid)}`}>From {inputUTCStringForLaborID(mylabor.timein)} to {inputUTCStringForLaborID(mylabor.timeout)}  </div>)
            laborid.push(<div className={`schedulelaborid-small-1 ${this.getactivelaborid(mylabor.laborid)}`}>${Number(mylabor.laborrate).toFixed(2)}/Hr x {calculatetotalhours(mylabor.timeout, mylabor.timein)} Hrs = ${(Number(calculatetotalhours(mylabor.timeout, mylabor.timein)) * Number(mylabor.laborrate)).toFixed(2)}</div>)
            laborid.push(<div className={`schedulelaborid-row-2 ${this.getactivelaborid(mylabor.laborid)}`}>{mylabor.description} </div>)
            laborid.push(<div className="schedulelaborid-small-1"> <button className="laborid-icon" onClick={event => { this.findlabor(mylabor.laborid) }}>{editLaborIcon()}</button> </div>)
            laborid.push(<div className="schedulelaborid-small-1 align-right"><button className="laborid-icon" onClick={event => { this.handleDelete(event, mylabor.laborid) }}>{deleteLaborIcon()} </button> </div>)

        }

        return laborid;
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
            return (<button className="btnsaveprojects" onClick={event => { this.clearlaborid(event) }}>{ClearActiveLabor()} </button>)
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
    showtimein() {
        return (
            <div className="general-flex">
                <div className="flex-1">

                    <div className="general-flex">
                        <div className="flex-1 showBorder">

                            <div className="general-flex">
                                <div className="flex-3 showBorder timedisplay-container">
                                    &nbsp;
                                </div>
                                <div className="flex-1 showBorder timedisplay-container">
                                    &nbsp;
                                </div>

                            </div>


                        </div>
                    </div>

                    <div className="general-flex">
                        <div className="flex-1 showBorder timecell-container">

                            <div className="timecell-module showBorder">
                                &nbsp;
                            </div>
                            <div className="timecell-module showBorder">
                                &nbsp;
                            </div>
                            <div className="timecell-module showBorder">
                                &nbsp;
                            </div>

                        </div>

                        <div className="flex-1 showBorder timecell-container">
                            <div className="timecell-module showBorder">
                                &nbsp;
                            </div>
                            <div className="timecell-module showBorder">
                                &nbsp;
                            </div>
                            <div className="timecell-module showBorder">
                                &nbsp;
                            </div>

                        </div>
                        <div className="flex-1 showBorder timecell-container"> <div className="timecell-module showBorder">
                            &nbsp;
                            </div>
                            <div className="timecell-module showBorder">
                                &nbsp;
                            </div>
                            <div className="timecell-module showBorder">
                                &nbsp;
                            </div></div>
                        <div className="flex-1 showBorder timecell-container"> <div className="timecell-module showBorder">
                            &nbsp;
                            </div>
                            <div className="timecell-module showBorder">
                                &nbsp;
                            </div>
                            <div className="timecell-module showBorder">
                                &nbsp;
                            </div></div>
                        <div className="flex-1 showBorder timecell-container"> <div className="timecell-module showBorder">
                            &nbsp;
                            </div>
                            <div className="timecell-module showBorder">
                                &nbsp;
                            </div>
                            <div className="timecell-module showBorder">
                                &nbsp;
                            </div>
                        </div>
                        <div className="flex-1 showBorder timecell-container"> <div className="timecell-module showBorder">
                            &nbsp;
                            </div>
                            <div className="timecell-module showBorder">
                                &nbsp;
                            </div>
                            <div className="timecell-module showBorder">
                                &nbsp;
                            </div>
                        </div>
                    </div>

                    <div className="general-flex">
                        <div className="flex-1 showBorder calendar-container">


                        </div>
                    </div>


                </div>
            </div>
        )
    }
    showtimeout() {
        return (
            <div className="general-flex">
                <div className="flex-1">

                    <div className="general-flex">
                        <div className="flex-1 showBorder">&nbsp;


                        </div>
                    </div>

                    <div className="general-flex">
                        <div className="flex-1 showBorder">&nbsp;</div>
                    </div>

                    <div className="general-flex">
                        <div className="flex-1 showBorder">&nbsp;</div>
                    </div>


                </div>
            </div>
        )
    }
    render() {
        return (

            <div className="general-flex">
                <div className="flex-1">

                    <div className="general-flex">
                        <div className="flex-1 showBorder">
                            <div className="align-contentCenter titleFont"> Project ID{this.getproject().projectid}/{this.getproject().title}</div>
                        </div>
                    </div>


                    <div className="general-flex">
                        <div className="flex-1 showBorder">
                            {this.showtimein()}
                        </div>


                        <div className="flex-1 showBorder">
                            {this.showtimeout()}
                        </div>
                    </div>


                    <div className="general-flex">
                        <div className="flex-1 showBorder">
                            <div className="align-contentCenter titleFont"> &nbsp;</div>
                        </div>
                        <div className="flex-1 showBorder">
                            <div className="align-contentCenter titleFont"> &nbsp;</div>
                        </div>
                    </div>

                    <div className="general-flex">
                        <div className="flex-1 showBorder">
                            <div className="align-contentCenter titleFont"> &nbsp;</div>
                        </div>
                        <div className="flex-1 showBorder">
                            <div className="align-contentCenter titleFont"> &nbsp;</div>
                        </div>
                    </div>
                    <div className="general-flex">
                        <div className="flex-1 showBorder">
                            <div className="align-contentCenter titleFont"> &nbsp;</div>
                        </div>

                    </div>
                    <div className="general-flex">
                        <div className="flex-1 showBorder">
                            <div className="align-contentCenter titleFont"> &nbsp;</div>
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
