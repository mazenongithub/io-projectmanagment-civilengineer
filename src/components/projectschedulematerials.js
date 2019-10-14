import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadmyprojects } from './actions/api';
import ShowScheduleMaterials from './showschedulematerials';
import MyProjectScheduleMaterials from './myprojectschedulematerials';
import { MyUserModel } from './functions';
import './myprojects.css';
import * as actions from './actions'
class ProjectScheduleMaterials extends Component {
    componentDidMount() {
        let projectid = this.props.match.params.projectid
        this.props.reduxNavigation({ navigation: "schedulematerials" })
        this.props.ProjectID({ projectid })
        if (!this.props.projects.hasOwnProperty("length") && !this.props.projectsprovider.hasOwnProperty("length")) {
            let providerid = this.props.match.params.providerid;
            this.getmyprojects(providerid);
        }


    }
    async getmyprojects(providerid) {
        let response = await loadmyprojects(providerid);
        console.log(response)



        if (response.hasOwnProperty("projectsprovider")) {
            // eslint-disable-next-line
            this.props.projectsProvider(response.projectsprovider.myproject)
        }
        if (response.hasOwnProperty("projectsmanaging")) {
            this.props.reduxProjects(response.projectsmanaging.myproject)
        }

        if (response.hasOwnProperty("providerid")) {
              let myusermodel = MyUserModel(response.providerid, response.firstname, response.lastname, response.company, response.occupation, response.jobtitle, response.laborrate, response.address, response.city, response.contactstate, response.zipcode, response.emailaddress, response.phonenumber, response.profileurl, response.stripe)
      
            this.props.updateUserModel(myusermodel)

        }
        this.setState({ render: 'render' })
    }

    handleschedulematerials() {
        if (this.props.projectsprovider || this.props.projects) {

            let servicetype = this.getservicetype();

            if (servicetype === "manager") {
                return (<ShowScheduleMaterials/>)
            }
            else if (servicetype === "provider") {
                return (<MyProjectScheduleMaterials/>)
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
