import React, { Component } from 'react';
import './milestones.css';
import * as actions from './actions';
import { inputUTCStringForMaterialID } from './functions';
import { connect } from 'react-redux';

class ShowProjectMilestones extends Component {
    showmilestones() {
        if (this.props.projectid.projectid) {
            let projectid = this.props.projectid.projectid;
            if (this.props.projectsprovider.hasOwnProperty("length")) {
                //eslint-disable-next-line
                return (this.props.projectsprovider.map(myproject => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("projectmilestones")) {
                            //eslint-disable-next-line
                            return myproject.projectmilestones.mymilestone.map(mymilestone => {
                                return (this.showmilestone(mymilestone))
                            })
                        }
                    } //projectfound
                }))
            }

        } //end if project id should always be true
    }

    showmilestone(mymilestone) {
        let milestone = [];
        milestone.push(<div className="milestoneid-milestone">MilestoneID: {mymilestone.milestoneid} Title: {mymilestone.milestone} <br/>
        From {inputUTCStringForMaterialID(mymilestone.start)} to {inputUTCStringForMaterialID(mymilestone.completion)}</div>)

        return milestone;
    }
    getprojectitle() {
        let myproject = this.getproject();
        let title = "";
        if (myproject) {
            title = `Project ID ${myproject.projectid}/${myproject.title}`
        }
        return title;
    }
    getproject() {
        let project = {};
        if (this.props.projectsprovider) {
            if (this.props.projectsprovider.hasOwnProperty("length")) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projectsprovider.map(myproject => {
                    if (myproject.projectid === projectid) {
                        project = myproject;
                    }
                })
            }
        }
        return project;
    }
    render() {
        return (
            <div className="mymilestone-container">
            <div className="milestone-titlerow">{this.getprojectitle()} <br/> Project Milestones </div>
 {this.showmilestones()}
       </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        projectid: state.projectid,
        projectsprovider: state.projectsprovider,

    }
}
export default connect(mapStateToProps, actions)(ShowProjectMilestones)
