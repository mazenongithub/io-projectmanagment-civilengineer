import React from 'react'
import { MyStylesheet } from './styles';
import PM from './pm'
import { removeIconSmall } from './svg';
import { CreatePredessor, getDateInterval, milestoneformatdatestring, getRandomColor} from './functions'

class CriticalPath {

    showstartdates() {
        const pm = new PM();
        const jsx = [];
        const styles = MyStylesheet();
        const regularFont = pm.getRegularFont.call(this);
        const removeIcon = pm.getremoveicon.call(this);
        const criticalpath = new CriticalPath();
        if (this.state.activemilestoneid) {
            const milestone = pm.getmilestonebyid.call(this, this.state.activemilestoneid);
            if (milestone.hasOwnProperty("predessors")) {
               
                // eslint-disable-next-line
                milestone.predessors.map(predessor => {
                    let milestoneid = predessor.predessor;
                    let type = predessor.type;
                    if (type === 'start-to-start') {
                        let mymilestone = pm.getmilestonebyid.call(this, milestoneid)
                        jsx.push(<div style={{ ...styles.generalContainer }}>
                            <span style={{ ...regularFont, ...styles.generalFont }}>{mymilestone.milestone}</span>
                            <button style={{ ...styles.generalButton, ...removeIcon, ...styles.alignRight }} onClick={() => { criticalpath.removepredessor.call(this, milestone, predessor.predessor) }}>{removeIconSmall()}</button>
                        </div>)
                    }
                })
            }

        }
        return jsx;

    }
    removepredessor(milestone, milestoneid) {
        const pm = new PM();
        const predessors = pm.getpredessorbyid.call(this, milestone, milestoneid)
        const predessor = pm.getmilestonebyid.call(this, predessors.predessor)
        if (window.confirm(`Are you sure you want to remove predessor ${predessor.milestone} from ${milestone.milestone}?`)) {
            const pm = new PM();
            const myuser = pm.getuser.call(this)
            if (myuser) {

                const myproject = pm.getprojectbytitle.call(this, this.props.match.params.projectid)
                if (myproject) {
                    const i = pm.getprojectkeybyid.call(this, myproject.projectid)
                    const mymilestone = pm.getmilestonebyid.call(this, milestone.milestoneid);
                    if (mymilestone) {
                        const j = pm.getmilestonekeybyid.call(this, milestone.milestoneid)
                        const predessor = pm.getpredessorbyid.call(this, milestone, milestoneid);
                      
                        if (predessor) {
                            const k = pm.getpredessorkeybyid.call(this, milestone, milestoneid);
                           
                            myuser.projects[i].milestones[j].predessors.splice(k, 1)
                            this.props.reduxUser(myuser);
                            this.setState({ render: 'render' })
                        } 

                    }


                }

            }

        }


    }

    showenddates() {

        const pm = new PM();
        const jsx = [];
        const styles = MyStylesheet();
        const regularFont = pm.getRegularFont.call(this);
        const removeIcon = pm.getremoveicon.call(this);
        const criticalpath = new CriticalPath();
        if (this.state.activemilestoneid) {
            const milestone = pm.getmilestonebyid.call(this, this.state.activemilestoneid);
            if (milestone.hasOwnProperty("predessors")) {
          
                // eslint-disable-next-line
                milestone.predessors.map(predessor => {
                    let milestoneid = predessor.predessor;
                    let type = predessor.type;
                    if (type === 'start-to-finish') {
                        let mymilestone = pm.getmilestonebyid.call(this, milestoneid)
                        jsx.push(<div style={{ ...styles.generalContainer }} key={`predessor${mymilestone.milestone}${this.state.activemilestoneid}`}>
                            <span style={{ ...regularFont, ...styles.generalFont }}>{mymilestone.milestone}</span>
                            <button style={{ ...styles.generalButton, ...removeIcon, ...styles.alignRight }} onClick={() => { criticalpath.removepredessor.call(this, milestone, predessor.predessor) }}>{removeIconSmall()}</button>
                        </div>)
                    }
                })
            }

        }
        return jsx;

    }

    showoptionvalues() {
        const pm = new PM();
        const milestones = pm.getmilestones.call(this);

        const validatemilestone = (milestoneid) => {
            let validate = true;
            if (this.state.activemilestoneid === milestoneid) {
                validate = false;
            } else if (this.state.activemilestoneid) {
                const milestone = pm.getmilestonebyid.call(this, this.state.activemilestoneid)
                if (milestone) {
                    if (milestone.hasOwnProperty("predessors")) {
                        // eslint-disable-next-line
                        milestone.predessors.map(predessor => {
                            if (predessor.predessor === milestoneid) {
                                validate = false;
                            }
                        })
                    }
                }
            }
            return validate;
        }

        const jsx = [];
        if (milestones) {
            // eslint-disable-next-line
            milestones.map(milestone => {
                if (validatemilestone(milestone.milestoneid)) {
                    jsx.push(<option key={`op${milestone.milestoneid}`}value={milestone.milestoneid}>{milestone.milestone}</option>)

                }
            })


        }
        return jsx;

    }
    showlineandarrow(x1,y1,x2,y2) {
        // const x1 = 0
        // const y1 = 0

        // const x2 = 200
        // const y2 = 80
        let randomcolor = getRandomColor()

        return (
            <g key={`${x1.toString()}${y1.toString()}${x2.toString()}${y2.toString()}`}id="lineandarrow">
                <polyline stroke={randomcolor} fill='none' points={`${x2 - 13} ${y2} ${x2 - 23} ${y2} ${x2 - 23} ${y1 + 3} ${x1} ${y1 + 3} ${x1} ${y1}`} />
                <polygon stroke={randomcolor} fill={randomcolor} points={`${x2 - 11.53} ${y2 + 4.12} ${x2 - 11.53} ${y2 + 1.79} ${x2 - 20.48} ${y2 + 1.79} ${x2 - 20.48} ${y2 - 1.1} ${x2 - 11.53} ${y2 - 1.1} ${x2 - 11.53} ${y2 - 3.4} ${x2} ${y2 + 0.34} ${x2 - 11.53} ${y2 + 4.12}`} />
            </g>)
    }
    createstartstart(value) {
        const pm = new PM();
        const myuser = pm.getuser.call(this)
        if (value) {

            if (myuser) {

                const project = pm.getprojectbytitle.call(this, this.props.match.params.projectid)
                if (project) {
                    const i = pm.getprojectkeybyid.call(this, project.projectid)

                    if (this.state.activemilestoneid) {
                        const milestone = pm.getmilestonebyid.call(this, this.state.activemilestoneid)
                        if (milestone) {
                            const j = pm.getmilestonekeybyid.call(this, this.state.activemilestoneid)
                            const predessor = CreatePredessor(value, 'start-to-start')
                            if (milestone.hasOwnProperty("predessors")) {
                                myuser.projects[i].milestones[j].predessors.push(predessor)
                            } else {
                                myuser.projects[i].milestones[j].predessors = [predessor]
                            }
                            this.props.reduxUser(myuser);
                            this.setState({ render: 'render' })


                        }


                    }

                }

            }

        }

    }

    createstartfinish(value) {
        const pm = new PM();
        const myuser = pm.getuser.call(this)
        if (value) {

            if (myuser) {

                const project = pm.getproject.call(this)
                if (project) {
                    const i = pm.getprojectkeybyid.call(this, project.projectid)

                    if (this.state.activemilestoneid) {
                        const milestone = pm.getmilestonebyid.call(this, this.state.activemilestoneid)
                        if (milestone) {
                            const j = pm.getmilestonekeybyid.call(this, this.state.activemilestoneid)
                            const predessor = CreatePredessor(value, 'start-to-finish')
                            if (milestone.hasOwnProperty("predessors")) {
                                myuser.projects[i].milestones[j].predessors.push(predessor)
                            } else {
                                myuser.projects[i].milestones[j].predessors = [predessor]
                            }
                            this.props.reduxUser(myuser);
                            this.setState({ render: 'render' })


                        }


                    }

                }

            }

        }

    }

    showmilestones() {
        const pm = new PM();
        const milestones = pm.getmilestones.call(this);
        const styles = MyStylesheet();
        const regularFont = pm.getRegularFont.call(this)
        let mymilestones = [];
   
       
            if (milestones) {
                // eslint-disable-next-line
                milestones.map(milestone => {
                  
                    const params = pm.getmilestonecoordbyid.call(this,milestone.milestoneid)
             
                    mymilestones.push(
                        <g key={`texdft${milestone.milestoneid}`}>
                            <text style={{ ...regularFont, ...styles.generalFont }} x={params.xo} y={params.ypos - 10}> {milestone.milestone} {milestoneformatdatestring(milestone.start)} to {milestoneformatdatestring(milestone.completion)}</text>

                        </g>)

                    mymilestones.push(
                        <g key={`rdfec${milestone.milestoneid}`}>

                            <rect className="milestonediagram-4" x={params.xo} y={params.ypos} width={params.width} height="80" />
                        </g>)

                        if(milestone.hasOwnProperty("predessors")) {

                            mymilestones.push(<polygon key={`${milestone.milestoneid}arrow`} className="milestonediagram-6 milestonediagram-4" points={`${params.xo} ${params.ypos} ${params.xo-18.16} ${params.ypos-10.49} ${params.xo-18.16} ${params.ypos+10.49} ${params.xo}`}/>)
// eslint-disable-next-line
                            milestone.predessors.map(predessor=>{
                                const getpredessor = pm.getmilestonecoordbyid.call(this,predessor.predessor)
                             
                               
                                mymilestones.push(<polyline key={`${milestone.milestoneid}${predessor.predessor}`} className="milestonediagram-6" points={`${params.xo} ${params.ypos} ${getpredessor.xo+getpredessor.width-23.87} ${params.ypos} ${getpredessor.xo+getpredessor.width-23.87} ${getpredessor.ypos} `}/>)                                
                            })
                           

                          
                           
                        }

    


                })



            }

        

        return mymilestones.reverse();
    }

    showpaths() {
        const pm = new PM();
        const criticalpath = new CriticalPath();
        const paths = pm.getpaths.call(this)
        console.log(paths)
        let getpaths = [];

        for(let myprop in paths) {

            for(let mypaths in paths[myprop]['paths']) {
                let x1 = paths[myprop]['paths'][mypaths]['x1'];
                let x2 =paths[myprop]['paths'][mypaths]['x2'];
                let y1 = paths[myprop]['paths'][mypaths]['y1'];
                let y2 =paths[myprop]['paths'][mypaths]['y2'];

                getpaths.push(criticalpath.showlineandarrow.call(this,x1,y1,x2,y2)); 
              
            }
            
          
          
        }
        

        return getpaths;

    }

 

    

    showpath() {
        const criticalpath = new CriticalPath();
        const pm = new PM();
        const styles = MyStylesheet();
        const regularFont = pm.getRegularFont.call(this)
        const projectinterval = pm.getprojectinterval.call(this)
        const milestones = pm.getmilestones.call(this)
        if(milestones) {
        const days = getDateInterval(projectinterval.start,projectinterval.completion)

       
      
        const getHeight = (milestones) => {
            let height = 266.56 + 200*milestones.length
            
        
            return height;
        }

        const getWidth = (days) => {
            let width = 1810 
            if(days > 18) {
                width = 3610

            }
            return width;
        }
        const activemilestone = () => {
            if (this.state.activemilestoneid) {
                const milestone = pm.getmilestonebyid.call(this, this.state.activemilestoneid);
                const float = pm.getfloatbymilestoneid.call(this,this.state.activemilestoneid) 
                const projectfloat = pm.calcTotalProjectFloat.call(this,this.state.activemilestoneid)
               const lag = pm.getlagbymilestoneid.call(this,this.state.activemilestoneid)
                return (
                    <div style={{ ...styles.generalContainer }}>
                       <div style={{ ...styles.generalContainer }}><span style={{ ...styles.generalFont, ...regularFont }}>Active Milestone Is: {milestone.milestone}  Float is {float} days Project Float is {projectfloat} days Lag is {lag} days</span></div> 
                    </div>
                )
            }
        }

        const extraRows = (days,milestones) => {
            let getextrarows = [];
      
            if(milestones.length>5) {

                for(let x=6;x<=milestones.length;x++) {
                  
                  
                getextrarows.push(<g>
                <rect className="milestonediagram-6" x="5" y={1005 + 200*(x-5)} width="200" height="200"/>
                <rect className="milestonediagram-6" x="205" y={1005 + 200*(x-5)} width="200" height="200"/>
                <rect className="milestonediagram-6" x="405" y={1005 + 200*(x-5)} width="200" height="200"/>
                <rect className="milestonediagram-6" x="605" y={1005 + 200*(x-5)} width="200" height="200"/>
                <rect className="milestonediagram-6" x="805" y={1005 + 200*(x-5)} width="200" height="200"/>
                <rect className="milestonediagram-6" x="1005" y={1005 + 200*(x-5)} width="200" height="200"/>
                <rect className="milestonediagram-6" x="1205" y={1005 + 200*(x-5)} width="200" height="200"/>
                <rect className="milestonediagram-6" x="1405" y={1005 + 200*(x-5)} width="200" height="200"/>
                <rect className="milestonediagram-6" x="1605" y={1005 + 200*(x-5)} width="200" height="200"/></g>
                )

                if(days>18) {
                    getextrarows.push(<g><rect className="milestonediagram-6" x="5" y="1005" width="200" height="200"/>
                    <rect className="milestonediagram-6" x="1805" y={1005 + 200*(x-5)} width="200" height="200"/>
                    <rect className="milestonediagram-6" x="2005" y={1005 + 200*(x-5)} width="200" height="200"/>
                    <rect className="milestonediagram-6" x="2205" y={1005 + 200*(x-5)} width="200" height="200"/>
                    <rect className="milestonediagram-6" x="2405" y={1005 + 200*(x-5)} width="200" height="200"/>
                    <rect className="milestonediagram-6" x="2605" y={1005 + 200*(x-5)} width="200" height="200"/>
                    <rect className="milestonediagram-6" x="2805" y={1005 + 200*(x-5)} width="200" height="200"/>
                    <rect className="milestonediagram-6" x="3005" y={1005 + 200*(x-5)} width="200" height="200"/>
                    <rect className="milestonediagram-6" x="3205" y={1005 + 200*(x-5)} width="200" height="200"/></g>
                    )
                }


            }

            }
            return getextrarows;

        }

        
        const extraColumns = (days) => {
            let extracolumns = [];
            if(days>18) {
                
                    for(let x=0;x<9;x++) {
                        extracolumns.push(   
                        <g>
                            <rect className="milestonediagram-6" x={1805 + x*200} y="5" width="200" height="200"/>
                            <rect className="milestonediagram-6" x={1805 + x*200} y="205" width="200" height="200"/>
                            <rect className="milestonediagram-6" x={1805 + x*200} y="405" width="200" height="200"/>
                            <rect className="milestonediagram-6" x={1805 + x*200} y="605" width="200" height="200"/>
                            <rect className="milestonediagram-6" x={1805 + x*200} y="805" width="200" height="200"/>
                            <rect className="milestonediagram-6" x={1805 + x*200} y="1005" width="200" height="200"/>
                
                            </g>
                    )

                    }
                    return extracolumns;
                 
                }

        }
 // eslint-disable-next-line
        const showBorder = (days,milestones) => {
            return(  <rect className="milestonediagram-3" x="5" y="5" width={getWidth(days)-10} height={getHeight(milestones)-66.56}/>)
        }
 // eslint-disable-next-line
        const showgrid = (days) => {


            
           return(<g id="grid">
            {extraColumns(days)}
            {extraRows(days,milestones)}
            <rect className="milestonediagram-6" x="5" y="5" width="200" height="200"/>
            <rect className="milestonediagram-6" x="205" y="5" width="200" height="200"/>
            <rect className="milestonediagram-6" x="405" y="5" width="200" height="200"/>
            <rect className="milestonediagram-6" x="605" y="5" width="200" height="200"/>
            <rect className="milestonediagram-6" x="805" y="5" width="200" height="200"/>
            <rect className="milestonediagram-6" x="1005" y="5" width="200" height="200"/>
            <rect className="milestonediagram-6" x="1205" y="5" width="200" height="200"/>
            <rect className="milestonediagram-6" x="1405" y="5" width="200" height="200"/>
            <rect className="milestonediagram-6" x="1605" y="5" width="200" height="200"/>
            <rect className="milestonediagram-6" x="5" y="205" width="200" height="200"/>
            <rect className="milestonediagram-6" x="205" y="205" width="200" height="200"/>
            <rect className="milestonediagram-6" x="405" y="205" width="200" height="200"/>
            <rect className="milestonediagram-6" x="605" y="205" width="200" height="200"/>
            <rect className="milestonediagram-6" x="805" y="205" width="200" height="200"/>
            <rect className="milestonediagram-6" x="1005" y="205" width="200" height="200"/>
            <rect className="milestonediagram-6" x="1205" y="205" width="200" height="200"/>
            <rect className="milestonediagram-6" x="1405" y="205" width="200" height="200"/>
            <rect className="milestonediagram-6" x="1605" y="205" width="200" height="200"/>
            <rect className="milestonediagram-6" x="5" y="405" width="200" height="200"/>
            <rect className="milestonediagram-6" x="205" y="405" width="200" height="200"/>
            <rect className="milestonediagram-6" x="405" y="405" width="200" height="200"/>
            <rect className="milestonediagram-6" x="605" y="405" width="200" height="200"/>
            <rect className="milestonediagram-6" x="805" y="405" width="200" height="200"/>
            <rect className="milestonediagram-6" x="1005" y="405" width="200" height="200"/>
            <rect className="milestonediagram-6" x="1205" y="405" width="200" height="200"/>
            <rect className="milestonediagram-6" x="1405" y="405" width="200" height="200"/>
            <rect className="milestonediagram-6" x="1605" y="405" width="200" height="200"/>
            <rect className="milestonediagram-6" x="5" y="605" width="200" height="200"/>
            <rect className="milestonediagram-6" x="205" y="605" width="200" height="200"/>
            <rect className="milestonediagram-6" x="405" y="605" width="200" height="200"/>
            <rect className="milestonediagram-6" x="605" y="605" width="200" height="200"/>
            <rect className="milestonediagram-6" x="805" y="605" width="200" height="200"/>
            <rect className="milestonediagram-6" x="1005" y="605" width="200" height="200"/>
            <rect className="milestonediagram-6" x="1205" y="605" width="200" height="200"/>
            <rect className="milestonediagram-6" x="1405" y="605" width="200" height="200"/>
            <rect className="milestonediagram-6" x="1605" y="605" width="200" height="200"/>
            <rect className="milestonediagram-6" x="5" y="805" width="200" height="200"/>
            <rect className="milestonediagram-6" x="205" y="805" width="200" height="200"/>
            <rect className="milestonediagram-6" x="405" y="805" width="200" height="200"/>
            <rect className="milestonediagram-6" x="605" y="805" width="200" height="200"/>
            <rect className="milestonediagram-6" x="805" y="805" width="200" height="200"/>
            <rect className="milestonediagram-6" x="1005" y="805" width="200" height="200"/>
            <rect className="milestonediagram-6" x="1205" y="805" width="200" height="200"/>
            <rect className="milestonediagram-6" x="1405" y="805" width="200" height="200"/>
            <rect className="milestonediagram-6" x="1605" y="805" width="200" height="200"/>
            
            <rect className="milestonediagram-6" x="5" y="1005" width="200" height="200"/>
            <rect className="milestonediagram-6" x="205" y="1005" width="200" height="200"/>
            <rect className="milestonediagram-6" x="405" y="1005" width="200" height="200"/>
            <rect className="milestonediagram-6" x="605" y="1005" width="200" height="200"/>
            <rect className="milestonediagram-6" x="805" y="1005" width="200" height="200"/>
            <rect className="milestonediagram-6" x="1005" y="1005" width="200" height="200"/>
            <rect className="milestonediagram-6" x="1205" y="1005" width="200" height="200"/>
            <rect className="milestonediagram-6" x="1405" y="1005" width="200" height="200"/>
            <rect className="milestonediagram-6" x="1605" y="1005" width="200" height="200"/>
        </g>)
        }

     




        return (

            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>

            

                    {activemilestone()}

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>

                        <div style={{ ...styles.flex1 }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>Can't Start until which milestones finish? </span>
                            <select style={{ ...regularFont, ...styles.generalFont, ...styles.generalField }} onChange={event => { criticalpath.createstartfinish.call(this, event.target.value) }}>
                                <option value=""> Select A Milestone </option>
                                {criticalpath.showoptionvalues.call(this)}
                            </select>
                            {criticalpath.showenddates.call(this)}
                        </div>
                    </div>

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${getWidth(days)} ${getHeight(milestones)}`}>
    <defs>
        <style>
</style>
    </defs>
    <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
           
       
          
            {criticalpath.showmilestones.call(this)}
           
        </g>

     
    </g>
</svg>

                </div>
            </div>


        )

        }
    }


}

export default CriticalPath;