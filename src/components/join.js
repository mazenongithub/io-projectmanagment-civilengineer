import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './join.css';
import { GoogleLogin, SignUpByEmail, GoToLogin } from './svg';
import './svg/svg.css';
import * as actions from './actions';
class Join extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            windowWidth: 0
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    componentDidMount() {
        this.props.reduxNavigation({ navigation: "join" })
        window.addEventListener('resize', this.updateWindowDimensions);
        let windowwidth = window.innerWidth;
        this.setState({ windowwidth })
    }
    updateWindowDimensions() {
        let windowwidth = window.innerWidth;
        this.setState({ windowwidth })
    }
    showextrarow() {
        if (this.state.windowwidth > 720 && this.state.windowwidth < 1080) {

            return (<div className="login-buttonrow">
        &nbsp; </div>)
        }
    }

    render() {
        const googleredirect = `${process.env.REACT_APP_SERVER_API}/projectmanagment/oauth20/google/login`
        //const facebookredirect = `${process.env.REACT_APP_SERVER_API}/oauth20/facebook`
        //const linkedinredirect = `${process.env.REACT_APP_SERVER_API}/oauth20/linkedin`

        //const linkedinscope = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.REACT_APP_LINKEDIN_CLIENTID}&redirect_uri=${encodeURIComponent(linkedinredirect)}&state=linkedin&scope=${encodeURIComponent("r_basicprofile")}`
        const googlescope = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${googleredirect}&prompt=consent&response_type=code&client_id=${process.env.REACT_APP_GOOGLEID}&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fplus.login+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fplus.login+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fplus.me+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fplus.login+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fplus.me+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fplus.me+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&access_type=offline`
        //const facebookscope = `https://www.facebook.com/dialog/oauth?client_id=${process.env.REACT_APP_FACEBOOK_APPID}&redirect_uri=${encodeURIComponent(facebookredirect)}`;
        return (<div className="join-container">
      <div className="join-titlerow">
      Registration
      </div>
      <div className="join-spanall">
      <p> Registering is important to become a service provider in your area. Once you are registered to become a member of our working network of service providers. 
      Once you are a member you will appear in searches and our making yourself eligible to provide services on projects. </p>
      <p>Registering is easy when you use of the following web services. You will be required to consent to your email address. 
      Once registered you can complete your profile. </p>
      </div>
      <div className="loginbuttonrow">
       &nbsp;
      </div>
      <div className="loginbuttonrow">
       <a href={googlescope}>
        <button className="btnregister">
       {GoogleLogin()}
        </button>
        </a>
      </div>
     <div className="loginbuttonrow">
     &nbsp;
      </div>
      {this.showextrarow()}
     <div className="register-label">or Register By Email:</div>
     <div className="register-buttoncontainer">
     <Link to="/providers/register" className="dontunderlinelink"><div className="registerbutton">
    {SignUpByEmail()} </div></Link> 
     </div>
     <div className="register-label">Already Registered?  </div>
     <div className="register-buttoncontainer"><Link to="/providers/login" className="dontunderlinelink">
     <div className="registerbutton">
     {GoToLogin()}
  </div></Link></div>
      </div>)
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        emailaddress: state.emailaddress,
        password: state.password,
        firstname: state.firstname,
        lastname: state.lastname,
        occupation: state.occupation,
        jobtitle: state.jobtitle,
        company: state.company,
        address: state.address,
        city: state.city,
        sta: state.sta,
        phone: state.phone

    }
}
export default connect(mapStateToProps, actions)(Join)
