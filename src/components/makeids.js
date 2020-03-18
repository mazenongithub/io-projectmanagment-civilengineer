import PM from './pm'
import { makeID } from './functions';
class MakeID {

    projectid() {
        const pm = new PM();
        const myuser = pm.getuser.call(this)
        let projectid = false;
        if (myuser) {

            while (projectid === false) {
                projectid = makeID(16);
                if (myuser.hasOwnProperty("projects")) {
                    // eslint-disable-next-line
                    myuser.projects.myproject.map(myproject => {
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
        const myuser = pm.getuser.call(this);
        let milestoneid = false;
        while (!milestoneid) {
            milestoneid = makeID(16)
            if (myuser) {
                if (myuser.hasOwnProperty("projects")) {
                    // eslint-disable-next-line
                    myuser.projects.myproject.map(myproject => {
                        if (myproject.hasOwnProperty("projectmilestones")) {
                            // eslint-disable-next-line
                            myproject.projectmilestones.mymilestone.map(mymilestone => {
                                if (mymilestone.milestoneid === milestoneid) {
                                    milestoneid = false;
                                }
                            })
                        }
                    })
                }

            }
        }
        return milestoneid;
    }

}
export default MakeID;