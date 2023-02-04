import React, { useContext } from "react"
import { Navigate, useLocation } from "react-router-dom"
import AuthContext from "../stores/AuthContext"

function PublicAuth({ children }) {
    let location = useLocation();
    if (!localStorage.getItem('Token')) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default PublicAuth;