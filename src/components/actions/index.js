import axios from 'axios';
import {
    FETCH_USER,
    UPDATE_USER,
    EMAIL_ADDRESS,
    PASSWORD,
    FIRST_NAME,
    LAST_NAME,
    OCCUPATION,
    JOB_TITLE,
    COMPANY,
    ADDRESS,
    CITY,
    STA,
    PHONE,
    TIMEIN,
    TIMEOUT,
    LABOR_RATE,
    TOTAL_HOURS,
    TOTAL_LABOR,
    DESCRIPTION,
    QUANTITY,
    UNIT,
    UNIT_COST,
    PROJECTID,
    PROJECTS,
    PROJECTTITLE,
    PROJECTCOUNTRY,
    PROJECTCITY,
    PROJECTSTATE,
    PROJECTZIPCODE,
    SCOPEOFWORK,
    MILESTONEID,
    MYPROVIDER,
    MILESTONE,
    MILESTONESTARTDATE,
    MILESTONEENDDATE,
    ROLE,
    FINDMYPROJECT,
    SCHEDULEMATERIALID,
    SCHEDULELABORID,
    ACTUALLABORID,
    ACTUALMATERIALID,
    PROPOSALID,
    INVOICEID,
    INVOICESTARTDATE,
    INVOICEENDDATE,
    PROJECTSPROVIDER,
    ALLPROVIDERS,
    MYPROVIDERS,
    DATEIN,
    ZIPCODE,
    MYUSERMODEL,
    NAVIGATION,
    PROJECTADDRESS,
    PROFILEURL,
    SEARCHPROVIDERS,
    UPLOADIMAGE,
    PROVIDERID
}
    from './types';
export const searchProviders = (searchproviders) => async dispatch => {
    dispatch({ type: SEARCHPROVIDERS, payload: searchproviders })
}
export const projectAddress = (projectaddress) => async dispatch => {
    dispatch({ type: PROJECTADDRESS, payload: projectaddress })
}
export const providerID = (providerid) => async dispatch => {
    console.log("PROVIDERID", providerid)
    dispatch({ type: PROVIDERID, payload: providerid })
}
export const reduxNavigation = (navigation) => async dispatch => {
    dispatch({ type: NAVIGATION, payload: navigation })
}
export const fetchUserModel = () => async dispatch => {
    const res = await axios.get("/api/checkuser");
    dispatch({ type: FETCH_USER, payload: res.data })
}

export const findmyproject = (projectid) => async dispatch => {
    const res = await axios.get("/api/projects/findproject/" + projectid);
    let response = [];
    response.push(res.data.myproject)
    if (res.data.myproject.servicetype === 'manager') {
        dispatch({ type: FINDMYPROJECT, payload: response })
    }
    else if (res.data.myproject.servicetype === "provider") {
        dispatch({ type: PROJECTSPROVIDER, payload: response })
    }
}

export const updateUser = (values) => async dispatch => {

    const res = await axios.post("/api/updateuserprofile", values);
    dispatch({ type: UPDATE_USER, payload: res.data })
}
export const profileURL = (profileurl) => async dispatch => {
    dispatch({ type: PROFILEURL, payload: profileurl })
}
export const uploadImage = (uploadimage) => async dispatch => {
    dispatch({ type: UPLOADIMAGE, payload: uploadimage })
}
export const reduxZipcode = (zipcode) => async dispatch => {
    dispatch({ type: ZIPCODE, payload: zipcode })
}
export const scheduleMaterialID = (schedulematerialid) => async dispatch => {
    dispatch({ type: SCHEDULEMATERIALID, payload: schedulematerialid })
}
export const proposalID = (proposalid) => async dispatch => {
    dispatch({ type: PROPOSALID, payload: proposalid })
}
export const invoiceID = (invoiceid) => async dispatch => {
    dispatch({ type: INVOICEID, payload: invoiceid })
}
export const actualMaterialID = (actualmaterialid) => async dispatch => {
    dispatch({ type: ACTUALMATERIALID, payload: actualmaterialid })
}
export const updateUserModel = (myusermodel) => async dispatch => {
    dispatch({ type: MYUSERMODEL, payload: myusermodel })
}
export const actualLaborID = (actuallaborid) => async dispatch => {
    dispatch({ type: ACTUALLABORID, payload: actuallaborid })
}
export const scheduleLaborID = (schedulelaborid) => async dispatch => {
    dispatch({ type: SCHEDULELABORID, payload: schedulelaborid })
}
export const emailAddress = (emailaddress) => async dispatch => {
    dispatch({ type: EMAIL_ADDRESS, payload: emailaddress })
}

export const invoiceStartDate = (invoicestartdate) => async dispatch => {
    dispatch({ type: INVOICESTARTDATE, payload: invoicestartdate })
}
export const invoiceEndDate = (invoiceenddate) => async dispatch => {
    dispatch({ type: INVOICEENDDATE, payload: invoiceenddate })
}

export const milestoneStartDate = (milestonestartdate) => async dispatch => {
    dispatch({ type: MILESTONESTARTDATE, payload: milestonestartdate })
}
export const milestoneEndDate = (milestoneenddate) => async dispatch => {
    dispatch({ type: MILESTONEENDDATE, payload: milestoneenddate })
}
export const projectMilestone = (milestone) => async dispatch => {
    dispatch({ type: MILESTONE, payload: milestone })
}

export const providerRole = (role) => async dispatch => {
    dispatch({ type: ROLE, payload: role })
}


export const reduxpassword = (password) => async dispatch => {
    dispatch({ type: PASSWORD, payload: password })
}

export const firstName = (firstname) => async dispatch => {
    dispatch({ type: FIRST_NAME, payload: firstname })
}

export const lastName = (lastname) => async dispatch => {
    dispatch({ type: LAST_NAME, payload: lastname })
}

export const totalHours = (totalhours) => async dispatch => {
    dispatch({ type: TOTAL_HOURS, payload: totalhours })
}

export const totalLabor = (totallabor) => async dispatch => {
    dispatch({ type: TOTAL_LABOR, payload: totallabor })
}

export const reduxOccupation = (occupation) => async dispatch => {
    dispatch({ type: OCCUPATION, payload: occupation })
}

export const jobTitle = (jobtitle) => async dispatch => {
    dispatch({ type: JOB_TITLE, payload: jobtitle })
}

export const milestoneID = (milestoneid) => async dispatch => {
    dispatch({ type: MILESTONEID, payload: milestoneid })
}
export const myProvider = (myprovider) => async dispatch => {
    dispatch({ type: MYPROVIDER, payload: myprovider })
}

export const projectTitle = (projecttitle) => async dispatch => {

    dispatch({ type: PROJECTTITLE, payload: projecttitle })
}

export const projectScope = (scopeofwork) => async dispatch => {
    dispatch({ type: SCOPEOFWORK, payload: scopeofwork })
}

export const projectCountry = (projectcountry) => async dispatch => {
    dispatch({ type: PROJECTCOUNTRY, payload: projectcountry })
}
export const projectCity = (projectcity) => async dispatch => {
    dispatch({ type: PROJECTCITY, payload: projectcity })
}
export const projectState = (projectcity) => async dispatch => {
    dispatch({ type: PROJECTSTATE, payload: projectcity })
}
export const projectZipcode = (projectzipcode) => async dispatch => {
    dispatch({ type: PROJECTZIPCODE, payload: projectzipcode })
}

export const laborRate = (laborrate) => async dispatch => {
    dispatch({ type: LABOR_RATE, payload: laborrate })
}

export const reduxCompany = (company) => async dispatch => {
    dispatch({ type: COMPANY, payload: company })
}

export const reduxAddress = (address) => async dispatch => {
    dispatch({ type: ADDRESS, payload: address })
}
export const reduxCity = (city) => async dispatch => {
    dispatch({ type: CITY, payload: city })
}

export const reduxState = (sta) => async dispatch => {
    dispatch({ type: STA, payload: sta })
}

export const reduxDescription = (description) => async dispatch => {

    dispatch({ type: DESCRIPTION, payload: description })
}

export const reduxQuantity = (quantity) => async dispatch => {

    dispatch({ type: QUANTITY, payload: quantity })
}

export const reduxUnit = (unit) => async dispatch => {

    dispatch({ type: UNIT, payload: unit })
}

export const reduxUnitCost = (unit_cost) => async dispatch => {

    dispatch({ type: UNIT_COST, payload: unit_cost })
}

export const reduxProjects = (projects) => async dispatch => {
    dispatch({ type: PROJECTS, payload: projects })
}

export const projectsProvider = (projectsprovider) => async dispatch => {

    dispatch({ type: PROJECTSPROVIDER, payload: projectsprovider })
}
export const allProviders = (allproviders) => async dispatch => {

    dispatch({ type: ALLPROVIDERS, payload: allproviders })
}
export const myProviders = (myproviders) => async dispatch => {

    dispatch({ type: MYPROVIDERS, payload: myproviders })
}

export const reduxPhone = (phone) => async dispatch => {
    dispatch({ type: PHONE, payload: phone })
}
export const dateIn = (datein) => async dispatch => {
    dispatch({ type: DATEIN, payload: datein })
}
export const timeIn = (timein) => async dispatch => {
    dispatch({ type: TIMEIN, payload: timein })
}

export const timeOut = (timeout) => async dispatch => {
    dispatch({ type: TIMEOUT, payload: timeout })
}
export const ProjectID = (projectid) => async dispatch => {
    dispatch({ type: PROJECTID, payload: projectid })
}
