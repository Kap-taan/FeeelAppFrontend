import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../stores/AuthContext';
import classes from './Login.module.css';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState('');

    const { loginFunction } = useContext(AuthContext);

    const navigation = useNavigate();

    const submitHandler = async (e) => {
        setLoading(true);
        e.preventDefault();
        setError('');

        if (!username || !password) {
            setLoading(false);
            return setError('Some Field is Empty');
        }

        // console.log(username, password);
        const user = {
            userName: username,
            password: password
        }
        // Pass the values to the api
        const response = await loginFunction(user);
        if (response.error) {
            setLoading(false);
            return setError(response.error);
        }
        setLoading(false);
        navigation('/dashboard');
    }

    return (
        <div className={classes.login} >
            <div className={classes.form_div}>
                <div className={classes.navbar__first}>
                    <a href="#">
                        <img src="media/logo/main_logo.png" alt='Main Logo' />
                    </a>
                </div>
                <h3>Sign in to Feeling</h3>
                <form onSubmit={submitHandler}>
                    {loading && <div className={classes.loading}>Loading...</div>}
                    <div className='error'>
                        {error}
                    </div>
                    <div className={classes.username_div}>
                        <input type="text" name="username" value={username} placeholder="User Name" onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div className={classes.username_div}>
                        <input type="password" name="password" value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className={classes.username_div}>
                        <input type="submit" value="Login" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login