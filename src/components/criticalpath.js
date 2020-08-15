import React from 'react'
import { MyStylesheet } from './styles';
import PM from './pm'
import { removeIconSmall } from './svg';
import { CreatePredessor, getDateInterval } from './functions'

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
                console.log(milestone.predessors)
                // eslint-disable-next-line
                milestone.predessors.map(predessor => {
                    let milestoneid = predessor.predessor;
                    let type = predessor.type;
                    if (type === 'start-to-start') {
                        let mymilestone = pm.getmilestonebyid.call(this, milestoneid)
                        jsx.push(<div style={{ ...styles.generalContainer }}>
                            <span style={{ ...regularFont, ...styles.generalFont }}>{mymilestone.milestone}</span>
                            <button style={{ ...styles.generalButton, ...removeIcon, ...styles.alignRight }} onClick={() => { criticalpath.removepredessor.call(this, predessor.predessor) }}>{removeIconSmall()}</button>
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
                        console.log(i, j, predessor, milestone, milestoneid)
                        if (predessor) {
                            const k = pm.getpredessorkeybyid.call(this, milestone, milestoneid);
                            console.log(i, j, k)
                            myuser.projects.myproject[i].projectmilestones.mymilestone[j].predessors.splice(k, 1)
                            this.props.reduxUser(myuser);
                            this.setState({ render: 'render' })
                        } else {
                            console.log(`Predessor is false`)
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
                console.log(milestone.predessors)
                // eslint-disable-next-line
                milestone.predessors.map(predessor => {
                    let milestoneid = predessor.predessor;
                    let type = predessor.type;
                    if (type === 'start-to-finish') {
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

    showoptionvalues() {
        const pm = new PM();
        const milestones = pm.getmilestones.call(this);

        const validatemilestone =( milestoneid) => {
            let validate = true;
            if(this.state.activemilestoneid === milestoneid) {
                validate = false;
            } else if(this.state.activemilestoneid) {
                const milestone = pm.getmilestonebyid.call(this, this.state.activemilestoneid)
                if(milestone) {
                    if(milestone.hasOwnProperty("predessors")) {
                        // eslint-disable-next-line
                        milestone.predessors.map(predessor=> {
                            if(predessor.predessor === milestoneid) {
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
                    jsx.push(<option value={milestone.milestoneid}>{milestone.milestone}</option>)

                }
            })


        }
        return jsx;

    }
    showlineandarrow() {
        const x1 = 0
        const y1 = 0

        const x2 = 200
        const y2 = 80


        return (
            <g id="lineandarrow" transform="translate(2.5 0)">
                <polyline className="showmilestones-1" points={`${x2 - 13} ${y2} ${x2 - 23} ${y2} ${x2 - 23} ${y1 + 3} ${x1} ${y1 + 3} ${x1} ${y1}`} />
                <polygon points={`${x2 - 11.53} ${y2 + 4.12} ${x2 - 11.53} ${y2 + 1.79} ${x2 - 20.48} ${y2 + 1.79} ${x2 - 20.48} ${y2 - 1.1} ${x2 - 11.53} ${y2 - 1.1} ${x2 - 11.53} ${y2 - 3.4} ${x2} ${y2 + 0.34} ${x2 - 11.53} ${y2 + 4.12}`} />
            </g>)
    }
    createstartstart(value) {
        const pm = new PM();
        const myuser = pm.getuser.call(this)
        if(value) {
         
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
                            myuser.projects.myproject[i].projectmilestones.mymilestone[j].predessors.push(predessor)
                        } else {
                            myuser.projects.myproject[i].projectmilestones.mymilestone[j].predessors = [predessor]
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
        if(value) {
         
        if (myuser) {

            const project = pm.getprojectbytitle.call(this, this.props.match.params.projectid)
            if (project) {
                const i = pm.getprojectkeybyid.call(this, project.projectid)

                if (this.state.activemilestoneid) {
                    const milestone = pm.getmilestonebyid.call(this, this.state.activemilestoneid)
                    if (milestone) {
                        const j = pm.getmilestonekeybyid.call(this, this.state.activemilestoneid)
                        const predessor = CreatePredessor(value, 'start-to-finish')
                        if (milestone.hasOwnProperty("predessors")) {
                            myuser.projects.myproject[i].projectmilestones.mymilestone[j].predessors.push(predessor)
                        } else {
                            myuser.projects.myproject[i].projectmilestones.mymilestone[j].predessors = [predessor]
                        }
                        this.props.reduxUser(myuser);
                        this.setState({ render: 'render' })


                    }


                }

            }

        }

    }

    }

    showpath() {
        const criticalpath = new CriticalPath();
        const pm = new PM();
        const styles = MyStylesheet();

        const regularFont = pm.getRegularFont.call(this)

        const activemilestone = () => {
            if (this.state.activemilestoneid) {
                const milestone = pm.getmilestonebyid.call(this, this.state.activemilestoneid);
                return (
                    <div style={{ ...styles.generalFlex }}>
                        <span style={{ ...styles.generalFont, ...regularFont }}>Active Milestone Is: {milestone.milestone}</span>
                    </div>
                )
            }
        }
        const projectinterval = pm.getprojectinterval.call(this);
        let scale = "";
        if(projectinterval) {
        const projectdays = getDateInterval(projectinterval.start,projectinterval.completion)
     
        if(projectdays < 24) {
            scale = "day"
        } else if (projectdays < 730) {
            scale = "month"
        } else {
            scale = "year"
        }
    }

    const getlabels = (start,scale) => {
        
    }
        console.log(scale)
        return (

            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>

                    {activemilestone()}

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1 }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>Can't Start until which milestones start? </span> <br />
                            <select style={{ ...regularFont, ...styles.generalFont, ...styles.generalField }} onChange={event => { criticalpath.createstartstart.call(this, event.target.value) }}>
                                <option value=""> Select A Milestone </option>
                                {criticalpath.showoptionvalues.call(this)}
                            </select>
                            {criticalpath.showstartdates.call(this)}
                        </div>
                        <div style={{ ...styles.flex1 }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>Can't Start until which milestones finish? </span>
                            <select style={{ ...regularFont, ...styles.generalFont, ...styles.generalField }} onChange={event => { criticalpath.createstartfinish.call(this, event.target.value) }}>
                                <option value=""> Select A Milestone </option>
                                {criticalpath.showoptionvalues.call(this)}
                            </select>
                            {criticalpath.showenddates.call(this)}
                        </div>
                    </div>

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1202.88 1200.75">
                        <g id="Layer_2" data-name="Layer 2">
                            <g id="lock">
                                <polyline className="showmilestones-7" points="2.5 0.38 2.5 999.32 1202.5 999.32" />
                                <rect className="showmilestones-1" x="2.5" y="0.38" width="200" height="200" />
                                <rect className="showmilestones-1" x="202.5" y="0.38" width="200" height="200" />
                                <rect className="showmilestones-1" x="402.5" y="0.38" width="200" height="200" />
                                <rect className="showmilestones-1" x="602.5" y="0.38" width="200" height="200" />
                                <rect className="showmilestones-1" x="802.5" y="0.38" width="200" height="200" />
                                <rect className="showmilestones-1" x="1002.5" y="0.38" width="200" height="200" />
                                <rect className="showmilestones-1" x="2.5" y="200.38" width="200" height="200" />
                                <rect className="showmilestones-1" x="202.5" y="200.38" width="200" height="200" />
                                <rect className="showmilestones-1" x="402.5" y="200.38" width="200" height="200" />
                                <rect className="showmilestones-1" x="602.5" y="200.38" width="200" height="200" />
                                <rect className="showmilestones-1" x="802.5" y="200.38" width="200" height="200" />
                                <rect className="showmilestones-1" x="1002.5" y="200.38" width="200" height="200" />
                                <rect className="showmilestones-1" x="2.5" y="400.38" width="200" height="200" />
                                <rect className="showmilestones-1" x="202.5" y="400.38" width="200" height="200" />
                                <rect className="showmilestones-1" x="402.5" y="400.38" width="200" height="200" />
                                <rect className="showmilestones-1" x="602.5" y="400.38" width="200" height="200" />
                                <rect className="showmilestones-1" x="802.5" y="400.38" width="200" height="200" />
                                <rect className="showmilestones-1" x="1002.5" y="400.38" width="200" height="200" />
                                <rect className="showmilestones-1" x="2.5" y="600.38" width="200" height="200" />
                                <rect className="showmilestones-1" x="202.5" y="600.38" width="200" height="200" />
                                <rect className="showmilestones-1" x="402.5" y="600.38" width="200" height="200" />
                                <rect className="showmilestones-1" x="602.5" y="600.38" width="200" height="200" />
                                <rect className="showmilestones-1" x="802.5" y="600.38" width="200" height="200" />
                                <rect className="showmilestones-1" x="1002.5" y="600.38" width="200" height="200" />
                                <rect className="showmilestones-1" x="2.5" y="800.38" width="200" height="200" />
                                <rect className="showmilestones-1" x="202.5" y="800.38" width="200" height="200" />
                                <rect className="showmilestones-1" x="402.5" y="800.38" width="200" height="200" />
                                <rect className="showmilestones-1" x="602.5" y="800.38" width="200" height="200" />
                                <rect className="showmilestones-1" x="802.5" y="800.38" width="200" height="200" />
                                <rect className="showmilestones-1" x="1002.5" y="800.38" width="200" height="200" />
                                <rect className="showmilestones-1" x="2.5" y="1000.38" width="200" height="200" />
                                <rect className="showmilestones-1" x="202.5" y="1000.38" width="200" height="200" />
                                <rect className="showmilestones-1" x="402.5" y="1000.38" width="200" height="200" />
                                <rect className="showmilestones-1" x="602.5" y="1000.38" width="200" height="200" />
                                <rect className="showmilestones-1" x="802.5" y="1000.38" width="200" height="200" />
                                <rect className="showmilestones-1" x="1002.5" y="1000.38" width="200" height="200" />
                            </g>

                            <g id="hide">
                                <g id="Layer_1-2" data-name="Layer 1">

                                    <text className="showmilestones-2" transform="translate(4.5 39.98)">Design 08/28/2020 to 09/05/2014</text><text />
                                    <text className="showmilestones-2" transform="translate(394.01 133.95)"><tspan className="showmilestones-3">C</tspan> <tspan x="20.01" y="0">on</tspan><tspan className="showmilestones-4" x="53.7" y="0">s</tspan><tspan x="67.95" y="0">tru</tspan><tspan className="showmilestones-5" x="105.57" y="0">c</tspan><tspan x="119.97" y="0">tion 08/28/2020 to 09/05/2014</tspan></text><text className="showmilestones-2" transform="translate(135.74 1051.1)">O<tspan className="showmilestones-5" x="22.92" y="0">c</tspan><tspan x="37.32" y="0">t 2020</tspan></text><text className="showmilestones-2" transform="translate(340.55 1051.1)">N<tspan className="showmilestones-6" x="22.17" y="0">o</tspan><tspan x="38.64" y="0">v 2020</tspan></text><text className="showmilestones-2" transform="translate(551.97 1051.1)">Dec 2020</text><text className="showmilestones-2" transform="translate(765.55 1051.1)">Jan 2021</text> <text className="showmilestones-2" transform="translate(965.55 1051.1)"><tspan className="showmilestones-3">F</tspan><tspan x="16.41" y="0">eb 2021</tspan></text><text />

                                </g>
                            </g>

                            {criticalpath.showlineandarrow.call(this)}

                            <g id="image">

                                <rect className="showmilestones-8" x="4.61" y="57.74" width="390.3" height="40.03" />
                                <rect className="showmilestones-8" x="394.9" y="137.77" width="500" height="40.03" /></g>
                        </g>
                    </svg>

                </div>
            </div>


        )
    }


}

export default CriticalPath;