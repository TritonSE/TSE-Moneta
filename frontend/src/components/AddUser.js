/**
 * Create group module that appears when the user wants to add a new group type.
 * Prompts user for name of group and its fields. Allows user to add more fields
 * if needed.
 *
 * @summary Module that displays form for adding group
 * @author Kevin Fu
 * @author William Wu
 */

 import React from "react";
 import emailjs from "emailjs-com";
 import "../css/AddUser.css";
 
 /**
  * Renders create group module
  *
  * @return jsx for create group module
  */
 export default function AddUser({orgId}) {
    const addUserForm = React.useRef();

    /**
     * Sends email with to user
     */
    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm(
        "service_2qqpih5",
        "template_oz3hlxd",
        registerForm.current,
        "Gi5qKcyxH5m4iCECW"
      );
    };

    const formCheck = async (e) => {
        e.preventDefault();
    
        // form information
        const fullName = addUserForm.current[0].value;
        const email = addUserForm.current[1].value;
    
        const userExists = await fetch(`http://localhost:8082/users?email=${email}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        const orgExists = await fetch(`http://localhost:8082/organizations/${email}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if(userExists.status === 200) {
            console.log("A user with the provided email already exists.");
            return;
        }

        if(orgExists.status === 200) {
            console.log("An organization with the provided email already exists");
            return;
        }

        const data = {
            fullName,
            email,
            organizationId: orgId
        }

        const response = await fetch(`http://localhost:8082/users`, {
            method: "POST",
            mode: "cors",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data)
        }) 

        console.log(response);
    };

   return (
     <div className="modal-background">
       <div className="modal-view">
            <div className="user-header">
                <h2>Add Employee</h2>
                <p>Added employees will receive an email notification about their new access.</p>
            </div>
            <div className="user-form-wrapper">
                <form ref={addUserForm} onSubmit={formCheck}>
                    <label htmlFor="form-full-name">
                        Employee Name<br />
                        <input type="text" placeholder="Full name" name="form-full-name" required /><br />
                    </label>
                    <label htmlFor="form-email">
                        Employee Email<br />
                        <input type="email" placeholder="abc@email.com" name="form-full-name" required /><br />
                    </label>
                    <input type="submit" value="Add" />
                </form>
            </div>
       </div>
     </div>
   );
 }
 