getprofileurl() {
    const pm = new PM();
    const myuser = pm.getuser.call(this);
    let profileurl = "";
    if (myuser) {
        profileurl = myuser.profileurl;
    }

    return profileurl;
}
handleprofileurl(profileurl) {
    const pm = new PM();
    let myuser = pm.getuser.call(this);
    if (myuser) {
        myuser.profileurl = profileurl;
        this.props.reduxUser(myuser)
        this.setState({ render: 'render' });
    }

}