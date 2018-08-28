import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';


class Header extends Component {


    getAuthenticationBlock = () => {
        const token = localStorage.getItem('token');
        if (token) {
            return (<button className="ml1 no-underline black" onClick={() => {
                localStorage.removeItem('token');
                this.setState({auth: false})
            }}>logout</button>)
        }
        return (<Link to="/login" className="ml1 no-underline black">
            Login
        </Link>)
    };

    render() {
        return (
            <div className="flex pa1 justify-between nowrap orange">
                <div className="flex flex-fixed black">
                    <div className="fw7 mr1">Hacker News</div>
                    <Link to="/" className="ml1 no-underline black">
                        Feed
                    </Link>
                    <div className="ml1">|</div>
                    <Link to="/create" className="ml1 no-underline black">
                        Add Feed
                    </Link>
                    <div className="ml1">|</div>
                    {this.getAuthenticationBlock()}
                </div>
            </div>
        );
    }
}


export default withRouter(Header);
