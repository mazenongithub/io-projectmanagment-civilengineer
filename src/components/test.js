const projectinterval = {start:'2020-04-30',completion:'2022-04-30'}
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

const getScale = (interval) => {

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

const calculatemonth = (int, compl, start, completion) => {
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
const projectmilestones ={"projectmilestones": {
"mymilestone": [
{
"milestoneid": "WA4EVMMV0YMWBTX2",
"milestone": "Planning",
"start": "2020-04-19",
"completion": "2020-06-20"
},
{
"milestoneid": "414OIWWM2UQ0WUWS",
"milestone": "Design",
"start": "2020-06-20",
"completion": "2020-09-20",
"predessors": [
{
"predessor": "WA4EVMMV0YMWBTX2",
"type": "start-to-finish"
}
]
},
{
"milestoneid": "LO9AIOG8LHT23HHQ",
"milestone": "Construction",
"start": "2020-09-20",
"completion": "2021-04-21",
"predessors": [
{
"predessor": "414OIWWM2UQ0WUWS",
"type": "start-to-finish"
}
]
}
]
}
}
const milestones = projectmilestones.projectmilestones.mymilestone;
let paths = {}

 
const getmilestonebyid =(paths,milestoneid) => {
  let mymilestone = false;
  if(paths.hasOwnProperty(milestoneid)) {
    
    mymilestone = paths[milestoneid]
  }
  
 return mymilestone; 
  
}

const getPathsbyMilestoneID = (milestones,milestoneid) => {
 
  let path = {};
  milestones.map(milestone=> {
    if(milestone.hasOwnProperty("predessors")) {
      // eslint-disable-next-line
      milestone.predessors.map(predessor=> {
        if(predessor.predessor === milestoneid) {
          path[`${milestone.milestoneid}`] = {};
          path[`${milestone.milestoneid}`]['type']=predessor.type
         
          
                 
        }
        
        
      })
      
      
      
    }
    
    
  })
  
 return path; 
}

milestones.map(milestone=> {
  paths[`${milestone.milestoneid}`] = {};
  paths[`${milestone.milestoneid}`]['milestone'] = milestone.milestone
  paths[`${milestone.milestoneid}`]['start'] = milestone.start
  paths[`${milestone.milestoneid}`]['completion'] = milestone.completion;
  paths[`${milestone.milestoneid}`]['paths'] = getPathsbyMilestoneID(projectmilestones.projectmilestones.mymilestone,milestone.milestoneid)

})




let interval = getDateInterval(projectinterval.start,projectinterval.completion)
let scale = getScale(interval)
interval
let mymilestones = [];
let myobjs = []
Object.getOwnPropertyNames(paths).map(path=> {
mymilestones.push(path) 
})

mymilestones.map((milestoneid,i)=> {
  
  if((paths[milestoneid]).hasOwnProperty("paths")) {
    
    
 
     if(Object.getOwnPropertyNames(paths[milestoneid].paths).length > 0) {
       
         Object.getOwnPropertyNames(paths[milestoneid].paths).map(prop=> {
           const params = calculatemonth(projectinterval.start,projectinterval.completion,paths[milestoneid]['start'],paths[milestoneid]['completion'])
           const milestone_2 = getmilestonebyid(paths,prop)
           let params_2 = {};
           if(milestone_2) {
             
             if(scale === 'month') {
            	params_2 = calculatemonth(projectinterval.start,projectinterval.completion,milestone_2['start'],milestone_2['completion'])
             	}
            }
           paths[milestoneid].paths[prop]['x1']=params.xo + params.width;
           paths[milestoneid].paths[prop]['y1']='y1'
           paths[milestoneid].paths[prop]['y2']='y2'
           paths[milestoneid].paths[prop]['x2']=params_2.xo + params_2.width;
           paths[milestoneid].paths[prop]['float']='float';
           paths[milestoneid].paths[prop]['totalfloat']='totalfloat'
           
         })
        
      }
    
    
  }

  
})



let mypathstring = '';
for(let myprop in paths) {

    for(let mypaths in paths[myprop]['paths']) {
      mypathstring += paths[myprop]['paths'][mypaths]['x1']
      
    }
    
  
  
}
paths