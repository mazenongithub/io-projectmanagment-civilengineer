/* global fetch */
/* global Headers */

export async function CheckUserLogin() {

    let APIURL = `/api/checkuser`

    return fetch(APIURL).then(resp => {

        if (!resp.ok) {
            if (resp.status >= 400 && resp.status < 500) {
                return resp.json().then(data => {
                    let err = { errorMessage: data.message };
                    throw err;
                })
            }
            else {
                let err = { errorMessage: 'Please try again later, server is not responding' };
                throw err;
            }
        }

        return resp.json();
    })
}
export async function GoandHireMe(values) {
    let providerid = values.providerid;
    var APIURL = `/api/${providerid}/goandhireme`

    return fetch(APIURL, {
            method: 'post',
            credentials: 'same-origin',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),

            body: JSON.stringify(values)
        })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }

            return resp.json();
        })
}
export async function ProviderEndPoint(values) {
    let providerid = values.providerid;
    let projectid = values.projectid;
    var APIURL = `/api/${providerid}/projects/${projectid}/providerendpoint`

    return fetch(APIURL, {
            method: 'post',
            credentials: 'same-origin',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),

            body: JSON.stringify(values)
        })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }

            return resp.json();
        })
}
export async function SaveAllProjects(values) {
    let providerid = values.providerid;
    let projectid = values.projectid;
    var APIURL = `/api/${providerid}/projects/${projectid}/saveallprojects`

    return fetch(APIURL, {
            method: 'post',
            credentials: 'same-origin',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),

            body: JSON.stringify(values)
        })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }

            return resp.json();
        })
}
export async function CheckEmailAddress(emailaddress) {

    var APIURL = `/api/user/checkemailaddress/${emailaddress}`

    return fetch(APIURL)
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }

            return resp.json();
        })
}
export async function CheckProjectID(projectid) {
    const APIURL = `/api/${projectid}/checkprojectid`
    return fetch(APIURL)
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }

            return resp.json();
        })
}
export async function CheckProviderID(providerid) {

    var APIURL = `/api/${providerid}/checkproviderid`

    return fetch(APIURL)
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }

            return resp.json();
        })
}
export async function CheckCommission(providerid) {

    let APIURL = `/api/${providerid}/checkcommission`
    console.log(APIURL)
    return fetch(APIURL)
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }

            return resp.json();
        })
}
export async function UploadProfileImage(formdata, providerid) {
    var APIURL = `/api/${providerid}/uploadprofileimage`

    return fetch(APIURL, {
            method: 'post',
            credentials: 'same-origin',
            body: formdata
        })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }

            return resp.json();
        })
}
export async function getstripeloginlink() {

    var APIURL = "/api/stripe/getuserloginlink"

    return fetch(APIURL)
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }

            return resp.json();
        })
}
export async function handleStripePayment(values) {
    let providerid = values.providerid;
    let projectid = values.projectid;
    let invoiceid = values.invoiceid;
    let APIURL = `/api/${providerid}/projects/${projectid}/invoicepayment/${invoiceid}`

    return fetch(APIURL, {
            method: 'post',
            credentials: 'same-origin',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),

            body: JSON.stringify(values)
        })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }

            return resp.json();
        })
}

export async function InsertInvoice(values) {
    let providerid = values.providerid;
    let projectid = values.projectid;
    var APIURL = `/api/${providerid}/projects/${projectid}/insertinvoice`

    return fetch(APIURL, {
            method: 'post',
            credentials: 'same-origin',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),

            body: JSON.stringify(values)
        })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }

            return resp.json();
        })
}

export async function InsertProposal(values) {
    let projectid = values.projectid;
    let providerid = values.providerid;
    var APIURL = `/api/${providerid}/projects/${projectid}/insertproposal`
    return fetch(APIURL, {
            method: 'post',
            credentials: 'same-origin',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),

            body: JSON.stringify(values)
        })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }

            return resp.json();
        })
}

export async function AddCommission(commission) {
    let values = { commission }
    var APIURL = `/api/${commission}/joinmynetwork/commission`
    return fetch(APIURL, {
            method: 'post',
            credentials: 'same-origin',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),

            body: JSON.stringify(values)
        })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }

            return resp.json();
        })
}

export async function InsertMyProject(values) {
    console.log(values)
    let providerid = values.providerid;
    var APIURL = `/api/${providerid}/projects/insertmyproject`
    return fetch(APIURL, {
            method: 'post',
            credentials: 'same-origin',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),

            body: JSON.stringify(values)
        })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }

            return resp.json();
        })
}




export async function loadmyprojects(providerid) {

    var APIURL = `/api/${providerid}/projects/loadmyproject`
    return fetch(APIURL, {
            method: 'get',
            credentials: 'same-origin'
        })
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }
            return resp.json();
        })

}

export async function DeleteMyProject(values) {
    let projectid = values.projectid;
    let providerid = values.providerid;
    var APIURL = `/api/${providerid}/projects/deletemyproject/${projectid}`
    return fetch(APIURL, {
            method: 'get',
            credentials: 'same-origin'
        })
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }
            return resp.json();
        })

}

export async function LoadMyProviders() {

    var APIURL = "/api/loadmyproviders";
    return fetch(APIURL, {
            method: 'get',
            credentials: 'same-origin'
        })
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }
            return resp.json();
        })

}

export async function checkuserlogin(values) {

    var APIURL = "/api/login"
    return fetch(APIURL, {
            method: 'post',
            credentials: 'same-origin',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),

            body: JSON.stringify(values)
        })
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }
            return resp.json();
        })

}

export async function UpdateUserPassword(values) {
    let providerid = values.providerid;
    var APIURL = `/api/${providerid}/updateuserpassword`
    return fetch(APIURL, {
            method: 'post',
            credentials: 'same-origin',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),

            body: JSON.stringify(values)
        })
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }
            return resp.json();
        })

}
