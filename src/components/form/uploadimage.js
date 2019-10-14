import React, { Component } from 'react';
import './fields.css';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { UploadProfileImage } from '../actions/api'
class UploadImage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            render: 'render'
        }
    }
    componentDidMount() {

    }
    async uploadprofileimage(event) {
        console.log(event)
        let formData = new FormData();
        let myfile = document.getElementById("uploadprofileimage");
        console.log(myfile.files)
        // HTML file input, chosen by user
        formData.append("profilephoto", myfile.files[0]);
        console.log(formData)
        let response = await UploadProfileImage(formData);
        console.log(response)
    }
    render() {

        return (
            <div className="profile-field">
       UploadImage
       <br/>
       <input type="file" name="profileimage" id="uploadprofileimage"
       className="project-field"/>
       <br/>
       <button className="uploadprofileimage"
       onClick={event=>{this.uploadprofileimage(event)}}> 
       <img src="https://www.goandhireme.com/svg/uploadprofileimage.svg"
       alt="uploadprofileimage"/>
       </button>
       </div>)
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        uploadimage: state.uploadimage

    }
}

export default connect(mapStateToProps, actions)(UploadImage)
