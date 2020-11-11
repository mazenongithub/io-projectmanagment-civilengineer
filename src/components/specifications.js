import React, { Component } from 'react';
import { MyStylesheet } from './styles'
import PM from './pm'
import { connect } from 'react-redux';
import * as actions from './actions';
import { Link } from 'react-router-dom'
import { LoadCSIs } from './actions/api'

class Specifications extends Component {

    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0 }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }
    componentDidMount() {
        const pm = new PM();
        window.addEventListener('resize', this.updateWindowDimensions);


    }
    async loadcsis() {
        try {
            let response = await LoadCSIs();
            if (response.hasOwnProperty("csis")) {
                this.props.reduxCSIs(response.csis);

            }

        } catch (err) {
            alert(err)
        }
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    showspecification(spec) {
        const pm = new PM();
        const csiid = spec.csiid;
        const csi = pm.getcsibyid.call(this, csiid)
        const styles = MyStylesheet();
        const regularFont = pm.getRegularFont.call(this)
        const profile = this.props.match.params.providerid;
        const projectid = this.props.match.params.projectid;
        return (
            <div style={{ ...styles.generalContainer }}>
                <Link style={{ ...styles.generalFont, ...regularFont, ...styles.generalLink }} to={`/${profile}/myprojects/${projectid}/specifications/${csi.csiid}`}>{csi.csi} - {csi.title}</Link>
            </div>
        )

    }

    showspecifications() {
        const pm = new PM();
        const myproject = pm.getprojectbytitle.call(this, this.props.match.params.projectid)
        let specids = [];
        if (myproject) {
            const specs = pm.getspecficationsbyprojectid.call(this, myproject.projectid)
            console.log(specs)
            if (specs) {
                // eslint-disable-next-line
                specs.map(spec => {
                    specids.push(this.showspecification(spec))
                })
            }
        }
        return specids;
    }

    render() {
        const styles = MyStylesheet();
        const pm = new PM();
        const headerFont = pm.getHeaderFont.call(this)
        const myuser = pm.getuser.call(this)
        const regularFont = pm.getRegularFont.call(this)
        const csis = pm.getcsis.call(this)
        if (!csis) {
            pm.loadcsis.call(this)
        }

        if (myuser) {
            const project = pm.getproject.call(this)

            if (project) {

                if (!project.hasOwnProperty("specifications")) {
                    pm.loadprojectspecs.call(this, project.projectid)
                }


                return (
                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1 }}>

                            <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                <Link to={`/${myuser.profile}/profile`} className="nav-link" style={{ ...headerFont, ...styles.generalLink, ...styles.boldFont, ...styles.generalFont }}>  /{myuser.profile} </Link>
                            </div>

                            <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                <Link style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.boldFont }} to={`/${myuser.profile}/myprojects`}>  /myprojects  </Link>
                            </div>

                            <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                <Link style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.boldFont }} to={`/${myuser.profile}/myprojects/${project.title}`}>  /{project.title}  </Link>
                            </div>

                            <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                <Link style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.boldFont }} to={`/${myuser.profile}/myprojects/${project.title}/specifications`}>  /specifications  </Link>
                            </div>


                            {this.showspecifications()}

                        </div>
                    </div>)

            } else {
                return (<div style={{ ...styles.generalContainer }}>
                    <span style={{ ...styles.generalFont, ...regularFont }}> Project Not Found </span>
                </div>)

            }

        } else {
            return (<div style={{ ...styles.generalContainer }}>
                <span style={{ ...styles.generalFont, ...regularFont }}> Please Login to View Specifications</span>
            </div>)
        }


    }

}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation,
        project: state.project,
        allusers: state.allusers,
        allcompanys: state.allcompanys,
        csis: state.csis
    }
}

export default connect(mapStateToProps, actions)(Specifications);