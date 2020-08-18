import React from 'react';
export function formatDate(timein) {
    let datestring = timein.toLocaleDateString();
    return datestring;

}

export function CreatePredessor(predessor, type) {
    return ({ predessor, type })
}


export function validateYear(year) {
    const reg_ex = /^[12][0-9]{3}$/;
    return (reg_ex.test(year));
}
export function validateDate(date) {
    const reg_ex = /^(0?[1-9]|[12][0-9]|3[01])$/;
    return (reg_ex.test(date));

}
export function validateMonth(mon) {
    const reg_ex = /^0[1-9]|1[0-2]$/;
    return (reg_ex.test(mon))
}

export function getFirstIsOn(mydate) {
    let monthdisplay = mydate.getMonth() + 1;
    let fullyear = mydate.getFullYear();
    let thefirstofthemonth = new Date(`${fullyear}/${monthdisplay}/1`);
    let firstday = thefirstofthemonth.getDay();
    switch (firstday) {
        case 0:
            return "Sun";
        case 1:
            return "Mon";
        case 2:
            return "Tues";
        case 3:
            return "Weds";
        case 4:
            return "Thurs";
        case 5:
            return "Fri";
        case 6:
            return "Sat";
        default:
            return;
    }
}

export function inputUTCStringOutputDateString(timeout) {
    // timeout = '2018-12-31T22:56:00-08:00';
    let dateobj = new Date(timeout);
    let gettime = dateobj.getTime();
    let offset = dateobj.getTimezoneOffset();
    offset = offset * 60 * 1000;
    gettime = gettime + offset;
    let mytime = new Date(gettime);
    mytime.getHours()
    let day = mytime.getDate();
    if (day < 10) {
        day = `0${day}`;
    }
    let month = mytime.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }


    let year = mytime.getFullYear();
    return `${month}/${day}/${year}`

}

export function inputUTCStringOutputDateObj(timeout) {
    // timeout = '2018-12-31T22:56:00-08:00';
    timeout = timeout.replace(/-/g, '/');
    let dateobj = new Date(timeout);
    let gettime = dateobj.getTime();
    let offset = dateobj.getTimezoneOffset();
    offset = offset * 60 * 1000;
    gettime = gettime - offset;
    let mytime = new Date(gettime);
    return mytime;

}
export function displayprovider(myteam) {
    return (<div>
        {myteam.firstname} {myteam.lastname}<br />
        {myteam.company} {myteam.jobtitle}<br />
        {myteam.provideraddress} <br />
        {myteam.providercity}, {myteam.providerstate}
        <br />{myteam.emailaddress} {myteam.phone}</div>)
}

export function NameOccupation(code) {

    let occupations = showOccupations();
    let name = "";
    // eslint-disable-next-line
    occupations.map(occupation => {

        if (occupation.code === Number(code)) {

            name = occupation.name;


        }
    })

    return name;
}
export function showOccupations() {
    let occupation = [
        { code: 11, name: "Management Occupations" },
        { code: 13, name: "Business and Financial Operations Occupations" },
        { code: 15, name: "Computer and Mathematical Occupations" },
        { code: 17, name: "Architecture and Engineering Occupations" },
        { code: 19, name: "Life, Physical, and Social Science Occupations" },
        { code: 21, name: "Community and Social Service Occupations" },
        { code: 23, name: "Legal Occupations" },
        { code: 25, name: "Educational Instruction and Library Occupations" },
        { code: 27, name: "Arts, Design, Entertainment, Sports, and Media Occupations" },
        { code: 29, name: "Healthcare Practitioners and Technical Occupations" },
        { code: 31, name: "Healthcare Support Occupations" },
        { code: 33, name: "Protective Service Occupations" },
        { code: 35, name: "Food Preparation and Serving Related Occupations" },
        { code: 37, name: "Building and Grounds Cleaning and Maintenance Occupations" },
        { code: 39, name: "Personal Care and Service Occupations" },
        { code: 41, name: "Sales and Related Occupations" },
        { code: 43, name: "Office and Administrative Support Occupations" },
        { code: 45, name: "Farming, Fishing, and Forestry Occupations" },
        { code: 47, name: "Construction and Extraction Occupations" },
        { code: 49, name: "Installation, Maintenance, and Repair Occupations" },
        { code: 51, name: "Production Occupations" },
        { code: 53, name: "Transportation and Material Moving Occupations" },
        { code: 55, name: "Military Specific Occupations" },
    ]
    return occupation;
}
export function inputdatestringOutPutDateObj(calendardate) {
    let offset = new Date().getTimezoneOffset() / 60;
    let sym = ""
    if (offset < 0) {
        offset = -offset;
        sym = "+";
    }
    else {
        sym = "-"
    }
    if (offset < 10) {
        offset = `0${offset}`
    }

    let newDate = new Date(`${calendardate.replace(/-/g, '-')} 00:00:00${sym}${offset}:00`)
    return newDate;
}
export function inputDateObjOutput(mytime) {
    // timeout = '2018-12-31T22:56:00-08:00';
    //no offset
    mytime.getHours()
    let day = mytime.getDate();
    if (day < 10) {
        day = `0${day}`;
    }
    let month = mytime.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }


    let year = mytime.getFullYear();
    return `${year}-${month}-${day}`


}
export function inputDateObjOutPutDateString(dateobj) {
    // timeout = '2018-12-31T22:56:00-08:00';

    let gettime = dateobj.getTime();
    let offset = dateobj.getTimezoneOffset();
    offset = offset * 60 * 1000;
    gettime = gettime + offset;
    let mytime = new Date(gettime);
    mytime.getHours()
    let day = mytime.getDate();
    if (day < 10) {
        day = `0${day}`;
    }
    let month = mytime.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }


    let year = mytime.getFullYear();
    return `${year}-${month}-${day}`


}
export function validateNewProjectID(projectid) {
    let errmsg = "";
    if (projectid) {
        let reg_ex = /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,34}(?:[A-Za-z0-9_]))?)$/
        let test = reg_ex.test(projectid);
        if (!test) {
            errmsg = `Invalid format ${projectid}`;
        }
        if (projectid.length > 36) {
            errmsg += `Max characters is 36`;
        }


    }
    return errmsg;
}
export function capitalizeFirst(value) {
    value = value.trim();
    value = value.toLowerCase()
    value = value.charAt(0).toUpperCase() + value.slice(1);
    return value;
}
export function datefromDBString(datein) {
    let offsetdate = new Date();
    let offset = offsetdate.getTimezoneOffset();
    offset = offset / 60
    if (offset < 10) {
        offset = `0${offset}`
    }
    let dateobj = new Date(`${datein}T00:00-${offset}:00`);
    let day = dateobj.getDay();
    let month = dateobj.getMonth() + 1;
    let year = dateobj.getFullYear();
    day = dateobj.getDate();
    if (day < 10) {
        day = `0${day}`;
    }

    if (month < 10) {
        month = `0${month}`;
    }



    return (`${year}-${month}-${day}`)

}
export function datefromDBputDateObj(timein) {
    let offsetdate = new Date();
    let offset = offsetdate.getTimezoneOffset();
    offset = offset / 60
    if (offset < 10) {
        offset = `0${offset}`
    }
    return new Date(`${timein}T00:00-${offset}:00`);

}
export function inputDateObjDateStringNoOffset(dateobj) {
    // timeout = '2018-12-31T22:56:00-08:00';

    let gettime = dateobj.getTime();
    let mytime = new Date(gettime);
    mytime.getHours()
    let day = mytime.getDate();
    if (day < 10) {
        day = `0${day}`;
    }
    let month = mytime.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }


    let year = mytime.getFullYear();
    return `${year}-${month}-${day}`


}
export function getDateStringFromUTC(timeout) {
    // timeout = '2018-12-31T22:56:00-08:00';



}
export function decreaseCalendarDaybyOneMonth(timein) {
    let offset = getOffset();
    let datein = new Date(`${timein.replace(/-/g, '/')} 00:00:00${offset}`)
    let currentMonth = datein.getMonth() + 1;
    let year = datein.getFullYear();
    let decreaseMonth = currentMonth;
    if (currentMonth === 1) {
        decreaseMonth = 12;
        year -= 1
    } else {
        decreaseMonth -= 1;
    }

    let day = datein.getDate();
    if (decreaseMonth < 10) {
        decreaseMonth = `0${decreaseMonth}`
    }

    if (day < 10) {
        day = `0${day}`
    }

    let newDate = `${year}-${decreaseMonth}-${day}`
    return (newDate)
}
export function subtractMonthDateObj(datein) {
    let month = datein.getMonth();
    let year = datein.getFullYear();
    if (month === 0) {
        month = 11;
        year = year - 1;
    }
    else {
        month = month - 1;
    }

    let date = datein.getDate();
    let hours = datein.getHours();
    month = month + 1
    if (month < 10) {
        month = `0${month}`
    }
    date = datein.getDate();
    if (date < 10) {
        date = `0${date}`
    }
    hours = datein.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }
    let minutes = datein.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let seconds = datein.getSeconds();
    if (seconds < 10) {
        seconds = `0${seconds}`
    }


    return (new Date(`${year}/${month}/${date} ${hours}:${minutes}:${seconds}`))
}

export function addoneMonthDateObj(datein) {
    let month = datein.getMonth();
    let year = datein.getFullYear();
    if (month === 11) {
        month = 0;
        year = year + 1;
    }
    else {
        month = month + 1;
    }

    let date = datein.getDate();
    let hours = datein.getHours();
    month = month + 1
    if (month < 10) {
        month = `0${month}`
    }
    date = datein.getDate();
    if (date < 10) {
        date = `0${date}`
    }
    hours = datein.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }
    let minutes = datein.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let seconds = datein.getSeconds();
    if (seconds < 10) {
        seconds = `0${seconds}`
    }


    return (new Date(`${year}/${month}/${date} ${hours}:${minutes}:${seconds}`))
}


export function increaseCalendarDayOneMonth(monthstring) {
    let offset = getOffsetDate(monthstring);
    let datein = new Date(`${monthstring.replace(/-/g, '/')} 00:00:00${offset}`)
    let currentMonth = datein.getMonth() + 1;
    let year = datein.getFullYear();
    let increaseMonth = currentMonth;
    if (currentMonth === 12) {
        increaseMonth = 1;
        year += 1
    } else {
        increaseMonth += 1;
    }

    let day = datein.getDate();
    if (increaseMonth < 10) {
        increaseMonth = `0${increaseMonth}`
    }

    if (day < 10) {
        day = `0${day}`
    }

    let newDate = `${year}-${increaseMonth}-${day}`
    return (newDate)
}

export function increaseCalendarDaybyOneYear(timein) {
    let offset = getOffset();
    let datein = new Date(`${timein.replace(/-/g, '/')} 00:00:00${offset}`)
    let currentYear = datein.getFullYear();
    let increaseYear = currentYear + 1;
    let month = datein.getMonth() + 1;
    let day = datein.getDate();
    if (month < 10) {
        month = `0${month}`
    }
    if (day < 10) {
        day = `0${day}`
    }
    let newDate = `${increaseYear}-${month}-${day}`
    return (newDate)
}
export function addoneYearDateObj(datein) {
    let month = datein.getMonth();
    let year = datein.getFullYear();
    year = year + 1;

    let date = datein.getDate();
    let hours = datein.getHours();
    month = month + 1
    if (month < 10) {
        month = `0${month}`
    }
    date = datein.getDate();
    if (date < 10) {
        date = `0${date}`
    }
    hours = datein.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }
    let minutes = datein.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let seconds = datein.getSeconds();
    if (seconds < 10) {
        seconds = `0${seconds}`
    }

    return (new Date(`${year}/${month}/${date} ${hours}:${minutes}:${seconds}`))
}

export function decreaseCalendarDaybyOneYear(timein) {
    let offset = getOffset();
    let datein = new Date(`${timein.replace(/-/g, '/')} 00:00:00${offset}`)
    let currentYear = datein.getFullYear();
    let decreaseYear = currentYear - 1;
    let month = datein.getMonth() + 1;
    let day = datein.getDate();
    if (month < 10) {
        month = `0${month}`
    }
    if (day < 10) {
        day = `0${day}`
    }
    let newDate = `${decreaseYear}-${month}-${day}`
    return (newDate)
}
export function inputDatePickerOutputDateObj(value) {

    let offset = new Date().getTimezoneOffset() / 60
    let sym = "+";
    if (offset > 0) {
        sym = "-";
    }
    if (Math.abs(offset) < 10) {
        offset = `0${offset}`
    }

    let newDate = new Date(`${value.replace(/-/g, '-')} 00:00:00${sym}${offset}:00`)
    return newDate;
}

export function subtractoneYearDateObj(datein) {
    let month = datein.getMonth();
    let year = datein.getFullYear();
    year = year - 1;

    let date = datein.getDate();
    let hours = datein.getHours();
    month = month + 1
    if (month < 10) {
        month = `0${month}`
    }
    date = datein.getDate();
    if (date < 10) {
        date = `0${date}`
    }
    hours = datein.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }
    let minutes = datein.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let seconds = datein.getSeconds();
    if (seconds < 10) {
        seconds = `0${seconds}`
    }


    return (new Date(`${year}/${month}/${date} ${hours}:${minutes}:${seconds}`))
}

export function addincDateObj(datein, inc) {
    return (new Date(datein.getTime() + inc))
}
export function subtractincDateObj(datein, inc) {
    return (new Date(datein.getTime() - inc))
}
export function increaseDateStringByOneMonth(timein) {

    let offset = new Date().getTimezoneOffset() / 60;
    let sym = "";
    if (offset > 0) {
        sym = "-";
    }
    else {
        sym = "+";
        offset = -offset;
    }

    let datein = new Date(`${timein.replace(/-/g, '/')}${sym}${offset}:00`);
    let month = datein.getMonth() + 1;
    let year = datein.getFullYear();
    if (month === 12) {
        month = 1;
        year = year + 1;
    }
    else {
        month = month + 1;
    }

    let date = datein.getDate();
    let hours = datein.getHours();

    if (month < 10) {
        month = `0${month}`;
    }
    date = datein.getDate();
    if (date < 10) {
        date = `0${date}`;
    }
    hours = datein.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = datein.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let seconds = datein.getSeconds();
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
 
    return (`${year}-${month}-${date} ${hours}:${minutes}:${seconds}`);
}
export function increaseDateStringByOneYear(timein) {
    let offset = new Date().getTimezoneOffset() / 60;
    let sym = "";
    if (offset > 0) {
        sym = "-";
    }
    else {
        sym = "+";
        offset = -offset;
    }

    let datein = new Date(`${timein.replace(/-/g, '/')}${sym}${offset}:00`);
    let month = datein.getMonth();
    let year = datein.getFullYear();
    year = year + 1;

    let date = datein.getDate();
    let hours = datein.getHours();
    month = month + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    date = datein.getDate();
    if (date < 10) {
        date = `0${date}`;
    }
    hours = datein.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = datein.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let seconds = datein.getSeconds();
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    return (`${year}-${month}-${date} ${hours}:${minutes}:${seconds}`);
}
export function milestoneformatdatestring(datein) {

    let dateinArray = datein.split('-');
    if (dateinArray.length === 3) {
        let newDate = `${dateinArray[1]}/${dateinArray[2]}/${dateinArray[0]}`
        return newDate;
    } else {
        return datein;
    }

}
export function inputDateTimeOutDateObj(timein) {
   
    let newDate = new Date(`${timein.replace(/-/g, '/')} UTC`);
    return (newDate)
}
export function inputTimeDateOutputUTCString(timein) {
    let offset = new Date().getTimezoneOffset() / 60;
    let sym = "";

    if (offset > 0) {
        sym = "-";
    }
    else {
        sym = "+";

    }
    if (Math.abs(offset) < 10) {
        offset = `0${offset}`
    }
    let dates = timein.split('T');
    let datein = dates[0];
    timein = dates[1];

    let newDate = new Date(`${datein.replace(/-/g, '/')} ${timein}:00${sym}${offset}:00`)
    let newDatesec = newDate.getTime();
    let offsetsec = newDate.getTimezoneOffset() * (60 * 1000)
    let fakedate = new Date(newDatesec + offsetsec)
    let year = fakedate.getFullYear()
    let month = fakedate.getMonth() + 1;
    let date = fakedate.getDate();
    let hours = fakedate.getHours();
    if (month < 10) {
        month = `0${month}`;
    }

    if (date < 10) {
        date = `0${date}`;
    }

    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = fakedate.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let seconds = fakedate.getSeconds();
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    return (`${year}-${month}-${date} ${hours}:${minutes}:${seconds}`);
}

export function increasedatebyoneday(timein) {

    //let timein = '2020-12-31';
    let offset = getOffsetDate(timein);
    let datein = new Date(`${timein.replace(/-/g, '/')} 00:00:00${offset}`);
    let newdate = new Date(datein.getTime())
    let day = newdate.getDate();
    let month = newdate.getMonth() + 1;
    let year = newdate.getFullYear();
    if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
        if (day === 31) {
            day = 1;
            if (month !== 12) {
                month = month + 1;

            } else {
                month = 1;
                year = year + 1;
            }
        } else {
            day = day + 1;

        }

    }

    if (month === 4 || month === 6 || month === 9 || month === 11) {

        if (day === 30) {
            day = 1;
            month = month + 1;
        } else {
            day = day + 1;
        }
    }


    if (month === 2) {
        if (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) {
            if (day === 29) {
                day = 1;
                month = month + 1;
            }
        } else {
            if (day === 28) {
                day = 1;
                month = month + 1;
            }
        }

    }

    if (day < 10) {
        day = `0${day}`
    }

    if (month < 10) {
        month = `0${month}`
    }
    return (`${year}-${month}-${day}`)
}
export function increasedateStringbyInc(timein, inc) {

    let offset = getOffsetDate(timein)
    
    let datein = new Date(`${timein.replace(/-/g, '/')}${offset}`);
    let newdate = new Date(datein.getTime() + inc)

    let month = newdate.getMonth();
    let year = newdate.getFullYear();

    let date = newdate.getDate();
    let hours = newdate.getHours();
    month = month + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    date = newdate.getDate();
    if (date < 10) {
        date = `0${date}`;
    }
    hours = newdate.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = newdate.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let seconds = newdate.getSeconds();
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    return (`${year}-${month}-${date} ${hours}:${minutes}:${seconds}`);
}
export function decreasedateStringbyInc(timein, inc) {

    let offset = new Date().getTimezoneOffset() / 60;
    let sym = "";
    if (offset > 0) {
        sym = "-";
    }
    else {
        sym = "+";
        offset = -offset;
    }

    let datein = new Date(`${timein.replace(/-/g, '/')}${sym}${offset}:00`);
    let newdate = new Date(datein.getTime() - inc)

    let month = newdate.getMonth();
    let year = newdate.getFullYear();

    let date = newdate.getDate();
    let hours = newdate.getHours();
    month = month + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    date = newdate.getDate();
    if (date < 10) {
        date = `0${date}`;
    }
    hours = newdate.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = newdate.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let seconds = newdate.getSeconds();
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    return (`${year}-${month}-${date} ${hours}:${minutes}:${seconds}`);
}
export function decreaseDateStringByOneYear(timein) {
    let offset = new Date().getTimezoneOffset() / 60;
    let sym = "";
    if (offset > 0) {
        sym = "-";
    }
    else {
        sym = "+";
        offset = -offset;
    }

    let datein = new Date(`${timein.replace(/-/g, '/')}${sym}${offset}:00`);
    let month = datein.getMonth();
    let year = datein.getFullYear();
    year = year - 1;

    let date = datein.getDate();
    let hours = datein.getHours();
    month = month + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    date = datein.getDate();
    if (date < 10) {
        date = `0${date}`;
    }
    hours = datein.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = datein.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let seconds = datein.getSeconds();
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    return (`${year}-${month}-${date} ${hours}:${minutes}:${seconds}`);
}
export function inputTimeInDateStringforPicker(timein) {
    let dateobj = new Date(`${timein.replace(/-/g, '/')}-00:00`)


    let day = dateobj.getDate();
    let year = dateobj.getFullYear();
    let hours = dateobj.getHours();
    let month = dateobj.getMonth() + 1;
    hours = trailingzero(hours);
    let minutes = dateobj.getMinutes();
    minutes = trailingzero(minutes);
    let dayzero = trailingzero(day);
    month = trailingzero(month)
    let timestring = `${year}-${month}-${dayzero}T${hours}:${minutes}`;
    return timestring;
}
export function decreaseDateStringByOneMonth(timein) {
    let offset = new Date().getTimezoneOffset() / 60;
    let sym = "";
    if (offset > 0) {
        sym = "-";
    }
    else {
        sym = "+";
        offset = -offset;
    }

    let datein = new Date(`${timein.replace(/-/g, '/')}${sym}${offset}:00`);
    let month = datein.getMonth();
    let year = datein.getFullYear();
    if (month === 0) {
        month = 11;
        year = year - 1;
    }
    else {
        month = month - 1;
    }

    let date = datein.getDate();
    let hours = datein.getHours();
    month = month + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    date = datein.getDate();
    if (date < 10) {
        date = `0${date}`;
    }
    hours = datein.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = datein.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let seconds = datein.getSeconds();
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    return (`${year}-${month}-${date} ${hours}:${minutes}:${seconds}`);
}
export function inputUTCStringAddOffsetString(timein) {

    let datein = new Date(`${timein.replace(/-/g, '/')}-00:00`)
    let fullyear = datein.getFullYear();
    let month = datein.getMonth() + 1
    let date = datein.getDate();
    let hours = datein.getHours();
    fullyear = datein.getFullYear();
    month = datein.getMonth() + 1
    if (month < 10) {
        month = `0${month}`
    }
    date = datein.getDate();
    if (date < 10) {
        date = `0${date}`
    }
    hours = datein.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }
    let minutes = datein.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let seconds = datein.getSeconds();
    if (seconds < 10) {
        seconds = `0${seconds}`
    }


    return (`${fullyear}-${month}-${date} ${hours}:${minutes}:${seconds}`)

}
export function toggleAMDateObj(datein) {
    let hours = datein.getHours();
    let newDate = {};
    if (hours > 12) {
        newDate = new Date(datein.getTime() - (1000 * 60 * 60 * 12))
    }
    else {
        newDate = new Date(datein.getTime() + (1000 * 60 * 60 * 12))
    }
    return (newDate)

}
export function toggleAMTimeString(timein) {
    let datein = new Date(`${timein.replace(/-/g, '/')} UTC`)
    let hours = datein.getHours();
    let newDate = {};
    if (hours > 12) {
        newDate = new Date(datein.getTime() - (1000 * 60 * 60 * 12))
    }
    else {
        newDate = new Date(datein.getTime() + (1000 * 60 * 60 * 12))
    }
    let year = newDate.getFullYear();

    let month = newDate.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    hours = newDate.getHours()


    let day = newDate.getDate()
    if (day < 10) {
        day = `0${day}`
    }
    let minutes = newDate.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let offset = 2 * new Date().getTimezoneOffset() / 60
    let sym = "+";
    if (offset > 0) {
        sym = "-";
    }
    if (Math.abs(offset) < 10) {
        offset = `0${offset}`
    }
    offset = `${sym}${offset}:00`
    let UTCDate = new Date(`${year}-${month}-${day} ${hours}:${minutes}:00${offset}`)
    hours = UTCDate.getHours()
    if (hours < 10) {
        hours = `0${hours}`
    }
    month = UTCDate.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    day = UTCDate.getDate();
    if (day < 10) {
        day = `0${day}`
    }
    year = UTCDate.getFullYear();
    return (`${year}-${month}-${day} ${hours}:${minutes}:00`)

}
export function calchoursdateobj(dateout, datein) {
    let hours = (dateout.getTime() - datein.getTime()) / (1000 * 60 * 60)
    return hours;
}
export function inputUTCStringForLaborID(timein) {

    let datein = new Date(`${timein.replace(/-/g, '/')}-00:00`)
    let hours = datein.getHours();
    let ampm
    if (hours > 12) {
        hours = hours - 12;
        ampm = "PM"
    }
    else if (hours < 12) {
        ampm = "AM"
    }
    else if (hours === 0) {
        hours = 12;
        ampm = "AM"
    }
    else if (hours === 12) {
        ampm = "PM"
    }
    let minutes = datein.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let date = datein.getDate();
    if (date < 10) {
        date = `0${date}`
    }
    let year = datein.getFullYear()
    let month = datein.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    let seconds = datein.getSeconds();
    if (seconds < 10) {
        seconds = `0${seconds}`
    }
    return (`${month}/${date}/${year} ${hours}:${minutes}:${seconds} ${ampm}`)

}
export function inputUTCStringForMaterialID(timein) {

    timein = timein.replace(/-/g, '/')
    let offset = new Date().getTimezoneOffset() / 60;
    let sym = "";
    if (offset < 0) {
        offset = -offset;
        sym = "+"
    }
    else {
        sym = "-"
    }
    if (offset < 10) {
        offset = `0${offset}`

    }

    let newDate = new Date(`${timein} 00:00:00${sym}${offset}:00`)

    let date = newDate.getDate();
    if (date < 10) {
        date = `0${date}`
    }
    let year = newDate.getFullYear()
    let month = newDate.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    return (`${month}/${date}/${year}`)

}
export function inputUTCStringForMaterialIDWithTime(timein) {
    let offset = new Date().getTimezoneOffset() / 60;
    let sym = "";
    if (offset < 0) {
        sym = "+"
        offset = -offset
    }
    else {
        sym = "-"
    }
    if (offset < 10) {
        offset = `0${offset}`
    }
    let newDate = new Date(`${timein.replace(/-/g, '/')}${sym}${offset}:00`)
    let date = newDate.getDate();
    if (date < 10) {
        date = `0${date}`
    }
    let year = newDate.getFullYear()
    let month = newDate.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    return (`${month}/${date}/${year}`);

}
export function check_31(dateobj) {
    let month = dateobj.getMonth();
    if (month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11) {
        return 31;
    }
}


export function check_30(dateobj) {
    let month = dateobj.getMonth();
    if (month !== 1) {
        return 30;
    }
}

export function check_29_feb_leapyear(dateobj) {
    let month = dateobj.getMonth();

    if (month === 1) {
        let year = dateobj.getFullYear();
        if (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) {
            return 29;
        }
        else {
            return;
        }
    }
    else {
        return 29;
    }

}
export function inputDateObjOutputCalendarString(datein) {

    let month = datein.getMonth() + 1;
    let day = datein.getDate();
    let hours = datein.getHours();
    let ampm = 'AM'
    if (hours > 12) {
        hours = hours - 12;
        ampm = 'PM'
    }
    let minutes = datein.getMinutes();
    let year = datein.getFullYear();
    if (month < 10) {
        month = `0${month}`
    }
    if (day < 10) {
        day = `0${day}`
    }

    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    return (`${month}/${day}/${year} ${hours}:${minutes} ${ampm}`)
}
export function inputDateObjOutputAdjString(datein) {
    let offset = new Date().getTimezoneOffset() / 60
    let sym = "-";
    if (offset < 0) {
        sym = "+";
        offset = -offset;
    }
    if (offset < 10) {
        offset = `0${offset}`
    }
    let year = datein.getFullYear();


    let month = datein.getMonth() + 1;
    let day = datein.getDate();
    let hours = datein.getHours();
    let minutes = datein.getMinutes();
    if (month < 10) {
        month = `0${month}`
    }
    if (day < 10) {
        day = `0${day}`
    }
    if (hours < 10) {
        hours = `0${hours}`
    }
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let newDate = new Date(`${year}/${month}/${day} ${hours}:${minutes}:00${sym}${2 * offset}:00`)

    hours = newDate.getHours()
    month = newDate.getMonth() + 1;
    day = newDate.getDate();
    minutes = newDate.getMinutes();
    year = newDate.getFullYear();
    if (month < 10) {
        month = `0${month}`
    }
    if (day < 10) {
        day = `0${day}`
    }
    if (hours < 10) {
        hours = `0${hours}`
    }
    if (minutes < 10) {
        minutes = `0${minutes}`
    }

    return (`${year}-${month}-${day} ${hours}:${minutes}:00`)
}

export function getDateStringFromUTCSeconds(timeout) {
    // timeout = '2018-12-31T22:56:00-08:00';
    timeout = timeout.replace(/-/g, '/');
    let dateobj = new Date(timeout);
    let gettime = dateobj.getTime();
    let offset = dateobj.getTimezoneOffset();
    offset = offset * 60 * 1000;
    gettime = gettime - offset;
    let mytime = new Date(gettime);
    mytime.getHours()
    let hours = mytime.getHours();
    let minutes = mytime.getMinutes();
    let day = mytime.getDate();
    if (day < 10) {
        day = `0${day}`;
    }
    let month = mytime.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    if (hours < 10) {
        hours = `0${hours}`;
    }
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    offset = offset / (60000 * 60);


    if (Math.abs(offset) < 10) {
        offset = `0${offset}`;
    }
    let year = mytime.getFullYear();
    let seconds = mytime.getSeconds();
    if (seconds < 10) {
        seconds = `0${seconds}`
    }
    return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`


}

export function formatDateforCalendarDisplay(datein) {
    let month = getmonth(datein);
    let year = datein.getFullYear();
    return (`${month} ${year}`)
}
export function stripsecondsstring(mrkyte) {
    let theend = mrkyte.search("T");
    return mrkyte.substring(0, theend)

}
export function calculateamount(quantity, unitprice) {
    let amount = (Number(quantity) * Number(unitprice))
    return amount;

}




export function calculatetotalhours(timeout, timein) {

    let datein = new Date(`${timein.replace(/-/g, '/')}`)
    let dateout = new Date(`${timeout.replace(/-/g, '/')}`)
    let totalhours = ((dateout.getTime() - datein.getTime()) / (1000 * 60 * 60)).toFixed(2)
    return totalhours;
}
export function inputDateObjStripTimeOutputObj(dateobj) {
    let day = dateobj.getDate();
    let year = dateobj.getFullYear();
    let month = dateobj.getMonth() + 1;
    month = trailingzero(month);
    let dayzero = trailingzero(day);
    let timestring = `${year}-${month}-${dayzero}`;
    let calendardate = new Date(timestring);
    let offset = calendardate.getTimezoneOffset() * (60000);
    let mytime = calendardate.getTime();
    mytime = mytime + offset;
    let newdate = new Date(mytime)
    return newdate;
}
export function DateStripSeconds(dateobj) {
    let day = dateobj.getDate();
    let year = dateobj.getFullYear();
    let hours = dateobj.getHours();
    let month = dateobj.getMonth() + 1;
    month = trailingzero(month);
    hours = trailingzero(hours);
    let minutes = dateobj.getMinutes();
    minutes = trailingzero(minutes);
    let dayzero = trailingzero(day);
    let timestring = `${year}/${month}/${dayzero} ${hours}:${minutes}`;
    let calendardate = new Date(timestring);
    let dateencoded = calendardate.getTime();
    return dateencoded
}

export function inputDateObjOutputString(dateobj) {
    let day = dateobj.getDate();
    let year = dateobj.getFullYear();
    let hours = dateobj.getHours();
    let month = dateobj.getMonth() + 1;
    hours = trailingzero(hours);
    let minutes = dateobj.getMinutes();
    minutes = trailingzero(minutes);
    let dayzero = trailingzero(day);
    month = trailingzero(month)
    let timestring = `${year}-${month}-${dayzero}T${hours}:${minutes}`;
    return timestring;
}
export function getmytimefromUTC() {
    return;
}
export function formatTime() {
    return;
}
export function InputDateObjStripSecondsObj(dateobj) {
    let day = dateobj.getDate();
    let year = dateobj.getFullYear();
    let hours = dateobj.getHours();
    let month = dateobj.getMonth() + 1;
    month = trailingzero(month)
    hours = trailingzero(hours);
    let minutes = dateobj.getMinutes();
    minutes = trailingzero(minutes);
    let dayzero = trailingzero(day);
    let timestring = `${year}/${month}/${dayzero} ${hours}:${minutes}`;
    let calendardate = new Date(timestring);
    return calendardate;
}
export function leadingcomma(string) {
    let num = string.lastIndexOf(",")
    let len = string.length
    if (num + 1 === len) {
        return (string.substring(0, num))
    }
    else {
        return string
    }
}
export function getstatelist() {
    return ([
        { name: 'ALABAMA', abbreviation: 'AL' },
        { name: 'ALASKA', abbreviation: 'AK' },
        { name: 'ARIZONA', abbreviation: 'AZ' },
        { name: 'ARKANSAS', abbreviation: 'AR' },
        { name: 'CALIFORNIA', abbreviation: 'CA' },
        { name: 'COLORADO', abbreviation: 'CO' },
        { name: 'CONNECTICUT', abbreviation: 'CT' },
        { name: 'DELAWARE', abbreviation: 'DE' },
        { name: 'DISTRICT OF COLUMBIA', abbreviation: 'DC' },
        { name: 'FLORIDA', abbreviation: 'FL' },
        { name: 'GEORGIA', abbreviation: 'GA' },
        { name: 'HAWAII', abbreviation: 'HI' },
        { name: 'IDAHO', abbreviation: 'ID' },
        { name: 'ILLINOIS', abbreviation: 'IL' },
        { name: 'INDIANA', abbreviation: 'IN' },
        { name: 'IOWA', abbreviation: 'IA' },
        { name: 'KANSAS', abbreviation: 'KS' },
        { name: 'KENTUCKY', abbreviation: 'KY' },
        { name: 'LOUISIANA', abbreviation: 'LA' },
        { name: 'MAINE', abbreviation: 'ME' },
        { name: 'MARYLAND', abbreviation: 'MD' },
        { name: 'MASSACHUSETTS', abbreviation: 'MA' },
        { name: 'MICHIGAN', abbreviation: 'MI' },
        { name: 'MINNESOTA', abbreviation: 'MN' },
        { name: 'MISSISSIPPI', abbreviation: 'MS' },
        { name: 'MISSOURI', abbreviation: 'MO' },
        { name: 'MONTANA', abbreviation: 'MT' },
        { name: 'NEBRASKA', abbreviation: 'NE' },
        { name: 'NEVADA', abbreviation: 'NV' },
        { name: 'NEW HAMPSHIRE', abbreviation: 'NH' },
        { name: 'NEW JERSEY', abbreviation: 'NJ' },
        { name: 'NEW MEXICO', abbreviation: 'NM' },
        { name: 'NEW YORK', abbreviation: 'NY' },
        { name: 'NORTH CAROLINA', abbreviation: 'NC' },
        { name: 'NORTH DAKOTA', abbreviation: 'ND' },
        { name: 'OHIO', abbreviation: 'OH' },
        { name: 'OKLAHOMA', abbreviation: 'OK' },
        { name: 'OREGON', abbreviation: 'OR' },
        { name: 'PENNSYLVANIA', abbreviation: 'PA' },
        { name: 'RHODE ISLAND', abbreviation: 'RI' },
        { name: 'SOUTH CAROLINA', abbreviation: 'SC' },
        { name: 'SOUTH DAKOTA', abbreviation: 'SD' },
        { name: 'TENNESSEE', abbreviation: 'TN' },
        { name: 'TEXAS', abbreviation: 'TX' },
        { name: 'UTAH', abbreviation: 'UT' },
        { name: 'VERMONT', abbreviation: 'VT' },
        { name: 'VIRGIN ISLANDS', abbreviation: 'VI' },
        { name: 'VIRGINIA', abbreviation: 'VA' },
        { name: 'WASHINGTON', abbreviation: 'WA' },
        { name: 'WEST VIRGINIA', abbreviation: 'WV' },
        { name: 'WISCONSIN', abbreviation: 'WI' },
        { name: 'WYOMING', abbreviation: 'WY' }
    ])
}
export function AMPMfromTimeIn(timein) {
    let datein = new Date(`${timein.replace(/-/g, '/')} UTC`);
    let hours = datein.getHours();
    let ampm = "";
    if (hours >= 12) {
        ampm = "PM"
    } else {
        ampm = "AM"
    }
    return (ampm)
}
export function getOffset() {
    let offset = new Date().getTimezoneOffset() / 60
    let sym = "+";
    if (offset > 0) {
        sym = "-";
    }
    if (Math.abs(offset) < 10) {
        offset = `0${offset}`
    }
    return (`${sym}${offset}:00`)

}
export function getcountrylist() {
    return ([
        { "name": "United States", "code": "US" },
        { "name": "Afghanistan", "code": "AF" },
        { "name": "land Islands", "code": "AX" },
        { "name": "Albania", "code": "AL" },
        { "name": "Algeria", "code": "DZ" },
        { "name": "American Samoa", "code": "AS" },
        { "name": "AndorrA", "code": "AD" },
        { "name": "Angola", "code": "AO" },
        { "name": "Anguilla", "code": "AI" },
        { "name": "Antarctica", "code": "AQ" },
        { "name": "Antigua and Barbuda", "code": "AG" },
        { "name": "Argentina", "code": "AR" },
        { "name": "Armenia", "code": "AM" },
        { "name": "Aruba", "code": "AW" },
        { "name": "Australia", "code": "AU" },
        { "name": "Austria", "code": "AT" },
        { "name": "Azerbaijan", "code": "AZ" },
        { "name": "Bahamas", "code": "BS" },
        { "name": "Bahrain", "code": "BH" },
        { "name": "Bangladesh", "code": "BD" },
        { "name": "Barbados", "code": "BB" },
        { "name": "Belarus", "code": "BY" },
        { "name": "Belgium", "code": "BE" },
        { "name": "Belize", "code": "BZ" },
        { "name": "Benin", "code": "BJ" },
        { "name": "Bermuda", "code": "BM" },
        { "name": "Bhutan", "code": "BT" },
        { "name": "Bolivia", "code": "BO" },
        { "name": "Bosnia and Herzegovina", "code": "BA" },
        { "name": "Botswana", "code": "BW" },
        { "name": "Bouvet Island", "code": "BV" },
        { "name": "Brazil", "code": "BR" },
        { "name": "British Indian Ocean Territory", "code": "IO" },
        { "name": "Brunei Darussalam", "code": "BN" },
        { "name": "Bulgaria", "code": "BG" },
        { "name": "Burkina Faso", "code": "BF" },
        { "name": "Burundi", "code": "BI" },
        { "name": "Cambodia", "code": "KH" },
        { "name": "Cameroon", "code": "CM" },
        { "name": "Canada", "code": "CA" },
        { "name": "Cape Verde", "code": "CV" },
        { "name": "Cayman Islands", "code": "KY" },
        { "name": "Central African Republic", "code": "CF" },
        { "name": "Chad", "code": "TD" },
        { "name": "Chile", "code": "CL" },
        { "name": "China", "code": "CN" },
        { "name": "Christmas Island", "code": "CX" },
        { "name": "Cocos (Keeling) Islands", "code": "CC" },
        { "name": "Colombia", "code": "CO" },
        { "name": "Comoros", "code": "KM" },
        { "name": "Congo", "code": "CG" },
        { "name": "Congo, The Democratic Republic of the", "code": "CD" },
        { "name": "Cook Islands", "code": "CK" },
        { "name": "Costa Rica", "code": "CR" },
        { "name": "Cote D\"Ivoire", "code": "CI" },
        { "name": "Croatia", "code": "HR" },
        { "name": "Cuba", "code": "CU" },
        { "name": "Cyprus", "code": "CY" },
        { "name": "Czech Republic", "code": "CZ" },
        { "name": "Denmark", "code": "DK" },
        { "name": "Djibouti", "code": "DJ" },
        { "name": "Dominica", "code": "DM" },
        { "name": "Dominican Republic", "code": "DO" },
        { "name": "Ecuador", "code": "EC" },
        { "name": "Egypt", "code": "EG" },
        { "name": "El Salvador", "code": "SV" },
        { "name": "Equatorial Guinea", "code": "GQ" },
        { "name": "Eritrea", "code": "ER" },
        { "name": "Estonia", "code": "EE" },
        { "name": "Ethiopia", "code": "ET" },
        { "name": "Falkland Islands (Malvinas)", "code": "FK" },
        { "name": "Faroe Islands", "code": "FO" },
        { "name": "Fiji", "code": "FJ" },
        { "name": "Finland", "code": "FI" },
        { "name": "France", "code": "FR" },
        { "name": "French Guiana", "code": "GF" },
        { "name": "French Polynesia", "code": "PF" },
        { "name": "French Southern Territories", "code": "TF" },
        { "name": "Gabon", "code": "GA" },
        { "name": "Gambia", "code": "GM" },
        { "name": "Georgia", "code": "GE" },
        { "name": "Germany", "code": "DE" },
        { "name": "Ghana", "code": "GH" },
        { "name": "Gibraltar", "code": "GI" },
        { "name": "Greece", "code": "GR" },
        { "name": "Greenland", "code": "GL" },
        { "name": "Grenada", "code": "GD" },
        { "name": "Guadeloupe", "code": "GP" },
        { "name": "Guam", "code": "GU" },
        { "name": "Guatemala", "code": "GT" },
        { "name": "Guernsey", "code": "GG" },
        { "name": "Guinea", "code": "GN" },
        { "name": "Guinea-Bissau", "code": "GW" },
        { "name": "Guyana", "code": "GY" },
        { "name": "Haiti", "code": "HT" },
        { "name": "Heard Island and Mcdonald Islands", "code": "HM" },
        { "name": "Holy See (Vatican City State)", "code": "VA" },
        { "name": "Honduras", "code": "HN" },
        { "name": "Hong Kong", "code": "HK" },
        { "name": "Hungary", "code": "HU" },
        { "name": "Iceland", "code": "IS" },
        { "name": "India", "code": "IN" },
        { "name": "Indonesia", "code": "ID" },
        { "name": "Iran, Islamic Republic Of", "code": "IR" },
        { "name": "Iraq", "code": "IQ" },
        { "name": "Ireland", "code": "IE" },
        { "name": "Isle of Man", "code": "IM" },
        { "name": "Israel", "code": "IL" },
        { "name": "Italy", "code": "IT" },
        { "name": "Jamaica", "code": "JM" },
        { "name": "Japan", "code": "JP" },
        { "name": "Jersey", "code": "JE" },
        { "name": "Jordan", "code": "JO" },
        { "name": "Kazakhstan", "code": "KZ" },
        { "name": "Kenya", "code": "KE" },
        { "name": "Kiribati", "code": "KI" },
        { "name": "Korea, Democratic Peoples Republic of", "code": "KP" },
        { "name": "Korea, Republic of", "code": "KR" },
        { "name": "Kuwait", "code": "KW" },
        { "name": "Kyrgyzstan", "code": "KG" },
        { "name": "Lao Peoples Democratic Republic", "code": "LA" },
        { "name": "Latvia", "code": "LV" },
        { "name": "Lebanon", "code": "LB" },
        { "name": "Lesotho", "code": "LS" },
        { "name": "Liberia", "code": "LR" },
        { "name": "Libyan Arab Jamahiriya", "code": "LY" },
        { "name": "Liechtenstein", "code": "LI" },
        { "name": "Lithuania", "code": "LT" },
        { "name": "Luxembourg", "code": "LU" },
        { "name": "Macao", "code": "MO" },
        { "name": "Macedonia, The Former Yugoslav Republic of", "code": "MK" },
        { "name": "Madagascar", "code": "MG" },
        { "name": "Malawi", "code": "MW" },
        { "name": "Malaysia", "code": "MY" },
        { "name": "Maldives", "code": "MV" },
        { "name": "Mali", "code": "ML" },
        { "name": "Malta", "code": "MT" },
        { "name": "Marshall Islands", "code": "MH" },
        { "name": "Martinique", "code": "MQ" },
        { "name": "Mauritania", "code": "MR" },
        { "name": "Mauritius", "code": "MU" },
        { "name": "Mayotte", "code": "YT" },
        { "name": "Mexico", "code": "MX" },
        { "name": "Micronesia, Federated States of", "code": "FM" },
        { "name": "Moldova, Republic of", "code": "MD" },
        { "name": "Monaco", "code": "MC" },
        { "name": "Mongolia", "code": "MN" },
        { "name": "Montenegro", "code": "ME" },
        { "name": "Montserrat", "code": "MS" },
        { "name": "Morocco", "code": "MA" },
        { "name": "Mozambique", "code": "MZ" },
        { "name": "Myanmar", "code": "MM" },
        { "name": "Namibia", "code": "NA" },
        { "name": "Nauru", "code": "NR" },
        { "name": "Nepal", "code": "NP" },
        { "name": "Netherlands", "code": "NL" },
        { "name": "Netherlands Antilles", "code": "AN" },
        { "name": "New Caledonia", "code": "NC" },
        { "name": "New Zealand", "code": "NZ" },
        { "name": "Nicaragua", "code": "NI" },
        { "name": "Niger", "code": "NE" },
        { "name": "Nigeria", "code": "NG" },
        { "name": "Niue", "code": "NU" },
        { "name": "Norfolk Island", "code": "NF" },
        { "name": "Northern Mariana Islands", "code": "MP" },
        { "name": "Norway", "code": "NO" },
        { "name": "Oman", "code": "OM" },
        { "name": "Pakistan", "code": "PK" },
        { "name": "Palau", "code": "PW" },
        { "name": "Palestinian Territory, Occupied", "code": "PS" },
        { "name": "Panama", "code": "PA" },
        { "name": "Papua New Guinea", "code": "PG" },
        { "name": "Paraguay", "code": "PY" },
        { "name": "Peru", "code": "PE" },
        { "name": "Philippines", "code": "PH" },
        { "name": "Pitcairn", "code": "PN" },
        { "name": "Poland", "code": "PL" },
        { "name": "Portugal", "code": "PT" },
        { "name": "Puerto Rico", "code": "PR" },
        { "name": "Qatar", "code": "QA" },
        { "name": "Reunion", "code": "RE" },
        { "name": "Romania", "code": "RO" },
        { "name": "Russian Federation", "code": "RU" },
        { "name": "RWANDA", "code": "RW" },
        { "name": "Saint Helena", "code": "SH" },
        { "name": "Saint Kitts and Nevis", "code": "KN" },
        { "name": "Saint Lucia", "code": "LC" },
        { "name": "Saint Pierre and Miquelon", "code": "PM" },
        { "name": "Saint Vincent and the Grenadines", "code": "VC" },
        { "name": "Samoa", "code": "WS" },
        { "name": "San Marino", "code": "SM" },
        { "name": "Sao Tome and Principe", "code": "ST" },
        { "name": "Saudi Arabia", "code": "SA" },
        { "name": "Senegal", "code": "SN" },
        { "name": "Serbia", "code": "RS" },
        { "name": "Seychelles", "code": "SC" },
        { "name": "Sierra Leone", "code": "SL" },
        { "name": "Singapore", "code": "SG" },
        { "name": "Slovakia", "code": "SK" },
        { "name": "Slovenia", "code": "SI" },
        { "name": "Solomon Islands", "code": "SB" },
        { "name": "Somalia", "code": "SO" },
        { "name": "South Africa", "code": "ZA" },
        { "name": "South Georgia and the South Sandwich Islands", "code": "GS" },
        { "name": "Spain", "code": "ES" },
        { "name": "Sri Lanka", "code": "LK" },
        { "name": "Sudan", "code": "SD" },
        { "name": "Suriname", "code": "SR" },
        { "name": "Svalbard and Jan Mayen", "code": "SJ" },
        { "name": "Swaziland", "code": "SZ" },
        { "name": "Sweden", "code": "SE" },
        { "name": "Switzerland", "code": "CH" },
        { "name": "Syrian Arab Republic", "code": "SY" },
        { "name": "Taiwan, Province of China", "code": "TW" },
        { "name": "Tajikistan", "code": "TJ" },
        { "name": "Tanzania, United Republic of", "code": "TZ" },
        { "name": "Thailand", "code": "TH" },
        { "name": "Timor-Leste", "code": "TL" },
        { "name": "Togo", "code": "TG" },
        { "name": "Tokelau", "code": "TK" },
        { "name": "Tonga", "code": "TO" },
        { "name": "Trinidad and Tobago", "code": "TT" },
        { "name": "Tunisia", "code": "TN" },
        { "name": "Turkey", "code": "TR" },
        { "name": "Turkmenistan", "code": "TM" },
        { "name": "Turks and Caicos Islands", "code": "TC" },
        { "name": "Tuvalu", "code": "TV" },
        { "name": "Uganda", "code": "UG" },
        { "name": "Ukraine", "code": "UA" },
        { "name": "United Arab Emirates", "code": "AE" },
        { "name": "United Kingdom", "code": "GB" },
        { "name": "United States Minor Outlying Islands", "code": "UM" },
        { "name": "Uruguay", "code": "UY" },
        { "name": "Uzbekistan", "code": "UZ" },
        { "name": "Vanuatu", "code": "VU" },
        { "name": "Venezuela", "code": "VE" },
        { "name": "Viet Nam", "code": "VN" },
        { "name": "Virgin Islands, British", "code": "VG" },
        { "name": "Virgin Islands, U.S.", "code": "VI" },
        { "name": "Wallis and Futuna", "code": "WF" },
        { "name": "Western Sahara", "code": "EH" },
        { "name": "Yemen", "code": "YE" },
        { "name": "Zambia", "code": "ZM" },
        { "name": "Zimbabwe", "code": "ZW" }
    ])
}
export function makealocation(country, city, projectstate, zipcode) {
    let location = `${city},${projectstate} ${zipcode} ${country}`;
    return location;
}

export function makeDatefromObj(datein) {
    let year = datein.getFullYear();
    let month = datein.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    let date = datein.getDate();
    if (date < 10) {
        date = `0${date}`
    }

    return (`${year}-${month}-${date}`)
}
export function inputDateObjandSecReturnObj(dateencoded, datein) {
    let newDate = new Date(dateencoded);
    let month = newDate.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    let day = newDate.getDate();
    if (day < 10) {
        day = `0${day}`
    }
    let year = newDate.getFullYear();
    if (year < 10) {
        year = `0${year}`
    }
    let hours = datein.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }
    let minutes = datein.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let seconds = datein.getSeconds();
    if (seconds < 10) {
        seconds = `0${seconds}`
    }
    let sym = "";
    let offset = new Date().getTimezoneOffset() / 60;
    if (offset < 0) {
        offset = -offset;
        sym = "+"
    }
    else {
        sym = "-"
    }
    if (offset < 10) {
        offset = `0${offset}`
    }

    newDate = new Date(`${month}/${day}/${year} ${hours}:${minutes}:${seconds}${sym}${offset}:00`)
    return newDate;
}
export function inputSecOutDateString(dateencoded) {
    const newDate = new Date(dateencoded)
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    let day = newDate.getDate();
    if (day < 10) {
        day = `0${day}`
    }
    return (`${year}-${month}-${day}`)
}
export function sorttimes(timeina, timeinb) {
    timeina = new Date(timeina.replace(/-/g, '/'))
    timeinb = new Date(timeinb.replace(/-/g, '/'))
    if (timeina < timeinb) {
        return -1;
    }
    else if (timeinb > timeina) {
        return 1;
    }
    else {
        return 0;
    }
}
export function inputDateSecDateStringOutputString(dateencoded, timein) {
    let newDate = new Date(dateencoded)
    let offset = newDate.getTimezoneOffset() / 60;
    let sym = "";
    if (offset < 0) {
        offset = -offset;
        sym = "+"
    }
    else {
        sym = "-"
    }
    if (offset < 10) {
        offset = `0${offset}`
    }

    let datein = new Date(`${timein.replace(/-/g, '/')}-00:00`);
    let month = newDate.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    let day = newDate.getDate();
    if (day < 10) {
        day = `0${day}`
    }
    let year = newDate.getFullYear();

    let hours = datein.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }
    let minutes = datein.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let seconds = datein.getSeconds();
    if (seconds < 10) {
        seconds = `0${seconds}`
    }
    let fakedate = new Date(`${year}/${month}/${day} ${hours}:${minutes}:${seconds}${sym}${2 * offset}:00`)
    hours = fakedate.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }
    minutes = fakedate.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    seconds = fakedate.getSeconds();
    if (seconds < 10) {
        seconds = `0${seconds}`
    }
    month = fakedate.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    year = fakedate.getFullYear();
    day = fakedate.getDate();
    if (day < 10) {
        day = `0${day}`
    }
    return (`${year}-${month}-${day}`)
}
export function inputDateSecActiveIDTimein(dateencoded, timein) {
    let newDate = new Date(dateencoded)
    let offset = newDate.getTimezoneOffset() / 60;
    let sym = "";
    if (offset < 0) {
        offset = -offset;
        sym = "+"
    }
    else {
        sym = "-"
    }
    if (offset < 10) {
        offset = `0${offset}`
    }

    let datein = new Date(`${timein.replace(/-/g, '/')}-00:00`);
    let month = newDate.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    let day = newDate.getDate();
    if (day < 10) {
        day = `0${day}`
    }
    let year = newDate.getFullYear();

    let hours = datein.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }
    let minutes = datein.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let seconds = datein.getSeconds();
    if (seconds < 10) {
        seconds = `0${seconds}`
    }
    let fakedate = new Date(`${year}/${month}/${day} ${hours}:${minutes}:${seconds}${sym}${2 * offset}:00`)
    hours = fakedate.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }
    minutes = fakedate.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    seconds = fakedate.getSeconds();
    if (seconds < 10) {
        seconds = `0${seconds}`
    }
    month = fakedate.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    year = fakedate.getFullYear();
    day = fakedate.getDate();
    if (day < 10) {
        day = `0${day}`
    }
    return (`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`)
}
export function inputdatestringOutputMonth(calendardate) {

    let offset = new Date().getTimezoneOffset() / 60;
    let sym = "";
    if (offset < 0) {
        offset = -offset;
        sym = "+";
    }
    if (offset < 10) {
        offset = `0${offset}`
        sym = "-";
    }
    else {
        sym = "-";
    }

    let datein = new Date(`${calendardate.replace(/-/g, '-')} 00:00:00${sym}${offset}:00`)
    let month = datein.getMonth() + 1
    return month;
}

export function inputdatestringOutputDate(calendardate) {

    let offset = new Date().getTimezoneOffset() / 60;
    let sym = "";
    if (offset < 0) {
        offset = -offset;
        sym = "+";
    }
    if (offset < 10) {
        offset = `0${offset}`
        sym = "-";
    }
    else {
        sym = "-";
    }

    let datein = new Date(`${calendardate.replace(/-/g, '-')} 00:00:00${sym}${offset}:00`)
    let day = datein.getDate();
    return day;
}
export function UTCTimefromCurrentDate() {
    let offset = new Date().getTimezoneOffset() / 60;
    let sym = "";
    if (offset < 0) {
        offset = -offset;
        sym = "+"
    }
    else {
        sym = "-"
    }
    if (offset < 10) {
        offset = `0${offset}`
    }
    let newDate = new Date();
    let month = newDate.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    let day = newDate.getDate();
    if (day < 10) {
        day = `0${day}`
    }
    let year = newDate.getFullYear();
    let hours = newDate.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }
    let minutes = newDate.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let seconds = newDate.getSeconds();
    if (seconds < 10) {
        seconds = `0${seconds}`
    }
    let fakedate = new Date(`${year}/${month}/${day} ${hours}:${minutes}:${seconds}${sym}${2 * offset}:00`)
    year = fakedate.getFullYear();
    month = fakedate.getMonth() + 1;
    day = fakedate.getDate();
    hours = fakedate.getHours();
    minutes = fakedate.getMinutes();
    seconds = fakedate.getSeconds();
    if (month < 10) {
        month = `0${month}`;
    }
    if (day < 10) {
        day = `0${day}`
    }

    if (hours < 10) {
        hours = `0${hours}`
    }
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    if (seconds < 10) {
        seconds = `0${seconds}`
    }
    return (`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`)
}
export function UTCStringFormatDateforProposal(timeout) {


    let newDate = new Date(`${timeout.replace(/-/g, '/')}-00:00`)
    let month = newDate.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    let day = newDate.getDate();
    if (day < 10) {
        day = `0${day}`
    }
    let year = newDate.getFullYear();
    let century = Math.floor(year / 100) * 100;
    year = year - century;
    let hours = newDate.getHours();
    let minutes = newDate.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let timeofday = "";
    if (hours >= 12) {
        timeofday = "pm"
    }
    else {
        timeofday = "am"
    }
    if (hours > 12) {
        hours = hours - 12;
    }
    return (`${month}/${day}/${year} on ${hours}:${minutes} ${timeofday}`)
}

export function inputdatestringOutputYear(calendardate) {

    let offset = new Date().getTimezoneOffset() / 60;
    let sym = "";
    if (offset < 0) {
        offset = -offset;
        sym = "+";
    }
    if (offset < 10) {
        offset = `0${offset}`
        sym = "-";
    }
    else {
        sym = "-";
    }

    let datein = new Date(`${calendardate.replace(/-/g, '-')} 00:00:00${sym}${offset}:00`)
    let year = datein.getFullYear();
    let century = Math.floor(year / 100) * 100;
    year = year - century;
    return year;
}
export function inputdateobjOutputYear(datein) {

    let year = datein.getFullYear();
    let century = Math.floor(year / 100) * 100;
    year = year - century;
    return year;
}
export function datestringDayUp(calendardate) {
    let offset = new Date().getTimezoneOffset() / 60
    let sym = "";
    if (offset < 0) {
        offset = -offset;
        sym = "+";
    }
    if (offset < 10) {
        offset = `0${offset}`
        sym = "-";
    }
    else {
        sym = "-";
    }

    let datein = new Date(`${calendardate.replace(/-/g, '-')} 00:00:00${sym}${offset}:00`)
    let newDate = new Date(datein.getTime() + (24 * 60 * 60 * 1000))
    let month = newDate.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    let day = newDate.getDate();
    if (day < 10) {
        day = `0${day}`
    }
    let year = newDate.getFullYear();
    return (`${year}-${month}-${day}`)
}
export function increasedatestringOneYear(calendardate) {
    let offset = new Date().getTimezoneOffset() / 60
    let sym = "";
    if (offset < 0) {
        offset = -offset;
        sym = "+";
    }
    if (offset < 10) {
        offset = `0${offset}`
        sym = "-";
    }
    else {
        sym = "-";
    }

    let datein = new Date(`${calendardate.replace(/-/g, '-')} 00:00:00${sym}${offset}:00`)
    let month = datein.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    let year = datein.getFullYear() + 1;
    let day = datein.getDate();
    if (day < 10) {
        day = `0${day}`
    }
    return (`${year}-${month}-${day}`)
}

export function decreasedatestringOneYear(calendardate) {
    let offset = new Date().getTimezoneOffset() / 60
    let sym = "";
    if (offset < 0) {
        offset = -offset;
        sym = "+";
    }
    if (offset < 10) {
        offset = `0${offset}`
        sym = "-";
    }
    else {
        sym = "-";
    }

    let datein = new Date(`${calendardate.replace(/-/g, '-')} 00:00:00${sym}${offset}:00`)
    let month = datein.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    let year = datein.getFullYear() - 1;
    let day = datein.getDate();
    if (day < 10) {
        day = `0${day}`
    }
    return (`${year}-${month}-${day}`)
}
export function datestringDayDown(calendardate) {
    let offset = new Date().getTimezoneOffset() / 60
    let sym = "";
    if (offset < 0) {
        offset = -offset;
        sym = "+";
    }
    if (offset < 10) {
        offset = `0${offset}`
        sym = "-";
    }
    else {
        sym = "-";
    }

    let datein = new Date(`${calendardate.replace(/-/g, '-')} 00:00:00${sym}${offset}:00`)
    let newDate = new Date(datein.getTime() - (24 * 60 * 60 * 1000))
    let month = newDate.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    let day = newDate.getDate();
    if (day < 10) {
        day = `0${day}`
    }
    let year = newDate.getFullYear();
    return (`${year}-${month}-${day}`)
}
export function subtractOneMonthtoDateString(calendardate) {
    let offset = new Date().getTimezoneOffset() / 60
    let sym = "";
    if (offset < 0) {
        offset = -offset;
        sym = "+";
    }
    if (offset < 10) {
        offset = `0${offset}`
        sym = "-";
    }
    else {
        sym = "-";
    }


    let datein = new Date(`${calendardate.replace(/-/g, '-')} 00:00:00${sym}${offset}:00`)

    let year = datein.getFullYear();
    let newmonth = datein.getMonth();
    if (newmonth === 0) {
        newmonth = 11;
        year = year - 1;
    }

    if (newmonth < 10) {
        newmonth = `0${newmonth}`
    }
    let day = datein.getDate();
    if (day < 10) {
        day = `0${day}`
    }

    let newdatestring = `${year}-${newmonth}-${day}`
    return newdatestring;
}
export function addOneMonthtoDateString(calendardate) {
    let offset = new Date().getTimezoneOffset() / 60
    let sym = "";
    if (offset < 0) {
        offset = -offset;
        sym = "+";
    }
    if (offset < 10) {
        offset = `0${offset}`
        sym = "-";
    }
    else {
        sym = "-";
    }


    let datein = new Date(`${calendardate.replace(/-/g, '-')} 00:00:00${sym}${offset}:00`)

    let year = datein.getFullYear();
    let newmonth = datein.getMonth();
    if (newmonth === 11) {
        newmonth = 1;
        year = year + 1;
    }
    else {
        newmonth = newmonth + 2
    }
    if (newmonth < 10) {
        newmonth = `0${newmonth}`
    }
    let day = datein.getDate();
    if (day < 10) {
        day = `0${day}`
    }

    let newdatestring = `${year}-${newmonth}-${day}`
    return newdatestring;
}
export function inputDateObjOutputCalendarDaySeconds(datein) {
    let offset = datein.getTimezoneOffset() / 60;
    let sym = "";
    if (offset < 0) {
        offset = -offset;
        sym = "+";
    }
    if (offset < 10) {
        offset = `0${offset}`
        sym = "-";
    }
    else {
        sym = "-";
    }

    let month = datein.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    let day = datein.getDate();
    if (day < 10) {
        day = `0${day}`
    }
    let year = datein.getFullYear();
    let dateinsec = new Date(`${month}/${day}/${year} 00:00:00${sym}${offset}:00`).getTime();
    return dateinsec;
}
export function inputtimeDBoutputCalendarDaySeconds(timein) {

    let datein = new Date(`${timein.replace(/-/g, '/')} UTC`);
    let month = datein.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    let date = datein.getDate();
    if (date < 10) {
        date = `0${date}`
    }
    let year = datein.getFullYear();
    let offset = getOffset();
    let newDate = new Date(`${year}/${month}/${date} 00:00:00${offset}`)
    return (newDate.getTime())
}
export function adjustdatefromcalendar(timein, value) {

    let offset = new Date().getTimezoneOffset() / 60;
    let sym = "";
    if (offset < 0) {
        offset = -offset;
        sym = "+";
    }
    if (offset < 10) {
        offset = `0${offset}`
        sym = "-";
    }
    else {
        sym = "-";
    }

    let datein = new Date(`${timein.replace(/-/g, '/')}-00:00`)
    let hours = datein.getHours();
    let minutes = datein.getMinutes();
    let seconds = datein.getSeconds();
    let fakedate = new Date(`${value.replace(/-/g, '/')} ${hours}:${minutes}:${seconds}${sym}${2 * offset}:00`)
    hours = fakedate.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }
    minutes = fakedate.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    seconds = fakedate.getSeconds();
    if (seconds < 10) {
        seconds = `0${seconds}`
    }
    let month = fakedate.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    let date = fakedate.getDate();
    if (date < 10) {
        date = `0${date}`
    }
    let year = fakedate.getFullYear();
    return (`${year}-${month}-${date} ${hours}:${minutes}:${seconds}`)
}
export function makeDatefromTimein(timein) {
    let datein = new Date(`${timein.replace(/-/g, '/')}-00:00`)
    let year = datein.getFullYear();
    let month = datein.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    let date = datein.getDate();
    if (date < 10) {
        date = `0${date}`
    }

    return (`${year}-${month}-${date}`)
}
export function formatDatefromDBString(timein) {
    timein = timein.replace(/-/g, '/');
    let date_1 = new Date(timein);
    let dateobj = new Date(date_1.getTime() - (date_1.getTimezoneOffset() * 60000))

    let year = dateobj.getFullYear();
    let month = dateobj.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    let day = dateobj.getDate();
    if (day < 10) {
        day = `0${day}`
    }
    let hours = dateobj.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }
    let minutes = dateobj.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    //let seconds = "00";
    let offset = dateobj.getTimezoneOffset();
    offset = offset / 60;
    if (offset > 0 && offset < 10) {
        offset = `-0${offset}`
    }
    else if (offset > 0 && offset >= 10) {
        offset = `-${offset}`;
    }
    else if (offset < 0 && offset > -10) {
        offset = `+0${offset}`
    }
    else if (offset < 0 && offset <= -10) {
        offset = `+${offset}`
    }
    else {
        return;
    }
    return `${year}-${month}-${day}T${hours}:${minutes}:00`;
}
export function removeDashFromID(projectid) {
    let key = projectid.search("-");

    return projectid.slice(0, key);
}
export function inputDateStringOutputObj(datestring) {
    datestring = datestring.replace(/-/g, '/')
    let dateobj = new Date(datestring)
    let year = dateobj.getFullYear();
    let month = dateobj.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    let day = dateobj.getDate();
    if (day < 10) {
        day = `0${day}`
    }
    let hours = dateobj.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }
    let minutes = dateobj.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    //let seconds = "00";
    let offset = dateobj.getTimezoneOffset();
    offset = offset / 60;
    if (offset > 0 && offset < 10) {
        offset = `-0${offset}`
    }
    else if (offset > 0 && offset >= 10) {
        offset = `-${offset}`;
    }
    else if (offset < 0 && offset > -10) {
        offset = `+0${offset}`
    }
    else if (offset < 0 && offset <= -10) {
        offset = `+${offset}`
    }
    else {
        return;
    }
    return new Date(`${year}-${month}-${day}T${hours}:${minutes}:00`);
}
export function dbUTCoutputdateobject(datestring) {
    let dateobj = new Date(datestring);
    let gettime = dateobj.getTime();
    let offset = dateobj.getTimezoneOffset();
    offset = offset * 60 * 1000;
    gettime = gettime - (offset);
    let mytime = new Date(gettime);
    return mytime;
}
export function CreateProject(providerid, projectid, title, scope, address, city, projectstate, zipcode) {
    return ({ providerid, projectid, title, scope, address, city, projectstate, zipcode })
}
export function UsStates() {
    return ([
        { name: 'ALABAMA', abbreviation: 'AL' },
        { name: 'ALASKA', abbreviation: 'AK' },
        { name: 'ARIZONA', abbreviation: 'AZ' },
        { name: 'ARKANSAS', abbreviation: 'AR' },
        { name: 'CALIFORNIA', abbreviation: 'CA' },
        { name: 'COLORADO', abbreviation: 'CO' },
        { name: 'CONNECTICUT', abbreviation: 'CT' },
        { name: 'DELAWARE', abbreviation: 'DE' },
        { name: 'DISTRICT OF COLUMBIA', abbreviation: 'DC' },
        { name: 'FLORIDA', abbreviation: 'FL' },
        { name: 'GEORGIA', abbreviation: 'GA' },
        { name: 'HAWAII', abbreviation: 'HI' },
        { name: 'IDAHO', abbreviation: 'ID' },
        { name: 'ILLINOIS', abbreviation: 'IL' },
        { name: 'INDIANA', abbreviation: 'IN' },
        { name: 'IOWA', abbreviation: 'IA' },
        { name: 'KANSAS', abbreviation: 'KS' },
        { name: 'KENTUCKY', abbreviation: 'KY' },
        { name: 'LOUISIANA', abbreviation: 'LA' },
        { name: 'MAINE', abbreviation: 'ME' },
        { name: 'MARYLAND', abbreviation: 'MD' },
        { name: 'MASSACHUSETTS', abbreviation: 'MA' },
        { name: 'MICHIGAN', abbreviation: 'MI' },
        { name: 'MINNESOTA', abbreviation: 'MN' },
        { name: 'MISSISSIPPI', abbreviation: 'MS' },
        { name: 'MISSOURI', abbreviation: 'MO' },
        { name: 'MONTANA', abbreviation: 'MT' },
        { name: 'NEBRASKA', abbreviation: 'NE' },
        { name: 'NEVADA', abbreviation: 'NV' },
        { name: 'NEW HAMPSHIRE', abbreviation: 'NH' },
        { name: 'NEW JERSEY', abbreviation: 'NJ' },
        { name: 'NEW MEXICO', abbreviation: 'NM' },
        { name: 'NEW YORK', abbreviation: 'NY' },
        { name: 'NORTH CAROLINA', abbreviation: 'NC' },
        { name: 'NORTH DAKOTA', abbreviation: 'ND' },
        { name: 'OHIO', abbreviation: 'OH' },
        { name: 'OKLAHOMA', abbreviation: 'OK' },
        { name: 'OREGON', abbreviation: 'OR' },
        { name: 'PENNSYLVANIA', abbreviation: 'PA' },
        { name: 'RHODE ISLAND', abbreviation: 'RI' },
        { name: 'SOUTH CAROLINA', abbreviation: 'SC' },
        { name: 'SOUTH DAKOTA', abbreviation: 'SD' },
        { name: 'TENNESSEE', abbreviation: 'TN' },
        { name: 'TEXAS', abbreviation: 'TX' },
        { name: 'UTAH', abbreviation: 'UT' },
        { name: 'VERMONT', abbreviation: 'VT' },
        { name: 'VIRGIN ISLANDS', abbreviation: 'VI' },
        { name: 'VIRGINIA', abbreviation: 'VA' },
        { name: 'WASHINGTON', abbreviation: 'WA' },
        { name: 'WEST VIRGINIA', abbreviation: 'WV' },
        { name: 'WISCONSIN', abbreviation: 'WI' },
        { name: 'WYOMING', abbreviation: 'WY' }
    ])
}
export function MyUserModel(providerid, client, clientid, firstname, lastname, address, city, contactstate, zipcode, emailaddress, phonenumber, profileurl) {
    return ({ providerid, client, clientid, firstname, lastname, address, city, contactstate, zipcode, emailaddress, phonenumber, profileurl })
}
export function getampm(dateobj) {
    let hours = dateobj.getHours();
    let ampm = "";
    if (hours >= 12) {
        ampm = "PM";
    }
    else {
        ampm = "AM";
    }
    return ampm;
}
export function formatMinutes(minutes) {
    if (minutes < 10) {
        return (`0${minutes}`)
    }
    else {
        return minutes;
    }
}

export function trailingzero(num) {
    let reg_ex = /^0\d$/;
    var test = reg_ex.test(num.toString());

    if (!test) {
        if (Number(num) < 10) {
            return `0${Number(num)}`;
        }
        else {
            return num;
        }
    }
    else {
        return num;
    }
}
export function adjustdays(month, days, year) {

    switch (month) {
        case 1:
            if (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) {
                days = 29;
            }
            else {
                days = 28;
            }
            return days;
        case 3:
            if (days > 30) {
                days = 30;
            }
            return days;
        case 5:
            if (days > 30) {
                days = 30;
            }
            return days;
        case 8:
            if (days > 30) {
                days = 30;
            }
            return days;
        case 10:
            if (days > 30) {
                days = 30;
            }
            return days;
        default:
            return days;
    }

}
export function getmonth(dateobj) {

    let month = dateobj.getMonth();
    switch (month) {
        case 0:
            return ("January");
        case 1:
            return ("February");
        case 2:
            return ("March");
        case 3:
            return ("April");
        case 4:
            return ("May");
        case 5:
            return ("June");
        case 6:
            return ("July");
        case 7:
            return ("August");
        case 8:
            return ("September");
        case 9:
            return ("October");
        case 10:
            return ("November");
        case 11:
            return ("December");
        default:
            break;
    }
}

export function getFirstIsOnDate(datein) {

    let monthdisplay = datein.getMonth() + 1;
    let fullyear = datein.getFullYear();
    let thefirstofthemonth = new Date(`${fullyear}/${monthdisplay}/1`);
    let firstday = thefirstofthemonth.getDay();
    switch (firstday) {
        case 0:
            return "Sun";
        case 1:
            return "Mon";
        case 2:
            return "Tues";
        case 3:
            return "Weds";
        case 4:
            return "Thurs";
        case 5:
            return "Fri";
        case 6:
            return "Sat";
        default:
            return;
    }
}


export function check_31_date(dateobj) {

    let month = dateobj.getMonth();
    if (month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11) {
        return 31;
    }
}


export function check_30_date(dateobj) {

    let month = dateobj.getMonth();
    if (month !== 1) {
        return 30;
    }
}


export function check_29_feb_leapyear_date(dateobj) {

    let month = dateobj.getMonth();

    if (month === 1) {
        let year = dateobj.getFullYear();
        if (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) {
            return 29;
        }
        else {
            return;
        }
    }
    else {
        return 29;
    }

}

export function getDayString(day) {

    switch (day) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
            return;
    }
}

export function monthstring(month) {


    switch (month) {
        case 0:
            return ("January");
        case 1:
            return ("February");
        case 2:
            return ("March");
        case 3:
            return ("April");
        case 4:
            return ("May");
        case 5:
            return ("June");
        case 6:
            return ("July");
        case 7:
            return ("August");
        case 8:
            return ("September");
        case 9:
            return ("October");
        case 10:
            return ("November");
        case 11:
            return ("December");
        default:
            break;
    }
}

export function getmonthstring(month) {

    month = month - 1;
    switch (month) {
        case 0:
            return ("January");
        case 1:
            return ("February");
        case 2:
            return ("March");
        case 3:
            return ("April");
        case 4:
            return ("May");
        case 5:
            return ("June");
        case 6:
            return ("July");
        case 7:
            return ("August");
        case 8:
            return ("September");
        case 9:
            return ("October");
        case 10:
            return ("November");
        case 11:
            return ("December");
        default:
            break;
    }
}
export function displaydateformilestone(datestring) {
    let year = datestring.substring(0, 4);
    let month = getmonthstring(Number(datestring.substring(5, 7)));
    let day = datestring.substring(8, 10)
    return `${month} ${day}, ${year}`
}
export function militaryhourstoregular(military) {
    if (military > 12) {
        military = military - 12;
    }
    else if (military === 0) {
        military = 12;
    }
    return military;
}
export function validateName(value) {
    const reg_ex = /^[a-zA-Z\s]*$/
    const test = reg_ex.test(value)
    let errmsg = "";
    if (!value) {
        errmsg += ` Name Field is Missing `

    }
    else if (!test) {

        errmsg += `${value} has an incorrect name format `

    }
    else if (value.length > 36) {

        errmsg += `36 character name limit exceeded `

    }
    return (errmsg)

}
export function validateZipcode(zipcode) {
    let reg_ex = /^\d{5}(?:[-\s]\d{4})?$/
    let test = reg_ex.test(zipcode);
    let message = ""
    if (!test && zipcode) {
        message += ` No match found for Zipcode `
    }
    return message;
}
export function validateEmail(value) {
    var reg_ex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    var test = reg_ex.test(value)
    let errmsg = "";
    if (!value) {
        errmsg += `Email Address is required `

    }


    else if (!test) {

        errmsg += ` Email Address ${value} format is invalid `;

    }
    return errmsg;
}
export function validateLaborRate(value) {
    let errmsg = "";
    let reg_ex = /^\d+(\.\d{1,4})?$/
    let test = reg_ex.test(value)

    if (!value) {
        errmsg = `Numeric variable is missing  `


    }
    else if (!test) {
        errmsg = `Numeric variable ${value} has an incorrect format `

    }
    return errmsg;
}
export function CreateBidScheduleItem(csiid, unit, quantity) {
    return ({ csiid, unit, quantity })
}

export function validateTitle(value) {
    const reg_ex = /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,58}(?:[A-Za-z0-9_]))?)$/
    const test = reg_ex.test(value);
    value = value.trim();
    let errmsg = false;
    if (!value) {
        errmsg = " Project Title is missing ";

    }
    else if (value.length > 60) {
        errmsg = " Title should be less than 60 chars ";
    }
    else if (!test) {
        errmsg = ` Invalid URL / format check your value: ${value} `;
    }

    return errmsg;
}

export function validateProviderID(value) {
    const reg_ex = /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,34}(?:[A-Za-z0-9_]))?)$/
    const test = reg_ex.test(value);
    value = value.trim();
    let errmsg = false;
    if (!value) {
        errmsg = " ProviderID is required ";

    }
    else if (value.length > 36) {
        errmsg = " ProviderID should be less than 36 characters";
    }
    else if (!test) {
        errmsg = ` Invalid Provider ID format ${value} `;
    }

    return errmsg;
}
export function validateCity(city) {
    let message = "";
    if (city.length > 60) {
        message += " Char limit for city exceeded "
    }
    return message;
}
export function validateScope(scope) {
    let message = "";
    if (!scope) {
        message += " Scope of Work is required  "
    }
    else if (scope.length > 2499) {
        message += " 2499 Char limit for city "
    }
    return message;
}

export function validateProjectTitle(title) {
    let message = "";
    if (!title) {
        message += " Project Title is required "
    }
    else if (title.length > 160) {
        message += " 160 Char limit for title "
    }
    return message;
}

export function validateProjectScope(title) {
    let message = "";
    if (title.length > 160) {
        message += " 160 Char limit for title "
    }
    return message;
}
export function balanceAvailable() {

    return ({
        "id": "evt_1FvYGsAaUD8nQT7tpCiQ97MG",
        "object": "event",
        "api_version": "2019-02-11",
        "created": 1577750858,
        "data": {
            "object": {
                "object": "balance",
                "available": [
                    {
                        "amount": 28453,
                        "currency": "usd",
                        "source_types": {
                            "card": 28453
                        }
                    }
                ],
                "connect_reserved": [
                    {
                        "amount": 0,
                        "currency": "usd"
                    }
                ],
                "livemode": false,
                "pending": [
                    {
                        "amount": 0,
                        "currency": "usd",
                        "source_types": {
                            "card": 0
                        }
                    }
                ]
            }
        },
        "livemode": false,
        "pending_webhooks": 0,
        "request": {
            "id": null,
            "idempotency_key": null
        },
        "type": "balance.available"
    })

}
export function StripeChargeObj() {
    return (
        {
            id: 'evt_1Gak5TAaUD8nQT7t2tn71GF6',
            object: 'event',
            api_version: '2019-02-11',
            created: 1587567727,
            data:
            {
                object:
                {
                    id: 'ch_1Gak5TAaUD8nQT7tzOnEOU4G',
                    object: 'charge',
                    amount: 97113,
                    amount_refunded: 0,
                    application: null,
                    application_fee: null,
                    application_fee_amount: null,
                    balance_transaction: 'txn_1Gak5TAaUD8nQT7tiFUbIhsi',
                    billing_details: [Object],
                    calculated_statement_descriptor: 'CIVILENGINEER.IO',
                    captured: true,
                    created: 1587567727,
                    currency: 'usd',
                    customer: null,
                    description: 'Payment for Invoice 85XL',
                    destination: null,
                    dispute: null,
                    disputed: false,
                    failure_code: null,
                    failure_message: null,
                    fraud_details: {},
                    invoice: null,
                    livemode: false,
                    metadata: {},
                    on_behalf_of: null,
                    order: null,
                    outcome: [Object],
                    paid: true,
                    payment_intent: null,
                    payment_method: 'card_1Gak5PAaUD8nQT7tORX70TXr',
                    payment_method_details: [Object],
                    receipt_email: null,
                    receipt_number: null,
                    receipt_url: 'https://pay.stripe.com/receipts/acct_1E3uN4AaUD8nQT7t/ch_1Gak5TAaUD8nQT7tzOnEOU4G/rcpt_H929H1eIniA6WNbKGJdi4bf5AmbnW4I',
                    refunded: false,
                    refunds: [Object],
                    review: null,
                    shipping: null,
                    source: [Object],
                    source_transfer: null,
                    statement_descriptor: null,
                    statement_descriptor_suffix: null,
                    status: 'succeeded',
                    transfer_data: null,
                    transfer_group: null
                }
            },
            livemode: false,
            pending_webhooks: 1,
            request: { id: 'req_t8AAjCOfjlZki0', idempotency_key: null },
            type: 'charge.succeeded'
        })
}
export function validatePassword(val) {
    let validate = {};
    validate.validate = true;
    validate.message = '';
    const reg_ex = /^[a-zA-Z0-9!#$%&?"]{6,}$/
    let test = reg_ex.test(val)
    if (val.length < 6) {
        validate.message = `Password min length is 6 `;
        validate.validate = false;
    } else if (!test) {
        validate.message = `Invalid Password format`;
        validate.validate = false;
    }

    return validate;
}
export function getScale(interval) {

    let scale = "";
    if (interval < 30) {
        scale = "day"
    } else if (interval <= 730) {
        scale = "month"
    } else {
        scale = "year"
    }
    return scale;

}
export function calculatemonth(int, compl, start, completion) {
    //int = '2020-04-18'
    //compl = '2022-04-18'



    let xo = int.split('-');
    let x1 = xo[0]
    let x2 = xo[1]

    let initime = `${x1}-${x2}-01`
    //start = '2020-04-18'
    xo = (getDateInterval(initime, start) / 30.41) * 200;
    //completion = '2020-09-18'
    const days = getDateInterval(start, completion);
    const width = (days / 30.41) * 200
    return { width, xo }

}

export function calculateyear(int, compl, start, completion) {
    //int = '2020-04-18'
    //compl = '2022-04-18'

    let xo = int.split('-');
    let x1 = xo[0]

    let initime = `${x1}-01-01`


    //start = '2020-04-18'
    xo = (getDateInterval(initime, start) / 365) * 200;
    //completion = '2020-09-18'
    const days = getDateInterval(start, completion)
    const width = (days / 365) * 200

    return { width, xo }
}

export function validatePhoneNumber(val) {
    let errmsg = "";

    var reg_ex = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/
    var test = reg_ex.test(val)
    if (val.length === 0) {
        errmsg += "Phone Number is required ";

    }
    else if (!test) {
        errmsg += ` ${val} is an invalid phonenumber format `

    }

    return errmsg;
}
export function validateProjectAddress(address) {
    let message = "";
    if (address.length > 230) {
        message += " 230 Char limit for project address "
    }
    return message;
}
export function randomString(len) {
    var randomString = "";

    var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (var i = 0; i < len; i++)
        randomString += charset.charAt(Math.floor(Math.random() * charset.length));

    return randomString;
}
export function MyProjectModel(providerid, projectid, title, scope, address, city, projectstate, zipcode) {
    let myproject = { providerid, projectid, title, scope, address, city, projectstate, zipcode }
    return myproject;
}
export function returnCompanyList(allusers) {
    let companys = [];

    if (allusers.hasOwnProperty("myuser")) {
        // eslint-disable-next-line
        allusers.myuser.map(myuser => {

            if (myuser.hasOwnProperty("company")) {
                let checkcompany = true;
                let companyid = myuser.company.companyid;
                if (companys.length > 0) {
                    // eslint-disable-next-line
                    companys.map(company => {
                        if (company.companyid === companyid) {
                            checkcompany = false;
                        }
                    })
                }
                if (checkcompany) {

                    companys.push(myuser.company)
                }
            }

        })

    }
    return companys;
}




export function monthString(month) {


    switch (month) {
        case 0:
            return ("Jan");
        case 1:
            return ("Feb");
        case 2:
            return ("Mar");
        case 3:
            return ("Apr");
        case 4:
            return ("May");
        case 5:
            return ("Jun");
        case 6:
            return ("Jul");
        case 7:
            return ("Aug");
        case 8:
            return ("Sept");
        case 9:
            return ("Oct");
        case 10:
            return ("Nov");
        case 11:
            return ("Dec");
        default:
            break;
    }
}

export function trailingZeros(num) {
    if (num < 10) {
        return (`0${num}`);
    } else {
        return num;
    }

}

export function getOffsetDate(timein) {
    let datein = new Date(`${timein.replace(/-/g, '/')} 00:00:00 UTC`)
    let offset = datein.getTimezoneOffset() / 60
    let sym = "+";
    if (offset > 0) {
        sym = "-";
    }
    if (Math.abs(offset) < 10) {
        offset = `0${offset}`
    }
    return (`${sym}${offset}:00`)
}

export function calculateday(int, compl, start, completion) {
    //int = '2020-04-18'
    //compl = '2022-04-24'

    let xo = int.split('-');
    let x1 = xo[0];
    let x2 = xo[1];
  	let x3 = xo[2]

    let initime = `${x1}-${x2}-${x3}`


    //start = '2020-04-18'
    xo = (getDateInterval(initime, start)) * 200;
    //completion = '2020-04-20'
    const days = getDateInterval(start, completion)
    const width = (days) * 200

    return { width, xo, initime }
}

export function getDateInterval(start, completion) {

    const offsetstart = getOffsetDate(start);
    const datestart = new Date(`${start.replace(/-/g, '/')} 00:00:00${offsetstart}`)
    //const offsetcompletion= getOffsetDate(completion);
    const datecompletion = new Date(`${completion.replace(/-/g, '/')} 00:00:00${offsetstart}`)
    const starttime = datestart.getTime();
    const endtime = datecompletion.getTime();
    const interval = (endtime - starttime) / (3600000 * 24);
    return (interval)
}
export function inputDateStringOutputSeconds(timein) {
    let offset = getOffset()
    let datein = new Date(`${timein.replace(/-/g, '/')} 00:00:00${offset}`);
    return (datein.getTime())
}
export function MyMilestone(milestoneid, milestone, start, completion) {
    return ({ milestoneid, milestone, start, completion })
}
export function mymaterial(projectid, materialid, milestoneid, datein, description, quantity, unit, unitcost, invoiceid) {
    return { projectid, materialid, milestoneid, datein, description, quantity, unit, unitcost, invoiceid }
}
export function stateArray() {
    return ([
        { name: 'ALABAMA', abbreviation: 'AL' },
        { name: 'ALASKA', abbreviation: 'AK' },
        { name: 'ARIZONA', abbreviation: 'AZ' },
        { name: 'ARKANSAS', abbreviation: 'AR' },
        { name: 'CALIFORNIA', abbreviation: 'CA' },
        { name: 'COLORADO', abbreviation: 'CO' },
        { name: 'CONNECTICUT', abbreviation: 'CT' },
        { name: 'DELAWARE', abbreviation: 'DE' },
        { name: 'DISTRICT OF COLUMBIA', abbreviation: 'DC' },
        { name: 'FLORIDA', abbreviation: 'FL' },
        { name: 'GEORGIA', abbreviation: 'GA' },
        { name: 'HAWAII', abbreviation: 'HI' },
        { name: 'IDAHO', abbreviation: 'ID' },
        { name: 'ILLINOIS', abbreviation: 'IL' },
        { name: 'INDIANA', abbreviation: 'IN' },
        { name: 'IOWA', abbreviation: 'IA' },
        { name: 'KANSAS', abbreviation: 'KS' },
        { name: 'KENTUCKY', abbreviation: 'KY' },
        { name: 'LOUISIANA', abbreviation: 'LA' },
        { name: 'MAINE', abbreviation: 'ME' },
        { name: 'MARYLAND', abbreviation: 'MD' },
        { name: 'MASSACHUSETTS', abbreviation: 'MA' },
        { name: 'MICHIGAN', abbreviation: 'MI' },
        { name: 'MINNESOTA', abbreviation: 'MN' },
        { name: 'MISSISSIPPI', abbreviation: 'MS' },
        { name: 'MISSOURI', abbreviation: 'MO' },
        { name: 'MONTANA', abbreviation: 'MT' },
        { name: 'NEBRASKA', abbreviation: 'NE' },
        { name: 'NEVADA', abbreviation: 'NV' },
        { name: 'NEW HAMPSHIRE', abbreviation: 'NH' },
        { name: 'NEW JERSEY', abbreviation: 'NJ' },
        { name: 'NEW MEXICO', abbreviation: 'NM' },
        { name: 'NEW YORK', abbreviation: 'NY' },
        { name: 'NORTH CAROLINA', abbreviation: 'NC' },
        { name: 'NORTH DAKOTA', abbreviation: 'ND' },
        { name: 'OHIO', abbreviation: 'OH' },
        { name: 'OKLAHOMA', abbreviation: 'OK' },
        { name: 'OREGON', abbreviation: 'OR' },
        { name: 'PENNSYLVANIA', abbreviation: 'PA' },
        { name: 'RHODE ISLAND', abbreviation: 'RI' },
        { name: 'SOUTH CAROLINA', abbreviation: 'SC' },
        { name: 'SOUTH DAKOTA', abbreviation: 'SD' },
        { name: 'TENNESSEE', abbreviation: 'TN' },
        { name: 'TEXAS', abbreviation: 'TX' },
        { name: 'UTAH', abbreviation: 'UT' },
        { name: 'VERMONT', abbreviation: 'VT' },
        { name: 'VIRGIN ISLANDS', abbreviation: 'VI' },
        { name: 'VIRGINIA', abbreviation: 'VA' },
        { name: 'WASHINGTON', abbreviation: 'WA' },
        { name: 'WEST VIRGINIA', abbreviation: 'WV' },
        { name: 'WISCONSIN', abbreviation: 'WI' },
        { name: 'WYOMING', abbreviation: 'WY' }
    ])
}
export function ScheduleLabor(providerid, description, laborid, milestoneid, laborrate, timein, timeout, proposalid) {
    return ({ providerid, description, laborid, milestoneid, laborrate, timein, timeout, proposalid })

}
export function ActualLabor(providerid, description, laborid, milestoneid, laborrate, timein, timeout, invoiceid) {
    return ({ providerid, description, laborid, milestoneid, laborrate, timein, timeout, invoiceid })

}
export function ScheduleMaterial(materialid, providerid, projectid, timein, quantity, unit, unitcost, description, milestoneid, proposalid) {
    return ({
        description,
        materialid,
        milestoneid,
        projectid,
        proposalid,
        providerid,
        quantity,
        timein,
        unit,
        unitcost
    })
}
export function formatDateStringDisplay(timein) {
    timein.replace(/-/g, '/')
    timein = timein.split('-')
    let year = "";
    let month = "";
    let day = "";

    if (timein.length === 3) {
        year = timein[0]
        month = timein[1]
        day = timein[2]
    }
    return (`${month}/${day}/${year}`)
}
export function ActualMaterial(materialid, providerid, projectid, timein, quantity, unit, unitcost, description, milestoneid, invoiceid) {
    return ({
        description,
        materialid,
        milestoneid,
        projectid,
        invoiceid,
        providerid,
        quantity,
        timein,
        unit,
        unitcost
    })
}
export function sortpart(b, a) {
    if (Number(b.part) < Number(a.part)) {
        return -1

    } else {
        return 1;
    }

}
export function LetterCounter(num) {

    const numericAlpha = (num) => {
        switch (Number(num)) {
            case 1:
                return 'A'
            case 2:
                return 'B'
            case 3:
                return 'C'
            case 4:
                return 'D'
            case 5:
                return 'E'
            case 6:
                return 'F'
            case 7:
                return 'G'
            case 8:
                return 'H'
            case 9:
                return 'I'
            case 10:
                return 'J'
            case 11:
                return 'K'
            case 12:
                return 'L'
            case 13:
                return 'M'
            case 14:
                return 'N'
            case 15:
                return 'O'
            case 16:
                return 'P'
            case 17:
                return 'Q'
            case 18:
                return 'R'
            case 19:
                return 'S'
            case 20:
                return 'T'
            case 21:
                return 'U'
            case 22:
                return 'V'
            case 23:
                return 'W'
            case 24:
                return 'X'
            case 25:
                return 'Y'
            case 26:
                return 'Z'
            default:
                break;

        }



    }

    let Zs = 0;
    let newnum = "";
    let Z = "";
    if (num > 26) {

        Zs = Math.floor(num / 26);

        for (let i = 0; i < Zs; i++) {

            Z += `Z`

        }
        newnum = num % 26

    } else {
        newnum = num;
    }

    return `${Z}${numericAlpha(newnum)}`

}

export function ProfitForMaterial(item) {
    return (Number(item.quantity) * Number(item.unitcost)) * (Number(item.profit) / 100)
}
export function DirectCostForMaterial(item) {
    return (Number(item.quantity) * Number(item.unitcost))
}
export function DirectCostForLabor(item) {
    return (Number(calculatetotalhours(item.timeout, item.timein)) * Number(item.laborrate))
}
export function DirectCostForEquipment(item) {

    return (Number(calculatetotalhours(item.timeout, item.timein)) * Number(item.equipmentrate))
}
export function ProfitForEquipment(item) {

    return (Number(calculatetotalhours(item.timeout, item.timein)) * Number(item.equipmentrate)) * (Number(item.profit) / 100)
}
export function ProfitForLabor(item) {
    return (Number(calculatetotalhours(item.timeout, item.timein)) * Number(item.laborrate)) * (Number(item.profit) / 100)
}
export function TeamMember(providerid, role) {
    return ({ providerid, role })
}
export function makeID(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
export function TestUser() {
    return ({
        providerid: "stevenatwater",
        client: "google",
        clientid: "109676734658243948537",
        firstname: "Steven",
        lastname: "Atwater",
        address: "",
        city: "",
        contactstate: "",
        zipcode: "",
        emailaddress: "immaisoncrosby@gmail.com",
        phonenumber: "916-823-1652",
        profileurl: "https://civilengineer-io.s3.amazonaws.com/WLCLZstevenatwater.jpg",
        projects: {
            myproject: [
                {
                    projectid: "constructionapp",
                    title: "Title",
                    scope: "Scope",
                    address: "Address",
                    city: "CityC",
                    projectstate: "Ca",
                    zipcode: "95757",
                    projectteam: {
                        myteam: [
                            {
                                providerid: "mazen",
                                role: "Lead App Developer"
                            }
                        ]
                    },
                    projectmilestones: {
                        mymilestone: [
                            {
                                milestoneid: "F7HX5X",
                                milestone: "Update to Web Client",
                                start: "2019-12-06",
                                completion: "2019-12-08"
                            }
                        ]
                    },
                    schedulelabor: {
                        mylabor: [
                            {
                                projectid: "constructionapp",
                                milestoneid: "F7HX5X",
                                milestone: "",
                                providerid: "mazen",
                                laborid: "03AZLOPT",
                                firstname: "Steven",
                                lastname: "Atwater",
                                timein: "2019-12-08 21:04:00",
                                timeout: "2019-12-09 01:04:00",
                                laborrate: "30.0000",
                                description: "Refomatting Client Layouts",
                                proposalid: "R4WQ",
                                csiid: "yyyyyy",
                                profit: "15.0000"
                            }
                        ]
                    },
                    actuallabor: {
                        mylabor: [
                            {
                                projectid: "constructionapp",
                                milestoneid: "F7HX5X",
                                milestone: "",
                                providerid: "",
                                laborid: "C9JXIHOD",
                                firstname: "Steven",
                                lastname: "Atwater",
                                timein: "2019-12-08 21:07:00",
                                timeout: "2019-12-09 00:07:00",
                                laborrate: "30.0000",
                                csiid: "yyyyyy",
                                description: "Reformatting Web Client",
                                invoiceid: "POQV",
                                profit: "15.0000"
                            }
                        ]
                    },
                    actualmaterials: {
                        mymaterial: [
                            {
                                materialid: "myfirstmaterial",
                                mymaterialid: "myfirstmaterial",
                                material: "myfirstmaterial",
                                providerid: "stevenatwater",
                                csiid: "yyyyyy",
                                timein: "2019-12-08",
                                milestoneid: "F7HX5X",
                                quantity: "1.00",
                                unit: "mon",
                                unitcost: "9.00",
                                invoiceid: "POQV",
                                profit: "15.0000"
                            }
                        ]
                    },
                    schedulematerials: {
                        mymaterial: [
                            {
                                materialid: "myfirstmaterial",
                                mymaterialid: "myfirstmaterial",
                                material: "myfirstmaterial",
                                providerid: "stevenatwater",
                                csiid: "yyyyyy",
                                timein: "2019-12-08",
                                milestoneid: "F7HX5X",
                                quantity: "1.00",
                                unit: "mon",
                                unitcost: "7.00",
                                proposalid: "R4WQ",
                                profit: "15.0000"
                            }
                        ]
                    },
                    scheduleequipment: {
                        myequipment: [
                            {
                                equipmentid: "blaablabal",
                                myequipmentid: "blaablabal",
                                equipmentrate: "100.0000",
                                equipment: "John Deer Skid Steer Loader",
                                milestoneid: "F7HX5X",
                                csiid: "yyyyyy",
                                timein: "2019-12-26 00:00:00",
                                timeout: "2019-12-27 00:00:00",
                                proposalid: "R4WQ",
                                profit: "15.0000"
                            }
                        ]
                    },
                    actualequipment: {
                        myequipment: [
                            {
                                equipmentid: "myfirstlineid",
                                myequipmentid: "myfirstlineid",
                                equipment: "John Deer Skid Steer Loader",
                                equipmentrate: "100.0000",
                                milestoneid: "F7HX5X",
                                csiid: "yyyyyy",
                                timein: "2019-05-30 18:33:33",
                                timeout: "2019-05-31 00:33:33",
                                invoiceid: "POQV",
                                profit: "15.0000"
                            },
                            {
                                equipmentid: "sdewerwewcwwer",
                                myequipmentid: "sdewerwewcwwer",
                                equipment: "John Deer Skid Steer Loader",
                                equipmentrate: "100.0000",
                                milestoneid: "F7HX5X",
                                csiid: "yyyyyy",
                                timein: "2019-05-30 18:33:33",
                                timeout: "2019-05-30 22:33:33",
                                invoiceid: "POQV",
                                profit: "15.0000"
                            }
                        ]
                    },
                    proposals: {
                        myproposal: [
                            {
                                proposalid: "R4WQ",
                                providerid: "mazen",
                                updated: "2019-12-08 21:09:55",
                                approved: "2019-12-08 21:10:35",
                                bidschedule: {
                                    biditem: [
                                        {
                                            lineid: "myfirstlineid",
                                            csiid: "yyyyyy",
                                            csi: "312635",
                                            title: "Excavation for Footing",
                                            quantity: "40000.0000",
                                            unit: "Yards"
                                        }
                                    ]
                                }
                            }
                        ]
                    },
                    invoices: {
                        myinvoice: [
                            {
                                invoiceid: "POQV",
                                providerid: "mazen",
                                updated: "2019-12-08 21:10:04",
                                approved: "2019-12-27 13:39:52",
                                bid: {
                                    biditem: [
                                        {
                                            lineid: "myfirstpayment",
                                            csiid: "yyyyyy",
                                            csi: "312635",
                                            title: "Excavation for Footing",
                                            quantity: "44.0000",
                                            unit: "yards"
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                }
            ]
        },
        allusers: {
            myuser: [
                {
                    providerid: "stevenatwater",
                    companyid: {},
                    emailaddress: "immaisoncrosby@gmail.com",
                    firstname: "Steven",
                    lastname: "Atwater",
                    client: "google",
                    clientid: "109676734658243948537",
                    profileurl: "https://civilengineer-io.s3.amazonaws.com/WLCLZstevenatwater.jpg",
                    stripe: ""
                },
                {
                    providerid: "mazen",
                    companyid: {},
                    emailaddress: "mazen@civilengineer.io",
                    firstname: "Mazen",
                    lastname: "Khenaisser",
                    client: "apple",
                    clientid: "000353.66d2a1610de24944b898df602ab5e7a7.0305",
                    profileurl: "",
                    stripe: "acct_1CCcFoKDR2Pptlfl",
                    company: {
                        companyid: "civilengineer-io",
                        company: "civilengineer.io",
                        address: "5611 Loyalty Way",
                        manager: "mazen",
                        city: "Elk Grove",
                        contactstate: "CA",
                        zipcode: "95757"
                    }
                },
                {
                    providerid: "gusgfk",
                    companyid: {},
                    emailaddress: "gus.gfk@gmail.com",
                    firstname: "Gus",
                    lastname: "Khenaisser",
                    client: "google",
                    clientid: "116250742570414913162",
                    profileurl: "",
                    stripe: ""
                },
                {
                    providerid: "gordonlum",
                    companyid: {},
                    emailaddress: "gocatlum@att.net",
                    firstname: "Gordon",
                    lastname: "Lum",
                    client: "",
                    clientid: "",
                    profileurl: "",
                    stripe: "",
                    company: {
                        companyid: "civilengineer-io",
                        company: "civilengineer.io",
                        address: "5611 Loyalty Way",
                        manager: "mazen",
                        city: "Elk Grove",
                        contactstate: "CA",
                        zipcode: "95757"
                    }
                },
                {
                    providerid: "selene",
                    companyid: {},
                    emailaddress: "ibarrolaselene5@gmail.com",
                    firstname: "Selene",
                    lastname: "ibarrola",
                    client: "google",
                    clientid: "100997823144314216130",
                    profileurl: "",
                    stripe: "",
                    company: {
                        companyid: "civilengineer-io",
                        company: "civilengineer.io",
                        address: "5611 Loyalty Way",
                        manager: "mazen",
                        city: "Elk Grove",
                        contactstate: "CA",
                        zipcode: "95757"
                    }
                },
                {
                    providerid: "allinone",
                    companyid: {},
                    emailaddress: "michaelicay@gmail.com",
                    firstname: "Michael",
                    lastname: "Icay",
                    client: "google",
                    clientid: "112500729328188710919",
                    profileurl: "",
                    stripe: ""
                }
            ]
        }
    })
}
