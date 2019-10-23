import React, { Component } from 'react';
import { connect } from 'react-redux';
import ShowScheduleMaterials from './showschedulematerials';
import MyProjectScheduleMaterials from './myprojectschedulematerials';
import './myprojects.css';
import * as actions from './actions'
class ProjectScheduleMaterials extends Component {
    componentDidMount() {
        let projectid = this.props.match.params.projectid
        this.props.reduxNavigation({ navigation: "schedulematerials" })
        this.props.ProjectID({ projectid })

    }

    handleschedulematerials() {
        if (this.props.projectsprovider || this.props.projects) {

            let servicetype = this.getservicetype();

            if (servicetype === "manager") {
                return (<ShowScheduleMaterials />)
            }
            else if (servicetype === "provider") {
                return (<MyProjectScheduleMaterials />)
            }
            else {
                return (<span> &nbsp;</span>)
            }

        }
        else {
            return (<span> &nbsp;</span>)
        }
    }

    getservicetype() {
        let servicetype = false;
        if (this.props.projectid.projectid) {
            let projectid = this.props.match.params.projectid;

            if (this.props.projects.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projects.map(myproject => {
                    if (myproject.projectid === projectid) {
                        servicetype = myproject.servicetype;
                    }
                })
            } //maps projects

            if (!servicetype) {
                if (this.props.projectsprovider.hasOwnProperty("length")) {
                    // eslint-disable-next-line
                    this.props.projectsprovider.map(myproject => {
                        if (myproject.projectid === projectid) {
                            servicetype = myproject.servicetype;
                        }
                    })
                } //maps projects
            }

        }
        return servicetype;
    }

    render() {
        return (

            this.handleschedulematerials()

        )
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        projectid: state.projectid,
        projects: state.projects,
        projectsprovider: state.projectsprovider
    }
}

export default connect(mapStateToProps, actions)(ProjectScheduleMaterials)
