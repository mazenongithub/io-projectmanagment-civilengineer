import React, { Component } from 'react';
import { connect } from 'react-redux';
import ShowActualLabor from './showactuallabor';
import MyActualLabor from './myactuallabor';
import * as actions from './actions'
import { loadmyprojects } from './actions/api';
import { MyUserModel } from './functions';
import './myprojects.css';


class ProjectActualLabor extends Component {
    constructor(props) {
        super(props)
        this.state = { render: '' }

    }
    componentDidMount() {
        let projectid = this.props.match.params.projectid
        this.props.reduxNavigation({ navigation: "actuallabor" })
        this.props.ProjectID({ projectid })
   
    }
  


    getservicetype() {
        let servicetype = false;

        let projectid = this.props.match.params.projectid;
        console.log(projectid)
        if (this.props.projects.hasOwnProperty("length")) {
            // eslint-disable-next-line
            this.props.projects.map(myproject => {
                if (myproject.projectid === projectid) {
                    servicetype = myproject.servicetype;
                }
            })
        } //maps projects

        if (!servicetype) {
            if (this.props.projectsprovider.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projectsprovider.map(myproject => {
                    if (myproject.projectid === projectid) {
                        servicetype = myproject.servicetype;
                    }
                })
            } //maps projects
        }


        return servicetype;
    }

    handleSchedulelabor() {
        if (this.props.projects.hasOwnProperty("length") || this.props.projectsprovider.hasOwnProperty("length")) {
            let servicetype = this.getservicetype();
            if (servicetype === "provider") {
                return (<MyActualLabor/>)
            }
            else if (servicetype === "manager") {
                return (<ShowActualLabor/>)
            }
            else {
                return (<span>&nbsp; </span>)
            }
        }
        else {
            return (<span>&nbsp; </span>)
        }

    }

    render() {
        return (

            this.handleSchedulelabor()
        )
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

export default connect(mapStateToProps, actions)(ProjectActualLabor)
