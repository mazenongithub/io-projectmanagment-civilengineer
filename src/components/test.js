componentDidMount() {

    window.addEventListener('resize', this.updateWindowDimensions);

    this.updateWindowDimensions();
    const construction = new Construction();
    const projectid = this.props.match.params.projectid;
    const userid = this.props.match.params.providerid;

    const projectsocket = construction.getProjectSocketByID.call(this, projectid)

    const socket = new WebSocket(`ws://localhost:8081/projects/${projectid}/websocketapi`)

    socket.onopen = (evt) => {

        const data = { type: "join", userid };
        socket.send(JSON.stringify(data));
        console.log("Project Web Socket Open", data)

    }

    socket.onmessage = (evt) => {
        const response = JSON.parse(evt.data);
        console.log(response)

        if (response.type === "join") {
        


            if (response.hasOwnProperty("myproject")) {
                let getproject = response.myproject;
                let project_id = getproject.project_id;
                let OurProjects = construction.getOurProjects.call(this)

                const findproject = construction.getOurProjectByID.call(this, project_id)

                if (findproject) {
                    let i = construction.getOurProjectKeyById.call(this, project_id)
                    OurProjects[i] = getproject;
                    this.props.reduxMyProjects(OurProjects)

                    // appending project on client

                } else {

                    if (!OurProjects) {
                        OurProjects = [getproject];
                    } else {
                        OurProjects.push(getproject)
                    } // else condition company projects exists


                    this.props.reduxMyProjects(OurProjects)


                } // else condition creating new project


            } // if myproject

        } else if (response.type === "construction") {

      

            let projects = pm.getProjects.call(this)
            let message = response.response;
           

            if (myproject) {
                let project_id = myproject.project_id;

                let i = construction.getOurProjectKeyById.call(this, myproject.project_id)

                if (response.hasOwnProperty("response")) {
                    let updateobj = response.response;

                    if (updateobj.hasOwnProperty("schedule")) {

                        if (updateobj.schedule.hasOwnProperty("insert")) {
                            updateobj.schedule.insert.map(obj => {
                                if (obj.hasOwnProperty("laborid")) {

                                    let laborid = obj.laborid;
                                    let mylabor = construction.getprojectschedulelaborbyid.call(this, myproject.project_id, laborid)

                                    if (!mylabor) {
                                        myprojects[i].schedule.labor.push(obj)
                                    }

                                } else if (obj.hasOwnProperty("materialid")) {

                                    let materialid = obj.materialid;
                                    let mymaterial = construction.getprojectschedulematerialbyid.call(this, myproject.project_id, materialid)

                                    if (!mymaterial) {
                                        myprojects[i].schedule.materials.push(obj)
                                    }



                                } else if (obj.hasOwnProperty("equipmentid")) {


                                    let equipmentid = obj.equipmentid;
                                    let myequipment = construction.getprojectscheduleequipmentbyid.call(this, myproject.project_id, equipmentid)

                                    if (!myequipment) {
                                        myprojects[i].schedule.equipment.push(obj)
                                    }

                                } else if (obj.hasOwnProperty("csiid")) {
                                    let csiid = obj.csiid;
                                    let csi = construction.getprojectbidschedulebyid.call(this, project_id, csiid)

                                    if (!csi) {
                                        myprojects[i].schedule.bidschedule.push(obj)
                                    }
                                }
                            })
                        }


                        if (updateobj.schedule.hasOwnProperty("delete")) {
                            updateobj.schedule.delete.map(deleteobj => {
                                if (deleteobj.hasOwnProperty("laborid")) {
                                    let laborid = deleteobj.laborid;
                                    let mylabor = construction.getprojectschedulelaborbyid.call(this, myproject.project_id, laborid)

                                    if (mylabor) {
                                        let j = construction.getprojectschedulelaborkeybyid.call(this, myproject.project_id, laborid)

                                        myprojects[i].schedule.labor.splice(j, 1)
                                    }

                                } else if (deleteobj.hasOwnProperty("materialid")) {
                                    let materialid = deleteobj.materialid;
                                    let mymaterial = construction.getprojectschedulematerialbyid.call(this, myproject.project_id, materialid)

                                    if (mymaterial) {
                                        let j = construction.getprojectschedulematerialkeybyid.call(this, myproject.project_id, materialid)

                                        myprojects[i].schedule.materials.splice(j, 1)
                                    }

                                } else if (deleteobj.hasOwnProperty("equipmentid")) {
                                    let equipmentid = deleteobj.equipmentid;
                                    let myequipment = construction.getprojectscheduleequipmentbyid.call(this, myproject.project_id, equipmentid)
                                    console.log(myequipment)
                                    if (myequipment) {
                                        let j = construction.getprojectscheduleequipmentkeybyid.call(this, myproject.project_id, equipmentid)

                                        myprojects[i].schedule.equipment.splice(j, 1)
                                    }

                                } else if (deleteobj.hasOwnProperty("csiid")) {
                                    let csiid = deleteobj.csiid;
                                    let csi = construction.getprojectbidschedulebyid.call(this, project_id, csiid)
                                    if (csi) {
                                        let j = construction.getprojectbidschedulekeybyid.call(this, project_id, csiid)
                                        myprojects[i].schedule.bidschedule.splice(j, 1)
                                    }


                                }
                            })

                        }


                        if (updateobj.schedule.hasOwnProperty("update")) {
                            updateobj.schedule.update.map(obj => {
                                if (obj.hasOwnProperty("laborid")) {
                                    let laborid = obj.laborid;
                                    let mylabor = construction.getprojectschedulelaborbyid.call(this, myproject.project_id, laborid)

                                    if (mylabor) {
                                        let j = construction.getprojectschedulelaborkeybyid.call(this, myproject.project_id, laborid)

                                        myprojects[i].schedule.labor[j] = obj
                                    }

                                } else if (obj.hasOwnProperty("materialid")) {
                                    let materialid = obj.materialid;
                                    let mymaterial = construction.getprojectschedulematerialbyid.call(this, myproject.project_id, materialid)

                                    if (mymaterial) {
                                        let j = construction.getprojectschedulematerialkeybyid.call(this, myproject.project_id, materialid)

                                        myprojects[i].schedule.materials[j] = obj
                                    }

                                } else if (obj.hasOwnProperty("equipmentid")) {
                                    let equipmentid = obj.equipmentid;
                                    let myequipment = construction.getprojectscheduleequipmentbyid.call(this, myproject.project_id, equipmentid)

                                    if (myequipment) {
                                        let j = construction.getprojectscheduleequipmentkeybyid.call(this, myproject.project_id, equipmentid)

                                        myprojects[i].schedule.equipment[j] = obj
                                    }

                                } else if (obj.hasOwnProperty("csiid")) {

                                    let csiid = obj.csiid;
                                    let csi = construction.getprojectbidschedulebyid.call(this, project_id, csiid)

                                    if (csi) {
                                        let j = construction.getprojectbidschedulekeybyid.call(this, project_id, csiid)
                                        myprojects[i].schedule.bidschedule[j] = obj;
                                    }

                                }
                            })
                        }


                    } // end of schedule


                    // start of actual 
                    if (updateobj.hasOwnProperty("actual")) {

                        if (updateobj.actual.hasOwnProperty("insert")) {
                            updateobj.actual.insert.map(obj => {
                                if (obj.hasOwnProperty("laborid")) {

                                    let laborid = obj.laborid;
                                    let mylabor = construction.getprojectactuallaborbyid.call(this, myproject.project_id, laborid)

                                    if (!mylabor) {
                                        myprojects[i].actual.labor.push(obj)
                                    }

                                } else if (obj.hasOwnProperty("materialid")) {

                                    let materialid = obj.materialid;
                                    let mymaterial = construction.getprojectactualmaterialbyid.call(this, myproject.project_id, materialid)

                                    if (!mymaterial) {
                                        myprojects[i].actual.materials.push(obj)
                                    }



                                } else if (obj.hasOwnProperty("equipmentid")) {


                                    let equipmentid = obj.equipmentid;
                                    let myequipment = construction.getprojectactualequipmentbyid.call(this, myproject.project_id, equipmentid)

                                    if (!myequipment) {
                                        myprojects[i].actual.equipment.push(obj)
                                    }

                                } else if (obj.hasOwnProperty("csiid")) {
                                    let csiid = obj.csiid;
                                    let csi = construction.getprojectbidactualbyid.call(this, project_id, csiid)

                                    if (!csi) {
                                        myprojects[i].actual.bid.push(obj)
                                    }
                                }
                            })
                        }


                        if (updateobj.actual.hasOwnProperty("delete")) {
                            updateobj.actual.delete.map(deleteobj => {
                                if (deleteobj.hasOwnProperty("laborid")) {
                                    let laborid = deleteobj.laborid;
                                    let mylabor = construction.getprojectactuallaborbyid.call(this, myproject.project_id, laborid)

                                    if (mylabor) {
                                        let j = construction.getprojectactuallaborkeybyid.call(this, myproject.project_id, laborid)

                                        myprojects[i].actual.labor.splice(j, 1)
                                    }

                                } else if (deleteobj.hasOwnProperty("materialid")) {
                                    let materialid = deleteobj.materialid;
                                    let mymaterial = construction.getprojectactualmaterialbyid.call(this, myproject.project_id, materialid)

                                    if (mymaterial) {
                                        let j = construction.getprojectactualmaterialkeybyid.call(this, myproject.project_id, materialid)

                                        myprojects[i].actual.materials.splice(j, 1)
                                    }

                                } else if (deleteobj.hasOwnProperty("equipmentid")) {
                                    let equipmentid = deleteobj.equipmentid;
                                    let myequipment = construction.getprojectactualequipmentbyid.call(this, myproject.project_id, equipmentid)
                                    console.log(myequipment)
                                    if (myequipment) {
                                        let j = construction.getprojectactualequipmentkeybyid.call(this, myproject.project_id, equipmentid)

                                        myprojects[i].actual.equipment.splice(j, 1)
                                    }

                                } else if (deleteobj.hasOwnProperty("csiid")) {
                                    let csiid = deleteobj.csiid;
                                    let csi = construction.getprojectbidschedulebyid.call(this, project_id, csiid)
                                    if (csi) {
                                        let j = construction.getprojectbidschedulekeybyid.call(this, project_id, csiid)
                                        myprojects[i].schedule.bidschedule.splice(j, 1)
                                    }


                                }
                            })

                        }


                        if (updateobj.actual.hasOwnProperty("update")) {
                            updateobj.actual.update.map(obj => {
                                if (obj.hasOwnProperty("laborid")) {
                                    let laborid = obj.laborid;
                                    let mylabor = construction.getprojectactuallaborbyid.call(this, myproject.project_id, laborid)

                                    if (mylabor) {
                                        let j = construction.getprojectactuallaborkeybyid.call(this, myproject.project_id, laborid)

                                        myprojects[i].actual.labor[j] = obj
                                    }

                                } else if (obj.hasOwnProperty("materialid")) {
                                    let materialid = obj.materialid;
                                    let mymaterial = construction.getprojectactualmaterialbyid.call(this, myproject.project_id, materialid)

                                    if (mymaterial) {
                                        let j = construction.getprojectactualmaterialkeybyid.call(this, myproject.project_id, materialid)

                                        myprojects[i].actual.materials[j] = obj
                                    }

                                } else if (obj.hasOwnProperty("equipmentid")) {
                                    let equipmentid = obj.equipmentid;
                                    let myequipment = construction.getprojectactualequipmentbyid.call(this, myproject.project_id, equipmentid)

                                    if (myequipment) {
                                        let j = construction.getprojectactualequipmentkeybyid.call(this, myproject.project_id, equipmentid)

                                        myprojects[i].actual.equipment[j] = obj
                                    }

                                } else if (obj.hasOwnProperty("csiid")) {

                                    let csiid = obj.csiid;
                                    let csi = construction.getprojectbidactualbyid.call(this, project_id, csiid)

                                    if (csi) {
                                        let j = construction.getprojectbidactualkeybyid.call(this, project_id, csiid)
                                        myprojects[i].actual.bid[j] = obj;
                                    }

                                }
                            })
                        }


                    } // end of actual



                } // if there is a response
                let message = "";
                if (response.hasOwnProperty("text")) {
                    message = response.text;
                }

                this.props.reduxMyProjects(myprojects)
                this.setState({ message, schedule: Math.random(), actual: Math.random(), bidschedule: Math.random(), bid: Math.random() })


            } // end my project



        } // end response type construction

    } // end of socket message

    socket.onerror = (evt) => {
        console.log("SOMETHING WENT WRONG!");
        console.log(evt);
    };

    socket.onclose = (evt) => {
        console.log("WEB SOCKET HAS BEEN CLOSED!!!!");
    };

    let websockets = construction.getProjectSockets.call(this)
    if (websockets) {

        websockets.push({ projectid, socket })
    } else {
        websockets = [{ projectid, socket }]
    }

    this.props.reduxProjectSockets(websockets)


    this.setState({ render: 'render' })






} // end of component did mount