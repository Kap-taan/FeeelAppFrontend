import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../stores/AuthContext';
import classes from './Navbar.module.css';

const Navbar = ({ shownFunction, homeFunction }) => {

    const [userDetails, setUserDetails] = useState({});
    const [isCountChanged, setIsCountChanged] = useState(false);


    let navigation = useNavigate();

    console.log(userDetails);

    const tweetHandler = () => {
        shownFunction(true);
    }

    const homeHandler = () => {
        homeFunction('home');
    }

    const profileHandler = () => {
        homeFunction('profile');
    }

    const notificationHandler = () => {
        homeFunction('notification')
        isCountChanged(false);
    }

    const exploreHandler = () => {
        homeFunction('explore');
    }

    const statusHandler = () => {
        homeFunction('status');
    }

    const getInfo = async () => {
        // const response = await fetch('https://feeelapp.herokuapp.com/api/users/me', {
        const response = await fetch('https://feeelappbackend.onrender.com/api/users/me', {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('Token')}`
            }
        });
        const json = await response.json();
        if (!localStorage.getItem(`${json.userName}Notification`)) {
            localStorage.setItem(`${json.userName}Notification`, 0);
        }
        if (localStorage.getItem(`${json.userName}Notification`) < json.notifications.length) {
            setIsCountChanged(true);
        }
        setUserDetails(json);
    }

    useEffect(() => {
        getInfo();
    }, [])

    const logoutHandler = () => {
        localStorage.removeItem('Token');
        navigation('/');
    }

    // media/logo/temp.svg

    return (
        <div className={classes.navbar}>
            <div className={classes.navbar__first}>
                <a href="#">
                    <img src="media/logo/main_logo.png" alt='Main Logo' />
                </a>
            </div>
            <div className={classes.navbar__second}>
                <div className={classes.navbar__second_first} onClick={homeHandler}>
                    <img src="media/logo/home.svg" alt="Home" />
                    <h4>Home</h4>
                </div>
                <div className={classes.navbar__second_first} onClick={exploreHandler}>
                    <img src="media/logo/hash.svg" alt="Explore" />
                    <h4>Explore</h4>
                </div>
                <div className={classes.navbar__second_first} onClick={notificationHandler}>
                    {!isCountChanged && <img src="media/logo/bell.svg" alt="Notification" />}
                    {isCountChanged && <img src="media/logo/bell1.svg" alt="Notification" />}
                    <h4>Notification</h4>
                </div>
                <div className={classes.navbar__second_first} onClick={statusHandler}>
                    <img src="media/logo/envelope.svg" alt="Message" />
                    <h4>Status</h4>
                </div>
                <div className={classes.navbar__second_first} onClick={profileHandler}>
                    <img src="media/logo/user.svg" alt="Profile" />
                    <h4>Profile</h4>
                </div>
                <button onClick={tweetHandler}>Express</button>
            </div>
            <div className={classes.navbar__third}>
                <div className={classes.navbar__third_first}>

                    <img src={userDetails.profileDP} alt="Profile" />
                </div>
                <div className={classes.navbar__third_second} onClick={logoutHandler}>
                    {userDetails.name && <h3>{userDetails.name}</h3>}
                    {userDetails.userName && <h4>{userDetails.userName}</h4>}
                </div>
            </div>
        </div>
    );
}


export default Navbar;