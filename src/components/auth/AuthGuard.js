import { useEffect, useState } from "react";

import Register from "../../pages/Auth/Register";

export default function AuthGuard({ children }) {

    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    const [session, setSession] = useState(false);
    const [page, setPage] = useState("register");

    useEffect(() => {
        setLoading(false);
    },[]);

    useEffect(() => {
        if(!loading) {
            setAuthorized(true);
        }
    },[session,loading])

    if(loading) return (<div>Loading...</div>)

    if(authorized) return children
    
    return (
        <>
            {page == "register" && <Register />}
        </>
    )

}