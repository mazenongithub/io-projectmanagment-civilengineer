import React, { Component } from 'react';
import Login from './login';
import Profile from './profile';
import { connect } from 'react-redux';

class Home extends Component {

    controlpageview() {
        if (this.props.myusermodel.hasOwnProperty("providerid")) {
            return (<Profile/>);
        }
        else if (this.props.myusermodel) {
            return (<Login/>);
        }

        else {
            return (<div> &nbsp;</div>)
        }

    }
    render() {
        return (<div>{ this.controlpageview()} </div>)
    }
}

function mapStateToProps(state) {
    return { myusermodel: state.myusermodel }
}
export default connect(mapStateToProps)(Home)
