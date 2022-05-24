import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spinner } from "react-bootstrap";

import Register from "../../pages/Auth/Register";
import Login from "../../pages/Auth/Login";
import Account from "../../pages/Auth/Account";

export default function AuthGuard({ children }) {

    const [authorized, setAuthorized] = useState(false);
    const [verified, setVerified] = useState(false);
    const [page, setPage] = useState("login");

    const dispatch = useDispatch();
    const {user, isLoading, isSuccess} = useSelector((state) => state.auth);

    useEffect(() => {
        if(!isLoading) {
            if(user && user.token){
                setAuthorized(true);
                setVerified(user.verified);
            } else {
                if(authorized) {
                    setAuthorized(false);
                }
            }
        }
    },[user,isLoading,isSuccess,dispatch]);

    if(authorized && user.level > 2) return children;

    if(authorized && verified) return children;
    
    if(authorized && !verified) {
        return (
            <>
                <Account />
            </>
        )
    }

    return (
        <>
            {page == "register" && <Register setPage={() => setPage("login")}/>}
            {page == "login" && <Login setPage={() => setPage("register")}/>}
        </>
    )

}