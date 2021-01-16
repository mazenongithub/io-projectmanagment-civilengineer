import React, { Component } from 'react';
import { MyStylesheet } from './styles';

class Spinner extends Component {

    constructor(props) {
        super(props)
        this.state = { render: 'render', width: 0, height: 0, activespinner:'a' }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }
    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();

        this.getSpinner = window.setInterval(() => {
            const activespinner = this.state.activespinner;
  
            switch (activespinner) {
                case "a":
                    this.setState({activespinner:"b"})
                    break;
                case "b":
                    this.setState({activespinner:"c"})
                    break;
                case "c":
                    this.setState({activespinner:"d"})
                    break;
                case "d":
                    this.setState({activespinner:"e"})
                    break;
                case "e":
                    this.setState({activespinner:"f"})
                    break;
                case "f":
                    this.setState({activespinner:"a"})
                    break;
                default:
                    break;
            }




        }, 166)

    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
        window.clearInterval(this.getSpinner);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }


    render() {
        const styles = MyStylesheet();
        const getwidth = () => {
            if (this.state.width > 1200) {
                return ({ width: '110px' })

            } else if (this.state.width > 600) {
                return ({ width: '85px' })

            } else {
                return ({ width: '60px' })

            }


        }

        const topMargin = () => {

            return ({ marginTop: '60px', marginBottom: '60px' })
        }

        const cls_a = this.state.activespinner === "a" ? 'cls-2': 'cls-1'
        const cls_b = this.state.activespinner === "b" ? 'cls-2': 'cls-1'
        const cls_c = this.state.activespinner === "c" ? 'cls-2': 'cls-1'
        const cls_d = this.state.activespinner === "d" ? 'cls-2': 'cls-1'
        const cls_e = this.state.activespinner === "e" ? 'cls-2': 'cls-1'
        const cls_f = this.state.activespinner === "f" ? 'cls-2': 'cls-1'


        return (

            <div style={{ ...styles.generalContainer, ...getwidth(), ...styles.marginAuto, ...topMargin() }}>


                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 188.71 166.9">
                    <g id="Layer_2" data-name="Layer 2"><g id="Layer_2-2" data-name="Layer 2">
                        <ellipse className={cls_a} cx="64.38" cy="27.71" rx="10.07" ry="27.69" transform="translate(-5.21 19.36) rotate(-16.44)" />
                        <ellipse className={cls_b} cx="126.61" cy="26.14" rx="27.69" ry="10.07" transform="translate(51.44 131.32) rotate(-66.11)" />
                        <ellipse className={cls_c} cx="160.52" cy="83.45" rx="27.69" ry="10.07" />
                        <ellipse className={cls_d} cx="126.61" cy="140.75" rx="10.07" ry="27.69" transform="translate(-53.41 82.16) rotate(-30)" />
                        <ellipse className={cls_e} cx="61.71" cy="140.75" rx="27.69" ry="10.07" transform="translate(-91.97 140.18) rotate(-66.11)" />
                        <ellipse className={cls_f} cx="28.19" cy="83.45" rx="27.69" ry="10.07" /></g></g></svg>
            </div>)
    }
}

export default Spinner;
