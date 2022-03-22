import React from "react";
import emailjs from "emailjs-com";
import { Snackbar, Alert } from "@mui/material";
import Logo from "../images/Logo.svg";
import Back from "../images/BackButton.svg";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

import "../css/Account.css";
import "../css/Register.css";

export default function Register() {
    const registerForm = React.useRef();
    const [registered, setRegistered] = React.useState(false);
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
        const name = registerForm.current[1].value;
        const password = registerForm.current[2].value;

        if(password.length < 8) 
            return setSnackbar({      
                open: true,
                message: "Password must be at least 8 characters long",
                severity: "error",
            })

        const response = await fetch("http://localhost:8082/organizations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ Name: name, Email: email, Password: password }),
        });

        const json = await response.json();

        if(response.ok) {
            sendEmail(e);
            setRegistered(true);
            createUserWithEmailAndPassword(auth, email, password);
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

    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_2qqpih5', 'template_oz3hlxd', registerForm.current, 'Gi5qKcyxH5m4iCECW')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    };

    return (
        <div className="account-wrapper">
            <div className="background-half">
            </div>
            <div className="form-half">
                <div>
                    {registered && <div id="button-container" onClick={()=>setRegistered(false)}><img src={Back} /><p>Back</p></div>}
                    <div className="account-logo" >
                        <img src={Logo}/>
                        <h1>Moneta</h1>
                    </div>
                    <div className="account-form">
                        {!registered ? (
                            <>
                                <h2>Create An Account</h2>
                                <p>Already have an account? <a href="/login">Log In</a></p>
                                <form ref={registerForm} onSubmit={formCheck}>
                                    <label for="nonprofit-email">Email address</label><br />
                                    <input required name="nonprofit-email" id="nonprofit-email" type="email"placeholder="Enter Email" /><br />
                                    <label for="nonprofit-name">Name of nonprofit</label><br />
                                    <input required name="nonprofit-name" id="nonprofit-name" type="text" placeholder="Enter Nonprofit" /><br />
                                    <label for="nonprofit-password">Create Password</label><br />
                                    <input required name="nonprofit-password" id="nonprofit-password" type="password" placeholder="Enter Password" /><br />
                                    <input type="submit" id="account-submit" value="Continue" />
                                </form>
                            </>
                        ) : (
                            <>
                                <h2>Your Registration is Under Review.</h2>
                                <h3>Please wait up to 24 hours to receive a response.</h3>
                                <p>Haven't received a reponse yet? <a href="#">Contact us.</a></p>
                            </>
                        )}
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