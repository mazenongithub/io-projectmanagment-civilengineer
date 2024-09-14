import { combineReducers } from 'redux';
import myusermodel from './myusermodelreducer';
import navigation from './navigationreducer';
import myprojects from './myprojectreducer';
import allusers from './allusersreducer';
import allcompanys from './allcompanysreducer';
import csis from './csireducer';
import projectsockets from './projectsocketreducer';
import projects from './projectreducer';

export default combineReducers({
    myusermodel,
    navigation,
    myprojects,
    allusers,
    allcompanys,
    csis,
    projectsockets,
    projects
})