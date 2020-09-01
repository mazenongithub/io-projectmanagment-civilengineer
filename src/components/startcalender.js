import React from 'react';
import PM from './pm';
import { MyStylesheet } from './styles';
import { removeIconSmall, dropDateIcon } from './svg';
import { monthstring, getFirstIsOnDate, check_29_feb_leapyear_date, check_30_date, check_31_date, getDayString } from './functions'
import StartDate from './start';

class MaterialCalender {

    handleday(day) {
        const timein = new StartDate();
        if (day < 10) {
            day = `0${day}`
        }
        timein.handleday.call(this, day);
    }

    showicon() {
        const styles = MyStylesheet();
        const pm = new PM();
        const removeIcon = pm.getremoveicon.call(this);
        const dropIcon = pm.getdropicon.call(this)
        if (this.state.startcalender) {
            return (
                <button style={{ ...styles.generalButton, ...removeIcon }} onClick={() => { this.setState({ startcalender: false }) }}>{removeIconSmall()} </button>
            )
        } else {
            return (
                <button style={{ ...styles.generalButton, ...dropIcon }} onClick={() => { this.setState({ startcalender: true }) }}>{dropDateIcon()} </button>
            )
        }

    }
    showlabel() {
        const pm = new PM();
        const headerFont = pm.getHeaderFont.call(this);
        const styles = MyStylesheet();
        if (this.state.startcalender) {
            let day = this.state.startdateday;
            let year = this.state.startdateyear;
            let month = this.state.startdatemonth;
            const datestring = `${year}/${month}/${day}`
            const newDate = new Date(datestring);
            month = monthstring(newDate.getMonth());
            const date = newDate.getDate();
            year = newDate.getFullYear();
            const daystring = getDayString(newDate.getDay())

            return (<span className="createlink" style={{ ...styles.generalFont, ...headerFont }}>{daystring}, {month} {date}, {year}</span>
            )
        } else {
            return;
        }
    }
    activecell(num) {
        if (Number(num) === Number(this.state.startdateday)) {
            return ({ backgroundColor: '#FED727', borderRadius: '5px' })
        } else {
            return;
        }

    }

    showCalender() {
        const styles = MyStylesheet();
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this);
        const calendertimein = new MaterialCalender();
        let day = this.state.startdateday;
        let year = this.state.startdateyear;
        let month = this.state.startdatemonth;
        const datestring = `${year}/${month}/${day}`
        const newDate = new Date(datestring);
        const firstofmonth =  getFirstIsOnDate(newDate);
        const check29 = check_29_feb_leapyear_date(newDate);
        const check30 = check_30_date(newDate);
        const check31 = check_31_date(newDate);
   
        const cell_1 = () => {
            if (firstofmonth === "Sun") {
                return (1)
            }
        }

        const cell_2 = () => {
            switch (firstofmonth) {
                case "Sun":
                    return (2);
                case "Mon":
                    return (1)
                default:
                    break;


            }
            if (firstofmonth === "sun") {
                return (1)
            }
        }

        const cell_3 = () => {
            switch (firstofmonth) {
                case "Sun":
                    return (3);

                case "Mon":
                    return (2)
                case "Tues":
                    return (1)
                default:
                    break;


            }
        }
        const cell_4 = () => {
            switch (firstofmonth) {
                case "Sun":
                    return (4)

                case "Mon":
                    return (3)

                case "Tues":
                    return (2)

                case "Weds":
                    return (1)

                default:
                    break;


            }
        }

        const cell_5 = () => {
            switch (firstofmonth) {
                case "Sun":
                    return (5)

                case "Mon":
                    return (4)

                case "Tues":
                    return (3)

                case "Weds":
                    return (2)

                case "Thurs":
                    return (1)

                default:
                    break;


            }
        }

        const cell_6 = () => {
            switch (firstofmonth) {
                case "Sun":
                    return (6)

                case "Mon":
                    return (5)

                case "Tues":
                    return (4)

                case "Weds":
                    return (3)

                case "Thurs":
                    return (2)

                case "Fri":
                    return (1)

                default:
                    break;


            }
        }

        const cell_7 = () => {
            switch (firstofmonth) {
                case "Sun":
                    return (7)

                case "Mon":
                    return (6)

                case "Tues":
                    return (5)

                case "Weds":
                    return (4)

                case "Thurs":
                    return (3)

                case "Fri":
                    return (2)

                case "Sat":
                    return (1)

                default:
                    break;


            }
        }

        const cell_8 = () => {
            switch (firstofmonth) {
                case "Sun":
                    return (8)

                case "Mon":
                    return (7)

                case "Tues":
                    return (6)

                case "Weds":
                    return (5)

                case "Thurs":
                    return (4)

                case "Fri":
                    return (3)

                case "Sat":
                    return (2)

                default:
                    break;


            }
        }


        const cell_9 = () => {
            switch (firstofmonth) {
                case "Sun":
                    return (9)

                case "Mon":
                    return (8)

                case "Tues":
                    return (7)

                case "Weds":
                    return (6)

                case "Thurs":
                    return (5)

                case "Fri":
                    return (4)

                case "Sat":
                    return (3)

                default:
                    break;


            }
        }

        const cell_10 = () => {
            switch (firstofmonth) {
                case "Sun":
                    return (10)

                case "Mon":
                    return (9)

                case "Tues":
                    return (8)

                case "Weds":
                    return (7)

                case "Thurs":
                    return (6)

                case "Fri":
                    return (5)

                case "Sat":
                    return (4)

                default:
                    break;


            }
        }


        const cell_11 = () => {
            switch (firstofmonth) {
                case "Sun":
                    return (11)

                case "Mon":
                    return (10)

                case "Tues":
                    return (9)

                case "Weds":
                    return (8)

                case "Thurs":
                    return (7)

                case "Fri":
                    return (6)

                case "Sat":
                    return (5)

                default:
                    break;


            }
        }

        const cell_12 = () => {
            switch (firstofmonth) {
                case "Sun":
                    return (12)

                case "Mon":
                    return (11)

                case "Tues":
                    return (10)

                case "Weds":
                    return (9)

                case "Thurs":
                    return (8)

                case "Fri":
                    return (7)

                case "Sat":
                    return (6)

                default:
                    break;


            }
        }

        const cell_13 = () => {
            switch (firstofmonth) {
                case "Sun":
                    return (13)

                case "Mon":
                    return (12)

                case "Tues":
                    return (11)

                case "Weds":
                    return (10)

                case "Thurs":
                    return (9)

                case "Fri":
                    return (8)

                case "Sat":
                    return (7)

                default:
                    break;


            }
        }

        const cell_14 = () => {
            switch (firstofmonth) {
                case "Sun":
                    return (14)

                case "Mon":
                    return (13)

                case "Tues":
                    return (12)

                case "Weds":
                    return (11)

                case "Thurs":
                    return (10)

                case "Fri":
                    return (9)

                case "Sat":
                    return (8)

                default:
                    break;


            }
        }


        const cell_15 = () => {
            switch (firstofmonth) {
                case "Sun":
                    return (15)

                case "Mon":
                    return (14)

                case "Tues":
                    return (13)

                case "Weds":
                    return (12)

                case "Thurs":
                    return (11)

                case "Fri":
                    return (10)

                case "Sat":
                    return (9)

                default:
                    break;


            }
        }


        const cell_16 = () => {
            switch (firstofmonth) {
                case "Sun":
                    return (16)

                case "Mon":
                    return (15)

                case "Tues":
                    return (14)

                case "Weds":
                    return (13)

                case "Thurs":
                    return (12)

                case "Fri":
                    return (11)

                case "Sat":
                    return (10)

                default:
                    break;


            }
        }

        const cell_17 = () => {
            switch (firstofmonth) {
                case "Sun":
                    return (17)

                case "Mon":
                    return (16)

                case "Tues":
                    return (15)

                case "Weds":
                    return (14)

                case "Thurs":
                    return (13)

                case "Fri":
                    return (12)

                case "Sat":
                    return (11)

                default:
                    break;


            }
        }


        const cell_18 = () => {
            switch (firstofmonth) {
                case "Sun":
                    return (18)

                case "Mon":
                    return (17)

                case "Tues":
                    return (16)

                case "Weds":
                    return (15)

                case "Thurs":
                    return (14)

                case "Fri":
                    return (13)

                case "Sat":
                    return (12)

                default:
                    break;


            }
        }

        const cell_19 = () => {
            switch (firstofmonth) {
                case "Sun":
                    return (19)

                case "Mon":
                    return (18)

                case "Tues":
                    return (17)

                case "Weds":
                    return (16)

                case "Thurs":
                    return (15)

                case "Fri":
                    return (14)

                case "Sat":
                    return (13)

                default:
                    break;


            }
        }

        const cell_20 = () => {
            switch (firstofmonth) {
                case "Sun":
                    return (20)

                case "Mon":
                    return (19)

                case "Tues":
                    return (18)

                case "Weds":
                    return (17)

                case "Thurs":
                    return (16)

                case "Fri":
                    return (15)

                case "Sat":
                    return (14)

                default:
                    break;


            }
        }

        const cell_21 = () => {
            switch (firstofmonth) {
                case "Sun":
                    return (21)

                case "Mon":
                    return (20)

                case "Tues":
                    return (19)

                case "Weds":
                    return (18)

                case "Thurs":
                    return (17)

                case "Fri":
                    return (16)

                case "Sat":
                    return (15)

                default:
                    break;


            }
        }




        const cell_22 = () => {
            switch (firstofmonth) {
                case "Sun":
                    return (22)

                case "Mon":
                    return (21)

                case "Tues":
                    return (20)

                case "Weds":
                    return (19)

                case "Thurs":
                    return (18)

                case "Fri":
                    return (17)

                case "Sat":
                    return (16)

                default:
                    break;


            }
        }


        const cell_23 = () => {
            switch (firstofmonth) {
                case "Sun":
                    return (23)

                case "Mon":
                    return (22)

                case "Tues":
                    return (21)

                case "Weds":
                    return (20)

                case "Thurs":
                    return (19)

                case "Fri":
                    return (18)

                case "Sat":
                    return (17)

                default:
                    break;


            }
        }

        const cell_24 = () => {
            switch (firstofmonth) {
                case "Sun":
                    return (24)

                case "Mon":
                    return (23)

                case "Tues":
                    return (22)

                case "Weds":
                    return (21)

                case "Thurs":
                    return (20)

                case "Fri":
                    return (19)

                case "Sat":
                    return (18)

                default:
                    break;


            }
        }


        const cell_25 = () => {
            switch (firstofmonth) {
                case "Sun":
                    return (25)

                case "Mon":
                    return (24)

                case "Tues":
                    return (23)

                case "Weds":
                    return (22)

                case "Thurs":
                    return (21)

                case "Fri":
                    return (20)

                case "Sat":
                    return (19)

                default:
                    break;


            }
        }

        const cell_26 = () => {
            switch (firstofmonth) {
                case "Sun":
                    return (26)

                case "Mon":
                    return (25)

                case "Tues":
                    return (24)

                case "Weds":
                    return (23)

                case "Thurs":
                    return (22)

                case "Fri":
                    return (21)

                case "Sat":
                    return (20)

                default:
                    break;


            }
        }

        const cell_27 = () => {
            switch (firstofmonth) {
                case "Sun":
                    return (27)

                case "Mon":
                    return (26)

                case "Tues":
                    return (25)

                case "Weds":
                    return (24)

                case "Thurs":
                    return (23)

                case "Fri":
                    return (22)

                case "Sat":
                    return (21)

                default:
                    break;


            }
        }

        const cell_28 = () => {
            switch (firstofmonth) {
                case "Sun":
                    return (28)

                case "Mon":
                    return (27)

                case "Tues":
                    return (26)

                case "Weds":
                    return (25)

                case "Thurs":
                    return (24)

                case "Fri":
                    return (23)

                case "Sat":
                    return (22)

                default:
                    break;


            }
        }


        const cell_29 = () => {
            switch (firstofmonth) {
                case "Sun":
                    return (check29)

                case "Mon":
                    return (28)

                case "Tues":
                    return (27)

                case "Weds":
                    return (26)

                case "Thurs":
                    return (25)

                case "Fri":
                    return (24)

                case "Sat":
                    return (23)

                default:
                    break;


            }
        }

        const cell_30 = () => {
            switch (firstofmonth) {
                case "Sun":
                    return (check30)

                case "Mon":
                    return (check29)

                case "Tues":
                    return (28)

                case "Weds":
                    return (27)

                case "Thurs":
                    return (26)

                case "Fri":
                    return (25)

                case "Sat":
                    return (24)

                default:
                    break;


            }
        }

        const cell_31 = () => {
            switch (firstofmonth) {
                case "Sun":
                    return (check31)

                case "Mon":
                    return (check30)

                case "Tues":
                    return (check29)

                case "Weds":
                    return (28)

                case "Thurs":
                    return (27)

                case "Fri":
                    return (26)

                case "Sat":
                    return (25)

                default:
                    break;


            }
        }

        const cell_32 = () => {
            switch (firstofmonth) {
                case "Sun":
                    break;
                case "Mon":
                    return (check31)

                case "Tues":
                    return (check30)

                case "Weds":
                    return (check29)

                case "Thurs":
                    return (28)

                case "Fri":
                    return (27)

                case "Sat":
                    return (26)

                default:
                    break;


            }
        }

        const cell_33 = () => {
            switch (firstofmonth) {
                case "Sun":
                    break;
                case "Mon":
                    break;
                case "Tues":
                    return (check31)

                case "Weds":
                    return (check30)

                case "Thurs":
                    return (check29)

                case "Fri":
                    return (28)

                case "Sat":
                    return (27)

                default:
                    break;


            }
        }

        const cell_34 = () => {
            switch (firstofmonth) {
                case "Sun":
                    break;
                case "Mon":
                    break;
                case "Tues":
                    break;
                case "Weds":
                    return (check31)

                case "Thurs":
                    return (check30)

                case "Fri":
                    return (check29)

                case "Sat":
                    return (28)

                default:
                    break;


            }
        }

        const cell_35 = () => {
            switch (firstofmonth) {
                case "Sun":
                    break;
                case "Mon":
                    break;
                case "Tues":
                    break;
                case "Weds":
                    break;
                case "Thurs":
                    return (check31)

                case "Fri":
                    return (check30)

                case "Sat":
                    return (check29)

                default:
                    break;


            }
        }

        const cell_36 = () => {
            switch (firstofmonth) {
                case "Sun":
                    break;
                case "Mon":
                    break;
                case "Tues":
                    break;
                case "Weds":
                    break;
                case "Thurs":
                    break;
                case "Fri":
                    return (check31)

                case "Sat":
                    return (check30)

                default:
                    break;


            }
        }

        const cell_37 = () => {
            switch (firstofmonth) {
                case "Sun":
                    break;
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
                    return (check31)

                default:
                    break;


            }
        }
        if (this.state.startcalender) {
            return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1 }}>


                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span className="createlink" style={{ ...styles.generalFont, ...regularFont }}>Sun</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span className="createlink" style={{ ...styles.generalFont, ...regularFont }}>Mon</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span className="createlink" style={{ ...styles.generalFont, ...regularFont }}>Tue</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span className="createlink" style={{ ...styles.generalFont, ...regularFont }}>Wed</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span className="createlink" style={{ ...styles.generalFont, ...regularFont }}>Thu</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span className="createlink" style={{ ...styles.generalFont, ...regularFont }}>Fri</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span className="createlink" style={{ ...styles.generalFont, ...regularFont }}>Sat</span>
                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span className="createlink" style={{ ...styles.generalFont, ...regularFont, ...calendertimein.activecell.call(this, cell_1()) }} onClick={() => { calendertimein.handleday.call(this, cell_1()) }}>{cell_1()}</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span className="createlink" style={{ ...styles.generalFont, ...regularFont, ...calendertimein.activecell.call(this, cell_2()) }} onClick={() => { calendertimein.handleday.call(this, cell_2()) }}>{cell_2()}</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span className="createlink" style={{ ...styles.generalFont, ...regularFont, ...calendertimein.activecell.call(this, cell_3()) }} onClick={() => { calendertimein.handleday.call(this, cell_3()) }}>{cell_3()}</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span className="createlink" style={{ ...styles.generalFont, ...regularFont, ...calendertimein.activecell.call(this, cell_4()) }} onClick={() => { calendertimein.handleday.call(this, cell_4()) }}>{cell_4()}</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span className="createlink" style={{ ...styles.generalFont, ...regularFont, ...calendertimein.activecell.call(this, cell_5()) }} onClick={() => { calendertimein.handleday.call(this, cell_5()) }}>{cell_5()}</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span className="createlink" style={{ ...styles.generalFont, ...regularFont, ...calendertimein.activecell.call(this, cell_6()) }} onClick={() => { calendertimein.handleday.call(this, cell_6()) }}>{cell_6()}</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span className="createlink" style={{ ...styles.generalFont, ...regularFont, ...calendertimein.activecell.call(this, cell_7()) }} onClick={() => { calendertimein.handleday.call(this, cell_7()) }}>{cell_7()}</span>
                        </div>
                    </div>


                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span className="createlink" style={{ ...styles.generalFont, ...regularFont, ...calendertimein.activecell.call(this, cell_8()) }} onClick={() => { calendertimein.handleday.call(this, cell_8()) }}>{cell_8()}</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span className="createlink" style={{ ...styles.generalFont, ...regularFont, ...calendertimein.activecell.call(this, cell_9()) }} onClick={() => { calendertimein.handleday.call(this, cell_9()) }}>{cell_9()}</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span className="createlink" style={{ ...styles.generalFont, ...regularFont, ...calendertimein.activecell.call(this, cell_10()) }} onClick={() => { calendertimein.handleday.call(this, cell_10()) }}>{cell_10()}</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span className="createlink" style={{ ...styles.generalFont, ...regularFont, ...calendertimein.activecell.call(this, cell_11()) }} onClick={() => { calendertimein.handleday.call(this, cell_11()) }}>{cell_11()}</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span className="createlink" style={{ ...styles.generalFont, ...regularFont, ...calendertimein.activecell.call(this, cell_12()) }} onClick={() => { calendertimein.handleday.call(this, cell_12()) }}>{cell_12()}</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span className="createlink" style={{ ...styles.generalFont, ...regularFont, ...calendertimein.activecell.call(this, cell_13()) }} onClick={() => { calendertimein.handleday.call(this, cell_13()) }}>{cell_13()}</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span className="createlink" style={{ ...styles.generalFont, ...regularFont, ...calendertimein.activecell.call(this, cell_14()) }} onClick={() => { calendertimein.handleday.call(this, cell_14()) }}>{cell_14()}</span>
                        </div>
                    </div>


                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span className="createlink" style={{ ...styles.generalFont, ...regularFont, ...calendertimein.activecell.call(this, cell_15()) }} onClick={() => { calendertimein.handleday.call(this, cell_15()) }}>{cell_15()}</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span className="createlink" style={{ ...styles.generalFont, ...regularFont, ...calendertimein.activecell.call(this, cell_16()) }} onClick={() => { calendertimein.handleday.call(this, cell_16()) }}>{cell_16()}</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span className="createlink" style={{ ...styles.generalFont, ...regularFont, ...calendertimein.activecell.call(this, cell_17()) }} onClick={() => { calendertimein.handleday.call(this, cell_17()) }}>{cell_17()}</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span className="createlink" style={{ ...styles.generalFont, ...regularFont, ...calendertimein.activecell.call(this, cell_18()) }} onClick={() => { calendertimein.handleday.call(this, cell_18()) }}>{cell_18()}</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span className="createlink" style={{ ...styles.generalFont, ...regularFont, ...calendertimein.activecell.call(this, cell_19()) }} onClick={() => { calendertimein.handleday.call(this, cell_19()) }}>{cell_19()}</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span className="createlink" style={{ ...styles.generalFont, ...regularFont, ...calendertimein.activecell.call(this, cell_20()) }} onClick={() => { calendertimein.handleday.call(this, cell_20()) }}>{cell_20()}</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span className="createlink" style={{ ...styles.generalFont, ...regularFont, ...calendertimein.activecell.call(this, cell_21()) }} onClick={() => { calendertimein.handleday.call(this, cell_21()) }}>{cell_21()}</span>
                        </div>
                    </div>


                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span className="createlink" style={{ ...styles.generalFont, ...regularFont, ...calendertimein.activecell.call(this, cell_22()) }} onClick={() => { calendertimein.handleday.call(this, cell_22()) }}>{cell_22()}</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span className="createlink" style={{ ...styles.generalFont, ...regularFont, ...calendertimein.activecell.call(this, cell_23()) }} onClick={() => { calendertimein.handleday.call(this, cell_23()) }}>{cell_23()}</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span className="createlink" style={{ ...styles.generalFont, ...regularFont, ...calendertimein.activecell.call(this, cell_24()) }} onClick={() => { calendertimein.handleday.call(this, cell_24()) }}>{cell_24()}</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span className="createlink" style={{ ...styles.generalFont, ...regularFont, ...calendertimein.activecell.call(this, cell_25()) }} onClick={() => { calendertimein.handleday.call(this, cell_25()) }}>{cell_25()}</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span className="createlink" style={{ ...styles.generalFont, ...regularFont, ...calendertimein.activecell.call(this, cell_26()) }} onClick={() => { calendertimein.handleday.call(this, cell_26()) }}>{cell_26()}</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span className="createlink" style={{ ...styles.generalFont, ...regularFont, ...calendertimein.activecell.call(this, cell_27()) }} onClick={() => { calendertimein.handleday.call(this, cell_27()) }}>{cell_27()}</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span className="createlink" style={{ ...styles.generalFont, ...regularFont, ...calendertimein.activecell.call(this, cell_28()) }} onClick={() => { calendertimein.handleday.call(this, cell_28()) }}>{cell_28()}</span>
                        </div>
                    </div>


                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span className="createlink" style={{ ...styles.generalFont, ...regularFont, ...calendertimein.activecell.call(this, cell_29()) }} onClick={() => { calendertimein.handleday.call(this, cell_29()) }}>{cell_29()}</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span className="createlink" style={{ ...styles.generalFont, ...regularFont, ...calendertimein.activecell.call(this, cell_30()) }} onClick={() => { calendertimein.handleday.call(this, cell_30()) }}>{cell_30()}</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span className="createlink" style={{ ...styles.generalFont, ...regularFont, ...calendertimein.activecell.call(this, cell_31()) }} onClick={() => { calendertimein.handleday.call(this, cell_31()) }}>{cell_31()}</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span className="createlink" style={{ ...styles.generalFont, ...regularFont, ...calendertimein.activecell.call(this, cell_32()) }} onClick={() => { calendertimein.handleday.call(this, cell_32()) }}>{cell_32()}</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span className="createlink" style={{ ...styles.generalFont, ...regularFont, ...calendertimein.activecell.call(this, cell_33()) }} onClick={() => { calendertimein.handleday.call(this, cell_33()) }}>{cell_33()}</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span className="createlink" style={{ ...styles.generalFont, ...regularFont, ...calendertimein.activecell.call(this, cell_34()) }} onClick={() => { calendertimein.handleday.call(this, cell_34()) }}>{cell_34()}</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span className="createlink" style={{ ...styles.generalFont, ...regularFont, ...calendertimein.activecell.call(this, cell_35()) }} onClick={() => { calendertimein.handleday.call(this, cell_35()) }}>{cell_35()}</span>
                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span className="createlink" style={{ ...styles.generalFont, ...regularFont, ...calendertimein.activecell.call(this, cell_36()) }} onClick={() => { calendertimein.handleday.call(this, cell_36()) }}>{cell_36()}</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span className="createlink" style={{ ...styles.generalFont, ...regularFont, ...calendertimein.activecell.call(this, cell_37()) }} onClick={() => { calendertimein.handleday.call(this, cell_37()) }}>{cell_37()}</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span className="createlink" style={{ ...styles.generalFont, ...regularFont }}>&nbsp;</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span className="createlink" style={{ ...styles.generalFont, ...regularFont }}>&nbsp;</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span className="createlink" style={{ ...styles.generalFont, ...regularFont }}>&nbsp;</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span className="createlink" style={{ ...styles.generalFont, ...regularFont }}>&nbsp;</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span className="createlink" style={{ ...styles.generalFont, ...regularFont }}>&nbsp;</span>
                        </div>
                    </div>





                </div>
            </div>)

        } else {
            return;
        }
    }



    showMaterialCalender() {
        const timein = new MaterialCalender();
        const styles = MyStylesheet();

        return (
            <div style={{ ...styles.generalFlex, ...styles.marginTop10 }}>
                <div style={{ ...styles.flex1, ...styles.calenderContainer }}>

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex4, ...styles.alignCenter }}>
                            {timein.showlabel.call(this)}
                        </div>
                        <div style={{ ...styles.flex1, ...styles.positionRight }}>
                            {timein.showicon.call(this)}

                        </div>
                    </div>


                    {timein.showCalender.call(this)}


                </div>
            </div>
        )
    }



}

export default MaterialCalender;
