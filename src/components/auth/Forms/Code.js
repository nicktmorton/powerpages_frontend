import { useState, useRef } from "react";
import { FormGroup, FormLabel, FormControl, Button, Spinner } from "react-bootstrap";

import errorCodes from "../../../json/errors.json";

export default function Code({ setStep }) {

    const [code, setCode] = useState(null);
    const [error, setError] = useState(0);
    const [validating, setValidating] = useState(false);

    const codeRef = useRef();

    const validateCode = async () => {
        const result = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/validateCode/${code}`);
        console.log("Validate response: ",result);
        if(result.status != 200) {
            codeRef.current.value = null;
            setError(101);
            setValidating(false);
            return;
        }
        setError(0);
        setValidating(false);
        setStep();
    }

    return (
        <>
            <FormGroup>
                <FormLabel>
                    Please enter your validation code
                </FormLabel>
                <FormControl type="text" name="code" ref={codeRef} onChange={event => setCode(event.target.value)}/>
            </FormGroup>
            <Button variant="primary" size="sm" className="mt-3" disabled={validating} onClick={() => validateCode()}>
                {validating ? <Spinner variant="light" /> : "Submit"}
            </Button>
            {error > 0 && <small className="text-danger mt-3 d-block">{errorCodes[error]}</small>}
        </>
    )

}