import React from 'react';
import classes from './Tweet.module.css';

const Tweet = ({data}) => {
    console.log(data);
    return (
        <div className={classes.tweet}>
            <div className={classes.tweet__first}>
                <img src='media/img/profile.svg' alt="Profile" />
            </div>
            <div className={classes.tweet__second}>
                <div className={classes.tweet__second_first}>
                    <h5>{data.userName}</h5>
                    {/* <div className={classes.tweet__second__second}> */}
                        <h6>{data.userId}</h6>
                        <h6>{new Date(data.createdAt).toDateString()}</h6>
                    {/* </div> */}
                </div>
                <div className={classes.tweet__second_second}>
                    <p>
                        {data.paragraph}
                    </p>
                    {/* <img src="media/img/post.jpg" alt="Post" /> */}
                </div>
            </div>
        </div>
    );
}

export default Tweet;