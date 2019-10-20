import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import Home from './components/home';
import Join from './components/join';
import Register from './components/register';
import RegisterClient from './components/registerclient';
import Login from './components/login';
import Profile from './components/profile';
import MyProjects from './components/myprojects';
import Project from './components/project';
import ProjectScheduleLabor from './components/projectschedulelabor';
import ProjectScheduleMaterials from './components/projectschedulematerials';
import ActualLabor from './components/actuallabor';
import ActualMaterials from './components/actualmaterials';
import ProjectMilestone from './components/projectmilestone';
import Proposals from './components/proposals';
import ViewProposal from './components/viewproposal';
import ViewInvoice from './components/viewinvoice'
import * as actions from './components/actions';
import Invoices from './components/invoices';
import ProjectTeam from './components/projectteam';
import ViewProfile from './components/viewprofile';
import { connect } from 'react-redux';
import { CheckUserLogin } from './components/actions/api'
import {MyUserModel} from './components/functions'
class App extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '' }
    }
    componentDidMount() {
        document.title = "projectmanagement.civilengineer.io";
        this.checkuserlogin();

    }

    async checkuserlogin() {
        let response = await CheckUserLogin();
        console.log(response)
        if (response.hasOwnProperty("projectsprovider")) {

            this.props.projectsProvider(response.projectsprovider.myproject)
        }
        if (response.hasOwnProperty("projectsmanaging")) {
            this.props.reduxProjects(response.projectsmanaging.myproject)
        }

        if (response.hasOwnProperty("providerid")) {

            let myusermodel = MyUserModel(response.providerid, response.firstname, response.lastname, response.company, response.occupation, response.jobtitle, response.laborrate, response.address, response.city, response.contactstate, response.zipcode, response.emailaddress, response.phonenumber, response.profileurl, response.stripe)

            this.props.updateUserModel(myusermodel)
        }
        else if (response.hasOwnProperty("message")) {
            this.props.updateUserModel({ message: response.message })
            this.setState({ render: "render" })
        }

    }
    render() {
        return (
            <div className="appbody-container">
            <BrowserRouter>
    <div>
    <Header/>
    <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/:providerid" component={ViewProfile} />
    <Route exact path="/:providerid/profile" component={Profile} />
    <Route exact path="/:providerid/myprojects" component={MyProjects} />
    <Route exact path="/:providerid/myprojects/:projectid" component={Project} />
    <Route exact path="/:providerid/myprojects/:projectid/milestones" component={ProjectMilestone} />
    <Route exact path="/:providerid/myprojects/:projectid/schedulelabor" component={ProjectScheduleLabor} />
    <Route exact path="/:providerid/myprojects/:projectid/actuallabor" component={ActualLabor} />
    <Route exact path="/:providerid/myprojects/:projectid/schedulematerials" component={ProjectScheduleMaterials} />
    <Route exact path="/:providerid/myprojects/:projectid/actualmaterials" component={ActualMaterials} />
    <Route exact path="/:providerid/myprojects/:projectid/proposals" component={Proposals} />
    <Route exact path="/:providerid/myprojects/:projectid/invoices" component={Invoices} />
    <Route exact path="/:providerid/myprojects/:projectid/projectteam" component={ProjectTeam} />
    <Route exact path="/:providerid/myprojects/:projectid/invoices/:invoiceid" component={ViewInvoice} />
    <Route exact path="/:providerid/myprojects/:projectid/proposals/:proposalid" component={ViewProposal} />
    <Route exact path="/:providerid/completeprofile" component={RegisterClient}/>
    <Route exact path="/providers/join" component={Join} />
    <Route exact path="/providers/register" component={Register} />
    <Route exact path="/providers/login" component={Login} />
    <Route exact path="/providers/login/:message" component={Login} />
    </Switch>
    </div>
   
    </BrowserRouter>
 </div>


        );
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel
    }
}

export default connect(mapStateToProps, actions)(App);
