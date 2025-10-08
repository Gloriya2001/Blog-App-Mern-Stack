import React, { useState } from 'react'
import axios from 'axios';

const SignUp = () => {

    // useState hook to store form input values
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
        cnfPassword: "",
        phone: ""
    });

    // Handles input field changes dynamically
    const inputHandler = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value });
    }

    // Function to validate form and send signup data to the backend
    const readValue = () => {

        // Check if password and confirm password match
        if (input.password === input.cnfPassword) {

            // Prepare the data to send to backend (exclude confirm password)
            let newInput = {
                name: input.name,
                email: input.email,
                password: input.password,
                phone: input.phone
            };

            console.log(newInput); // Debug log

            // Send POST request to backend API for registration
            axios.post("http://localhost:3030/signUp", newInput)
                .then((response) => {
                    console.log(response.data);

                    // Handle success response
                    if (response.data.status === "success") {
                        alert("Registered Successfully");

                        // Reset form fields after successful registration
                        setInput({
                            name: "",
                            email: "",
                            password: "",
                            cnfPassword: "",
                            phone: ""
                        });
                    }
                    // Handle case where email already exists
                    else {
                        alert("Email already exists");
                        setInput({
                            name: "",
                            email: "",
                            password: "",
                            cnfPassword: "",
                            phone: ""
                        });
                    }
                })
                .catch((error) => {
                    // Handle network or server errors
                    console.log(error);
                    alert("Something went wrong! Please try again later.");
                });

        } else {
            // Show alert if passwords do not match
            alert("Passwords do not match");
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col col-12 col-sm-12 col-md-12">

                    <div className="row g-3">
                        {/* Name input field */}
                        <div className="col-12">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={input.name}
                                onChange={inputHandler}
                            />
                        </div>

                        {/* Email input field */}
                        <div className="col-12">
                            <label className="form-label">Email ID</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={input.email}
                                onChange={inputHandler}
                            />
                        </div>

                        {/* Password input field */}
                        <div className="col-12">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                value={input.password}
                                onChange={inputHandler}
                            />
                        </div>

                        {/* Confirm Password input field */}
                        <div className="col-12">
                            <label className="form-label">Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="cnfPassword"
                                value={input.cnfPassword}
                                onChange={inputHandler}
                            />
                        </div>

                        {/* Phone Number input field */}
                        <div className="col-12">
                            <label className="form-label">Phone Number</label>
                            <input
                                type="text"
                                className="form-control"
                                name="phone"
                                value={input.phone}
                                onChange={inputHandler}
                            />
                        </div>

                        {/* Submit button */}
                        <div className="col-12">
                            <button className="btn btn-success w-100" onClick={readValue}>Register</button>
                        </div>

                        {/* Back to login link */}
                        <div className="col-12 text-center">
                            <a href="/signIn" className="btn btn-primary mt-2">Back to Login</a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default SignUp;
