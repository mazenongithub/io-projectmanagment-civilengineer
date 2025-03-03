import React, { Component } from 'react';
import { MyStylesheet } from './styles';
import PM from './pm'


class Connecting extends Component {

    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, blk_1:'connecting-1', blk_2:'connecting-1', blk_3:'connecting-2' }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }

    componentDidMount() {

        this.getConnecting = window.setInterval(() => {
         
          
                if(this.state.blk_1 === 'connecting-2') {

                    this.setState({blk_1:'connecting-1', blk_2:'connecting-2', blk_3:'connecting-1'})

                } else if (this.state.blk_2 === 'connecting-2') {

                    this.setState({blk_1:'connecting-1', blk_2:'connecting-1', blk_3:'connecting-2'})

                } else if (this.state.blk_3 ==='connecting-2') {
                    this.setState({blk_1:'connecting-2', blk_2:'connecting-1', blk_3:'connecting-1'})

                }
             




        }, 333)

    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
        window.clearInterval(this.getConnecting);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }


    render() {

        const styles = MyStylesheet();
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this)

        const maxWidth = {maxWidth:'113px'}


        return (<div style={{ ...styles.generalContainer,  ...styles.alignCenter, ...styles.topMargin15 }}>
            <div style={{ ...styles.generalContainer, ...maxWidth, ...styles.marginAuto }}>

                <svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 113.44 24.81"><defs>
                    <style></style></defs>
                    <g id="titleText">
                        <rect className={this.state.blk_1} x=".5" y=".5" width="23.81" height="23.81" />
                        <path d="M23.81,1v22.81H1V1h22.81M24.81,0H0v24.81h24.81V0h0Z" />
                        <rect className={this.state.blk_2}x="44.81" y=".5" width="23.81" height="23.81" />
                        <path d="M68.13,1v22.81h-22.81V1h22.81M69.13,0h-24.81v24.81h24.81V0h0Z" />
                        <rect className={this.state.blk_3} x="89.13" y=".5" width="23.81" height="23.81" />
                        <path d="M112.44,1v22.81h-22.81V1h22.81M113.44,0h-24.81v24.81h24.81V0h0Z" /></g>
                </svg>
            </div>

            <div style={{ ...styles.generalContainer,  ...styles.marginAuto, ...styles.generalFont, ...styles.alignCenter }}>
                <span style={{...regularFont}}> Connecting...</span>
            </div>
            


        </div>)

    }

}

export default Connecting;