import React, { Component } from 'react';
import { MyStylesheet } from './styles'
import PM from './pm'
import { connect } from 'react-redux';
import * as actions from './actions';
import { sortpart, LetterCounter } from './functions'

class Specification extends Component {

    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0 }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }
    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.props.reduxNavigation({ navigation: "specification", csiid:this.props.match.params.csiid })
        this.props.reduxProject({ projectid: this.props.match.params.projectid })
        this.updateWindowDimensions();

    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    showpart(section) {
        const pm = new PM()
        const styles = MyStylesheet();
        const headerFont = pm.getHeaderFont.call(this)

        const extra = () => {
            switch (Number(section.part)) {
                case 1:
                    return ("GENERAL INFORMATION")
                case 2:
                    return ('MATERIALS')
                case 3:
                    return ('EXECUTION')
                default:
                    break;
            }
        }

        return (<div style={{ ...styles.generalFont, ...headerFont }} key={`${section.sectionid}part`}>Part {section.part} {extra()}</div>)
    }

    showcontent(content, i) {
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this)
        const styles = MyStylesheet();
        const counter = LetterCounter(i + 1)


        return (
            <div style={{ ...styles.generalContainer, ...styles.marginLeft30 }} key={content.contentid}>
                <span style={{ ...styles.generalFont, ...regularFont }}> {counter}. {content.content}</span>
            </div>
        )


    }

    showspecsection(section, i) {

        const pm = new PM()
        const styles = MyStylesheet();
        const headerFont = pm.getHeaderFont.call(this)
        const project = pm.getprojectbytitle.call(this, this.props.match.params.projectid)
        const projectid = project.projectid;
        const csiid = this.props.match.params.csiid;
        const sectionnumber = pm.getsectionnumberbyid.call(this, projectid, csiid, section.sectionid);
       

        return (<div style={{ ...styles.generalContainer }} key={`${section.sectionid}section`} ><span style={{ ...styles.generalFont, ...headerFont }}>{section.part}.{sectionnumber} {section.title} </span></div>)
    }

    showsubcontent(subcontent, j) {
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this)
        const styles = MyStylesheet();

        return (<div style={{ ...styles.generalContainer, ...styles.marginLeft60 }} key={subcontent.subcontentid}
        ><span style={{ ...styles.generalFont, ...regularFont }}
        >{j + 1}. {subcontent.subcontent} </span>
        </div>
        )

    }

    showspecification() {
        const pm = new PM();
        const myproject = pm.getprojectbytitle.call(this, this.props.match.params.projectid)
        let myspec = [];
        if (myproject) {
            const projectid = myproject.projectid;
            const csiid = this.props.match.params.csiid;
            const spec = pm.getspecficationbycsi.call(this, projectid, csiid)
            console.log(spec)


            if (spec) {



                if (spec.hasOwnProperty("sections")) {

                    spec.sections.sort((b, a) => {
                        return sortpart(b, a)
                    })

                    // eslint-disable-next-line
                    spec.sections.map((section, i) => {

                        if (i === 0) {
                            myspec.push(this.showpart(section))
                        } else if (section.part !== spec.sections[i - 1].part) {
                            myspec.push(this.showpart(section))
                        }

                        myspec.push(this.showspecsection(section, i))

                        if (section.hasOwnProperty("content")) {
                            // eslint-disable-next-line
                            section.content.map((content, i) => {
                                myspec.push(this.showcontent(content, i))

                                if (content.hasOwnProperty("subcontent")) {
                                    // eslint-disable-next-line
                                    content.subcontent.map((subcontent, j) => {
                                        myspec.push(this.showsubcontent(subcontent, j))
                                    })
                                }


                            })





                        }



                    })
                }

            }



        }
        return myspec;
    }

    render() {
        const styles = MyStylesheet();
        const pm = new PM();
        const headerFont = pm.getHeaderFont.call(this);
        const csi = pm.getcsibyid.call(this, this.props.match.params.csiid)

        return (<div style={{ ...styles.generalFlex }}>
            <div style={{ ...styles.flex1 }}>

                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1, ...headerFont, ...styles.alignCenter }}>
                        /{this.props.match.params.projectid} <br />
                            Specifications <br />
                            CSI {this.props.match.params.csiid} <br />
                        {csi.title}

                    </div>
                </div>

                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1 }}>

                        {this.showspecification()}

                    </div>
                </div>


            </div>
        </div>
        )



    }



}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation,
        project: state.project,
        allusers: state.allusers,
        allcompanys: state.allcompanys
    }
}

export default connect(mapStateToProps, actions)(Specification);