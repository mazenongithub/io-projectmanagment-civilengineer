import { combineReducers } from 'redux';
import myUserModel from './myusermodel';
import emailaddress from './emailreducer';
import password from './passwordreducer';
import firstname from './firstnamereducer';
import lastname from './lastnamereducer';
import occupation from './occupationreducer';
import jobtitle from './jobtitlereducer';
import company from './companyreducer';
import address from './addressreducer';
import city from './cityreducer';
import sta from './statereducer';
import phone from './phonereducer';
import timein from './timeinreducer';
import datein from './dateinreducer'
import timeout from './timeoutreducer'
import laborrate from './laborratereducer';
import totalhours from './totalhoursreducer';
import totallabor from './totallaborreducer';
import description from './descriptionreducer';
import quantity from './quantityreducer';
import unit from './unitreducer';
import unitcost from './unitcostreducer';
import projectid from './projectidreducer';
import projects from './projectreducer';
import projecttitle from './projecttitlereducer';
import projectcountry from './projectcountryreducer';
import projectcity from './projectcityreducer';
import projectstate from './projectstatereducer';
import projectzipcode from './projectzipcodereducer';
import scopeofwork from './projectscopereducer';
import milestoneid from './milestoneidreducer';
import myprovider from './myproviderreducer';
import milestone from './milestonereducer';
import milestonestartdate from './milestonestartdatereducer';
import milestoneenddate from './milestoneenddatereducer';
import role from './rolereducer';
import schedulelaborid from './schedulelaboridreducer';
import schedulematerialid from './schedulematerialidreducer';
import actuallaborid from './actuallaboridreducer';
import actualmaterialid from './actualmaterialidreducer';
import proposalid from './proposalidreducer';
import invoiceid from './invoiceidreducer';
import projectsprovider from './projectsproviderreducer';
import allproviders from './allprovidersreducer';
import myproviders from './myprovidersreducer';
import zipcode from './zipcodereducer';
import navigation from './navigationreducer';
import projectaddress from './projectaddressreducer';
import profileurl from './profileurlreducer';
import searchproviders from './searchproviderreducer';
import uploadimage from './uploadimagereducer';
import providerid from './provideridreducer';
export default combineReducers({
    myusermodel: myUserModel,
    emailaddress,
    password,
    firstname,
    lastname,
    occupation,
    jobtitle,
    company,
    address,
    city,
    sta,
    phone,
    timein,
    timeout,
    laborrate,
    totalhours,
    totallabor,
    description,
    quantity,
    unit,
    unitcost,
    projectid,
    projects,
    projecttitle,
    projectcountry,
    projectcity,
    projectstate,
    projectzipcode,
    scopeofwork,
    milestoneid,
    myprovider,
    milestone,
    milestonestartdate,
    milestoneenddate,
    role,
    schedulelaborid,
    schedulematerialid,
    actuallaborid,
    actualmaterialid,
    proposalid,
    invoiceid,
    projectsprovider,
    allproviders,
    myproviders,
    datein,
    zipcode,
    navigation,
    projectaddress,
    profileurl,
    searchproviders,
    uploadimage,
    providerid
});
