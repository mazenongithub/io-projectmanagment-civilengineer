import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { appLogo, launchIcon, closeIcon } from './svg';
import PM from './pm';
import { MyStylesheet } from './styles';


class Header {



    showmenu() {
        const styles = MyStylesheet();
        const pm = new PM();
        const myuser = pm.getuser.call(this)
        const headerFont = pm.getHeaderFont.call(this)

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
                return (<Link style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.fontBold }} to={`/${myuser.providerid}/myprojects`}>  /myprojects  </Link>);
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
            if (this.state.menu === 'closed') {
                return (<button style={{ ...styles.generalButton, ...launchwidth() }} onClick={() => { this.setState({ menu: 'open' }) }}>{launchIcon()}</button>)
            }

        }

        const getcloseIcon = () => {
            if (this.state.menu === 'open') {
                return (<button style={{ ...styles.generalButton, ...launchwidth() }} onClick={() => { this.setState({ menu: 'closed' }) }}>{closeIcon()}</button>)

            }
        }

        const smalllinks = (myuser) => {
            if (this.state.menu === 'open') {
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

     


            </div>
        </div>)
    }
}

export default Header;
