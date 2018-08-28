import React, {Component} from 'react';
import {Mutation} from "react-apollo";
import {LOGIN, SIGNUP} from "../queries/Query";

class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: true,
            email: '',
            name: '',
            password: ''
        }
    }

    render() {
        const {name, email, password} = this.state;
        return (
            <div>
                <div className="flex flex-column">
                    {!this.state.login && (<input type="text" placeholder="Your Name" value={name}
                                                  onChange={(e) => this.setState({name: e.target.value})}/>)}
                    <input type="text" placeholder="Your Email" value={email}
                           onChange={(e) => this.setState({email: e.target.value})}/>
                    <input type="password" placeholder="password" value={password}
                           onChange={(e) => this.setState({password: e.target.value})}/>
                </div>
                <div className="flex mt3">
                    <Mutation mutation={this.state.login ? LOGIN : SIGNUP} variables={{name, email, password}}

                              onCompleted={this._submit}
                              onError={(err) => alert(err.graphQLErrors[0].message)}
                    >
                        {(mutation, {loading}) => {

                            if (loading)
                                return (<p>Loading...</p>);

                            return (<div>
                                    <div className="pointer mr2 button" onClick={mutation}>
                                        {this.state.login ? 'Login' : 'SignUp'}
                                    </div>
                                </div>


                            )
                        }}

                    </Mutation>
                    <div className="pointer button" onClick={() => this.setState({login: !this.state.login})}>
                        {this.state.login ? 'Dont have an account? Click here for signing up' : 'Already have an account. Login here'}
                    </div>
                </div>
            </div>
        );
    }

    _saveUser = (token) => {
        localStorage.setItem('token', token)
    };
    _submit = (data) => {
        const token = this.state.login ? data.login.token : data.signup.token;
        if (token)
            this._saveUser(token);

        this.props.history.push('/')
    };
}


export default Authentication;
