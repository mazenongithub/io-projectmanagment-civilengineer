import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { sorttimes, inputUTCStringForLaborID, sortpart, isEmpty, getDateInterval, getScale, formatDateStringDisplay, calculateFloat, getDateTime, checkemptyobject, calculatetotalhours, getBenefitInterval, formatTimeString, convertUTCTime, trailingZeros } from './functions';
import { MyStylesheet } from './styles';
import { projectSaveAll } from './svg';
import { SaveAllProfile, CheckEmailAddress, CheckProfile, AppleLogin, LoadSpecifications, LoadCSIs, LogoutUser, LoadAllUsers, LoadMyProjects, LoadAllCompanys } from './actions/api';
import { Link } from 'react-router-dom';
import Spinner from './spinner'
import { SaveProfile } from './actions/api';
import { combineReducers } from 'redux';


class PM {

    getProjectSocketByID(projectid) {
        const pm = new PM();
        const sockets = pm.getProjectSockets.call(this)
        let getsocket = false;
        if (sockets) {
            for (let socket of sockets) {
                if (socket.projectid === projectid) {
                    getsocket = socket;
                }
            }
        }
        return getsocket;
    }
    getProjectSockets() {
        let sockets = false;
        if (this.props.projectsockets) {
            if (this.props.projectsockets.hasOwnProperty("length")) {
                sockets = this.props.projectsockets;
            }
        }
        return sockets;
    }

    getMyProjectKeyByID(projectid) {
        const pm = new PM();
        const myprojects = pm.getMyProjects.call(this)
        let key = false;
        if (myprojects) {
            myprojects.map((project, i) => {
                if (project.ProjectID === projectid) {
                    key = i;
                }
            })
        }
        return key;
    }

    getProjects() {
        let projects = false;
        if (this.props.projects) {
         

            if (this.props.projects.hasOwnProperty("length")) {
                projects = this.props.projects;
            }


        }

        return projects;
    }

    getProjectKeyByID(project_id) {
        let pm = new PM();
        const projects = pm.getProjects.call(this)
        let key = false;
        if (projects) {
            projects.map((project, i) => {
                if (project.project_id === project_id) {
                    key = i;
                }
            })
        }
        return key;
    }

    getProjectByID(project_id) {
        let pm = new PM();
        const projects = pm.getProjects.call(this)
        let getproject = false;
        if (projects) {
            projects.map(project => {
                if (project.project_id === project_id) {
                    getproject = project;
                }
            })
        }
        return getproject;
    }


    getMyProjectByID(projectid) {

        const pm = new PM();
        const myprojects = pm.getMyProjects.call(this)
        let getproject = false;
        if (myprojects) {
            myprojects.map(project => {

                if (project.ProjectID === projectid) {

                    getproject = project;

                }
            })
        }


        return getproject;
    }

    getMyProjects() {
        let myprojects = false;
        if (this.props.myprojects) {
            if (this.props.myprojects.hasOwnProperty("length")) {
                myprojects = this.props.myprojects;
            }
        }

        return myprojects;
    }


    sumOfTransfersByLaborID(companyid, laborid) {
        const pm = new PM();
        const transfers = pm.getTransfersByLaborID.call(this, companyid, laborid)

        let amount = 0;
        if (transfers) {
            // eslint-disable-next-line
            transfers.map(transfer => {

                amount += Number(transfer.amount)

            })

        }
        return amount;

    }

    getTransfersByLaborID(companyid, laborid) {
        const pm = new PM();



        let transfers = false;

        const mylabor = pm.getactuallaborbyid.call(this, companyid, laborid)

        if (mylabor) {
            if (mylabor.hasOwnProperty("scheduletransfers")) {
                transfers = mylabor.scheduletransfers;
            }
        }

        return transfers;

    }

    sumOfTransfersByMaterialID(companyid, materialid) {
        const pm = new PM();
        let amount = 0;
        const transfers = pm.getTransfersByMaterialID.call(this, companyid, materialid)
        if (transfers) {
            // eslint-disable-next-line

            if (transfers) {
                // eslint-disable-next-line
                transfers.map(transfer => {

                    amount += Number(transfer.amount)

                })

            }


        }
        return amount;

    }

    getTransfersByMaterialID(companyid, materialid) {
        const pm = new PM();
        const project = pm.getproject.call(this)
        let transfers = false;
        if (project) {

            const mymaterial = pm.getactualmaterialbyid.call(this, companyid, materialid)

            if (mymaterial) {
                if (mymaterial.hasOwnProperty("scheduletransfers")) {
                    transfers = mymaterial.scheduletransfers;
                }
            }
        }
        return transfers;

    }

    sumOfTransfersByEquipmentID(companyid, equipmentid) {
        const pm = new PM();
        const transfers = pm.getTransfersByEquipmentID.call(this, companyid, equipmentid)

        let amount = 0;
        if (transfers) {
            // eslint-disable-next-line

            if (transfers) {
                // eslint-disable-next-line
                transfers.map(transfer => {

                    amount += Number(transfer.amount)

                })

            }


        }
        return amount;

    }

    getTransfersByEquipmentID(companyid, equipmentid) {
        const pm = new PM();
        let transfers = false;

        const myequipment = pm.getactualequipmentbyid.call(this, companyid, equipmentid)

        if (myequipment) {
            if (myequipment.hasOwnProperty("scheduletransfers")) {
                transfers = myequipment.scheduletransfers;
            }
        }


        return transfers;

    }


    async loadcsis() {
        try {
            let response = await LoadCSIs();
            console.log(response)
            if (response.hasOwnProperty("csis")) {
                this.props.reduxCSIs(response.csis);

            }

        } catch (err) {
            alert(err)
        }
    }

    async loadprojectspecs(projectid) {

        const pm = new PM();
        const myuser = pm.getuser.call(this)

        if (myuser) {

            const project = pm.getproject.call(this)

            if (project) {

                const i = pm.getprojectkeybyid.call(this, project.projectid)

                try {

                    let specifications = [];
                    let specs = await LoadSpecifications(project.projectid);

                    if (specs.hasOwnProperty("length")) {
                        // eslint-disable-next-line
                        specs.map(spec => {

                            if (spec.hasOwnProperty("specifications")) {
                                // eslint-disable-next-line
                                spec.specifications.map(myspec => {

                                    specifications.push(myspec)
                                })
                            }

                        })

                    }

                    myuser.projects[i].specifications = specifications;
                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })



                } catch (err) {
                    alert(err)
                }

            }

        }

    }

    getcsis() {
        let csis = false;
        if (this.props.csis) {
            if (this.props.csis.hasOwnProperty("length")) {
                csis = this.props.csis;
            }
        }
        return csis;
    }

    getupdatepassword() {
        return ({ width: '266px', height: '64px' })
    }
    getplusicon() {
        return ({ width: '63px', height: '63px' })
    }
    getminusicon() {
        return ({ width: '63px', height: '18px' })
    }

    getLoginButton() {
        if (this.state.width > 1200) {
            return ({ width: '276px', height: '63px' })
        } else {
            return ({ width: '181px', height: '49px' })
        }
    }
    getGoIcon() {
        if (this.state.width > 1200) {
            return ({ width: '101px', height: '85px' })
        } else if (this.state.width > 800) {
            return ({ width: '80px', height: '75px' })
        } else {
            return ({ width: '60px', height: '55px' })
        }
    }
    getpaths() {
        const pm = new PM();
        const milestones = pm.getmilestones.call(this)
        let paths = {}


        const getmilestonebyid = (paths, milestoneid) => {
            let mymilestone = false;
            if (paths.hasOwnProperty(milestoneid)) {

                mymilestone = paths[milestoneid]
            }

            return mymilestone;

        }

        const getPathsbyMilestoneID = (milestones, milestoneid) => {

            let path = {};
            // eslint-disable-next-line
            milestones.map(milestone => {
                if (milestone.hasOwnProperty("predessors")) {
                    // eslint-disable-next-line
                    milestone.predessors.map(predessor => {
                        if (predessor.predessor === milestoneid) {
                            path[`${milestone.milestoneid}`] = {};
                            path[`${milestone.milestoneid}`]['type'] = predessor.type



                        }


                    })



                }


            })

            return path;
        }
        if (milestones) {
            // eslint-disable-next-line
            milestones.map(milestone => {
                paths[`${milestone.milestoneid}`] = {};
                paths[`${milestone.milestoneid}`]['milestone'] = milestone.milestone
                paths[`${milestone.milestoneid}`]['start'] = milestone.start
                paths[`${milestone.milestoneid}`]['completion'] = milestone.completion;
                paths[`${milestone.milestoneid}`]['paths'] = getPathsbyMilestoneID(milestones, milestone.milestoneid)

            })


            let mymilestones = [];

            // eslint-disable-next-line
            Object.getOwnPropertyNames(paths).map(path => {
                mymilestones.push(path)
            })

            // eslint-disable-next-line
            mymilestones.map((milestoneid, i) => {

                if ((paths[milestoneid]).hasOwnProperty("paths")) {



                    if (Object.getOwnPropertyNames(paths[milestoneid].paths).length > 0) {

                        // eslint-disable-next-line
                        Object.getOwnPropertyNames(paths[milestoneid].paths).map(prop => {


                            paths[milestoneid].paths[prop]['float'] = 'float';


                        })

                    }


                }


            })
        }


        let milestone_1 = "";
        let milestone_2 = "";
        for (let myprop in paths) {
            milestone_1 = getmilestonebyid(paths, myprop)



            for (let mypath in paths[myprop]['paths']) {
                milestone_2 = getmilestonebyid(paths, mypath)
                let float = calculateFloat(milestone_1.completion, milestone_2.start)
                paths[myprop]['paths'][mypath]['float'] = float
            }

        }

        return paths;
    }

    checkemptypathsbymilestoneid(milestoneid) {
        const pm = new PM();
        const paths = pm.getpaths.call(this)
        const path = paths[milestoneid];
        let empty = false;
        if (checkemptyobject(path.paths)) {
            empty = true;
        }
        return empty;
    }

    async logoutuser() {
        const pm = new PM();
        const myuser = pm.getuser.call(this)
        if (myuser) {

            const providerid = myuser.providerid;
            try {
                let response = await LogoutUser(providerid);
                if (response.hasOwnProperty("Success")) {
                    this.props.reduxUser(response)
                    this.setState({ render: 'render' })
                }
            } catch (err) {
                alert(err)
            }
        }
    }


    calcTotalProjectFloat(milestoneid) {
        const pm = new PM();
        const paths = pm.getpaths.call(this)
        let checkcalc = true
        let i = 0;
        let activemilestoneid = milestoneid;
        while (checkcalc) {


            window[`checkfloat_${i.toString()}`] = 0;


            let j = 0;
            checkcalc = false;
            for (window[`mypath_${i.toString()}`] in paths[activemilestoneid]['paths']) {

                if (!pm.checkemptypathsbymilestoneid.call(this, window[`mypath_${i.toString()}`])) {
                    checkcalc = true
                }


                if (j === 0 || window[`checkfloat_${i.toString()}`] > pm.getfloatbymilestoneid.call(this, window[`mypath_${i.toString()}`])) {
                    window[`checkfloat_${i.toString()}`] = pm.getfloatbymilestoneid.call(this, window[`mypath_${i.toString()}`])
                    activemilestoneid = window[`mypath_${i.toString()}`]
                }
                j += 1
            }

            i += 1;

        }
        let float = pm.getfloatbymilestoneid.call(this, milestoneid)
        let projectfloat = 0;
        for (let k = 0; k < i; k++) {
            projectfloat += Number(window[`checkfloat_${k.toString()}`])
        }
        return float + projectfloat
    }

    getTotalFloatbymilestoneid(milestoneid) {
        const pm = new PM();
        const paths = pm.getpaths.call(this)

        let float = 0;
        float += pm.getfloatbymilestoneid.call(this, milestoneid)
        let i = 0;
        let checkfloat = 0;
        let checkfloat_1 = 0;
        let checkfloat_2 = 0;
        let checkfloat_3 = 0;
        let checkfloat_4 = 0;
        let checkfloat_5 = 0;
        let checkfloat_6 = 0;
        for (let mypath in paths[milestoneid]['paths']) {
            if (i === 0 || checkfloat > pm.getfloatbymilestoneid.call(this, mypath)) {
                checkfloat = pm.getfloatbymilestoneid.call(this, mypath)
            }

            let j = 0;

            for (let mypath_1 in paths[mypath]['paths']) {
                if (j === 0 || checkfloat_1 > pm.getfloatbymilestoneid.call(this, mypath_1)) {
                    checkfloat_1 = pm.getfloatbymilestoneid.call(this, mypath_1)
                }


                let k = 0;

                for (let mypath_2 in paths[mypath_1]['paths']) {
                    if (k === 0 || checkfloat_2 > pm.getfloatbymilestoneid.call(this, mypath_2)) {
                        checkfloat_2 = pm.getfloatbymilestoneid.call(this, mypath_2)
                    }

                    let l = 0;

                    for (let mypath_3 in paths[mypath_2]['paths']) {
                        if (l === 0 || checkfloat_3 > pm.getfloatbymilestoneid.call(this, mypath_3)) {
                            checkfloat_3 = pm.getfloatbymilestoneid.call(this, mypath_3)
                        }

                        let m = 0;
                        for (let mypath_4 in paths[mypath_3]['paths']) {
                            if (m === 0 || checkfloat_4 > pm.getfloatbymilestoneid.call(this, mypath_4)) {
                                checkfloat_4 = pm.getfloatbymilestoneid.call(this, mypath_4)
                            }

                            let n = 0;

                            for (let mypath_5 in paths[mypath_4]['paths']) {
                                if (n === 0 || checkfloat_5 > pm.getfloatbymilestoneid.call(this, mypath_5)) {
                                    checkfloat_5 = pm.getfloatbymilestoneid.call(this, mypath_5)
                                }

                                let o = 0;
                                for (let mypath_6 in paths[mypath_5]['paths']) {
                                    if (o === 0 || checkfloat_6 > pm.getfloatbymilestoneid.call(this, mypath_6)) {
                                        checkfloat_6 = pm.getfloatbymilestoneid.call(this, mypath_6)
                                    }

                                    o += 1;
                                }
                                n += 1;
                            }
                            m += 1;
                        }

                        l += 1;
                    }


                    k += 1;
                }



                j += 1;
            }


            i += 1;
        }
        float = float + checkfloat + checkfloat_1 + checkfloat_2 + checkfloat_3 + checkfloat_4 + checkfloat_5 + checkfloat_6;


        return float;

    }

    getlagbymilestoneid(milestoneid) {
        const pm = new PM();
        const milestones = pm.getmilestones.call(this);
        let lag = 0;

        const checklag = (startdate, enddate, i, lag) => {
            let replacelag = false;


            const check = Math.round((startdate - enddate) * (1 / (1000 * 60 * 60 * 24)))


            if (i === 0 && check > 0) {
                replacelag = true;
            } else if (check < lag) {
                replacelag = true;
            }



            return replacelag;
        }

        if (milestones) {
            const mymilestone = pm.getmilestonebyid.call(this, milestoneid);
            if (mymilestone) {

                const startdate = getDateTime(mymilestone.start);

                if (mymilestone.hasOwnProperty("predessors")) {
                    // eslint-disable-next-line
                    mymilestone.predessors.map((predessor, i) => {

                        const enddate = getDateTime(pm.getmilestonebyid.call(this, predessor.predessor).completion)

                        if (startdate >= enddate && checklag(startdate, enddate, i, lag)) {
                            lag = Math.round((startdate - enddate) * (1 / (1000 * 60 * 60 * 24))) - 1
                        }

                    })
                }

            }
        }
        return lag;
    }

    getfloatbymilestoneid(milestoneid) {
        const pm = new PM();
        const paths = pm.getpaths.call(this)

        let float = 0;
        let i = 0;
        for (let mypath in paths[milestoneid]['paths']) {

            let floatcheck = paths[milestoneid]['paths'][mypath]['float']

            if (floatcheck < float || i === 0) {
                float = floatcheck

            }

            i += 1;
        }
        return float;

    }

    getuser() {
        let user = false;
        if (this.props.myusermodel) {

            if (this.props.myusermodel.hasOwnProperty("User_ID")) {

                user = this.props.myusermodel;

            }

        }
        return user;
    }

    getmainslide() {
        if (this.state.width > 1200) {
            return ({ width: '1087px' })
        } else if (this.state.width > 800) {
            return ({ width: '762px' })
        } else {
            return ({ width: '356px' })
        }
    }

    auditpaths() {
        const pm = new PM();
        const paths = pm.getpaths.call(this)
        let message = ""

        for (let myprop in paths) {
            let mymilestone = pm.getmilestonebyid.call(this, myprop)
            //let start = mymilestone.start;
            let completion = mymilestone.completion;

            for (let mypath in paths[myprop]['paths']) {
                let mypredessor = pm.getmilestonebyid.call(this, mypath)
                let predessorstart = mypredessor.start;
                //let predessorcompletion = mypredessor.completion;
                if (getDateTime(completion) > getDateTime(predessorstart)) {

                    message += `${mymilestone.milestone} has a completion date after the start of ${mypredessor.milestone}`


                }




            }

        }

        return message;

    }

    auditmilestones(milestones) {


        const getmilestonebyid = (milestones, milestoneid) => {

            let mymilestone = false;
            if (milestones) {
                // eslint-disable-next-line
                milestones.map(milestone => {

                    if (milestone.milestoneid === milestoneid) {

                        mymilestone = milestone;
                    }

                })

            }

            return mymilestone;
        }


        let message = "";
        if (milestones) {
            // eslint-disable-next-line
            milestones.map(milestone => {
                let start = milestone.start;
                // let completion = milestone.completion;
                // message += `${start} ${completion}`

                if (milestone.hasOwnProperty("predessors")) {
                    // eslint-disable-next-line
                    milestone.predessors.map(predessor => {
                        let mypredessor = getmilestonebyid(milestones, predessor.predessor);
                        //let predessorstart = mypredessor.start;
                        let predessorcompletion = mypredessor.completion;
                        if (mypredessor) {
                            if (getDateTime(start) < getDateTime(predessorcompletion)) {
                                message += `${milestone.milestone} cannot start before ${mypredessor.milestone} completion `
                            }
                        }

                    })

                }

            })

        }


        return message;
    }


    getslides() {
        const slides = () => {
            return ([
                {
                    title: 'My Projects',
                    id: 'myprojects',
                    url: 'https://civilengineer.io/projectmanagment/slides/myprojects.png',
                    caption: `Start By Creating A Project  `

                },
                {
                    title: 'Project',
                    id: 'Project',
                    url: 'https://civilengineer.io/projectmanagment/slides/project.png',
                    caption: `Define the Scope of Work and Location for your Project. Access the project component using the ProjectID links at the bottom    `

                },

                {
                    title: 'Milestones',
                    id: 'milestones',
                    url: 'https://civilengineer.io/projectmanagment/slides/milestones.png',
                    caption: `Add Milestones for your Project with start and completion dates. Built in formula determines the critical path, float, and lag in days.`

                },

                {
                    title: 'Team',
                    id: 'Team',
                    url: 'https://civilengineer.io/projectmanagment/slides/team.png',
                    caption: `Add members to your construction team. Define what each members role is the on the project`

                },

                {
                    title: 'Proposals',
                    id: 'proposals',
                    url: 'https://civilengineer.io/projectmanagment/slides/proposals.png',
                    caption: `View A Construction Proposal from Each Company on your team. The Construction Proposal contains a schedule of costs for each item.`

                },
                {
                    title: 'View Proposal',
                    id: 'viewproposal',
                    url: 'https://civilengineer.io/projectmanagment/slides/viewproposal.png',
                    caption: `Itemized list of scheduled work items submitted from each company. Produces a unit price for each item`

                },
                {
                    title: 'Proposal Line Item',
                    id: 'proposallineitem',
                    url: 'https://civilengineer.io/projectmanagment/slides/proposallineitem.png',
                    caption: `Labor, Equipment, Materials breakdown for each item in the proposal`

                },
                {
                    title: 'Invoices',
                    id: 'invoices',
                    url: 'https://civilengineer.io/projectmanagment/slides/invoices.png',
                    caption: `View the list of invoices submitted from each company on your project  `

                },
                {
                    title: 'View Invoice',
                    id: 'viewinvoice',
                    url: 'https://civilengineer.io/projectmanagment/slides/viewinvoice.png',
                    caption: `Itemized list of actual costs submitted by the company. Produces the actual unit price for construction for each item`

                },
                {
                    title: 'Invoice Line Item',
                    id: 'invoicelineitem',
                    url: 'https://civilengineer.io/projectmanagment/slides/invoicelineitem.png',
                    caption: `Labor, Equipment, Materials breakdow for each item in the invoice`

                },

                {
                    title: 'Bid Schedule',
                    id: 'bidschedule',
                    url: 'https://civilengineer.io/projectmanagment/slides/bidschedule.png',
                    caption: `All entire schedule of costs from all of the companys itemized by Construction code. Track and enter your own Project level schedule to produce project level unit pricing as the PM`
                },
                {
                    title: 'Bid Schedule Line Item',
                    id: 'bidschedulelineitem',
                    url: 'https://civilengineer.io/projectmanagment/slides/bidschedulelineitem.png',
                    caption: `Labor, Equipment, and Materials breakdown for each item in your project level bidschedule from all the companies`
                },
                {
                    title: 'Bid',
                    id: 'bid',
                    url: 'https://civilengineer.io/projectmanagment/slides/bidschedule.png',
                    caption: `Project Level Bid from all of the companies itemized per spec code. Simply enter your quantities and units to produce the project level unit prices from all the Projects as the PM. `
                },
                {
                    title: 'Bid Line Item',
                    id: 'bidlineitem',
                    url: 'https://civilengineer.io/projectmanagment/slides/bidlineitem.png',
                    caption: `Labor, Equipment, and Materials breakdown for each actual item in your bid from all the companys.`
                },
                {
                    title: 'Charges',
                    id: 'charges',
                    url: 'https://civilengineer.io/projectmanagment/slides/charges.png',
                    caption: `Add charges to your project to be able to settle invoices. Manage your own payments online easy using Stripe Checkout `
                }
            ])
        }
        return slides();
    }


    getspecficationbycsi(projectid, csiid) {
        const pm = new PM();
        const specs = pm.getspecficationsbyprojectid.call(this, projectid)
        let myspec = false;
        if (specs) {
            // eslint-disable-next-line
            specs.map(spec => {
                if (spec.csiid === csiid) {
                    myspec = spec;
                }
            })
        }
        return myspec;
    }

    getsectionbyid(projectid, csiid, sectionid) {
        const pm = new PM();
        const spec = pm.getspecficationbycsi.call(this, projectid, csiid)
        let mysection = false;
        if (spec) {

            if (spec.hasOwnProperty("sections")) {
                // eslint-disable-next-line
                spec.sections.map(section => {
                    if (section.sectionid === sectionid) {
                        mysection = section;
                    }
                })
            }
        }
        return mysection;
    }

    getsectionnumberbyid(projectid, csiid, sectionid) {
        const pm = new PM();
        const spec = pm.getspecficationbycsi.call(this, projectid, csiid)
        let mycounter = "";
        if (spec.hasOwnProperty("sections")) {
            const section = pm.getsectionbyid.call(this, projectid, csiid, sectionid)
            if (section) {
                let part = section.part;

                spec.sections.sort((b, a) => {
                    return sortpart(b, a)
                })

                let counter = 1;
                // eslint-disable-next-line
                spec.sections.map((section, i) => {
                    if (section.part === part) {

                        if (section.sectionid === sectionid) {
                            mycounter = counter;
                        } else {
                            counter += 1;
                        }

                    }



                })

            }

        }
        if (Number(mycounter) < 10) {
            mycounter = `0${mycounter}`
        }
        return mycounter;
    }

    getspecficationsbyprojectid(projectid) {
        const pm = new PM();

        const project = pm.getMyProjectByID.call(this, projectid)

        let specs = false;
        if (project) {
            if (project.hasOwnProperty("specifications")) {
                specs = project.specifications;
            }
        }
        return specs;
    }

    getprojectinterval() {
        const pm = new PM();
        const milestones = pm.getmilestones.call(this)
        let interval = false;
        if (milestones) {
            milestones.sort((a, b) => {
                return sorttimes(a.start, b.start)
            }
            )

            if (milestones.length > 0) {
                const start = milestones[0].start;
                const completion = milestones[milestones.length - 1].completion;
                interval = { start, completion }

            }

        }
        return interval;

    }

    projectIcon() {

        if (this.state.width > 800) {
            return ({ width: '190px' })
        } else {
            return ({ width: '150px' })
        }

    }

    getslidebyid(id) {
        const pm = new PM();
        const slides = pm.getslides.call(this)
        let myslide = false;
        if (slides) {
            // eslint-disable-next-line
            slides.map(slide => {
                if (slide.id === id) {
                    myslide = slide;
                }
            })
        }
        return myslide;
    }

    getsmallslide() {
        if (this.state.width > 1200) {
            return ({ width: '362px' })
        } else if (this.state.width > 800) {
            return ({ width: '254px' })
        } else {
            return ({ width: '178px' })
        }

    }

    getinvoicekeybyid(companyid) {
        const pm = new PM();
        let key = false;
        let myproject = pm.getproject.call(this)

        if (myproject.hasOwnProperty("invoices")) {
            // eslint-disable-next-line
            myproject.invoices.map((myinvoice, i) => {
                if (myinvoice.companyid === companyid) {
                    key = i;
                }
            })

        }
        return key;
    }
    getsettlmentbutton() {
        if (this.state.width > 1200) {
            return ({ width: '301px', height: '71px', letterSpacing: '2.87px' })
        } else if (this.state.width > 800) {
            return ({ width: '210px', height: '50px', letterSpacing: '2.16px' })

        } else {
            return ({ width: '120px', height: '28px', letterSpacing: '1.45px' })
        }
    }

    getsettlementsbyinvoiceid(invoiceid) {
        const pm = new PM();
        const invoice = pm.getinvoicebyid.call(this);
        let settlements = false;
        if (invoice.hasOwnProperty("settlements")) {
            settlements = invoice.settlements;
        }
        return settlements;
    }
    gettransfersbyinvoiceid(invoiceid) {
        const pm = new PM();
        const invoice = pm.getinvoicebyid.call(this, invoiceid);
        let transfers = false;
        if (invoice.hasOwnProperty("transfers")) {
            transfers = invoice.transfers;
        }
        return transfers;
    }
    sumOfPaymentsByProjectID(projectid) {
        const pm = new PM();
        const project = pm.getMyProjectByID.call(this, projectid);
        let amount = 0;
        if (project) {
            if (project.hasOwnProperty("actuallabor")) {
                // eslint-disable-next-line
                project.actuallabor.mylabor.map(mylabor => {
                    if (mylabor.hasOwnProperty("scheduletransfers")) {
                        // eslint-disable-next-line
                        mylabor.scheduletransfers.map(transfer => {
                            amount += Number(transfer.amount)
                        })
                    }
                })
            }

            if (project.hasOwnProperty("actualmaterials")) {
                // eslint-disable-next-line
                project.actualmaterials.mymaterial.map(mymaterial => {
                    if (mymaterial.hasOwnProperty("scheduletransfers")) {
                        // eslint-disable-next-line
                        mymaterial.scheduletransfers.map(transfer => {
                            amount += Number(transfer.amount)
                        })
                    }
                })
            }

            if (project.hasOwnProperty("actualequipment")) {
                // eslint-disable-next-line
                project.actualequipment.myequipment.map(myequipment => {
                    if (myequipment.hasOwnProperty("scheduletransfers")) {
                        // eslint-disable-next-line
                        myequipment.scheduletransfers.map(transfer => {
                            amount += Number(transfer.amount)
                        })
                    }
                })
            }
        }
        return amount;

    }


    sumOfChargesByProjectID(projectid) {
        const pm = new PM();
        const charges = pm.getchargesbyprojectid.call(this, projectid)

        let amount = 0;
        if (charges) {
            // eslint-disable-next-line
            charges.map(charge => {
                amount += Number(charge.amount)

            })
        }
        return amount;

    }



    getchargesbyprojectid(projectid) {
        const pm = new PM()
        const project = pm.getMyProjectByID.call(this, projectid)

        let charges = false;
        if (project) {
            if (project.hasOwnProperty("charges")) {
                charges = project.charges;

            }
        }
        return charges;
    }

    async loadAllCompanys() {
        try {

            let allcompanys = await LoadAllCompanys();
            if (allcompanys) {
                this.props.reduxAllCompanys(allcompanys)
                this.setState({ render: 'render' })
            }

        } catch (err) {
            alert(`Could not load all companys ${err}`)
        }
    }

    getcompanyequipmentbyid(company_id, equipmentid) {
        const pm = new PM();
        const equipment = pm.getcompanyequipment.call(this, company_id)
        let getequipment = false;
        if (equipment) {
            equipment.map(eq => {
                if (eq.equipmentid === equipmentid) {
                    getequipment = eq;
                }
            })
        }
        return getequipment;
    }

    getcompanyequipment(company_id) {
        const pm = new PM();
        const company = pm.getcompanybyid.call(this, company_id)
        let getequipment = false;
        if (company) {
            if (company.hasOwnProperty("equipment")) {
                getequipment = company.equipment;

            }
        }

        return getequipment;
    }

    getcompanybyid(company_id) {
        const pm = new PM();
        const allcompanys = pm.getallcompanys.call(this)
        let getcompany = false;

        if (allcompanys) {
            // eslint-disable-next-line
            allcompanys.map(company => {
                if (company._id === company_id) {
                    getcompany = company;
                }
            })

        }

        return getcompany;
    }

    getemployeeaccountratio(companyid, providerid) {
        const pm = new PM();
        const benefits = pm.getemployeebenefitinterval.call(this, companyid, providerid)
        let accounts = [];
        const validateAccounts = (accounts, accountid) => {
            let validate = false;
            // eslint-disable-next-line
            accounts.map(account => {

                if (account.accountid === accountid) {
                    validate = true;
                }

            })
            return validate;
        }

        const getRatio = (benefits, accountid) => {
            let totalamount = 0;
            let benefitamount = 0;
            // eslint-disable-next-line
            benefits.map(benefit => {
                totalamount += Number(benefit.amount)

            })
            // eslint-disable-next-line
            benefits.map(benefit => {
                if (benefit.accountid === accountid) {
                    benefitamount += Number(benefit.amount)
                }
            })
            let ratio = totalamount > 0 ? benefitamount / totalamount : 'No Benefits Entered'
            return ratio
        }

        if (benefits) {
            // eslint-disable-next-line
            benefits.map(benefit => {

                if (!validateAccounts(accounts, benefit.accountid)) {

                    accounts.push({ accountid: benefit.accountid, ratio: getRatio(benefits, benefit.accountid) })

                }


            })
        }
        return accounts;

    }

    getemployeebenefitinterval(companyid, providerid) {

        const pm = new PM();
        let benefits = [];
        const employees = pm.getcompanyemployeesbyid.call(this, companyid)

        if (employees) {
            // eslint-disable-next-line
            employees.map(employee => {


                if (employee.providerid === providerid) {

                    if (employee.hasOwnProperty("benefits")) {

                        // eslint-disable-next-line
                        employee.benefits.map(benefit => {
                            let interval = getBenefitInterval(benefit.frequency, Number(benefit.amount), benefit.benefit, benefit.accountid)
                            benefits = [...benefits, ...interval]
                        })
                    }


                }

            })

        }

        return benefits;
    }

    getcompanymaterialsbyid(materialid) {
        const pm = new PM();
        const company = pm.getcompanybyid.call(this, this.props.company_id)
        let getmaterial = false;
        if (company) {

            // eslint-disable-next-line

            if (company.hasOwnProperty("materials")) {

                // eslint-disable-next-line
                company.materials.map(material => {
                    if (material.materialid === materialid) {
                        getmaterial = material;
                    }
                })

            }

        }
        return getmaterial;
    }

    getcompanymaterials() {
        const pm = new PM();
        const company = pm.getcompany.call(this)
        let getmaterials = false;
        if (company) {
            if (company.hasOwnProperty("materials")) {
                getmaterials = company.materials;
            }
        }
        return getmaterials;
    }

    async loadallusers() {
        try {
            let response = await LoadAllUsers();
            console.log(response)
            if (response.hasOwnProperty("allusers")) {
                this.props.reduxAllUsers(response.allusers);
            }
        } catch (err) {
            alert(err)
        }

    }

    showmaterialid(mymaterial) {

        const styles = MyStylesheet();
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this);



        const material = pm.getcompanymaterialsbyid.call(this, mymaterial.mymaterialid)


        if (material) {

            return (<div style={{ ...styles.generalContainer, ...regularFont, ...styles.generalFont }} key={mymaterial.materialid}>
                {material.material} {formatDateStringDisplay(mymaterial.timein)} {mymaterial.quantity}  x ${Number(mymaterial.unitcost).toFixed(2)}/{mymaterial.unit} = ${Number(Number(mymaterial.quantity) * Number(mymaterial.unitcost)).toFixed(2)}
            </div>)

        }

    }

    getcompanyemployeebyid(providerid) {
        const pm = new PM();
        const myuser = pm.getuser.call(this)
        let getemployee = false;
        if (myuser.hasOwnProperty("companys")) {
            // eslint-disable-next-line
            myuser.companys.map(company => {


                if (company.hasOwnProperty("employees")) {
                    // eslint-disable-next-line
                    company.employees.map(employee => {
                        if (employee.providerid === providerid) {
                            getemployee = employee;
                        }
                    })
                }


            })

        }
        return getemployee;
    }
    getcompanyequipment() {
        const pm = new PM();
        const company = pm.getcompany.call(this)
        let getequipment = false;
        if (company.hasOwnProperty("equipment")) {
            getequipment = company.equipment;
        }
        return getequipment;
    }



    showequipmentid(equipment) {

        const styles = MyStylesheet();
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this);
        const amount = Number(calculatetotalhours(equipment.timeout, equipment.timein) * (Number(equipment.equipmentrate))).toFixed(2)
        const myequipment = pm.getcompanyequipmentbyid.call(this, equipment.myequipmentid)
        if (myequipment) {
            return (<div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }} key={equipment.equipmentid}>
                {myequipment.equipment} From: {inputUTCStringForLaborID(equipment.timein)} to {inputUTCStringForLaborID(equipment.timeout)} ${equipment.equipmentrate} x ${calculatetotalhours(equipment.timeout, equipment.timein)} = ${amount}

            </div>)
        }
    }


    showlaborid(mylabor) {
        console.log(mylabor)

        const styles = MyStylesheet();
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this)

        const employee = pm.getuserbyid.call(this, mylabor.user_id)

        if (employee) {

            let hourlyrate = Number(mylabor.laborrate);

            return (<div key={mylabor.laborid} style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>

                {employee.FirstName} {employee.LastName}
                From {inputUTCStringForLaborID(mylabor.timein)} to {inputUTCStringForLaborID(mylabor.timeout)}
                ${Number(hourlyrate).toFixed(2)}/Hr x {Number(calculatetotalhours(mylabor.timeout, mylabor.timein)).toFixed(2)} Hrs = ${(Number(calculatetotalhours(mylabor.timeout, mylabor.timein)) * Number(hourlyrate)).toFixed(2)}

            </div>)

        }
    }

    showlinedetail() {
        const pm = new PM();
        const styles = MyStylesheet();
        const regularFont = pm.getRegularFont.call(this);
        const totallabor = `$${Number(this.getlabortotal()).toFixed(2)}`
        const totalmaterials = `$${Number(this.getmaterialtotal()).toFixed(2)}`
        const totalequipment = `$${Number(this.getequipmenttotal()).toFixed(2)}`
        const totalamount = `$${Number(this.getitemtotal()).toFixed(2)}`
        const responsiveLayouts = () => {
            if (this.state.width > 800) {
                return (<div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1 }}>

                                <div style={{ ...styles.generalContainer, ...styles.showBorder, ...styles.alignCenter }}>
                                    Labor
                                </div>
                                <div style={{ ...styles.generalContainer, ...styles.showBorder }}>
                                    {this.getlaboritems()}
                                </div>


                            </div>
                            <div style={{ ...styles.flex1 }}>

                                <div style={{ ...styles.generalContainer, ...styles.showBorder, ...styles.alignCenter }}>
                                    Materials
                                </div>
                                <div style={{ ...styles.generalContainer, ...styles.showBorder }}>
                                    {this.getmaterialitems()}
                                </div>

                            </div>
                        </div>
                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1 }}>

                                <div style={{ ...styles.generalContainer, ...styles.showBorder, ...styles.alignCenter }}>
                                    Equipment
                                </div>
                                <div style={{ ...styles.generalContainer, ...styles.showBorder }}>
                                    {this.getequipmentitems()}
                                </div>


                            </div>
                            <div style={{ ...styles.flex1, ...styles.showBorder }}>

                                <div style={{ ...styles.generalContainer }}>
                                    Total Labor {totallabor}
                                </div>
                                <div style={{ ...styles.generalContainer }}>
                                    Total Materials {totalmaterials}
                                </div>
                                <div style={{ ...styles.generalContainer }}>
                                    Total Equipment {totalequipment}
                                </div>
                                <div style={{ ...styles.generalContainer }}>
                                    Total {totalamount}
                                </div>




                            </div>
                        </div>


                    </div>
                </div>)

            } else {
                return (
                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>

                            <div style={{ ...styles.generalContainer }}>

                                <div style={{ ...styles.generalContainer, ...styles.showBorder, ...styles.alignCenter }}>
                                    Labor
                                </div>
                                <div style={{ ...styles.generalContainer, ...styles.showBorder }}>
                                    {this.getlaboritems()}
                                </div>

                            </div>

                            <div style={{ ...styles.generalContainer }}>

                                <div style={{ ...styles.generalContainer, ...styles.showBorder, ...styles.alignCenter }}>
                                    Materials
                                </div>
                                <div style={{ ...styles.generalContainer, ...styles.showBorder }}>
                                    {this.getmaterialitems()}
                                </div>


                            </div>
                            <div style={{ ...styles.generalContainer }}>

                                <div style={{ ...styles.generalContainer, ...styles.showBorder, ...styles.alignCenter }}>
                                    Equipment
                                </div>
                                <div style={{ ...styles.generalContainer, ...styles.showBorder }}>
                                    {this.getequipmentitems()}
                                </div>

                            </div>
                            <div style={{ ...styles.generalContainer }}>
                                <div style={{ ...styles.generalContainer }}>
                                    Total Labor {totallabor}
                                </div>
                                <div style={{ ...styles.generalContainer }}>
                                    Total Materials {totalmaterials}
                                </div>
                                <div style={{ ...styles.generalContainer }}>
                                    Total Equipment {totalequipment}
                                </div>
                                <div style={{ ...styles.generalContainer }}>
                                    Total {totalamount}
                                </div>
                            </div>


                        </div>
                    </div>
                )

            }
        }
        return responsiveLayouts();

    }

    getinvoice() {
        let invoice = false;
        const pm = new PM();
        const company = pm.getcompany.call(this)
        if (company) {
            const companyid = company.companyid;
            const project = pm.getproject.call(this);
            if (project) {

                if (project.hasOwnProperty("invoices")) {
                    // eslint-disable-next-line
                    project.invoices.map((myinvoice, i) => {
                        if (myinvoice.companyid === companyid) {
                            invoice = myinvoice;
                        }
                    })
                }

            }

        }
        return invoice;

    }



    getproposals() {
        const pm = new PM();
        let proposals = false;
        const myproject = pm.getproject.call(this);
        if (myproject.hasOwnProperty("proposals")) {
            proposals = myproject.proposals;
        }
        return proposals;
    }
    getinvoices() {
        const pm = new PM();
        let invoices = false;
        const myproject = pm.getproject.call(this);
        if (myproject.hasOwnProperty("invoices")) {
            invoices = myproject.invoices
        }
        return invoices;
    }

    touchtoedit() {

        if (this.state.width > 1200) {
            return ({ width: '80px' })
        } else {
            return ({ width: '60px' })
        }
    }


    getButtonSize() {
        if (this.state.width > 1200) {
            return ({ width: '60px' })

        } else if (this.state.width > 600) {
            return ({ width: '50px' })

        } else {
            return ({ width: '40px' })

        }
    }


    getnavigation() {
        let navigation = false;
        if (this.props.navigation) {

            navigation = this.props.navigation

        }
        return navigation;
    }
    getRegularFont() {
        const styles = MyStylesheet();
        if (this.state.width > 800) {
            return (styles.font30)
        } else {
            return (styles.font24)
        }

    }
    getactiveprojectbackground(projectid) {
        const pm = new PM();
        let activeprojectid = pm.getactiveprojectid.call(this);
        if (activeprojectid) {
            if (projectid === activeprojectid) {
                return ({ backgroundColor: '#F7DAF4' })
            } else {
                return;
            }
        } else {
            return;
        }
    }
    getbidfield() {
        if (this.state.width > 800) {
            return ({ maxWidth: '138px' })
        } else {
            return ({ maxWidth: '90px' })
        }
    }

    getAllActual() {
        let actuals = [];
        const pm = new PM();
        const myproject = pm.getproject.call(this);

        if (myproject) {

            if (myproject.hasOwnProperty("invoices")) {
                // eslint-disable-next-line
                myproject.invoices.map(invoice => {

                    if (invoice.hasOwnProperty("labor")) {
                        actuals = [...actuals, ...invoice.labor]
                    }

                    if (invoice.hasOwnProperty("materials")) {
                        actuals = [...actuals, ...invoice.materials]
                    }

                    if (invoice.hasOwnProperty("equipment")) {
                        actuals = [...actuals, ...invoice.equipment]
                    }


                })

            }

            actuals.sort((a, b) => {
                return sorttimes(a.timein, b.timein)
            })
        }

        return actuals;
    }
    getAllSchedule() {
        let schedules = [];
        const pm = new PM();
        const myproject = pm.getproject.call(this);



        if (myproject) {

            if (myproject.hasOwnProperty("proposals")) {
                // eslint-disable-next-line
                myproject.proposals.map(proposal => {

                    if (proposal.hasOwnProperty("labor")) {
                        schedules = [...schedules, ...proposal.labor]
                    }

                    if (proposal.hasOwnProperty("materials")) {
                        schedules = [...schedules, ...proposal.materials]
                    }

                    if (proposal.hasOwnProperty("equipment")) {
                        schedules = [...schedules, ...proposal.equipment]
                    }


                })

            }

            schedules.sort((a, b) => {
                return sorttimes(a.timein, b.timein)
            })
        }

        return schedules;
    }

    getengineerkeybyid(engineerid) {
        const pm = new PM();
        const engineers = pm.getengineering.call(this);
        let key = "";
        if (engineers) {
            // eslint-disable-next-line
            engineers.map((engineer, i) => {
                if (engineer.providerid === engineerid) {
                    key = i;
                }
            })
        }
        return key;

    }
    getengineerbyid(engineerid) {
        const pm = new PM();
        const engineers = pm.getengineering.call(this);
        let myengineer = "";
        if (engineers) {
            // eslint-disable-next-line
            engineers.map(engineer => {
                if (engineer.providerid === engineerid) {
                    myengineer = engineer;
                }
            })
        }
        return myengineer;

    }
    getengineering() {
        const pm = new PM();
        const myproject = pm.getproject.call(this);
        let engineers = "";
        if (myproject.hasOwnProperty("engineering")) {
            engineers = myproject.engineering;
        }
        return engineers;

    }
    getcostestimate() {
        const pm = new PM();
        let estimate = false;
        const myproject = pm.getprojectbytitle.call(this, this.props.match.params.projectid)
        if (myproject) {
            if (myproject.hasOwnProperty("costestimate")) {
                estimate = myproject.costestimate;
            }
        }
        return estimate;
    }

    getmilestonebyid(milestoneid) {
        const pm = new PM();
        const milestones = pm.getmilestones.call(this);
        let mymilestone = false;
        if (milestones) {
            // eslint-disable-next-line
            milestones.map(milestone => {
                if (milestone.milestoneid === milestoneid) {
                    mymilestone = milestone;
                }
            })
        }
        return mymilestone;

    }

    getdropicon() {
        if (this.state.width > 1200) {
            return (
                {
                    width: '93x',
                    height: '45px'
                })

        } else if (this.state.width > 800) {
            return (
                {
                    width: '78px',
                    height: '38px'
                })

        } else {
            return (
                {
                    width: '62px',
                    height: '30px'
                })
        }
    }

    getmilestonecoordbyid(milestoneid) {
        const pm = new PM();
        const milestones = pm.getmilestones.call(this)

        let getcoordinates = {};
        let projectstart = "";
        // eslint-disable-next-line
        milestones.map((milestone, i) => {
            const ypos = 200 * (i + 1) + 5

            if (i === 0) {
                projectstart = milestone.start
            }


            if (milestone.milestoneid === milestoneid) {

                getcoordinates.milestone = milestone.milestoneid
                getcoordinates.ypos = ypos
                getcoordinates.projectstart = projectstart


            }

            if (i === milestones.length - 1) {

                getcoordinates.projectend = milestone.completion

            }


        })
        const scale = getScale(getDateInterval(getcoordinates.projectstart, getcoordinates.projectend))
        getcoordinates.scale = scale;
        // eslint-disable-next-line
        milestones.map(milestone => {
            const xo = 5 + (getDateInterval(getcoordinates.projectstart, milestone.start) - 1) * getcoordinates.scale
            const width = (getDateInterval(milestone.start, milestone.completion)) * getcoordinates.scale
            if (milestone.milestoneid === milestoneid) {
                getcoordinates.xo = xo;
                getcoordinates.width = width
                getcoordinates.start = milestone.start


            }


        })
        return getcoordinates;



    }
    getmilestonekeybyid(milestoneid) {
        const pm = new PM();
        let key = false;
        const myproject = pm.getproject.call(this)
        if (myproject.hasOwnProperty("milestones")) {
            // eslint-disable-next-line
            myproject.milestones.map((mymilestone, i) => {
                if (mymilestone.milestoneid === milestoneid) {
                    key = i;
                }
            })
        }
        return key;
    }

    getmilestones() {

        const pm = new PM();
        const myproject = pm.getproject.call(this)
        let milestones = false;
        if (myproject) {
            if (myproject.hasOwnProperty("milestones")) {
                milestones = myproject.milestones;
            }
        }
        return milestones;

    }

    getcsibyid(csiid) {
        const pm = new PM();
        const csis = pm.getcsis.call(this)

        let mycsi = false;
        if (csis) {

            // eslint-disable-next-line
            csis.map(csi => {
                if (csi.csiid === csiid) {
                    mycsi = csi;

                }
            })
        }

        return mycsi;

    }
    getestimatecsibyid(csiid) {
        const pm = new PM();
        const myproject = pm.getproject.call(this)
        let mycsi = false;
        if (myproject) {

            if (myproject.hasOwnProperty("costestimate")) {

                if (myproject.costestimate.hasOwnProperty("bidschedule")) {


                    // eslint-disable-next-line
                    myproject.costestimate.bidschedule.map(bid => {
                        if (bid.csiid === csiid) {
                            mycsi = { csi: bid.csi, title: bid.title, csiid, quantity: bid.quantity, unit: bid.unit }
                        }
                    })
                }
            }




        }
        return mycsi;

    }
    getactuallaborkeybyid(projectid, laborid) {
        const pm = new PM();
        const labors = pm.getactuallaborbyproject.call(this, projectid);
        let key = false;
        if (labors) {
            // eslint-disable-next-line
            labors.map((labor, i) => {
                if (labor.laborid === laborid) {
                    key = i;
                }
            })
        }
        return key;
    }

    getactuallaborbyid(companyid, laborid) {
        const pm = new PM();
        const invoice = pm.getinvoicebyid.call(this, companyid);
        let mylabor = false;
        if (invoice) {
            if (invoice.hasOwnProperty("labor")) {
                // eslint-disable-next-line
                invoice.labor.map(labor => {
                    if (labor.laborid === laborid) {
                        mylabor = labor;
                    }
                })


            }

        }

        return mylabor;
    }

    getactuallaborbyproject(projectid) {
        const pm = new PM();
        const project = pm.getMyProjectByID.call(this, projectid);
        let actuallabor = false;
        if (project) {
            if (project.hasOwnProperty("actuallabor")) {
                actuallabor = project.actuallabor.mylabor;
            }
        }
        return actuallabor;
    }

    getactualmaterialsbyproject(projectid) {
        const pm = new PM();
        const project = pm.getMyProjectByID.call(this, projectid);
        let actualmaterial = false;
        if (project) {
            if (project.hasOwnProperty("actualmaterials")) {
                actualmaterial = project.actualmaterials.mymaterial;
            }
        }

        return actualmaterial;
    }

    getactualmaterialskeybyid(projectid, materialid) {
        const pm = new PM();
        const materials = pm.getactualmaterialsbyproject.call(this, projectid);
        let key = false;
        if (materials) {
            // eslint-disable-next-line
            materials.map((material, i) => {
                if (material.materialid === materialid) {
                    key = i;
                }
            })
        }
        return key;
    }
    getactualmaterialbyid(companyid, materialid) {
        const pm = new PM();
        const invoice = pm.getinvoicebyid.call(this, companyid)
        let getmaterial = false;
        if (invoice) {
            if (invoice.hasOwnProperty("materials")) {
                // eslint-disable-next-line
                invoice.materials.map(material => {
                    if (material.materialid === materialid) {
                        getmaterial = material;
                    }
                })
            }
        }



        return getmaterial;
    }

    getactualequipmentbyproject(projectid) {
        const pm = new PM();
        const project = pm.getMyProjectByID.call(this, projectid);
        let actualequipment = false;
        if (project) {
            if (project.hasOwnProperty("actualequipment")) {
                actualequipment = project.actualequipment.myequipment;
            }
        }
        return actualequipment;
    }

    getactualequipmentkeybyid(projectid, equipmentid) {
        const pm = new PM();
        const equipments = pm.getactualequipmentbyproject.call(this, projectid);
        let key = false;
        if (equipments) {
            // eslint-disable-next-line
            equipments.map((equipment, i) => {
                if (equipment.equipmentid === equipmentid) {
                    key = i;
                }
            })
        }
        return key;
    }
    getactualequipmentbyid(companyid, equipmentid) {
        const pm = new PM();
        const invoice = pm.getinvoicebyid.call(this, companyid)

        let myequipment = false;
        if (invoice) {
            if (invoice.hasOwnProperty("equipment")) {
                // eslint-disable-next-line
                invoice.equipment.map(equipment => {
                    if (equipment.equipmentid === equipmentid) {
                        myequipment = equipment;
                    }
                })
            }

        }
        return myequipment;
    }


    getactualcsibyid(csiid) {
        let mycsi = false;
        const pm = new PM();
        const myinvoices = pm.getinvoices.call(this)
        if (myinvoices) {
            // eslint-disable-next-line
            myinvoices.map(myinvoice => {
                if (myinvoice.hasOwnProperty("bid")) {
                    // eslint-disable-next-line
                    myinvoice.bid.biditem.map(biditem => {
                        if (biditem.csiid === csiid) {
                            mycsi = { csiid, csi: biditem.csi, title: biditem.title }

                        }
                    })
                }
            })


        }
        return mycsi;
    }

    showprojectid() {
        const styles = MyStylesheet();
        const pm = new PM();
        const headerFont = pm.getHeaderFont.call(this)
        const regularFont = pm.getRegularFont.call(this)
        const myuser = pm.getuser.call(this)

        if (myuser) {
            const providerid = myuser.profile;
            const myproject = pm.getprojectbytitle.call(this, this.props.match.params.projectid)
            if (myproject) {

                return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter, ...headerFont }}>
                                <Link to={`/${providerid}/myprojects/${myproject.title}`} style={{ ...headerFont, ...styles.generalFont, ...styles.generalLink }}> /{myproject.title}</Link>
                            </div>
                        </div>
                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...styles.showBorder, ...regularFont }}>
                                <Link to={`/${providerid}/myprojects/${myproject.title}/charges`} style={{ ...regularFont, ...styles.generalFont, ...styles.generalLink }}>Add Charges</Link>
                            </div>
                        </div>
                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...styles.showBorder, ...regularFont, ...styles.alignCenter }}>
                                <Link to={`/${providerid}/myprojects/${myproject.title}/specifications`} style={{ ...regularFont, ...styles.generalFont, ...styles.generalLink }}>Specifications</Link>
                            </div>
                            <div style={{ ...styles.flex1, ...styles.showBorder, ...regularFont, ...styles.alignCenter }}>
                                <Link to={`/${providerid}/myprojects/${myproject.title}/costestimate`} style={{ ...regularFont, ...styles.generalFont, ...styles.generalLink }}> Cost Estimate</Link>
                            </div>
                        </div>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...styles.showBorder, ...regularFont, ...styles.alignCenter }}>
                                <Link to={`/${providerid}/myprojects/${myproject.title}/team`} style={{ ...regularFont, ...styles.generalFont, ...styles.generalLink }}>Project Team</Link>
                            </div>
                            <div style={{ ...styles.flex1, ...styles.showBorder, ...regularFont, ...styles.alignCenter }}>
                                <Link to={`/${providerid}/myprojects/${myproject.title}/milestones`} style={{ ...regularFont, ...styles.generalFont, ...styles.generalLink }}> Create Milestones</Link>
                            </div>
                        </div>
                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...styles.showBorder, ...regularFont, ...styles.alignCenter }}>
                                <Link to={`/${providerid}/myprojects/${myproject.title}/bidschedule`} style={{ ...regularFont, ...styles.generalFont, ...styles.generalLink }}> View Bid Schedule </Link>
                            </div>
                            <div style={{ ...styles.flex1, ...styles.showBorder, ...regularFont, ...styles.alignCenter }}>
                                <Link to={`/${providerid}/myprojects/${myproject.title}/bid`} style={{ ...regularFont, ...styles.generalFont, ...styles.generalLink }}> View Bid </Link>
                            </div>
                        </div>
                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...styles.showBorder, ...regularFont, ...styles.alignCenter }}>
                                <Link to={`/${providerid}/myprojects/${myproject.title}/proposals`} style={{ ...regularFont, ...styles.generalFont, ...styles.generalLink }}> View Proposals</Link>
                            </div>
                            <div style={{ ...styles.flex1, ...styles.showBorder, ...regularFont, ...styles.alignCenter }}>
                                <Link to={`/${providerid}/myprojects/${myproject.title}/invoices`} style={{ ...regularFont, ...styles.generalFont, ...styles.generalLink }}> View Invoices </Link>
                            </div>
                        </div>

                    </div>
                </div>)

            }
        }
    }


    getActual() {
        const pm = new PM();
        let project = pm.getConstructionbyID.call(this, this.props.company_id)

        let items = [];
        if (project) {
            items = project.actual.labor.concat(project.actual.materials, project.actual.equipment)

        }
        return items;
    }



    getSchedule() {
        const pm = new PM();
        let project = pm.getConstructionbyID.call(this, this.props.company_id)

        let items = [];
        if (project) {
            items = project.schedule.labor.concat(project.schedule.materials, project.schedule.equipment)

        }
        return items;
    }


    getschedulecsibyid(csiid) {

        let mycsi = false;
        const pm = new PM();
        const myproposals = pm.getproposals.call(this)
        if (myproposals) {
            // eslint-disable-next-line
            myproposals.map(myproposal => {
                if (myproposal.hasOwnProperty("bidschedule")) {
                    // eslint-disable-next-line
                    myproposal.bidschedule.biditem.map(biditem => {
                        if (biditem.csiid === csiid) {
                            mycsi = { csiid, csi: biditem.csi, title: biditem.title }


                        }
                    })
                }
            })


        }

        return mycsi;
    }


    getinvoicebyid(companyid) {
        let invoice = false;
        const pm = new PM();
        const invoices = pm.getinvoices.call(this)

        if (invoices) {
            // eslint-disable-next-line
            invoices.map(myinvoice => {

                if (myinvoice.companyid === companyid) {
                    invoice = myinvoice;
                }
            })
        }



        return invoice;

    }
    getemployeebenefitsbyid(providerid) {
        const pm = new PM();
        const employee = pm.getemployeebyid.call(this, providerid)

        if (employee) {
            return employee.benefits;

        } else {
            return employee;
        }

    }
    getemployeebyid(providerid) {
        const pm = new PM();
        const employees = pm.getemployeebycompanyid.call(this)
        let myemployee = false;
        if (employees) {
            // eslint-disable-next-line
            employees.map(employee => {
                if (employee.providerid === providerid) {
                    myemployee = employee;

                }
            })
        }
        return myemployee;
    }

    getcompanyemployeesbyid(companyid) {
        const pm = new PM();
        const myuser = pm.getuser.call(this)
        let companyemployees = false;
        if (myuser.hasOwnProperty("companys")) {
            // eslint-disable-next-line
            myuser.companys.map(company => {
                if (company.companyid === companyid) {
                    if (company.hasOwnProperty("employees")) {
                        companyemployees = company.employees;
                    }


                }
            })

        }

        return companyemployees;
    }

    getcompany() {
        const pm = new PM();
        let getcompany = false;
        const allcompanys = pm.getallcompanys.call(this)
        if (allcompanys) {

            // eslint-disable-next-line
            allcompanys.map(company => {
                if (company._id === this.props.company_id) {
                    getcompany = company;
                }
            })



        }

        return getcompany;

    }

    getproposalbyid(url) {
        let proposal = false;
        const pm = new PM();
        const proposals = pm.getproposals.call(this)
        const company = pm.getcompany.call(this)
        if (company) {
            if (proposals) {
                // eslint-disable-next-line
                proposals.map(myproposal => {

                    if (myproposal.companyid === company.companyid) {
                        proposal = myproposal;
                    }
                })
            }

        }

        return proposal;

    }
    showbidtable() {

        const pm = new PM();
        const styles = MyStylesheet();
        const regularFont = pm.getRegularFont.call(this);


        if (this.state.width > 1200) {
            return (
                <table width="100%" border="1" style={{ ...regularFont, ...styles.generalFont, ...styles.bottomMargin15, ...styles.generalTable, ...styles.topMargin15 }}>
                    <tbody>
                        <tr>
                            <td width="24%" style={{ ...styles.alignCenter }}>Line ID</td>
                            <td width="12%" style={{ ...styles.alignCenter }}>Quantity</td>
                            <td width="13%" style={{ ...styles.alignCenter }}>Unit</td>
                            <td width="13%" style={{ ...styles.alignCenter }}>Direct Cost</td>
                            <td width="13%" style={{ ...styles.alignCenter }}> Profit %</td>
                            <td width="13%" style={{ ...styles.alignCenter }}>Bid Price</td>
                            <td width="12%" style={{ ...styles.alignCenter }}>Unit Price</td>
                        </tr>
                        {this.showbiditems()}
                    </tbody>
                </table>

            )
        } else {
            return (
                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15, ...styles.topMargin15 }}>
                    <div style={{ ...styles.flex1 }}>

                        {this.showbiditems()}

                    </div>
                </div>
            )
        }
    }
    getHeaderFont() {
        const styles = MyStylesheet();
        if (this.state.width > 800) {
            return (styles.font40)
        } else {
            return (styles.font30)
        }

    }

    getallcompanys() {
        let allcompanys = false;
        if (!isEmpty(this.props.allcompanys)) {
            allcompanys = this.props.allcompanys
        }

        return allcompanys;


    }

    getConstructionKeybyID(company_id, project_id) {

        const pm = new PM();
        if (!project_id) {
            project_id = this.props.project_id
        }
        const construction = pm.getConstruction.call(this, project_id)

        let key = false;
        if (construction) {
            construction.map((company, i) => {
                if (company.company_id === company_id) {
                    key = i
                }
            })
        }

        return key;


    }



    getConstructionbyID(company_id, project_id) {
        const pm = new PM();
        if (!project_id) {
            project_id = this.props.project_id
        }
        const construction = pm.getConstruction.call(this, project_id)
        console.log(construction, company_id)
        let getcompany = false;
        if (construction) {
            construction.map(company => {
                if (company.company_id === company_id) {
                    getcompany = company;
                }
            })
        }

        return getcompany;


    }

    getConstruction(project_id) {
        if (!project_id) {
            project_id = this.props.project_id;
        }

        const pm = new PM();
        const project = pm.getProjectByID.call(this, project_id)
        let construction = false;
        if (project.hasOwnProperty("construction")) {
            construction = project.construction;


        }


        return construction;

    }


    getallprojects() {
        const pm = new PM();
        let allprojects = [];
        const myuser = pm.getuser.call(this);
        if (myuser) {
            if (myuser.hasOwnProperty("projects")) {
                allprojects = myuser.projects;
            }

        }
        return allprojects;

    }
    getprojectkeytitle(title) {
        let pm = new PM();
        let myprojects = pm.getprojects.call(this);
        let key = false;
        if (myprojects) {
            // eslint-disable-next-line
            myprojects.map((project, i) => {
                if (project.title === title) {
                    key = i;
                }
            })
        }
        return key;
    }
    getprojectbytitle(title) {
        let pm = new PM();
        let myprojects = pm.getprojects.call(this);
        let myproject = false;
        if (myprojects) {
            // eslint-disable-next-line
            myprojects.map((project, i) => {
                if (project.title === title) {
                    myproject = project;
                }
            })
        }
        return myproject;
    }

    getprojectbyid(projectid) {
        let pm = new PM();
        let myprojects = pm.getprojects.call(this);
        let myproject = false;
        if (myprojects && projectid) {
            // eslint-disable-next-line
            myprojects.map((project, i) => {
                if (project.projectid === projectid) {
                    myproject = project;
                }
            })
        }
        return myproject;
    }

    getbidschedulekeybyid(csiid) {
        const pm = new PM();
        let key = false;
        const bidschedule = pm.getbidschedule.call(this)
        if (bidschedule) {
            // eslint-disable-next-line
            bidschedule.map((item, i) => {
                if (item.csiid === csiid) {
                    key = i;
                }
            })
        }

        return key;
    }

    getbidkeybyid(csiid) {
        const pm = new PM();
        let key = false;
        const bid = pm.getprojectbid.call(this)
        if (bid) {
            // eslint-disable-next-line
            bid.map((item, i) => {
                if (item.csiid === csiid) {
                    key = i;
                }
            })
        }

        return key;
    }

    getbidbyid(csiid) {
        const pm = new PM();
        let myitem = false;

        let project = pm.getConstructionbyID.call(this, this.props.company_id)
        let bid = false;
        if (project.hasOwnProperty("actual")) {
            if (project.actual.hasOwnProperty("bid")) {
                bid = project.actual.bid
            }

        }
        if (bid) {
            // eslint-disable-next-line
            bid.map(item => {
                if (item.csiid === csiid) {
                    myitem = item;
                }
            })
        }

        return myitem;
    }

    getbidschedulebyid(csiid) {
        const pm = new PM();
        let myitem = false;

        let project = pm.getConstructionbyID.call(this, this.props.company_id)
        let bidschedule = false;
        if (project.hasOwnProperty("schedule")) {
            if (project.schedule.hasOwnProperty("bidschedule")) {
                bidschedule = project.schedule.bidschedule
            }

        }
        if (bidschedule) {
            // eslint-disable-next-line
            bidschedule.map(item => {
                if (item.csiid === csiid) {
                    myitem = item;
                }
            })
        }

        return myitem;
    }

    getprojectbid() {
        const pm = new PM();
        let bid = false;
        const project = pm.getproject.call(this)
        if (project) {
            if (project.hasOwnProperty("bid")) {
                bid = project.bid;
            }

        }
        return bid;
    }


    getbidschedule() {
        const pm = new PM();
        let bidschedule = false;
        const project = pm.getproject.call(this)
        if (project) {
            if (project.hasOwnProperty("bidschedule")) {
                bidschedule = project.bidschedule;
            }

        }
        return bidschedule;
    }

    getbid() {
        const pm = new PM();
        let bid = false;

        const project = pm.getproject.call(this)
        if (project) {
            if (project.hasOwnProperty("bid")) {
                bid = project.bid;
            }

        }
        return bid;
    }

    getactiveprojectid() {
        let projectid = "";
        if (this.props.project) {
            if (this.props.project.hasOwnProperty("projectid")) {
                projectid = this.props.project.projectid;
            }

            return projectid;
        }
    }
    getprojects() {
        let projects = [];
        let pm = new PM();
        let myuser = pm.getuser.call(this);
        if (myuser) {
            if (myuser.hasOwnProperty("projects")) {
                projects = myuser.projects;
            }
        }
        return projects;
    }
    getproviderkeybyid(providerid) {
        const pm = new PM();
        let key = false;
        const myproject = pm.getprojectbytitle.call(this, this.props.match.params.projectid);
        if (myproject.hasOwnProperty("team")) {

            // eslint-disable-next-line
            myproject.team.map((myteam, i) => {
                if (myteam.providerid === providerid) {
                    key = i;
                }
            })

        }
        return key;
    }

    getpredessorsbymilestoneid(milestoneid) {
        const pm = new PM();
        const milestones = pm.getmilestonebyid.call(this, milestoneid);
        let predessors = false;
        if (milestones.hasOwnProperty("predessors")) {
            predessors = milestones.predessors;

        }
        return predessors;

    }
    getpredessorkeybyid(milestone, milestoneid) {
        const pm = new PM();
        const predessors = pm.getpredessorsbymilestoneid.call(this, milestone.milestoneid);
        let key = false;
        if (predessors) {
            // eslint-disable-next-line
            predessors.map((predessor, i) => {
                if (predessor.predessor === milestoneid) {
                    key = i;
                }
            })
        }
        return key;
    }
    getpredessorbyid(milestone, milestoneid) {

        const pm = new PM();
        const predessors = pm.getpredessorsbymilestoneid.call(this, milestone.milestoneid);

        let mypredessor = false;
        if (predessors) {

            // eslint-disable-next-line
            predessors.map(predessor => {
                if (predessor.predessor === milestoneid) {
                    mypredessor = predessor;
                }
            })
        } else {
            console.log(`Predessors by MilestoneID is false`)
        }
        return mypredessor;
    }

    getremoveicon() {
        if (this.state.width > 1200) {
            return ({ width: '40px', height: 'auto' })
        } else if (this.state.width > 600) {
            return ({ width: '35px', height: 'auto' })
        } else {
            return ({ width: '25px', height: 'auto' })
        }
    }
    getteamprofile() {
        if (this.state.width > 800) {
            return ({ width: '200px', height: '150px' })
        } else {
            return ({ width: '160px', height: '120px' })
        }
    }

    getteamkeybyid(user_id) {
        const pm = new PM();
        const team = pm.getteam.call(this)
        let key = false;
        if (team) {
            // eslint-disable-next-line
            team.map((myteam, i) => {
                if (myteam.User_ID === user_id) {
                    key = i;
                }
            })
        }
        return key;
    }

    getteambyid(user_id) {
        const pm = new PM();
        const team = pm.getteam.call(this)
        let getteam = false;
        if (team) {
            // eslint-disable-next-line
            team.map(myteam => {
                if (myteam.User_ID === user_id) {
                    getteam = myteam;
                }
            })
        }
        return getteam;
    }

    getteam() {
        const pm = new PM();
        const project = pm.getproject.call(this)
        let team = false;
        if (project) {
            if (project.hasOwnProperty("team")) {
                team = project.team;
            }
        }
        return team;
    }
    getproviderbyid(User_ID) {
        const pm = new PM();
        const allusers = pm.getallusers.call(this)

        let provider = false;
        if (allusers) {

            // eslint-disable-next-line
            allusers.map(myuser => {

                if (myuser.User_ID === User_ID) {

                    provider = myuser;
                }
            })

        }

        return provider;
    }
    getteam() {
        const pm = new PM();
        const myproject = pm.getproject.call(this);
        let myteam = false;
        if (myproject.hasOwnProperty("team")) {
            myteam = myproject.team;
        }
        return myteam;
    }
    getproject() {

        let pm = new PM();
        let project = pm.getProjectByID.call(this, this.props.project_id)

        return project;
    }

    getSmallFont() {
        const styles = MyStylesheet();
        if (this.state.width > 800) {
            return (styles.font20)
        } else {
            return (styles.font18)
        }

    }

    getprojectkey() {
        const pm = new PM();
        let key = false;
        const projects = pm.getprojects.call(this)
        if (projects) {
            let projectid = this.props.match.params.projectid;
            // eslint-disable-next-line
            projects.map((myproject, i) => {
                if (myproject.projectid === projectid) {
                    key = i;
                }
            })
        }
        return key;
    }
    getprojectkeybyid(projectid) {
        const pm = new PM();
        let key = false;
        const projects = pm.getprojects.call(this)
        if (projects) {

            // eslint-disable-next-line
            projects.map((myproject, i) => {
                if (myproject.projectid === projectid) {
                    key = i;
                }
            })
        }
        return key;
    }
    getprojectid() {
        let projectid = "";
        if (this.props.project) {
            if (this.props.project.hasOwnProperty("projectid")) {
                projectid = this.props.project.projectid;
            }

        }
        return projectid;
    }
    gettouchicon() {
        if (this.state.width > 800) {
            return ({
                width: '58px',
                height: '84px'
            })

        } else {
            return ({
                width: '44px',
                height: '59px'
            })
        }

    }

    getcolumns() {
        if (this.state.width > 1200) {
            return ({ gridTemplateColumns: '33% 33% 34%' })

        } else if (this.state.width > 800) {
            return ({ gridTemplateColumns: '50% 50%' })

        } else {
            return ({ gridTemplateColumns: 'auto' })
        }
    }


    getuserbyid(User_ID) {
        const pm = new PM();
        const allusers = pm.getallusers.call(this)

        let getuser = false;
        if (allusers) {
            // eslint-disable-next-line
            allusers.map(user => {
                if (user.User_ID === User_ID) {
                    getuser = user;
                }
            })
        }
        return getuser;
    }

    getallusers() {
        let allusers = false;
        if (!isEmpty(this.props.allusers)) {

            allusers = this.props.allusers


        }
        return allusers;
    }
    getsaveprojecticon() {
        if (this.state.width > 800) {
            return ({
                width: '377px',
                height: '84px'
            })

        } else {
            return ({
                width: '225px',
                height: '60px'
            })
        }

    }

    async saveallprofilebyuser(myuser) {

        if (myuser) {
            try {
                this.setState({ spinner: true })
                let response = await SaveAllProfile({ myuser });
                console.log(response)

                if (response.hasOwnProperty("providerid")) {

                    this.props.reduxUser(response)
                }
                if (response.hasOwnProperty("message")) {
                    let lastupdated = inputUTCStringForLaborID(response.lastupdated)
                    this.setState({ message: `${response.message} Last updated ${lastupdated}`, spinner: false })
                } else {
                    this.setState({ spinner: false })
                }
            } catch (err) {
                this.setState({ spinner: false })
                alert(err)
            }
        }
    }

    handlereplaceids(response) {

        if (response.hasOwnProperty("replaceids")) {
            if (response.replaceids.hasOwnProperty("milestones")) {
                // eslint-disable-next-line
                response.replaceids.milestones.map(milestone => {
                    let oldmilestoneid = milestone.oldmilestoneid;
                    let milestoneid = milestone.milestoneid;
                    if (this.state.activemilestoneid === oldmilestoneid) {
                        this.setState({ activemilestoneid: false })
                        this.props.reduxUser(response.myuser)
                        this.setState({ activemilestoneid: milestoneid })
                    }
                })
            }
            if (response.replaceids.hasOwnProperty("project")) {
                // eslint-disable-next-line
                response.replaceids.project.map(project => {
                    let oldprojectid = project.oldprojectid;
                    let projectid = project.projectid;
                    if (this.state.activeprojectid === oldprojectid) {

                        this.setState({ activeprojectid: projectid })
                    }
                })
            }
        }



    }
    validateprofilesave() {
        const pm = new PM();
        const myuser = pm.getuser.call(this);
        const validate = {};
        validate.validate = true;
        validate.message = "";
        if (myuser) {
            if (!myuser.emailaddress) {
                validate.validate = false;
                validate.message += `Email address is required `
            }
            if (myuser.hasOwnProperty("invalid")) {
                validate.validate = false;
                validate.message += this.state.message;
            }

            if (myuser.hasOwnProperty("invalidemail")) {
                validate.validate = false;
                validate.message += myuser.invalidemail;
            }

            if (myuser.hasOwnProperty("projects")) {
                // eslint-disable-next-line
                myuser.projects.map(myproject => {

                    if (myproject.hasOwnProperty("invalid")) {
                        validate.validate = false;
                        validate.message += this.state.message
                    }

                    if (myproject.hasOwnProperty("projectmilestones")) {
                        let auditmilestones = pm.auditmilestones.call(this, myproject.projectmilestones.mymilestone)
                        if (auditmilestones) {
                            validate.validate = false;
                            validate.message += auditmilestones;
                        }
                    }




                })
            }
        }
        return validate;
    }
    async saveallprofile() {
        const pm = new PM();
        const myuser = pm.getuser.call(this)
        if (myuser) {

            try {
                const validate = pm.validateprofilesave.call(this);
                if (validate.validate) {
                    this.setState({ spinner: true })

                    let response = await SaveAllProfile({ myuser });
                    console.log(response)


                    if (response.hasOwnProperty("myuser")) {

                        this.props.reduxUser(response.myuser)
                    }



                    if (response.hasOwnProperty("message")) {
                        let lastupdated = inputUTCStringForLaborID(response.lastupdated)
                        this.setState({ message: `${response.message} Last updated ${lastupdated}`, spinner: false })
                    }

                } else {
                    this.setState({ message: validate.message, spinner: false })
                }

            } catch (err) {
                this.setState({ spinner: false })
                alert(err)
            }
        }
    }
    getFolderSize() {
        if (this.state.width > 1200) {
            return (
                {
                    width: '142px',
                    height: '88px'
                })

        } else if (this.state.width > 800) {
            return (
                {
                    width: '93px',
                    height: '76px'
                })

        } else {
            return (
                {
                    width: '88px',
                    height: '61px'
                })
        }

    }
    getArrowHeight() {
        if (this.state.width > 800) {
            return (
                {
                    width: '55px',
                    height: '48px'
                })

        } else {
            return (
                {
                    width: '45px',
                    height: '34px'
                })
        }

    }
    getprofiledimensions() {
        if (this.state.width > 1200) {
            return (
                {
                    width: '392px',
                    height: '327px'
                })

        } else if (this.state.width > 800) {
            return (
                {
                    width: '285px',
                    height: '249px'
                })

        } else {
            return (
                {
                    width: '167px',
                    height: '145px'
                })
        }
    }
    getproposal() {
        let proposal = false;
        const pm = new PM();
        const company = pm.getcompany.call(this)
        if (company) {
            const companyid = company.companyid;
            const project = pm.getproject.call(this);
            if (project) {

                if (project.hasOwnProperty("proposals")) {
                    // eslint-disable-next-line
                    project.proposals.map((myproposal, i) => {
                        if (myproposal.companyid === companyid) {
                            proposal = myproposal;
                        }
                    })
                }

            }

        }
        return proposal;

    }

    async savemyprofile() {
        let pm = new PM();
        let myuser = pm.getuser.call(this)
        const firstname = myuser.FirstName;
        const lastname = myuser.LastName;
        const user_id = myuser.User_ID;
        const emailaddress = myuser.EmailAddress;
        const phonenumber = myuser.PhoneNumber;
        const userid = myuser.UserID;
        const profileurl = myuser.ProfileURL;

        const getuser =(user_id, userid, firstname, lastname, emailaddress, phonenumber, profileurl)=> {
            return({user_id, userid, firstname, lastname, emailaddress, phonenumber, profileurl})
        }

      
        if (!myuser.hasOwnProperty("invalid")) {
            myuser = getuser (user_id, userid,firstname, lastname, emailaddress, phonenumber, profileurl )
            try {



                this.setState({ spinner: true })
                let response = await SaveProfile(myuser)
                console.log(response)



                if (response.hasOwnProperty("myuser")) {

                    this.props.reduxUser(response.myuser)
                }

                let message = "";
                if (response.hasOwnProperty("message")) {

                    message += `${response.message}`

                }

                if(response.hasOwnProperty("gettime")) {
                    let gettime = new Date(response.gettime)
                    let hours = gettime.getHours();
                    let ampm = 'am'
                    if(hours > 12) {
                        hours = hours - 12
                        ampm = 'pm'
                    }
                    hours = trailingZeros(hours)
                    let minutes = gettime.getMinutes();
                    minutes = trailingZeros(minutes)
                    let seconds = gettime.getSeconds();
                    seconds = trailingZeros(seconds)

                    message+= ` ${hours}:${minutes}:${seconds} ${ampm}`
                }

               

                this.setState({ message, spinner:false })

            } catch (err) {
                alert(err)
                this.setState({ spinner: false })
            }

        }

    }

    showsaveproject() {
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this);
        const saveprojecticon = pm.getsaveprojecticon.call(this);

        const styles = MyStylesheet();
        if (!this.state.spinner) {
            return (
                <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.generalFont, ...regularFont, ...styles.topMargin15, ...styles.bottomMargin15 }}>
                        {this.state.message}
                    </div>

                    <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                        <button style={{ ...styles.generalButton, ...saveprojecticon }} onClick={() => { pm.saveallprofile.call(this) }}>{projectSaveAll()}</button>
                    </div>
                </div>)

        } else {
            return (<Spinner />)
        }
    }

    showMessage() {
        const styles = MyStylesheet();
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this)

        return(
            <div style={{...styles.generalContainer, ...styles.bottomMargin15, ...styles.alignCenter}}>
                <span style={{...styles.generalFont}}>{this.state.message}</span>
            </div>
        )
    }

    async handleLoginResponse(response) {
        if (response.hasOwnProperty("myuser")) {

            this.props.reduxUser(response.myuser)

            if (response.myprojects) {
                this.props.reduxMyProjects(response.myprojects)
            }

            if(response.allusers) {
                this.props.reduxAllUsers(response.allusers)
            }

            if(response.allcompanys) {
                this.props.reduxAllCompanys(response.allcompanys)
            }

            this.setState({ client: '', clientid: '', emailaddress: '', message: '', spinner: false, initialized: true })
        } else if (response.hasOwnProperty("message")) {
            this.setState({ message: response.message, spinner: false, client: '', clientid: '', emailaddress: '', initialized: true })
        } else {
            this.setState({ spinner: false, client: '', clientid: '', emailaddress: '', initialized: true })
        }

    }
    async clientlogin() {
        const pm = new PM();


        let apple = this.state.apple;
        let google = this.state.google;
        let firstname = this.state.firstname;
        let lastname = this.state.lastname;
        let emailaddress = this.state.emailaddress;
        let profileurl = this.state.profileurl;
        let phonenumber = this.state.phonumber;
        let profile = this.state.profile
        let myuser = { apple, google, firstname, lastname, emailaddress, profileurl, phonenumber, profile }
        

        try {

            this.setState({ spinner: true })

            let response = await AppleLogin(myuser);
            if (response) {
                pm.handleLoginResponse.call(this,response)
            }



        } catch (err) {

            // retry_1

            this.setState({ spinner: false, message: `Azure Server Timeout, retrying` })


            setInterval(async () => {
                if (!this.state.initialized) {
                    try {

                        this.setState({ spinner: true })
                        let response = await AppleLogin(myuser);
                        console.log(response)
                        pm.handleLoginResponse.call(this,response)

                    } catch (err) {

                        this.setState({ spinner: false, client: '', clientid: '', emailaddress: '' })
                        alert(err)

                    }

                }


            }, 35000)






        } // end of catch error_1


    }


    async appleSignIn(type) {
        const pm = new PM();
        let provider = new firebase.auth.OAuthProvider('apple.com');
        provider.addScope('email');
        provider.addScope('name');
        try {
            let result = await firebase.auth().signInWithPopup(provider)
            // The signed-in user info.
            var user = result.user;
            console.log(user)

            let firstname = "";
            let lastname = "";
            let phonenumber = "";
            let profileurl = "";
            let apple = "";
            let emailaddress = "";
            let google = "";
            if (user.providerData[0]) {

                if(user.providerData[0].displayName) {
                firstname = user.providerData[0].displayName.split(' ')[0]
                lastname = user.providerData[0].displayName.split(' ')[1]

                }
                phonenumber = user.providerData[0].phoneNumber
                profileurl = user.providerData[0].photoURL;
                apple = user.providerData[0].uid;
                emailaddress = user.providerData[0].email;
            }



            this.setState({ google, apple, firstname, lastname, profileurl, phonenumber, emailaddress })

            pm.clientlogin.call(this)


            // ...
        } catch (err) {
            alert(err)
            // ...
        };


    }


    async checkprofile(profile) {
        if (profile) {
            try {
                let response = await CheckProfile(profile);
                console.log(response)
                if (response.hasOwnProperty("invalid")) {
                    this.setState({ profilecheck: false, message: response.message })
                } else if (response.hasOwnProperty("valid")) {
                    this.setState({ profilecheck: true, message: "" })
                }
            } catch (err) {
                alert(err)
            }
        }
    }
    async checkemailaddress(emailaddress) {
        if (emailaddress) {
            try {
                let response = await CheckEmailAddress(emailaddress);
                console.log(response)
                if (response.hasOwnProperty("invalid")) {
                    this.setState({ emailcheck: false, message: response.message })
                } else if (response.hasOwnProperty("valid")) {
                    this.setState({ emailcheck: true, message: "" })
                }
            } catch (err) {
                alert(err)
            }

        }

    }
    gettransfersbyprojectid(projectid) {
        const pm = new PM();
        const myproject = pm.getprojectbyid.call(this, projectid)
        let mytransfers = [];
        if (myproject) {
            const projectid = myproject.projectid;
            const invoices = pm.getinvoices.call(this, projectid)
            if (invoices) {
                // eslint-disable-next-line
                invoices.map(invoice => {
                    if (invoice.hasOwnProperty("transfers")) {
                        // eslint-disable-next-line
                        invoice.transfers.map(transfer => {
                            mytransfers.push(transfer)
                        })
                    }
                })

            }
        }
        return mytransfers;
    }


    async googleSignIn(type) {

        const pm = new PM();
        let provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('email');
        provider.addScope('profile');
        let result = await firebase.auth().signInWithPopup(provider)
        var user = result.user;


        let firstname = '';
        let lastname = '';
        let emailaddress = "";
        let profileurl = "";
        let google = "";

        if (user.providerData[0]) {
            google = user.providerData[0].uid;
            emailaddress = user.providerData[0].email;
            lastname = user.providerData[0].displayName.split(' ')[1]
            profileurl = user.providerData[0].photoURL;
            firstname = user.providerData[0].displayName.split(' ')[0]
        }

        let phonenumber = user.phoneNumber;
        this.setState({ apple: '', google, emailaddress, firstname, lastname, profileurl, phonenumber, emailaddress })

        pm.clientlogin.call(this)


    }

}
export default PM;