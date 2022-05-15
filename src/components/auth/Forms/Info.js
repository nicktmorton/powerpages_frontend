import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormGroup, FormLabel, FormControl, Button, Spinner } from "react-bootstrap";
import { register, reset } from "../../../features/auth/authSlice";

import errorCodes from "../../../json/errors.json";

export default function Info({ setStep }) {

    const [info, setInfo] = useState({
        email: '',
        username: '',
        password: '',
        confirm: ''
    });
    const [error, setError] = useState(0);
    const [creating, setCreating] = useState(false);

    const dispatch = useDispatch();
    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInfo(prev => ({...prev, [name]: value}));
    }

    const registerUser = () => {
        setCreating(true);
        if(info.password != info.confirm) {
            setError(102);
        } else {
            const userData = {
                email: info.email,
                username: info.username,
                password: info.password
            };
            dispatch(register(userData))
        }
    }

    useEffect(() => {
        if(isError) {
            setError(message);
        }
        dispatch(reset());
    },[user, isError, isSuccess, message, dispatch]);

    return (
        <>
            <FormGroup>
                <FormLabel>
                    Email
                </FormLabel>
                <FormControl type="text" name="email" value={info.email} onChange={handleChange}/>
            </FormGroup>
            <FormGroup className="mt-3">
                <FormLabel>
                    Username
                </FormLabel>
                <FormControl type="text" name="username" value={info.username} onChange={handleChange}/>
            </FormGroup>
            <FormGroup className="mt-3">
                <FormLabel>
                    Password
                </FormLabel>
                <FormControl type="password" name="password" value={info.password} onChange={handleChange}/>
            </FormGroup>
            <FormGroup className="mt-3">
                <FormLabel>
                    Confirm
                </FormLabel>
                <FormControl type="password" name="confirm" value={info.confirm} onChange={handleChange}/>
            </FormGroup>
            <Button variant="primary" size="sm" className="mt-3" disabled={creating} onClick={() => registerUser()}>
                {creating ? <Spinner variant="light" /> : "Submit"}
            </Button>
            {error > 0 && <small className="text-danger mt-3 d-block">{errorCodes[error]}</small>}
        </>
    )

}