import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignIn = () => {

    // useState hook to manage form input fields
    const [input, setInput] = useState({
        email: "",
        password: ""
    });

    // Handles change in form inputs dynamically
    const inputHandler = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value });
    };

    // useNavigate hook for programmatic navigation (React Router v6)
    const navigate = useNavigate();

    // Function triggered when user clicks "Sign In"
    const readValue = () => {
        console.log(input); // For debugging — shows entered data in console

        // Send POST request to backend for user authentication
        axios.post("http://localhost:3030/signIn", input)
            .then((response) => {
                console.log(response.data); // Log backend response

                // Handle various server responses
                if (response.data.status === "incorrect password") {
                    alert("Incorrect password");
                } 
                else if (response.data.status === "user not found") {
                    alert("User not found");
                } 
                else {
                    // Extract token and userId from backend response
                    let token = response.data.token;
                    let userId = response.data.userId;

                    console.log(token);
                    console.log(userId);

                    // Store token and userId in sessionStorage (temporary browser storage)
                    sessionStorage.setItem("userId", userId);
                    sessionStorage.setItem("token", token);

                    // Redirect to create page after successful login
                    navigate("/create");
                }
            })
            .catch((error) => {
                // Handle request or server errors
                console.error("Login request failed:", error);
                alert("Something went wrong. Please try again later.");
            });
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col col-12 col-sm-12 col-md-12">
                    <div className="row g-3">

                        {/* Email input field */}
                        <div className="col-12">
                            <label className="form-label">Email ID</label>
                            <input
                                type="text"
                                className="form-control"
                                name="email"
                                value={input.email}
                                onChange={inputHandler}
                                placeholder="Enter your email"
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
                                placeholder="Enter your password"
                            />
                        </div>

                        {/* Submit button */}
                        <div className="col-12">
                            <button className="btn btn-success w-100" onClick={readValue}>
                                Sign In
                            </button>
                        </div>

                        {/* Navigation link to SignUp page */}
                        <div className="col-12 text-center">
                            <a href="/signUp" className="btn btn-secondary mt-2">
                                New Users Click Here
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
