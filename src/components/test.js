const getOffsetDate = (timein) => {
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

const monthString = (month) => {


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

const trailingZeros = (num) => {
    if (num < 10) {
        return (`0${num}`);
    } else {
        return num;
    }

}

const getDateInterval = (start, completion) => {
    const offsetstart = getOffsetDate(start);
    const datestart = new Date(`${start.replace(/-/g, '/')} 00:00:00${offsetstart}`)
    //const offsetcompletion= getOffsetDate(completion);
    const datecompletion = new Date(`${completion.replace(/-/g, '/')} 00:00:00${offsetstart}`)
    const starttime = datestart.getTime();
    const endtime = datecompletion.getTime();
    const interval = (endtime - starttime) / (3600000 * 24);
    return (interval)
}

const increaseCalendarDayOneMonth = (monthstring) => {
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

const getLabels = (start, completion, scale) => {
    let offsetstart = getOffsetDate(start);
    const datestart = new Date(`${start.replace(/-/g, '/')} 00:00:00${offsetstart}`)
    let month = trailingZeros(datestart.getMonth() + 1)
    let year = datestart.getFullYear();
    let day = trailingZeros(datestart.getDate());
    let datestring = `${year}-${month}-${day}`

    const mylabels = [];
    mylabels.push(`<text>${monthString(datestart.getMonth())} ${datestart.getFullYear()}</text>`);
    let int = datestring;
    while (int !== completion) {
        int = increaseCalendarDayOneMonth(int);

        offsetstart = getOffsetDate(int);
        const intstart = new Date(`${int.replace(/-/g, '/')} 00:00:00${offsetstart}`)
        month = trailingZeros(intstart.getMonth() + 1)
        year = datestart.getFullYear();
        day = trailingZeros(datestart.getDate());
        datestring = `${year}-${month}-${day}`
        mylabels.push(`<text>${monthString(intstart.getMonth())} ${intstart.getFullYear()}</text>`);

    }

    return (mylabels)

}
const interval = getDateInterval('2020-04-18', '2022-04-18');
const approxmonth = Math.round(interval/30.41)
const viewboxes = approxmonth;

const drawgrid = (viewboxes) => {
  let grid = [];
  for(let i=0;i<viewboxes;i++) {
    grid.push(`<line className=showmilestones-1 x1=${i*200} x2=${i*200} y1=${200} y2=${200}/>` )
    
    
  }
  return grid;
  
  
}
drawgrid(viewboxes)