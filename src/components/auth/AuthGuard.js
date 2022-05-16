import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Register from "../../pages/Auth/Register";
import Login from "../../pages/Auth/Login";

export default function AuthGuard({ children }) {

    //const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    const [page, setPage] = useState("login");

    const dispatch = useDispatch();
    const {user, isLoading, isSuccess} = useSelector((state) => state.auth);

    useEffect(() => {
        if(!isLoading) {
            if(user && user.token){
                setAuthorized(true);
            } else {
                if(authorized) {
                    setAuthorized(false);
                }
            }
        }
    },[user,isLoading,isSuccess,dispatch]);

    if(authorized) return children
    
    return (
        <>
            {page == "register" && <Register setPage={() => setPage("login")}/>}
            {page == "login" && <Login setPage={() => setPage("register")}/>}
        </>
    )

}