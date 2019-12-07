class Calendar {
    setDayStart(dateencoded) {

        if (this.state.activemilestoneid) {

            let mymaterial = this.getactivemilestone();
            let timein = mymaterial.start;
            let newtimein = inputDateSecActiveIDTimein(dateencoded, timein)
            if (this.props.projectsprovider.hasOwnProperty("length")) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("schedulematerials")) {
                            // eslint-disable-next-line
                            myproject.projectmilestones.mymilestone.map((mymaterial, j) => {
                                if (mymaterial.materialid === materialid) {
                                    this.props.projectsprovider[i].projectmilestones.mymilestone[j].start = newtimein;
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
            let datein = inputDateObjandSecReturnObj(dateencoded, this.state.start);
            this.setState({ datein, render: 'render' })
        }

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
                className={`calendar-date`}
                onClick={event => { this.setDayStart(dateencoded) }}
            > {day}</div>)
        }
        return showday;
    }

    showgridstart(datein) {

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
        return gridcalender;
    }
}