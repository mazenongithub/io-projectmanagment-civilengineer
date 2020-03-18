import React from 'react'
import { openDateMenu, closeDateMenu, dateYearDown, dateYearUp, dateMonthDown, dateMonthUp } from './svg'
import {
    formatDateforCalendarDisplay,
    getFirstIsOn,
    check_29_feb_leapyear,
    check_30,
    check_31,
    trailingzero,
    getOffset,
    inputDatePickerOutputDateObj,
    decreaseCalendarDaybyOneYear,
    subtractoneYearDateObj,
    increaseCalendarDayOneMonth,
    addoneMonthDateObj,
    decreaseCalendarDaybyOneMonth,
    subtractMonthDateObj,
    inputSecOutDateString,
    inputDateObjandSecReturnObj,
    increaseCalendarDaybyOneYear,
    addoneYearDateObj,
    inputDateObjOutputCalendarDaySeconds,
    makeDatefromObj,
    inputDateStringOutputSeconds


} from './functions'
import { MyStylesheet } from './styles';
import PM from './pm';
class Start {

    setDay(dateencoded) {

        const pm = new PM();
        if (this.state.activemilestoneid) {
            let myuser = pm.getuser.call(this)
            let i = pm.getprojectkey.call(this);
            let j = this.getactivemilestonekey();

            let newtimein = inputSecOutDateString(dateencoded)

            myuser.projects.myproject[i].projectmilestones.mymilestone[j].start = newtimein;
            this.props.reduxUser(myuser)
            this.setState({ render: 'render' })


        }
        else {
            let datein = inputDateObjandSecReturnObj(dateencoded, this.state.datein);
            this.setState({ datein, render: 'render' })
        }


    }
    getactivedate(dateencoded) {
        let activeclass = "";
        if (this.state.activemilestoneid) {


            let mymilestone = this.getactivemilestone()
            let timein = mymilestone.start;
            if (inputDateStringOutputSeconds(timein) === dateencoded) {
                activeclass = "active-milestone-calender"
            }
        }
        else {
            let datein = this.state.datein;
            if (inputDateObjOutputCalendarDaySeconds(datein) === dateencoded) {
                activeclass = "active-milestone-calender"
            }

        }
        return activeclass;
    }
    showdate(dateobj, day) {
        const Datein = new Start();
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

            showday.push(<div key={`${dateencoded}a`}
                className={`${Datein.getactivedate.call(this, dateencoded)} calendar-date`}
                onClick={() => { Datein.setDay.call(this, dateencoded) }}
            > {day}</div>)
        }
        return showday;
    }
    showgridcalender(datein) {
        let gridcalender = [];
        const styles = MyStylesheet();
        const Datein = new Start();
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
                    gridcalender.push(<div style={{ ...styles.showBorder, ...styles.alignCenter }}>
                        Mon
							</div>)
                }
                else if (i === 1) {
                    gridcalender.push(<div style={{ ...styles.showBorder, ...styles.alignCenter }}>
                        Tues
							</div>)
                }
                else if (i === 2) {
                    gridcalender.push(<div style={{ ...styles.showBorder, ...styles.alignCenter }}>
                        Weds
							</div>)
                }
                else if (i === 3) {
                    gridcalender.push(<div style={{ ...styles.showBorder, ...styles.alignCenter }}>
                        Thurs
							</div>)
                }
                else if (i === 4) {
                    gridcalender.push(<div style={{ ...styles.showBorder, ...styles.alignCenter }}>
                        Fri
							</div>)
                }
                else if (i === 5) {
                    gridcalender.push(<div style={{ ...styles.showBorder, ...styles.alignCenter }}>
                        Sat
							</div>)
                }
                else if (i === 6) {
                    gridcalender.push(<div style={{ ...styles.showBorder, ...styles.alignCenter }}>
                        Sun
							</div>)
                }
                else if (i === 7) {
                    let display = " "
                    switch (firstison) {
                        case "Mon":
                            display = Datein.showdate.call(this, datein, 1);
                            break;
                        default:
                            break;
                    }
                    gridcalender.push(<div style={{ ...styles.showBorder, ...styles.alignCenter }}>
                        {display}&nbsp;
							</div>)

                }
                else if (i === 8) {
                    let display = " "
                    switch (firstison) {
                        case "Mon":
                            display = Datein.showdate.call(this, datein, 2);
                            break;
                        case "Tues":
                            display = Datein.showdate.call(this, datein, 1);
                            break;
                        default:
                            break;
                    }
                    gridcalender.push(<div style={{ ...styles.showBorder, ...styles.alignCenter }}>
                        {display}
                    </div>)
                }

                else if (i === 9) {
                    let display = " "
                    switch (firstison) {
                        case "Mon":
                            display = Datein.showdate.call(this, datein, 3);
                            break;
                        case "Tues":
                            display = Datein.showdate.call(this, datein, 2);
                            break;
                        case "Weds":
                            display = Datein.showdate.call(this, datein, 1);
                            break;
                        default:
                            break;
                    }
                    gridcalender.push(<div style={{ ...styles.showBorder, ...styles.alignCenter }}>
                        {display}
                    </div>)

                }
                else if (i === 10) {
                    let display = " "
                    switch (firstison) {
                        case "Mon":
                            display = Datein.showdate.call(this, datein, 4);
                            break;
                        case "Tues":
                            display = Datein.showdate.call(this, datein, 3);
                            break;
                        case "Weds":
                            display = Datein.showdate.call(this, datein, 2);
                            break;
                        case "Thurs":
                            display = Datein.showdate.call(this, datein, 1);
                            break;
                        default:
                            break
                    }
                    gridcalender.push(<div style={{ ...styles.showBorder, ...styles.alignCenter }}>
                        {display}
                    </div>)


                }
                else if (i === 11) {
                    let display = " "
                    switch (firstison) {
                        case "Mon":
                            display = Datein.showdate.call(this, datein, 5);
                            break;
                        case "Tues":
                            display = Datein.showdate.call(this, datein, 4);
                            break;
                        case "Weds":
                            display = Datein.showdate.call(this, datein, 3);
                            break;
                        case "Thurs":
                            display = Datein.showdate.call(this, datein, 2);
                            break;
                        case "Fri":
                            display = Datein.showdate.call(this, datein, 1);
                            break;
                        default:
                            break;
                    }
                    gridcalender.push(<div style={{ ...styles.showBorder, ...styles.alignCenter }}>
                        {display}
                    </div>)

                }
                else if (i === 12) {
                    let display = " "
                    switch (firstison) {
                        case "Mon":
                            display = Datein.showdate.call(this, datein, 6);
                            break;
                        case "Tues":
                            display = Datein.showdate.call(this, datein, 5);
                            break;
                        case "Weds":
                            display = Datein.showdate.call(this, datein, 4);
                            break;
                        case "Thurs":
                            display = Datein.showdate.call(this, datein, 3);
                            break;
                        case "Fri":
                            display = Datein.showdate.call(this, datein, 2);
                            break;
                        case "Sat":
                            display = Datein.showdate.call(this, datein, 1);
                            break;
                        default:
                            break;
                    }

                    gridcalender.push(<div style={{ ...styles.showBorder, ...styles.alignCenter }}>
                        {display}
                    </div>)


                }
                else if (i >= 13 && i <= 34) {
                    let display = " "
                    switch (firstison) {
                        case "Mon":
                            display = Datein.showdate.call(this, datein, i - 6);
                            break;
                        case "Tues":
                            display = Datein.showdate.call(this, datein, i - 7);
                            break;
                        case "Weds":
                            display = Datein.showdate.call(this, datein, i - 8);
                            break;
                        case "Thurs":
                            display = Datein.showdate.call(this, datein, i - 9);
                            break;
                        case "Fri":
                            display = Datein.showdate.call(this, datein, i - 10);
                            break;
                        case "Sat":
                            display = Datein.showdate.call(this, datein, i - 11);
                            break;
                        case "Sun":
                            display = Datein.showdate.call(this, datein, i - 12);
                            break;
                        default:
                            break;
                    }


                    gridcalender.push(<div style={{ ...styles.showBorder, ...styles.alignCenter }}>
                        {display}
                    </div>)

                }


                else if (i === 35) {
                    let display = " ";
                    switch (firstison) {
                        case "Mon":
                            display = Datein.showdate.call(this, datein, check_29_feb_leapyear(datein));
                            break;
                        case "Tues":
                            display = Datein.showdate.call(this, datein, 28);
                            break;
                        case "Weds":
                            display = Datein.showdate.call(this, datein, 27);
                            break;
                        case "Thurs":
                            display = Datein.showdate.call(this, datein, 26);
                            break;
                        case "Fri":
                            display = Datein.showdate.call(this, datein, 25);
                            break;
                        case "Sat":
                            display = Datein.showdate.call(this, datein, 24);
                            break;
                        case "Sun":
                            display = Datein.showdate.call(this, datein, 23);
                            break;
                        default:
                            break;
                    }
                    gridcalender.push(<div style={{ ...styles.showBorder, ...styles.alignCenter }}>
                        {display}
                    </div>)
                }
                else if (i === 36) {
                    let display = " ";
                    switch (firstison) {
                        case "Mon":
                            display = Datein.showdate.call(this, datein, check_30(datein));
                            break;
                        case "Tues":
                            display = Datein.showdate.call(this, datein, check_29_feb_leapyear(datein));
                            break;
                        case "Weds":
                            display = Datein.showdate.call(this, datein, 28);
                            break;
                        case "Thurs":
                            display = Datein.showdate.call(this, datein, 27);
                            break;
                        case "Fri":
                            display = Datein.showdate.call(this, datein, 26);
                            break;
                        case "Sat":
                            display = Datein.showdate.call(this, datein, 25);
                            break;
                        case "Sun":
                            display = Datein.showdate.call(this, datein, 24);
                            break;
                        default:
                            break;
                    }
                    gridcalender.push(<div style={{ ...styles.showBorder, ...styles.alignCenter }}>
                        {display}
                    </div>)
                }
                else if (i === 37) {
                    let display = " ";
                    switch (firstison) {
                        case "Mon":
                            display = Datein.showdate.call(this, datein, check_31(datein));
                            break;
                        case "Tues":
                            display = Datein.showdate.call(this, datein, check_30(datein));
                            break;
                        case "Weds":
                            display = Datein.showdate.call(this, datein, check_29_feb_leapyear(datein))
                            break;
                        case "Thurs":
                            display = Datein.showdate.call(this, datein, 28);
                            break;
                        case "Fri":
                            display = Datein.showdate.call(this, datein, 27);
                            break;
                        case "Sat":
                            display = Datein.showdate.call(this, datein, 26);
                            break;
                        case "Sun":
                            display = Datein.showdate.call(this, datein, 25);
                            break;
                        default:
                            break;
                    }
                    gridcalender.push(<div style={{ ...styles.showBorder, ...styles.alignCenter }}>
                        {display}
                    </div>)
                }
                else if (i === 38) {
                    let display = " ";
                    switch (firstison) {
                        case "Mon":
                            break;
                        case "Tues":
                            display = Datein.showdate.call(this, datein, check_31(datein));
                            break;
                        case "Weds":
                            display = Datein.showdate.call(this, datein, check_30(datein));
                            break;
                        case "Thurs":
                            display = Datein.showdate.call(this, datein, check_29_feb_leapyear(datein));
                            break;
                        case "Fri":
                            display = Datein.showdate.call(this, datein, 28);
                            break;
                        case "Sat":
                            display = Datein.showdate.call(this, datein, 27);
                            break;
                        case "Sun":
                            display = Datein.showdate.call(this, datein, 26);
                            break;
                        default:
                            break;
                    }
                    gridcalender.push(<div style={{ ...styles.showBorder, ...styles.alignCenter }}>
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
                            display = Datein.showdate.call(this, datein, check_31(datein));
                            break;
                        case "Thurs":
                            display = Datein.showdate.call(this, datein, check_30(datein));
                            break;
                        case "Fri":
                            display = Datein.showdate.call(this, datein, check_29_feb_leapyear(datein));
                            break;
                        case "Sat":
                            display = Datein.showdate.call(this, datein, 28);
                            break;
                        case "Sun":
                            display = Datein.showdate.call(this, datein, 27);
                            break;
                        default:
                            break;
                    }
                    gridcalender.push(<div style={{ ...styles.showBorder, ...styles.alignCenter }}>
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
                            display = Datein.showdate.call(this, datein, check_31(datein));
                            break;
                        case "Fri":
                            display = Datein.showdate.call(this, datein, check_30(datein));
                            break;
                        case "Sat":
                            display = Datein.showdate.call(this, datein, check_29_feb_leapyear(datein));
                            break;
                        case "Sun":
                            display = Datein.showdate.call(this, datein, 28);
                            break;
                        default:
                            break;
                    }
                    gridcalender.push(<div style={{ ...styles.showBorder, ...styles.alignCenter }}>
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
                            display = Datein.showdate.call(this, datein, check_31(datein));
                            break;
                        case "Sat":
                            display = Datein.showdate.call(this, datein, check_30(datein));
                            break;
                        case "Sun":
                            display = Datein.showdate.call(this, datein, check_29_feb_leapyear(datein));
                            break;
                        default:
                            break;
                    }
                    gridcalender.push(<div style={{ ...styles.showBorder, ...styles.alignCenter }}>
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
                            display = Datein.showdate.call(this, datein, check_31(datein));
                            break;
                        case "Sun":
                            display = Datein.showdate.call(this, datein, check_30(datein));
                            break;
                        default:
                            break;
                    }
                    gridcalender.push(<div style={{ ...styles.showBorder, ...styles.alignCenter }}>
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
                            display = Datein.showdate.call(this, datein, check_31(datein));
                            break;
                        default:
                            break;
                    }
                    gridcalender.push(<div style={{ ...styles.showBorder, ...styles.alignCenter }}>
                        {display}
                    </div>)
                }
                else {
                    gridcalender.push(<div style={{ ...styles.showBorder, ...styles.alignCenter }}>
                        &nbsp;
							</div>)
                }
            })
        }
        return gridcalender;
    }
    showgrid() {
        const Datein = new Start();
        let showgrid = [];

        // begin show grid
        if (this.state.activemilestoneid) {
            let mymilestone = this.getactivemilestone()
            let timein = mymilestone.start;

            let datein = new Date(`${timein.replace(/-/g, '/')} UTC`);

            showgrid.push(Datein.showgridcalender.call(this, datein))

        }
        else {
            if (this.state.datein) {

                let datein = this.state.datein;

                showgrid.push(Datein.showgridcalender.call(this, datein))
            }
        }

        return showgrid;


    }

    handleopendatemenu() {
        if (this.state.startcalender === 'open') {
            return (closeDateMenu())
        } else if (this.state.startcalender === 'close') {
            return (openDateMenu())
        }

    }
    showCalender() {
        if (this.state.startcalender === 'open') {
            this.setState({ purchasecalender: 'close' })
        } else if (this.state.startcalender === 'close') {
            this.setState({ purchasecalender: 'open' })
        }

    }
    handleChange(value) {
        const pm = new PM();
        let myuser = this.getuser();
        if (myuser) {

            if (this.state.activemilestoneid) {
                let i = pm.getprojectkey.call(this);
                let j = this.getactivemilestonekey()
                let newtimein = value
                myuser.projects.myproject[i].projectmilestones.mymilestone[j].start = newtimein;
                this.props.reduxUser(myuser)
                this.setState({ render: 'render' })

            }
            else {

                this.setState({ datein: inputDatePickerOutputDateObj(value) })
            }


        }

    }

    showcalendar() {

        if (this.state.calendar === 'open') {
            this.setState({ calendar: 'closed' })
        } else if (this.state.calendar === 'closed') {
            this.setState({ calendar: 'open' })
        }
    }

    yeardown() {
        const pm = new PM();
        const myuser = pm.getuser.call(this)
        if (myuser) {

            if (this.state.activemilestoneid) {
                let mymilestone = this.getactivemilestone();
                let timein = mymilestone.start;
                let newtime = decreaseCalendarDaybyOneYear(timein);
                let i = pm.getprojectkey.call(this);
                let j = this.getactivemilestonekey()
                myuser.projects.myproject[i].projectmilestones.mymilestone[j].start = newtime;
                this.props.reduxUser(myuser)
                this.setState({ render: 'render' })
            }
            else {
                let newDate = subtractoneYearDateObj(this.state.datein);
                this.setState({ datein: newDate })
            }
        }


    }
    yearup() {


        if (this.state.activemilestoneid) {
            const pm = new PM();
            const myuser = pm.getuser.call(this)
            let mymilestone = this.getactivemilestone();
            let timein = mymilestone.start;
            let newtimein = increaseCalendarDaybyOneYear(timein);
            let i = pm.getprojectkey.call(this);
            let j = this.getactivemilestonekey()
            myuser.projects.myproject[i].projectmilestones.mymilestone[j].start = newtimein;
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })

        }
        else {
            let newDate = addoneYearDateObj(this.state.datein);
            this.setState({ datein: newDate })
        }

    }
    increasemonth(event) {
        if (this.state.activemilestoneid) {
            const pm = new PM();
            const myuser = pm.getuser.call(this)
            let mymilestone = this.getactivemilestone();
            let timein = mymilestone.start;
            let newtimein = increaseCalendarDayOneMonth(timein);
            let i = pm.getprojectkey.call(this);
            let j = this.getactivemilestonekey()
            myuser.projects.myproject[i].projectmilestones.mymilestone[j].start = newtimein;

            this.props.reduxUser(myuser)
            this.setState({ render: 'render' })

        }
        else {
            let newDate = addoneMonthDateObj(this.state.datein);
            this.setState({ datein: newDate })
        }

    }
    decreasemonth() {
        if (this.state.activemilestoneid) {
            const pm = new PM();
            const myuser = pm.getuser.call(this)
            let mymilestone = this.getactivemilestone();
            let timein = mymilestone.start;
            let i = pm.getprojectkey.call(this);
            let j = this.getactivemilestonekey()
            let newtimein = decreaseCalendarDaybyOneMonth(timein);
            myuser.projects.myproject[i].projectmilestones.mymilestone[j].start = newtimein;
            this.props.reduxUser(myuser)
            this.setState({ render: 'render' })

        }
        else {
            let newDate = subtractMonthDateObj(this.state.datein);
            this.setState({ datein: newDate })
        }
    }
    getvalue() {
        let value = "";
        if (this.state.activemilestoneid) {

            let mymilestone = this.getactivemilestone();
            value = mymilestone.start;


        }
        else {
            value = makeDatefromObj(this.state.datein)

        }
        return value;

    }

    showdateforcalendar() {
        if (this.state.activemilestoneid) {

            let mymilestone = this.getactivemilestone()
            let timein = mymilestone.start;
            let datein = new Date(`${timein.replace(/-/g, '/')}-00:00`);
            return (formatDateforCalendarDisplay(datein))
        }
        else

            return (formatDateforCalendarDisplay(this.state.datein))


    }
    showdatemenu() {
        const styles = MyStylesheet();
        const Datein = new Start();
        const pm = new PM();
        const smallFont = pm.getSmallFont.call(this);
        if (this.state.startcalender === 'open') {
            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>
                        <div style={{ ...styles.generalFlex, ...styles.generalFont, ...smallFont, ...styles.calendarContainer, ...styles.marginAuto }}>
                            <div style={{ ...styles.flex1 }}>
                                <button style={{ ...styles.dateButton, ...styles.generalButton }}
                                    onClick={() => { Datein.yeardown.call(this) }}> {dateYearDown()}</button>
                            </div>
                            <div style={{ ...styles.flex1 }}>
                                <button style={{ ...styles.dateButton, ...styles.generalButton }}
                                    onClick={() => { Datein.decreasemonth.call(this) }}>{dateMonthDown()} </button>
                            </div>
                            <div style={{ ...styles.flex2, ...styles.smallFont, ...styles.alignCenter }}>
                                {Datein.showdateforcalendar.call(this)}
                            </div>
                            <div style={{ ...styles.flex1 }}>
                                <button style={{ ...styles.dateButton, ...styles.generalButton }}
                                    onClick={() => { Datein.increasemonth.call(this) }}>{dateMonthUp()} </button>
                            </div>
                            <div style={{ ...styles.flex1 }}>
                                <button style={{ ...styles.dateButton, ...styles.generalButton }}
                                    onClick={() => { Datein.yearup.call(this) }}> {dateYearUp()}</button>
                            </div>

                        </div>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...styles.generalFont, ...smallFont }}>

                                <div className="calendar-grid">
                                    {Datein.showgrid.call(this)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)

        }

    }

    showdatein() {
        const styles = MyStylesheet();
        const pm = new PM()
        const regularFont = pm.getRegularFont.call(this);
        const Datein = new Start();
        const smallFont = pm.getSmallFont.call(this)


        return (
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1, ...styles.calenderContainer }}>

                    <div style={{ ...styles.dateinContainer, ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex5, ...regularFont, ...styles.generalFont }}>
                            Milestone Start <br /> <input type="date"
                                value={Datein.getvalue.call(this)}
                                style={{ ...styles.generalField, ...regularFont, ...styles.generalFont }}
                                onChange={event => { Datein.handleChange.call(this, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex1, ...smallFont, ...styles.generalFont }}>
                            <button style={{ ...styles.dateButton, ...styles.generalButton }}
                                onClick={() => { Datein.showCalender.call(this) }}
                                id="btn-opendatemenu">
                                {Datein.handleopendatemenu.call(this)}
                            </button>
                        </div>
                    </div>

                    {Datein.showdatemenu.call(this)}

                </div>
            </div>
        )

    }

}
export default Start;