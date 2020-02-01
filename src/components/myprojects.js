import React, { Component } from 'react';
import './myprojects.css'
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import PM from './pm';
import { purpleCheck, TouchIcon } from './svg';
import { CreateProject } from './functions';
import { Link } from 'react-router-dom';


class MyProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      render: '', width: 0, height: 0, title: '', scope: '', address: '', city: '', projectstate: '', zipcode: ''
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)


  }
  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);
    this.updateWindowDimensions();

  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  handleprojectid(projectid) {
    const pm = new PM();
    let myuser = pm.getuser.call(this);
    if (myuser) {
      const myproject = pm.getactiveproject.call(this);

      if (myproject) {
        let i = pm.getactiveprojectkey.call(this);
        myuser.projects.myproject[i].projectid = projectid;
        this.props.reduxUser(myuser);
        this.props.reduxProject({ projectid })
        this.setState({ render: 'render' })


      } else {
        let title = this.state.title;
        let scope = this.state.scope;
        let address = this.state.address;
        let city = this.state.city;
        let projectstate = this.state.projectstate;
        let zipcode = this.state.zipcode;
        let newProject = CreateProject(projectid, title, scope, address, city, projectstate, zipcode)
        const projects = pm.getallprojects.call(this);
        console.log(projects, newProject)
        if (projects) {
          myuser.projects.myproject.push(newProject);
        } else {
          let projects = { myproject: [newProject] }
          myuser.projects = projects;
        }
        this.props.reduxUser(myuser);
        this.props.reduxProject({ projectid: newProject.projectid })
        this.setState({ render: 'render' });

      }
    }
  }
  getprojectid() {
    const pm = new PM();

    let projectid = pm.getprojectid.call(this)
    if (!projectid) {
      projectid = "";
    }
    return projectid;

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
              /{myproject.projectid}
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
              View Bid Schedule
          </div>
            <div style={{ ...styles.flex1, ...styles.showBorder, ...regularFont, ...styles.alignCenter }}>
              View Actual Bid
          </div>
          </div>
          <div style={{ ...styles.generalFlex }}>
            <div style={{ ...styles.flex1, ...styles.showBorder, ...regularFont, ...styles.alignCenter }}>
              <Link to={`/${providerid}/myprojects/${myproject.projectid}/proposals`} style={{ ...regularFont, ...styles.generalFont, ...styles.generalLink }}> View Proposals</Link>
            </div>
            <div style={{ ...styles.flex1, ...styles.showBorder, ...regularFont, ...styles.alignCenter }}>
              View Invoices
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
  handleactiveid() {
    let pm = new PM();
    let project = pm.getactiveproject.call(this);
    const styles = MyStylesheet();
    const regularFont = pm.getRegularFont.call(this)
    const touchIcon = pm.gettouchicon.call(this)

    if (project) {
      const activebackground = pm.getactiveprojectbackground.call(this, project.projectid)
      return (<div style={{ ...styles.generalContainer, ...regularFont, ...styles.generalFont, ...activebackground }} onClick={() => { this.props.reduxProject(false) }}>
        <button style={{ ...styles.generalButton, ...touchIcon }}>{TouchIcon()} </button>  Active Project ID is {project.projectid}, Touch to Make Unactive
      </div>)
    } else {
      return;
    }
  }
  render() {
    const pm = new PM();
    const styles = MyStylesheet();
    const regularFont = pm.getRegularFont.call(this)
    const goIcon = pm.getGoIcon.call(this)
    return (
      <div style={{ ...styles.generalFlex }}>
        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>

          <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
            <div style={{ ...styles.flex5, ...styles.generalFont, ...regularFont }}>
              Create A Project ID
              <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin, ...styles.generalField }}
                value={this.getprojectid()}
                onChange={event => { this.handleprojectid(event.target.value) }}
              />
            </div>
            <div style={{ ...styles.flex1 }}>
              <button style={{ ...styles.generalButton, ...goIcon }}>{purpleCheck()}</button>
            </div>
          </div>

          {this.handleactiveid()}

          <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
            <div style={{ ...styles.flex1 }}>
              Scope of Work
              <textarea style={{ ...styles.generalField, ...regularFont, ...styles.generalFont }}></textarea>
            </div>
          </div>

          <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
            <div style={{ ...styles.flex1 }}>
              Address
              <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin, ...styles.generalField }} />
            </div>
            <div style={{ ...styles.flex1 }}>
              City
              <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin, ...styles.generalField }} />
            </div>
          </div>

          <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
            <div style={{ ...styles.flex1 }}>
              State
              <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin, ...styles.generalField }} />
            </div>
            <div style={{ ...styles.flex1 }}>
              Zipcode
              <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin, ...styles.generalField }} />
            </div>
          </div>

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