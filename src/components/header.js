import React from 'react';
import { Link } from 'react-router-dom';
import { appLogo, launchIcon, closeIcon } from './svg';
import PM from './pm';
import { MyStylesheet } from './styles';
import './header.css'


class Header {
    handleProjects() {
        const pm = new PM();
        const navigation = pm.getnavigation.call(this)
        if (navigation) {
            navigation.show = "projects"
        }
        this.props.reduxNavigation(navigation)
        this.setState({ render: 'render' })

    }

    handlemenu() {
        const pm = new PM();
        const navigation = pm.getnavigation.call(this)
        let position = 'open'
        if (navigation.hasOwnProperty("position")) {
            position = navigation.position;
        }
        if (position === 'open') {

            navigation.position = 'closed'

        } else if (position === 'closed') {

            navigation.position = 'open'

        }

        this.props.reduxNavigation(navigation);
        this.setState({ render: 'render' })
    }

    showmenu() {
        const styles = MyStylesheet();
        const pm = new PM();
        const myuser = pm.getuser.call(this)
        const headerFont = pm.getHeaderFont.call(this)
        const navigation = pm.getnavigation.call(this)
        const header = new Header();
        let position = 'open'
        if (navigation.hasOwnProperty("position")) {
            position = navigation.position;
        }

        const link_1 = (myuser) => {
            if (myuser) {
                return (<Link to={`/${myuser.profile}/profile`} className="nav-link" style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.fontBold }}>  /{myuser.profile} </Link>);
            } else {
                return (<Link to="/" style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.fontBold }}> / </Link>);
            }

        }

        const launchwidth = () => {
            return ({ width: '65px' })
        }



        const link_2 = (myuser) => {
            if (myuser) {
                return (<Link onClick={() => { header.handleProjects.call(this) }}
                    style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.fontBold }} to={`/${myuser.providerid}/projects`}>  /projects  </Link>);
            } else {
                return (<Link to="/providers/register" style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.fontBold }}> /register </Link>);
            }

        }



        const link_3 = (myuser) => {
            if (myuser) {
                return (<div className="linkhover" style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.fontBold }} onClick={() => { pm.logoutuser.call(this) }}> logout </div>);
            } else {
                return (<Link to={`/providers/login`} style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.fontBold }}> /login </Link>);
            }

        }

        const getbutton = () => {
            if (position === 'closed') {
                return (<button style={{ ...styles.generalButton, ...launchwidth() }} onClick={() => { header.handlemenu.call(this) }}>{launchIcon()}</button>)
            }

        }

        const getcloseIcon = () => {
            if (position === 'open') {
                return (<button style={{ ...styles.generalButton, ...launchwidth() }} onClick={() => { header.handlemenu.call(this) }}>{closeIcon()}</button>)

            }
        }

        const smalllinks = (myuser) => {
            if (position === 'open') {
                return (
                    <div style={{ ...styles.generalContainer }}>
                        <div style={{ ...styles.generalContainer, ...styles.topHeader, ...styles.bottomMargin15, ...styles.showBorder }}>{link_1(myuser)}</div>
                        <div style={{ ...styles.generalContainer, ...styles.topHeader, ...styles.bottomMargin15, ...styles.showBorder }}>{link_2(myuser)}</div>
                        <div style={{ ...styles.generalContainer, ...styles.topHeader, ...styles.bottomMargin15, ...styles.showBorder }}>{link_3(myuser)}</div>
                    </div>)

            }
        }

        if (this.state.width > 600) {
            return (<div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1, ...styles.topHeader, ...styles.showBorder, ...styles.addMargin, ...styles.alignCenter }}>
                    {link_1(myuser)}
                </div>
                <div style={{ ...styles.flex1, ...styles.topHeader, ...styles.showBorder, ...styles.addMargin, ...styles.alignCenter }}>
                    {link_2(myuser)}
                </div>
                <div style={{ ...styles.flex1, ...styles.topHeader, ...styles.showBorder, ...styles.addMargin, ...styles.alignCenter }}>
                    {link_3(myuser)}
                </div>

            </div>)

        } else {

            return (<div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1, ...styles.addMargin, ...styles.alignCenter }}>
                    {getbutton()}
                </div>

                <div style={{ ...styles.flex5, ...styles.addMargin, ...styles.alignCenter }}>
                    {smalllinks(myuser)}
                </div>
                <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                    {getcloseIcon()}
                </div>


            </div>)


        }




    } // end show menu

    subHeader() {
        const pm = new PM();
        const myuser = pm.getuser.call(this)
        const headerFont = pm.getHeaderFont.call(this)
        const styles = MyStylesheet();
        if (myuser) {
            return (
                <div style={{ ...styles.generalContainer, ...styles.alignCenter}}>
                    <Link
                        to={`/${myuser.profile}/profile`} style={{ ...headerFont, ...styles.generalFont, ...styles.generalLink, ...styles.boldFont }}> /{myuser.profile}</Link>
                </div>)
        }

    }

    projectsHeader() {
        const pm = new PM();
        const navigation = pm.getnavigation.call(this)
        const styles = MyStylesheet();
        const myuser = pm.getuser.call(this)
        const headerFont = pm.getHeaderFont.call(this)
        if(myuser) {
        if(navigation.hasOwnProperty("show")) {
            const show = navigation.show;
            switch (show) {
                case "projects":
                    return( 
                        <div style={{ ...styles.generalContainer, ...styles.alignCenter}}>
                            <Link
                                to={`/${myuser.profile}/projects`} style={{ ...headerFont, ...styles.generalFont, ...styles.generalLink, ...styles.boldFont }}> /projects </Link>
                        </div>)
          
                 


                default:
                    break;
            }
        }

    }
    }



    showheader() {
        const styles = MyStylesheet();
        const header = new Header();
        const logowidth = () => {
            if (this.state.width > 1200) {
                return ({ width: '232px' })

            } else if (this.state.width > 600) {
                return ({ width: '226px' })

            } else {
                return ({ width: '154px' })

            }
        }

        const alignCenter = () => {
            if (this.state.width < 600) {
                return ({ margin: 'auto' })
            }
        }

        return (<div style={{ ...styles.generalFlex }}>
            <div style={{ ...styles.flex1 }}>

                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1 }}>
                        <div style={{ ...styles.generalContainer, ...logowidth(), ...alignCenter() }}>
                            {appLogo()}
                        </div>
                    </div>
                </div>

                {header.showmenu.call(this)}

                {header.subHeader.call(this)}

                {header.projectsHeader.call(this)}




            </div>
        </div>)
    }
}

export default Header;
