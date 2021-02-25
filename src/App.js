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
import { CheckUserLogin } from './components/actions/api'
import Landing from './components/landing'
import firebase from 'firebase'
import { firebaseconfig } from './components/firebase'
import CostEstimate from './components/costestimate';
import LineItem from './components/lineitem';
import Specifications from './components/specifications';
import Specification from './components/specification';
import Charges from './components/charges'
import { MyStylesheet } from './components/styles';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', activeslideid: 'myprojects', menu:'closed', client:'', clientid:'', firstname:'', lastname:'', emailaddress:'', phonenumber:'',profileurl:'',profilecheck: false,profile:'', spinner:false, activeprojectid:'' }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }

    componentDidMount() {
        document.title = "projectmanagement.civilengineer.io";
        const configs = firebaseconfig()
        firebase.initializeApp(configs);
        this.checkuserlogin();
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();

    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    async checkuserlogin() {
        //let response = TestUser();
        try {


            let response = await CheckUserLogin();
            console.log(response)
     
            if (response.hasOwnProperty("myuser")) {

                this.props.reduxUser(response.myuser)
            }
        } catch (err) {
            alert(err)
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
            return(register.showRegister.call(this))
        }
        const showLogin = () => {
            return(login.showLogin.call(this))
        }
        const showProfile = () => {
            return (profile.showProfile.call(this))
        }
        const showProjects = () => {
            return(myprojects.showProjects.call(this))
        }
        return (
            <div style={{...styles.generalContainer}}>
                <BrowserRouter>
                    <div>
                        {header.showheader.call(this)}

                        <Switch>
                            <Route exact path="/" render={showlanding} />
                            <Route exact path="/providers/register" render={showRegister} />
                            <Route exact path="/providers/login" render={showLogin} />
                            <Route exact path="/:providerid/profile" render={showProfile} />
                            <Route exact path="/:providerid/projects" render={showProjects} />
                            <Route exact path="/:providerid/projects/:projectid" component={Project} />

                            <Route exact path="/:providerid/projects/:projectid/charges" component={Charges} />
                            <Route exact path="/:providerid/projects/:projectid/team" component={Team} />
                            <Route exact path="/:providerid/projects/:projectid/milestones" component={Milestones} />
                            
                            
                            <Route exact path="/:providerid/projects/:projectid/specifications" component={Specifications} />
                            <Route exact path="/:providerid/projects/:projectid/specifications/:csiid" component={Specification} />
                            <Route exact path="/:providerid/projects/:projectid/costestimate" component={CostEstimate} />
                            <Route exact path="/:providerid/projects/:projectid/costestimate/:csiid" component={LineItem} />

                            <Route exact path="/:providerid/projects/:projectid/bidschedule" component={BidSchedule} />
                            <Route exact path="/:providerid/projects/:projectid/bidschedule/csi/:csiid" component={BidScheduleItem} />                          
                            <Route exact path="/:providerid/projects/:projectid/bid" component={Bid} />
                            <Route exact path="/:providerid/projects/:projectid/bid/csi/:csiid" component={BidItem} />

                            <Route exact path="/:providerid/projects/:projectid/proposals" component={Proposals} />
                            <Route exact path="/:providerid/projects/:projectid/proposals/:url" component={ViewProposal} />
                            <Route exact path="/:providerid/projects/:projectid/proposals/:url/csi/:csiid" component={ProposalBidItem} />
                            <Route exact path="/:providerid/projects/:projectid/invoices" component={Invoices} />
                            <Route exact path="/:providerid/projects/:projectid/invoices/:url" component={ViewInvoice} />
                            <Route exact path="/:providerid/projects/:projectid/invoices/:url/csi/:csiid" component={InvoiceBidItem} />
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
        allusers:state.allusers
    }
}

export default connect(mapStateToProps, actions)(App);
