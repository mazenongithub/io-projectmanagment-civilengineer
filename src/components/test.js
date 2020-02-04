showpassword() {
    const styles = MyStylesheet();
    const pm = new PM();
    const regularFont = pm.getRegularFont.call(this);
    const goIcon = pm.getGoIcon.call(this)

    const showButton = () => {
        if (this.state.pass && this.state.passwordcheck) {
            return (<button style={{ ...styles.generalButton, ...goIcon }}>{purpleCheck()}</button>)
        } else {
            return;
        }
    }

    if (this.state.width > 800) {
        return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
            <div style={{ ...styles.flex2, ...styles.generalFont, ...regularFont }}>
                Password
            </div>
            <div style={{ ...styles.flex3 }}>
                <input type="password" style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }}
                    value={this.state.pass}
                    onChange={event => { this.handlepassword(event.target.value) }}

                />
            </div>
            <div style={{ ...styles.flex1 }}>
                {showButton()}
            </div>
        </div>)
    } else {
        return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
            <div style={{ ...styles.flex1 }}>

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                        Password
                    </div>
                </div>

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex2 }}>
                        <input type="Password" style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }}
                            value={this.state.pass}
                            onChange={event => { this.setState({ pass: event.target.value }) }}

                        />
                    </div>
                    <div style={{ ...styles.flex1 }}>
                        {showButton()}
                    </div>
                </div>

            </div>
        </div>)
    }
}