import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Register from "../../pages/Auth/Register";

export default function AuthGuard({ children }) {

    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    const [page, setPage] = useState("register");

    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);

    useEffect(() => {
        setLoading(false);
    },[]);

    useEffect(() => {
        if(!loading && user) {
            setAuthorized(true);
        }
    },[user,loading]);

    if(loading) return (<div>Loading...</div>)

    if(authorized) return children
    
    return (
        <>
            {page == "register" && <Register />}
        </>
    )

}