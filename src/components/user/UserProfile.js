import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Tweet from '../tweet/Tweet';
import classes from './UserProfile.module.css';

const UserProfile = () => {
    const { userName, isFollowed } = useParams();
    // const user = {
    //     following: ['Anuj', 'Tushar', 'Parikshit'],
    //     followers: ['Anuj', 'Tushar', 'Parikshit'],
    //     userName: 'tushar21',
    //     profileDP: 'https://i.pinimg.com/originals/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg',
    //     bio: 'I make web applications',
    //     name: 'Tushar Pasricha'
    // }

    const [user, setUser] = useState({});
    const [error, setError] = useState('');

    const [tweets, setTweets] = useState(null);
    const [loading, setLoading] = useState(true);

    const getUser = async () => {
        setError('');
        const response = await fetch(`https://feeelappbackend.onrender.com/api/users/user/${userName}`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('Token')}`
            }
        });
        const json = await response.json();
        if (json.error)
            return setError('No Such User Found');
        setUser(json);
    }

    const fetchTweets = async () => {
        const response = await fetch(`https://feeelappbackend.onrender.com/api/tweets/user/${userName}`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('Token')}`
            }
        });
        const json = await response.json();
        console.log(json);
        // Now json contain the arrray of tweets objects
        setTweets(json);
        setLoading(false);
    }

    const unFollowHandler = () => {

    }

    useEffect(() => {
        getUser();
        fetchTweets();
    }, [])

    return (
        <div className={classes.userProfile}>
            <div className="error">{error}</div>
            {user.name !== undefined && <div className={classes.userProfile_first}>
                <div className={classes.userProfile_first__first}>
                    <div className={classes.profilePic}>
                        <img src={user.profileDP} alt="Profile DP" />
                    </div>
                    <div className={classes.profileTitle}>
                        <h2>{user.name}</h2>
                        <h4>@{user.userName}</h4>
                    </div>
                </div>
                <div className={classes.status}>
                    <div>

                    </div>
                    <div>
                        {isFollowed === 'notFollowed' && <h5>Follow</h5>}
                        {isFollowed === 'followed' && <h5 onClick={unFollowHandler}>Following</h5>}
                    </div>
                    <h4>{user.following.length} Following</h4>
                    <h4>{user.followers.length} Followers</h4>
                </div>
                <div className={classes.tweets}>
                    {loading && <div className='loading'>Loading...</div>}
                    {tweets && tweets.map(tweet => <Tweet data={tweet} />)}
                </div>
            </div>}
        </div>
    );
}

export default UserProfile;