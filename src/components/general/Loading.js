import React from "react";
import classes from './Loading.module.css';

const Loading = () => {
    return (
        <div className={classes.loading}>
            <img src="media/logo/main_logo.png" alt="Main Logo" />
        </div>
    );
}

export default Loading;