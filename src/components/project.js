import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import PM from './pm';
import { TouchIcon, updateProjects } from './svg';
import { a } from 'react-router-dom';
import ProjectID from './projectid'
import Milestones from './milestones';
import Team from './team'
import { LoadAllCompanys } from './actions/api';
import Proposals from './proposals';
import Invoices from './invoices';


class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      render: '', message: '', projectid: '', width: 0, height: 0, title: '', scope: '', address: '', city: '', projectstate: '', zipcode: '', projectidcheck: false, spinner: false, activecomponent: 'default'
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)


  }
  componentDidMount() {

    window.addEventListener('resize', this.updateWindowDimensions);

    this.updateWindowDimensions();
    const pm = new PM();
    const projectid = this.props.match.params.projectid;
    const userid = this.props.match.params.userid;

    let server_api = process.env.REACT_APP_SERVER_API

    const stripHttp = (server_api) => {

        return server_api.replace(/^https?:\/\//, '')

    }

    server_api = stripHttp(server_api)


    const socket = new WebSocket(`ws://${server_api}/projects/${projectid}/websocketapi`)

    socket.onopen = (evt) => {

      const data = { type: "join", userid, application: "pm" };
      socket.send(JSON.stringify(data));
      console.log("Project Web Socket Open", data)

    }

    socket.onmessage = (evt) => {
      const response = JSON.parse(evt.data);
      console.log(response)

      if (response.type === "join" && response.application === "pm") {
  


        if (response.hasOwnProperty("myproject")) {

          let getproject = response.myproject;
          let project_id = getproject.project_id;
          let projects = pm.getProjects.call(this)



          const findproject = pm.getProjectByID.call(this, getproject.project_id)

          if (findproject) {

            let i = pm.getProjectKeyByID.call(this, project_id)

            projects[i] = getproject
            // projects[i].team = getproject.team;
            // projects[i].construction = getproject.construction;
            // appending project on client

          } else {

            if (!projects) {
              projects = [getproject];
            } else {
              projects.push(getproject)
            } // else condition company projects exists

          } // else condition creating new project

          this.props.reduxProjects(projects)
          this.setState({ render: 'render' })

        } // if myproject

      } else if (response.type === "pm") {

        if(response.hasOwnProperty("myproject")) {

          let projects = pm.getProjects.call(this)

          let project_id = response.myproject.project_id;

          let getproject = pm.getProjectByID.call(this,project_id)
          if(getproject) {
            let i = pm.getProjectKeyByID.call(this,project_id)
            projects[i] = response.myproject;
            this.props.reduxProjects(projects)
          }



        }


        if(response.hasOwnProperty("project")) {
          let project_id = response.project.Project_ID;
          let myprojects = pm.getMyProjects.call(this)
          let getproject = pm.getMyProjectByID.call(this,project_id)
          if(getproject) {
            let i = pm.getMyProjectKeyByID.call(this,project_id)

            myprojects[i] = response.project;
            this.props.reduxMyProjects(myprojects)
          }
        }

        this.setState({render:'render'})



      } else if (response.type === "construction") {
  

        let projects = pm.getProjects.call(this)



          let findproject = pm.getProjectByID.call(this,response.myproject.project_id)
          if(findproject) {
      
            let i = pm.getProjectKeyByID.call(this, response.myproject.project_id)
            let construction = pm.getConstructionbyID.call(this,response.company_id, response.myproject.project_id)

            if(construction) {
          
            
              let j = pm.getConstructionKeybyID.call(this, response.company_id, response.myproject.project_id)
        
              projects[i].construction[j] = response.myproject;
              this.props.reduxProjects(projects)
              this.setState({render:'render'})

            }
      
        
        
         }
      



      } else {
        console.log(response.type)
      } // end response type pm

    } // end of socket message

    socket.onerror = (evt) => {
      console.log("SOMETHING WENT WRONG!");
      console.log(evt);
    };

    socket.onclose = (evt) => {
      console.log("WEB SOCKET HAS BEEN CLOSED!!!!");
    };

    let websockets = pm.getProjectSockets.call(this)
    if (websockets) {
      const websocket = pm.getProjectSocketByID.call(this, projectid)
      if (!websocket) {
        websockets.push({ projectid, socket })
      }


    } else {
      websockets = [{ projectid, socket }]
    }

    this.props.reduxProjectSockets(websockets)

  
 

    this.setState({ render: 'render' })




  }


  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }






  getProject() {
    const pm = new PM();
    const projectid = this.props.match.params.projectid;
    const myproject = pm.getMyProjectByID.call(this, projectid)
    return myproject;
  }





  handlescope(scope) {
    const pm = new PM();
    const myprojects = pm.getMyProjects.call(this)
    if (myprojects) {
      let myproject = this.getProject();
      if (myproject) {

        let i = pm.getMyProjectKeyByID.call(this, myproject.ProjectID);;
        myprojects[i].Scope = scope;
        this.props.reduxMyProjects(myprojects)
        this.setState({ render: 'render' })

      }

    }

  }
  getscope() {
    let pm = new PM();
    let myproject = this.getProject();
    let scope = "";
    if (myproject) {
      scope = myproject.Scope
    }
    return scope;
  }
  handleaddress(address) {
    const pm = new PM();
    const myprojects = pm.getMyProjects.call(this)

    if (myprojects) {
      let myproject = this.getProject();
      if (myproject) {
        let i = pm.getMyProjectKeyByID.call(this, myproject.ProjectID);;
        myprojects[i].Address = address;
        this.props.reduxMyProjects(myprojects)
        this.setState({ render: 'render' })

      }

    }

  }
  getaddress() {
    let pm = new PM();
    let myproject = this.getProject();
    let address = "";
    if (myproject) {
      address = myproject.Address;
    }
    return address;
  }

  handlecity(city) {
    const pm = new PM();
    const myprojects = pm.getMyProjects.call(this)
    if (myprojects) {
      let myproject = this.getProject();
      if (myproject) {
        let i = pm.getMyProjectKeyByID.call(this, myproject.ProjectID);;
        myprojects[i].City = city;
        this.props.reduxMyProjects(myprojects)
        this.setState({ render: 'render' })

      }

    }

  }
  getcity() {
    let pm = new PM();
    let myproject = this.getProject();
    let city = "";
    if (myproject) {
      city = myproject.City;
    }
    return city;
  }
  handleprojectstate(projectstate) {
    const pm = new PM();
    const myprojects = pm.getMyProjects.call(this)
    if (myprojects) {
      let myproject = this.getProject();
      if (myproject) {
        let i = pm.getMyProjectKeyByID.call(this, myproject.ProjectID);;
        myprojects[i].ProjectState = projectstate;
        this.props.reduxMyProjects(myprojects)
        this.setState({ render: 'render' })

      }

    }

  }
  getprojectstate() {
    let pm = new PM();
    let myproject = this.getProject();
    let projectstate = "";
    if (myproject) {
      projectstate = myproject.ProjectState;
    }


    return projectstate;
  }

  handlezipcode(zipcode) {
    const pm = new PM();
    const myprojects = pm.getMyProjects.call(this)
    if (myprojects) {
      let myproject = this.getProject();
      if (myproject) {
        let i = pm.getMyProjectKeyByID.call(this, myproject.ProjectID);;
        myprojects[i].Zipcode = zipcode;
        this.props.reduxMyProjects(myprojects)
        this.setState({ render: 'render' })

      }

    }

  }
  getzipcode() {
    let pm = new PM();
    let myproject = this.getProject();
    let zipcode = "";
    if (myproject) {
      zipcode = myproject.Zipcode;
    }

    return zipcode;
  }
  showprojectform() {
    const pm = new PM();
    let myproject = this.getProject()
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

  handleComponenets() {
    
    const projectid = new ProjectID();
    const styles = MyStylesheet();
    const pm = new PM();

    const nav = pm.getnavigation.call(this)
    const activecomponent = nav.activecomponent;

    const project = pm.getMyProjectByID.call(this, this.props.match.params.projectid)

    if (project) {


      const project_id = project.Project_ID;

      switch (activecomponent) {
        case "milestones":
          return (<Milestones project_id={project_id} key={Math.random()} />)
        case "team":
          return (<Team project_id={project_id} key={Math.random()} />)
        case "proposals":
          return( <Proposals project_id={project_id} key={Math.random()} />)
        case "invoices":
          return (<Invoices project_id={project_id} key={Math.random()} /> )
        default:
          return (
            <div style={{ ...styles.generalContainer }}>
              {this.showprojectform()}
              {projectid.showprojectid.call(this)}
            </div>)

      }

    }

  }

  updateMyProjects() {

    const pm = new PM();
    try {


      const myproject = pm.getMyProjectByID.call(this, this.props.match.params.projectid)


      if (myproject) {

        const project_id = myproject.Project_ID;
        const project = pm.getProjectByID.call(this, project_id)
        project.Scope = myproject.Scope;
        project.Address = myproject.Address;
        project.City = myproject.City;
        project.ProjectState = myproject.ProjectState;
        project.Zipcode = myproject.Zipcode;
        project.ProjectNumber = myproject.ProjectNumber;
        project.Title = myproject.Title;

        if (project) {

          const projectsocket = pm.getProjectSocketByID.call(this, this.props.match.params.projectid)
          if (projectsocket) {

            console.log(project)

            const socket = projectsocket.socket;
            const payload = JSON.stringify({ type: "pm", project });
            socket.send(payload)

          }


        }
        // const savemyproject = await SaveMyProject(this.props.project_id, myproject);
        // console.log(savemyproject)
        //     if(savemyproject.hasOwnProperty("myproject")) {
        // myprojects[i]= savemyproject.myproject;
        // this.props.reduxMyProjects(myprojects)

        //  }



      }


    } catch (err) {
      alert(`Could not save my Project ${err}`)
    }


  }







  render() {
    const pm = new PM();
    const styles = MyStylesheet();
    const regularFont = pm.getRegularFont.call(this)
    const myuser = pm.getuser.call(this)
    const headerFont = pm.getHeaderFont.call(this)
    const projectid = new ProjectID();
    const projectIcon = pm.projectIcon.call(this)
    if (myuser) {
      const project = this.getProject()
      if (project) {
        return (

          <div style={{ ...styles.generalFlex }}>
            <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>


              <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                <a style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.boldFont }} onClick={() => {projectid.handleComponents.call(this,"default") }}>  /{project.ProjectID}  </a>
              </div>


              {this.handleComponenets()}

              <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.alignCenter }}>

                <button style={{ ...styles.generalButton, ...projectIcon }} onClick={() => { this.updateMyProjects() }}>{updateProjects()}</button>

              </div>

            </div>
          </div>)

      } else {

        return (<div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
          <span style={{ ...styles.generalFont, ...regularFont }}>Project Not Found </span>
        </div>)

      }

    } else {

      return (<div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
        <span style={{ ...styles.generalFont, ...regularFont }}>Please Login to View Project</span>
      </div>)
    }

  }

}

function mapStateToProps(state) {
  return {
    myusermodel: state.myusermodel,
    navigation: state.navigation,
    csis: state.csis,
    allusers: state.allusers,
    projectsockets: state.projectsockets,
    myprojects: state.myprojects,
    projects: state.projects,
    allcompanys:state.allcompanys
  }
}

export default connect(mapStateToProps, actions)(Project)