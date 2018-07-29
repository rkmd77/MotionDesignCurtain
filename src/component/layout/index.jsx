import React from 'react';
import TopNav from '../topnav/index.jsx';
// import FooterNav from 'component/footernav/index.jsx';

class Layout extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="wrapper">
                <TopNav />
                {this.props.children}
                {/* <FooterNav /> */}
            </div>
        )
    }
}

export default Layout;