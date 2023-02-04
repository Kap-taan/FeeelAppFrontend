import React, { useEffect, useState } from 'react';
import classes from './Notification.module.css';

const Notification = ({ setIsChanged }) => {

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    const compare = (a, b) => {
        if (a.created_at > b.created_at) {
            return -1;
        }
        if (a.created_at < b.created_at) {
            return 1;
        }

        return 0;
    }

    const getNotifications = async () => {
        const response = await fetch('https://feeelappbackend.onrender.com/api/users/me', {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('Token')}`
            }
        });
        const json = await response.json();
        json.notifications.sort(compare);
        localStorage.setItem(`${json.userName}Notification`, json.notifications.length);
        setNotifications(json.notifications);
        setLoading(false);

    }

    useEffect(() => {
        getNotifications();
    }, [])

    return (
        <div className={classes.notification}>
            <h2>Notifications</h2>
            <div className={classes.notification_first}>
                {loading && <div className='loading'>Loading...</div>}
                {notifications[0] === undefined && <div className='loading'>No Notifications</div>}
                <ul>
                    {notifications && notifications.map(notification => (<li>
                        <div className={classes.notification_second}>
                            <img src="media/logo/user.svg" alt="Profile" />
                            <p>{notification.message}</p>
                        </div>
                    </li>))}
                </ul>
            </div>
        </div>
    );
}

export default Notification;