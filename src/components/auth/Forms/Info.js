import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormGroup, FormLabel, FormControl, Button, Spinner } from "react-bootstrap";
import { register, reset } from "../../../features/auth/authSlice";

import errorCodes from "../../../json/errors.json";

export default function Info() {

    const [info, setInfo] = useState({
        email: '',
        username: '',
        password: '',
        confirm: ''
    });
    const [error, setError] = useState(0);
    const [serverError, setServerError] = useState("");
    const [creating, setCreating] = useState(false);

    const dispatch = useDispatch();
    const {user, isError, message} = useSelector((state) => state.auth);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInfo(prev => ({...prev, [name]: value}));
    }

    const validateEmail = (email) => {
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return email.match(validRegex);
    }

    const registerUser = () => {
        setCreating(true);

        if(!info.email || !info.username || !info.password || !info.confirm) {
            setError(100);
            setCreating(false);
            return;
        }
        if(!validateEmail(info.email)) {
            setError(101);
            setCreating(false);
            return;
        }
        if(info.password != info.confirm) {
            setError(102);
            setCreating(false);
            return;
        } 
        const userData = {
            email: info.email,
            username: info.username,
            password: info.password
        };
        dispatch(register(userData))
        setCreating(false);
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
                <FormControl type="text" name="email" value={info.email} onChange={handleChange}/>
            </FormGroup>
            <FormGroup className="mt-3">
                <FormLabel>
                    Agent License # - must be valid TX RE license to complete final setup
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
                    Confirm Password
                </FormLabel>
                <FormControl type="password" name="confirm" value={info.confirm} onChange={handleChange}/>
            </FormGroup>
                <FormLabel>
                    By submitting this form, I agree to the following guidelines. I will not supply my Primary agent login 
                    information to ANY other person. Access to certain data is a strict violation of MLS and PowerPage terms. Any 
				    violoation will result in your account being immediately revoked and will not be reinstated and you agree to hold REMicrodata harmless. 
                    There are no refunds for the PowerPage for any reason.<br /><br />
				 </FormLabel>
            <Button variant="primary" size="sm" className="mt-3" disabled={creating} onClick={() => registerUser()}>
                {creating ? <Spinner variant="light" /> : "Submit"}
            </Button>
            {(error > 0 || serverError) && <small className="text-danger mt-3 d-block">{serverError ? serverError : errorCodes[error]}</small>}
        </>
    )

}
