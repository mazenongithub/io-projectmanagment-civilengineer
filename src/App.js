import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import Register from './components/register';
import Login from './components/login';
import Profile from './components/profile';
import MyProjects from './components/myprojects';
import Project from './components/project';
import Milestones from './components/milestones';
import Proposals from './components/proposals';
import ViewProposal from './components/viewproposal';
import BidSchedule from './components/bidschedule';
import BidScheduleItem from './components/bidscheduleitem';
import Bid from './components/bid';
import BidItem from './components/biditem';
import ProposalBidItem from './components/proposalbiditem';
import InvoiceBidItem from './components/invoicebiditem';
import ViewInvoice from './components/viewinvoice'
import * as actions from './components/actions';
import Invoices from './components/invoices';
import Team from './components/team';
//import ViewProfile from './components/viewprofile';
import { connect } from 'react-redux';
import { CheckUserLogin, LoadMyProjects } from './components/actions/api'
import Landing from './components/landing'
import firebase from 'firebase'
import { firebaseconfig } from './components/firebase'
import CostEstimate from './components/costestimate';
import LineItem from './components/lineitem';
import Specifications from './components/specifications';
import Specification from './components/specification';
import Charges from './components/charges'
import { MyStylesheet } from './components/styles';
import PM from './components/pm'
class App extends Component {
    constructor(props) {
        super(props);
        this.state = { message: '', render: '', activeslideid: 'myprojects', menu: 'closed', client: '', clientid: '', firstname: '', lastname: '', emailaddress: '', phonenumber: '', profileurl: '', profilecheck: false, profile: '', spinner: false, activeprojectid: '', initialized: false }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }

    componentDidMount() {
        document.title = "projectmanagement.civilengineer.io";
        const configs = firebaseconfig()
        firebase.initializeApp(configs);
        this.checkuserlogin();
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();
        const pm = new PM();
        pm.loadcsis.call(this)
        console.log(`Server API Rebuild`, process.env.REACT_APP_SERVER_API)

    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    handleResponse(response) {

        if (response.hasOwnProperty("myuser")) {


            this.props.reduxUser(response.myuser)

            if (response.hasOwnProperty("myprojects")) {

                this.props.reduxMyProjects(response.myprojects)

            }

            if (response.hasOwnProperty("allusers")) {
                this.props.reduxAllUsers(response.allusers)
            }

            if (response.hasOwnProperty("allcompanys")) {


                this.props.reduxAllCompanys(response.allcompanys)

            }


            this.setState({ render: 'render', initialized: true })



        }
    }

    async checkuserlogin() {
        const pm = new PM();

       


            //let response = TestUser();
            try {

                let response = await CheckUserLogin();
                console.log(response)
                pm.handleLoginResponse.call(this,response)
            } catch (err) {

                alert(`Error: Could not checkuser, retrying ${err}`)



            }

   

    }
    render() {
        const landing = new Landing();
        const header = new Header();
        const register = new Register();
        const login = new Login();
        const profile = new Profile();
        const styles = MyStylesheet();
        const myprojects = new MyProjects();
        const showlanding = () => {

            return (landing.showlanding.call(this))

        }
        const showRegister = () => {
            return (register.showRegister.call(this))
        }
        const showLogin = () => {
            return (login.showLogin.call(this))
        }
        const showProfile = () => {
            return (profile.showProfile.call(this))
        }
        const showProjects = () => {
            return (myprojects.showProjects.call(this))
        }
        return (
            <div style={{ ...styles.generalContainer }}>
                <BrowserRouter>
                    <div>
                        {header.showheader.call(this)}

                        <Switch>
                            <Route exact path="/" render={showlanding} />
                            <Route exact path="/providers/register" render={showRegister} />
                            <Route exact path="/providers/login" render={showLogin} />
                            <Route exact path="/:userid/profile" render={showProfile} />
                            <Route exact path="/:userid/projects" render={showProjects} />
                            <Route exact path="/:userid/projects/:projectid" component={Project} />

                            <Route exact path="/:userid/projects/:projectid/charges" component={Charges} />
                            <Route exact path="/:userid/projects/:projectid/team" component={Team} />
                            <Route exact path="/:userid/projects/:projectid/milestones" component={Milestones} />


                            <Route exact path="/:userid/projects/:projectid/specifications" component={Specifications} />
                            <Route exact path="/:userid/projects/:projectid/specifications/:csiid" component={Specification} />
                            <Route exact path="/:userid/projects/:projectid/costestimate" component={CostEstimate} />
                            <Route exact path="/:userid/projects/:projectid/costestimate/:csiid" component={LineItem} />

                            <Route exact path="/:userid/projects/:projectid/bidschedule" component={BidSchedule} />
                            <Route exact path="/:userid/projects/:projectid/bidschedule/csi/:csiid" component={BidScheduleItem} />
                            <Route exact path="/:userid/projects/:projectid/bid" component={Bid} />
                            <Route exact path="/:userid/projects/:projectid/bid/csi/:csiid" component={BidItem} />

                            <Route exact path="/:userid/projects/:projectid/proposals" component={Proposals} />
                            <Route exact path="/:userid/projects/:projectid/proposals/:url" component={ViewProposal} />
                            <Route exact path="/:userid/projects/:projectid/proposals/:url/csi/:csiid" component={ProposalBidItem} />
                            <Route exact path="/:userid/projects/:projectid/invoices" component={Invoices} />
                            <Route exact path="/:userid/projects/:projectid/invoices/:url" component={ViewInvoice} />
                            <Route exact path="/:userid/projects/:projectid/invoices/:url/csi/:csiid" component={InvoiceBidItem} />
                        </Switch>
                    </div>

                </BrowserRouter>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation,
        csis: state.csis,
        allusers: state.allusers,
        myprojects: state.myprojects,
        projects: state.projects,
        allusers: state.allusers,
        allcompanys: state.allcompanys
    }
}

export default connect(mapStateToProps, actions)(App);
