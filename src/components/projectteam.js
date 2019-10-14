import React, { Component } from 'react';
import './myprojects.css';
import * as actions from './actions';
import { loadmyprojects, LoadMyProviders } from './actions/api'
import { connect } from 'react-redux';
import MyProjectTeam from './myprojectteam';
import ShowProjectTeam from './showprojectteam';
import { MyUserModel } from './functions';
class ProjectTeam extends Component {
    componentDidMount() {
        let projectid = this.props.match.params.projectid
        this.props.reduxNavigation({ navigation: "projectteam" })
        this.props.ProjectID({ projectid })
        if (!this.props.projects.hasOwnProperty("length") && !this.props.projectsprovider.hasOwnProperty("length")) {
            let providerid = this.props.match.params.providerid;
            this.getmyprojects(providerid);
        }
        if (!this.props.searchproviders.hasOwnProperty("searchproviders")) {
            this.loadmysearchproviders()
        }


    }
    async loadmysearchproviders() {
        let response = await LoadMyProviders();
        console.log(response)
        let myprovider = response.searchproviders.myprovider
        this.props.searchProviders({ searchproviders: myprovider })
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


    showprojectteam() {

        if (this.props.projects || this.props.projectsprovider) {
            if (this.props.projects.hasOwnProperty("length") || this.props.projectsprovider.hasOwnProperty("length")) {


                let servicetype = this.getservicetype();
                if (servicetype === "manager") {
                    return (<MyProjectTeam/>)
                }
                else if (servicetype === "provider") {
                    return (<ShowProjectTeam/>)
                }
                else {
                    return (<span> &nbsp;</span>)
                }




            }
            else {

                return (<span>&nbsp; </span>)

            }
        }
        else {
            return (<span>&nbsp; </span>)
        }

    }
    getservicetype() {

        let servicetype = ""
        let projectid = this.props.match.params.projectid;


        if (this.props.projects.length > 0) {
            //eslint-disable-next-line
            this.props.projects.map(myproject => {
                if (myproject.projectid === projectid) {
                    servicetype = myproject.servicetype;
                }
            })
        }

        if (!servicetype) {

            if (this.props.projectsprovider.length > 0) {
                //eslint-disable-next-line
                this.props.projectsprovider.map(myproject => {
                    if (myproject.projectid === projectid) {
                        servicetype = myproject.servicetype;
                    }
                })
            }

        }
        return servicetype;

    }
    render() {
        return (this.showprojectteam())
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        projectid: state.projectid,
        projects: state.projects,
        projectsprovider: state.projectsprovider,
        searchproviders: state.searchproviders
    }
}
export default connect(mapStateToProps, actions)(ProjectTeam)
