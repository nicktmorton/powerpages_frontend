import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spinner } from "react-bootstrap";

import Register from "../../pages/Auth/Register";
import Login from "../../pages/Auth/Login";
import Account from "../../pages/Auth/Account";

export default function AuthGuard({ children }) {

    const [adminAuth, setAdminAuth] = useState(false);
    const [authorized, setAuthorized] = useState(false);
    const [verified, setVerified] = useState(false);
    const [page, setPage] = useState("login");

    const dispatch = useDispatch();
    const {user, isLoading, isSuccess} = useSelector((state) => state.auth);

    useEffect(() => {
        if(!isLoading) {
            if(user && user.token){
                setAuthorized(true);
                if(user.level === 1) {
                    setVerified(true);
                    setAdminAuth(true);
                } else {
                    setVerified(user.verified);
                }
            } else {
                if(adminAuth) {
                    setAdminAuth(false);
                }
                if(authorized) {
                    setAuthorized(false);
                }
            }
        }
    },[user,isLoading,isSuccess,dispatch]);

    if(authorized && window.location.pathname.includes("admin")) {
        if(!adminAuth) {
            window.location = "/";
            return;
        }
    }

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