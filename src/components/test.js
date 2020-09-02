const milestones = () => {

  return ([
      {
          "milestoneid": "WA4EVMMV0YMWBTX2",
          "milestone": "Activity A",
          "start": "2020-08-01",
          "completion": "2020-08-03"
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
          "completion": "2020-09-02",
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

      "WA4EVMMV0YMWBTX2": {
          completion: "2020-08-03",
          milestone: "Activity A",
          paths: {
              "414OIWWM2UQ0WUWS": {
                  float: 0,
                  type: "start-to-finish",
                  x1: 400,
                  x2: 400,
                  y1: 80,
                  y2: 380
              },

              "AH3HO9Q2W6GH05QE": {
                  float: 0,
                  type: "start-to-finish",
                  x1: 400,
                  x2: 400,
                  y1: 80,
                  y2: 280
              },
              "LO9AIOG8LHT23HHQ": {
                  float: 0,
                  type: "start-to-finish",
                  x1: 400,
                  x2: 400,
                  y1: 80,
                  y2: 180

              }


          },
          start: "2020-08-01"
      },



      "414OIWWM2UQ0WUWS": {
          completion: "2020-08-10",
          milestone: "Activity B",
          paths: {
              "1EE38WYYYRBX97G5": {
                  float: 0,
                  type: "start-to-finish",
                  x1: 1800,
                  x2: 1800,
                  y1: 380,
                  y2: 580
              },


              "YHRVT8NCH33D5VRL": {
                  float: 3,
                  type: "start-to-finish",
                  x1: 1800,
                  x2: 2400,
                  y1: 380,
                  y2: 680,

              }

          },

          start: "2020-08-03"



      },

      "LO9AIOG8LHT23HHQ": {
          completion: "2020-08-13",
          milestone: "Activity C",
          paths: {
              "BIX8D0AZN32WG5SU": {
                  float: 0,
                  type: "start-to-finish",
                  x1: 2400,
                  x2: 2400,
                  y1: 180,
                  y2: 780

              },

              "YHRVT8NCH33D5VRL": {
                  float: 0,
                  type: "start-to-finish",
                  x1: 2400,
                  x2: 2400,
                  y1: 180,
                  y2: 680

              }

          },

          start: "2020-08-03"

      },

      "AH3HO9Q2W6GH05QE": {
          completion: "2020-08-07",
          milestone: "Activity D",
          paths: {
              "9296BYA82Z91UHPK": {
                  float: 0,
                  type: "start-to-finish",
                  x1: 1200,
                  x2: 1200,
                  y1: 280,
                  y2: 480
              },
              "BIX8D0AZN32WG5SU": {
                  float: 6,
                  type: "start-to-finish",
                  x1: 1200,
                  x2: 2400,
                  y1: 280,
                  y2: 780

              }


          },
          start: "2020-08-03"


      },

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

      "YHRVT8NCH33D5VRL": {
          completion: "2020-08-18",
          milestone: "Activity F",
          paths: {
              "1DVGP0JP08V7A6S4": {
                  float: 3,
                  type: "start-to-finish",
                  x1: 3400,
                  x2: 4000,
                  y1: 680,
                  y2: 1080
              },
              "860TLZ3CJYM2TWHX": {
                  float: 0,
                  type: "start-to-finish",
                  x1: 3400,
                  x2: 3400,
                  y1: 680,
                  y2: 880
              },

              "QDLBYJZDH4J4AU76": {
                  float: 0,
                  type: "start-to-finish",
                  x1: 3400,
                  x2: 3400,
                  y1: 680,
                  y2: 980
              }
          },

          start: "2020-08-13"

      },

      "BIX8D0AZN32WG5SU": {
          completion: "2020-08-21",
          milestone: "Activity G",
          paths: {
              "1DVGP0JP08V7A6S4": {
                  float: 0,
                  type: "start-to-finish",
                  x1: 4000,
                  x2: 4000,
                  y1: 780,
                  y2: 1080
              },
              "3C0YEUDO5WSV4SML": {
                  float: 0,
                  type: "start-to-finish",
                  x1: 4000,
                  x2: 4000,
                  y1: 780,
                  y2: 1180

              }


          },

          start: "2020-08-13"

      },

      "9296BYA82Z91UHPK": {
          completion: "2020-08-16",
          milestone: "Activity H",
          paths: {
              "3C0YEUDO5WSV4SML": {
                  float: 5,
                  type: "start-to-finish",
                  x1: 3000,
                  x2: 4000,
                  y1: 480,
                  y2: 1180
              },

              "QDLBYJZDH4J4AU76": {
                  float: 2,
                  type: "start-to-finish",
                  x1: 3000,
                  x2: 3400,
                  y1: 480,
                  y2: 980
              }

          },

          start: "2020-08-07"

      },


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
      },



      "860TLZ3CJYM2TWHX": {
          completion: "2020-08-23",
          milestone: "Activity J",
          paths: {
              "36NQYN6VNV97WQNL": {
                  float: 0,
                  type: "start-to-finish",
                  x1: 4400,
                  x2: 4400,
                  y1: 880,
                  y2: 1280

              }

          },

          start: "2020-08-18"

      },

      "36NQYN6VNV97WQNL": {
          completion: "2020-08-28",
          milestone: "Activity K",
          paths: {
              "QZY5GA0ZB377AOCV": {
                  float: 5,
                  type: "start-to-finish",
                  x1: 5400,
                  x2: 6400,
                  y1: 1280,
                  y2: 1380
              }
          },
          start: "2020-08-23"

      },


      "3C0YEUDO5WSV4SML": {
          completion: "2020-08-27",
          milestone: "Activity L",
          paths: {
              "QZY5GA0ZB377AOCV": {
                  float: 6,
                  type: "start-to-finish",
                  x1: 5200,
                  x2: 6400,
                  y1: 1180,
                  y2: 1380,
                  start: "2020-08-21"

              }


          }

      },

      "QDLBYJZDH4J4AU76": {
          completion: "2020-08-22",
          milestone: "Activity M",
          paths: {
              "QZY5GA0ZB377AOCV": {
                  float: 11,
                  type: "start-to-finish",
                  x1: 4200,
                  x2: 6400,
                  y1: 980,
                  y2: 1380
              }
          },
          start: "2020-08-18"

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

const getpathmilestonebyid = (paths, milestoneid) => {
  return paths[milestoneid]

}

const getfloatbymilestoneid = (paths, milestoneid) => {

  let float = "";
  let i = 0;
  for (let mypath in paths[milestoneid]['paths']) {
      if (i === 0) {
          float = paths[milestoneid]['paths'][mypath]['float']

      } else {
          if (float > paths[milestoneid]['paths'][mypath]['float']) {

              float = paths[milestoneid]['paths'][mypath]['float']

          }
      }


      i += 1;

  }
  return float;


}

const isEmpty = (obj) => {

  // null and undefined are "empty"
  if (obj == null) return true;

  // Assume if it has a length property with a non-zero value
  // that that property is correct.
  if (obj.length > 0) return false;
  if (obj.length === 0) return true;

  // If it isn't an object at this point
  // it is empty, but it can't be anything *but* empty
  // Is it empty?  Depends on your application.
  if (typeof obj !== "object") return true;

  // Otherwise, does it have any properties of its own?
  // Note that this doesn't handle
  // toString and valueOf enumeration bugs in IE < 9
  for (var key in obj) {
      if (hasOwnProperty.call(obj, key)) return false;
  }

  return true;
}

const getpathsbymilestoneid = (paths, milestoneid) => {


}

const calcTotalProjectFloat = (paths, milestoneid) => {
 let checkcalc = true
 let i =0;
 let activemilestoneid = milestoneid;
 while(checkcalc) {


   window[`checkfloat_${i.toString()}`] = 0;
       
       
       let j = 0;
        checkcalc = false;
        for (window[`mypath_${i.toString()}`] in paths[activemilestoneid]['paths']) {
            
         if(!checkemptypathsbymilestoneid(paths,window[`mypath_${i.toString()}`])) {
           checkcalc = true 
          }
             
         
             if (j === 0 || window[`checkfloat_${i.toString()}`] > getfloatbymilestoneid(paths, window[`mypath_${i.toString()}`])) {
                window[`checkfloat_${i.toString()}`] = getfloatbymilestoneid(paths, window[`mypath_${i.toString()}`])
                activemilestoneid = window[`mypath_${i.toString()}`]
            }
         j+=1
       }
   
        i+=1;
 
 }
let float = getfloatbymilestoneid(paths, milestoneid)
let projectfloat = 0;
for(let k=0;k<i;k++) {
  projectfloat+= Number(window[`checkfloat_${k.toString()}`])
}
return float + projectfloat
}

const calculatetotalprojectfloat = (paths, milestoneid) => {

  let activemilestoneid = milestoneid;
  let float = 0;
  float += getfloatbymilestoneid(paths, milestoneid)
  let i = 0;
  let checkfloat = 0;
  let checkfloat_1 = 0;
  let checkfloat_2 = 0;
  for (let mypath in paths[milestoneid]['paths']) {
      if (i === 0 || checkfloat > getfloatbymilestoneid(paths, mypath)) {
          checkfloat = getfloatbymilestoneid(paths, mypath)
      }

      let j = 0;

      for (let mypath_1 in paths[mypath]['paths']) {
          if (j === 0 || checkfloat_1 > getfloatbymilestoneid(paths, mypath_1)) {
              checkfloat_1 = getfloatbymilestoneid(paths, mypath_1)
          }


          let k = 0;

          for (let mypath_2 in paths[mypath_1]['paths']) {
              if (k === 0 || checkfloat_2 > getfloatbymilestoneid(paths, mypath_2)) {
                  checkfloat_2 = getfloatbymilestoneid(paths, mypath_2)
              }


              k += 1;
          }



          j += 1;
      }


      i += 1;
  }
  float = Number(float) + Number(checkfloat) + Number(checkfloat_1) + Number(checkfloat_2);


  return float;
}

const checkemptypathsbymilestoneid = (paths,milestoneid) => {
const path = paths[milestoneid];
let empty = false;
if(checkemptyobject(path.paths)) {
   empty  = true;
}
return empty; 
}
const checkemptyobject = (obj) => {
let empty = true;
for(let x in obj) {
  empty = false;
  
}

return empty; 
}
const auditpaths = (milestones, paths) => {

  let message = ""

  for (let myprop in paths) {
      let mymilestone = getmilestonebyid(milestones, myprop)
      let start = mymilestone.start;
      let completion = mymilestone.completion;

      for (let mypath in paths[myprop]['paths']) {
          let mypredessor = getmilestonebyid(milestones, mypath)
          let predessorstart = mypredessor.start;
          let predessorcompletion = mypredessor.completion;
          if (getDateTime(completion) > getDateTime(predessorstart)) {

              message += `${mymilestone.milestone} has a completion date after the start of ${mypredessor.milestone}`


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

calcTotalProjectFloat(paths(),"9296BYA82Z91UHPK")
