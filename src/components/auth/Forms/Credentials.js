import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormGroup, FormLabel, FormControl, Button, Spinner } from "react-bootstrap";
import { login, reset } from "../../../features/auth/authSlice";

import errorCodes from "../../../json/errors.json";

export default function Credentials({ setStep }) {

    const [info, setInfo] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(0);
    const [serverError, setServerError] = useState("");
    const [loggingIn, setLoggingIn] = useState(false);

    const dispatch = useDispatch();
    const {user, isError, message} = useSelector((state) => state.auth);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInfo(prev => ({...prev, [name]: value}));
    }

    const loginUser = () => {
        setLoggingIn(true);

        if(!info.email || !info.password) {
            setError(100);
            setLoggingIn(false);
            return;
        }
        const userData = {
            email: info.email,
            password: info.password
        };
        dispatch(login(userData));
        setLoggingIn(false);
    }

    useEffect(() => {
        if(isError) {
            setServerError(message);
        }
        dispatch(reset());
    },[user, isError, message]);

    return (
        <>
            <FormGroup>
                <FormLabel>
                    Email
                </FormLabel>
                <FormControl type="text" name="email" value={info.email} onChange={handleChange} autoComplete="new-password"/>
            </FormGroup>
            <FormGroup className="mt-3">
                <FormLabel>
                    Password
                </FormLabel>
                <FormControl type="password" name="password" value={info.password} onChange={handleChange} autoComplete="new-password"/>
            </FormGroup>
            <Button variant="primary" size="sm" className="mt-3" disabled={loggingIn} onClick={() => loginUser()}>
                {loggingIn ? <Spinner variant="light" /> : "Submit"}
            </Button>
            {(error > 0 || serverError) && <small className="text-danger mt-3 d-block">{serverError ? serverError : errorCodes[error]}</small>}
        </>
    )

}