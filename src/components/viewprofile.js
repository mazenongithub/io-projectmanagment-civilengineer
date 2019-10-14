import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LoadMyProviders, AddCommission } from './actions/api'
import * as actions from './actions';
import { clicktoJoinNetworkIcon, defaultProfilePhoto } from './svg'
import './viewprofile.css';

class ViewProfile extends Component {
    constructor(props) {
        super(props);
        this.state = { message: '', render: '' }
    }
    componentDidMount() {
        this.props.reduxNavigation({ navigation: "viewprofile", providerid: this.props.match.params.providerid })
        if (!this.props.searchproviders.hasOwnProperty("searchproviders")) {
            this.loadmysearchproviders()
        }


    }
    getimagesource() {
        let profileurl = ""
        let providerid = this.props.match.params.providerid;
        if (this.props.searchproviders.hasOwnProperty("searchproviders")) {
            // eslint-disable-next-line
            this.props.searchproviders.searchproviders.map(myprovider => {
                if (myprovider.providerid === providerid) {
                    profileurl = (myprovider.profileurl)
                }
            })
        }
        return profileurl
    }

    async loadmysearchproviders() {
        let response = await LoadMyProviders();
        console.log(response)
        let myprovider = response.searchproviders.myprovider
        this.props.searchProviders({ searchproviders: myprovider })
    }
    showblocktext() {
        let providerid = this.props.match.params.providerid;
        if (this.props.searchproviders.hasOwnProperty("searchproviders")) {
            // eslint-disable-next-line
            return this.props.searchproviders.searchproviders.map(myprovider => {
                if (myprovider.providerid === providerid) {
                    return (this.formatblock(myprovider))
                }
            })
        }
    }
    formatblock(myprovider) {
        return (<span> 
        {`${myprovider.firstname} ${myprovider.lastname} ${myprovider.jobtitle} `}
        <br/>
        {(myprovider.company)}
         <br/>
         {myprovider.provideraddress} {myprovider.providercity} {myprovider.providerstate} {myprovider.providerzipcode}
         <br/>
         <a className="profile-link" href={`mailTo:${myprovider.emailaddress}`}>{myprovider.emailaddress} </a>
          <br/>
          <a className="profile-link" href={`tel:${myprovider.phone}`}> {myprovider.phone}</a>
        
        
        </span>)
    }
    getmyprovider() {
        let provider = {};
        let providerid = this.props.match.params.providerid;
        if (this.props.searchproviders.hasOwnProperty("searchproviders")) {
            // eslint-disable-next-line
            this.props.searchproviders.searchproviders.map(myprovider => {
                if (myprovider.providerid === providerid) {
                    provider = myprovider;
                }
            })
        }
        return provider;
    }

    getproviderimage() {
        let myprovider = this.getmyprovider();
        if (myprovider.profileurl) {
            return (<div className="viewprofile-picture-container">
            <img src={myprovider.profileurl} className="profile-img"  alt={`${myprovider.firstname} ${myprovider.lastname}`} />
            </div>)
        }
        else {
            return (<div className="viewprofile-picture-container">{defaultProfilePhoto()} </div>)
        }
    }
    async addcommission(event) {
        let commission = this.props.match.params.providerid;
        let response = await AddCommission(commission);
        console.log(response)
        let myprovider = response.searchproviders.myprovider
        this.props.searchProviders({ searchproviders: myprovider })
        this.setState({ render: 'render' })
    }
    checkforcommission(providerid, commission) {
        let checkcommission = false;
        if (this.props.searchproviders) {
            if (this.props.searchproviders.searchproviders) {
                // eslint-disable-next-line
                this.props.searchproviders.searchproviders.map(myprovider => {
                    if (myprovider.commission === commission && myprovider.providerid === providerid) {
                        checkcommission = true;
                    }
                })
            }
        }
        return checkcommission;
    }
    handleaddcommission() {
        let addcommission = [];
        if (this.props.myusermodel) {
            if (this.props.myusermodel.hasOwnProperty("providerid")) {
                let commission = this.props.match.params.providerid;
                let providerid = this.props.myusermodel.providerid;


                if (commission) {
                    let checkmynetwork = this.checkforcommission(providerid, commission)
                    if (checkmynetwork) {
                        addcommission.push(<div className="profile-titlerow">{providerid} is networked with {commission} </div>)
                    }
                    else {
                        addcommission.push(<div className="profile-titlerow"><button className="btn-saveprofile" onClick={event=>{this.addcommission(event)}}>{clicktoJoinNetworkIcon()}</button> </div>)
                    }


                }
            }
        }
        return addcommission;
    }
    render() {

        return (<div className="viewprofile-container">
      <div className="viewprofile-picture"> 
        
      {this.getproviderimage()}
      </div>
      <div className="viewprofile-displaytext">
      {this.showblocktext()}
      </div>
     {this.handleaddcommission()}
     
      </div>)
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        searchproviders: state.searchproviders

    }
}
export default connect(mapStateToProps, actions)(ViewProfile)
