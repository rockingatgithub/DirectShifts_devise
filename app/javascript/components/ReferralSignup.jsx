import React, { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import { Input, InputLabel, FormHelperText, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

// The signup page with the referred email address.

function RefrralSignup(props) {

    const { referralID } = useParams();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    useEffect(() => {

        async function getReferralLink() {

            const validateLink = await fetch(`/api/v1/referrals/${referralID}`)
            const parsedResponse = await validateLink.json()

            if (validateLink.status === 200) {
                setEmail(parsedResponse.referrals.toEmail)
                console.log('is validated', parsedResponse)
            }
        }
        getReferralLink()

    }, [])

    const signupHandler = async () => {

        const userObj = {
            user: {
                email,
                password
            }
        }

        const signupResponse = await fetch('/users', {
            method: 'POST',
            body: JSON.stringify(userObj),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })

        if (signupResponse.status === 200) {
            const parsedResponse = await signupResponse.json()
            props.setuserEmail(parsedResponse.user)
            navigate('/home')
            toast('Signed up succssfully!')

        }

        if (signupResponse.status === 500) {
            toast('Signed up failed!')
        }

    }

    return (
        <div id='main-form'>
            <div>
                <FormControl>
                    <InputLabel htmlFor="my-input">Email address</InputLabel>
                    <Input id="my-input" aria-describedby="my-helper-text" value={email} />
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
                <Button id='action-button' variant='contained' color='primary' onClick={signupHandler} >
                    Signup
                </Button>
            </div>

            <ToastContainer />

        </div>
    );
}

export default RefrralSignup;