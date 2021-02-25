const interval = {start: "2021-01-29", completion: "2021-03-28"}
const milestone_1 =  {milestoneid:'milestone_1',start: "2021-01-29", completion: "2021-01-30"}
const milestone_2 =  {milestoneid:'milestone_2',start: "2021-01-30", completion: "2021-01-31"}
const milestone_3 =  {milestoneid:'milestone_3',start: "2021-02-01", completion: "2021-02-01"}
const milestones = [milestone_1,milestone_2,milestone_3]

const calculateday = (int, compl, start, completion) => {
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


const getScale = (interval) => {
		
    let scale = "";
    if(interval < 36) {
      scale = 100;
    } else  {
      
      scale = Math.round(100/(Math.ceil(interval/36)))
    }
      
      
    
    return scale;

}

const getCoordinates = (milestones, milestoneid) => {
  let getcoordinates = {};
let projectstart = "";
  let projectend  = "";
  milestones.map((milestone,i)=> {
   const ypos=200*(i+1) + 5
   
   if(i === 0) {
      projectstart = milestone.start
   }
    
 
    if(milestone.milestoneid === milestoneid) {
      
      getcoordinates.milestone = milestone.milestoneid
      getcoordinates.ypos = ypos
      getcoordinates.projectstart = projectstart
      
      
    }
    
      if(i === milestones.length - 1) {
     
     getcoordinates.projectend = milestone.completion
     
   }
   
    
  })
  return getcoordinates;
  
  
  
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

const getDateInterval = (start, completion) => {

    const offsetstart = getOffsetDate(start);
    const datestart = new Date(`${start.replace(/-/g, '/')} 00:00:00${offsetstart}`)
    //const offsetcompletion= getOffsetDate(completion);
    const datecompletion = new Date(`${completion.replace(/-/g, '/')} 23:59:59${offsetstart}`)
    const starttime = datestart.getTime();
    const endtime = datecompletion.getTime();
    const interval = (endtime - starttime) / (3600000 * 24);
    return (+Number(interval).toFixed(2))
}
getCoordinates(milestones, 'milestone_2')
getScale(getDateInterval(interval.start,interval.completion))
