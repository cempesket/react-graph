import React, {Component} from 'react';
import './App.css';
import FeedList from "./components/FeedList";
import NewFeed from "./components/NewFeed";
import {Switch, Route} from "react-router-dom";
import Header from "./components/Header";
import Authentication from "./components/Authentication";

class App extends Component {
    render() {
        return (
            <div className="center w85">
                <Header/>
                <div className="ph3 pv1 background-gray">
                    <Switch>
                        <Route exact path="/" component={FeedList}/>
                        <Route exact path="/create" component={NewFeed}/>
                        <Route exact path="/login" component={Authentication}/>
                    </Switch>
                </div>

            </div>
        );
    }
}

export default App;



