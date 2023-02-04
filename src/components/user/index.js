import React, { useState } from 'react';
import CreateTweet from '../tweet/CreateTweet';
import Home from './Home';
import classes from './Index.module.css';
import Navbar from './Navbar';
import Profile from './Profile';
import Search from './Search';
import Notification from './Notification';
import Explore from './Explore';
import Status from './Status';

const Index = () => {

    const [isShown, setIsShown] = useState(false);
    const [shown, setShown] = useState('home');

    return (
        <div className={classes.index}>
            {!isShown && <div className={classes.index_first}>
                <Navbar shownFunction={setIsShown} homeFunction={setShown} />
                {shown === 'home' && <Home />}
                {shown === 'profile' && <Profile />}
                {shown === 'notification' && <Notification />}
                {shown === 'explore' && <Explore />}
                {shown === 'status' && <Status />}
                <Search />
            </div>}
            {isShown && <div>
                <CreateTweet shownFunction={setIsShown} />
            </div> }        
        </div>
    );
}

export default Index;