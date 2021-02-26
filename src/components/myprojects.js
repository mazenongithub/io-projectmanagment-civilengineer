import React, { Component } from 'react';
import { MyStylesheet } from './styles';
import PM from './pm';
import { purpleCheck, goToIcon, TouchtoEdit, removeIconSmall } from './svg';
import { CreateProject } from './functions';
import { Link } from 'react-router-dom';
import { CheckProjectID } from './actions/api'
import { validateTitle } from './functions';
import MakeID from './makeids';
import Profile from './profile';


class MyProjects extends Component {

  gettitle() {
    const pm = new PM();
    if (this.state.activeprojectid) {
      const myproject = pm.getprojectbyid.call(this, this.state.activeprojectid);
      return myproject.title;
    } else {
      return "";
    }
  }


  handletitle(title) {
    const pm = new PM();
    const makeID = new MakeID();
    const myuser = pm.getuser.call(this);


    if (myuser) {

      if (this.state.activeprojectid) {
        const project = pm.getprojectbyid.call(this,this.state.activeprojectid)
        if(project) {
        let i = pm.getprojectkeybyid.call(this, this.state.activeprojectid);

        myuser.projects[i].title = title;
      
        const message = validateTitle(title);
    

        if (message) {
          myuser.projects[i].invalid = message;
        
        } else {
          if (myuser.projects[i].hasOwnProperty("invalid")) {
            delete myuser.projects[i].invalid;
          }

          

        }

        this.props.reduxUser(myuser)
        this.setState({ message })

      }

      } else {
        let providerid = myuser.providerid;
        let projectid = makeID.projectid.call(this);
        let scope = ""
        let address = ""
        let city = ""
        let projectstate = "";
        let zipcode = "";
        let newProject = CreateProject(providerid, projectid, title, scope, address, city, projectstate, zipcode);
        if (myuser.hasOwnProperty("projects")) {
          myuser.projects.push(newProject)
        } else {
          myuser.projects = [newProject] 
        }
        this.props.reduxUser(myuser)
        this.setState({ activeprojectid: projectid })


      }


    }






  }

  removemyproject(myproject) {
    if(window.confirm(`Are you sure you want to remove ${myproject.title}?`)) {
      const pm = new PM();
      const myuser = pm.getuser.call(this);
      if(myuser) {
        const project = pm.getprojectbyid.call(this,myproject.projectid);
        if(project) {
          const i = pm.getprojectkeybyid.call(this,myproject.projectid)
          myuser.projects.splice(i,1)
          this.props.reduxUser(myuser)
          this.setState({activeprojectid:false})
        }
      }
    }
  }

  showprojectid(myproject) {
    const styles = MyStylesheet();
    const pm = new PM();
    const headerFont = pm.getHeaderFont.call(this);
    const regularFont = pm.getRegularFont.call(this);
    const myuser = pm.getuser.call(this);
    const touchtoedit = pm.touchtoedit.call(this);
    const buttonSize = pm.getButtonSize.call(this)
    const removeIcon = pm.getremoveicon.call(this)
    const myprojects = new MyProjects();
    const activebackground = () => {
      if (this.state.activeprojectid === myproject.projectid) {
        return (styles.activebackground)
      } else {
        return ({backgroundColor:'#FFFFFF'})
      }

    }

    return(
      <div style={{ ...styles.generalContainer }} key={myproject.projectid}>

          <div style={{ ...styles.generalContainer, ...activebackground(myproject.projectid), ...styles.bottomMargin15 }}>
              <Link style={{ ...styles.generalFont, ...regularFont, ...styles.generalLink }}
                  to={`/${myuser.profile}/projects/${myproject.title}`}>
                  <button style={{ ...activebackground(myproject.projectid), ...buttonSize, ...styles.noBorder }}>{goToIcon()}</button> /{myproject.title}</Link>
          </div>

          <div style={{ ...styles.generalFlex }}>

              <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont, ...styles.bottomMargin15 }} key={myproject.projectid}>
                  <button style={{ ...styles.noBorder, ...touchtoedit, ...activebackground(myproject.projectid) }}
                      onClick={() => { myprojects.makeprojectactive.call(this, myproject.projectid) }}
                  >{TouchtoEdit()}</button>
              </div>
              <div style={{ ...styles.flex1 }} onClick={() => { myprojects.removemyproject.call(this, myproject) }}> <button style={{ ...styles.generalButton, ...removeIcon, ...styles.alignRight, ...activebackground(myproject.projectid) }}>{removeIconSmall()} </button></div>
          </div>
      </div>)
  
  }

  showprojectids() {
    const pm = new PM()
    const projects = new MyProjects();
    let myprojects = pm.getprojects.call(this)
    let getprojects = [];
    if(myprojects) {
    // eslint-disable-next-line
    myprojects.map(myproject => {
      getprojects.push(projects.showprojectid.call(this,myproject))
    })
  }
    return getprojects;
  }


  makeprojectactive(projectid) {
    if(this.state.activeprojectid === projectid) {
      this.setState({activeprojectid:false})
    } else {
      this.setState({activeprojectid:projectid})
    }
  }
  handleprojectstate(projectstate) {
    const pm = new PM();
    const makeID = new MakeID();
    const myuser = pm.getuser.call(this);
    if (myuser) {

      if (this.state.activeprojectid) {

        let i = pm.getprojectkeybyid.call(this, this.state.activeprojectid);
        myuser.projects[i].projectstate = projectstate;
        this.props.reduxUser(myuser)
        this.setState({ render: 'render' })

      } else {
        let providerid = myuser.providerid;
        let projectid = makeID.projectid.call(this);
        let title = "";
        let scope = this.state.scope;
        let city = ""
        let address = ""
        let zipcode = "";
        let newProject = CreateProject(providerid, projectid, title, scope, address, city, projectstate, zipcode);
        if (myuser.hasOwnProperty("projects")) {
          myuser.projects.push(newProject)
        } else {
          myuser.projects = { myproject: [newProject] }
        }
        this.setState({ activeprojectid: projectid })


      }


    }

  }

 

showprojectmenu() {
    const pm = new PM();
    const styles = MyStylesheet();
    const regularFont = pm.getRegularFont.call(this);
    const myprojects = new MyProjects();


    return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
      <div style={{ ...styles.flex5 }}>
        <span style={{ ...styles.generalFont, ...regularFont}}> Create A Project</span>
          <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin, ...styles.generalField }}
          value={myprojects.gettitle.call(this)}
          onChange={event => { myprojects.handletitle.call(this,event.target.value) }}
        />
      </div>

    </div>)

  }
  showProjects() {
    const pm = new PM();
    const styles = MyStylesheet();
    const regularFont = pm.getRegularFont.call(this)
    const myuser = pm.getuser.call(this)
    const headerFont = pm.getHeaderFont.call(this)
    const myprojects = new MyProjects();
    if (myuser) {
      return (
        <div style={{ ...styles.generalFlex }}>
          <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>



            {myprojects.showprojectmenu.call(this)}

            {myprojects.showprojectids.call(this)}

            {pm.showsaveproject.call(this)}


          </div>
        </div>)

    } else {
      return (<div><span style={{ ...styles.generalFont, ...regularFont }}>Please Login to View MyProjects</span></div>)
    }
  }
}



export default MyProjects