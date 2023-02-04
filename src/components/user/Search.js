import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './Search.module.css';

const Search = () => {

    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [currentUser, setCurrentUser] = useState({});
    const [alreadyFollow, setAlreadyFollow] = useState(false);

    const [searchedUser, setSearchUser] = useState({});

    const [tempUser, setTempUser] = useState('');

    const getUsers = async () => {
        const response = await fetch('https://feeelappbackend.onrender.com/api/users', {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('Token')}`
            }
        });
        const json = await response.json();
        setUsers(json);
        console.log(json);
    }

    const getCurrentUser = async () => {
        // const response = await fetch('https://feeelapp.herokuapp.com/api/users/me', {
        const response = await fetch('https://feeelappbackend.onrender.com/api/users/me', {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('Token')}`
            }
        });
        const json = await response.json();
        setCurrentUser(json);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const userName = e.target.people.value;
        // const response = await fetch(`https://feeelapp.herokuapp.com/api/users/user/${userName}`, {
        const response = await fetch(`https://feeelappbackend.onrender.com/api/users/user/${userName}`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('Token')}`
            }
        });
        const json = await response.json();
        if (json.error)
            return setError('No Such User Found');
        if (currentUser.following.includes(json._id)) {
            setAlreadyFollow(true);
            setError(`You already Follow ${userName}`);
        }
        setSearchUser(json);
    }

    useEffect(() => {
        getUsers();
        getCurrentUser();
    }, [])

    useEffect(() => {
        if (tempUser === '') {
            setError('');
            getUsers();
            setSearchUser({});
        }
    }, [tempUser])

    // "Authorization": `Bearer ${localStorage.getItem('Token')}`
    const followingHandler = async (user) => {
        console.log(user);

        // Update the current user with the new follower
        // const response = await fetch(`https://feeelapp.herokuapp.com/api/users/me/following`, {
        const response = await fetch(`https://feeelappbackend.onrender.com/api/users/me/following`, {
            method: 'PATCH',
            body: JSON.stringify({ userId: user._id }),
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('Token')}`
            }
        })
        const json = await response.json();
        if (json.error)
            return setError(json.error);
        alert('New Following Added Successfully');
        getUsers();
    }

    const unFollowingHandler = (user) => {

    }


    return (
        <div className={classes.search}>
            <div className={classes.search_bar}>
                <form onSubmit={submitHandler}>
                    <input type="text" value={tempUser} onChange={e => setTempUser(e.target.value)} name="people" placeholder='Search Users' />
                </form>
            </div>
            {error && <div className={classes.error}>{error}</div>}
            {searchedUser.name !== undefined && <div className={classes.single_follower}>
                <img src={searchedUser.profileDP} alt="Profile DP" />
                <div>
                    <Link to={`/user/${searchedUser.userName}/followed`}><h4 style={{ color: '#fff' }}>{searchedUser.name}</h4></Link>
                    <h5>{searchedUser.userName}</h5>
                </div>
                {!alreadyFollow && <button onClick={() => followingHandler(searchedUser)}>Follow</button>}
                {alreadyFollow && <button onClick={() => unFollowingHandler(searchedUser)}>Following</button>}
            </div>}
            {searchedUser.name === undefined && <div className={classes.followers}>
                <h3>Suggestions</h3>
                <ul>
                    {users && users.map(user => (
                        <li>
                            <div className={classes.single_follower}>
                                <img src={user.profileDP} alt="Profile DP" />
                                <div>
                                    <Link to={`/user/${user.userName}/notFollowed`}><h4>{user.name.toUpperCase()}</h4></Link>
                                    <h5>{user.userName}</h5>
                                </div>
                                <button onClick={() => followingHandler(user)}>Follow</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>}
            {/* <div className={classes.followers}>
                <h3>Popular Hash Tags</h3>
                <ul>
                    <li>
                        <div className={classes.single_follower}>
                            <button>Follow</button>
                            <h4>FlyingBeastArrested</h4>
                        </div>
                    </li>
                    <li>
                        <div className={classes.single_follower}>
                            <button>Follow</button>
                            <h4>MACHAYENGE 4</h4>
                        </div>
                    </li>
                    <li>
                        <div className={classes.single_follower}>
                            <button>Follow</button>
                            <h4>KR$NA</h4>
                        </div>
                    </li>
                </ul>
            </div> */}
        </div>
    );
}

export default Search;