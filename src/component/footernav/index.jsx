import React from 'react';

class FooterNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "Jack Black"
        }
    }
    render() {
        return (
            <div className="footer">
                <hr />
                <span>Version 1.2.3</span>
                <a href="https://motiondesign.nz">
                    <img className="img" src="https://motiondesign.nz/wp-content/themes/MD/img/logo@2x.png" alt="Logo" />
                </a>
            </div>
        )
    }
}
        
export default FooterNav;