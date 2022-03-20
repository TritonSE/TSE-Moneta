import "../css/Account.css";
import "../css/Register.css";

import Logo from "../images/Logo.svg";

export default function Register() {

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
                        <h2>Create An Account</h2>
                        <p>Already have an account? <a href="#">Log In</a></p>
                        <form>
                            <label for="nonprofit-email">Email address</label><br />
                            <input name="nonprofit-email" id="nonprofit-email" type="email"placeholder="Enter Email" /><br />
                            <label for="nonprofit-name">Name of nonprofit</label><br />
                            <input name="nonprofit-name" id="nonprofit-name" type="text" placeholder="Enter Nonprofit" /><br />
                            <input type="submit" id="account-submit" value="Continue" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}