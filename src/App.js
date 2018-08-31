import React, {Component} from 'react';
import './App.css';
import FeedList from "./components/FeedList";
import NewFeed from "./components/NewFeed";
import {Switch, Route} from "react-router-dom";
import Header from "./components/Header";
import Authentication from "./components/Authentication";
import {isAuth} from "./utils/utils";
import Search from "./components/Search";
import {FEED_SORT_BY, PAGINATION_LIMIT} from "./Constants";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuth: isAuth(),
            search: null
        }
    }

    authenticate = () => {
        this.setState({isAuth: true})
    };
    unauthenticate = () => {
        this.setState({isAuth: false})
    };

    search = (search) => {
        this.setState({search})
    };

    render() {
        const {isAuth, search} = this.state;
        const variables = {
            filter: search,
            orderBy: FEED_SORT_BY,
            first: PAGINATION_LIMIT
        };
        return (
            <div className="center w85">
                <Header isAuth={isAuth} unauthenticate={this.unauthenticate}/>
                <Search search={this.search}/>
                <div className="ph3 pv1 background-gray">
                    <Switch>
                        <Route exact path="/" render={(route) => <FeedList
                            isAuth={isAuth} route={route}
                            search={this.state.search}
                        />}


                        />
                        <Route exact path="/create" render={(route) => <NewFeed isAuth={isAuth} route={route}
                                                                                variables={variables}/>}/>
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



