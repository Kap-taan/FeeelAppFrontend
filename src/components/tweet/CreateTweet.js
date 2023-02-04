import React, { useRef, useState } from 'react';
import classes from './CreateTweet.module.css';

const CreateTweet = ({ shownFunction }) => {

    const [paragraph, setParagraph] = useState('');
    const [error, setError] = useState('');

    const createRef = useRef();
    const closeHandler = () => {
        shownFunction(false);
    }
    const clickHandler = (e) => {
        if (e.target.className === createRef.current.className) {
            shownFunction(false);
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const tweet = {
            paragraph,
            likes: 0,
            hashtags: []
        };
        const response = await fetch('https://feeelappbackend.onrender.com/api/tweets', {
            // const response = await fetch('/api/tweets', {
            method: 'POST',
            body: JSON.stringify(tweet),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('Token')}`
            }
        })
        const json = await response.json();
        if (!response.ok) {
            console.log(json.message);
            setError(json.message);
        }

        if (response.ok) {
            setError('');
            console.log('New Tweet Added');
            setParagraph('');
            shownFunction(false);
        }

    }

    return (
        <div className={classes.create} onClick={clickHandler} ref={createRef} >
            <div className={classes.modal}>
                <div className={classes.modal_first}>
                    <img src="media/logo/x.png" alt="Close" onClick={closeHandler} />
                </div>
                <div className={classes.modal_second}>
                    <div className={classes.create__first}>
                        <img src="media/logo/user.svg" alt="Profile" />
                    </div>
                    <div className={classes.create__second}>
                        <form onSubmit={submitHandler}>
                            <textarea required
                                placeholder='Express your feelings...'
                                onChange={e => setParagraph(e.target.value)}
                                value={paragraph}
                            ></textarea>
                            {/* <input type="submit" /> */}
                            <div className={classes.btnDiv}>
                                <button type='submit'>Express</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateTweet;