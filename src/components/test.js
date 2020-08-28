if (myuser) {

  let myproject = pm.getprojectbytitle.call(this, title);

  if(myproject) {

  if (!myproject.hasOwnProperty("invalid")) {

    try {

      let response = await CheckProjectID(title);
      console.log(response)


      if (myproject) {
        let i = pm.getprojectkeytitle.call(this, title)
        if (response.hasOwnProperty("valid")) {

          if (myuser.projects.myproject[i].hasOwnProperty("valid")) {
            delete myuser.projects.myproject[i].invalid;
            this.props.reduxUser(myuser)
            this.setState({ message: '' })
          }



        } else if (response.hasOwnProperty("invalid") && myproject) {
          myuser.projects.myproject[i].invalid = response.invalid;
          this.props.reduxUser(myuser)
          this.setState({ message: response.message })

        }

      }



    } catch (err) {
      alert(err)
    }

  }