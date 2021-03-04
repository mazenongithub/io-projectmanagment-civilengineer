import React from 'react'
import { MyStylesheet } from './styles';
import PM from './pm'
import { Link } from 'react-router-dom';

class ProjectID {

    showprojectid() {
        const styles = MyStylesheet();
        const pm = new PM();
        const headerFont = pm.getHeaderFont.call(this)
        const regularFont = pm.getRegularFont.call(this)
        const myuser = pm.getuser.call(this)
        if (myuser) {
            const project = pm.getproject.call(this)
            if (project) {
                return (
                    <div style={{ ...styles.generalContainer }}>

                        <div style={{ ...styles.generalContainer, ...styles.bottomMargin10 }}>
                            <span style={{ ...headerFont, ...styles.generalFont }}>Project Management</span>
                        </div>
                        <div style={{ ...styles.generalContainer, ...styles.bottomMargin10 }}>

                          
                            <Link to={`/${myuser.profile}/projects/${project.title}/milestones`} style={{ ...regularFont, ...styles.generalFont, ...styles.generalLink, ...styles.marginLeft30 }}>Create Milestones</Link>
                            <Link to={`/${myuser.profile}/projects/${project.title}/charges`} style={{ ...regularFont, ...styles.generalFont, ...styles.generalLink, ...styles.marginLeft30 }}>Add Charges</Link>
                        </div>
                        <div style={{ ...styles.generalContainer, ...styles.bottomMargin10 }}>
                            <span style={{ ...headerFont, ...styles.generalFont }}>Engineering</span>
                        </div>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin10 }}>
                            <div style={{ ...styles.flex1 }}>
                                <div style={{ ...styles.generalContainer, ...styles.bottomMargin10, ...styles.alignCenter }}>
                                    <Link to={`/${myuser.profile}/projects/${project.title}/bidschedule`} style={{ ...regularFont, ...styles.generalFont, ...styles.generalLink }}>Project Bid Schedule</Link>
                                </div>
                                <div style={{ ...styles.generalContainer, ...styles.bottomMargin10, ...styles.alignCenter }}>
                                    <Link to={`/${myuser.profile}/projects/${project.title}/specifications`} style={{ ...regularFont, ...styles.generalFont, ...styles.generalLink }}>Specifications</Link>
                                </div>
                            </div>
                            <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                                <div style={{ ...styles.generalContainer, ...styles.bottomMargin10, ...styles.alignCenter }}>
                                    <Link to={`/${myuser.profile}/projects/${project.title}/bid`} style={{ ...regularFont, ...styles.generalFont, ...styles.generalLink }}>Project Bid</Link>
                                </div>
                                <div style={{ ...styles.generalContainer, ...styles.bottomMargin10, ...styles.alignCenter }}>
                                    <Link to={`/${myuser.profile}/projects/${project.title}/estimate`} style={{ ...regularFont, ...styles.generalFont, ...styles.generalLink }}>Engineers Estimate</Link>
                                </div>

                            </div>
                        </div>

                        <div style={{ ...styles.generalContainer, ...styles.bottomMargin10 }}>
                            <span style={{...headerFont, ...styles.generalFont  }}>Construction</span>  <Link to={`/${myuser.profile}/projects/${project.title}/team`} style={{ ...regularFont, ...styles.generalFont, ...styles.generalLink }}> - Add Construction Team</Link>
                        </div>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin10 }}>
                            <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                            <Link to={`/${myuser.profile}/projects/${project.title}/proposals`} style={{ ...regularFont, ...styles.generalFont, ...styles.generalLink }}>Authorize Proposals</Link>

                            </div>
                            <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                            <Link to={`/${myuser.profile}/projects/${project.title}/invoices`} style={{ ...regularFont, ...styles.generalFont, ...styles.generalLink }}>Pay Invoices</Link>
                            </div>
                        </div>



                    </div>
                )

            }

        }
    }

}

export default ProjectID;