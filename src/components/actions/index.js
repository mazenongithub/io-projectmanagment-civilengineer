import { MYUSERMODEL, NAVIGATION, PROJECT, ALLUSERS, ALLCOMPANYS, CSIS} from './types';

export const reduxUser = (myusermodel) => async dispatch => {
console.log(myusermodel)
    dispatch({ type: MYUSERMODEL, payload: myusermodel })
}

export const reduxNavigation = (navigation) => async dispatch => {
    dispatch({ type: NAVIGATION, payload: navigation })
}
export const reduxAllCompanys = (allcompanys) => async dispatch => {
    dispatch({ type: ALLCOMPANYS, payload: allcompanys })
}
export const reduxProject = (project) => async dispatch => {
    dispatch({ type: PROJECT, payload: project })
}
export const reduxAllUsers = (allusers) => async dispatch => {
    dispatch({ type: ALLUSERS, payload: allusers })
}

export const reduxCSIs = (csis) => async dispatch => {
    dispatch({ type: CSIS, payload:csis })
}

