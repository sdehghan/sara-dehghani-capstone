import React from 'react'
import './Login.scss'
import axios from 'axios';
import { SERVER_ADDRESS } from '../../config';


class Login extends React.Component {

    submitHandler = (event) => {
        event.preventDefault();
        if (event.target.password.value.length < 6) {
            alert("Your password should be at 6 characters")
        } else {
            let user = { username: event.target.username.value, password: event.target.password.value }
            axios.post(`${SERVER_ADDRESS}/login`, user)
                .then(response => {
                    if (response.data) {
                        return this.props.history.push('/search')
                    }
                    else {
                        return (
                            this.props.history.push('/')
                        )
                    }
                }).catch(err => console.log(err))
        }
    }

    render() {

        return (
            <div className="image-login">
                <form className="login" autoComplete="off"  onSubmit={this.submitHandler}>
                    <div className="login__box">
                        <label className="login__label">Username</label>
                        <input className="login__input-user login__input-user--change" name="username"></input>
                    </div>
                    <div className="login__box">
                        <label className="login__label">Password</label>
                        <input className="login__input-user" type="password" name="password"></input>
                    </div>
                    <button className="login__button-user">Login</button>
                </form>
            </div>
        )
    }
}
export default Login;