import React from 'react';
import { ClientLogin } from './actions/api';
import firebase from 'firebase/app';
import 'firebase/auth';
import { MyUserModel } from './functions';
import { MyStylesheet } from './styles';
import { projectSaveAll } from './svg'

class PM {
    getGoIcon() {
        if (this.state.width > 1200) {
            return ({ width: '101px', height: '85px' })
        } else if (this.state.width > 800) {
            return ({ width: '80px', height: '75px' })
        } else {
            return ({ width: '60px', height: '55px' })
        }
    }
    getuser() {
        let user = false;
        if (this.props.myusermodel) {
            if (this.props.myusermodel.hasOwnProperty("providerid")) {
                user = this.props.myusermodel;
            }
        }
        return user;
    }
    getnavigation() {
        let navigation = false;
        if (this.props.navigation) {
            if (this.props.navigation.hasOwnProperty("navigation")) {
                navigation = this.props.navigation.navigation;
            }

        }
        return navigation;
    }
    getRegularFont() {
        const styles = MyStylesheet();
        if (this.state.width > 800) {
            return (styles.font30)
        } else {
            return (styles.font24)
        }

    }
    getactiveprojectbackground(projectid) {
        const pm = new PM();
        let activeprojectid = pm.getactiveprojectid.call(this);
        if (activeprojectid) {
            if (projectid === activeprojectid) {
                return ({ backgroundColor: '#F7DAF4' })
            } else {
                return;
            }
        } else {
            return;
        }
    }
    getHeaderFont() {
        const styles = MyStylesheet();
        if (this.state.width > 800) {
            return (styles.font40)
        } else {
            return (styles.font30)
        }

    }
    getallprojects() {
        const pm = new PM();
        let allprojects = [];
        const myuser = pm.getuser.call(this);
        if (myuser) {
            if (myuser.hasOwnProperty("projects")) {
                allprojects = myuser.projects.myproject;
            }

        }
        return allprojects;

    }
    getactiveproject() {
        let pm = new PM();
        let myprojects = pm.getallprojects.call(this);
        let projectid = pm.getactiveprojectid.call(this);
        console.log(myprojects, projectid)
        let myproject = false;
        if (myprojects && projectid) {
            // eslint-disable-next-line
            myprojects.map(project => {
                if (project.projectid === projectid) {
                    myproject = project;
                }
            })
        }
        return myproject;
    }
    getactiveprojectkey() {
        let pm = new PM();
        let myprojects = pm.getprojects.call(this);
        let projectid = pm.getactiveprojectid.call(this);
        let key = false;
        if (myprojects && projectid) {
            // eslint-disable-next-line
            myprojects.map((project, i) => {
                if (project.projectid === projectid) {
                    key = i;
                }
            })
        }
        return key;
    }
    getactiveprojectid() {
        let projectid = "";
        if (this.props.project.hasOwnProperty("projectid")) {
            projectid = this.props.project.projectid;
        }
        console.log(projectid)
        return projectid;
    }
    getprojects() {
        let projects = [];
        let pm = new PM();
        let myuser = pm.getuser.call(this);
        if (myuser) {
            if (myuser.hasOwnProperty("projects")) {
                projects = myuser.projects.myproject;
            }
        }
        return projects;
    }
    getteamprofile() {
        if (this.state.width > 800) {
            return ({ width: '200px', height: '150px' })
        } else {
            return ({ width: '160px', height: '120px' })
        }
    }
    getproviderbyid(providerid) {
        let provider = false;
        if (this.props.allusers) {
            console.log(` PM FOUND ALL USERS`)
            if (this.props.allusers.hasOwnProperty("myuser")) {
                console.log(` PM SEARCHING FOR ${providerid}`)
                // eslint-disable-next-line
                this.props.allusers.myuser.map(myuser => {

                    if (myuser.providerid === providerid) {
                        console.log(` PROVIDER FOUND`)
                        provider = myuser;
                    }
                })

            }
        }
        return provider;
    }
    getprojectteam() {
        const pm = new PM();
        const myproject = pm.getproject.call(this);
        let myteam = false;
        if (myproject.hasOwnProperty("projectteam")) {
            myteam = myproject.projectteam.myteam;
        }
        return myteam;
    }
    getproject() {
        let pm = new PM();
        let myuser = pm.getuser.call(this)
        let project = false;
        let projectid = this.props.match.params.projectid;
        if (myuser) {
            if (myuser.hasOwnProperty("projects")) {
                // eslint-disable-next-line
                myuser.projects.myproject.map(myproject => {
                    if (myproject.projectid === projectid) {
                        project = myproject;
                    }
                })
            }

        }

        return project;
    }
    getSmallFont() {
        const styles = MyStylesheet();
        if (this.state.width > 800) {
            return (styles.font20)
        } else {
            return (styles.font18)
        }

    }
    getprojectkey() {
        const pm = new PM();
        let key = false;
        const projects = pm.getprojects.call(this)
        if (projects) {
            let projectid = this.props.match.params.projectid;
            // eslint-disable-next-line
            projects.map((myproject, i) => {
                if (myproject.projectid === projectid) {
                    key = i;
                }
            })
        }
        return key;
    }
    getprojectid() {
        let projectid = "";
        if (this.props.project) {
            if (this.props.project.hasOwnProperty("projectid")) {
                projectid = this.props.project.projectid;
            }

        }
        return projectid;
    }
    gettouchicon() {
        if (this.state.width > 800) {
            return ({
                width: '58px',
                height: '84px'
            })

        } else {
            return ({
                width: '44px',
                height: '59px'
            })
        }

    }

    getcolumns() {
        if (this.state.width > 1200) {
            return ({ gridTemplateColumns: '33% 33% 34%' })

        } else if (this.state.width > 800) {
            return ({ gridTemplateColumns: '50% 50%' })

        } else {
            return ({ gridTemplateColumns: 'auto' })
        }
    }
    getallusers() {
        let allusers = false;
        if (this.props.allusers) {
            if (this.props.allusers.hasOwnProperty("myuser")) {
                allusers = this.props.allusers.myuser;
            }

        }
        return allusers;
    }
    getsaveprojecticon() {
        if (this.state.width > 800) {
            return ({
                width: '377px',
                height: '84px'
            })

        } else {
            return ({
                width: '225px',
                height: '60px'
            })
        }

    }
    showsaveproject() {
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this);
        const saveprojecticon = pm.getsaveprojecticon.call(this);
        console.log(saveprojecticon)
        const styles = MyStylesheet();
        return (
            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.generalFont, ...regularFont, ...styles.topMargin15, ...styles.bottomMargin15 }}>
                    &nbsp;
            </div>

                <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                    <button style={{ ...styles.generalButton, ...saveprojecticon }} onClick={() => { pm.savemyproject.call(this) }}>{projectSaveAll()}</button>
                </div>
            </div>)
    }
    async appleSignIn() {
        let provider = new firebase.auth.OAuthProvider('apple.com');

        provider.addScope('email');
        provider.addScope('name');
        try {
            let result = await firebase.auth().signInWithPopup(provider)

            // The signed-in user info.
            var user = result.user;
            console.log(user.providerData[0])
            let client = 'apple';
            let clientid = user.providerData[0].uid;
            let firstname = '';
            if (user.providerData[0].displayName) {
                firstname = user.providerData[0].displayName.split(' ')[0]
            }

            let lastname = '';
            if (user.providerData[0].displayName) {
                lastname = user.providerData[0].displayName.split(' ')[1]
            }
            let emailaddress = user.providerData[0].email;
            let profileurl = user.providerData[0].photoURL;
            let phonenumber = user.phoneNumber;
            let values = { client, clientid, firstname, lastname, emailaddress, profileurl, phonenumber }
            const response = await ClientLogin(values);
            if (response.hasOwnProperty("projects")) {
                this.props.reduxProjects(response.projects.myproject)
            }
            if (response.hasOwnProperty("providerid")) {

                let myusermodel = MyUserModel(response.providerid, response.client, response.clientid, response.firstname, response.lastname, response.address, response.city, response.contactstate, response.zipcode, response.emailaddress, response.phonenumber, response.profileurl)

                this.props.updateUserModel(myusermodel)
            }



        } catch (error) {

            alert(error.message);

        }


    }

    async googleSignIn() {


        try {


            let provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('email');
            provider.addScope('profile');
            let result = await firebase.auth().signInWithPopup(provider)
            var user = result.user;
            console.log(user.providerData[0]);
            let client = 'google';
            let clientid = user.providerData[0].uid;
            let firstname = '';
            if (user.providerData[0].displayName) {
                firstname = user.providerData[0].displayName.split(' ')[0]
            }

            let lastname = '';
            if (user.providerData[0].displayName) {
                lastname = user.providerData[0].displayName.split(' ')[1]
            }
            let emailaddress = user.providerData[0].email;
            let profileurl = user.providerData[0].photoURL;
            let phonenumber = user.phoneNumber;
            let values = { client, clientid, firstname, lastname, emailaddress, profileurl, phonenumber }
            console.log(values)
            const response = await ClientLogin(values);
            if (response.hasOwnProperty("projects")) {
                this.props.reduxProjects(response.projects.myproject)
            }
            if (response.hasOwnProperty("providerid")) {

                let myusermodel = MyUserModel(response.providerid, response.client, response.clientid, response.firstname, response.lastname, response.address, response.city, response.contactstate, response.zipcode, response.emailaddress, response.phonenumber, response.profileurl)

                this.props.updateUserModel(myusermodel)
            }


        } catch (error) {
            alert(error)
        }


    }

}
export default PM;