import React, { Component } from 'react';
import './projectteam.css';
import * as actions from './actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { MyStylesheet } from './styles';
import { inputUTCStringForLaborID } from './functions'
import PM from './pm';
import ProjectID from './projectid';
import { rightArrow } from './svg';
import Bid from './bid'

class Invoices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: '',
            width: 0,
            height: 0,
            activecompanyid: false
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);

    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });

    }

    showinvoice(company) {
        const styles = MyStylesheet();
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this)
       
        

        const buttonWidth = () => {
            if (this.state.width > 800) {
                return ({ width: '100px' })
            } else {
                return ({ width: '60px' })

            }
        }

        return (
            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }} onClick={() => { this.handleActiveInvoice(company._id) }} key={company._id}>

                <span style={{ ...regularFont }}>{company.company}</span> <button style={{ ...styles.generalButton, ...buttonWidth() }}>{rightArrow()}</button>
            </div>
        )

    }
    showinvoices() {
        const pm = new PM();
        const construction = pm.getConstruction.call(this)
        let invoices = [];
        if (construction) {
            construction.map(myproject => {

             

                const company_id = myproject.company_id;
                const company = pm.getcompanybyid.call(this, company_id)
                invoices.push(this.showinvoice(company))




            })
        }


        return invoices;


    }

    showDefault() {
        const styles = MyStylesheet();

        const pm = new PM();

        const regularFont = pm.getRegularFont.call(this)
        
        return (

            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>

                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                    <span style={{ ...regularFont }}>View Team Invoice Bid </span>

                </div>


                {this.showinvoices()}

            </div>
        )
    }


    
    handleActiveInvoice(company_id) {
        const pm = new PM();
        const nav = pm.getnavigation.call(this)
        nav.activecompanyid = company_id;
        this.props.reduxNavigation(nav)
        this.setState({render:'render'})

    }




    handleInvoices() {
        const pm = new PM();
        const nav = pm.getnavigation.call(this)

    if(nav.activecompanyid) {

        const company_id = nav.activecompanyid;

        return (<Bid project_id={this.props.project_id} company_id={company_id} key={Math.random()} />)


    } else {

    return (this.showDefault())



    }



    }

    render() {
        const styles = MyStylesheet();

        const pm = new PM();
        const headerFont = pm.getHeaderFont.call(this)
        const myuser = pm.getuser.call(this)
        const projectid = new ProjectID();
        const regularFont = pm.getRegularFont.call(this)
        if (myuser) {
            const project = pm.getproject.call(this)
            if (project) {
                return (
                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>



                            <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                <a style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.boldFont }} onClick={() => { this.setState({ activecompanyid: false }) }}>  /invoices </a>
                            </div>

                            {this.handleInvoices()}




                        </div>
                    </div>)

            } else {
                return (<div>Project Not Found</div>)
            }

        } else {
            return (<div>Please Login to View Invoices</div>)
        }

    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation,
        csis: state.csis,
        allusers: state.allusers,
        projectsockets: state.projectsockets,
        myprojects: state.myprojects,
        projects: state.projects,
        allcompanys: state.allcompanys
    }
}
export default connect(mapStateToProps, actions)(Invoices)