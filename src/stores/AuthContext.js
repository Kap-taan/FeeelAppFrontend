import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const loginFunction = async (user) => {
        // const response = await fetch('https://feeelapp.herokuapp.com/api/users/login', {
        const response = await fetch('https://feeelappbackend.onrender.com/api/users/login', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        console.log(json);
        if (json.token)
            localStorage.setItem('Token', json.token);
        return json;
    }

    const signupFunction = async (user) => {
        // const response = await fetch('https://feeelapp.herokuapp.com/api/users', {
        const response = await fetch('https://feeelappbackend.onrender.com/api/users', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        console.log(json);
        return json;
    }

    const value = {
        loginFunction,
        signupFunction
    };

    // const getInfo = async () => {
    //     const response = await fetch('/api/users/me', {
    //         method: 'GET',
    //         headers: {
    //             "Authorization": `Bearer ${localStorage.getItem('Token')}`
    //         }
    //     });
    //     const json = await response.json();
    //     setUserDetails(json);
    // }

    useEffect(() => {
        // getInfo();
    }, [])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;