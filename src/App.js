import React, {Component} from 'react';
import './App.css';
import FeedList from "./components/FeedList";
import NewFeed from "./components/NewFeed";
import {Switch, Route} from "react-router-dom";
import Header from "./components/Header";
import Authentication from "./components/Authentication";
import {isAuth} from "./utils/utils";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuth: isAuth()
        }
    }

    authenticate = () => {
        this.setState({isAuth: true})
    };
    unauthenticate = () => {
        this.setState({isAuth: false})
    };

    render() {
        const {isAuth} = this.state;
        return (
            <div className="center w85">
                <Header isAuth={isAuth} unauthenticate={this.unauthenticate}/>
                <div className="ph3 pv1 background-gray">
                    <Switch>
                        <Route exact path="/" render={(route) => <FeedList isAuth={isAuth} route={route}/>}/>
                        <Route exact path="/create" render={(route) => <NewFeed isAuth={isAuth} route={route}/>}/>
                        <Route exact path="/login"
                               render={(route) => <Authentication isAuth={isAuth} authenticate={this.authenticate}
                                                                  route={route}/>}/>
                    </Switch>
                </div>

            </div>
        );
    }
}

export default App;



