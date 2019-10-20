import React, { Component } from 'react';
import './myprojects.css'
import { connect } from 'react-redux';
import * as actions from './actions';
import { loadmyprojects, SaveAllProjects } from './actions/api';
import { Link } from 'react-router-dom';
import { SaveProjectManagerIcon } from './svg'
import {
  validateProjectTitle,
  validateZipcode,
  validateCity,
  validateScope,
  validateProjectAddress,
  MyUserModel,
  getstatelist,
  inputUTCStringForLaborID

}
from './functions';

//import _ from 'lodash';
class Project extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '' }
  }
  componentDidMount() {
    this.props.reduxNavigation({
      err: 0,
      navigation: "project",
      projectid: this.props.match.params.projectid
    })

    let projectid = this.props.match.params.projectid;
    this.props.ProjectID({ projectid })
 

  }

  getservicetype() {
    let projectid = this.props.match.params.projectid;
    let servicetype = "";
    if (this.props.projects.hasOwnProperty("length")) {
      // eslint-disable-next-line
      this.props.projects.map((myproject) => {
        if (myproject.projectid === projectid) {
          servicetype = myproject.servicetype;

        }
      })
    }
    if (!servicetype) {
      if (this.props.projectsprovider.hasOwnProperty("length")) {
        // eslint-disable-next-line
        this.props.projectsprovider.map((myproject) => {
          if (myproject.projectid === projectid) {
            servicetype = myproject.servicetype;

          }
        })
      }
    }

    return (servicetype)
  }
  updateValues(myproject) {
    let servicetype = this.getservicetype();
    if (servicetype === "manager") {
      let obj = this.props.projects;
      this.props.reduxProjects(obj);
    }
    else if (servicetype === "provider") {
      let obj = this.props.projectsprovider;
      this.props.projectsProvider(obj);
    }

    this.updateState();
  }
  updateState() {

    this.setState({ render: 'render' })
  }

  getlinkword() {

  }

  showschedulelabor() {
    if (this.props.projects.hasOwnProperty("length") || this.props.projectsprovider.hasOwnProperty("length")) {
      let projectid = this.props.match.params.projectid;
      let servicetype = this.getservicetype()
      let providerid = this.props.match.params.providerid;
      if (servicetype === "manager") {
        return (<Link className="showprojectlink" to={`/${providerid}/myprojects/${projectid}/schedulelabor`}>View Schedule Labor </Link>);

      }
      else if (servicetype === "provider") {
        return (<Link className="showprojectlink" to={`/${providerid}/myprojects/${projectid}/schedulelabor`}>Add Schedule Labor </Link>);

      }

    }
  }
  showactuallabor() {
    if (this.props.projects.hasOwnProperty("length") || this.props.projectsprovider.hasOwnProperty("length")) {
      let projectid = this.props.match.params.projectid;
      let servicetype = this.getservicetype();
      let providerid = this.props.match.params.providerid;
      if (servicetype === "manager") {
        return (<Link className="showprojectlink" to={`/${providerid}/myprojects/${projectid}/actuallabor`}> View Actual Labor </Link>);

      }
      else if (servicetype === "provider") {
        return (<Link className="showprojectlink" to={`/${providerid}/myprojects/${projectid}/actuallabor`}> Add Actual Labor </Link>);

      }

    }

  }

  showschedulematerials() {

    if (this.props.projects.hasOwnProperty("length") || this.props.projectsprovider.hasOwnProperty("length")) {
      let projectid = this.props.match.params.projectid;
      let providerid = this.props.match.params.providerid;
      let servicetype = this.getservicetype()
      if (servicetype === "manager") {
        return (<Link className="showprojectlink" to={`/${providerid}/myprojects/${projectid}/schedulematerials`}> View Schedule Materials </Link>);

      }
      else if (servicetype === "provider") {
        return (<Link className="showprojectlink" to={`/${providerid}/myprojects/${projectid}/schedulematerials`}>Add Schedule Materials </Link>);

      }

    }
  }
  showactualmaterials() {
    if (this.props.projects.hasOwnProperty("length") || this.props.projectsprovider.hasOwnProperty("length")) {
      let projectid = this.props.match.params.projectid;
      let providerid = this.props.match.params.providerid;
      let servicetype = this.getservicetype()
      if (servicetype === "manager") {
        return (<Link className="showprojectlink" to={`/${providerid}/myprojects/${projectid}/actualmaterials`}>View Actual Materials </Link>);

      }
      else if (servicetype === "provider") {
        return (<Link className="showprojectlink" to={`/${providerid}/myprojects/${projectid}/actualmaterials`}>Add Actual Materials </Link>);

      }


    }
  }
  showproposals() {
    if (this.props.projects.hasOwnProperty("length") || this.props.projectsprovider.hasOwnProperty("length")) {
      let projectid = this.props.match.params.projectid;
      let providerid = this.props.match.params.providerid;
      let servicetype = this.getservicetype()
      if (servicetype === "manager") {
        return (<Link className="showprojectlink" to={`/${providerid}/myprojects/${projectid}/proposals`}>View Proposals </Link>);

      }
      else if (servicetype === "provider") {
        return (<Link className="showprojectlink" to={`/${providerid}/myprojects/${projectid}/proposals`}>Add Proposals </Link>);

      }


    }

  }

  showinvoices() {
    if (this.props.projects.hasOwnProperty("length") || this.props.projectsprovider.hasOwnProperty("length")) {
      let projectid = this.props.match.params.projectid;
      let servicetype = this.getservicetype();
      let providerid = this.props.match.params.providerid;
      if (servicetype === "manager") {
        return (<Link className="showprojectlink" to={`/${providerid}/myprojects/${projectid}/invoices`}>View Invoices </Link>);

      }
      else if (servicetype === "provider") {
        return (<Link className="showprojectlink" to={`/${providerid}/myprojects/${projectid}/invoices`}>Add Invoices </Link>);

      }


    }

  }



  showmilestone() {
    if (this.props.projects.hasOwnProperty("length") || this.props.projectsprovider.hasOwnProperty("length")) {
      let projectid = this.props.match.params.projectid;
      let servicetype = this.getservicetype();
      let providerid = this.props.match.params.providerid;
      if (servicetype === "manager") {
        return (<Link className="showprojectlink" to={`/${providerid}/myprojects/${projectid}/milestones`}> Add Project Milestones </Link>);

      }
      else if (servicetype === "provider") {
        return (<Link className="showprojectlink" to={`/${providerid}/myprojects/${projectid}/milestones`}> View Project Milestones </Link>);

      }


    }

  }

  showteam() {
    if (this.props.projects.hasOwnProperty("length") || this.props.projectsprovider.hasOwnProperty("length")) {
      let projectid = this.props.match.params.projectid;
      let servicetype = this.getservicetype();
      let providerid = this.props.match.params.providerid;
      if (servicetype === "manager") {
        return (<Link className="showprojectlink" to={`/${providerid}/myprojects/${projectid}/projectteam`}> Add Your Team </Link>);

      }
      else if (servicetype === "provider") {
        return (<Link className="showprojectlink" to={`/${providerid}/myprojects/${projectid}/projectteam`}> View Your Team </Link>);
      }


    }
  }


  displayprojectid() {
    if (this.props.projects.hasOwnProperty("length") || this.props.projectsprovider.hasOwnProperty("length")) {
      let projectid = this.props.match.params.projectid;
      let servicetype = this.getservicetype();
      let obj = {};
      if (servicetype === "manager") {
        obj = this.props.projects;
      }
      else if (servicetype === "provider") {
        obj = this.props.projectsprovider;;
      }

      // eslint-disable-next-line
      return (obj.map(myproject => {
        if (myproject.projectid === projectid) {
          return (`Project ID: ${projectid}/${myproject.title}`)
        }
      }))

    }
  }

  handleinsertbutton() {
    if (this.props.projects.hasOwnProperty("length")) {
      let projectid = this.props.projectid.projectid;
      if (projectid) {
        // eslint-disable-next-line
        return (this.props.projects.map(myproject => {
            if (myproject.projectid === projectid) {
              return (<div className="project-element project-title-row">
              <button className="btn-updateproject" onClick={event=>{this.handleSaveAllProjects()}}>
        {SaveProjectManagerIcon()} 
     </button></div>)
            }
          })


        )
      } //
    }
  }
  getprojectclass() {
    let projectclass = "";
    if (this.props.projects.hasOwnProperty("length") || this.props.projectsprovider.hasOwnProperty("length")) {
      let projectid = this.props.projectid.projectid;
      if (projectid) {

        let servicetype = this.getservicetype();
        if (servicetype === "manager") {
          // eslint-disable-next-line
          this.props.projects.map(myproject => {
            if (myproject.projectid === projectid) {
              projectclass = 'project-manager'
            }
          })
        }
        if (!projectclass && servicetype === "provider") {
          // eslint-disable-next-line
          this.props.projectsprovider.map(myproject => {
            if (myproject.projectid === projectid) {
              projectclass = 'project-provider'
            }
          })
        }


      }


    }
    return projectclass;
  }


  geterrormessages() {
    let errmsg = "";

    if (this.props.projects.hasOwnProperty("length")) {
      let projectid = this.props.match.params.projectid;

      // eslint-disable-next-line
      this.props.projects.map(myproject => {
        if (myproject.projectid === projectid) {
          errmsg += validateProjectTitle(myproject.title)
          errmsg += validateZipcode(myproject.zipcode);
          errmsg += validateCity(myproject.city);
          errmsg += validateScope(myproject.scope)
          errmsg += validateProjectAddress(myproject.address)
        }
      })
    }
    return errmsg;
  }
  gettitle() {
    let title = "";
    let myproject = this.getprojectmanager();
    title = myproject.title;
    return title;
  }
  handletitle(title) {
    if (this.props.projects) {

      if (this.props.projects.hasOwnProperty("length")) {
        let projectid = this.props.match.params.projectid
        // eslint-disable-next-line
        this.props.projects.map((myproject, i) => {
          if (myproject.projectid === projectid) {
            this.props.projects[i].title = title
            let obj = this.props.projects;
            this.props.reduxProjects(obj)
            this.setState({ render: 'render' })
          }
        })


      }


    }
  }
  loadstates() {
    let states = getstatelist();
    let mystates = [<option value=""> Select A State </option>]
    if (states.hasOwnProperty("length")) {
      // eslint-disable-next-line
      states.map(mystate => {
        mystates.push(<option value={mystate.abbreviation}>{mystate.name} </option>)
      })
    }
    return mystates;
  }
  handleprojecttitle() {
    let projecttitle = [];
    if (this.props.projects || this.props.projectsprovider) {
      let servicetype = this.getservicetype();
      if (servicetype === "manager") {
        projecttitle.push(<div className="projectprovider-container">Project Title<br/>
        <input type="text" 
        value={this.gettitle()}
        onChange={event=>{this.handletitle(event.target.value)}} 
        className="project-field" /> </div>)
      }

    }
    return projecttitle;
  }
  getprojectmanager() {
    let project = {};
    if (this.props.projects) {
      if (this.props.projects.hasOwnProperty("length")) {

        let projectid = this.props.match.params.projectid;
        // eslint-disable-next-line
        this.props.projects.map(myproject => {
          if (myproject.projectid === projectid) {
            project = myproject;
          }
        })
      }
    }
    return project;
  }
  getprojectprovider() {
    let project = {};
    if (this.props.projectsprovider) {
      if (this.props.projectsprovider.hasOwnProperty("length")) {

        let projectid = this.props.match.params.projectid;
        // eslint-disable-next-line
        this.props.projectsprovider.map(myproject => {
          if (myproject.projectid === projectid) {
            project = myproject;
          }
        })
      }
    }
    return project;
  }
  handleaddress(address) {
    if (this.props.projects) {

      if (this.props.projects.hasOwnProperty("length")) {
        let projectid = this.props.match.params.projectid
        // eslint-disable-next-line
        this.props.projects.map((myproject, i) => {
          if (myproject.projectid === projectid) {
            this.props.projects[i].address = address;
            let obj = this.props.projects;
            this.props.reduxProjects(obj)
            this.setState({ render: 'render' })
          }
        })


      }


    }

  }
  getaddress() {
    let address = "";
    let myproject = this.getprojectmanager();
    address = myproject.address;
    return address;
  }
  handlecity(city) {
    if (this.props.projects) {

      if (this.props.projects.hasOwnProperty("length")) {
        let projectid = this.props.match.params.projectid
        // eslint-disable-next-line
        this.props.projects.map((myproject, i) => {
          if (myproject.projectid === projectid) {
            this.props.projects[i].city = city;
            let obj = this.props.projects;
            this.props.reduxProjects(obj)
            this.setState({ render: 'render' })
          }
        })


      }


    }
  }
  getstate() {
    let projectstate = "";
    let myproject = this.getprojectmanager();
    projectstate = myproject.projectstate;
    return projectstate;
  }
  handlestate(projectstate) {
    if (this.props.projects) {

      if (this.props.projects.hasOwnProperty("length")) {
        let projectid = this.props.match.params.projectid
        // eslint-disable-next-line
        this.props.projects.map((myproject, i) => {
          if (myproject.projectid === projectid) {
            this.props.projects[i].projectstate = projectstate;
            let obj = this.props.projects;
            this.props.reduxProjects(obj)
            this.setState({ render: 'render' })
          }
        })


      }


    }
  }
  getcity() {
    let city = "";
    let myproject = this.getprojectmanager();
    city = myproject.city;
    return city;
  }
  handlezipcode(zipcode) {
    if (this.props.projects) {

      if (this.props.projects.hasOwnProperty("length")) {
        let projectid = this.props.match.params.projectid
        // eslint-disable-next-line
        this.props.projects.map((myproject, i) => {
          if (myproject.projectid === projectid) {
            this.props.projects[i].zipcode = zipcode;
            let obj = this.props.projects;
            this.props.reduxProjects(obj)
            this.setState({ render: 'render' })
          }
        })


      }


    }
  }
  getzipcode() {
    let zipcode = "";
    let myproject = this.getprojectmanager();
    zipcode = myproject.zipcode;
    return zipcode;
  }
  changescope(scope) {
    if (this.props.projects) {

      if (this.props.projects.hasOwnProperty("length")) {
        let projectid = this.props.match.params.projectid
        // eslint-disable-next-line
        this.props.projects.map((myproject, i) => {
          if (myproject.projectid === projectid) {
            this.props.projects[i].scope = scope;
            let obj = this.props.projects;
            this.props.reduxProjects(obj)
            this.setState({ render: 'render' })
          }
        })


      }


    }
  }

  getscope() {
    let scope = "";
    let myproject = this.getprojectmanager();
    scope = myproject.scope;
    return scope;
  }

  handleprojectlocation() {
    let projectlocation = []
    if (this.props.projects || this.props.projectsprovider) {
      let servicetype = this.getservicetype();

      if (servicetype === "manager") {

        projectlocation.push(<div className="projecthome-element-2a"> Address <br/>
          <input type="text" onChange={event=>{this.handleaddress(event.target.value)}} value={this.getaddress()} className="project-field" />
          </div>)
        projectlocation.push(<div className="projecthome-element-2b"> Zipcode <br/><input type="text" className="project-field" onChange={event=>{this.handlezipcode(event.target.value)}} value={this.getzipcode()} /></div>)
        projectlocation.push(<div className="projecthome-element-3"> City <br/><input type="text" className="project-field" onChange={event=>{this.handlecity(event.target.value)}} value={this.getcity()} /></div>)
        projectlocation.push(<div className="projecthome-element-3">State <br/><select className="project-field" onChange={event=>{this.handlestate(event.target.value)}} value={this.getstate()}>{this.loadstates()} </select></div>)
      }
      else if (servicetype === "provider") {
        let myproject = this.getprojectprovider();
        projectlocation.push(<div className="project-title-row"> 
         {myproject.address} <br/>{ myproject.city }, { myproject.projectstate } { myproject.zipcode }
             </div>)
      }
      else {

        projectlocation.push(<div className="projectprovider-container">&nbsp;</div>)
      }
    }
    return projectlocation
  }
  handlescope() {
    let scope = [];
    if (this.props.projects || this.props.projectsprovider) {
      let servicetype = this.getservicetype();
      if (servicetype === "provider") {
        let myproject = this.getprojectprovider();
        let sow = myproject.scope;
        let body = [];
        sow = sow.split(/\n/g)
        sow.forEach(content => {

          body.push(<p> {content} </p>)

        })
        scope.push(<div className="projectprovider-container">{body}</div>)

      }
      else if (servicetype === "manager") {
        scope.push(<div className="projecthome-element-1">Scope of Work <br/> <textarea className="project-field" onChange={event=>{this.changescope(event.target.value)}} value={this.getscope()} > 
         </textarea> </div>)
      }
      else {
        scope.push(<div className="projectprovider-container">&nbsp;</div>)
      }

    }
    return scope;
  }

  async handleSaveAllProjects() {
    let providerid = this.props.myusermodel.providerid;
    let projectid = this.props.projectid.projectid;
    let myproject = this.getprojectmanager();
    let myusermodel = this.props.myusermodel;
    let values = { projectid, providerid, myusermodel, myproject }

    let response = await SaveAllProjects(values)
    console.log(response)
    if (response.hasOwnProperty("providerid")) {
      let myusermodel = MyUserModel(response.providerid, response.firstname, response.lastname, response.company, response.occupation, response.jobtitle, response.laborrate, response.address, response.city, response.contactstate, response.zipcode, response.emailaddress, response.phonenumber, response.profileurl, response.stripe)

      this.props.updateUserModel(myusermodel)
    }
    if (response.hasOwnProperty("projectsmanaging")) {
      this.props.reduxProjects(response.projectsmanaging.myproject)
    }
    if (response.hasOwnProperty("message")) {
      this.setState({ message: `${response.message} Last Updated ${inputUTCStringForLaborID(response.dateupdated)}`, activeprovider: "" })
    }

  }
  render() {
    return (
      <div>
     <div className="myproject-container">
     <div className="project-element project-title-row">{this.displayprojectid()} </div>
     {this.handleprojecttitle()}
    {this.handleprojectlocation()}
   {this.handlescope()}
    <div className="projectmessage-container">{this.state.message} </div>
    {this.handleinsertbutton()}
   
    <div className="project-element project-title-row">Project Components </div>
    <div className={`project-component-link ${this.getprojectclass()}`}>{this.showmilestone()}</div>
    <div className={`project-component-link ${this.getprojectclass()}`}>{this.showteam()}</div>
     <div className={`project-component-link ${this.getprojectclass()}`}>{this.showschedulelabor()}</div>
     <div className={`project-component-link ${this.getprojectclass()}`}>{this.showschedulematerials()}</div>
     <div className={`project-component-link ${this.getprojectclass()}`}>{this.showactuallabor()}</div>
     <div className={`project-component-link ${this.getprojectclass()}`} >{this.showactualmaterials()}</div>
     <div className={`project-component-link ${this.getprojectclass()}`}>{this.showproposals()}</div>
     <div className={`project-component-link ${this.getprojectclass()}`}>{this.showinvoices()}</div>
     </div>
      
     
</div>)
  }
}

function mapStateToProps(state) {
  return {
    myusermodel: state.myusermodel,
    projectid: state.projectid,
    projects: state.projects,
    projectsprovider: state.projectsprovider
  }
}
export default connect(mapStateToProps, actions)(Project)
