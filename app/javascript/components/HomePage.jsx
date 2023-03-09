import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormControl, Button, FormHelperText, Input, InputLabel } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';


const HomePage = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();


    const signinHandler = async () => {

        const userObj = {
            user: {
                email,
                password
            }
        }

        const signinResponse = await fetch('/users/sign_in', {
            method: 'POST',
            body: JSON.stringify(userObj),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })

        if (signinResponse.status === 200) {
            const parsedResponse = await signinResponse.json()
            props.setuserEmail(parsedResponse.user)
            navigate('/home')
            toast('Logged in successfully!')
        }

        if (signinResponse.status === 500) {
            toast('Logging in failed!')
        }

    }

    return <>

        <div id='main-form' >

            <div>

                <FormControl>
                    <InputLabel htmlFor="my-input">Email address</InputLabel>
                    <Input type='email' id="my-input" aria-describedby="my-helper-text" value={email} onChange={(event) => setEmail(event.target.value)} />
                    <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                </FormControl>

            </div>
            <div>

                <FormControl>
                    <InputLabel htmlFor="my-input-1">Password</InputLabel>
                    <Input type='password' id="my-input-1" aria-describedby="my-helper-text" value={password} onChange={(event) => setPassword(event.target.value)} />
                </FormControl>

            </div>

            <div>
                <Button id='action-button' variant='contained' color='primary' onClick={signinHandler} >
                    Login
                </Button>
            </div>

            <ToastContainer/>

        </div>

    </>
}

export default HomePage;