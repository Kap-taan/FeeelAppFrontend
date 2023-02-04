import React, { useContext, useEffect, useState } from 'react';
import Tweet from '../tweet/Tweet';
import CreateTweetShort from '../tweet/CreateTweetShort';
import classes from './Home.module.css';
import AuthContext from '../../stores/AuthContext';

const Explore = () => {

    const [tweets, setTweets] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchTweets = async () => {
        const response = await fetch('https://feeelappbackend.onrender.com/api/tweets', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('Token')}`
            }
        });
        const json = await response.json();
        // Now json contain the arrray of tweets objects
        if (response.ok) {
            setTweets(json);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTweets();
    }, [])

    return (
        <div className={classes.home}>
            <CreateTweetShort />
            {loading && <div className='loading'>Loading...</div>}
            {tweets && tweets.map(tweet => <Tweet data={tweet} />)}
        </div>
    );
}

export default Explore;