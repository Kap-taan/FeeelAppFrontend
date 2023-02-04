import React from 'react';
import { Link } from 'react-router-dom';
import classes from './MainPage.module.css';

const MainPage = () => {
    return (
        <div className={classes.home}>
            <div className={classes.home_first}>
                <img src="media/logo/main_logo.png" alt="Main" />
                <h1>Feeling App</h1>
            </div>
            <div className={classes.home_second}>
                <img src="media/logo/main_logo.png" alt="Main" /> 
                <h2>What's Feeling Now</h2>
                <h4>Join Feel Now</h4>
                <div className={classes.btn}>
                    <Link to="/login">Sign In</Link>
                    <Link to="/signup">Sign Up</Link>
                </div>
            </div>
        </div>
    );
}

export default MainPage;