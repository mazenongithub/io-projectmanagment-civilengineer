import PM from './pm'
import { makeID } from './functions';
class MakeID {
    transferid() {
        return makeID(16)
    }

    projectid() {
        const pm = new PM();
        const myuser = pm.getuser.call(this)
        let projectid = false;
        if (myuser) {

            while (projectid === false) {
                projectid = makeID(16);
                if (myuser.hasOwnProperty("projects")) {
                    // eslint-disable-next-line
                    myuser.projects.map(myproject => {
                        if (myproject.projectid === projectid) {
                            projectid = false;
                        }
                    })
                }
            }
        }
        return projectid;
    }

    milestoneid() {
        const pm = new PM();
        const myprojects = pm.getMyProjects.call(this)
        let milestoneid = false;
        while (!milestoneid) {
            milestoneid = makeID(16)
       
            
                    // eslint-disable-next-line
                    myprojects.map(myproject => {
                        if (myproject.hasOwnProperty("milestones")) {
                            // eslint-disable-next-line
                            myproject.milestones.map(mymilestone => {
                                if (mymilestone.milestoneid === milestoneid) {
                                    milestoneid = false;
                                }
                            })
                        }
                    })
                

            
        }
        return milestoneid;
    }

}
export default MakeID;