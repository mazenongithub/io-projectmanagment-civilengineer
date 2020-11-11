import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import PM from './pm';
import { purpleCheck, TouchIcon } from './svg';
import { CreateProject } from './functions';
import { Link } from 'react-router-dom';
import { CheckProjectID } from './actions/api'
import { validateTitle } from './functions';
import MakeID from './makeids';

class MyProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '', render: '', activeprojectid: '', width: 0, height: 0, title: '', scope: '', address: '', city: '', projectstate: '', zipcode: '', projectidcheck: false
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
  gettitle() {
    const pm = new PM();
    if (this.state.activeprojectid) {
      const myproject = pm.getprojectbyid.call(this, this.state.activeprojectid);
      return myproject.title;
    } else {
      return this.state.title;
    }
  }

  handletitle(title) {
    const pm = new PM();
    const makeID = new MakeID();
    const myuser = pm.getuser.call(this);


    if (myuser) {

      if (this.state.activeprojectid) {
        let i = pm.getprojectkeybyid.call(this, this.state.activeprojectid);

        myuser.projects.myproject[i].title = title;
        this.props.reduxUser(myuser)
        const validatetitle = validateTitle(title);

        console.log(i, validatetitle)
        if (validatetitle) {
          myuser.projects.myproject[i].invalid = validatetitle;
          this.setState({ message: validatetitle })
        } else {
          if (myuser.projects.myproject[i].hasOwnProperty("invalid")) {
            delete myuser.projects.myproject[i].invalid;
          }
          this.props.reduxUser(myuser)
          this.setState({ message: '' })

        }

      } else {
        let providerid = myuser.providerid;
        let projectid = makeID.projectid.call(this);
        let scope = this.state.scope;
        let address = this.state.address;
        let city = this.state.city
        let projectstate = this.state.projectstate;
        let zipcode = this.state.zipcode;
        let newProject = CreateProject(providerid, projectid, title, scope, address, city, projectstate, zipcode);
        if (myuser.hasOwnProperty("projects")) {
          myuser.projects.myproject.push(newProject)
        } else {
          myuser.projects = { myproject: [newProject] }
        }
        this.props.reduxUser(myuser)
        this.setState({ activeprojectid: projectid })


      }


    }






  }


  showprojectid(myproject) {
    const styles = MyStylesheet();
    const pm = new PM();
    const headerFont = pm.getHeaderFont.call(this);
    const regularFont = pm.getRegularFont.call(this);
    const myuser = pm.getuser.call(this);
    const touchIcon = pm.gettouchicon.call(this);
    const navigation = pm.getnavigation.call(this)
    const activebackground = () => {
      if (this.state.activeprojectid === myproject.projectid) {
        return (styles.activebackground)
      } else {
        return;
      }

    }
    const activeprojectid = () => {

      if (this.state.activeprojectid === myproject.projectid) {
        return (<div style={{ ...styles.generalContainer, ...regularFont, ...styles.generalFont, ...activebackground() }} onClick={() => { this.setState({ activeprojectid: false }) }}>
          <button style={{ ...styles.generalButton, ...touchIcon }}>{TouchIcon()} </button>Active Project is {myproject.title}, Touch to Make unactive
        </div>)
      } else {
        return (<div style={{ ...styles.generalContainer, ...regularFont, ...styles.generalFont, ...activebackground() }} onClick={() => { this.setState({ activeprojectid: myproject.projectid }) }}>
          <button style={{ ...styles.generalButton, ...touchIcon }}>{TouchIcon()} </button>   Touch to Make Active
        </div>)
      }

    }
    if (myuser) {
      let providerid = myuser.profile;
      return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
        <div style={{ ...styles.flex1 }}>

          {activeprojectid(myproject.projectid)}

          <div style={{ ...styles.generalFlex }}>
            <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter, ...headerFont }}>
              <Link


                to={`/${providerid}/myprojects/${myproject.title}`} style={{ ...headerFont, ...styles.generalFont, ...styles.generalLink }}> /{myproject.title}</Link>
            </div>
          </div>

          <div style={{ ...styles.generalFlex }}>
            <div style={{ ...styles.flex1, ...styles.showBorder, ...regularFont }}>
              <Link to={`/${providerid}/myprojects/${myproject.title}/charges`} style={{ ...regularFont, ...styles.generalFont, ...styles.generalLink }}>Add Charges</Link>
            </div>

          </div>

          <div style={{ ...styles.generalFlex }}>
            <div style={{ ...styles.flex1, ...styles.showBorder, ...regularFont, ...styles.alignCenter }}>
              <Link

                to={`/${providerid}/myprojects/${myproject.title}/specifications`} style={{ ...regularFont, ...styles.generalFont, ...styles.generalLink }}>Specifications</Link>
            </div>
            <div style={{ ...styles.flex1, ...styles.showBorder, ...regularFont, ...styles.alignCenter }}>
              <Link to={`/${providerid}/myprojects/${myproject.title}/costestimate`} style={{ ...regularFont, ...styles.generalFont, ...styles.generalLink }}> Cost Estimate</Link>
            </div>
          </div>

          <div style={{ ...styles.generalFlex }}>
            <div style={{ ...styles.flex1, ...styles.showBorder, ...regularFont, ...styles.alignCenter }}>
              <Link to={`/${providerid}/myprojects/${myproject.title}/team`} style={{ ...regularFont, ...styles.generalFont, ...styles.generalLink }}>Project Team</Link>
            </div>
            <div style={{ ...styles.flex1, ...styles.showBorder, ...regularFont, ...styles.alignCenter }}>
              <Link to={`/${providerid}/myprojects/${myproject.title}/milestones`} style={{ ...regularFont, ...styles.generalFont, ...styles.generalLink }}> Create Milestones</Link>
            </div>
          </div>
          <div style={{ ...styles.generalFlex }}>
            <div style={{ ...styles.flex1, ...styles.showBorder, ...regularFont, ...styles.alignCenter }}>
              <Link to={`/${providerid}/myprojects/${myproject.title}/bidschedule`} style={{ ...regularFont, ...styles.generalFont, ...styles.generalLink }}> View Bid Schedule </Link>
            </div>
            <div style={{ ...styles.flex1, ...styles.showBorder, ...regularFont, ...styles.alignCenter }}>
              <Link to={`/${providerid}/myprojects/${myproject.title}/bid`} style={{ ...regularFont, ...styles.generalFont, ...styles.generalLink }}> View Bid </Link>
            </div>
          </div>
          <div style={{ ...styles.generalFlex }}>
            <div style={{ ...styles.flex1, ...styles.showBorder, ...regularFont, ...styles.alignCenter }}>
              <Link to={`/${providerid}/myprojects/${myproject.title}/proposals`} style={{ ...regularFont, ...styles.generalFont, ...styles.generalLink }}> View Proposals</Link>
            </div>
            <div style={{ ...styles.flex1, ...styles.showBorder, ...regularFont, ...styles.alignCenter }}>
              <Link to={`/${providerid}/myprojects/${myproject.title}/invoices`} style={{ ...regularFont, ...styles.generalFont, ...styles.generalLink }}> View Invoices </Link>
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
    const makeID = new MakeID();
    if (myuser) {


      if (this.state.activeprojectid) {

        let i = pm.getprojectkeybyid.call(this, this.state.activeprojectid);
        myuser.projects.myproject[i].scope = scope;
        this.props.reduxUser(myuser)
        this.setState({ render: 'render' })

      } else {
        let providerid = myuser.providerid;
        let projectid = makeID.projectid.call(this);
        let title = this.state.title;
        let address = this.state.address;
        let city = this.state.city
        let projectstate = this.state.projectstate;
        let zipcode = this.state.zipcode;
        let newProject = CreateProject(providerid, projectid, title, scope, address, city, projectstate, zipcode);
        if (myuser.hasOwnProperty("projects")) {
          myuser.projects.myproject.push(newProject)
        } else {
          myuser.projects = { myproject: [newProject] }
        }
        this.setState({ activeprojectid: projectid })


      }

    }

  }
  getscope() {
    let pm = new PM();

    if (this.state.activeprojectid) {
      const myproject = pm.getprojectbyid.call(this, this.state.activeprojectid)
      return (myproject.scope)
    } else {
      return this.state.scope;
    }
  }
  handleaddress(address) {
    const pm = new PM();
    const myuser = pm.getuser.call(this);
    const makeID = new MakeID();
    if (myuser) {

      if (this.state.activeprojectid) {

        let i = pm.getprojectkeybyid.call(this, this.state.activeprojectid);
        myuser.projects.myproject[i].address = address;
        this.props.reduxUser(myuser)
        this.setState({ render: 'render' })

      } else {
        let providerid = myuser.providerid;
        let projectid = makeID.projectid.call(this);
        let title = this.state.title;
        let scope = this.state.scope;
        let city = this.state.city
        let projectstate = this.state.projectstate;
        let zipcode = this.state.zipcode;
        let newProject = CreateProject(providerid, projectid, title, scope, address, city, projectstate, zipcode);
        if (myuser.hasOwnProperty("projects")) {
          myuser.projects.myproject.push(newProject)
        } else {
          myuser.projects = { myproject: [newProject] }
        }
        this.setState({ activeprojectid: projectid })


      }

    }

  }
  getaddress() {
    let pm = new PM();
    if (this.state.activeprojectid) {
      const myproject = pm.getprojectbyid.call(this, this.state.activeprojectid);
      return (myproject.address)
    } else {
      return this.state.address;
    }
  }

  handlecity(city) {
    const pm = new PM();
    const myuser = pm.getuser.call(this);
    const makeID = new MakeID();
    if (myuser) {

      if (this.state.activeprojectid) {

        let i = pm.getprojectkeybyid.call(this, this.state.activeprojectid);
        myuser.projects.myproject[i].city = city;
        this.props.reduxUser(myuser)
        this.setState({ render: 'render' })

      } else {
        let providerid = myuser.providerid;
        let projectid = makeID.projectid.call(this);
        let title = this.state.title;
        let scope = this.state.scope;
        let address = this.state.address
        let projectstate = this.state.projectstate;
        let zipcode = this.state.zipcode;
        let newProject = CreateProject(providerid, projectid, title, scope, address, city, projectstate, zipcode);
        if (myuser.hasOwnProperty("projects")) {
          myuser.projects.myproject.push(newProject)
        } else {
          myuser.projects = { myproject: [newProject] }
        }
        this.setState({ activeprojectid: projectid })


      }


    }

  }
  getcity() {
    let pm = new PM();

    if (this.state.activeprojectid) {
      const myproject = pm.getprojectbyid.call(this, this.state.activeprojectid);
      return (myproject.city)
    } else {
      return this.state.city;
    }
  }
  handleprojectstate(projectstate) {
    const pm = new PM();
    const makeID = new MakeID();
    const myuser = pm.getuser.call(this);
    if (myuser) {

      if (this.state.activeprojectid) {

        let i = pm.getprojectkeybyid.call(this, this.state.activeprojectid);
        myuser.projects.myproject[i].projectstate = projectstate;
        this.props.reduxUser(myuser)
        this.setState({ render: 'render' })

      } else {
        let providerid = myuser.providerid;
        let projectid = makeID.projectid.call(this);
        let title = this.state.title;
        let scope = this.state.scope;
        let city = this.state.city
        let address = this.state.address;
        let zipcode = this.state.zipcode;
        let newProject = CreateProject(providerid, projectid, title, scope, address, city, projectstate, zipcode);
        if (myuser.hasOwnProperty("projects")) {
          myuser.projects.myproject.push(newProject)
        } else {
          myuser.projects = { myproject: [newProject] }
        }
        this.setState({ activeprojectid: projectid })


      }


    }

  }
  getprojectstate() {
    let pm = new PM();

    if (this.state.activeprojectid) {
      const myproject = pm.getprojectbyid.call(this, this.state.activeprojectid);
      return (myproject.projectstate)
    } else {
      return this.state.projectstate;
    }
  }
  handlezipcode(zipcode) {
    const pm = new PM();
    const makeID = new MakeID();
    const myuser = pm.getuser.call(this);
    if (myuser) {

      if (this.state.activeprojectid) {

        let i = pm.getprojectkeybyid.call(this, this.state.activeprojectid);
        myuser.projects.myproject[i].zipcode = zipcode;
        this.props.reduxUser(myuser)
        this.setState({ render: 'render' })

      } else {
        let providerid = myuser.providerid;
        let projectid = makeID.projectid.call(this);
        let title = this.state.title;
        let scope = this.state.scope;
        let city = this.state.city
        let projectstate = this.state.projectstate;
        let address = this.state.address;
        let newProject = CreateProject(providerid, projectid, title, scope, address, city, projectstate, zipcode);
        if (myuser.hasOwnProperty("projects")) {
          myuser.projects.myproject.push(newProject)
        } else {
          myuser.projects = { myproject: [newProject] }
        }
        this.setState({ activeprojectid: projectid })


      }


    }

  }
  getzipcode() {
    let pm = new PM();

    if (this.state.activeprojectid) {
      const myproject = pm.getprojectbyid.call(this, this.state.activeprojectid);
      return (myproject.zipcode)
    } else {
      return this.state.zipcode;
    }
  }
  showprojectform() {
    const pm = new PM();

    const styles = MyStylesheet();
    const regularFont = pm.getRegularFont.call(this)

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

  }

  async checkprojectid(newprojectid) {

    const pm = new PM();
    const myuser = pm.getuser.call(this)
    if (myuser) {



      let oldprojectid = this.state.activeprojectid;

      let errmsg = "";

      if (oldprojectid) {
        const project = pm.getprojectbyid.call(this, this.state.activeprojectid)
        if (project) {
          if (project.hasOwnProperty("invalid")) {
            errmsg += project.invalid;
          }
        }

      } // initial check project id

      if (!errmsg) {

        try {


          let values = { oldprojectid, newprojectid }
          let response = await CheckProjectID(values);

          if (response.hasOwnProperty("invalid") && this.state.activeprojectid) {
            let i = pm.getprojectkeybyid.call(this, this.state.activeprojectid)
            myuser.projects.myproject[i].invalid = response.invalid;
            this.props.reduxUser(myuser)
            this.setState({ message: response.invalid })

          } else if (response.hasOwnProperty("valid") && this.state.activeprojectid) {
            const myproject = pm.getprojectbyid.call(this, this.state.activeprojectid)
            if (myproject.hasOwnProperty("invalid")) {
              let i = pm.getprojectkeybyid.call(this, this.state.activeprojectid);
              delete myuser.projects.myproject[i].invalid;
              this.props.reduxUser(myuser)
              this.setState({ message: '' })
            }



          }


        } catch (err) {

          alert(err)

        }

      }


    } // if my user

  }

  handleregisternow() {
    const pm = new PM();
    const styles = MyStylesheet();
    const goIcon = pm.getGoIcon.call(this)

    if (this.state.activeprojectid) {
      const myproject = pm.getprojectbyid.call(this, this.state.activeprojectid)

      if (myproject) {

        if (!myproject.hasOwnProperty("invalid")) {
          return (<button style={{ ...styles.generalButton, ...goIcon }}>{purpleCheck()}</button>)
        }

      } else {
        return;
      }


    }


  }
  showprojectmenu() {
    const pm = new PM();
    const styles = MyStylesheet();
    const regularFont = pm.getRegularFont.call(this);


    return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
      <div style={{ ...styles.flex5, ...styles.generalFont, ...regularFont }}>
        Create A Project URL
          <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin, ...styles.generalField }}
          value={this.gettitle()}
          onChange={event => { this.handletitle(event.target.value) }}
          onBlur={event => { this.checkprojectid(event.target.value) }}
        />
      </div>
      <div style={{ ...styles.flex1 }}>
        {this.handleregisternow()}
      </div>
    </div>)

  }
  render() {
    const pm = new PM();
    const styles = MyStylesheet();
    const regularFont = pm.getRegularFont.call(this)
    const myuser = pm.getuser.call(this)
    const headerFont = pm.getHeaderFont.call(this)
    if (myuser) {
      return (
        <div style={{ ...styles.generalFlex }}>
          <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>

            <div style={{ ...styles.generalContainer,  ...styles.alignCenter }}>
              <Link to={`/${myuser.profile}/profile`} className="nav-link" style={{ ...headerFont, ...styles.generalLink, ...styles.boldFont, ...styles.generalFont }}>  /{myuser.profile} </Link>
            </div>
            <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
              <Link style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.boldFont }} to={`/${myuser.profile}/myprojects`}>  /myprojects  </Link>
            </div>



            {this.showprojectmenu()}



            {this.showprojectform()}

            {pm.showsaveproject.call(this)}

            {this.showprojectids()}



          </div>
        </div>)

    } else {
      return (<div><span style={{ ...styles.generalFont, ...regularFont }}>Please Login to View MyProjects</span></div>)
    }
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