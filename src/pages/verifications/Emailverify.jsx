import React from "react";
import { useState } from "react";
import { Store } from "../../store/store";
import { useNavigate } from "react-router-dom";
function Emailverify() {
    const [otp, setotp] = useState("");
    const store = Store();
    const navigate = useNavigate();

    const verifyotp = (e) => {
        e.preventDefault();
        store.verifyEmail(otp, navigate);
    };

    return (
        <div>
            <div>
                <form onSubmit={verifyotp}>
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setotp(e.target.value)}
                    />
                    <button type="submit">Verify</button>
                </form>
            </div>
        </div>
    );
}

export default Emailverify;
