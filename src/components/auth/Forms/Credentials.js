import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, FormGroup, FormLabel, FormControl, Button, Spinner } from "react-bootstrap";
import { login, reset } from "../../../features/auth/authSlice";

import errorCodes from "../../../json/errors.json";

export default function Credentials({ setStep }) {

    const [info, setInfo] = useState({
        email: '',
        password: '',
        code: ''
    });
    const [type, setType] = useState("code");
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
        let userData;
        if(type === "admin") {
            if(!info.email || !info.password) {
                setError(100);
                setLoggingIn(false);
                return;
            }
            userData = {
                email: info.email,
                password: info.password,
                type: 1
            };
        } else {
            if(!info.code) {
                setError(100);
                setLoggingIn(false);
                return;
            }
            userData = {
                code: info.code,
                type: 2
            };
        }
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
            <div key="login-radios" className="mb-3">
                <Form.Check
                inline
                label="Validation Code"
                name="loginradiogroup"
                type="radio"
                id="login-radio-code"
                checked={type === "code"}
                onChange={() => setType("code")}
                />
                <Form.Check
                inline
                label="Admin Credentials"
                name="loginradiogroup"
                type="radio"
                id="login-radio-admin"
                checked={type === "admin"}
                onChange={() => setType("admin")}
                />
            </div>
            {type === "admin" && (
                <>
                    <FormGroup>
                        <FormLabel>
                            Email
                        </FormLabel>
                        <FormControl type="text" name="email" value={info.email || ''} onChange={handleChange}/>
                    </FormGroup>
                    <FormGroup className="mt-3">
                        <FormLabel>
                            Password
                        </FormLabel>
                        <FormControl type="password" name="password" value={info.password || ''} onChange={handleChange}/>
                    </FormGroup>
                </>
            )}
            {type === "code" && (
                <>
                    <FormGroup>
                        <FormLabel>
                            Validation Code
                        </FormLabel>
                        <FormControl type="text" name="code" value={info.code || ''} onChange={handleChange}/>
                    </FormGroup>
                </>
            )}
            <Button variant="primary" size="sm" className="mt-3" disabled={loggingIn} onClick={() => loginUser()}>
                {loggingIn ? <Spinner variant="light" /> : "Submit"}
            </Button>
            {(error > 0 || serverError) && <small className="text-danger mt-3 d-block">{serverError ? serverError : errorCodes[error]}</small>}
        </>
    )

}