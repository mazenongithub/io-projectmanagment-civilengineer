import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import PM from './pm';
import { purpleCheck, TouchIcon } from './svg';
//import { CreateProject } from './functions';
import { Link } from 'react-router-dom';
import { CheckProjectID, InsertMyProject } from './actions/api'
import { returnCompanyList, inputUTCStringForLaborID } from './functions'

class MyProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '', render: '', projectid: '', width: 0, height: 0, title: '', scope: '', address: '', city: '', projectstate: '', zipcode: '', projectidcheck: false
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)


  }
  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);
    this.updateWindowDimensions();
    this.props.reduxNavigation({ navigation: "myprojects" })

  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  async insertnewproject() {
    const pm = new PM();
    const myuser = pm.getuser.call(this);
    if (myuser) {

      let providerid = myuser.providerid;
      let projectid = this.state.projectid;
      let title = this.state.title;
      let scope = this.state.scope;
      let address = this.state.address;
      let city = this.state.city
      let projectstate = this.state.projectstate;
      let zipcode = this.state.zipcode;
      let values = { providerid, projectid, title, scope, address, city, projectstate, zipcode }
      let response = await InsertMyProject(values);
      console.log(response)
      if (response.hasOwnProperty("allusers")) {
        let companys = returnCompanyList(response.allusers);
        this.props.reduxAllCompanys(companys)
        this.props.reduxAllUsers(response.allusers);
        delete response.allusers;

      }
      if (response.hasOwnProperty("providerid")) {
        console.log(response)
        this.props.reduxUser(response)
      }
      let message = "";
      if (response.hasOwnProperty("message")) {
        let lastupdated = inputUTCStringForLaborID(response.lastupdated)
        message = `${response.message} last updated ${lastupdated}`
      }
      this.props.reduxProject({ projectid })
      this.setState({ projectid: '', projectidcheck: false, message })
    }

  }
  showactiveprojectid(projectid) {
    const pm = new PM();
    const styles = MyStylesheet();
    const regularFont = pm.getRegularFont.call(this)
    let activeprojectid = pm.getactiveprojectid.call(this);
    const touchIcon = pm.gettouchicon.call(this)
    let activebackground = pm.getactiveprojectbackground.call(this, projectid)
    if (activeprojectid === projectid) {
      return (<div style={{ ...styles.generalContainer, ...regularFont, ...styles.generalFont, ...activebackground }} onClick={() => { this.props.reduxProject(false) }}>
        <button style={{ ...styles.generalButton, ...touchIcon }}>{TouchIcon()} </button>Active Project ID is {projectid}, Touch to Make unactive
  </div>)
    } else {
      return (<div style={{ ...styles.generalContainer, ...regularFont, ...styles.generalFont, ...activebackground }} onClick={() => { this.props.reduxProject({ projectid }) }}>
        <button style={{ ...styles.generalButton, ...touchIcon }}>{TouchIcon()} </button>   Touch to Make Active
</div>)
    }
  }
  showprojectid(myproject) {
    const styles = MyStylesheet();
    const pm = new PM();
    const headerFont = pm.getHeaderFont.call(this)
    const regularFont = pm.getRegularFont.call(this)
    const myuser = pm.getuser.call(this);
    if (myuser) {
      let providerid = myuser.providerid;
      return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
        <div style={{ ...styles.flex1 }}>

          {this.showactiveprojectid(myproject.projectid)}

          <div style={{ ...styles.generalFlex }}>
            <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter, ...headerFont }}>
              <Link to={`/${providerid}/myprojects/${myproject.projectid}`} style={{ ...headerFont, ...styles.generalFont, ...styles.generalLink }}> /{myproject.projectid}</Link>
            </div>
          </div>

          <div style={{ ...styles.generalFlex }}>
            <div style={{ ...styles.flex1, ...styles.showBorder, ...regularFont, ...styles.alignCenter }}>
              <Link to={`/${providerid}/myprojects/${myproject.projectid}/team`} style={{ ...regularFont, ...styles.generalFont, ...styles.generalLink }}>Project Team</Link>
            </div>
            <div style={{ ...styles.flex1, ...styles.showBorder, ...regularFont, ...styles.alignCenter }}>
              <Link to={`/${providerid}/myprojects/${myproject.projectid}/milestones`} style={{ ...regularFont, ...styles.generalFont, ...styles.generalLink }}> Create Milestones</Link>
            </div>
          </div>
          <div style={{ ...styles.generalFlex }}>
            <div style={{ ...styles.flex1, ...styles.showBorder, ...regularFont, ...styles.alignCenter }}>
              <Link to={`/${providerid}/myprojects/${myproject.projectid}/bidschedule`} style={{ ...regularFont, ...styles.generalFont, ...styles.generalLink }}> View Bid Schedule </Link>
            </div>
            <div style={{ ...styles.flex1, ...styles.showBorder, ...regularFont, ...styles.alignCenter }}>
              <Link to={`/${providerid}/myprojects/${myproject.projectid}/bid`} style={{ ...regularFont, ...styles.generalFont, ...styles.generalLink }}> View Bid </Link>
            </div>
          </div>
          <div style={{ ...styles.generalFlex }}>
            <div style={{ ...styles.flex1, ...styles.showBorder, ...regularFont, ...styles.alignCenter }}>
              <Link to={`/${providerid}/myprojects/${myproject.projectid}/proposals`} style={{ ...regularFont, ...styles.generalFont, ...styles.generalLink }}> View Proposals</Link>
            </div>
            <div style={{ ...styles.flex1, ...styles.showBorder, ...regularFont, ...styles.alignCenter }}>
              <Link to={`/${providerid}/myprojects/${myproject.projectid}/invoices`} style={{ ...regularFont, ...styles.generalFont, ...styles.generalLink }}> View Invoices </Link>
            </div>
          </div>

        </div>
      </div>)

    }
  }

  showprojectids() {
    const pm = new PM()
    let myprojects = pm.getprojects.call(this)
    let projects = [];
    // eslint-disable-next-line
    myprojects.map(myproject => {
      projects.push(this.showprojectid(myproject))
    })
    return (projects)
  }

  handlescope(scope) {
    const pm = new PM();
    const myuser = pm.getuser.call(this);
    if (myuser) {
      const myproject = pm.getactiveproject.call(this);
      if (myproject) {
        let i = pm.getactiveprojectkey.call(this);
        myuser.projects.myproject[i].scope = scope;
        this.props.reduxUser(myuser)
        this.setState({ render: 'render' })

      }

    }

  }
  getscope() {
    let pm = new PM();
    let myproject = pm.getactiveproject.call(this);
    if (myproject) {
      return (myproject.scope)
    } else {
      return this.state.scope;
    }
  }
  handleaddress(address) {
    const pm = new PM();
    const myuser = pm.getuser.call(this);
    if (myuser) {
      const myproject = pm.getactiveproject.call(this);
      if (myproject) {
        let i = pm.getactiveprojectkey.call(this);
        myuser.projects.myproject[i].address = address;
        this.props.reduxUser(myuser)
        this.setState({ render: 'render' })

      }

    }

  }
  getaddress() {
    let pm = new PM();
    let myproject = pm.getactiveproject.call(this);
    if (myproject) {
      return (myproject.address)
    } else {
      return this.state.address;
    }
  }

  handlecity(city) {
    const pm = new PM();
    const myuser = pm.getuser.call(this);
    if (myuser) {
      const myproject = pm.getactiveproject.call(this);
      if (myproject) {
        let i = pm.getactiveprojectkey.call(this);
        myuser.projects.myproject[i].city = city;
        this.props.reduxUser(myuser)
        this.setState({ render: 'render' })

      }

    }

  }
  getcity() {
    let pm = new PM();
    let myproject = pm.getactiveproject.call(this);
    if (myproject) {
      return (myproject.city)
    } else {
      return this.state.city;
    }
  }
  handleprojectstate(projectstate) {
    const pm = new PM();
    const myuser = pm.getuser.call(this);
    if (myuser) {
      const myproject = pm.getactiveproject.call(this);
      if (myproject) {
        let i = pm.getactiveprojectkey.call(this);
        myuser.projects.myproject[i].projectstate = projectstate;
        this.props.reduxUser(myuser)
        this.setState({ render: 'render' })

      }

    }

  }
  getprojectstate() {
    let pm = new PM();
    let myproject = pm.getactiveproject.call(this);
    if (myproject) {
      return (myproject.projectstate)
    } else {
      return this.state.projectstate;
    }
  }
  handlezipcode(zipcode) {
    const pm = new PM();
    const myuser = pm.getuser.call(this);
    if (myuser) {
      const myproject = pm.getactiveproject.call(this);
      if (myproject) {
        let i = pm.getactiveprojectkey.call(this);
        myuser.projects.myproject[i].zipcode = zipcode;
        this.props.reduxUser(myuser)
        this.setState({ render: 'render' })

      }

    }

  }
  getzipcode() {
    let pm = new PM();
    let myproject = pm.getactiveproject.call(this);
    if (myproject) {
      return (myproject.zipcode)
    } else {
      return this.state.zipcode;
    }
  }
  showprojectform() {
    const pm = new PM();
    const myproject = pm.getactiveproject.call(this);
    const styles = MyStylesheet();
    const regularFont = pm.getRegularFont.call(this)
    if (myproject) {
      return (<div style={{ ...styles.generalFlex }}>
        <div style={{ ...styles.flex1 }}>
          <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
            <div style={{ ...styles.flex1 }}>
              Scope of Work
              <textarea style={{ ...styles.generalField, ...regularFont, ...styles.generalFont }}
                value={this.getscope()}
                onChange={event => { this.handlescope(event.target.value) }}></textarea>
            </div>
          </div>

          <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
            <div style={{ ...styles.flex1 }}>
              Address
              <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin, ...styles.generalField }}
                value={this.getaddress()}
                onChange={event => { this.handleaddress(event.target.value) }}
              />
            </div>
            <div style={{ ...styles.flex1 }}>
              City
              <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin, ...styles.generalField }}
                value={this.getcity()}
                onChange={event => { this.handlecity(event.target.value) }}
              />
            </div>
          </div>

          <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
            <div style={{ ...styles.flex1 }}>
              State
              <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin, ...styles.generalField }}
                value={this.getprojectstate()}
                onChange={event => { this.handleprojectstate(event.target.value) }}
              />
            </div>
            <div style={{ ...styles.flex1 }}>
              Zipcode
              <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin, ...styles.generalField }}
                value={this.getzipcode()}
                onChange={event => { this.handlezipcode(event.target.value) }}
              />
            </div>
          </div>
        </div>
      </div>)
    } else {
      return;
    }
  }
  async checkprojectid(projectid) {


    let response = await CheckProjectID(projectid);
    if (response.hasOwnProperty("valid")) {
      this.setState({ projectidcheck: true })

    } else if (response.hasOwnProperty("invalid")) {
      this.setState({ projectidcheck: false })

    }


  }

  handleregisternow() {
    const pm = new PM();
    const styles = MyStylesheet();
    const goIcon = pm.getGoIcon.call(this)
    if (this.state.projectidcheck) {
      return (<button style={{ ...styles.generalButton, ...goIcon }} onClick={() => { this.insertnewproject() }}>{purpleCheck()}</button>)
    } else {
      return;
    }
  }
  handleshowprojectid() {
    const pm = new PM();
    const myproject = pm.getactiveproject.call(this);
    const styles = MyStylesheet();
    const regularFont = pm.getRegularFont.call(this);
    const activebackground = pm.getactiveprojectbackground.call(this, myproject.projectid)
    const touchIcon = pm.gettouchicon.call(this)
    if (myproject) {

      return (<div style={{ ...styles.generalContainer, ...regularFont, ...styles.generalFont, ...activebackground }} onClick={() => { this.props.reduxProject(false) }}>
        <button style={{ ...styles.generalButton, ...touchIcon }}>{TouchIcon()} </button>  Active Project ID is {myproject.projectid}, Touch to Make Unactive
      </div>)

    } else {
      return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
        <div style={{ ...styles.flex5, ...styles.generalFont, ...regularFont }}>
          Create A Project ID
          <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin, ...styles.generalField }}
            value={this.state.projectid}
            onChange={event => { this.setState({ projectid: event.target.value }) }}
            onBlur={event => { this.checkprojectid(event.target.value) }}
          />
        </div>
        <div style={{ ...styles.flex1 }}>
          {this.handleregisternow()}
        </div>
      </div>)
    }
  }
  render() {
    const pm = new PM();
    const styles = MyStylesheet();
    const regularFont = pm.getRegularFont.call(this)

    return (
      <div style={{ ...styles.generalFlex }}>
        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>

          {this.handleshowprojectid()}



          {this.showprojectform()}

          {pm.showsaveproject.call(this)}

          {this.showprojectids()}



        </div>
      </div>)
  }
}

function mapStateToProps(state) {
  return {
    myusermodel: state.myusermodel,
    navigation: state.navigation,
    project: state.project,
    allusers: state.allusers,
  }
}

export default connect(mapStateToProps, actions)(MyProjects)