import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spinner } from "react-bootstrap";

import Register from "../../pages/Auth/Register";
import Login from "../../pages/Auth/Login";
import Account from "../../pages/Auth/Account";

import { logout, reset } from "../../features/auth/authSlice";

export default function AuthGuard({ children }) {

    const [adminAuth, setAdminAuth] = useState(false);
    const [authorized, setAuthorized] = useState(false);
    const [verified, setVerified] = useState(false);
    const [page, setPage] = useState("login");

    const dispatch = useDispatch();
    const {user, isLoading, isSuccess} = useSelector((state) => state.auth);

    const refreshCode = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/refreshCode`,{
                method: 'post',
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ session_id: user.session_id })
            });
            const status = response.status;
            if(status != 200) {
                dispatch(logout());
                dispatch(reset());
                window.location.reload(false);
            }
        } catch(err) {
            dispatch(logout());
            dispatch(reset());
            window.location.reload(false);
        }
    }

    useEffect(() => {
        if(!isLoading) {
            if(user && user.token){
                setAuthorized(true);
                if(user.level === 1) {
                    setVerified(true);
                    setAdminAuth(true);
                } else {
                    if(user.level === 999) {
                        setInterval(refreshCode,30000);
                    }
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

    if(authorized && user.level === 999 && window.location.pathname.includes("account")) {
        window.location = "/";
        return;
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