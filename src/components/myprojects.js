import React, { Component } from 'react';
import { MyStylesheet } from './styles';
import PM from './pm';
import { goToIcon, TouchtoEdit, removeIconSmall, addIcon, updateProjects } from './svg';
import { CreateProject } from './functions';
import { Link } from 'react-router-dom';
import { validateTitle } from './functions';
import MakeID from './makeids';
import { HandleMyProjects } from './actions/api';



class MyProjects extends Component {

  gettitle() {
    const pm = new PM();
    if (this.state.activeprojectid) {
      const myproject = pm.getprojectbyid.call(this, this.state.activeprojectid);
      return myproject.Title;
    } else {
      return "";
    }
  }

  async updateMyProjects() {
    const pm = new PM();
    try {

      const myuser = pm.getuser.call(this)
      const user_id = myuser._ID;

      if (myuser) {
        const myprojects = pm.getMyProjects.call(this)
        if (myprojects) {
          const response = await HandleMyProjects(user_id, myprojects)
          if (response.hasOwnProperty("myprojects")) {
            const getmyprojects = response.myprojects
            this.props.reduxMyProjects(getmyprojects)
            this.setState({ render: 'render' })

          }

        }

      }


    } catch (err) {
      alert(`Could not handle Projects ${err}`)
    }

  }


  async addMyProject() {
    const pm = new PM();
    const makeID = new MakeID();
    const myprojects = pm.getMyProjects.call(this)
    const ProjectID = this.state.projectid;

    const myuser = pm.getuser.call(this)
    if (myuser) {

      if (myprojects) {

        if (this.state.projectid) {

          let UserID = myuser._ID;
          let Scope = ""
          let Address = ""
          let City = ""
          let Title = "";
          let ProjectState = "";
          let Zipcode = "";
          let ProjectNumber = "";
          let newProject = CreateProject(UserID, ProjectID, ProjectNumber, Title, Scope, Address, City, ProjectState, Zipcode);
          if (myprojects.hasOwnProperty("length")) {
            myprojects.push(newProject)
          } else {
            myprojects = [newProject]
          }

        }

        try {
          const user_id = myuser._ID;
          const response = await HandleMyProjects(user_id, myprojects)
          console.log(response)
          if (response.hasOwnProperty("myprojects")) {
            const getmyprojects = response.myprojects
            this.props.reduxMyProjects(getmyprojects)
            this.setState({ render: 'render' })

          }


        } catch (err) {
          alert(`Could not handle Projects ${err}`)
        }



      }


    }



  }

  removemyproject(ProjectID) {
    if (window.confirm(`Are you sure you want to remove ${ProjectID}?`)) {
      const pm = new PM();
      const myprojects = pm.getMyProjects.call(this)
      const myuser = pm.getuser.call(this)

      if (myuser) {
        console.log(myuser)

        const project = pm.getMyProjectByID.call(this, ProjectID)

        if (project) {
          console.log(project)
          const i = pm.getMyProjectKeyByID.call(this, ProjectID)
          console.log(myprojects, i)
          myprojects.splice(i, 1)
          this.props.reduxMyProjects(myprojects)
          this.setState({ render: 'render' })
        }
      }
    }
  }

  showprojectid(myproject) {
    const styles = MyStylesheet();
    const pm = new PM();
    const regularFont = pm.getRegularFont.call(this);
    const myuser = pm.getuser.call(this);
    const touchtoedit = pm.touchtoedit.call(this);
    const buttonSize = pm.getButtonSize.call(this)
    const removeIcon = pm.getremoveicon.call(this)
    const myprojects = new MyProjects();
    const activebackground = () => {
      if (this.state.activeprojectid === myproject.ProjectID) {
        return (styles.activebackground)
      } else {
        return ({ backgroundColor: '#FFFFFF' })
      }

    }

    return (
      <div style={{ ...styles.generalContainer, ...styles.generalFlex }} key={myproject.ProjectID}>

        <div style={{ ...styles.flex2, ...activebackground(myproject.ProjectID), ...styles.bottomMargin15 }}>
          <Link style={{ ...styles.generalFont, ...regularFont, ...styles.generalLink }}
            to={`/${myuser.UserID}/projects/${myproject.ProjectID}`}>
            <button style={{ ...activebackground(myproject.ProjectID), ...buttonSize, ...styles.noBorder }}>{goToIcon()}</button> /{myproject.ProjectID}</Link>
        </div>
        <div style={{ ...styles.flex1 }}>

          <button onClick={() => { myprojects.removemyproject.call(this, myproject.ProjectID) }} style={{ ...styles.generalButton, ...removeIcon }}>{removeIconSmall()} </button>
          <span style={{ ...styles.generalFont, ...regularFont }}>Remove Project</span>
        </div>
      </div>


    )

  }

  showprojectids() {
    const pm = new PM()
    const projects = new MyProjects();

    let myprojects = pm.getMyProjects.call(this)
    let getprojects = [];
    if (myprojects) {
      // eslint-disable-next-line
      myprojects.map(myproject => {
        getprojects.push(projects.showprojectid.call(this, myproject))
      })
    }
    return getprojects;
  }


  makeprojectactive(projectid) {
    if (this.state.activeprojectid === projectid) {
      this.setState({ activeprojectid: false })
    } else {
      this.setState({ activeprojectid: projectid })
    }
  }
  handleprojectstate(projectstate) {
    const pm = new PM();
    const makeID = new MakeID();
    const myprojects = pm.getMyProjects.call(this)

    const myuser = pm.getuser.call(this)
    if (myuser) {

      if (myprojects) {

        if (this.state.activeprojectid) {

          let i = pm.getprojectkeybyid.call(this, this.state.activeprojectid);
          myprojects[i].projectstate = projectstate;
          this.props.reduxMyProjects(myprojects)
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
            myprojects.push(newProject)
          } else {
            myprojects = { myproject: [newProject] }
          }



        }


      }


    }

  }





  showProjectID() {

    const pm = new PM();
    const styles = MyStylesheet();
    const regularFont = pm.getRegularFont.call(this);
    const myprojects = new MyProjects();


    const buttonWidth = { width: '90px' }

    if (this.state.width > 600) {



      return (
        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
          <div style={{ ...styles.flex1 }}>
            &nbsp;
          </div>
          <div style={{ ...styles.flex4 }}>
            <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }}
              value={this.state.projectid}
              onChange={(event) => { this.setState({ projectid: event.target.value }) }} />
            <div style={{ ...styles.generalContainer, ...styles.generalFont }}>
              <span style={{ ...regularFont }}>Project ID</span>
            </div>
          </div>
          <div style={{ ...styles.flex1 }}>
            <button onClick={() => { myprojects.addMyProject.call(this) }}
              style={{ ...styles.generalButton, ...buttonWidth }}>{addIcon()}</button>
          </div>
        </div>)

    } else {


      return (
        <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>


          <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
            <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }}
              value={this.state.projectid}
              onChange={(event) => { this.setState({ projectid: event.target.value }) }} />
          </div>
          <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
            <span style={{ ...regularFont }}>Project ID</span>
          </div>

          <div style={{ ...styles.generalContainer, ...styles.textAlignRight, ...styles.bottomMargin15 }}>
            <button style={{ ...styles.generalButton, ...buttonWidth }} onClick={() => { myprojects.addMyProject.call(this) }}>{addIcon()}</button>
          </div>




        </div>
      )

    }

  }


  showProjects() {
    const pm = new PM();
    const styles = MyStylesheet();
    const regularFont = pm.getRegularFont.call(this)
    const myuser = pm.getuser.call(this)
    const myprojects = new MyProjects();
    const projectIcon = () => {
      if (this.state.width > 800) {
        return ({ width: '190px' })
      } else {
        return ({ width: '150px' })
      }
    }
    if (myuser) {
      return (

        <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>



          {myprojects.showProjectID.call(this)}


          <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.alignCenter }}>

            <button style={{ ...styles.generalButton, ...projectIcon() }} onClick={() => { myprojects.updateMyProjects.call(this) }}>{updateProjects()}</button>

          </div>



          {myprojects.showprojectids.call(this)}





        </div>
      )

    } else {
      return (<div><span style={{ ...styles.generalFont, ...regularFont }}>Please Login to View MyProjects</span></div>)
    }
  }
}



export default MyProjects