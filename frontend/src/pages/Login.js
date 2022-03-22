import React from "react";
import emailjs from "emailjs-com";
import { Snackbar, Alert } from "@mui/material";
import Logo from "../images/Logo.svg";
import Back from "../images/BackButton.svg";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

import "../css/Account.css";
import "../css/Login.css";

export default function Login() {
    const registerForm = React.useRef();
    const [snackbar, setSnackbar] = React.useState({
      open: false,
      message: "",
      severity: "",
    });

    const handleSnackClose = () => {
        setSnackbar({
          open: false,
          message: "",
          severity: "",
        });
    };

    const formCheck = async (e) => {
        e.preventDefault();

        const email = registerForm.current[0].value;
        const password = registerForm.current[1].value;

        const response = await fetch(`http://localhost:8082/organizations/${email}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        const json = await response.json();

        if(response.ok) {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log(userCredential)
                })
        }
        else {
            if(response.status == 409)
                setSnackbar({      
                    open: true,
                    message: json.msg,
                    severity: "error",
                })
            else 
                setSnackbar({      
                    open: true,
                    message: "Server error. Try again later",
                    severity: "error",
                })
        }
    }

    return (
        <div className="account-wrapper">
            <div className="background-half">
            </div>
            <div className="form-half">
                <div>
                    <div className="account-logo" >
                        <img src={Logo}/>
                        <h1>Moneta</h1>
                    </div>
                    <div className="account-form">
                        <h2>Log Into Your Account</h2>
                        <p>Don't have an account? <a href="/register">Sign Up</a></p>
                        <form ref={registerForm} onSubmit={formCheck}>
                            <label for="nonprofit-email">Email address</label><br />
                            <input required name="nonprofit-email" id="nonprofit-email" type="email"placeholder="Enter Email" /><br />
                            <label for="nonprofit-password">Password</label><br />
                            <input required name="nonprofit-password" id="nonprofit-password" type="password" placeholder="Enter Password" /><br />
                            <input type="submit" id="account-submit" value="Continue" />
                        </form>  
                    </div>
                </div>
            </div>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleSnackClose}
                anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
            >
                <Alert
                    onClose={handleSnackClose}
                    severity={snackbar.severity}
                    sx={{ width: "100%" }}
                    variant="filled"
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    )
}