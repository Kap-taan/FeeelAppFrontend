import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../stores/AuthContext';
import classes from './Signup.module.css';

const Signup = () => {

    const { signupFunction } = useContext(AuthContext);

    const [userName, setUserName] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const navigation = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        setError('');

        // Check if any field is empty
        if(!userName || !name || !password || !confirmPassword) {
            console.log('Some Field is Empty');
            return setError('Some Field is Empty');
        }

        // Check if the passwords match
        if(password === confirmPassword) {
            const user = {
                userName, name, password
            };
            const response = await signupFunction(user);
            if(response.error) {
                return setError('User already exists');
            }
            navigation('/login');
        }
        else {
            return setError('Passwords do not match');
        }
        
    }

    return (
        <div className={classes.login}>
            <div className={classes.form_div}>
                <div className={classes.navbar__first}>
                    <a href="#">
                        <img src="media/logo/main_logo.png" alt='Main Logo' />
                    </a>
                </div>
                <h3>Sign up to Feeling</h3>
                <form onSubmit={submitHandler}>
                    <div className='error'>
                        {error}
                    </div>  
                    <div className={classes.username_div}>
                        <input type="text" name="name" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className={classes.username_div}>
                        <input type="text" name="username" placeholder="User Name" value={userName} onChange={e => setUserName(e.target.value)} />
                    </div>
                    <div className={classes.username_div}>
                        <input type="password" name="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className={classes.username_div}>
                        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                    </div>
                    <div className={classes.username_div}>
                        <input type="submit" value="Sign Up" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup