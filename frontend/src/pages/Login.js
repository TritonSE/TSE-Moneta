import React from "react";
import { Snackbar, Alert } from "@mui/material";
import Logo from "../images/Logo.svg";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, authCheck } from "../firebaseConfig";
import { useNavigate } from "react-router";

import "../css/Account.css";
import "../css/Login.css";

export default function Login({setOrgInfo}) {
    const registerForm = React.useRef();
    const [snackbar, setSnackbar] = React.useState({
      open: false,
      message: "",
      severity: "",
    });

    const navigate = useNavigate();

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
        let status = "";

        if(json.getCompany)
            status = json.getCompany[0].Status;

        if(response.ok && status == "accepted") {
            const org = json.getCompany[0];

            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    setOrgInfo({
                        name: org.Name,
                        email: org.Email,
                        organizationId: org.OrganizationID,
                        approvedUsers: org.ApprovedUsers,
                        id: org._id
                    })},
                    navigate("/dashboard")
                )
                .catch(() => setSnackbar({      
                    open: true,
                    message: "Incorrect password.",
                    severity: "error",
                }))
        }
        else {
            if(status == "pending") {
                setSnackbar({      
                    open: true,
                    message: "The registration status of your account is still pending. Please check back later.",
                    severity: "error",
                })
            }
            else if(status == "denied") {
                setSnackbar({      
                    open: true,
                    message: "Your registration application has been denied.",
                    severity: "error",
                })
            }
            else if(response.status == 400)
                setSnackbar({      
                    open: true,
                    message: "This email is not registered with Moneta.",
                    severity: "error",
                })
            else if(response.status == 409)
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
                            <label htmlFor="nonprofit-email">Email address</label><br />
                            <input required name="nonprofit-email" id="nonprofit-email" type="email"placeholder="Enter Email" /><br />
                            <label htmlFor="nonprofit-password">Password</label><br />
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