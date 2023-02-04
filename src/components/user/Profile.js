import React, { useEffect, useState } from 'react';
import classes from './Profile.module.css';

const Profile = () => {

    const [user, setUser] = useState({});

    const [userName, setUserName] = useState('');
    const [name, setName] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const getInfo = async () => {
        const response = await fetch('https://feeelappbackend.onrender.com/api/users/me', {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('Token')}`
            }
        });
        const json = await response.json();
        setUser(json);
        setUserName(json.userName);
        setName(json.name);
    }

    useEffect(() => {
        getInfo();
    }, [])

    const submitHandler = (e) => {
        e.preventDefault();
    }

    return (
        <div className={classes.profile}>
            <h3>Profile</h3>
            <form onSubmit={submitHandler}>
                <div className={classes.username_div}>
                    <input type="text" name="username" placeholder="User Name" value={userName} onChange={e => setUserName(e.target.value)} />
                </div>
                <div className={classes.username_div}>
                    <input type="text" name="name" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className={classes.username_div}>
                    <input type="password" name="oldpassword" placeholder="Old Password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
                </div>
                <div className={classes.username_div}>
                    <input type="password" name="newpassword" placeholder="New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                </div>
                <div className={classes.username_div}>
                    <input type="submit" value="Change" />
                </div>
            </form>
        </div>
    );
}

export default Profile;