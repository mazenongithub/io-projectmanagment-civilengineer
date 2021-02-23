import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import PM from './pm';
import { TouchIcon } from './svg';
import {Link} from 'react-router-dom';
import ProjectID from './projectid'

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      render: '', message: '', projectid: '', width: 0, height: 0, title: '', scope: '', address: '', city: '', projectstate: '', zipcode: '', projectidcheck: false, spinner:false
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)


  }
  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);
    this.updateWindowDimensions();
    const pm = new PM();
    const navigation = pm.getnavigation.call(this)
    if(navigation) {
      navigation.projectid = this.props.match.params.projectid;
      navigation.navigation = 'project'
      this.props.reduxNavigation(navigation)
      this.setState({render:'render'})
    }
  
 

  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }


  showactiveprojectid(projectid) {
    const pm = new PM();
    const styles = MyStylesheet();
    const regularFont = pm.getRegularFont.call(this)
    let myproject = pm.getproject.call(this)
    const touchIcon = pm.gettouchicon.call(this)
    let activebackground = pm.getactiveprojectbackground.call(this, projectid)
    if (myproject.projectid === projectid) {
      return (<div style={{ ...styles.generalContainer, ...regularFont, ...styles.generalFont, ...activebackground }} onClick={() => { this.props.reduxProject(false) }}>
        <button style={{ ...styles.generalButton, ...touchIcon }}>{TouchIcon()} </button>Active Project ID is {projectid}, Touch to Make unactive
      </div>)
    } else {
      return (<div style={{ ...styles.generalContainer, ...regularFont, ...styles.generalFont, ...activebackground }} onClick={() => { this.props.reduxProject({ projectid }) }}>
        <button style={{ ...styles.generalButton, ...touchIcon }}>{TouchIcon()} </button>   Touch to Make Active
      </div>)
    }
  }


  handlescope(scope) {
    const pm = new PM();
    const myuser = pm.getuser.call(this);
    if (myuser) {
      const myproject = pm.getproject.call(this)
      if (myproject) {
        let i = pm.getprojectkeybyid.call(this,myproject.projectid);
        myuser.projects[i].scope = scope;
        this.props.reduxUser(myuser)
        this.setState({ render: 'render' })

      }

    }

  }
  getscope() {
    let pm = new PM();
    let myproject = pm.getproject.call(this)
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
      const myproject = pm.getproject.call(this)
      if (myproject) {
        let i = pm.getprojectkeybyid.call(this,myproject.projectid);
        myuser.projects[i].address = address;
        this.props.reduxUser(myuser)
        this.setState({ render: 'render' })

      }

    }

  }
  getaddress() {
    let pm = new PM();
    let myproject = pm.getproject.call(this)
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
      const myproject = pm.getproject.call(this)
      if (myproject) {
        let i = pm.getprojectkeybyid.call(this,myproject.projectid);
        myuser.projects[i].city = city;
        this.props.reduxUser(myuser)
        this.setState({ render: 'render' })

      }

    }

  }
  getcity() {
    let pm = new PM();
    let myproject = pm.getproject.call(this)
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
      const myproject = pm.getproject.call(this)
      if (myproject) {
        let i = pm.getprojectkeybyid.call(this,myproject.projectid);
        myuser.projects[i].projectstate = projectstate;
        this.props.reduxUser(myuser)
        this.setState({ render: 'render' })

      }

    }

  }
  getprojectstate() {
    let pm = new PM();
    let myproject = pm.getproject.call(this)
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
      const myproject = pm.getproject.call(this)
      if (myproject) {
        let i = pm.getprojectkeybyid.call(this,myproject.projectid);
        myuser.projects[i].zipcode = zipcode;
        this.props.reduxUser(myuser)
        this.setState({ render: 'render' })

      }

    }

  }
  getzipcode() {
    let pm = new PM();
    let myproject = pm.getproject.call(this)
    if (myproject) {
      return (myproject.zipcode)
    } else {
      return this.state.zipcode;
    }
  }
  showprojectform() {
    const pm = new PM();
    const myproject = pm.getproject.call(this);
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




  render() {
    const pm = new PM();
    const styles = MyStylesheet();
    const regularFont = pm.getRegularFont.call(this)
    const myuser = pm.getuser.call(this)
    const headerFont = pm.getHeaderFont.call(this)
    const projectid = new ProjectID();
    if(myuser) {
      const project = pm.getproject.call(this)
      if(project) {
    return (

      <div style={{ ...styles.generalFlex }}>
        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>

      
            <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
              <Link style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.boldFont }} to={`/${myuser.profile}/myprojects/${project.title}`}>  /{project.title}  </Link>
            </div>


          {this.showprojectform()}

          {pm.showsaveproject.call(this)}

          {projectid.showprojectid.call(this)}

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
    allusers:state.allusers
  }
}

export default connect(mapStateToProps, actions)(Project)