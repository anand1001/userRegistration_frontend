import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Registration from "./App";
import Login from "./LoginPage";
import User from "./UserPage";
import history from './history';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/user_profile" component={User} />
                </Switch>
            </Router>
        )
    }
}