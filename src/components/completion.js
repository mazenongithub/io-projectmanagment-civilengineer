import React from 'react';
import { MyStylesheet } from './styles'
import PM from './pm';
import MaterialCalender from './completioncalender'
import { validateMonth, validateDate, validateYear } from './functions';


class CompletionDate {


    handleyear(year) {
        this.setState({ completiondateyear: year })
        const pm = new PM();
        const myprojects = pm.getProjects.call(this)
        if(myprojects) { 

            const project = pm.getproject.call(this)
            if (project) {

                const project_id = project.project_id

                const i = pm.getProjectKeyByID.call(this,project_id);;                if (year.length === 4) {

                    if(validateYear(year)) {


                        if (this.state.activemilestoneid) {
                            const mymilestone = pm.getmilestonebyid.call(this,  this.state.activemilestoneid);
                            if (mymilestone) {

                                const j = pm.getmilestonekeybyid.call(this,  this.state.activemilestoneid)
                                let day = this.state.completiondateday;
                                let month = this.state.completiondatemonth;
                                const timein = `${year}-${month}-${day}`

                                myprojects[i].milestones[j].completion= timein;
                               this.props.reduxProjects(myprojects)
                                this.setState({ render: 'render' })


                            }

                        }

                    } else {
                        alert(`Invalid Year format ${year}`)
                    }

                  
                }

            }
        }
    }

    handleday(day) {
        day = day.toString();
        this.setState({ completiondateday: day })
        const pm = new PM();
        const myprojects = pm.getProjects.call(this)
        if(myprojects) {

            const project = pm.getproject.call(this)
            if (project) {

            

                const project_id = project.project_id

                

                const i = pm.getProjectKeyByID.call(this,project_id);
                if (day.length === 2) {

            
                        if(validateDate(day)) {

                        if (this.state.activemilestoneid) {
                            const mymilestone = pm.getmilestonebyid.call(this,  this.state.activemilestoneid);
                            if (mymilestone) {


                             
                                const j = pm.getmilestonekeybyid.call(this,this.state.activemilestoneid)
                                console.log(i,j)
                                let year = this.state.completiondateyear;
                                let month = this.state.completiondatemonth;
                                const timein = `${year}-${month}-${day}`
                                myprojects[i].milestones[j].completion = timein;
                                this.props.reduxProjects(myprojects)
                                this.setState({ render: 'render' })


                            }

                        }

                

                } else {
                    alert(`Invalid day format ${day}`)
                }

            }

            }
        }
    }

    handlemonth(month) {
        this.setState({ completiondatemonth: month })
        const pm = new PM();
        const myprojects = pm.getProjects.call(this)
        if(myprojects) {

            const project = pm.getproject.call(this)
            if (project) {

                const project_id = project.project_id

                const i = pm.getProjectKeyByID.call(this,project_id);;
                if (month.length === 2) {

                    if(validateMonth(month)) {

                        if (this.state.activemilestoneid) {
                            const mymilestone = pm.getmilestonebyid.call(this,  this.state.activemilestoneid);
                            if (mymilestone) {

                                const j = pm.getmilestonekeybyid.call(this,  this.state.activemilestoneid)
                                let day = this.state.completiondateday;
                                let year = this.state.completiondateyear;
                                const timein = `${year}-${month}-${day}`
                                myprojects[i].milestones[j].completion = timein;
                               this.props.reduxProjects(myprojects)
                                this.setState({ render: 'render' })


                            }

                        }

                } else {
                    alert(`Invalid month format ${month}`)
                }

                }

            }
        }
    }





    showcompletiondate() {
        const styles = MyStylesheet();
        const pm = new PM();
        const headerFont = pm.getHeaderFont.call(this)
        const regularFont = pm.getRegularFont.call(this)
        const completiondate = new CompletionDate();
        const calender = new MaterialCalender();
        return (
            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1, ...styles.calenderContainer }}>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>Completion Date (MM-DD-YYYY) </span>
                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }} value={this.state.completiondatemonth}
                                onChange={event => { completiondate.handlemonth.call(this, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                                value={this.state.completiondateday}
                                onChange={event => { completiondate.handleday.call(this, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                                value={this.state.completiondateyear}
                                onChange={event => { completiondate.handleyear.call(this, event.target.value) }} />
                        </div>
                        
                       
                    </div>
                    {calender.showMaterialCalender.call(this)}


                </div>
            </div>)
    }

}

export default CompletionDate;