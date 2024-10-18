import { MYUSERMODEL, NAVIGATION, MYPROJECTS, ALLUSERS, ALLCOMPANYS, CSIS, PROJECTSOCKETS, PROJECTS} from './types';

export const reduxUser = (myusermodel) => async dispatch => {

    dispatch({ type: MYUSERMODEL, payload: myusermodel })
}

export const reduxNavigation = (navigation) => async dispatch => {
    dispatch({ type: NAVIGATION, payload: navigation })
}
export const reduxAllCompanys = (allcompanys) => async dispatch => {
    dispatch({ type: ALLCOMPANYS, payload: allcompanys })
}
export const reduxProjects = (projects) => async dispatch => {

    dispatch({ type: PROJECTS, payload: projects })
}

export const reduxMyProjects = (myprojects) => async dispatch => {
    dispatch({ type: MYPROJECTS, payload: myprojects })
}
export const reduxAllUsers = (allusers) => async dispatch => {
    dispatch({ type: ALLUSERS, payload: allusers })
}

export const reduxCSIs = (csis) => async dispatch => {
    dispatch({ type: CSIS, payload:csis })
}

export const reduxProjectSockets = (projectsockets) => async dispatch => {
    dispatch({ type: PROJECTSOCKETS, payload: projectsockets })
}

