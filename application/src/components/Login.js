import React, { Component } from 'react';
import axios from 'axios';

const url = 'http://localhost:9000';

const initialUser = {
    username: '',
    password: '',
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
        user: { ...initialUser },
        message: '',
        };
}

inputHandler = (event) => {
    const { name, value } = event.target;
    this.setState({ user: { ...this.state.user, [name]: value } });
}

submitHandler = (event) => {
    event.preventDefault();

    axios.post(`${url}/api/login`, this.state.user)
        .then((res) => {
            if (res.status === 200 && res.data) {
                localStorage.setItem('Token', res.data.token);//I still have local storage from the instagram clone lol I was so confused
                this.props.history.push('/');
        } else {
            throw new Error();
            }
        })
        .catch((err) => {
            this.setState({
            message: 'Authentication failed.',
            user: { ...initialUser },
            });
        });
}

    render() {
        return (
            <div>
                <h2>Login</h2>
                <form onSubmit={this.submitHandler}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={this.state.user.username}
                        onChange={this.inputHandler}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="text"
                        id="password"
                        name="password"
                        value={this.state.user.password}
                        onChange={this.inputHandler}
                    /> 
                    {/* change above to type password when done */}
                    <button type="submit">Submit</button>
                    </form>
                    { this.state.message
                    ? (<h4>{this.state.message}</h4>)
                    : undefined
                    }
            </div>
        );
    }
}

export default Login
