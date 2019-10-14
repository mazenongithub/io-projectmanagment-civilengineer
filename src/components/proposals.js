import React, { Component } from 'react';
import ShowProposals from './showproposals';
import MyProposals from './myproposals';
import * as actions from './actions';
import { loadmyprojects } from './actions/api';
import { connect } from 'react-redux';
import { MyUserModel } from './functions';

class Proposals extends Component {

    constructor(props) {
        super(props)
        this.state = { render: '' }
    }
    componentDidMount() {
        let projectid = this.props.match.params.projectid;
        this.props.ProjectID({ projectid });
        this.props.reduxNavigation({ navigation: "proposals", projectid })
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
    handleproposal() {
        let servicetype = this.getservicetype();

        if (servicetype === "manager") {
            return (<ShowProposals/>);
        }
        else if (servicetype === "provider") {
            return (<MyProposals/>);

        }
        else {
            return (<div>&nbsp;</div>)
        }

    }
    getservicetype() {

        let projectid = this.props.match.params.projectid;
        let servicetype = "";
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

        return servicetype;
    }


    updateState() {
        this.setState({ render: 'render' })
    }
    render() {
        return (<div>
        {this.handleproposal()}
        </div>)
    }

}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        projectid: state.projectid,
        projects: state.projects,
        projectsprovider: state.projectsprovider,
        proposalid: state.proposalid
    }
}
export default connect(mapStateToProps, actions)(Proposals)
