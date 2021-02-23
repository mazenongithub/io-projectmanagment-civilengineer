import React from 'react';
import { MyStylesheet } from './styles'
import PM from './pm'
import Profile from './profile'

class Landing  {
    showslide(slide) {
        const pm = new PM();
        const styles = MyStylesheet();
        const smallslide = pm.getsmallslide.call(this)
        const regularFont = pm.getRegularFont.call(this)
        return(
        <div style={{...styles.generalFlex}}>
            <div style={{...styles.flex1}}>

        <div style={{...styles.generalContainer,...styles.showBorder,...smallslide,...styles.marginAuto}} onClick={()=>{this.setState({activeslideid:slide.id})}}>
            <img src={slide.url} alt={slide.title} style={{...smallslide}}  />
        </div>
        <div style={{...styles.generalContainer,...styles.marginAuto,...styles.alignCenter}} onClick={()=>{this.setState({activeslideid:slide.id})}}>
            <span style={{...styles.generalFont,...regularFont}}>{slide.title}</span>
        </div>


        </div>
        </div> )

    }
    

    showslides() {
        const pm = new PM();
        const slides = pm.getslides.call(this);
        const styles = MyStylesheet();
        const allslides = [];
        const landing = new Landing()
        if(slides) {
            // eslint-disable-next-line
            slides.map(slide=> {
                allslides.push(landing.showslide.call(this,slide))

            })
        }
        const templatecolumns = () => {
           
            if(this.state.width>800) {
            return (styles.triplegrid)
            } else {
                return (styles.doublegrid)
            }
        }
        
        return(<div style={{...styles.generalGrid,...templatecolumns(),...styles.bottomMargin15}}>
            {allslides}
        </div>)
        
        
    }

    showlanding() {
        const pm = new PM();
        const styles = MyStylesheet();
        const mainslide = pm.getmainslide.call(this)
        const landing = new Landing();
        const headerFont = pm.getHeaderFont.call(this)
        const regularFont = pm.getRegularFont.call(this)
        const profile = new Profile();
        const myuser = pm.getuser.call(this)
        if(myuser) {
            return(profile.showProfile.call(this))

        } else {
        const myslide = () => {
            if(this.state.activeslideid) {
            return(pm.getslidebyid.call(this,this.state.activeslideid))
            } else {
                return false;
            }
        }
        const showmainslide = () => {
 
            if(myslide()) {
                return(<div style={{...styles.generalContainer,...styles.showBorder,...mainslide,...styles.marginAuto}}>
                    <img src={myslide().url} alt={myslide().title} style={{...mainslide}}  />
                </div> )
            }

        }
        const showmaintitle = () => {

            if(myslide()) {
                return(<span style={{...styles.generalFont,...headerFont}}>{myslide().title}</span>)
            }

        }

        const showmaincaption = () => {

            if(myslide()) {
                return(<span style={{...styles.generalFont,...regularFont}}>{myslide().caption}</span>)
            }

        }
        return (
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>

                <div style={{ ...styles.generalFlex,...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter }}>

                          {showmaintitle()}

                        </div>
                    </div>


                    <div style={{ ...styles.generalFlex,...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter }}>

                          {showmainslide()}

                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex,...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter }}>

                          {showmaincaption()}

                        </div>
                    </div>

                    {landing.showslides.call(this)}

                </div>
            </div>
        )

        }
    }
}

export default Landing;