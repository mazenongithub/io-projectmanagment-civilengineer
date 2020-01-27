import { ClientLogin } from './actions/api';
import firebase from 'firebase/app';
import 'firebase/auth';
import { MyUserModel } from './functions'
class PM {

    getuser() {
        let user = false;
        if (this.props.myusermodel) {
            if (this.props.myusermodel.hasOwnProperty("providerid")) {
                user = this.props.myusermodel.providerid;
            }
        }
        return user;
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