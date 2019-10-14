import React, { Component } from 'react';
import './myprojects.css';
import { connect } from 'react-redux';
import { CheckProjectID, loadmyprojects, InsertMyProject, GoandHireMe } from './actions/api';
import { CloseProviderIcon, newClearProjectID, SaveNewProjectIcon, saveAllProfileIcon, ProjectProviderIcon, ProjectManagerIcon, CloseProjectIcon } from './svg';
import { validateLaborRate, stateArray, getDateStringFromUTCSeconds, MyUserModel, inputUTCStringForLaborID, MyProjectModel, validateNewProjectID } from './functions';
import * as actions from './actions';
import { Link } from 'react-router-dom';

class MyProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      render: '',
      width: 0,
      height: 0,
      projectid: "",
      title: "",
      city: '',
      projectstate: '',
      zipcode: '',
      scope: '',
      message: "",

    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.props.reduxNavigation({ navigation: "myprojects" })

    if (!this.props.projects.hasOwnProperty("length") && !this.props.projectsprovider.hasOwnProperty("length")) {

      let providerid = this.props.match.params.providerid;
      this.getmyprojects(providerid);
    }

  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }


  async getmyprojects(providerid) {
    let response = await loadmyprojects(providerid);
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
    this.setState({ render: 'render' })
  }
  geterrormessages() {
    let message = "";
    if (this.props.projectzipcode.hasOwnProperty("errmsg")) {
      message += this.props.projectzipcode.errmsg;
    }
    if (this.props.projectcity.hasOwnProperty("errmsg")) {
      message += this.props.projectcity.errmsg;
    }
    if (this.props.projectaddress.hasOwnProperty("errmsg")) {
      message += this.props.projectaddress.errmsg;
    }
    if (this.props.scopeofwork.hasOwnProperty("errmsg")) {
      message += this.props.scopeofwork.errmsg;
    }
    if (this.props.projecttitle.hasOwnProperty("errmsg")) {
      message += this.props.projecttitle.errmsg;
    }
    return message;
  }

  async insertmyproject(values) {

    let response = await InsertMyProject(values);
    console.log(response)
    let message = "";
    if (response.hasOwnProperty("projectsmanaging")) {
      this.props.reduxProjects(response.projectsmanaging.myproject)

    }
    if (response.hasOwnProperty("message")) {
      message = response.message;
      if (response.hasOwnProperty("lastsaved")) {
        let lastsaved = getDateStringFromUTCSeconds(response.lastsaved);
        message += ` Last Saved on ${lastsaved}`;

      }
    }
    if (response.hasOwnProperty("projectinserted")) {
      let activeprojectid = response.projectinserted;
      this.props.ProjectID({ projectid: activeprojectid })
      message += ` Active ProjectID is ${activeprojectid}, Type To Edit and Save all`
    }
    this.setState({ message })
  }
  updateState() {
    this.setState({ render: 'render' })
  }

  clearprojectid(event) {
    this.props.ProjectID({ projectid: "", message: "" });
    this.setState({ title: "", address: "", scope: "", projectid: "", city: "", projectstate: "", zipcode: "" })

  }
  updateValues(myproject) {

    this.props.projectCountry({ projectcountry: myproject.country });
    this.props.projectCity({ projectcity: myproject.projectcity });
    this.props.projectState({ projectstate: myproject.projectstate });
    this.props.projectZipcode({ projectzipcode: myproject.projectzipcode });
    this.props.projectTitle({ projecttitle: myproject.title })
    this.props.projectScope({ scopeofwork: myproject.scope })
    this.props.projectAddress({ projectaddress: myproject.projectaddress })
    this.updateState();
  }
  getprojectidmessage() {

    if (this.props.projectid.hasOwnProperty("message")) {
      return this.props.projectid.message;
    }
  }


  handleDelete(projectid) {
    let message = "";
    if (this.props.projects.hasOwnProperty("length")) {

      if (window.confirm(`Are you sure you want to delete the Project ID ${projectid}?`)) {

        // eslint-disable-next-line
        this.props.projects.map((myproject, i) => {

          if (myproject.projectid === projectid) {
            this.props.projects.splice(i, 1);
            let obj = this.props.projects
            this.props.reduxProjects(obj);
            if (this.props.projectid.hasOwnProperty("projectid")) {
              if (this.props.projectid.projectid === projectid) {
                this.props.ProjectID({})
                message += ` ProjectID ${projectid} is deleted, Press Save All Projects to Save Changes `
                this.setState({ message, title: "", address: "", city: "", projectstate: "", zipcode: "", scope: "" })
              }
            }



          }

        })


      }


    } //always true

  }

  showmyservicestitle() {
    if (this.props.projectsprovider.hasOwnProperty("length")) {
      return ("My Services")
    }
  }
  showmyprojectstitle() {
    if (this.props.projects.hasOwnProperty("length") && !this.state.message) {
      return ("My Projects")
    }
    else if (this.state.message) {
      return this.state.message;
    }
  }
  getprojectsubmenu(projectid) {
    let projectmenu = [];
    let providerid = this.props.myusermodel.providerid;
    let myproject = this.getproject();
    let team = "";
    let milestones = "";
    let schedulelabor = "";
    let schedulematerials = "";
    let actuallabor = "";
    let actualmaterials = "";
    let proposals = "";
    let invoices = "";
    if (myproject.servicetype === "manager") {
      team = "Add Team";
      milestones = "Add Milestones";
      schedulelabor = "View Schedule Labor";
      schedulematerials = "View Schedule Materials";
      actuallabor = "View Actual Labor";
      actualmaterials = "View Actual Materials";
      proposals = "View Proposals";
      invoices = "View Invoices";

    }
    else if (myproject.servicetype === "provider") {
      team = "View Team";
      milestones = "View Milestones";
      schedulelabor = "Add Schedule Labor";
      schedulematerials = "Add Schedule Materials";
      actuallabor = "Add Actual Labor";
      actualmaterials = "Add Actual Materials";
      proposals = "Add Proposals";
      invoices = "Add Invoices";

    }
    let link_1 = <Link className="showprojectlink" to={`/${providerid}/myprojects/${projectid}/projectteam`}>{team}</Link>
    let link_2 = <Link className="showprojectlink" to={`/${providerid}/myprojects/${projectid}/milestones`}>{milestones} </Link>
    let link_3 = <Link className="showprojectlink" to={`/${providerid}/myprojects/${projectid}/schedulelabor`}>{schedulelabor}</Link>
    let link_4 = <Link className="showprojectlink" to={`/${providerid}/myprojects/${projectid}/schedulematerials`}>{schedulematerials} </Link>
    let link_5 = <Link className="showprojectlink" to={`/${providerid}/myprojects/${projectid}/actuallabor`}>{actuallabor}</Link>
    let link_6 = <Link className="showprojectlink" to={`/${providerid}/myprojects/${projectid}/actualmaterials`}>{actualmaterials}</Link>
    let link_7 = <Link className="showprojectlink" to={`/${providerid}/myprojects/${projectid}/invoices`}>{invoices}</Link>
    let link_8 = <Link className="showprojectlink" to={`/${providerid}/myprojects/${projectid}/proposals`}>{proposals}</Link>
    if (this.props.projectid.projectid === projectid) {
      if (this.state.width > 1080) {
        projectmenu.push(<div className="span-2"> &nbsp; </div>)
        projectmenu.push(<div className="span-5 project-regularfont">{link_1} </div>)
        projectmenu.push(<div className="span-5 project-regularfont"> {link_2}  </div>)

        projectmenu.push(<div className="span-2"> &nbsp; </div>)
        projectmenu.push(<div className="span-5 project-regularfont"> {link_3}  </div>)
        projectmenu.push(<div className="span-5 project-regularfont">{link_4}  </div>)

        projectmenu.push(<div className="span-2"> &nbsp; </div>)
        projectmenu.push(<div className="span-5 project-regularfont"> {link_5}   </div>)
        projectmenu.push(<div className="span-5 project-regularfont">{link_6}   </div>)

        projectmenu.push(<div className="span-2"> &nbsp; </div>)
        projectmenu.push(<div className="span-5 project-regularfont">{link_7}   </div>)
        projectmenu.push(<div className="span-5 project-regularfont">{link_8}   </div>)
      }
      else if (this.state.width > 720) {
        projectmenu.push(<div className="span-2"> &nbsp; </div>)
        projectmenu.push(<div className="span-2 project-regularfont">{link_1}</div>)
        projectmenu.push(<div className="span-2 project-regularfont"> {link_2} </div>)

        projectmenu.push(<div className="span-2"> &nbsp; </div>)
        projectmenu.push(<div className="span-2 project-regularfont"> {link_3}  </div>)
        projectmenu.push(<div className="span-2 project-regularfont">{link_4}  </div>)

        projectmenu.push(<div className="span-2"> &nbsp; </div>)
        projectmenu.push(<div className="span-2 project-regularfont"> {link_5}   </div>)
        projectmenu.push(<div className="span-2 project-regularfont">{link_6}   </div>)

        projectmenu.push(<div className="span-2"> &nbsp; </div>)
        projectmenu.push(<div className="span-2 project-regularfont">{link_7}   </div>)
        projectmenu.push(<div className="span-2 project-regularfont">{link_8}   </div>)
      }
      else {

        projectmenu.push(<div className="project-regularfont">{link_1}</div>)
        projectmenu.push(<div className="project-regularfont"> {link_2}</div>)
        projectmenu.push(<div className="project-regularfont"> {link_3}</div>)
        projectmenu.push(<div className="project-regularfont">{link_4}</div>)
        projectmenu.push(<div className="project-regularfont"> {link_5}</div>)
        projectmenu.push(<div className="project-regularfont">{link_6}</div>)
        projectmenu.push(<div className="project-regularfont">{link_7} </div>)
        projectmenu.push(<div className="project-regularfont">{link_8}</div>)

      }
    }
    return projectmenu;
  }
  getprojectmanagingicon(projectid) {
    if (this.props.projectid.projectid === projectid) {
      return (<button className="projectmenu-icon" onClick={()=>{this.clearprojectid()}}>{CloseProjectIcon()}</button>)
    }
    else {
      return (<button className="projectmenu-icon" onClick={()=>{this.findproject(projectid)}}>{ProjectManagerIcon()}</button>)
    }
  }
  getallprojectsmanaging() {
    let project = [];
    if (this.props.projects) {
      if (this.props.projects.hasOwnProperty("length")) {
        // eslint-disable-next-line
        this.props.projects.map(myproject => {
          if (this.state.width >= 1080) {
            project.push(<div className="span-2 align-content-center">{this.getprojectmanagingicon(myproject.projectid)}</div>)
            project.push(<div className="span-10 project-regularfont">{myproject.projectid} {myproject.title}</div>)
            project.push(this.getprojectsubmenu(myproject.projectid))
          }
          else if (this.state.width >= 720) {
            project.push(<div className="span-2 align-content-center">{this.getprojectmanagingicon(myproject.projectid)}</div>)
            project.push(<div className="span-4 project-regularfont">{myproject.projectid} {myproject.title}</div>)
            project.push(this.getprojectsubmenu(myproject.projectid))
          }
          else {
            project.push(<div className="span-2 project-regularfont">
        <div className="project-flexcontainer">
            <div className="flex-one align-content-right">{this.getprojectmanagingicon(myproject.projectid)}</div>
            <div className="flex-three">{myproject.projectid} {myproject.title} </div>
        </div>
      </div>)

            project.push(this.getprojectsubmenu(myproject.projectid))

          }

        })
      }
    }
    return project;
  }
  showallprojects() {


    let projectsmanaging = [];

    if (this.state.width > 1080) {

      projectsmanaging.push(<div><button className="projectmenu-icon">{ProjectManagerIcon()}</button></div>)
      projectsmanaging.push(<div className="span-11 project-regularfont"> Projects Managing </div>)
      projectsmanaging.push(this.getallprojectsmanaging())



    }
    else if (this.state.width > 720) {
      projectsmanaging.push(<div><button className="projectmenu-icon">{ProjectManagerIcon()}</button></div>)
      projectsmanaging.push(<div className="span-5 project-regularfont"> Projects Managing </div>)
      projectsmanaging.push(this.getallprojectsmanaging())
    }
    else {
      projectsmanaging.push(<div className="span-2 project-regularfont">
        <div className="project-flexcontainer">
            <div className="flex-one"><button className="projectmenu-icon">{ProjectManagerIcon()}</button></div>
            <div className="flex-five">Projects Managing </div>
        </div>
      </div>)
      projectsmanaging.push(this.getallprojectsmanaging())

    }

    return projectsmanaging;

  }
  getprovidericon(projectid) {
    if (this.props.projectid.projectid === projectid) {
      return (<button className="projectmenu-icon" onClick={()=>{this.clearprojectid()}}>{CloseProviderIcon()}</button>)
    }
    else {
      return (<button className="projectmenu-icon" onClick={()=>this.findproject(projectid)}>{ProjectProviderIcon()}</button>)
    }

  }
  getallprojectsprovider() {
    let project = [];
    if (this.props.projectsprovider) {
      if (this.props.projectsprovider.hasOwnProperty("length")) {
        // eslint-disable-next-line
        this.props.projectsprovider.map(myproject => {
          if (this.state.width >= 1080) {
            project.push(<div className="span-2 align-content-center">{this.getprovidericon(myproject.projectid)}</div>)
            project.push(<div className="span-10 project-regularfont">{myproject.projectid} {myproject.title}</div>)
            project.push(this.getprojectsubmenu(myproject.projectid))
          }
          else if (this.state.width >= 720) {
            project.push(<div className="span-2 align-content-center">{this.getprovidericon(myproject.projectid)}</div>)
            project.push(<div className="span-4 project-regularfont">{myproject.projectid} {myproject.title}</div>)
            project.push(this.getprojectsubmenu(myproject.projectid))
          }
          else {

            project.push(<div className="span-2 project-regularfont">
        <div className="project-flexcontainer">
            <div className="flex-one align-content-right">{this.getprovidericon(myproject.projectid)}</div>
            <div className="flex-three">{myproject.projectid} {myproject.title} </div>
        </div>
      </div>)
            project.push(this.getprojectsubmenu(myproject.projectid))
          }


        })
      }
    }
    return project;
  }

  showallservices() {

    let projectsprovider = [];

    if (this.state.width > 1080) {

      projectsprovider.push(<div><button className="projectmenu-icon">{ProjectProviderIcon()}</button> </div>)
      projectsprovider.push(<div className="span-11 project-regularfont"> Projects Serving </div>)
      projectsprovider.push(this.getallprojectsprovider())


    }
    else if (this.state.width > 720) {

      projectsprovider.push(<div><button className="projectmenu-icon">{ProjectProviderIcon()}</button></div>)
      projectsprovider.push(<div className="span-5 project-regularfont"> Projects Serving</div>)
      projectsprovider.push(this.getallprojectsprovider())


    }
    else {
      projectsprovider.push(<div className="span-2 project-regularfont">
        <div className="project-flexcontainer">
            <div className="flex-one"><button className="projectmenu-icon">{ProjectProviderIcon()}</button></div>
            <div className="flex-five">Projects Managing </div>
        </div>
      </div>)
      projectsprovider.push(this.getallprojectsprovider())
    }
    return projectsprovider;
  }
  ChangeTitle(projecttitle) {

    if (this.props.projectid.hasOwnProperty("projectid")) {
      let projectid = this.props.projectid.projectid;

      if (this.props.projects.hasOwnProperty("length")) {
        // eslint-disable-next-line
        this.props.projects.map((myproject, i) => {
          if (myproject.projectid === projectid) {
            this.props.projects[i].title = projecttitle;
            let obj = this.props.projects;
            this.props.reduxProjects(obj)
            this.setState({ render: 'render' })
          }
        })

      }

    }
    else {

      this.setState({ title: projecttitle })
    }
  }
  getTitle() {
    let title = "";
    if (this.props.projectid.hasOwnProperty("projectid")) {
      let myproject = this.getproject();
      console.log(myproject)
      title = myproject.title;

    }
    else {
      title = this.state.title;
    }
    return title;

  }

  ChangeAddress(address) {

    if (this.props.projectid.hasOwnProperty("projectid")) {
      let projectid = this.props.projectid.projectid;

      if (this.props.projects.hasOwnProperty("length")) {
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
    else {



      this.setState({ address })
    }
  }
  getAddress() {
    let address = "";
    if (this.props.projectid.hasOwnProperty("projectid")) {
      let myproject = this.getproject();
      address = myproject.address;


    }
    else {
      address = this.state.address;
    }
    return address;

  }
  ChangeCity(city) {


    if (this.props.projectid.hasOwnProperty("projectid")) {
      let projectid = this.props.projectid.projectid;

      if (this.props.projects.hasOwnProperty("length")) {
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
    else {



      this.setState({ city })
    }
  }
  getCity() {
    let city = "";
    if (this.props.projectid.hasOwnProperty("projectid")) {
      let myproject = this.getproject();
      city = myproject.city;

    }
    else {
      city = this.state.city;
    }
    return city;

  }
  ChangeState(projectstate) {

    if (this.props.projectid.hasOwnProperty("projectid")) {
      let projectid = this.props.projectid.projectid;

      if (this.props.projects.hasOwnProperty("length")) {
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
    else {



      this.setState({ projectstate })
    }
  }
  getState() {
    let projectstate = "";
    if (this.props.projectid.hasOwnProperty("projectid")) {
      let myproject = this.getproject();
      projectstate = myproject.projectstate;

    }
    else {
      projectstate = this.state.projectstate;
    }
    return projectstate;

  }

  ChangeZipcode(zipcode) {
    if (this.props.projectid.hasOwnProperty("projectid")) {
      let projectid = this.props.projectid.projectid;

      if (this.props.projects.hasOwnProperty("length")) {
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
    else {
      this.setState({ zipcode })
    }
  }
  getZipcode() {
    let zipcode = "";
    if (this.props.projectid.hasOwnProperty("projectid")) {
      let myproject = this.getproject();
      zipcode = myproject.zipcode;

    }
    else {
      zipcode = this.state.zipcode;
    }
    return zipcode;

  }

  ChangeScope(scope) {


    if (this.props.projectid.hasOwnProperty("projectid")) {
      let projectid = this.props.projectid.projectid;

      if (this.props.projects.hasOwnProperty("length")) {
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
    else {



      this.setState({ scope })
    }
  }
  getScope() {
    let scope = "";
    if (this.props.projectid.hasOwnProperty("projectid")) {
      let myproject = this.getproject();
      scope = myproject.scope;
    }
    else {
      scope = this.state.scope;
    }
    return scope;

  }
  findproject(projectid) {
    let project = false;
    if (this.props.projects.hasOwnProperty("length")) {
      // eslint-disable-next-line
      this.props.projects.map(myproject => {
        if (myproject.projectid === projectid) {
          project = true;
          this.props.ProjectID({ projectid: myproject.projectid });
          this.setState({ title: '', city: '', projectstate: '', zipcode: '', scope: '', address: '' })
        }
      })


    }
    if (!project) {
      // eslint-disable-next-line
      this.props.projectsprovider.map(myproject => {
        if (myproject.projectid === projectid) {
          project = true;
          this.props.ProjectID({ projectid: myproject.projectid });
          this.setState({ title: '', city: '', projectstate: '', zipcode: '', scope: '', address: '' })
        }
      })
    }
  }

  handleNewProject(event) {
    let message = " Project ID  is clear Press Save New Project when you are done creating "
    this.props.ProjectID({ projectid: false })
    this.setState({ message })
  }
  async CreateNewProject(event) {
    let providerid = this.props.match.params.providerid;
    let projectid = this.state.projectid;
    let title = this.state.title;
    let scope = this.state.scope;
    let address = this.state.address;
    let city = this.state.city;
    let projectstate = this.state.projectstate;
    let zipcode = this.state.zipcode;
    let errmsg = validateNewProjectID(projectid);
    if (!errmsg) {
      let myproject = MyProjectModel(providerid, projectid, title, scope, address, city, projectstate, zipcode)
      let response = await InsertMyProject(myproject);
      console.log(response)
      if (response.hasOwnProperty("projectsmanaging")) {

        this.props.reduxProjects(response.projectsmanaging.myproject)

      }


      if (!response.hasOwnProperty("generatedprojectid")) {
        this.checkresponseforactiveprojectid(projectid, response)
      }
      else {
        let projectid = response.generatedprojectid;
        this.props.ProjectID({ projectid })
      }

      if (response.hasOwnProperty("message")) {
        this.setState({ message: `${response.message} Last Updated  ${inputUTCStringForLaborID(response.dateupdated)}` })
      }
      else {
        this.setState({ render: 'render' })
      }
    }
    else {
      this.setState({ message: errmsg })
    }

  }
  checkresponseforactiveprojectid(projectid, response) {

    if (response.hasOwnProperty("projectsmanaging")) {
      // eslint-disable-next-line
      response.projectsmanaging.myproject.map(myproject => {
        if (myproject.projectid === projectid) {
          this.props.ProjectID({ projectid })
        }
      })
    }
  }
  getStates() {
    let states = stateArray();
    let myjsx = [];
    myjsx.push(<option value="">Choose A State </option>);
    // eslint-disable-next-line
    states.map(state => {
      myjsx.push(<option value={state.abbreviation}>{state.name} </option>)
    })
    return myjsx;
  }


  getproject() {
    let project = false;
    let projectid = this.props.projectid.projectid;
    if (this.props.projects.hasOwnProperty("length")) {

      // eslint-disable-next-line
      this.props.projects.map(myproject => {
        if (myproject.projectid === projectid) {
          project = myproject;
        }
      })
    }
    if (!project) {
      // eslint-disable-next-line
      this.props.projectsprovider.map(myproject => {
        if (myproject.projectid === projectid) {
          project = myproject;
        }
      })
    }

    return project;
  }
  validateProjectProvider() {
    let errmsg = "";

    if (this.props.projectsprovider) {
      if (this.props.projectsprovider.hasOwnProperty("length")) {
        // eslint-disable-next-line
        this.props.projectsprovider.map(myproject => {

          if (myproject.hasOwnProperty("actuallabor")) {
            // eslint-disable-next-line
            myproject.actuallabor.mylabor.map(mylabor => {
              if (!mylabor.milestoneid) {
                errmsg = `${mylabor.laborid} is missing a milestone `
              }
              console.log(mylabor.laborrate)
              errmsg += `${validateLaborRate(mylabor.laborrate)}`
              console.log(errmsg)
            })
          }

          if (myproject.hasOwnProperty("actualmaterials")) {
            // eslint-disable-next-line
            myproject.actualmaterials.mymaterial.map(mymaterial => {
              if (!mymaterial.milestoneid) {
                errmsg += `${mymaterial.materialid} is missing a milestone `

              }
              errmsg += `${validateLaborRate(mymaterial.unitcost)}`
              errmsg += `${validateLaborRate(mymaterial.quantity)}`
            })
          }

          if (myproject.hasOwnProperty("schedulelabor")) {
            console.log("checking schedulelabor")
            // eslint-disable-next-line
            myproject.schedulelabor.mylabor.map(mylabor => {
              if (!mylabor.milestoneid) {

                errmsg += `${mylabor.laborid} is missing a milestone `
                console.log(errmsg)
              }

              errmsg += `${validateLaborRate(mylabor.laborrate)}`

            })
          }

          if (myproject.hasOwnProperty("schedulematerials")) {
            // eslint-disable-next-line
            myproject.schedulematerials.mymaterial.map(mymaterial => {
              if (!mymaterial.milestoneid) {
                errmsg += `${mymaterial.materialid} is missing a milestone `

              }
              errmsg += `${validateLaborRate(mymaterial.unitcost)}`
              errmsg += `${validateLaborRate(mymaterial.quantity)}`
            })
          }


        })
      }
    }
    return errmsg;
  }
  async handleSaveAllProjects() {
    let providerid = this.props.myusermodel.providerid;
    let myusermodel = this.props.myusermodel;
    let projects = this.props.projects;
    let projectsprovider = this.props.projectsprovider;
    let values = { providerid, myusermodel, projects, projectsprovider }
    let errmsg = this.validateProjectProvider();

    if (!errmsg) {
      let response = await GoandHireMe(values)
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
      if (response.hasOwnProperty("message")) {
        this.setState({ message: `${response.message} Last Updated ${inputUTCStringForLaborID(response.dateupdated)}` })
      }
    }


  }
  showprojectinfo() {
    let projectinfo = [];
    let myproject = this.getproject();
    if (myproject.servicetype === "manager") {
      projectinfo.push(<div className="projecthome-element-1"> Project Title <br/><input type="text"
    className="project-field"
    onChange={event=>{this.ChangeTitle(event.target.value)}}
    value={this.getTitle()}/></div>)
      projectinfo.push(<div className="projecthome-element-2a">Project Address <br/><input type="text" className="project-field" 
    onChange={event=>{this.ChangeAddress(event.target.value)}}
    value={this.getAddress()}/></div>)
      projectinfo.push(<div className="projecthome-element-2b">Zipcode<br/><input type="text" className="project-field"
    onChange={event=>{this.ChangeZipcode(event.target.value)}}
    value={this.getZipcode()} /></div>)

      projectinfo.push(<div className="projecthome-element-3">Project City <br/><input type="text" className="project-field"
     onChange={event=>{this.ChangeCity(event.target.value)}}
     value={this.getCity()}/></div>)
      projectinfo.push(<div className="projecthome-element-3">Project State <br/><select className="project-field"
     onChange={event=>{this.ChangeState(event.target.value)}}
     value={this.getState()}>{this.getStates()}</select></div>)
      projectinfo.push(<div className="projecthome-element-1">Scope of Work <br/> <textarea 
     onChange={event=>{this.ChangeScope(event.target.value)}}
     value={this.getScope()}
     className="project-field"> </textarea> </div>)
    }
    else {
      projectinfo.push(<div className="projecthome-element-1"> Project Title <br/>{this.getTitle()}</div>)
      projectinfo.push(<div className="projecthome-element-2a">Project Address <br/>{this.getAddress()}</div>)
      projectinfo.push(<div className="projecthome-element-2b">Zipcode<br/>{this.getZipcode()}</div>)

      projectinfo.push(<div className="projecthome-element-3">Project City <br/>{this.getCity()}</div>)
      projectinfo.push(<div className="projecthome-element-3">Project State <br/>{this.getState()}</div>)
      projectinfo.push(<div className="projecthome-element-1">Scope of Work <br/>{this.getScope()}</div>)
    }
    return projectinfo;
  }

  componentManager() {
    if (this.props.myusermodel) {
      if (this.props.myusermodel.hasOwnProperty("providerid")) {
        return (this.showmyprojects())
      }
      else {
        return (<span> &nbsp;</span>)
      }
    }
    else {
      return (<span> &nbsp;</span>)
    }
  }
  handleprojectid(projectid) {
    projectid = projectid.toLowerCase();
    let errmsg = validateNewProjectID(projectid);

    this.setState({ projectid, message: errmsg })
  }
  async checkprojectid(event) {
    let projectid = this.state.projectid;
    let errmsg = validateNewProjectID(projectid)
    if (!errmsg) {
      let response = await CheckProjectID(projectid);
      console.log(response)

    }
  }
  handleactiveproject() {
    let myproject = [];
    if (this.props.projectid) {
      if (this.props.projectid.projectid) {
        myproject.push(<div className="project-title-row"><button className="project-button" onClick={event=>{this.clearprojectid(event)}}>{newClearProjectID()} </button> </div>)
        myproject.push(<div className="projecthome-element-1">
        Your Project is found at as {process.env.REACT_APP_ROOT_CLIENT}/{this.props.match.params.providerid}/myprojects/{this.props.projectid.projectid}</div>)
        myproject.push(this.showprojectinfo())
        myproject.push(<div className="projecthome-element-1 align-text-center">{this.state.message} </div>)
        myproject.push(<div className="project-title-row"><button className="project-button" onClick={event=>{this.handleSaveAllProjects(event)}}>{saveAllProfileIcon()} </button></div>)
      }
      else {
        myproject.push(<div className="project-title-row"><button className="project-button" onClick={event=>{this.CreateNewProject(event)}}>{SaveNewProjectIcon()} </button> </div>)
        myproject.push(<div className="projecthome-element-1">Create a unique Project ID (recommended)
        <input type="text" 
        value={this.state.projectid} 
        onChange={event=>{this.handleprojectid(event.target.value)}} 
        onBlur={event=>this.checkprojectid(event)}
        onFocus={event=>this.checkprojectid(event)}
        className="project-field"/>
        <br/>
        Your Project Will Appear as {process.env.REACT_APP_ROOT_CLIENT}/{this.props.match.params.providerid}/myprojects/{this.state.projectid}</div>)
        myproject.push(<div className="projecthome-element-1">{this.state.message} </div>)

      }

    }
    else {
      myproject.push(<span>&nbsp;</span>)
    }
    return myproject;
  }
  showmyprojects() {
    return (<div className="projecthome-container">
    <div className="project-title-row">
    My Projects <br/> Provider ID {this.props.match.params.providerid}
    </div>
    {this.handleactiveproject()}
    {this.showallprojects()}
    {this.showallservices()}
    </div>)
  }
  render() {

    return (this.componentManager())
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
export default connect(mapStateToProps, actions)(MyProjects)
