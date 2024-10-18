import React from 'react'
import { MyStylesheet } from './styles';
import PM from './pm'
import { a } from 'react-router-dom';

class ProjectID {


    handleComponents(activecomponent) {

        this.props.reduxNavigation({activecomponent})
        this.setState({render:'render'})

    }

    showprojectid() {
        const styles = MyStylesheet();
        const pm = new PM();
        const headerFont = pm.getHeaderFont.call(this)
        const regularFont = pm.getRegularFont.call(this)
        const myuser = pm.getuser.call(this)
        const projectid = new ProjectID();
        if (myuser) {
            const project = this.getProject();
            if (project) {
                return (
                    <div style={{ ...styles.generalContainer }}>

                        <div style={{ ...styles.generalContainer, ...styles.bottomMargin10 }}>
                            <span style={{ ...headerFont, ...styles.generalFont }}>Project Management</span>
                        </div>
                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin10 }}>

                            <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                                <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                                    <a style={{ ...regularFont, ...styles.generalFont, ...styles.generalLink }} onClick={() => { projectid.handleComponents.call(this,"milestones")  }}>Create Milestones</a>
                                </div>
                               

                            </div>

                            <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                                <div style={{ ...styles.generalContainer, ...styles.bottomMargin15}}>
                                    <a style={{ ...regularFont, ...styles.generalFont, ...styles.generalLink }}>Add Charges</a>
                                </div>
                         

                            </div>
                        </div>
                        <div style={{ ...styles.generalContainer, ...styles.bottomMargin10 }}>
                            <span style={{ ...headerFont, ...styles.generalFont }}>Engineering</span>
                        </div>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin10 }}>
                            <div style={{ ...styles.flex1 }}>
                              
                                <div style={{ ...styles.generalContainer, ...styles.bottomMargin10, ...styles.alignCenter }}>
                                    <a style={{ ...regularFont, ...styles.generalFont, ...styles.generalLink }}>Specifications</a>
                                </div>
                                <div style={{ ...styles.generalContainer, ...styles.bottomMargin10, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                                    <a style={{ ...regularFont, ...styles.generalFont, ...styles.generalLink }}>Bid Schedule</a>
                                </div>
                            </div>
                            <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                               
                                <div style={{ ...styles.generalContainer, ...styles.bottomMargin10, ...styles.alignCenter }}>
                                    <a style={{ ...regularFont, ...styles.generalFont, ...styles.generalLink }}>Engineers Estimate</a>
                                </div>
                                <div style={{ ...styles.generalContainer, ...styles.bottomMargin10, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                                    <a style={{ ...regularFont, ...styles.generalFont, ...styles.generalLink }}>Bid</a>
                                </div> 

                            </div>
                        </div>

                        <div style={{ ...styles.generalContainer, ...styles.bottomMargin10 }}>
                            <span style={{ ...headerFont, ...styles.generalFont }}>Construction</span>  <a style={{ ...regularFont, ...styles.generalFont, ...styles.generalLink }} onClick={() => { this.setState({ activecomponent: 'team' }) }}> - Add Construction Team</a>
                        </div>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin10 }}>
                            <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                                <a style={{ ...regularFont, ...styles.generalFont, ...styles.generalLink }} onClick={()=>{ projectid.handleComponents.call(this,"proposals")}}>View Proposals</a>

                            </div>
                            <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                                <a style={{ ...regularFont, ...styles.generalFont, ...styles.generalLink }} onClick={()=>{ projectid.handleComponents.call(this,"invoices")}}>View Invoices</a>
                            </div>
                        </div>



                    </div>
                )

            }

        }
    }

}

export default ProjectID;