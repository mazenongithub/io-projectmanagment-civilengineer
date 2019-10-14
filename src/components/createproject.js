import React, { Component } from 'react';
import Scope from './form/scope';
import Address from './form/address';
import City from './form/city';
import State from './form/state'
import Team from './form/team'
import Communication from './form/communication'
import Schedule from './form/schedule'
import Budget from './form/budget'
import './join.css'
class CreateProject extends Component {


    render() {
        var formpostURL = process.env.REACT_APP_SERVER_API + "/api/registernewuser";
        return (<div className="form-container">
        <form onSubmit={this.handleSubmit} action={formpostURL} method="post">
        <Scope/>
        <Address/>
        <City/>
        <State/>
        <Team/>
        <Communication/>
        <Schedule />
        <Budget/>
        <input type="submit" />
        </form>
        </div>)
    }
}
export default CreateProject;
