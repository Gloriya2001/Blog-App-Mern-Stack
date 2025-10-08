// Importing required modules
import axios from 'axios'              // For making HTTP requests
import React, { useState } from 'react' // Importing React and useState hook
import Navbar from './Navbar'

const CreatePost = () => {

    // State to store user input (message and userId)
    const [input, setInput] = useState({
        message: "",                                   // Message entered by user
        userId: sessionStorage.getItem("userId")       // Fetching logged-in user ID from session storage
    })

    // Function to update input state dynamically when user types in the textarea
    const inputHandler = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value })
    }

    // Retrieving authentication token from session storage
    const token = sessionStorage.getItem("token")

    // Function to send the post data to backend API
    const readValue = () => {
        console.log(input)  // Logging input for debugging
        console.log(token)  // Logging token for verification

        // Sending POST request to backend with message and headers
        axios.post(
            "http://localhost:3030/create",   // API endpoint
            input,                            // Request body (message + userId)
            {
                headers: {
                    token: token,              // Authentication token for protected route
                    "Content-Type": "application/json" // Indicating JSON payload
                }
            }
        ).then(
            (response) => {
                console.log(response.data)     // Logging successful response from backend
            }
        ).catch(
            (error) => {
                alert("Something went wrong")  // Displaying error alert if request fails
            }
        )
    }

    // UI structure for creating a post
    return (
        <div>
            <Navbar/>
            <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12">
                        <div className="row g-3">
                            {/* Textarea for entering post message */}
                            <div className="col col-12 col-sm-12 col-md-12">
                                <label htmlFor="" className="form-label">Post a Message</label>
                                <textarea
                                    className="form-control"
                                    name='message'
                                    value={input.message}
                                    onChange={inputHandler}
                                ></textarea>
                            </div>

                            {/* Button to trigger API call */}
                            <div className="col col-12 col-sm-12 col-md-12">
                                <button className="btn btn-success" onClick={readValue}>Post</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePost
