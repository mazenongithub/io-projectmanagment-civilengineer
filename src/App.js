import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import Join from './components/join';
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
import Privacy from './components/privacy'
import Invoices from './components/invoices';
import Team from './components/team';
//import ViewProfile from './components/viewprofile';
import { connect } from 'react-redux';
import { CheckUserLogin } from './components/actions/api'
import Landing from './components/landing'
import firebase from 'firebase'
import { firebaseconfig } from './components/firebase'
import PM from './components/pm';
import CostEstimate from './components/costestimate';
import LineItem from './components/lineitem';
import Specifications from './components/specifications';
import Specification from './components/specification';
import Charges from './components/charges'
class App extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', activeslideid: 'myprojects' }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }

    componentDidMount() {
        document.title = "projectmanagement.civilengineer.io";
        const configs = firebaseconfig()
        firebase.initializeApp(configs);
        this.checkuserlogin();
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
        const pm = new PM();
        const myuser = pm.getuser.call(this)
        const showlanding = () => {
            if (myuser) {
                return (<Profile />)
            } else {
                return (landing.showlanding.call(this))
            }

        }
        return (
            <div className="appbody-container">
                <BrowserRouter>
                    <div>
                        <Header />

                        <Switch>
                            <Route exact path="/" component={showlanding} />
                            <Route exact path="/providers/privacy_policy" component={Privacy} />
                            <Route exact path="/providers/join" component={Join} />
                            <Route exact path="/providers/register" component={Register} />
                            <Route exact path="/providers/login" component={Login} />
                            <Route exact path="/:providerid/profile" component={Profile} />
                            <Route exact path="/:providerid/myprojects" component={MyProjects} />
                            <Route exact path="/:providerid/myprojects/:projectid" component={Project} />
                            <Route exact path="/:providerid/myprojects/:projectid/charges" component={Charges} />
                            <Route exact path="/:providerid/myprojects/:projectid/team" component={Team} />
                            <Route exact path="/:providerid/myprojects/:projectid/milestones" component={Milestones} />
                            <Route exact path="/:providerid/myprojects/:projectid/proposals" component={Proposals} />
                            <Route exact path="/:providerid/myprojects/:projectid/invoices" component={Invoices} />
                            <Route exact path="/:providerid/myprojects/:projectid/specifications" component={Specifications} />
                            <Route exact path="/:providerid/myprojects/:projectid/specifications/:csiid" component={Specification} />
                            <Route exact path="/:providerid/myprojects/:projectid/costestimate" component={CostEstimate} />
                            <Route exact path="/:providerid/myprojects/:projectid/costestimate/:csiid" component={LineItem} />
                            <Route exact path="/:providerid/myprojects/:projectid/bidschedule" component={BidSchedule} />
                            <Route exact path="/:providerid/myprojects/:projectid/bidschedule/csi/:csiid" component={BidScheduleItem} />
                            <Route exact path="/:providerid/myprojects/:projectid/invoices/:invoiceid" component={ViewInvoice} />
                            <Route exact path="/:providerid/myprojects/:projectid/bid" component={Bid} />
                            <Route exact path="/:providerid/myprojects/:projectid/bid/csi/:csiid" component={BidItem} />
                            <Route exact path="/:providerid/myprojects/:projectid/proposals/:proposalid" component={ViewProposal} />
                            <Route exact path="/:providerid/myprojects/:projectid/proposals/:proposalid/csi/:csiid" component={ProposalBidItem} />
                            <Route exact path="/:providerid/myprojects/:projectid/invoices/:invoiceid/csi/:csiid" component={InvoiceBidItem} />
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
        project: state.project,
        allusers: state.allusers,
        allcompanys: state.allcompanys
    }
}

export default connect(mapStateToProps, actions)(App);
