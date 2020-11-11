import React, { Component } from 'react';
import * as actions from './actions';
import { connect } from 'react-redux';
import { MyStylesheet } from './styles';
import StripeCheckout from 'react-stripe-checkout';
import { AddCharge } from './actions/api'
import { inputUTCStringForLaborID } from './functions'
import {Link} from 'react-router-dom';
import PM from './pm';

class Charges extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: '',
            width: 0,
            height: 0,
            message: ""
        }

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    }
    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions()
        this.props.reduxNavigation({ navigation: "charges" })
        this.props.reduxProject({ projectid: this.props.match.params.projectid })


    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight, chargeamount: '', amount: '' });

    }

    async AddCharge(token) {
        const pm = new PM();
        const myuser = pm.getuser.call(this);
        if (myuser) {
            const providerid = myuser.providerid;
            const myproject = pm.getproject.call(this);
            if (myproject) {

                const projectid = myproject.projectid;
                const i = pm.getprojectkeybyid.call(this, projectid)

                try {
                    let values = { providerid, projectid, token, amount: this.state.chargeamount }

                    let response = await AddCharge(values)
                    console.log(response)
                    if (response.hasOwnProperty("charges")) {

                        myuser.projects.myproject[i].charges = response.charges;
                        this.props.reduxUser(myuser)
                        this.setState({ render: 'render' })

                    }

                    if (response.hasOwnProperty("message")) {
                        this.setState({ message: response.message })
                    }


                } catch (err) {
                    alert(err)
                }

            }

        }

    }

    getchargeamount() {
        return this.state.chargeamount;

    }

    handlechargeamount(chargeamount) {
        let amount = (chargeamount * (.942)) - .3
        this.setState({ chargeamount, amount: Number(amount).toFixed(2) })

    }

    getamount() {
        return this.state.amount;

    }

    handleamount(amount) {
        let chargeamount = (Number(amount) / .942) + .3 + .3 * (1 - .942) + .3 * Math.pow((1 - .942), 2)
        this.setState({ chargeamount: Number(chargeamount).toFixed(2), amount })
    }
    getsumoftransfers() {
        const pm = new PM()
        const myproject = pm.getproject.call(this);
        let total = 0;
        if (myproject) {
            const projectid = myproject.projectid;
            const transfers = pm.gettransfersbyprojectid.call(this, projectid);
            if (transfers) {
                // eslint-disable-next-line
                transfers.map(transfer => {
                    total += Number(transfer.amount)

                })
            }

        }
        return total;
    }
    transferSummary() {
        const pm = new PM()
        const styles = MyStylesheet();


        const headerFont = pm.getHeaderFont.call(this)
        const regularFont = pm.getRegularFont.call(this)

        let transferids = [];


        const myproject = pm.getproject.call(this);
        if (myproject) {
            const projectid = myproject.projectid;
            const transfers = pm.gettransfersbyprojectid.call(this, projectid);

            const sumoftransfers = () => {
                let sum = 0;

                if (transfers) {
                    // eslint-disable-next-line
                    transfers.map(transfer => {
                        sum += Number(transfer.amount)
                    })
                }
                return sum;
            }

            const jsx = (transferids) => {
                return (<div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1, ...headerFont, ...styles.underline }}>
                                Transfer Summary
                </div>
                        </div>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1 }}>
                                {transferids}
                            </div>
                        </div>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1, ...regularFont }}>
                                Sum of Transfers  ${Number(sumoftransfers()).toFixed(2)}
                            </div>
                        </div>


                    </div>
                </div>)
            }



            if (transfers) {
                // eslint-disable-next-line
                transfers.map(transfer => {
                    transferids.push(this.showtransfer(transfer))

                })
            }
            return (jsx(transferids))
        }


    }
    getsumofcharges() {
        const pm = new PM();
        const myproject = pm.getproject.call(this);
        let amount = 0;
        if (myproject) {
            if (myproject.hasOwnProperty("charges")) {
                // eslint-disable-next-line
                myproject.charges.map(charge => {
                    amount += Number(charge.amount)
                })
            }
        }
        return amount;
    }

    showchargesummary() {
        const pm = new PM();
        const myproject = pm.getproject.call(this);
        const styles = MyStylesheet();
        const regularFont = pm.getRegularFont.call(this)
        let amount = 0;
        if (myproject) {
            if (myproject.hasOwnProperty("charges")) {
                // eslint-disable-next-line
                myproject.charges.map(charge => {
                    amount += Number(charge.amount)
                })
            }
        }
        return (<div style={{ ...styles.generalContainer }}><span style={{ ...regularFont, ...styles.generalFont }}>Sum of Charges ${Number(amount).toFixed(2)}</span> </div>)
    }
    showcharges() {
        const pm = new PM();
        const myproject = pm.getproject.call(this)
        let charges = [];
        if (myproject) {
            if (myproject.hasOwnProperty("charges")) {
                // eslint-disable-next-line
                myproject.charges.map(charge => {
                    charges.push(this.showcharge(charge))
                })
            }
        }
        return charges;
    }


    showcharge(charge) {
        const pm = new PM();
        const styles = MyStylesheet();
        const created = inputUTCStringForLaborID(charge.created);
        const regularFont = pm.getRegularFont.call(this)
        return (<div style={{ ...regularFont, ...styles.generalFont }} key={charge.chargeid}>
            Charge Captured on {created} for the Amount ${charge.amount} </div>)

    }

    balanacesummary() {
        const pm = new PM();
        const headerFont = pm.getHeaderFont.call(this)
        const sumofcharges = this.getsumofcharges();
        const sumoftransfers = this.getsumoftransfers();
        const regularFont = pm.getRegularFont.call(this)
        const styles = MyStylesheet();
        return (<div style={{ ...styles.generalContainer }}>
            <div style={{ ...styles.generalContainer }}>
                <span style={{ ...styles.generalFont, ...headerFont, ...styles.underline }}>Balance Summary </span>
            </div>
            <div style={{ ...styles.generalContainer }}>
                <span style={{ ...styles.generalFont, ...regularFont }}>Sum of Charges ${Number(sumofcharges).toFixed(2)} </span>
            </div>
            <div style={{ ...styles.generalContainer }}>
                <span style={{ ...styles.generalFont, ...regularFont }}>Sum of Transfers ${Number(sumoftransfers).toFixed(2)} </span>
            </div>
            <div style={{ ...styles.generalContainer }}>
                <span style={{ ...styles.generalFont, ...regularFont }}>Net Balance ${Number(Number(sumofcharges) - Number(sumoftransfers)).toFixed(2)} </span>
            </div>
        </div>)
    }

    showtransfer(transfer) {
        const pm = new PM();
        const styles = MyStylesheet();
        const regularFont = pm.getRegularFont.call(this)
        const created = inputUTCStringForLaborID(transfer.created);
        //const account = pm.getaccountbydestination.call(this, transfer.destination)
        return (<div style={{ ...regularFont, ...styles.generalFont }}>
            Transfer Created {created} for the Amount ${transfer.amount}
        </div>)
    }




    render() {
        const styles = MyStylesheet();
        const pm = new PM();
        const project = pm.getproject.call(this);
        const headerFont = pm.getHeaderFont.call(this)
        const regularFont = pm.getRegularFont.call(this)
        const myuser =pm.getuser.call(this)
        if(myuser) {

        if (project) {

            const title = project.title;
            const projectid = project.projectid;
            return (
                <div style={{ ...styles.generalFont }}>
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
                                <Link style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.boldFont }} to={`/${myuser.profile}/myprojects/${project.title}/charges`}>  /charges  </Link>
                            </div>

               

                        <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                            <span style={{ ...styles.generalFont, ...regularFont, ...styles.addRightMargin }}>Payment Amount</span><input type="text"
                                value={this.getchargeamount()}
                                onChange={event => { this.handlechargeamount(event.target.value) }}
                                style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin15 }} />
                        </div>
                        <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                            <span style={{ ...styles.generalFont, ...regularFont, ...styles.addRightMargin }}>Charge Amount</span>
                            <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin15 }}
                                value={this.getamount()}
                                onChange={event => { this.handleamount(event.target.value) }}
                            />
                        </div>
                        <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.alignCenter }}>
                            <StripeCheckout
                                name="CivilEngineer.io"
                                description={`Payment for Project ID ${projectid}`}
                                amount={Math.round(Number(this.state.chargeamount) * 100)}
                                token={token => this.AddCharge(token)}
                                stripeKey={process.env.REACT_APP_STRIPE_PUBLIC}
                            />
                        </div>
                        <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.generalContainer }}>
                                <span style={{ ...headerFont, ...styles.generalFont, ...styles.underline }}>Charge Summary </span>
                            </div>
                            {this.showcharges()}
                            {this.showchargesummary()}

                        </div>
                        <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                            {this.transferSummary()}
                        </div>
                        <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                            {this.balanacesummary()}
                        </div>

                        {pm.showprojectid.call(this)}

                    </div>
                </div>
            )

        } else {
            return(<div>Project Not Found</div>)
        }

        } else {
            return (<div>Please Login To View Charges</div>)
        }
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
export default connect(mapStateToProps, actions)(Charges)