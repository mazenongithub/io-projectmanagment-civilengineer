import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { returnCompanyList, sorttimes, inputUTCStringForLaborID, sortpart, isEmpty, getDateInterval, getScale, calculatemonth, calculateday, formatDateStringDisplay, calculateyear, calculateFloat, getDateTime, checkemptyobject, calculatetotalhours } from './functions';
import { MyStylesheet } from './styles';
import { projectSaveAll } from './svg';
import { SaveAllProfile, CheckEmailAddress, CheckProfile, AppleLogin, LoadSpecifications, LoadCSIs, LogoutUser, LoadAllUsers } from './actions/api';
import { Link } from 'react-router-dom';
import Spinner from './spinner'


class PM {


    sumOfTransfersByLaborID(laborid) {
        const pm = new PM();
        const transfers = pm.getTransfersByLaborID.call(this, laborid)

        let amount = 0;
        if (transfers) {
            // eslint-disable-next-line
            transfers.map(transfer => {

                amount += Number(transfer.amount)

            })

        }
        return amount;

    }

    getTransfersByLaborID(laborid) {
        const pm = new PM();
        const project = pm.getproject.call(this)


        let transfers = false;
        if (project) {
            const mylabor = pm.getactuallaborbyid.call(this, project.projectid, laborid)

            if (mylabor) {
                if (mylabor.hasOwnProperty("scheduletransfers")) {
                    transfers = mylabor.scheduletransfers;
                }
            }
        }
        return transfers;

    }

    sumOfTransfersByMaterialID(materialid) {
        const pm = new PM();
        let amount = 0;
        const transfers = pm.getTransfersByMaterialID.call(this, materialid)
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

    getTransfersByMaterialID(materialid) {
        const pm = new PM();
        const project = pm.getproject.call(this)
        let transfers = false;
        if (project) {

            const mymaterial = pm.getactualmaterialbyid.call(this, project.projectid, materialid)

            if (mymaterial) {
                if (mymaterial.hasOwnProperty("scheduletransfers")) {
                    transfers = mymaterial.scheduletransfers;
                }
            }
        }
        return transfers;

    }

    sumOfTransfersByEquipmentID(equipmentid) {
        const pm = new PM();
        const transfers = pm.getTransfersByEquipmentID.call(this, equipmentid)
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

    getTransfersByEquipmentID(equipmentid) {
        const pm = new PM();
        let transfers = false;
        const project = pm.getproject.call(this)
        if (project) {
            const myequipment = pm.getactualequipmentbyid.call(this, equipmentid)

            if (myequipment) {
                if (myequipment.hasOwnProperty("scheduletransfers")) {
                    transfers = myequipment.scheduletransfers;
                }
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
                    console.log(specs)
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

                    myuser.projects.myproject[i].specifications = specifications;
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
        const projectinterval = pm.getprojectinterval.call(this);
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




            let interval = getDateInterval(projectinterval.start, projectinterval.completion)
            let scale = getScale(interval)
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

                            const milestone_2 = getmilestonebyid(paths, prop)
                            let params = {};
                            let params_2 = {};
                            if (milestone_2) {

                                if (scale === 'month') {
                                    params = calculatemonth(projectinterval.start, projectinterval.completion, paths[milestoneid]['start'], paths[milestoneid]['completion'])
                                    params_2 = calculatemonth(projectinterval.start, projectinterval.completion, milestone_2['start'], milestone_2['completion'])
                                } else if (scale === 'year') {
                                    params = calculateyear(projectinterval.start, projectinterval.completion, paths[milestoneid]['start'], paths[milestoneid]['completion'])
                                    params_2 = calculateyear(projectinterval.start, projectinterval.completion, milestone_2['start'], milestone_2['completion'])
                                } else if (scale === 'day') {
                                    params = calculateday(projectinterval.start, projectinterval.completion, paths[milestoneid]['start'], paths[milestoneid]['completion'])
                                    params_2 = calculateday(projectinterval.start, projectinterval.completion, milestone_2['start'], milestone_2['completion'])
                                }
                            }
                            const y1 = 80 + 100 * (pm.getmilestonekeybyid.call(this, milestoneid));
                            const y2 = 80 + 100 * (pm.getmilestonekeybyid.call(this, prop));
                            let x1 = "";
                            if (paths[milestoneid].paths[prop].type === 'start-to-finish') {
                                x1 = params.xo + params.width;
                            } else if (paths[milestoneid].paths[prop].type === 'start-to-start') {
                                x1 = params.xo;
                            }
                            paths[milestoneid].paths[prop]['x1'] = x1;
                            paths[milestoneid].paths[prop]['y1'] = y1
                            paths[milestoneid].paths[prop]['y2'] = y2
                            paths[milestoneid].paths[prop]['x2'] = params_2.xo
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
                if (response.hasOwnProperty("message")) {
                    this.props.reduxUser(response)
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
                            lag = Math.round((startdate - enddate) * (1 / (1000 * 60 * 60 * 24)))
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
            if (this.props.myusermodel.hasOwnProperty("providerid")) {
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
                    title: 'Project Management by civilengineer.io',
                    id: 'myprojects',
                    url: 'https://civilengineer.io/projectmanagment/slides/myprojects.png',
                    caption: `Project Management by Civilenginer.io. Project Management construction management administrative program for builders. Successfully administering construction contracts online inside the civilengineer.io network.  `

                },
                {
                    title: 'Profile',
                    id: 'profile',
                    url: 'https://civilengineer.io/projectmanagment/slides/profile.png',
                    caption: `Update your Basic Profile to begin. Add profile photo.   `

                },
                {
                    title: 'Project Team',
                    id: 'myteam',
                    url: 'https://civilengineer.io/projectmanagment/slides/myteam.png',
                    caption: `After creating your project, create your project team for Design. Create your project team for Construction. Design furnishes Specs and Cost Estimates. Construction does the work.`

                },
                {
                    title: 'Milestones',
                    id: 'milestones',
                    url: 'https://civilengineer.io/projectmanagment/slides/milestones.png',
                    caption: `Project Milestones with Relationships determines paths and critical paths for your project. This makes planning the project easier.`

                },
                {
                    title: 'Critical Path',
                    id: 'criticalpath',
                    url: 'https://civilengineer.io/projectmanagment/slides/criticalpath.png',
                    caption: `Critical Path is calculated for the milestones. This program solves the classic critical path CPM method in calculating float and total project float `

                },
                {
                    title: 'Proposals',
                    id: 'proposals',
                    url: 'https://civilengineer.io/projectmanagment/slides/proposals.png',
                    caption: `Proposals summarizes the schedule in construction format. PM authorizes the proposals  `

                },
                {
                    title: 'Invoice',
                    id: 'invoice',
                    url: 'https://civilengineer.io/projectmanagment/slides/invoice.png',
                    caption: `You may settle an invoice when funds are available with respect to the invoice balance. Ensure funds exceed invoice balance proir to making transfer  `

                },

                {
                    title: 'Labor, Equipment, Materials',
                    id: 'lem',
                    url: 'https://civilengineer.io/projectmanagment/slides/lem.png',
                    caption: `Inside each invoice and inside project bid schedule there are labor, material, and equipment breakdowns for each pay item `
                },
                {
                    title: 'Engineering Cost Estimate',
                    id: 'costestimate',
                    url: 'https://civilengineer.io/projectmanagment/slides/costestimate.png',
                    caption: `The Engineers furnish the PM a cost estimate. They create this inside of Design. This is done to create the table for bid and we use it to negociate the amount. The Cost Estimate uses the Service Providers rates. The Engineers create the cost estimate the same way the Service Providers do.  `
                },
                {
                    title: 'Construction Specifications',
                    id: 'specifications',
                    url: 'https://civilengineer.io/projectmanagment/slides/specifications.png',
                    caption: `Engineers create construction specifications. These are referenced during construction. The contain important paragraphs relating to the scope of the job. It is important these specs are referenced throughout the job to define the work and place quality standards.  `
                },
                {
                    title: 'Charges',
                    id: 'charges',
                    url: 'https://civilengineer.io/projectmanagment/slides/charges.png',
                    caption: `Adding charges to  your project is simple using the charge component. Having an available balance allows your to settle your invoices and pay your service providers.   `
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
        const project = pm.getprojectbyid.call(this, projectid)

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
            const start = milestones[0].start;
            const completion = milestones[milestones.length - 1].completion;
            interval = { start, completion }
        }
        return interval;

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

    getinvoicekeybyid(invoiceid) {
        const pm = new PM();
        let key = false;
        let myproject = pm.getproject.call(this)

        if (myproject.hasOwnProperty("invoices")) {
            // eslint-disable-next-line
            myproject.invoices.map((myinvoice, i) => {
                if (myinvoice.invoiceid === invoiceid) {
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
        const invoice = pm.getinvoicebyid.call(this, invoiceid);
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
        const project = pm.getprojectbyid.call(this, projectid);
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
        const project = pm.getprojectbyid.call(this, projectid)
        let charges = false;
        if (project) {
            if (project.hasOwnProperty("charges")) {
                charges = project.charges;

            }
        }
        return charges;
    }
    getcompanybyid(companyid) {
        const pm = new PM();
        const myuser = pm.getuser.call(this)
        let getcompany = false;
        if (myuser) {
            if (myuser.hasOwnProperty("companys")) {
                myuser.companys.map(company => {
                    if (company.companyid === companyid) {
                        getcompany = company;
                    }
                })

            }
        }
        return getcompany;
    }
    getcompanymaterialsbyid(materialid) {
        const pm = new PM();
        const myuser = pm.getuser.call(this)
        let getmaterial = false;
        if (myuser) {
            if (myuser.hasOwnProperty("companys")) {
                myuser.companys.map(company => {

                    if (company.hasOwnProperty("materials")) {


                        company.materials.map(material => {
                            if (material.materialid === materialid) {
                                getmaterial = material;
                            }
                        })

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
            myuser.companys.map(company => {


                if (company.hasOwnProperty("employees")) {
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

    getcompanyequipmentbyid(equipmentid) {
        const pm = new PM();
        let getequipment = false;
        const myuser = pm.getuser.call(this)
        if (myuser) {
            

            if (myuser.hasOwnProperty("companys")) {

                myuser.companys.map(company => {
              

                    if (company.hasOwnProperty("equipment")) {

                     
                        company.equipment.map(equipment => {

                            console.log(equipment, equipmentid)

                            if (equipment.equipmentid === equipmentid) {
                                getequipment = equipment;
                            }

                        })
                    }

                })

            }

        }
        console.log(getequipment)

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

        const styles = MyStylesheet();
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this)

        const employee = pm.getcompanyemployeebyid.call(this, mylabor.providerid)
        console.log(employee)
        if (employee) {

            let hourlyrate = Number(mylabor.laborrate);

            return (<div key={mylabor.laborid} style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>

                {mylabor.firstname} {mylabor.lastname} {mylabor.description}
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

    getactuallaborbyid(projectid, laborid) {
        const pm = new PM();
        const labors = pm.getactuallaborbyproject.call(this, projectid);
        let mylabor = false;
        if (labors) {
            // eslint-disable-next-line
            labors.map(labor => {
                if (labor.laborid === laborid) {
                    mylabor = labor;
                }
            })
        }
        return mylabor;
    }

    getactuallaborbyproject(projectid) {
        const pm = new PM();
        const project = pm.getprojectbyid.call(this, projectid);
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
        const project = pm.getprojectbyid.call(this, projectid);
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
    getactualmaterialbyid(projectid, materialid) {
        const pm = new PM();
        const materials = pm.getactualmaterialsbyproject.call(this, projectid);
        let mymaterial = false;
        if (materials) {
            // eslint-disable-next-line
            materials.map(material => {

                if (material.materialid === materialid) {
                    mymaterial = material;
                }
            })
        }

        return mymaterial;
    }

    getactualequipmentbyproject(projectid) {
        const pm = new PM();
        const project = pm.getprojectbyid.call(this, projectid);
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
    getactualequipmentbyid(projectid, equipmentid) {
        const pm = new PM();
        const equipments = pm.getactualequipmentbyproject.call(this, projectid);
        let myequipment = false;
        if (equipments) {
            // eslint-disable-next-line
            equipments.map(equipment => {
                if (equipment.equipmentid === equipmentid) {
                    myequipment = equipment;
                }
            })
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


    getinvoicebyid(invoiceid) {
        let invoice = false;
        const pm = new PM();
        const myproject = pm.getproject.call(this);
        if (myproject.hasOwnProperty("invoices")) {
            // eslint-disable-next-line
            myproject.invoices.map(myinvoice => {
                if (myinvoice.invoiceid === invoiceid) {
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
        const employees = pm.getemployees.call(this)
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
    getemployees() {
        const pm = new PM();
        const myproject = pm.getproject.call(this)
        let employees = false;
        if (myproject.hasOwnProperty("employees")) {
            employees = myproject.employees;
        }
        return employees;
    }

    getcompany() {
        const pm = new PM();
        let getcompany = false;
        const myuser = pm.getuser.call(this)
        if (myuser) {
            if (myuser.hasOwnProperty("companys"))
                myuser.companys.map(company => {
                    if (company.url === this.props.match.params.url) {
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
    getallprojects() {
        const pm = new PM();
        let allprojects = [];
        const myuser = pm.getuser.call(this);
        if (myuser) {
            if (myuser.hasOwnProperty("projects")) {
                allprojects = myuser.projects.myproject;
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
        const project = pm.getproject.call(this)

        if (project.hasOwnProperty("bid")) {
            // eslint-disable-next-line
            project.bid.map(item => {
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
        const bidschedule = pm.getbidschedule.call(this)
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
        if (myproject.hasOwnProperty("projectteam")) {

            // eslint-disable-next-line
            myproject.projectteam.myteam.map((myteam, i) => {
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
            return ({ width: '46px', height: 'auto' })
        } else if (this.state.width > 600) {
            return ({ width: '36px', height: 'auto' })
        } else {
            return ({ width: '26px', height: 'auto' })
        }
    }
    getteamprofile() {
        if (this.state.width > 800) {
            return ({ width: '200px', height: '150px' })
        } else {
            return ({ width: '160px', height: '120px' })
        }
    }

    getteamkeybyid(providerid) {
        const pm = new PM();
        const team = pm.getteam.call(this)
        let key = false;
        if(team) {
            team.map((myteam,i)=> {
                if(myteam.providerid === providerid) {
                    key = i;
                }
            })
        }
        return key;
    }

    getteambyid(providerid) {
        const pm = new PM();
        const team = pm.getteam.call(this)
        let getteam = false;
        if(team) {
            team.map(myteam=> {
                if(myteam.providerid === providerid) {
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
        if(project) {
            if(project.hasOwnProperty("team")) {
                team = project.team;
            }
        }
        return team;
    }
    getproviderbyid(providerid) {
        const pm = new PM();
        const allusers = pm.getallusers.call(this)

        let provider = false;
        if (allusers) {

            // eslint-disable-next-line
            allusers.map(myuser => {

                if (myuser.providerid === providerid) {

                    provider = myuser;
                }
            })

        }

        return provider;
    }
    getprojectteam() {
        const pm = new PM();
        const myproject = pm.getproject.call(this);
        let myteam = false;
        if (myproject.hasOwnProperty("projectteam")) {
            myteam = myproject.projectteam.myteam;
        }
        return myteam;
    }
    getproject() {
        let pm = new PM();
        let project = pm.getprojectbytitle.call(this, this.props.match.params.projectid)
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

    
    getuserbyid(providerid) {
        const pm = new PM();
        const allusers =pm.getallusers.call(this)
        let getuser = false;
        if(allusers) {
            allusers.map(user=> {
                if(user.providerid === providerid) {
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
                myuser.projects.myproject.map(myproject => {

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

                    if (response.hasOwnProperty("allusers")) {
                        let companys = returnCompanyList(response.allusers);
                        this.props.reduxAllCompanys(companys)
                        this.props.reduxAllUsers(response.allusers);

                    }
                    if (response.hasOwnProperty("myuser")) {
                        if (response.hasOwnProperty("replaceids")) {
                            pm.handlereplaceids.call(this, response)
                            this.props.reduxUser(response.myuser)
                        }




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
    async clientlogin(type) {
        try {

            let client = this.state.client;
            let clientid = this.state.clientid;
            let firstname = this.state.firstname;
            let lastname = this.state.lastname;
            let emailaddress = this.state.emailaddress;
            let profileurl = this.state.profileurl;
            let phonenumber = this.state.phonumber;
            let profile = this.state.profile
            let values = { client, clientid, firstname, lastname, emailaddress, profileurl, phonenumber, profile, type }
            this.setState({ spinner: true })
            const response = await AppleLogin(values);
            console.log(response)

            if (response.hasOwnProperty("myuser")) {

                this.props.reduxUser(response.myuser)
                this.setState({ client: '', clientid: '', emailaddress: '', message: '', spinner: false })
            } else if (response.hasOwnProperty("message")) {
                this.setState({ message: response.message, spinner: false, client: '', clientid: '', emailaddress: '' })
            } else {
                this.setState({ spinner: false, client: '', clientid: '', emailaddress: '' })
            }

        } catch (err) {
            this.setState({ spinner: false, client: '', clientid: '', emailaddress: '' })
            alert(err)
        }
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

            let firstname = "";
            let lastname = "";
            if (user.providerData[0].displayName) {
                firstname = user.providerData[0].displayName.split(' ')[0]
                lastname = user.providerData[0].displayName.split(' ')[1]
            }
            let phonenumber = user.providerData[0].phoneNumber
            let profileurl = user.providerData[0].photoURL;
            let client = 'apple';
            let clientid = user.providerData[0].uid;
            let emailaddress = user.providerData[0].email;
            this.setState({ client, clientid, firstname, lastname, profileurl, phonenumber, emailaddress })

            pm.clientlogin.call(this, type)


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
        let client = 'google';
        let clientid = user.providerData[0].uid;
        let firstname = '';
        if (user.providerData[0].displayName) {
            firstname = user.providerData[0].displayName.split(' ')[0]
        }

        let lastname = '';
        if (user.providerData[0].displayName) {
            lastname = user.providerData[0].displayName.split(' ')[1]
        }
        let emailaddress = user.providerData[0].email;
        let emailaddresscheck = false;
        if (emailaddress) {
            emailaddresscheck = true;
        }
        let profileurl = user.providerData[0].photoURL;
        let phonenumber = user.phoneNumber;
        this.setState({ client, clientid, emailaddress, firstname, lastname, profileurl, phonenumber, emailaddresscheck })

        pm.clientlogin.call(this, type)


    }

}
export default PM;