const milestones = () => {

  return ([
    {
      "milestoneid": "WA4EVMMV0YMWBTX2",
      "milestone": "Activity A",
      "start": "2020-08-01",
      "completion": "2020-08-04"
    },
    {
      "milestoneid": "LO9AIOG8LHT23HHQ",
      "milestone": "Activity C",
      "start": "2020-08-03",
      "completion": "2020-08-13",
      "predessors": [
        {
          "predessor": "WA4EVMMV0YMWBTX2",
          "type": "start-to-finish"
        }
      ]
    },
    {
      "milestoneid": "AH3HO9Q2W6GH05QE",
      "milestone": "Activity D",
      "start": "2020-08-03",
      "completion": "2020-08-07",
      "predessors": [
        {
          "predessor": "WA4EVMMV0YMWBTX2",
          "type": "start-to-finish"
        }
      ]
    },
    {
      "milestoneid": "414OIWWM2UQ0WUWS",
      "milestone": "Activity B",
      "start": "2020-08-03",
      "completion": "2020-08-10",
      "predessors": [
        {
          "predessor": "WA4EVMMV0YMWBTX2",
          "type": "start-to-finish"
        }
      ]
    },
    {
      "milestoneid": "9296BYA82Z91UHPK",
      "milestone": "Activity H",
      "start": "2020-08-07",
      "completion": "2020-08-16",
      "predessors": [
        {
          "predessor": "AH3HO9Q2W6GH05QE",
          "type": "start-to-finish"
        }
      ]
    },
    {
      "milestoneid": "1EE38WYYYRBX97G5",
      "milestone": "Activity E",
      "start": "2020-08-10",
      "completion": "2020-08-16",
      "predessors": [
        {
          "predessor": "414OIWWM2UQ0WUWS",
          "type": "start-to-finish"
        }
      ]
    },
    {
      "milestoneid": "YHRVT8NCH33D5VRL",
      "milestone": "Activity F",
      "start": "2020-08-13",
      "completion": "2020-08-18",
      "predessors": [
        {
          "predessor": "414OIWWM2UQ0WUWS",
          "type": "start-to-finish"
        },
        {
          "predessor": "LO9AIOG8LHT23HHQ",
          "type": "start-to-finish"
        }
      ]
    },
    {
      "milestoneid": "BIX8D0AZN32WG5SU",
      "milestone": "Activity G",
      "start": "2020-08-13",
      "completion": "2020-08-21",
      "predessors": [
        {
          "predessor": "LO9AIOG8LHT23HHQ",
          "type": "start-to-finish"
        },
        {
          "predessor": "AH3HO9Q2W6GH05QE",
          "type": "start-to-finish"
        }
      ]
    },
    {
      "milestoneid": "860TLZ3CJYM2TWHX",
      "milestone": "Activity J",
      "start": "2020-08-18",
      "completion": "2020-08-23",
      "predessors": [
        {
          "predessor": "YHRVT8NCH33D5VRL",
          "type": "start-to-finish"
        }
      ]
    },
    {
      "milestoneid": "QDLBYJZDH4J4AU76",
      "milestone": "Activity M",
      "start": "2020-08-18",
      "completion": "2020-08-22",
      "predessors": [
        {
          "predessor": "YHRVT8NCH33D5VRL",
          "type": "start-to-finish"
        },
        {
          "predessor": "9296BYA82Z91UHPK",
          "type": "start-to-finish"
        }
      ]
    },
    {
      "milestoneid": "1DVGP0JP08V7A6S4",
      "milestone": "Activity I",
      "start": "2020-08-21",
      "completion": "2020-09-07",
      "predessors": [
        {
          "predessor": "YHRVT8NCH33D5VRL",
          "type": "start-to-finish"
        },
        {
          "predessor": "BIX8D0AZN32WG5SU",
          "type": "start-to-finish"
        }
      ]
    },
    {
      "milestoneid": "3C0YEUDO5WSV4SML",
      "milestone": "Activity L",
      "start": "2020-08-21",
      "completion": "2020-08-27",
      "predessors": [
        {
          "predessor": "BIX8D0AZN32WG5SU",
          "type": "start-to-finish"
        },
        {
          "predessor": "9296BYA82Z91UHPK",
          "type": "start-to-finish"
        }
      ]
    },
    {
      "milestoneid": "36NQYN6VNV97WQNL",
      "milestone": "Activity K",
      "start": "2020-08-23",
      "completion": "2020-08-28",
      "predessors": [
        {
          "predessor": "1EE38WYYYRBX97G5",
          "type": "start-to-finish"
        },
        {
          "predessor": "860TLZ3CJYM2TWHX",
          "type": "start-to-finish"
        }
      ]
    },
    {
      "milestoneid": "QZY5GA0ZB377AOCV",
      "milestone": "Activity N",
      "start": "2020-09-02",
      "completion": "2020-09-05",
      "predessors": [
        {
          "predessor": "1DVGP0JP08V7A6S4",
          "type": "start-to-finish"
        },
        {
          "predessor": "36NQYN6VNV97WQNL",
          "type": "start-to-finish"
        },
        {
          "predessor": "QDLBYJZDH4J4AU76",
          "type": "start-to-finish"
        },
        {
          "predessor": "3C0YEUDO5WSV4SML",
          "type": "start-to-finish"
        }
      ]
    }
  ]
  )

}

const getmilestonebyid = (milestones, milestoneid) => {

  let mymilestone = false;
  milestones.map(milestone => {

    if (milestone.milestoneid === milestoneid) {

      mymilestone = milestone;
    }

  })

  return mymilestone;
}

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

const getDateTime = (datestr) => {
  let offset = getOffsetDate(datestr)
  let datein = new Date(`${datestr.replace(/-/g, '/')} 00:00:00${offset}`)
  return datein.getTime();
}

const paths = () => {

  return ({
    "1DVGP0JP08V7A6S4": {
      completion: "2020-09-07",
      milestone: "Activity I",
      paths: {
        "QZY5GA0ZB377AOCV": {
          float: 0,
          type: "start-to-finish",
          x1: 6400,
          x2: 6400,
          y1: 1080,
          y2: 1380

        }
      },
      start: "2020-08-21"
    }


  }, {


    "1EE38WYYYRBX97G5": {
      completion: "2020-08-16",
      milestone: "Activity E",
      paths: {
        "36NQYN6VNV97WQNL": {
          float: 7,
          type: "start-to-finish",
          x1: 3000,
          x2: 4400,
          y1: 580,
          y2: 1280

        },
      


      },
      start: "2020-08-10"


    },
    
    "QZY5GA0ZB377AOCV": {
												completion: "2020-09-05",
												milestone: "Activity N",
												paths: {},
												start: "2020-09-02"
          
          							}

  }

  )


}
const auditpaths = (milestones, paths) => {
  
  let message = ""
  
  for(let myprop in paths) {
    let mymilestone = getmilestonebyid(milestones, myprop)
    let start = mymilestone.start;
    let completion =mymilestone.completion;
			
    for(let mypath in paths[myprop]['paths']) {
      let mypredessor = getmilestonebyid(milestones, mypath)
     	let predessorstart = mypredessor.start;
      let predessorcompletion = mypredessor.completion;
    		if(getDateTime(completion)>getDateTime(predessorstart)) {
          
          message+=`${mymilestone.milestone} has a completion date after the start of ${mypredessor.milestone}`
          
          
        }
     
      
      
      
    }
   
  }
  
  return message;
  
}
const auditmilestones = (milestones) => {
  let message = "";

  milestones.map(milestone => {
    let start = milestone.start;
    let completion = milestone.completion;
    // message += `${start} ${completion}`

    if (milestone.hasOwnProperty("predessors")) {

      milestone.predessors.map(predessor => {
        let mypredessor = getmilestonebyid(milestones, predessor.predessor);
        let predessorstart = mypredessor.start;
        let predessorcompletion = mypredessor.completion;
        if (getDateTime(start) < getDateTime(predessorcompletion)) {
          message += `${milestone.milestone} cannot start before ${mypredessor.milestone} completion `
        }

      })

    }

  })


  return message;
}

auditmilestones(milestones())
auditpaths(milestones(),paths())