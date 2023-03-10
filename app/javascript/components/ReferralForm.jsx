import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import { Input, InputLabel, FormHelperText, Button, Modal } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { Box } from '@mui/system';
import { ToastContainer, toast } from 'react-toastify';

// The create referral form component to create a new referral

function ReferralForm(props) {

    const [toEmail, setToEmail] = useState('')

    const createReferralHandler = async () => {

        const referralBody = {
            api_v1_referral: {
                toEmail,
                fromEmail: props.userEmail,
                referralLink: uuidv4()
            }
        }

        const referralResponse = await fetch('/api/v1/referrals', {
            method: 'POST',
            body: JSON.stringify(referralBody),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })

        if (referralResponse.status === 200) {
            const parsedResponse = await referralResponse.json()
            props.setReferrals(parsedResponse.referrals || [])
            props.handleModalToggle()
            toast('Referral created successfully!')
        }

        if (referralResponse.status === 500) {
            toast('Referral creation failed!')
        }

    }


    return (
        <div>

            <Modal
                open={props.modalOpen}
                onClose={props.handleModalToggle}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style} >

                    <div id='referral-form'>

                        <div>
                            <FormControl>
                                <InputLabel htmlFor="my-input">Referred From:-</InputLabel>
                                <Input id="my-input" aria-describedby="my-helper-text" value={props.userEmail} />
                                <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                            </FormControl>
                        </div>

                        <div>
                            <FormControl>
                                <InputLabel htmlFor="my-input-1">Referred to:-</InputLabel>
                                <Input type='email' id="my-input-1" aria-describedby="my-helper-text" value={toEmail} onChange={(event) => setToEmail(event.target.value)} />
                            </FormControl>
                        </div>

                        <div>
                            <Button id='action-button' variant='contained' color='primary' onClick={createReferralHandler} >
                                Add Referral
                            </Button>
                        </div>

                    </div>

                </Box>


            </Modal>

            <ToastContainer/>

        </div>
    );
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30vw',
    bgcolor: 'whitesmoke',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
  };

export default ReferralForm;