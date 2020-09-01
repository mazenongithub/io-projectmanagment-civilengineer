const paths = () => {
  return ({
    "414OIWWM2UQ0WUWS": {
      start: "2020-06-20",
      completion: "2020-09-20",
      milestone: "Design",
      paths: {
        "LO9AIOG8LHT23HHQ":
        {
          float: "float",
          type: "start-to-finish",
          x1: 1131.2068398553106,
          x2: 1131.2068398553106,
          y1: 180,
          y2: 280
        }

      }

    },
    "WA4EVMMV0YMWBTX2": {
      completion: "2020-06-20",
      milestone: "Planning",
      paths: {
        "414OIWWM2UQ0WUWS": {
          float: "float",
          type: "start-to-finish",
          x1: 526.1427162117725,
          x2: 526.1427162117724,
          y1: 80,
          y2: 180

        }


      }

    },
    "LO9AIOG8LHT23HHQ": {
      completion: "2021-04-21",
      milestone: "Construction",
      paths: {},
      start: "2020-09-20"
    }

  })
}

const getmilestonebyid = (paths, milestoneid) => {
  
  return paths[milestoneid]
  
}
const pathobj = paths();
let propstring = "";
let milestone_1  = "";
let milestone_2 = "";
 for(let myprop in pathobj) {
    milestone_1 =  getmilestonebyid(pathobj,myprop)
    
   
   propstring += `${myprop} `
   for(let mypath in pathobj[myprop]['paths']) {
    milestone_2 =  getmilestonebyid(pathobj,mypath)
 
     
   }
     
 }
milestone_1
milestone_2


//paths()['414OIWWM2UQ0WUWS'].paths['LO9AIOG8LHT23HHQ']