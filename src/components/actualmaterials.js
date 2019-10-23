import React, { Component } from 'react';
import { connect } from 'react-redux';
import './myprojects.css';
import * as actions from './actions'
import MyActualMaterials from './myactualmaterials';
import ShowActualMaterials from './showactualmaterials';

class ActualMaterials extends Component {
    componentDidMount() {
        let projectid = this.props.match.params.projectid
        this.props.reduxNavigation({ navigation: "actualmaterials" })
        this.props.ProjectID({ projectid })


    }

    getservicetype() {
        let servicetype = false;
        if (this.props.projectid.projectid) {
            let projectid = this.props.match.params.projectid;

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

        }
        return servicetype;
    }
    handleactualmaterials() {

        if (this.props.projectsprovider.hasOwnProperty("length") || this.props.projects.hasOwnProperty("length")) {
            let servicetype = this.getservicetype();
            if (servicetype === "manager") {
                return (<ShowActualMaterials />)
            }
            else if (servicetype === "provider") {
                return (<MyActualMaterials />)
            }
        }
        else {
            return (<span> &nbsp;</span>)
        }

    }
    render() {
        return (this.handleactualmaterials())
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

export default connect(mapStateToProps, actions)(ActualMaterials)
