import React, { useEffect, useState } from 'react';
import classes from './Status.module.css';

const Status = () => {

    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);

    const getInfo = async () => {
        const response = await fetch('https://feeelappbackend.onrender.com/api/users/me/followers', {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('Token')}`
            }
        });
        const json = await response.json();
        setFollowers(json);

        const response1 = await fetch('https://feeelappbackend.onrender.com/api/users/me/following', {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('Token')}`
            }
        });
        const json1 = await response1.json();

        setFollowing(json1);

    }

    const unfollowHandler = async (following) => {
        const followingId = following._id;
        const response = await fetch('https://feeelappbackend.onrender.com/api/users/me/unfollow', {
            method: 'PATCH',
            body: JSON.stringify({
                followingId: followingId
            }),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('Token')}`
            }
        });
        const json = await response.json();
        if (json.error)
            return alert(json.error);
        alert(json.message);
        getInfo();
    }

    useEffect(() => {
        getInfo();
    }, [])

    return (
        <div className={classes.status}>
            <h2>Status</h2>
            <div className={classes.status_first}>
                <h3>Following</h3>
                <div className={classes.notification_first}>
                    <ul>
                        {following && following.map(followingg => (<li>
                            <div className={classes.notification_second}>
                                <img src="media/logo/user.svg" alt="Profile" />
                                <p>{followingg.userName}</p>
                                <button onClick={() => unfollowHandler(followingg)}>Unfollow</button>
                            </div>
                        </li>))}
                    </ul>
                </div>
            </div>
            <div className={classes.status_first}>
                <h3>Followers</h3>
                <div className={classes.notification_first}>
                    <ul>
                        {followers && followers.map(follower => (<li>
                            <div className={classes.notification_second}>
                                <img src="media/logo/user.svg" alt="Profile" />
                                <p>{follower.userName}</p>
                                <div></div>
                            </div>
                        </li>))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Status;