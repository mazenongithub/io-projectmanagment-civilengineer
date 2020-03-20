/* global fetch */
/* global Headers */
export async function LoadCSI(providerid) {

    let APIURL = `${process.env.REACT_APP_SERVER_API}/projectmanagement/${providerid}/loadcsi`

    return fetch(APIURL, { credentials: 'include' }).then(resp => {

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
export async function CheckUserLogin() {

    let APIURL = `https://civilengineer.io/projectmanagement/api/loadresponse.php`

    return fetch(APIURL, { credentials: 'include' }).then(resp => {

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
export async function LogoutUser() {

    let APIURL = `https://civilengineer.io/projectmanagement/api/logout.php`


    return fetch(APIURL, { credentials: 'include' }).then(resp => {

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

export async function ClientLogin(values) {
    var APIURL = `https://civilengineer.io/projectmanagement/api/loginclient.php`
    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),

        body: JSON.stringify(values)
    })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {

                        throw data.message;
                    })
                }

            }

            return resp.json();
        })
}


export async function SaveAllProfile(myuser) {

    var APIURL = `https://civilengineer.io/projectmanagement/api/userendpoint.php`

    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),

        body: JSON.stringify(myuser)
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


    var APIURL = `https://civilengineer.io/projectmanagement/api/checkemailaddress.php?emailaddress=${emailaddress}`

    return fetch(APIURL, {
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
export async function CheckProjectID(title) {
    const APIURL = `https://civilengineer.io/projectmanagement/api/checknewprojectid.php?title=${title}`
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
export async function CheckProfile(profile) {

    var APIURL = `https://civilengineer.io/projectmanagement/api/checkproviderid.php?profile=${profile}`

    return fetch(APIURL, { credentials: 'include' })
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

export async function UploadProfileImage(formdata) {
    var APIURL = `https://civilengineer.io/projectmanagement/api/uploadprofilephoto.php`

    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
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

export async function handleStripePayment(values) {
    let providerid = values.providerid;
    let projectid = values.projectid;
    let invoiceid = values.invoiceid;
    let APIURL = `${process.env.REACT_APP_SERVER_API}/projectmanagement/${providerid}/projects/${projectid}/invoicepayment/${invoiceid}`

    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
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

    var APIURL = `https://civilengineer.io/projectmanagement/api/insertmyproject.php`
    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
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


export async function RegisterUser(values) {


    var APIURL = `https://civilengineer.io/projectmanagement/api/register.php`


    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),

        body: JSON.stringify(values)
    })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {

                        throw data.message;
                    })
                }

            }

            return resp.json();
        })
}

export async function UpdateUserPassword(values) {
    let providerid = values.providerid;
    var APIURL = `${process.env.REACT_APP_SERVER_API}/projectmanagement/${providerid}/updateuserpassword`
    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
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
