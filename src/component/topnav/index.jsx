import React from 'react';
import { Link } from 'react-router-dom'

class TopNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "Jack Black"
        }
    }
    render() {
        return (
            <div className="navbar navbar-default top-navbar" role="navigation">
                <div className="navbar-header">
                    {/* <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".sidebar-collapse">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button> */}
                    <Link className="navbar-brand" to="/"><b>Motion Design</b> Curtain</Link>
                </div>

                <ul className="nav navbar-top-links navbar-right">
                    <li className="dropdown">
                        <a className="dropdown-toggle" href="javascript:;">
                            <span>{this.state.username} </span>
                            <i className="fa fa-user"></i>
                        </a>
                    </li>
                </ul>
            </div>
        )
    }
}

export default TopNav;